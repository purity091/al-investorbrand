-- ============================================
-- BRAND SYSTEM - COMPLETE DATABASE SCHEMA
-- ============================================
-- Run this ENTIRE file in Supabase SQL Editor
-- This includes: Base Tables + Auth + Visibility Control
-- ============================================

-- ============================================
-- PART 1: BASE TABLES & EXTENSIONS
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1.1 PLATFORMS TABLE
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
-- 1.2 PROGRAMS TABLE
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
-- 1.3 PODCAST EPISODES TABLE
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
-- 1.4 SOCIAL MEDIA POSTS TABLE
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
-- 1.5 INDEXES FOR PERFORMANCE
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
-- 1.6 ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 1.7 RLS POLICIES - PUBLIC ACCESS
-- ============================================
DROP POLICY IF EXISTS "Allow public read access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public insert access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public update access on platforms" ON platforms;
DROP POLICY IF EXISTS "Allow public delete access on platforms" ON platforms;

CREATE POLICY "Allow public read access on platforms" ON platforms FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on platforms" ON platforms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on platforms" ON platforms FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on platforms" ON platforms FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public insert access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public update access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public delete access on programs" ON programs;

CREATE POLICY "Allow public read access on programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on programs" ON programs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on programs" ON programs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on programs" ON programs FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public insert access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public update access on podcast_episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Allow public delete access on podcast_episodes" ON podcast_episodes;

CREATE POLICY "Allow public read access on podcast_episodes" ON podcast_episodes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on podcast_episodes" ON podcast_episodes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on podcast_episodes" ON podcast_episodes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on podcast_episodes" ON podcast_episodes FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public insert access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public update access on social_posts" ON social_posts;
DROP POLICY IF EXISTS "Allow public delete access on social_posts" ON social_posts;

CREATE POLICY "Allow public read access on social_posts" ON social_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on social_posts" ON social_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on social_posts" ON social_posts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on social_posts" ON social_posts FOR DELETE USING (true);

-- ============================================
-- 1.8 AUTO-UPDATE TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_platforms_updated_at ON platforms;
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
DROP TRIGGER IF EXISTS update_podcast_episodes_updated_at ON podcast_episodes;
DROP TRIGGER IF EXISTS update_social_posts_updated_at ON social_posts;

CREATE TRIGGER update_platforms_updated_at BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 1.9 SEED DATA - DEFAULT PLATFORMS
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
-- 1.10 SEED DATA - SAMPLE PODCAST EPISODES
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
-- PART 2: AUTHENTICATION SYSTEM
-- ============================================

-- ============================================
-- 2.1 USER PROFILES TABLE
-- ============================================
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

