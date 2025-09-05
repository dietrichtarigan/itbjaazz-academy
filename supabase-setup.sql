-- Supabase Schema Setup for academy.itbjazz
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create modules table
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    poster_url TEXT,
    pdf_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('Klinik', 'Mentoring', 'Jam and Jazz')),
    title TEXT NOT NULL,
    starts_at TIMESTAMPTZ,
    location TEXT,
    speaker TEXT,
    description TEXT,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past')),
    cover_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create objectives table
CREATE TABLE IF NOT EXISTS public.objectives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pillar TEXT NOT NULL,
    objective TEXT NOT NULL,
    kpi TEXT,
    initiative TEXT,
    target_output TEXT,
    show_on_home BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('posters', 'posters', true),
    ('docs', 'docs', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) - disabled for public read access
ALTER TABLE public.modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.objectives DISABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read access for objectives" ON public.objectives FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.modules (title, slug, description, poster_url, pdf_url, status) VALUES 
    ('The Catz'' Module', 'catz', 'A growing PDF-based module series inspired by The Real ITBJazz Book. This comprehensive learning series is designed to enhance your understanding of jazz music through structured, PDF-based content.', 'https://via.placeholder.com/400x600/2FB2AB/FFFFFF?text=The+Catz+Module', 'https://via.placeholder.com/800x600/27CFA7/FFFFFF?text=PDF+Coming+Soon', 'published');

INSERT INTO public.events (type, title, description, status) VALUES 
    ('Klinik', 'Kocheng Klinik Sessions', 'Structured learning sessions focused on jazz fundamentals and practical application.', 'upcoming'),
    ('Mentoring', 'Mentoring Program', 'One-on-one and group mentoring sessions for skill development and guidance.', 'upcoming'),
    ('Jam and Jazz', 'Jam and Jazz Events', 'Collaborative music-making sessions for community engagement and expression.', 'upcoming');

INSERT INTO public.objectives (pillar, objective, kpi, initiative, target_output, show_on_home) VALUES 
    ('Kurikulum', 'Improve members'' musical skills via a structured curriculum and learning facilities.', 'Design a structured, sustainable, and effective Kocheng Klinik system, targeting 80% member satisfaction within one management year.', 'The Catz'' Module', 'At least 4 modules referencing The Real ITBJazz Book', true),
    ('Event', 'Improve members'' skills through event-based learning vehicles.', 'Provide effective learning/training opportunities in jazz, targeting 80% member satisfaction within one management year.', 'Kocheng Klinik', 'Hold ≥4 internal Kocheng Klinik sessions (aligned with curriculum) and ≥1 external session', true),
    ('Mentoring', 'Provide personal guidance and skill development support.', null, null, 'Hold ≥4 Mentoring sessions aligned with the curriculum', true),
    ('Jam and Jazz', 'Enhance music-making experience via active, appreciative, collaborative expression.', null, null, 'Hold ≥1 Jam and Jazz event within one management year', true),
    ('Kroyokeanjes'' Lead Sheet', 'Initiate a General Plan for Kroyokeanjes to standardize the cadetship process.', null, null, 'Publish one General Plan for Kroyokeanjes within one management year', false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_modules_status ON public.modules(status);
CREATE INDEX IF NOT EXISTS idx_modules_slug ON public.modules(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(type);
CREATE INDEX IF NOT EXISTS idx_objectives_show_on_home ON public.objectives(show_on_home);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_objectives_updated_at BEFORE UPDATE ON public.objectives FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();