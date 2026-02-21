-- ============================================
-- SUPABASE AUTHENTICATION SETUP
-- ============================================
-- This extends the existing schema with real authentication
-- Run this AFTER supabase-schema.sql

-- ============================================
-- 1. ENABLE SUPABASE AUTH EXTENSIONS
-- ============================================
-- Auth is already enabled by default in Supabase
-- This section shows additional auth configurations

-- ============================================
-- 2. CREATE USER PROFILES TABLE
-- ============================================
-- Links to auth.users table automatically
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
-- 3. CREATE ORGANIZATIONS TABLE
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
-- 4. CREATE ORGANIZATION MEMBERS TABLE
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
-- 5. UPDATE EXISTING TABLES WITH USER IDS
-- ============================================

-- Add user_id to programs
ALTER TABLE programs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- Add user_id to podcast_episodes
ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE podcast_episodes ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- Add user_id to social_posts
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;

-- ============================================
-- 6. CREATE INDEXES FOR PERFORMANCE
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
-- 7. AUTO-UPDATE TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_user_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_user_profile_updated_at();

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- These policies ensure users can only access their own data

-- User Profiles Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

-- Organizations Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their organization" ON organizations
    FOR SELECT
    USING (
        id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Owners can update their organization" ON organizations
    FOR UPDATE
    USING (
        id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid() AND role = 'owner'
        )
    );

CREATE POLICY "Users can create organizations" ON organizations
    FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Organization Members Policies
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view organization members" ON organization_members
    FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can manage members" ON organization_members
    FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid() AND role = 'owner'
        )
    );

-- Programs Policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own programs" ON programs
    FOR SELECT
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can create their own programs" ON programs
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own programs" ON programs
    FOR UPDATE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own programs" ON programs
    FOR DELETE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

-- Podcast Episodes Policies
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own episodes" ON podcast_episodes
    FOR SELECT
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can create their own episodes" ON podcast_episodes
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own episodes" ON podcast_episodes
    FOR UPDATE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own episodes" ON podcast_episodes
    FOR DELETE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

-- Social Posts Policies
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own posts" ON social_posts
    FOR SELECT
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid() AND up.role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Users can create their own posts" ON social_posts
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own posts" ON social_posts
    FOR UPDATE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own posts" ON social_posts
    FOR DELETE
    USING (
        user_id = auth.uid()
        OR
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );

-- ============================================
-- 9. AUTH TRIGGER - AUTO CREATE PROFILE
-- ============================================
-- Automatically creates user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 10. HELPER FUNCTIONS
-- ============================================

-- Get current user ID
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get current user email
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS TEXT AS $$
BEGIN
    RETURN auth.users.email
    FROM auth.users
    WHERE auth.users.id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is admin
CREATE OR REPLACE FUNCTION public.is_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user's organizations
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

-- ============================================
-- 11. SEED DATA - CREATE ADMIN USER
-- ============================================
-- Note: This must be run manually in Supabase Dashboard
-- Or use the Supabase Auth API to create users

-- Example: Create admin user (run in SQL Editor with proper permissions)
-- This is just a template - actual user creation should be done via Auth API
/*
INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    'admin@example.com',
    crypt('YourSecurePassword123!', gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Admin User"}',
    NOW(),
    NOW()
);
*/

-- ============================================
-- 12. STORAGE BUCKET POLICIES
-- ============================================
-- For podcast-audio bucket (created in Supabase Dashboard)

-- Allow authenticated users to upload audio files
/*
CREATE POLICY "Users can upload audio files"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'podcast-audio'
    AND auth.role() = 'authenticated'
);

-- Allow users to read their own audio files
CREATE POLICY "Users can read their own audio files"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'podcast-audio'
    AND (
        owner = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    )
);

-- Allow users to delete their own audio files
CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'podcast-audio'
    AND owner = auth.uid()
);
*/

-- ============================================
-- 13. EMAIL TEMPLATES CONFIGURATION
-- ============================================
-- Configure in Supabase Dashboard > Authentication > Email Templates

-- Email Confirmation Template:
/*
<h2>Welcome to Brand System!</h2>
<p>Thank you for signing up. Please confirm your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>
*/

-- Password Reset Template:
/*
<h2>Password Reset Request</h2>
<p>We received a request to reset your password. Click the link below to reset it:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>This link will expire in 24 hours.</p>
*/

-- ============================================
-- 14. CLEANUP FUNCTIONS
-- ============================================

-- Function to delete user data (for account deletion)
CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS VOID AS $$
DECLARE
    user_uuid UUID := auth.uid();
BEGIN
    -- Delete user's programs
    DELETE FROM programs WHERE user_id = user_uuid;
    
    -- Delete user's podcast episodes
    DELETE FROM podcast_episodes WHERE user_id = user_uuid;
    
    -- Delete user's social posts
    DELETE FROM social_posts WHERE user_id = user_uuid;
    
    -- Delete user's organization memberships
    DELETE FROM organization_members WHERE user_id = user_uuid;
    
    -- Delete user's profile (will cascade to auth.users)
    DELETE FROM user_profiles WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- END OF AUTH SCHEMA
-- ============================================

-- Verify setup
SELECT 
    'Auth Schema Setup Complete' as status,
    (SELECT COUNT(*) FROM user_profiles) as user_count,
    (SELECT COUNT(*) FROM organizations) as org_count,
    (SELECT COUNT(*) FROM programs WHERE user_id IS NOT NULL) as programs_with_user,
    (SELECT COUNT(*) FROM podcast_episodes WHERE user_id IS NOT NULL) as episodes_with_user;
