-- ============================================
-- Brand System - Supabase Database Schema
-- ============================================
-- This schema supports:
-- - Yearly Planning Programs
-- - Podcast Episodes with Audio
-- - Social Media Platforms & Posts
-- - Complete CRUD operations
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PLATFORMS TABLE
-- ============================================
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

-- ============================================
-- 2. PROGRAMS TABLE (Yearly Planning)
-- ============================================
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

-- ============================================
-- 3. PODCAST EPISODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS podcast_episodes (
    id BIGINT PRIMARY KEY DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
    title TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    description TEXT,
    description_ar TEXT,
    guest TEXT,
    guest_ar TEXT,
    duration TEXT DEFAULT '00:00',
    season INTEGER DEFAULT 1,
    episode_number INTEGER DEFAULT 1,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
    publish_date DATE,
    platform TEXT DEFAULT 'spotify',
    color TEXT,
    audio_url TEXT,
    audio_file_path TEXT,
    play_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. SOCIAL MEDIA POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS social_posts (
    id BIGINT PRIMARY KEY DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_ar TEXT NOT NULL,
    platform TEXT NOT NULL,
    platform_name TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
    post_type TEXT DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'video', 'carousel')),
    scheduled_date TIMESTAMPTZ,
    published_date TIMESTAMPTZ,
    program_id BIGINT REFERENCES programs(id) ON DELETE CASCADE,
    program_name TEXT,
    quarter_id INTEGER,
    media_urls TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_programs_quarter_id ON programs(quarter_id);
