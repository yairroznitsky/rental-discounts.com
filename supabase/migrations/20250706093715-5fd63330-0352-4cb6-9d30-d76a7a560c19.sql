
-- Create storage bucket for location icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('location-icons', 'location-icons', true);

-- Create table to cache location icons and metadata
CREATE TABLE public.location_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id TEXT NOT NULL UNIQUE,
  icon_url TEXT,
  cached_icon_path TEXT,
  location_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on location_icons table
ALTER TABLE public.location_icons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to location icons
CREATE POLICY "Allow public read access to location icons" 
  ON public.location_icons 
  FOR SELECT 
  USING (true);

-- Create policy to allow service role to manage icons
CREATE POLICY "Allow service role to manage location icons" 
  ON public.location_icons 
  FOR ALL 
  USING (true);

-- Create storage policy for public read access to location icons
CREATE POLICY "Allow public read access to location icon files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'location-icons');

-- Create storage policy for service role to manage icon files
CREATE POLICY "Allow service role to manage location icon files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'location-icons');
