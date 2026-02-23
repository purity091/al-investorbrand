-- ============================================
-- Fix system_platform column in programs table
-- ============================================
-- This ensures all existing programs have system_platform set
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add system_platform column if not exists
ALTER TABLE programs ADD COLUMN IF NOT EXISTS system_platform TEXT DEFAULT 'news';

-- 2. Update NULL values to 'news'
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL;

-- 3. Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_programs_system_platform ON programs(system_platform);

-- 4. Verify the fix
SELECT 
    system_platform, 
    COUNT(*) as program_count 
FROM programs 
GROUP BY system_platform 
ORDER BY system_platform;

-- Expected output:
-- system_platform | program_count
-- ----------------|---------------
-- news           | X
-- academy        | Y
-- radar          | Z
-- launch         | W
-- saudi          | V

-- 5. Check total programs
SELECT COUNT(*) as total_programs FROM programs;

-- 6. Sample programs to verify
SELECT 
    id, 
    title, 
    title_ar, 
    platform, 
    system_platform, 
    quarter_id,
    created_at
FROM programs 
ORDER BY created_at DESC 
LIMIT 10;