CREATE INDEX IF NOT EXISTS idx_programs_platform ON programs(platform);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON programs(created_at);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_status ON podcast_episodes(status);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_publish_date ON podcast_episodes(publish_date);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_season ON podcast_episodes(season, episode_number);
CREATE INDEX IF NOT EXISTS idx_social_posts_program_id ON social_posts(program_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_date ON social_posts(scheduled_date);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PUBLIC ACCESS (FOR DEMO)
-- For production, replace with user-based policies
-- ============================================

-- Platforms Policies
CREATE POLICY "Allow public read access on platforms" ON platforms
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on platforms" ON platforms
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on platforms" ON platforms
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on platforms" ON platforms
    FOR DELETE USING (true);

-- Programs Policies
CREATE POLICY "Allow public read access on programs" ON programs
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on programs" ON programs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on programs" ON programs
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on programs" ON programs
    FOR DELETE USING (true);

-- Podcast Episodes Policies
CREATE POLICY "Allow public read access on podcast_episodes" ON podcast_episodes
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on podcast_episodes" ON podcast_episodes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on podcast_episodes" ON podcast_episodes
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on podcast_episodes" ON podcast_episodes
    FOR DELETE USING (true);

-- Social Posts Policies
CREATE POLICY "Allow public read access on social_posts" ON social_posts
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on social_posts" ON social_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on social_posts" ON social_posts
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on social_posts" ON social_posts
    FOR DELETE USING (true);

-- ============================================
-- AUTO-UPDATE TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE
-- ============================================
CREATE TRIGGER update_platforms_updated_at
    BEFORE UPDATE ON platforms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcast_episodes_updated_at
    BEFORE UPDATE ON podcast_episodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at
    BEFORE UPDATE ON social_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA - DEFAULT PLATFORMS
-- ============================================
INSERT INTO platforms (id, name, name_ar, color, enabled, followers_count, posts_count) VALUES
    ('twitter', 'X (Twitter)', 'إكس (تويتر)', 'bg-[#1DA1F2]', true, '125K', 1250),
    ('linkedin', 'LinkedIn', 'لينكد إن', 'bg-[#0077B5]', true, '85K', 520),
    ('instagram', 'Instagram', 'إنستغرام', 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]', true, '210K', 890),
    ('youtube', 'YouTube', 'يوتيوب', 'bg-[#FF0000]', true, '95K', 340),
    ('telegram', 'Telegram', 'تيليجرام', 'bg-[#0088cc]', false, '45K', 2100),
    ('tiktok', 'TikTok', 'تيك توك', 'bg-black', true, '180K', 450),
    ('facebook', 'Facebook', 'فيسبوك', 'bg-[#1877F2]', false, '320K', 1800),
    ('snapchat', 'Snapchat', 'سناب شات', 'bg-[#FFFC00]', false, '95K', 670),
    ('spotify', 'Spotify', 'سبوتيفاي', 'bg-[#1DB954]', true, '50K', 100),
    ('apple', 'Apple Podcasts', 'أبل بودكاست', 'bg-[#A333C8]', true, '75K', 150)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED DATA - SAMPLE PODCAST EPISODES
-- ============================================
INSERT INTO podcast_episodes (
    id, title, title_ar, description, description_ar, 
    guest, guest_ar, duration, season, episode_number, 
    status, publish_date, platform, color
) VALUES
    (
        1,
        'Analyst Corner - Episode 1',
        'زاوية المحلل - الحلقة الأولى',
        'Deep analysis of market trends and investment opportunities',
        'تحليل معمق لاتجاهات السوق وفرص الاستثمار في السوق السعودي',
        'Analysis Team',
        'فريق التحليل المالي',
        '45:00',
        1,
        1,
        'published',
        '2026-02-19',
        'spotify',
        'from-[#0D1137] to-[#1a237e]'
    ),
    (
        2,
        'Q1 Market Analysis',
        'تحليل السوق للربع الأول',
        'Deep dive into Q1 2026 market performance',
        'نظرة معمقة على أداء السوق في الربع الأول 2026',
        'Dr. Ahmed Al-Maliki',
        'د. أحمد المالكي',
        '45:30',
        1,
        2,
        'published',
        '2026-01-15',
        'spotify',
        'from-[#006C35] to-[#10B981]'
    ),
    (
        3,
        'FinTech Future',
        'مستقبل التقنية المالية',
        'Discussion with fintech entrepreneurs',
        'حوار مع رواد أعمال في قطاع الفنتك',
        'Sarah Al-Otaibi',
        'سارة العتيبي',
        '38:15',
        1,
        3,
        'scheduled',
        '2026-02-25',
        'apple',
        'from-[#CBB588] to-[#F59E0B]'
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- Programs by Quarter View
CREATE OR REPLACE VIEW programs_by_quarter AS
SELECT 
    quarter_id,
    COUNT(*) as program_count,
    SUM(posts_count) as total_posts,
    ARRAY_AGG(platform) as platforms
FROM programs
WHERE quarter_id IS NOT NULL
GROUP BY quarter_id
ORDER BY quarter_id;

-- Podcast Stats View
CREATE OR REPLACE VIEW podcast_stats AS
SELECT 
    status,
    COUNT(*) as episode_count,
    SUM(CASE WHEN duration IS NOT NULL THEN 
        (SPLIT_PART(duration, ':', 1)::INTEGER * 60 + SPLIT_PART(duration, ':', 2)::INTEGER)
        ELSE 0 
    END) as total_minutes
FROM podcast_episodes
GROUP BY status;

-- Social Posts by Platform View
CREATE OR REPLACE VIEW social_posts_by_platform AS
SELECT 
    platform,
    platform_name,
    status,
    COUNT(*) as post_count
FROM social_posts
GROUP BY platform, platform_name, status
ORDER BY platform, status;

-- ============================================
-- STORAGE BUCKETS FOR AUDIO FILES
-- ============================================
-- Note: Run this in Supabase Dashboard > Storage
-- Or via API

-- CREATE BUCKET command (run in Supabase Dashboard)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('podcast-audio', 'podcast-audio', true);

-- ============================================
-- FUNCTIONS FOR DATA MANAGEMENT
-- ============================================

-- Function to get programs with posts count
CREATE OR REPLACE FUNCTION get_program_with_posts(prog_id BIGINT)
RETURNS JSONB AS $$
DECLARE
    program_data programs%ROWTYPE;
    posts_data JSONB;
BEGIN
    SELECT * INTO program_data FROM programs WHERE id = prog_id;
    
    SELECT JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'id', sp.id,
            'title', sp.title,
            'content_ar', sp.content_ar,
            'status', sp.status,
            'post_type', sp.post_type,
            'scheduled_date', sp.scheduled_date
        )
    ) INTO posts_data
    FROM social_posts sp WHERE sp.program_id = prog_id;
    
    RETURN JSONB_BUILD_OBJECT(
        'program', to_jsonb(program_data),
        'posts', COALESCE(posts_data, '[]'::JSONB)
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get podcast episode with stats
CREATE OR REPLACE FUNCTION get_podcast_episode_stats(ep_id BIGINT)
RETURNS JSONB AS $$
DECLARE
    episode_data podcast_episodes%ROWTYPE;
BEGIN
    SELECT * INTO episode_data FROM podcast_episodes WHERE id = ep_id;
    
    RETURN JSONB_BUILD_OBJECT(
        'episode', to_jsonb(episode_data),
        'season_total', (
            SELECT COUNT(*) FROM podcast_episodes 
            WHERE season = episode_data.season
        ),
        'series_total', (
            SELECT COUNT(*) FROM podcast_episodes
        )
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE platforms IS 'Social media platforms configuration';
COMMENT ON TABLE programs IS 'Yearly planning programs distributed across quarters';
COMMENT ON TABLE podcast_episodes IS 'Podcast episodes with audio files and metadata';
COMMENT ON TABLE social_posts IS 'Individual social media posts linked to programs';

COMMENT ON COLUMN programs.quarter_id IS 'Quarter assignment: 1=Q1, 2=Q2, 3=Q3, 4=Q4, NULL=Unassigned';
COMMENT ON COLUMN podcast_episodes.status IS 'Episode status: draft, scheduled, or published';
COMMENT ON COLUMN social_posts.post_type IS 'Type of post: text, image, video, or carousel';

-- ============================================
-- END OF SCHEMA
-- ============================================
