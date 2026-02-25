-- ============================================
-- Brand System - Complete Database Schema
-- قاعدة البيانات الشاملة لنظام العلامة التجارية
-- ============================================
-- الإصدار: 1.0 شامل
-- آخر تحديث: 2026-02-25
-- 
-- هذا الملف يحتوي على:
-- 1. جداول المنصات والبرامج والمحتوى
-- 2. نظام المصادقة والمستخدمين
-- 3. نظام الصلاحيات والأمان RLS
-- 4. نظام إدارة المحتوى CMS
-- 5. نظام التحكم في الظهور Visibility
-- 6. الدوال والمحفزات Triggers
-- 7. البيانات الافتراضية
-- ============================================

-- ============================================
-- 1. الإعدادات الأولية Initial Setup
-- ============================================

-- تفعيل امتداد UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. الجداول الأساسية Core Tables
-- ============================================

-- --------------------------------------------
-- 2.1 جدول منصات التواصل الاجتماعي
-- --------------------------------------------
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

-- --------------------------------------------
-- 2.2 جدول المنصات النظامية
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS system_platforms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------
-- 2.3 جدول البرامج السنوية
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS programs (
    id BIGINT PRIMARY KEY DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
    title TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    platform TEXT NOT NULL,
    platform_name TEXT NOT NULL DEFAULT 'Twitter',
    platform_color TEXT NOT NULL DEFAULT 'bg-[#1DA1F2]',
    system_platform TEXT DEFAULT 'news',
    posts_count INTEGER DEFAULT 100,
    quarter_id INTEGER,
    "order" INTEGER DEFAULT 0,
    description TEXT DEFAULT '',
    description_ar TEXT DEFAULT '',
    objectives TEXT DEFAULT '',
    objectives_ar TEXT DEFAULT '',
    user_id UUID,
    organization_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------
-- 2.4 جدول حلقات البودكاست
-- --------------------------------------------
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
    user_id UUID,
    organization_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------
-- 2.5 جدول منشورات التواصل الاجتماعي
-- --------------------------------------------
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
    user_id UUID,
    organization_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------
-- 2.6 جدول عناصر المحتوى CMS
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS content_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    platform TEXT NOT NULL,
    section TEXT NOT NULL,
    field_key TEXT NOT NULL,
    field_type TEXT NOT NULL DEFAULT 'text',
    content_en TEXT,
    content_ar TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by TEXT,
    updated_by TEXT,
    CONSTRAINT unique_content_item UNIQUE(platform, section, field_key)
);

-- --------------------------------------------
-- 2.7 جدول إعدادات الظهور
-- --------------------------------------------
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
    updated_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. جداول المستخدمين والمصادقة
-- ============================================

-- --------------------------------------------
-- 3.1 جدول ملفات المستخدمين
-- --------------------------------------------
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

-- --------------------------------------------
-- 3.2 جدول المؤسسات
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES user_profiles(id),
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------
-- 3.3 جدول أعضاء المؤسسة
-- --------------------------------------------
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
-- 4. الفهارس Indexes للأداء
-- ============================================

-- فهارس جدول البرامج
CREATE INDEX IF NOT EXISTS idx_programs_quarter_id ON programs(quarter_id);
CREATE INDEX IF NOT EXISTS idx_programs_platform ON programs(platform);
CREATE INDEX IF NOT EXISTS idx_programs_system_platform ON programs(system_platform);
CREATE INDEX IF NOT EXISTS idx_programs_created_at ON programs(created_at);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);
CREATE INDEX IF NOT EXISTS idx_programs_org_id ON programs(organization_id);

