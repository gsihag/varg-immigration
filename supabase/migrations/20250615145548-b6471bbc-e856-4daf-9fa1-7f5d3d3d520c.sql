
-- Create the immigration_data table for storing structured immigration information
CREATE TABLE public.immigration_data (
  id SERIAL PRIMARY KEY,
  data_type VARCHAR(50) NOT NULL,
  visa_subclass VARCHAR(10),
  data_content JSONB NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.immigration_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access for immigration data
CREATE POLICY "Allow public read access" ON public.immigration_data
  FOR SELECT USING (true);

-- Allow service role to insert/update data
CREATE POLICY "Allow service role write access" ON public.immigration_data
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Insert sample processing times data
INSERT INTO public.immigration_data (data_type, visa_subclass, data_content) VALUES 
('processing_times', '485', '{
  "visa_name": "Temporary Graduate visa (subclass 485)",
  "processing_time_75": "4 to 6 months",
  "processing_time_90": "8 to 11 months",
  "last_updated": "2025-06-15"
}'),
('processing_times', '189', '{
  "visa_name": "Skilled Independent visa (subclass 189)",
  "processing_time_75": "6 to 8 months", 
  "processing_time_90": "12 to 14 months",
  "last_updated": "2025-06-15"
}'),
('processing_times', '190', '{
  "visa_name": "Skilled Nominated visa (subclass 190)",
  "processing_time_75": "6 to 8 months",
  "processing_time_90": "12 to 15 months",
  "last_updated": "2025-06-15"
}'),
('processing_times', '491', '{
  "visa_name": "Skilled Work Regional (Provisional) visa (subclass 491)",
  "processing_time_75": "8 to 11 months",
  "processing_time_90": "14 to 18 months",
  "last_updated": "2025-06-15"
}'),
('processing_times', '482', '{
  "visa_name": "Temporary Skill Shortage visa (subclass 482)",
  "processing_time_75": "3 to 5 months",
  "processing_time_90": "7 to 9 months",
  "last_updated": "2025-06-15"
}');

-- Create index for better performance
CREATE INDEX idx_immigration_data_type_visa ON public.immigration_data(data_type, visa_subclass);
CREATE INDEX idx_immigration_data_updated ON public.immigration_data(last_updated DESC);
