
-- Create rental partners table (simpler version)
CREATE TABLE public.rental_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner configurations table
CREATE TABLE public.partner_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES public.rental_partners(id) ON DELETE CASCADE,
  config_key TEXT NOT NULL,
  config_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(partner_id, config_key)
);

-- Create generalized rental clicks table
CREATE TABLE public.rental_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  click_id TEXT NOT NULL UNIQUE,
  partner_name TEXT NOT NULL,
  iata_code TEXT,
  location_id TEXT,
  pickup_date DATE,
  pickup_time TEXT,
  dropoff_date DATE,
  dropoff_time TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.rental_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to partners
CREATE POLICY "Allow public read access to active rental partners" 
  ON public.rental_partners 
  FOR SELECT 
  USING (is_active = true);

-- Create policies for partner configurations (only service role can manage)
CREATE POLICY "Allow service role to manage partner configurations" 
  ON public.partner_configurations 
  FOR ALL 
  USING (true);

-- Create policies for rental clicks (public can insert, service role can manage)
CREATE POLICY "Allow public insert to rental clicks" 
  ON public.rental_clicks 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow service role to manage rental clicks" 
  ON public.rental_clicks 
  FOR ALL 
  USING (true);

-- Insert only Kayak partner for now
INSERT INTO public.rental_partners (name, display_name) VALUES
('kayak', 'KAYAK');

-- Insert Kayak configuration
INSERT INTO public.partner_configurations (partner_id, config_key, config_value) 
SELECT id, 'affiliate_id', 'aff1234' 
FROM public.rental_partners 
WHERE name = 'kayak';

INSERT INTO public.partner_configurations (partner_id, config_key, config_value) 
SELECT id, 'utm_source', 'riotech' 
FROM public.rental_partners 
WHERE name = 'kayak';

INSERT INTO public.partner_configurations (partner_id, config_key, config_value) 
SELECT id, 'utm_medium', 'affiliate' 
FROM public.rental_partners 
WHERE name = 'kayak';