-- فهارس جدول البودكاست
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_status ON podcast_episodes(status);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_publish_date ON podcast_episodes(publish_date);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_season ON podcast_episodes(season, episode_number);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_user_id ON podcast_episodes(user_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_org_id ON podcast_episodes(organization_id);

-- فهارس جدول المنشورات
CREATE INDEX IF NOT EXISTS idx_social_posts_program_id ON social_posts(program_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_date ON social_posts(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_org_id ON social_posts(organization_id);

-- فهارس جدول المحتوى
CREATE INDEX IF NOT EXISTS idx_content_items_platform ON content_items(platform);
CREATE INDEX IF NOT EXISTS idx_content_items_section ON content_items(section);
CREATE INDEX IF NOT EXISTS idx_content_items_active ON content_items(is_active);

-- فهارس جدول الظهور
CREATE INDEX IF NOT EXISTS idx_visibility_settings_key ON visibility_settings(section_key);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_parent ON visibility_settings(parent_section);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_order ON visibility_settings(display_order);

-- فهارس جداول المستخدمين
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON organization_members(organization_id);

-- ============================================
-- 5. أمان الصفوف RLS - Row Level Security
-- ============================================

-- تفعيل أمان الصفوف على جميع الجداول
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------
-- 5.1 سياسات منصات التواصل
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_platforms" ON platforms;
DROP POLICY IF EXISTS "public_insert_platforms" ON platforms;
DROP POLICY IF EXISTS "public_update_platforms" ON platforms;
DROP POLICY IF EXISTS "public_delete_platforms" ON platforms;

CREATE POLICY "public_read_platforms" ON platforms FOR SELECT USING (true);
CREATE POLICY "public_insert_platforms" ON platforms FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_platforms" ON platforms FOR UPDATE USING (true);
CREATE POLICY "public_delete_platforms" ON platforms FOR DELETE USING (true);

-- --------------------------------------------
-- 5.2 سياسات المنصات النظامية
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_system_platforms" ON system_platforms;
DROP POLICY IF EXISTS "public_insert_system_platforms" ON system_platforms;
DROP POLICY IF EXISTS "public_update_system_platforms" ON system_platforms;
DROP POLICY IF EXISTS "public_delete_system_platforms" ON system_platforms;

CREATE POLICY "public_read_system_platforms" ON system_platforms FOR SELECT USING (true);
CREATE POLICY "public_insert_system_platforms" ON system_platforms FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_system_platforms" ON system_platforms FOR UPDATE USING (true);
CREATE POLICY "public_delete_system_platforms" ON system_platforms FOR DELETE USING (true);

-- --------------------------------------------
-- 5.3 سياسات البرامج
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_programs" ON programs;
DROP POLICY IF EXISTS "public_insert_programs" ON programs;
DROP POLICY IF EXISTS "public_update_programs" ON programs;
DROP POLICY IF EXISTS "public_delete_programs" ON programs;

CREATE POLICY "public_read_programs" ON programs FOR SELECT USING (true);
CREATE POLICY "public_insert_programs" ON programs FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_programs" ON programs FOR UPDATE USING (true);
CREATE POLICY "public_delete_programs" ON programs FOR DELETE USING (true);

-- --------------------------------------------
-- 5.4 سياسات البودكاست
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_podcast" ON podcast_episodes;
DROP POLICY IF EXISTS "public_insert_podcast" ON podcast_episodes;
DROP POLICY IF EXISTS "public_update_podcast" ON podcast_episodes;
DROP POLICY IF EXISTS "public_delete_podcast" ON podcast_episodes;

CREATE POLICY "public_read_podcast" ON podcast_episodes FOR SELECT USING (true);
CREATE POLICY "public_insert_podcast" ON podcast_episodes FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_podcast" ON podcast_episodes FOR UPDATE USING (true);
CREATE POLICY "public_delete_podcast" ON podcast_episodes FOR DELETE USING (true);

-- --------------------------------------------
-- 5.5 سياسات المنشورات
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_posts" ON social_posts;
DROP POLICY IF EXISTS "public_insert_posts" ON social_posts;
DROP POLICY IF EXISTS "public_update_posts" ON social_posts;
DROP POLICY IF EXISTS "public_delete_posts" ON social_posts;

CREATE POLICY "public_read_posts" ON social_posts FOR SELECT USING (true);
CREATE POLICY "public_insert_posts" ON social_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_posts" ON social_posts FOR UPDATE USING (true);
CREATE POLICY "public_delete_posts" ON social_posts FOR DELETE USING (true);

-- --------------------------------------------
-- 5.6 سياسات المحتوى CMS
-- --------------------------------------------
DROP POLICY IF EXISTS "authenticated_read_content" ON content_items;
DROP POLICY IF EXISTS "authenticated_insert_content" ON content_items;
DROP POLICY IF EXISTS "authenticated_update_content" ON content_items;
DROP POLICY IF EXISTS "authenticated_delete_content" ON content_items;

CREATE POLICY "authenticated_read_content" ON content_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_insert_content" ON content_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated_update_content" ON content_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_delete_content" ON content_items FOR DELETE TO authenticated USING (true);

-- --------------------------------------------
-- 5.7 سياسات إعدادات الظهور
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_visibility" ON visibility_settings;
DROP POLICY IF EXISTS "admin_update_visibility" ON visibility_settings;
DROP POLICY IF EXISTS "admin_insert_visibility" ON visibility_settings;
DROP POLICY IF EXISTS "admin_delete_visibility" ON visibility_settings;

CREATE POLICY "public_read_visibility" ON visibility_settings FOR SELECT USING (true);

CREATE POLICY "admin_update_visibility" ON visibility_settings FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "admin_insert_visibility" ON visibility_settings FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "admin_delete_visibility" ON visibility_settings FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
);

-- --------------------------------------------
-- 5.8 سياسات ملفات المستخدمين
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_profiles" ON user_profiles;
DROP POLICY IF EXISTS "user_insert_own_profile" ON user_profiles;
DROP POLICY IF EXISTS "user_update_own_profile" ON user_profiles;

CREATE POLICY "public_read_profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "user_insert_own_profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "user_update_own_profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- --------------------------------------------
-- 5.9 سياسات المؤسسات
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_orgs" ON organizations;
DROP POLICY IF EXISTS "owner_insert_org" ON organizations;
DROP POLICY IF EXISTS "owner_update_own_org" ON organizations;

CREATE POLICY "public_read_orgs" ON organizations FOR SELECT USING (true);
CREATE POLICY "owner_insert_org" ON organizations FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "owner_update_own_org" ON organizations FOR UPDATE USING (auth.uid() = owner_id);

-- --------------------------------------------
-- 5.10 سياسات أعضاء المؤسسة
-- --------------------------------------------
DROP POLICY IF EXISTS "public_read_members" ON organization_members;
DROP POLICY IF EXISTS "owner_manage_members" ON organization_members;

CREATE POLICY "public_read_members" ON organization_members FOR SELECT USING (true);

CREATE POLICY "owner_manage_members" ON organization_members FOR ALL USING (
    EXISTS (
        SELECT 1 FROM organizations o
        WHERE o.id = organization_members.organization_id
        AND o.owner_id = auth.uid()
    )
);

-- ============================================
-- 6. الدوال Functions
-- ============================================

-- --------------------------------------------
-- 6.1 دالة تحديث timestamp
-- --------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------
-- 6.2 دالة تحديث ملف المستخدم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION update_user_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------
-- 6.3 دالة تحديث إعدادات الظهور
-- --------------------------------------------
CREATE OR REPLACE FUNCTION update_visibility_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_by = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.4 دالة تحديث المحتوى
-- --------------------------------------------
CREATE OR REPLACE FUNCTION update_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------
-- 6.5 دالة معالجة المستخدم الجديد
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.6 دالة الحصول على ID المستخدم الحالي
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.7 دالة الحصول على بريد المستخدم الحالي
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT email FROM auth.users
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.8 دالة التحقق من صلاحيات المدير
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.is_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.9 دالة الحصول على مؤسسات المستخدم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.get_user_organizations()
RETURNS TABLE(
    organization_id UUID,
    name TEXT,
    slug TEXT,
    role TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        o.id,
        o.name,
        o.slug,
        om.role
    FROM organizations o
    JOIN organization_members om ON o.id = om.organization_id
    WHERE om.user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.10 دالة التحقق من ظهور القسم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION is_section_visible(section_key_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    is_visible BOOLEAN;
BEGIN
    SELECT vs.is_visible INTO is_visible
    FROM visibility_settings vs
    WHERE vs.section_key = section_key_param;

    RETURN COALESCE(is_visible, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.11 دالة التحقق من صلاحية القسم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION has_section_access(section_key_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    requires_auth BOOLEAN;
    is_visible BOOLEAN;
    user_role TEXT;
BEGIN
    SELECT vs.requires_auth, vs.is_visible
    INTO requires_auth, is_visible
    FROM visibility_settings vs
    WHERE vs.section_key = section_key_param;

    IF NOT is_visible THEN
        RETURN FALSE;
    END IF;

    IF NOT requires_auth THEN
        RETURN TRUE;
    END IF;

    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT up.role INTO user_role
    FROM user_profiles up
    WHERE up.id = auth.uid();

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.12 دالة الحصول على الأقسام الظاهرة
-- --------------------------------------------
CREATE OR REPLACE FUNCTION get_visible_sections()
RETURNS TABLE(
    section_key TEXT,
    section_name TEXT,
    section_name_ar TEXT,
    display_order INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        vs.section_key,
        vs.section_name,
        vs.section_name_ar,
        vs.display_order
    FROM visibility_settings vs
    WHERE vs.is_visible = true
        AND (
            vs.requires_auth = false
            OR auth.uid() IS NOT NULL
        )
    ORDER BY vs.display_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.13 دالة تبديل ظهور القسم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION toggle_section_visibility(
    section_key_param TEXT,
    visible BOOLEAN
)
RETURNS VOID AS $$
BEGIN
    UPDATE visibility_settings
    SET is_visible = visible
    WHERE section_key = section_key_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.14 دالة تعيين متطلبات المصادقة
-- --------------------------------------------
CREATE OR REPLACE FUNCTION set_section_requires_auth(
    section_key_param TEXT,
    requires_auth BOOLEAN
)
RETURNS VOID AS $$
BEGIN
    UPDATE visibility_settings
    SET requires_auth = requires_auth
    WHERE section_key = section_key_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.15 دالة التحديث الجماعي للظهور
-- --------------------------------------------
CREATE OR REPLACE FUNCTION bulk_update_visibility(
    updates JSONB
)
RETURNS INTEGER AS $$
DECLARE
    update_record RECORD;
    count INTEGER := 0;
BEGIN
    FOR update_record IN SELECT * FROM jsonb_each_text(updates)
    LOOP
        UPDATE visibility_settings
        SET is_visible = (update_record.value::boolean)
        WHERE section_key = update_record.key;
        count := count + 1;
    END LOOP;

    RETURN count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------
-- 6.16 دالة الحصول على برنامج مع منشوراته
-- --------------------------------------------
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

-- --------------------------------------------
-- 6.17 دالة الحصول على إحصائيات الحلقة
-- --------------------------------------------
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

-- --------------------------------------------
-- 6.18 دالة حذف حساب المستخدم
-- --------------------------------------------
CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS VOID AS $$
DECLARE
    user_uuid UUID := auth.uid();
BEGIN
    DELETE FROM programs WHERE user_id = user_uuid;
    DELETE FROM podcast_episodes WHERE user_id = user_uuid;
    DELETE FROM social_posts WHERE user_id = user_uuid;
    DELETE FROM organization_members WHERE user_id = user_uuid;
    DELETE FROM user_profiles WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. المحفزات Triggers
-- ============================================

-- محفزات التحديث التلقائي
DROP TRIGGER IF EXISTS update_platforms_updated_at ON platforms;
DROP TRIGGER IF EXISTS update_system_platforms_updated_at ON system_platforms;
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
DROP TRIGGER IF EXISTS update_podcast_episodes_updated_at ON podcast_episodes;
DROP TRIGGER IF EXISTS update_social_posts_updated_at ON social_posts;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
DROP TRIGGER IF EXISTS update_visibility_settings_updated_at ON visibility_settings;
DROP TRIGGER IF EXISTS update_content_timestamp ON content_items;

CREATE TRIGGER update_platforms_updated_at BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_platforms_updated_at BEFORE UPDATE ON system_platforms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_user_profile_updated_at();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visibility_settings_updated_at BEFORE UPDATE ON visibility_settings FOR EACH ROW EXECUTE FUNCTION update_visibility_settings_updated_at();
CREATE TRIGGER update_content_timestamp BEFORE UPDATE ON content_items FOR EACH ROW EXECUTE FUNCTION update_content_updated_at();

-- محفز إنشاء ملف المستخدم تلقائياً
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 8. العروض Views
-- ============================================

-- عرض البرامج حسب الربع
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

-- عرض إحصائيات البودكاست
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

-- عرض المنشورات حسب المنصة
CREATE OR REPLACE VIEW social_posts_by_platform AS
SELECT
    platform,
    platform_name,
    status,
    COUNT(*) as post_count
FROM social_posts
GROUP BY platform, platform_name, status
ORDER BY platform, status;

-- عرض نظرة عامة على الظهور
CREATE OR REPLACE VIEW admin_visibility_overview AS
SELECT
    section_key,
    section_name,
    section_name_ar,
    is_visible,
    requires_auth,
    parent_section,
    display_order,
    updated_by,
    updated_at
FROM visibility_settings
ORDER BY
    CASE WHEN parent_section IS NULL THEN 0 ELSE 1 END,
    parent_section,
    display_order;

-- عرض إحصائيات الظهور
CREATE OR REPLACE VIEW admin_visibility_stats AS
SELECT
    COUNT(*) as total_sections,
    COUNT(*) FILTER (WHERE is_visible = true) as visible_sections,
    COUNT(*) FILTER (WHERE is_visible = false) as hidden_sections,
    COUNT(*) FILTER (WHERE requires_auth = true) as auth_required_sections,
    COUNT(*) FILTER (WHERE requires_auth = false) as public_sections
FROM visibility_settings;

-- عرض المستخدمين للمديرين
CREATE OR REPLACE VIEW admin_users_view AS
SELECT
    u.id,
    u.email,
    u.created_at,
    u.updated_at,
    u.email_confirmed_at,
    p.full_name,
    p.role,
    p.avatar_url,
    CASE
        WHEN u.last_sign_in_at IS NOT NULL THEN 'active'
        ELSE 'inactive'
    END as status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- ============================================
-- 9. البيانات الافتراضية Seed Data
-- ============================================

-- --------------------------------------------
-- 9.1 منصات التواصل الاجتماعي
-- --------------------------------------------
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

-- --------------------------------------------
-- 9.2 المنصات النظامية
-- --------------------------------------------
INSERT INTO system_platforms (id, name, name_ar, color, icon) VALUES
    ('news', 'News', 'الأخبار', '#00E1C1', '📰'),
    ('academy', 'Academy', 'الأكاديمية', '#F59E0B', '🎓'),
    ('radar', 'Radar', 'الرادار', '#EF4444', '📡'),
    ('launch', 'Launch', 'الإطلاق', '#3B82F6', '🚀'),
    ('saudi', 'Saudi', 'السعودية', '#10B981', '🇸🇦')
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------
-- 9.3 حلقات البودكاست النموذجية
-- --------------------------------------------
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

-- --------------------------------------------
-- 9.4 إعدادات الظهور الافتراضية
-- --------------------------------------------
INSERT INTO visibility_settings (section_key, section_name, section_name_ar, is_visible, requires_auth, display_order) VALUES
    -- المنصات الرئيسية
    ('platform_news', 'News Platform', 'منصة المستثمر الإخبارية', true, false, 1),
    ('platform_academy', 'Academy Platform', 'أكاديمية المستثمر', true, false, 2),
    ('platform_radar', 'Radar Platform', 'رادار المستثمر', true, false, 3),
    ('platform_launch', 'Launch Platform', 'مساعد الإطلاق', true, false, 4),
    ('platform_saudi', 'Saudi Platform', 'المستثمر سعودية', true, false, 5),

    -- ميزات التخطيط
    ('feature_planning', 'Yearly Planning', 'التخطيط السنوي', true, false, 10),
    ('feature_planning_q1', 'Q1 Planning', 'تخطيط الربع الأول', true, false, 11),
    ('feature_planning_q2', 'Q2 Planning', 'تخطيط الربع الثاني', true, false, 12),
    ('feature_planning_q3', 'Q3 Planning', 'تخطيط الربع الثالث', true, false, 13),
    ('feature_planning_q4', 'Q4 Planning', 'تخطيط الربع الرابع', true, false, 14),

    -- ميزات البودكاست
    ('feature_podcast', 'Podcast', 'البودكاست', true, false, 20),
    ('feature_podcast_play', 'Play Episodes', 'تشغيل الحلقات', true, false, 21),
    ('feature_podcast_upload', 'Upload Audio', 'رفع الملفات الصوتية', false, true, 22),

    -- ميزات التواصل الاجتماعي
    ('feature_social', 'Social Media', 'منصات التواصل', true, false, 30),
    ('feature_social_toggle', 'Toggle Platforms', 'تفعيل المنصات', false, true, 31),
    ('feature_social_programs', 'Social Programs', 'برامج التواصل', false, true, 32),

    -- ميزات التصدير والاستيراد
    ('feature_export', 'Export Data', 'تصدير البيانات', true, false, 40),
    ('feature_import', 'Import Data', 'استيراد البيانات', false, true, 41),
    ('feature_ai_template', 'AI Template', 'قوالب الذكاء الاصطناعي', true, false, 42),

    -- ميزات المدير
    ('feature_admin', 'Admin Panel', 'لوحة التحكم', false, true, 50),
    ('feature_admin_users', 'User Management', 'إدارة المستخدمين', false, true, 51),
    ('feature_admin_visibility', 'Visibility Control', 'التحكم في الظهور', false, true, 52)
ON CONFLICT (section_key) DO NOTHING;

-- ============================================
-- 10. التعليقات Comments للتوثيق
-- ============================================

COMMENT ON TABLE platforms IS 'إعدادات منصات التواصل الاجتماعي';
COMMENT ON TABLE system_platforms IS 'المنصات النظامية: أخبار، أكاديمية، رادار، إطلاق، سعودية';
COMMENT ON TABLE programs IS 'البرامج السنوية الموزعة على أرباع السنة';
COMMENT ON TABLE podcast_episodes IS 'حلقات البودكاست مع الملفات الصوتية والبيانات الوصفية';
COMMENT ON TABLE social_posts IS 'منشورات التواصل الاجتماعي المرتبطة بالبرامج';
COMMENT ON TABLE content_items IS 'محتوى الموقع القابل للتعديل (CMS)';
COMMENT ON TABLE visibility_settings IS 'التحكم في ظهور الأقسام والميزات للزوار والمستخدمين';
COMMENT ON TABLE user_profiles IS 'ملفات المستخدمين المرتبطة بحسابات المصادقة';
COMMENT ON TABLE organizations IS 'المؤسسات والاشتراكات';
COMMENT ON TABLE organization_members IS 'أعضاء المؤسسات وصلاحياتهم';

COMMENT ON COLUMN programs.quarter_id IS 'الربع: 1=الربع الأول، 2=الربع الثاني، 3=الربع الثالث، 4=الربع الرابع، NULL=غير معين';
COMMENT ON COLUMN programs.system_platform IS 'المنصة النظامية: news, academy, radar, launch, saudi';
COMMENT ON COLUMN podcast_episodes.status IS 'حالة الحلقة: draft, scheduled, published';
COMMENT ON COLUMN social_posts.post_type IS 'نوع المنشور: text, image, video, carousel';
COMMENT ON COLUMN user_profiles.role IS 'دور المستخدم: user, admin, superadmin';
COMMENT ON COLUMN visibility_settings.is_visible IS 'هل القسم ظاهر أم لا';
COMMENT ON COLUMN visibility_settings.requires_auth IS 'هل القسم يتطلب تسجيل الدخول';

-- ============================================
-- 11. استعلامات التحقق Verification Queries
-- ============================================

-- عرض ملخص قاعدة البيانات
SELECT
    '✅ تم إعداد قاعدة البيانات بنجاح!' as status,
    (SELECT COUNT(*) FROM platforms) as platforms_count,
    (SELECT COUNT(*) FROM system_platforms) as system_platforms_count,
    (SELECT COUNT(*) FROM programs) as programs_count,
    (SELECT COUNT(*) FROM podcast_episodes) as episodes_count,
    (SELECT COUNT(*) FROM social_posts) as posts_count,
    (SELECT COUNT(*) FROM content_items) as content_items_count,
    (SELECT COUNT(*) FROM visibility_settings) as visibility_settings_count,
    (SELECT COUNT(*) FROM user_profiles) as users_count,
    (SELECT COUNT(*) FROM organizations) as orgs_count;

-- ============================================
-- نهاية ملف قاعدة البيانات الشامل
-- End of Comprehensive Database Schema
-- ============================================
