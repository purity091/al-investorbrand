-- ============================================
-- Add system_platform column to programs table
-- ============================================
-- This allows programs to be associated with system platforms:
-- news, academy, radar, launch, saudi
-- ============================================

-- Add system_platform column if not exists
ALTER TABLE programs ADD COLUMN IF NOT EXISTS system_platform TEXT DEFAULT 'news';

-- Add index for faster filtering
CREATE INDEX IF NOT EXISTS idx_programs_system_platform ON programs(system_platform);

-- Update existing programs to have 'news' as default (or their current platform)
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL;

-- Add comment
COMMENT ON COLUMN programs.system_platform IS 'System platform: news, academy, radar, launch, saudi';

-- ============================================
-- Create platforms table if not exists (for system platforms)
-- ============================================
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

-- Insert system platforms (ignore if exists)
INSERT INTO system_platforms (id, name, name_ar, color, icon) VALUES
    ('news', 'News', 'الأخبار', '#00E1C1', '📰'),
    ('academy', 'Academy', 'الأكاديمية', '#F59E0B', '🎓'),
    ('radar', 'Radar', 'الرادار', '#EF4444', '📡'),
    ('launch', 'Launch', 'الإطلاق', '#3B82F6', '🚀'),
    ('saudi', 'Saudi', 'السعودية', '#10B981', '🇸🇦')
ON CONFLICT (id) DO NOTHING;
