-- Supabase Database Schema for Brand System
-- Run this in your Supabase SQL Editor

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
    id BIGINT PRIMARY KEY DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
    title TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    platform TEXT NOT NULL,
    platform_name TEXT NOT NULL,
    platform_color TEXT NOT NULL,
    posts_count INTEGER DEFAULT 100,
    quarter_id INTEGER,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create platforms table
CREATE TABLE IF NOT EXISTS platforms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    color TEXT NOT NULL,
    enabled BOOLEAN DEFAULT true,
    followers_count TEXT DEFAULT '0',
    posts_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_programs_quarter_id ON programs(quarter_id);
CREATE INDEX IF NOT EXISTS idx_programs_platform ON programs(platform);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON programs(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;

-- Create policies for programs table
CREATE POLICY "Allow public read access" ON programs
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON programs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON programs
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON programs
    FOR DELETE USING (true);

-- Create policies for platforms table
CREATE POLICY "Allow public read access" ON platforms
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON platforms
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON platforms
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON platforms
    FOR DELETE USING (true);

-- Insert default platforms data
INSERT INTO platforms (id, name, name_ar, color, enabled, followers_count, posts_count) VALUES
    ('twitter', 'X (Twitter)', 'إكس (تويتر)', 'bg-[#1DA1F2]', true, '125K', 1250),
    ('linkedin', 'LinkedIn', 'لينكد إن', 'bg-[#0077B5]', true, '85K', 520),
    ('instagram', 'Instagram', 'إنستغرام', 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]', true, '210K', 890),
    ('youtube', 'YouTube', 'يوتيوب', 'bg-[#FF0000]', true, '95K', 340),
    ('telegram', 'Telegram', 'تيليجرام', 'bg-[#0088cc]', false, '45K', 2100),
    ('tiktok', 'TikTok', 'تيك توك', 'bg-black', true, '180K', 450),
    ('facebook', 'Facebook', 'فيسبوك', 'bg-[#1877F2]', false, '320K', 1800),
    ('snapchat', 'Snapchat', 'سناب شات', 'bg-[#FFFC00]', false, '95K', 670)
ON CONFLICT (id) DO NOTHING;

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platforms_updated_at
    BEFORE UPDATE ON platforms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
