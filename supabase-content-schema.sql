-- ============================================
-- Content Management System (CMS) Schema
-- ============================================
-- Safe to run multiple times - handles duplicates gracefully
-- ============================================

-- Drop and recreate table for clean install (uncomment if needed)
-- DROP TABLE IF EXISTS content_items CASCADE;

-- Content items table
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_items_platform ON content_items(platform);
CREATE INDEX IF NOT EXISTS idx_content_items_section ON content_items(section);
CREATE INDEX IF NOT EXISTS idx_content_items_active ON content_items(is_active);

-- Comments
COMMENT ON TABLE content_items IS 'Stores all editable text content for the website';
COMMENT ON COLUMN content_items.platform IS 'System platform: news, academy, radar, launch, saudi';
COMMENT ON COLUMN content_items.section IS 'Page section: snapshot, core, strategy, etc.';
COMMENT ON COLUMN content_items.field_key IS 'Unique field identifier';
COMMENT ON COLUMN content_items.field_type IS 'Input type: text, textarea, rich_text';
COMMENT ON COLUMN content_items.content_en IS 'English version';
COMMENT ON COLUMN content_items.content_ar IS 'Arabic version (required)';

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS update_content_timestamp ON content_items;
CREATE TRIGGER update_content_timestamp
    BEFORE UPDATE ON content_items
    FOR EACH ROW
    EXECUTE FUNCTION update_content_updated_at();

-- Grants
GRANT ALL ON content_items TO authenticated;
GRANT SELECT ON content_items TO anon;

-- RLS
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to view content" ON content_items;
DROP POLICY IF EXISTS "Allow authenticated users to insert content" ON content_items;
DROP POLICY IF EXISTS "Allow authenticated users to update content" ON content_items;
DROP POLICY IF EXISTS "Allow authenticated users to delete content" ON content_items;

-- Create policies
CREATE POLICY "Allow authenticated users to view content"
    ON content_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert content"
    ON content_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update content"
    ON content_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete content"
    ON content_items FOR DELETE TO authenticated USING (true);

-- ============================================
-- Insert Default Content
-- Uses simple pattern that handles duplicates
-- ============================================

DO $$
DECLARE
    plat TEXT;
    sect TEXT;
    platforms TEXT[] := ARRAY['news', 'academy', 'radar', 'launch', 'saudi'];
    sections TEXT[] := ARRAY['snapshot', 'core', 'strategy', 'ecosystem', 'visual', 'messaging', 'social-content', 'social', 'social-media', 'podcast', 'planning', 'regional', 'digital', 'apps', 'guidelines', 'developers'];
BEGIN
    FOREACH plat IN ARRAY platforms
    LOOP
        FOREACH sect IN ARRAY sections
        LOOP
            -- Insert all 7 fields for this platform/section
            INSERT INTO content_items (platform, section, field_key, field_type, content_ar, content_en) VALUES
                (plat, sect, 'hero_title', 'text', 'عنوان القسم', 'Section Title'),
                (plat, sect, 'hero_subtitle', 'text', 'وصف مختصر', 'Brief description'),
                (plat, sect, 'main_content', 'textarea', 'المحتوى الرئيسي...', 'Main content...'),
                (plat, sect, 'mission_title', 'text', 'العنوان', 'Title'),
                (plat, sect, 'mission_description', 'textarea', 'الوصف...', 'Description...'),
                (plat, sect, 'vision_title', 'text', 'الرؤية', 'Vision'),
                (plat, sect, 'vision_description', 'textarea', 'وصف الرؤية...', 'Vision description...')
            ON CONFLICT (platform, section, field_key) DO UPDATE SET
                content_ar = EXCLUDED.content_ar,
                content_en = EXCLUDED.content_en,
                field_type = EXCLUDED.field_type,
                updated_at = NOW();
        END LOOP;
    END LOOP;
END $$;

-- Verification queries (uncomment to run)
-- SELECT COUNT(*) as total FROM content_items; -- Should be 560
-- SELECT platform, section, COUNT(*) as count FROM content_items GROUP BY platform, section ORDER BY platform, section; -- Should be 7 for each
