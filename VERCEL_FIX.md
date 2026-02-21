# 🚨 FIX: Vercel Deployment Error

## Problem
```
Uncaught TypeError: can't access property "auth", dt is null
```

This error occurs because **Supabase environment variables are missing** in your Vercel deployment.

---

## ✅ Solution (2 Steps)

### **Step 1: Create Supabase Project**

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click **"New Project"**
4. Fill in:
   - **Name**: `brand-system`
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to you
5. Click **"Create new project"** (takes ~2 minutes)

### **Step 2: Get API Keys**

1. In Supabase Dashboard, click **Settings** (⚙️ icon)
2. Click **API** in the sidebar
3. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### **Step 3: Add to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `al-investorbrand`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add Environment Variable"**
5. Add these two variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

6. Click **"Save"** for each variable

### **Step 4: Redeploy**

1. Go to **Deployments** tab in Vercel
2. Click the **menu (⋮)** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~1-2 minutes)

---

## 🗄️ Step 5: Run Database Migration

After adding environment variables, you need to create the database tables:

### **Option A: Run SQL in Supabase Dashboard**

1. In Supabase Dashboard, click **SQL Editor** (</> icon)
2. Click **"New query"**
3. Open the file: `supabase-migration.sql` from your project
4. Copy **ALL** the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`
7. Wait for success message

### **Option B: Verify Tables Created**

Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see:
- `platforms`
- `programs`
- `podcast_episodes`
- `social_posts`

---

## ✅ Verification Checklist

- [ ] Created Supabase project
- [ ] Copied Project URL and anon key
- [ ] Added `VITE_SUPABASE_URL` to Vercel
- [ ] Added `VITE_SUPABASE_ANON_KEY` to Vercel
- [ ] Redeployed the application
- [ ] Ran `supabase-migration.sql` in Supabase
- [ ] Verified tables exist
- [ ] Tested the website - no more errors!

---

## 🧪 Test Locally (Optional)

To test locally before deploying:

```bash
# 1. Create .env file (already created for you)
# Edit .env and add your Supabase credentials:

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:5173
```

---

## 📞 Still Having Issues?

### **Check Browser Console**
```javascript
// Open browser console (F12) and run:
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
// Should show your values, not undefined
```

### **Check Vercel Environment Variables**
1. Go to Vercel → Settings → Environment Variables
2. Ensure both variables exist
3. Ensure they're for **Production** environment
4. Click the eye icon to verify values are correct

### **Check Supabase Project**
1. Go to Supabase Dashboard
2. Verify project is **Active** (not paused)
3. Verify tables exist in **Table Editor**

---

## 🎯 Expected Result

After following these steps:
- ✅ No more `can't access property "auth"` error
- ✅ Website loads successfully
- ✅ Data saves to Supabase database
- ✅ All features work (Planning, Podcast, Social Media)

---

**Need help?** Check these files:
- `supabase-migration.sql` - Complete database schema
- `.env.example` - Environment variables template
- `README.md` - Full documentation
