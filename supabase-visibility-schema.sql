-- ============================================
-- VISIBILITY CONTROL SYSTEM
-- ============================================
-- Allows admins to control what visitors can see
-- Run this AFTER supabase-auth-schema.sql

-- ============================================
-- 1. VISIBILITY SETTINGS TABLE
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
-- 2. SEED DEFAULT VISIBILITY SETTINGS
-- ============================================
INSERT INTO visibility_settings (section_key, section_name, section_name_ar, is_visible, requires_auth, display_order) VALUES
    -- Main Platforms
    ('platform_news', 'News Platform', 'منصة المستثمر الإخبارية', true, false, 1),
    ('platform_academy', 'Academy Platform', 'أكاديمية المستثمر', true, false, 2),
    ('platform_radar', 'Radar Platform', 'رادار المستثمر', true, false, 3),
    ('platform_launch', 'Launch Platform', 'مساعد الإطلاق', true, false, 4),
    ('platform_saudi', 'Saudi Platform', 'المستثمر سعودية', true, false, 5),
    
    -- Planning Features
    ('feature_planning', 'Yearly Planning', 'التخطيط السنوي', true, false, 10),
    ('feature_planning_q1', 'Q1 Planning', 'تخطيط الربع الأول', true, false, 11),
    ('feature_planning_q2', 'Q2 Planning', 'تخطيط الربع الثاني', true, false, 12),
    ('feature_planning_q3', 'Q3 Planning', 'تخطيط الربع الثالث', true, false, 13),
    ('feature_planning_q4', 'Q4 Planning', 'تخطيط الربع الرابع', true, false, 14),
    
    -- Podcast Features
    ('feature_podcast', 'Podcast', 'البودكاست', true, false, 20),
    ('feature_podcast_play', 'Play Episodes', 'تشغيل الحلقات', true, false, 21),
    ('feature_podcast_upload', 'Upload Audio', 'رفع الملفات الصوتية', false, true, 22),
    
    -- Social Media Features
    ('feature_social', 'Social Media', 'منصات التواصل', true, false, 30),
    ('feature_social_toggle', 'Toggle Platforms', 'تفعيل المنصات', false, true, 31),
    ('feature_social_programs', 'Social Programs', 'برامج التواصل', false, true, 32),
    
    -- Export/Import Features
    ('feature_export', 'Export Data', 'تصدير البيانات', true, false, 40),
    ('feature_import', 'Import Data', 'استيراد البيانات', false, true, 41),
    ('feature_ai_template', 'AI Template', 'قوالب الذكاء الاصطناعي', true, false, 42),
    
    -- Admin Features
    ('feature_admin', 'Admin Panel', 'لوحة التحكم', false, true, 50),
    ('feature_admin_users', 'User Management', 'إدارة المستخدمين', false, true, 51),
    ('feature_admin_visibility', 'Visibility Control', 'التحكم في الظهور', false, true, 52)
ON CONFLICT (section_key) DO NOTHING;

-- ============================================
-- 3. INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_visibility_settings_key ON visibility_settings(section_key);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_parent ON visibility_settings(parent_section);
CREATE INDEX IF NOT EXISTS idx_visibility_settings_order ON visibility_settings(display_order);

-- ============================================
-- 4. ENABLE RLS
-- ============================================
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. RLS POLICIES
-- ============================================

-- Everyone can VIEW visibility settings (needed to check what to show)
CREATE POLICY "Anyone can view visibility settings" ON visibility_settings
    FOR SELECT
    USING (true);

-- Only admins can UPDATE visibility settings
CREATE POLICY "Admins can update visibility settings" ON visibility_settings
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Only admins can INSERT visibility settings
CREATE POLICY "Admins can insert visibility settings" ON visibility_settings
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Only admins can DELETE visibility settings
CREATE POLICY "Admins can delete visibility settings" ON visibility_settings
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- ============================================
-- 6. HELPER FUNCTIONS
-- ============================================

-- Check if a section is visible
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

-- Check if user has access to section
CREATE OR REPLACE FUNCTION has_section_access(section_key_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    requires_auth BOOLEAN;
    is_visible BOOLEAN;
    user_role TEXT;
BEGIN
    -- Get section settings
    SELECT vs.requires_auth, vs.is_visible 
    INTO requires_auth, is_visible
    FROM visibility_settings vs
    WHERE vs.section_key = section_key_param;
    
    -- If section is not visible, deny access
    IF NOT is_visible THEN
        RETURN FALSE;
    END IF;
    
    -- If section doesn't require auth, allow access
    IF NOT requires_auth THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user is authenticated
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Get user role
    SELECT up.role INTO user_role
    FROM user_profiles up
    WHERE up.id = auth.uid();
    
    -- Allow access if user has required role
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get all visible sections for current user
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

-- ============================================
-- 7. AUTO-UPDATE TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_visibility_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_by = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_visibility_settings_updated_at
    BEFORE UPDATE ON visibility_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_visibility_settings_updated_at();

-- ============================================
-- 8. ADMIN HELPER FUNCTIONS
-- ============================================

-- Toggle section visibility
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

-- Set section requires auth
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

-- Bulk update sections
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

-- ============================================
-- 9. VIEWS FOR ADMIN DASHBOARD
-- ============================================

-- Visibility overview
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

-- Visibility stats
CREATE OR REPLACE VIEW admin_visibility_stats AS
SELECT
    COUNT(*) as total_sections,
    COUNT(*) FILTER (WHERE is_visible = true) as visible_sections,
    COUNT(*) FILTER (WHERE is_visible = false) as hidden_sections,
    COUNT(*) FILTER (WHERE requires_auth = true) as auth_required_sections,
    COUNT(*) FILTER (WHERE requires_auth = false) as public_sections
FROM visibility_settings;

-- ============================================
-- 10. COMMENTS
-- ============================================
COMMENT ON TABLE visibility_settings IS 'Controls visibility of sections/features for visitors and users';
COMMENT ON COLUMN visibility_settings.is_visible IS 'Whether the section is visible at all';
COMMENT ON COLUMN visibility_settings.requires_auth IS 'Whether the section requires authentication';
COMMENT ON COLUMN visibility_settings.parent_section IS 'Parent section key for nested visibility';
COMMENT ON FUNCTION is_section_visible IS 'Check if a section is visible';
COMMENT ON FUNCTION has_section_access IS 'Check if current user has access to section';
COMMENT ON FUNCTION get_visible_sections IS 'Get all sections visible to current user';

-- ============================================
-- END OF VISIBILITY CONTROL SYSTEM
-- ============================================

-- Verify setup
SELECT 
    'Visibility Control Setup Complete' as status,
    (SELECT COUNT(*) FROM visibility_settings) as total_settings,
    (SELECT COUNT(*) FROM visibility_settings WHERE is_visible = true) as visible_settings,
    (SELECT COUNT(*) FROM visibility_settings WHERE requires_auth = true) as auth_required_settings;
