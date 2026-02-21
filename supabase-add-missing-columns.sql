    -- ============================================
    -- Brand System - Add Missing Columns Fix
    -- ============================================
    -- This adds missing columns to existing tables
    -- Run this in Supabase SQL Editor
    -- ============================================

    -- ============================================
    -- 1. ADD MISSING COLUMN TO PROGRAMS TABLE
    -- ============================================

    -- Add platform_color column if it doesn't exist
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS platform_color TEXT NOT NULL DEFAULT 'bg-[#1DA1F2]';

    -- Also ensure platform_name exists
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS platform_name TEXT NOT NULL DEFAULT 'Twitter';

    -- Add description and objectives columns
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS description_ar TEXT DEFAULT '';
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS objectives TEXT DEFAULT '';
    ALTER TABLE programs ADD COLUMN IF NOT EXISTS objectives_ar TEXT DEFAULT '';

    -- ============================================
    -- 2. VERIFY COLUMNS EXIST
    -- ============================================

    SELECT 
        column_name, 
        data_type, 
        is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'programs'
    ORDER BY ordinal_position;

    -- ============================================
    -- 3. EXPECTED COLUMNS
    -- ============================================

    -- You should see these columns:
    -- id, title, title_ar, platform, platform_name, platform_color, 
    -- posts_count, quarter_id, order, created_at, updated_at, user_id, organization_id

    -- ============================================
    -- 4. VERIFICATION QUERY
    -- ============================================

    SELECT 
        '✅ Columns Added Successfully!' as status,
        (SELECT COUNT(*) FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'programs') as programs_columns_count;
