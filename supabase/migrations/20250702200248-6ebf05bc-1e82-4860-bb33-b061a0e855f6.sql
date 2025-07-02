-- Fix RLS policies to resolve permission denied errors and improve performance

-- First, let's check the current policies and fix them
-- The issue is that policies are trying to access auth.users table which causes permission denied

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Clients can view their own data" ON clients;
DROP POLICY IF EXISTS "Clients can view their own documents" ON documents;
DROP POLICY IF EXISTS "Clients can insert their own documents" ON documents;
DROP POLICY IF EXISTS "Clients can view their own cases" ON cases;
DROP POLICY IF EXISTS "Clients can view their own consultations" ON consultations;
DROP POLICY IF EXISTS "Clients can view their own conversations" ON ritu_conversations;
DROP POLICY IF EXISTS "Clients can insert their own conversations" ON ritu_conversations;

-- Create new policies that work correctly with auth.uid()
-- Clients table policies
CREATE POLICY "Clients can view and update their own data" 
ON clients 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Documents table policies  
CREATE POLICY "Clients can view their own documents" 
ON documents 
FOR SELECT 
USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can insert their own documents" 
ON documents 
FOR INSERT 
WITH CHECK (auth.uid()::text = client_id::text);

-- Cases table policies
CREATE POLICY "Clients can view their own cases" 
ON cases 
FOR SELECT 
USING (auth.uid()::text = client_id::text);

-- Consultations table policies
CREATE POLICY "Clients can view their own consultations" 
ON consultations 
FOR SELECT 
USING (auth.uid()::text = client_id::text);

-- Ritu conversations table policies
CREATE POLICY "Clients can view their own conversations" 
ON ritu_conversations 
FOR SELECT 
USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can insert their own conversations" 
ON ritu_conversations 
FOR INSERT 
WITH CHECK (auth.uid()::text = client_id::text);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_client_id ON documents(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_upload_date ON documents(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_cases_client_id ON cases(client_id);
CREATE INDEX IF NOT EXISTS idx_cases_created_date ON cases(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_client_id ON consultations(client_id);
CREATE INDEX IF NOT EXISTS idx_ritu_conversations_client_id ON ritu_conversations(client_id);