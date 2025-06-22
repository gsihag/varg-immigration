
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data consistency
CREATE TYPE visa_type AS ENUM ('Student Visa', 'Work Visa', 'Permanent Residence', 'Visitor Visa', 'Partner Visa');
CREATE TYPE client_status AS ENUM ('new', 'documents_pending', 'under_review', 'consultation_scheduled', 'application_in_progress', 'approved', 'rejected');
CREATE TYPE document_type AS ENUM ('passport', 'ielts_certificate', 'degree_certificate', 'transcripts', 'experience_letter', 'bank_statement', 'other');
CREATE TYPE document_status AS ENUM ('uploaded', 'under_review', 'verified', 'rejected', 'needs_replacement');
CREATE TYPE case_status AS ENUM ('initiated', 'documents_collection', 'application_preparation', 'submitted', 'awaiting_response', 'approved', 'rejected', 'closed');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE message_sender AS ENUM ('client', 'ritu');
CREATE TYPE message_type AS ENUM ('text', 'document_request', 'appointment_booking', 'escalation');
CREATE TYPE consultation_status AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');

-- Create clients table
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    country_of_origin TEXT,
    visa_type_interested visa_type,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status client_status DEFAULT 'new',
    assigned_agent TEXT,
    ritu_chat_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status document_status DEFAULT 'uploaded',
    notes TEXT,
    verified_by TEXT,
    verified_date TIMESTAMP WITH TIME ZONE
);

-- Create cases table
CREATE TABLE public.cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    case_number TEXT UNIQUE NOT NULL,
    case_type visa_type NOT NULL,
    status case_status DEFAULT 'initiated',
    created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    target_submission_date DATE,
    actual_submission_date DATE,
    decision_date DATE,
    priority priority_level DEFAULT 'medium',
    notes TEXT,
    assigned_consultant TEXT
);

-- Create ritu_conversations table
CREATE TABLE public.ritu_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sender message_sender NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id TEXT,
    message_type message_type DEFAULT 'text'
);

-- Create consultations table
CREATE TABLE public.consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    consultant_name TEXT NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status consultation_status DEFAULT 'scheduled',
    meeting_link TEXT,
    notes TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('client-documents', 'client-documents', FALSE);
INSERT INTO storage.buckets (id, name, public) VALUES ('system-templates', 'system-templates', TRUE);

-- Function to auto-generate case numbers
CREATE OR REPLACE FUNCTION public.generate_case_number()
RETURNS TEXT AS $$
DECLARE
    current_year TEXT;
    next_number INTEGER;
    case_number TEXT;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(case_number FROM 'VARG-\d{4}-(\d{4})') AS INTEGER)), 0) + 1
    INTO next_number
    FROM public.cases
    WHERE case_number LIKE 'VARG-' || current_year || '-%';
    
    case_number := 'VARG-' || current_year || '-' || LPAD(next_number::TEXT, 4, '0');
    
    RETURN case_number;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically set case_number when inserting new cases
CREATE OR REPLACE FUNCTION public.set_case_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.case_number IS NULL OR NEW.case_number = '' THEN
        NEW.case_number := public.generate_case_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate case numbers
CREATE TRIGGER set_case_number_trigger
    BEFORE INSERT ON public.cases
    FOR EACH ROW
    EXECUTE FUNCTION public.set_case_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on clients table
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ritu_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients table
CREATE POLICY "Clients can view their own data" ON public.clients
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admin can view all clients" ON public.clients
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- RLS Policies for documents table
CREATE POLICY "Clients can view their own documents" ON public.documents
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Clients can insert their own documents" ON public.documents
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Admin can manage all documents" ON public.documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- RLS Policies for cases table
CREATE POLICY "Clients can view their own cases" ON public.cases
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Admin can manage all cases" ON public.cases
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- RLS Policies for ritu_conversations table
CREATE POLICY "Clients can view their own conversations" ON public.ritu_conversations
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Clients can insert their own conversations" ON public.ritu_conversations
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Admin can manage all conversations" ON public.ritu_conversations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- RLS Policies for consultations table
CREATE POLICY "Clients can view their own consultations" ON public.consultations
    FOR SELECT USING (
        client_id IN (
            SELECT id FROM public.clients WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Admin can manage all consultations" ON public.consultations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Storage policies for client-documents bucket
CREATE POLICY "Clients can upload their own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'client-documents' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Clients can view their own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'client-documents' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Admin can manage all client documents" ON storage.objects
    FOR ALL USING (
        bucket_id = 'client-documents' AND
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Storage policies for system-templates bucket (public read access)
CREATE POLICY "Anyone can view system templates" ON storage.objects
    FOR SELECT USING (bucket_id = 'system-templates');

CREATE POLICY "Admin can manage system templates" ON storage.objects
    FOR ALL USING (
        bucket_id = 'system-templates' AND
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Insert sample data
INSERT INTO public.clients (email, full_name, phone, country_of_origin, visa_type_interested, assigned_agent) VALUES
('john.doe@email.com', 'John Doe', '+1234567890', 'India', 'Student Visa', 'Agent Smith'),
('jane.smith@email.com', 'Jane Smith', '+0987654321', 'Philippines', 'Work Visa', 'Agent Johnson'),
('mike.wilson@email.com', 'Mike Wilson', '+1122334455', 'Nepal', 'Permanent Residence', 'Agent Brown');
