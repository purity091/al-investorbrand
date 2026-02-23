-- ============================================
-- Admin User Management System
-- ============================================
-- Creates admin users with proper roles
-- Safe to run on existing Supabase projects
-- ============================================

-- ============================================
-- 1. Ensure profiles table has role column
-- ============================================

-- Add role column if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Add full_name column if not exists  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Add avatar_url column if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ============================================
-- 2. Create function to create admin user
-- ============================================

CREATE OR REPLACE FUNCTION create_admin_user(
    p_email TEXT,
    p_password TEXT,
    p_full_name TEXT,
    p_role TEXT DEFAULT 'admin'
)
RETURNS JSON AS $$
DECLARE
    v_user_id UUID;
    v_result JSON;
BEGIN
    -- Create user in auth.users
    INSERT INTO auth.users (
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        aud,
        role,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change
    )
    VALUES (
        p_email,
        crypt(p_password, gen_salt('bf')),
        NOW(),
        json_build_object('provider', 'email', 'providers', ARRAY['email']),
        json_build_object('full_name', p_full_name, 'role', p_role),
        'authenticated',
        'authenticated',
        '',
        '',
        '',
        ''
    )
    RETURNING id INTO v_user_id;
    
    -- Insert or update in public.profiles
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (v_user_id, p_email, p_full_name, p_role)
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        updated_at = NOW();
    
    RETURN json_build_object(
        'success', true,
        'user_id', v_user_id,
        'email', p_email,
        'role', p_role
    );
EXCEPTION
    WHEN unique_violation THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Email already exists'
        );
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION create_admin_user TO authenticated;

-- ============================================
-- 3. Create view to list all users
-- ============================================

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

-- Grant access to authenticated users
GRANT SELECT ON admin_users_view TO authenticated;

-- ============================================
-- 4. Function to update user role
-- ============================================

CREATE OR REPLACE FUNCTION update_user_role(
    p_user_id UUID,
    p_new_role TEXT
)
RETURNS JSON AS $$
BEGIN
    -- Update profile
    UPDATE public.profiles
    SET role = p_new_role
    WHERE id = p_user_id;
    
    -- Update auth metadata
    UPDATE auth.users
    SET raw_user_meta_data = raw_user_meta_data || json_build_object('role', p_new_role)
    WHERE id = p_user_id;
    
    RETURN json_build_object(
        'success', true,
        'user_id', p_user_id,
        'new_role', p_new_role
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION update_user_role TO authenticated;

-- ============================================
-- 5. Function to delete user
-- ============================================

CREATE OR REPLACE FUNCTION delete_user(p_user_id UUID)
RETURNS JSON AS $$
BEGIN
    -- Delete from profiles first
    DELETE FROM public.profiles WHERE id = p_user_id;
    
    -- Then delete from auth.users
    DELETE FROM auth.users WHERE id = p_user_id;
    
    RETURN json_build_object(
        'success', true,
        'deleted_user_id', p_user_id
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION delete_user TO authenticated;

-- ============================================
-- 6. Security Policies
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Only admins can create users" ON profiles;
DROP POLICY IF EXISTS "Only admins can update roles" ON profiles;

-- Only admins can create/update users
CREATE POLICY "Only admins can create users"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role') IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Only admins can update roles"
    ON profiles FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role') IN ('admin', 'superadmin')
        )
    );

-- ============================================
-- 7. Usage Examples (Uncomment to use)
-- ============================================

-- Create your first superadmin:
-- SELECT create_admin_user(
--     'admin@example.com',
--     'Admin@123',
--     'مدير النظام',
--     'superadmin'
-- );

-- View all users:
-- SELECT * FROM admin_users_view;

-- Update a user's role:
-- SELECT update_user_role('user-uuid-here', 'admin');

-- Delete a user:
-- SELECT delete_user('user-uuid-here');

-- ============================================
-- 8. Verification Queries
-- ============================================

-- Check if functions exist:
-- SELECT routine_name FROM information_schema.routines 
-- WHERE routine_schema = 'public' 
-- AND routine_name IN ('create_admin_user', 'update_user_role', 'delete_user');

-- Check profiles table structure:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'profiles';

-- View all users:
-- SELECT * FROM admin_users_view;
