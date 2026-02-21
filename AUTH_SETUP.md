# 🔐 Supabase Authentication Setup Guide

## Overview

This guide covers setting up **real authentication** with Supabase Auth (not just frontend auth).

---

## 📋 What's Included

### ✅ Authentication Features
- **Email/Password Sign In**
- **Email/Password Sign Up**
- **Password Reset** via email
- **User Profiles** linked to auth.users
- **Role-based Access** (user, admin, superadmin)
- **Organization Support** (multi-tenant)
- **Row Level Security** (RLS) policies
- **Auto-create Profile** on signup

### 🛡️ Security Features
- Secure password hashing (bcrypt)
- JWT tokens with expiry
- Email confirmation (optional)
- Rate limiting on auth endpoints
- RLS policies for data isolation

---

## 🚀 Setup Steps

### Step 1: Run Auth Schema

1. Open **Supabase Dashboard** > **SQL Editor**
2. Copy contents of `supabase-auth-schema.sql`
3. Paste and click **"Run"**
4. Verify success message

This creates:
- `user_profiles` table
- `organizations` table
- `organization_members` table
- RLS policies
- Auth triggers
- Helper functions

### Step 2: Configure Email Settings

#### For Development (Email Confirmation Disabled):

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Toggle **"Enable email confirmations"** = OFF (for testing)
4. Save changes

#### For Production (Email Confirmation Enabled):

1. Go to **Authentication** > **Email Templates**
2. Configure SMTP in **Project Settings** > **Auth**
3. Customize email templates:
   - Confirmation Email
   - Password Reset Email
   - Magic Link Email

### Step 3: Create First Admin User

#### Option A: Via Supabase Dashboard

1. Go to **Authentication** > **Users**
2. Click **"Add user"**
3. Enter email and temporary password
4. Click **"Create user"**
5. Go to **SQL Editor** and run:

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-admin@email.com';
```

#### Option B: Via Sign Up (Recommended)

1. Use the app's sign-up form
2. Create account with admin email
3. Run SQL to set admin role:

```sql
UPDATE user_profiles 
SET role = 'admin', 
    full_name = 'Admin User'
WHERE email = 'your-admin@email.com';
```

### Step 4: Update Frontend .env

Ensure your `.env` has correct values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-key
```

### Step 5: Test Authentication

1. Run `npm run dev`
2. Navigate to `/login`
3. Try signing up with a test account
4. Check email for confirmation (if enabled)
5. Sign in with credentials
6. Verify redirect to `/news`

---

## 🔧 How It Works

### Authentication Flow

```
1. User enters email/password
   ↓
2. Supabase Auth validates credentials
   ↓
3. JWT token returned and stored
   ↓
4. User profile loaded from user_profiles table
   ↓
5. User redirected to app
   ↓
6. Auth state persists across refreshes
```

### Auto-Profile Creation

When a user signs up:
1. Entry created in `auth.users` table
2. Trigger `on_auth_user_created` fires
3. Profile auto-created in `user_profiles`
4. User can immediately use the app

### Row Level Security (RLS)

**Users can only access their own data:**

```sql
-- Example: Programs policy
CREATE POLICY "Users can view their own programs" 
ON programs
FOR SELECT
USING (user_id = auth.uid());
```

**Admins can access all data:**

```sql
-- Admin policy exception
OR EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
)
```

---

## 📊 Database Schema

### user_profiles

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Links to auth.users.id |
| email | TEXT | User's email (unique) |
| full_name | TEXT | Display name |
| avatar_url | TEXT | Profile picture URL |
| role | TEXT | user/admin/superadmin |
| organization | TEXT | Organization name |

### organizations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier |
| name | TEXT | Organization name |
| slug | TEXT | URL-friendly slug |
| owner_id | UUID | Owner's user ID |
| plan | TEXT | free/pro/enterprise |

### organization_members

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier |
| organization_id | UUID | Links to organizations |
| user_id | UUID | Links to user_profiles |
| role | TEXT | owner/admin/member/viewer |

---

## 🎯 User Roles

### user (Default)
- Can create/edit/delete own programs
- Can create/edit/delete own episodes
- Can view own data only
- Cannot access admin features

### admin
- All user permissions PLUS:
- Can view all users' data
- Can manage organization members
- Can access admin dashboard

