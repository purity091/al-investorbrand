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

-- Update existing programs to have 'news' as default
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL;

-- Add comment
COMMENT ON COLUMN programs.system_platform IS 'System platform: news, academy, radar, launch, saudi';
