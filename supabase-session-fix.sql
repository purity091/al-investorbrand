-- ============================================
-- EXTEND SESSION DURATION TO 90 DAYS
-- ============================================
-- Run this in your Supabase SQL Editor to extend JWT token lifetime
-- This will make users stay logged in for 90 days

-- Update the JWT token expiry to 90 days (7776000 seconds)
-- Note: This requires superuser access in Supabase

-- For Supabase Cloud, you need to set this in the Dashboard:
-- 1. Go to Authentication > Settings
-- 2. Find "JWT Expiry" setting
-- 3. Set it to 7776000 (90 days in seconds)
-- 4. Click "Save"

-- Alternatively, if you have access to modify auth config:
/*
ALTER DATABASE postgres SET "auth.jwt_expiry" = 7776000;
*/

-- The main fix is in the client-side code:
-- src/lib/supabase.ts has been updated with:
-- - persistSession: true
-- - autoRefreshToken: true  
-- - expiresIn: 7776000 (90 days)
-- - storage: localStorage (persists across browser restarts)