### superadmin
- All admin permissions PLUS:
- Can delete any data
- Can change user roles
- Full system access

---

## 🔐 API Reference

### Sign In

```typescript
const { signIn } = useAuth();

const { error } = await signIn('email@example.com', 'password123');
if (error) {
    console.error('Sign in failed:', error.message);
}
```

### Sign Up

```typescript
const { signUp } = useAuth();

const { error } = await signUp(
    'email@example.com',
    'password123',
    'Full Name'
);
if (error) {
    console.error('Sign up failed:', error.message);
}
```

### Sign Out

```typescript
const { signOut } = useAuth();
await signOut();
```

### Reset Password

```typescript
const { resetPassword } = useAuth();
await resetPassword('email@example.com');
// Check email for reset link
```

### Update Profile

```typescript
const { updateUserProfile } = useAuth();
await updateUserProfile({
    full_name: 'New Name',
    role: 'admin' // admin only
});
```

### Check Admin Status

```typescript
const { isAdmin } = useAuth();

if (isAdmin) {
    // Show admin features
}
```

---

## 🛠️ Common Tasks

### Change User Role

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

### Delete User Account

```typescript
const { user } = useAuth();
await supabase.rpc('delete_user_account');
```

### Get User's Organizations

```typescript
const { data } = await supabase.rpc('get_user_organizations');
console.log(data); // [{ organization_id, name, slug, role }]
```

### Check if User is Admin

```typescript
const { data } = await supabase.rpc('is_user_admin');
console.log(data); // true/false
```

---

## 🐛 Troubleshooting

### "Invalid login credentials"

**Cause**: Wrong email or password

**Solution**: 
- Check email spelling
- Reset password if forgotten
- Verify user exists in Supabase Dashboard

### "Email not confirmed"

**Cause**: Email confirmation required but not completed

**Solution**:
- Check spam folder for confirmation email
- Or disable email confirmation in Supabase Dashboard

### "Missing RLS policies"

**Cause**: Auth schema not run completely

**Solution**:
- Re-run `supabase-auth-schema.sql`
- Verify all policies created

### "User profile not found"

**Cause**: Trigger didn't fire on signup

**Solution**:
```sql
-- Manually create profile
INSERT INTO user_profiles (id, email, role)
SELECT id, email, 'user'
FROM auth.users
WHERE email = 'user@example.com';
```

### "Cannot access other users' data"

**This is expected behavior** - RLS prevents it.

**Solution**: 
- Use admin account for testing
- Or temporarily disable RLS for development:

```sql
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;
-- Re-enable when done
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
```

---

## 📧 Email Templates

### Confirmation Email

```html
<h2>Welcome to Brand System!</h2>
<p>Thank you for signing up. Please confirm your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
<p>Link expires in 24 hours.</p>
```

### Password Reset

```html
<h2>Password Reset Request</h2>
<p>Click below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>Link expires in 24 hours.</p>
```

### Magic Link

```html
<h2>Magic Link Login</h2>
<p>Click to sign in:</p>
<p><a href="{{ .ConfirmationURL }}">Sign In</a></p>
<p>Link expires in 1 hour.</p>
```

---

## ✅ Verification Checklist

- [ ] Ran `supabase-auth-schema.sql`
- [ ] Created first admin user
- [ ] Configured email settings
- [ ] Tested sign up flow
- [ ] Tested sign in flow
- [ ] Tested password reset
- [ ] Verified RLS policies work
- [ ] Tested admin features
- [ ] Checked user profiles created
- [ ] Verified organization support

---

## 🔒 Security Best Practices

1. **Never commit `.env`** - Contains API keys
2. **Use strong passwords** - Minimum 8 characters
3. **Enable email confirmation** - In production
4. **Implement rate limiting** - Via Supabase settings
5. **Regular backups** - Enable in Supabase
6. **Monitor auth logs** - Check for suspicious activity
7. **Rotate keys periodically** - In project settings
8. **Use HTTPS** - Always in production

---

## 📞 Support Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
- [React Context Docs](https://react.dev/reference/react/useContext)

---

**🎉 Authentication is now fully configured!**

Users can sign up, sign in, reset passwords, and data is securely isolated per user with RLS policies.