-- ============================================
-- 2.2 ORGANIZATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES user_profiles(id),
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2.3 ORGANIZATION MEMBERS TABLE
-- ============================================
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
-- 2.4 ADD USER IDS TO EXISTING TABLES
-- ============================================
ALTER TABLE programs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- ============================================
-- 2.5 INDEXES FOR AUTH TABLES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);
CREATE INDEX IF NOT EXISTS idx_programs_org_id ON programs(organization_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_user_id ON podcast_episodes(user_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_org_id ON podcast_episodes(organization_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_org_id ON social_posts(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON organization_members(organization_id);

-- ============================================
-- 2.6 AUTO-UPDATE TRIGGER FOR USER PROFILES
-- ============================================
CREATE OR REPLACE FUNCTION update_user_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_user_profile_updated_at();

-- ============================================
-- 2.7 ENABLE RLS FOR AUTH TABLES
-- ============================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2.8 RLS POLICIES FOR USER PROFILES
-- ============================================
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Allow authenticated users to read all profiles (simplified for development)
CREATE POLICY "Users can view profiles" ON user_profiles FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow admins to update all profiles
CREATE POLICY "Admins can update all profiles" ON user_profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up 
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

-- ============================================
-- 2.9 RLS POLICIES FOR ORGANIZATIONS
-- ============================================
DROP POLICY IF EXISTS "Members can view their organization" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organization" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;

-- Allow authenticated users to view organizations (simplified)
CREATE POLICY "Users can view organizations" ON organizations FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Owners can update their organization" ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Users can create organizations" ON organizations FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- ============================================
-- 2.10 RLS POLICIES FOR ORGANIZATION MEMBERS
-- ============================================
DROP POLICY IF EXISTS "Members can view organization members" ON organization_members;
DROP POLICY IF EXISTS "Owners can manage members" ON organization_members;

-- Allow authenticated users to view organization members (simplified)
CREATE POLICY "Users can view organization members" ON organization_members FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Owners can manage members" ON organization_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_members.organization_id 
            AND om.user_id = auth.uid() 
            AND om.role = 'owner'
        )
    );

-- ============================================
-- 2.11 RLS POLICIES FOR PROGRAMS
-- ============================================
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view programs" ON programs;
DROP POLICY IF EXISTS "Users can create programs" ON programs;
DROP POLICY IF EXISTS "Users can update programs" ON programs;
DROP POLICY IF EXISTS "Users can delete programs" ON programs;

-- Allow authenticated users to view all programs (simplified for development)
CREATE POLICY "Users can view programs" ON programs FOR SELECT
    USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Users can create programs" ON programs FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update programs" ON programs FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete programs" ON programs FOR DELETE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- 2.12 RLS POLICIES FOR PODCAST EPISODES
-- ============================================
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Users can create episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Users can update episodes" ON podcast_episodes;
DROP POLICY IF EXISTS "Users can delete episodes" ON podcast_episodes;

-- Allow authenticated users to view all episodes (simplified for development)
CREATE POLICY "Users can view episodes" ON podcast_episodes FOR SELECT
    USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Users can create episodes" ON podcast_episodes FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update episodes" ON podcast_episodes FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete episodes" ON podcast_episodes FOR DELETE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- 2.13 RLS POLICIES FOR SOCIAL POSTS
-- ============================================
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view posts" ON social_posts;
DROP POLICY IF EXISTS "Users can create posts" ON social_posts;
DROP POLICY IF EXISTS "Users can update posts" ON social_posts;
DROP POLICY IF EXISTS "Users can delete posts" ON social_posts;

-- Allow authenticated users to view all posts (simplified for development)
CREATE POLICY "Users can view posts" ON social_posts FOR SELECT
    USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Users can create posts" ON social_posts FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update posts" ON social_posts FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete posts" ON social_posts FOR DELETE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- 2.14 AUTH TRIGGER - AUTO CREATE PROFILE
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
-- 2.15 HELPER FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION public.get_current_user_id() RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_current_user_email() RETURNS TEXT AS $$
BEGIN
    RETURN auth.users.email FROM auth.users WHERE auth.users.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_user_admin() RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PART 3: VISIBILITY CONTROL SYSTEM
-- ============================================

-- ============================================
-- 3.1 VISIBILITY SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS visibility_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    section_name TEXT NOT NULL,
    section_name_ar TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    requires_auth BOOLEAN DEFAULT false,
    parent_section TEXT,
    display_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    updated_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3.2 SEED DEFAULT VISIBILITY SETTINGS
-- ============================================
INSERT INTO visibility_settings (section_key, section_name, section_name_ar, is_visible, requires_auth, display_order) VALUES
    ('platform_news', 'News Platform', 'منصة المستثمر الإخبارية', true, false, 1),
    ('platform_academy', 'Academy Platform', 'أكاديمية المستثمر', true, false, 2),
    ('platform_radar', 'Radar Platform', 'رادار المستثمر', true, false, 3),
    ('platform_launch', 'Launch Platform', 'مساعد الإطلاق', true, false, 4),
    ('platform_saudi', 'Saudi Platform', 'المستثمر سعودية', true, false, 5),
    ('feature_planning', 'Yearly Planning', 'التخطيط السنوي', true, false, 10),
    ('feature_planning_q1', 'Q1 Planning', 'تخطيط الربع الأول', true, false, 11),
    ('feature_planning_q2', 'Q2 Planning', 'تخطيط الربع الثاني', true, false, 12),
    ('feature_planning_q3', 'Q3 Planning', 'تخطيط الربع الثالث', true, false, 13),
    ('feature_planning_q4', 'Q4 Planning', 'تخطيط الربع الرابع', true, false, 14),
    ('feature_podcast', 'Podcast', 'البودكاست', true, false, 20),
    ('feature_podcast_play', 'Play Episodes', 'تشغيل الحلقات', true, false, 21),
    ('feature_podcast_upload', 'Upload Audio', 'رفع الملفات الصوتية', false, true, 22),
    ('feature_social', 'Social Media', 'منصات التواصل', true, false, 30),
    ('feature_social_toggle', 'Toggle Platforms', 'تفعيل المنصات', false, true, 31),
    ('feature_social_programs', 'Social Programs', 'برامج التواصل', false, true, 32),
    ('feature_export', 'Export Data', 'تصدير البيانات', true, false, 40),
    ('feature_import', 'Import Data', 'استيراد البيانات', false, true, 41),
    ('feature_ai_template', 'AI Template', 'قوالب الذكاء الاصطناعي', true, false, 42),
    ('feature_admin', 'Admin Panel', 'لوحة التحكم', false, true, 50),
    ('feature_admin_users', 'User Management', 'إدارة المستخدمين', false, true, 51),
    ('feature_admin_visibility', 'Visibility Control', 'التحكم في الظهور', false, true, 52)
ON CONFLICT (section_key) DO NOTHING;

-- ============================================
-- 3.3 INDEXES FOR VISIBILITY
-- ============================================
CREATE INDEX IF NOT EXISTS idx_visibility_settings_key ON visibility_settings(section_key);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_parent ON visibility_settings(parent_section);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_order ON visibility_settings(display_order);

-- ============================================
-- 3.4 ENABLE RLS FOR VISIBILITY
-- ============================================
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3.5 RLS POLICIES FOR VISIBILITY
-- ============================================
DROP POLICY IF EXISTS "Anyone can view visibility settings" ON visibility_settings;
DROP POLICY IF EXISTS "Admins can update visibility settings" ON visibility_settings;
DROP POLICY IF EXISTS "Admins can insert visibility settings" ON visibility_settings;
DROP POLICY IF EXISTS "Admins can delete visibility settings" ON visibility_settings;

CREATE POLICY "Anyone can view visibility settings" ON visibility_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update visibility settings" ON visibility_settings FOR UPDATE
    USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

CREATE POLICY "Admins can insert visibility settings" ON visibility_settings FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

CREATE POLICY "Admins can delete visibility settings" ON visibility_settings FOR DELETE
    USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

-- ============================================
-- 3.6 HELPER FUNCTIONS FOR VISIBILITY
-- ============================================
CREATE OR REPLACE FUNCTION is_section_visible(section_key_param TEXT) RETURNS BOOLEAN AS $$
DECLARE
    is_visible BOOLEAN;
BEGIN
    SELECT vs.is_visible INTO is_visible FROM visibility_settings vs WHERE vs.section_key = section_key_param;
    RETURN COALESCE(is_visible, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION has_section_access(section_key_param TEXT) RETURNS BOOLEAN AS $$
DECLARE
    requires_auth BOOLEAN;
    is_visible BOOLEAN;
    user_role TEXT;
BEGIN
    SELECT vs.requires_auth, vs.is_visible INTO requires_auth, is_visible
    FROM visibility_settings vs WHERE vs.section_key = section_key_param;

    IF NOT is_visible THEN
        RETURN FALSE;
    END IF;

    IF NOT requires_auth THEN
        RETURN TRUE;
    END IF;

    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT up.role INTO user_role FROM user_profiles up WHERE up.id = auth.uid();
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_visible_sections()
RETURNS TABLE(section_key TEXT, section_name TEXT, section_name_ar TEXT, display_order INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT vs.section_key, vs.section_name, vs.section_name_ar, vs.display_order
    FROM visibility_settings vs
    WHERE vs.is_visible = true
        AND (vs.requires_auth = false OR auth.uid() IS NOT NULL)
    ORDER BY vs.display_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3.7 AUTO-UPDATE TRIGGER FOR VISIBILITY
-- ============================================
CREATE OR REPLACE FUNCTION update_visibility_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_by = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_visibility_settings_updated_at ON visibility_settings;
CREATE TRIGGER update_visibility_settings_updated_at
    BEFORE UPDATE ON visibility_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_visibility_settings_updated_at();

-- ============================================
-- 3.8 ADMIN HELPER FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION toggle_section_visibility(section_key_param TEXT, visible BOOLEAN) RETURNS VOID AS $$
BEGIN
    UPDATE visibility_settings SET is_visible = visible WHERE section_key = section_key_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION set_section_requires_auth(section_key_param TEXT, requires_auth BOOLEAN) RETURNS VOID AS $$
BEGIN
    UPDATE visibility_settings SET requires_auth = requires_auth WHERE section_key = section_key_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION bulk_update_visibility(updates JSONB) RETURNS INTEGER AS $$
DECLARE
    update_record RECORD;
    count INTEGER := 0;
BEGIN
    FOR update_record IN SELECT * FROM jsonb_each_text(updates)
    LOOP
        UPDATE visibility_settings SET is_visible = (update_record.value::boolean) WHERE section_key = update_record.key;
        count := count + 1;
    END LOOP;
    RETURN count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3.9 VIEWS FOR ADMIN DASHBOARD
-- ============================================
CREATE OR REPLACE VIEW admin_visibility_overview AS
SELECT section_key, section_name, section_name_ar, is_visible, requires_auth, parent_section, display_order, updated_by, updated_at
FROM visibility_settings
ORDER BY CASE WHEN parent_section IS NULL THEN 0 ELSE 1 END, parent_section, display_order;

CREATE OR REPLACE VIEW admin_visibility_stats AS
SELECT
    COUNT(*) as total_sections,
    COUNT(*) FILTER (WHERE is_visible = true) as visible_sections,
    COUNT(*) FILTER (WHERE is_visible = false) as hidden_sections,
    COUNT(*) FILTER (WHERE requires_auth = true) as auth_required_sections,
    COUNT(*) FILTER (WHERE requires_auth = false) as public_sections
FROM visibility_settings;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT
    'Database Setup Complete!' as status,
    (SELECT COUNT(*) FROM platforms) as platforms_count,
    (SELECT COUNT(*) FROM programs) as programs_count,
    (SELECT COUNT(*) FROM podcast_episodes) as episodes_count,
    (SELECT COUNT(*) FROM user_profiles) as users_count,
    (SELECT COUNT(*) FROM visibility_settings) as visibility_settings_count;
