-- ============================================
-- Brand System - Fixed Database Migration
-- ============================================
-- This migration fixes the infinite recursion RLS policy error
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. DROP EXISTING POLICIES (to prevent conflicts)
-- ============================================

-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow public read access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public insert access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public update access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public delete access on platforms" ON platforms;

DROP POLICY IF EXISTS "Allow public read access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public insert access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public update access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public delete access on programs" ON programs;

DROP POLICY IF EXISTS "Allow public read access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public insert access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public update access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public delete access on podcast_episodes" ON podcast_episodes;

DROP POLICY IF EXISTS "Allow public read access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public insert access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public update access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public delete access on social_posts" ON social_posts;

DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

DROP POLICY IF EXISTS "Members can view their organization" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organization" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;

DROP POLICY IF EXISTS "Members can view organization members" ON organization_members;
DROP POLICY IF EXISTS "Owners can manage members" ON organization_members;

-- ============================================
-- 2. CREATE TABLES (if not exist)
-- ============================================

-- Platforms Table
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

-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id BIGINT PRIMARY KEY DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
    title TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    platform TEXT NOT NULL,
    platform_name TEXT NOT NULL DEFAULT 'Twitter',
    platform_color TEXT NOT NULL DEFAULT 'bg-[#1DA1F2]',
    posts_count INTEGER DEFAULT 100,
    quarter_id INTEGER,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Podcast Episodes Table
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

-- Social Posts Table
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

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
    organization TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES user_profiles(id),
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization Members Table
CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    UNIQUE(organization_id, user_id)
);

-- ============================================
-- 3. ADD USER_ID COLUMNS TO MAIN TABLES
-- ============================================

ALTER TABLE programs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- ============================================
-- 4. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_programs_quarter_id ON programs(quarter_id);
CREATE INDEX IF NOT EXISTS idx_programs_platform ON programs(platform);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON programs(created_at);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);
CREATE INDEX IF NOT EXISTS idx_programs_org_id ON programs(organization_id);

CREATE INDEX IF NOT EXISTS idx_podcast_episodes_status ON podcast_episodes(status);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_publish_date ON podcast_episodes(publish_date);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_season ON podcast_episodes(season, episode_number);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_user_id ON podcast_episodes(user_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_org_id ON podcast_episodes(organization_id);

CREATE INDEX IF NOT EXISTS idx_social_posts_program_id ON social_posts(program_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_date ON social_posts(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_org_id ON social_posts(organization_id);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON organization_members(organization_id);

-- ============================================
-- 5. ENABLE RLS
-- ============================================

ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE SIMPLE RLS POLICIES (NO RECURSION)
-- ============================================

-- IMPORTANT: Use SIMPLE policies that don't reference other tables
-- to avoid infinite recursion

-- Platforms: Allow ALL operations (public access)
CREATE POLICY "public_read_platforms" ON platforms FOR SELECT USING (true);
CREATE POLICY "public_insert_platforms" ON platforms FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_platforms" ON platforms FOR UPDATE USING (true);
CREATE POLICY "public_delete_platforms" ON platforms FOR DELETE USING (true);

-- Programs: Allow ALL operations (public access)
CREATE POLICY "public_read_programs" ON programs FOR SELECT USING (true);
CREATE POLICY "public_insert_programs" ON programs FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_programs" ON programs FOR UPDATE USING (true);
CREATE POLICY "public_delete_programs" ON programs FOR DELETE USING (true);

-- Podcast Episodes: Allow ALL operations (public access)
CREATE POLICY "public_read_podcast" ON podcast_episodes FOR SELECT USING (true);
CREATE POLICY "public_insert_podcast" ON podcast_episodes FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_podcast" ON podcast_episodes FOR UPDATE USING (true);
CREATE POLICY "public_delete_podcast" ON podcast_episodes FOR DELETE USING (true);

-- Social Posts: Allow ALL operations (public access)
CREATE POLICY "public_read_posts" ON social_posts FOR SELECT USING (true);
CREATE POLICY "public_insert_posts" ON social_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_posts" ON social_posts FOR UPDATE USING (true);
CREATE POLICY "public_delete_posts" ON social_posts FOR DELETE USING (true);

-- User Profiles: Simple policies without recursion
CREATE POLICY "public_read_profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "user_insert_own_profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "user_update_own_profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Organizations: Simple policies without recursion
CREATE POLICY "public_read_orgs" ON organizations FOR SELECT USING (true);
CREATE POLICY "owner_insert_org" ON organizations FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "owner_update_own_org" ON organizations FOR UPDATE USING (auth.uid() = owner_id);

-- Organization Members: Simple policies without recursion
CREATE POLICY "public_read_members" ON organization_members FOR SELECT USING (true);
CREATE POLICY "owner_manage_members" ON organization_members FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM organizations o
            WHERE o.id = organization_members.organization_id
            AND o.owner_id = auth.uid()
        )
    );

-- ============================================
-- 7. AUTO-UPDATE TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 8. CREATE TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_platforms_updated_at ON platforms;
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
DROP TRIGGER IF EXISTS update_podcast_episodes_updated_at ON podcast_episodes;
DROP TRIGGER IF EXISTS update_social_posts_updated_at ON social_posts;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;

CREATE TRIGGER update_platforms_updated_at BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 9. SEED DATA - PLATFORMS
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
-- 10. SEED DATA - PODCAST EPISODES
-- ============================================

INSERT INTO podcast_episodes (
    id, title, title_ar, description, description_ar,
    guest, guest_ar, duration, season, episode_number,
    status, publish_date, platform, color
) VALUES
    (
        1, 'Analyst Corner - Episode 1', 'زاوية المحلل - الحلقة الأولى',
        'Deep analysis of market trends and investment opportunities',
        'تحليل معمق لاتجاهات السوق وفرص الاستثمار في السوق السعودي',
        'Analysis Team', 'فريق التحليل المالي', '45:00', 1, 1,
        'published', '2026-02-19', 'spotify', 'from-[#0D1137] to-[#1a237e]'
    ),
    (
        2, 'Q1 Market Analysis', 'تحليل السوق للربع الأول',
        'Deep dive into Q1 2026 market performance',
        'نظرة معمقة على أداء السوق في الربع الأول 2026',
        'Dr. Ahmed Al-Maliki', 'د. أحمد المالكي', '45:30', 1, 2,
        'published', '2026-01-15', 'spotify', 'from-[#006C35] to-[#10B981]'
    ),
    (
        3, 'FinTech Future', 'مستقبل التقنية المالية',
        'Discussion with fintech entrepreneurs',
        'حوار مع رواد أعمال في قطاع الفنتك',
        'Sarah Al-Otaibi', 'سارة العتيبي', '38:15', 1, 3,
        'scheduled', '2026-02-25', 'apple', 'from-[#CBB588] to-[#F59E0B]'
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 11. AUTH TRIGGER - AUTO CREATE PROFILE
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 12. VERIFICATION
-- ============================================

SELECT 
    '✅ Database Migration Complete!' as status,
    (SELECT COUNT(*) FROM platforms) as platforms_count,
    (SELECT COUNT(*) FROM programs) as programs_count,
    (SELECT COUNT(*) FROM podcast_episodes) as episodes_count,
    (SELECT COUNT(*) FROM social_posts) as posts_count,
    (SELECT COUNT(*) FROM user_profiles) as users_count,
    (SELECT COUNT(*) FROM organizations) as orgs_count;
