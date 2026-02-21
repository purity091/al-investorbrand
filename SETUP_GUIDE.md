# 🎯 Brand System - Complete Setup Guide

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Supabase Setup](#supabase-setup)
3. [Database Configuration](#database-configuration)
4. [Features Overview](#features-overview)
5. [API Reference](#api-reference)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.10.0 or higher
- npm 10.2.3 or higher
- Supabase account (free tier works)

### Installation Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env with your Supabase credentials
# (See Supabase Setup section below)

# 4. Run database migration
# (See Database Configuration section below)

# 5. Start development server
npm run dev
```

---

## 🗄️ Supabase Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Fill in:
   - **Name**: `brand-system` (or your choice)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is perfect for development
4. Click **"Create new project"**
5. Wait 2-3 minutes for provisioning

### Step 2: Get API Credentials

1. In Supabase Dashboard, click **Settings** (gear icon)
2. Click **API** in sidebar
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 3: Configure Environment

Open `.env` file and paste your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key
```

---

## 📊 Database Configuration

### Step 1: Open SQL Editor

1. In Supabase Dashboard, click **SQL Editor** (</> icon)
2. Click **"New query"**

### Step 2: Run Migration

1. Open file `supabase-schema.sql` from project root
2. Copy ALL the SQL code
3. Paste into Supabase SQL Editor
4. Click **"Run"** or press `Ctrl+Enter`
5. Wait for success message

### Step 3: Verify Setup

Run this query to check tables were created:

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

### Step 4: Create Storage Bucket (for audio files)

1. Go to **Storage** in Supabase Dashboard
2. Click **"New bucket"**
3. Name: `podcast-audio`
4. Toggle **"Public bucket"** = ON
5. Click **"Create bucket"**

---

## ✨ Features Overview

### 1. 📅 Yearly Planning (التخطيط السنوي)

**Location**: `/[platform]/planning`

**Features**:
- Drag & drop programs across 4 quarters (Q1-Q4)
- Add/Edit/Delete programs
- Export/Import JSON
- AI Template Generator
- Bulk text input
- Program detail modals
- Auto-save to database

**Database Table**: `programs`

### 2. 🎙️ Podcast Management (البودكاست)

**Location**: `/[platform]/podcast`

**Features**:
- Add podcast episodes with audio upload
- Episode detail modal with audio player
- Season & episode numbering
- Status tracking (Draft/Scheduled/Published)
- Export/Import episodes
- Auto-duration detection
- Play episodes directly

**Database Table**: `podcast_episodes`

**Default Episodes**:
- زاوية المحلل - الحلقة الأولى
- تحليل السوق للربع الأول
- مستقبل التقنية المالية

### 3. 📱 Social Media Management (منصات التواصل)

**Location**: `/[platform]/social-media`

**Features**:
- Toggle platforms on/off
- Add 100-post programs
- Platform cards with stats
- Program management
- Export/Import

**Database Tables**: `platforms`, `social_posts`

### 4. 📤 JSON Import/Export

**Available in**: All planning & podcast pages

**Features**:
- Copy to clipboard
- Download as file
- Upload JSON file
- Paste JSON text
- AI template generation

---

## 🔧 API Reference

### Programs Endpoints (via Supabase Client)

```typescript
// Load all programs
const { data, error } = await supabase
  .from('programs')
  .select('*')
  .order('created_at', { ascending: true });

// Insert program
const { error } = await supabase
  .from('programs')
  .insert({
    title: 'My Program',
    title_ar: 'برنامجي',
    platform: 'twitter',
    platform_name: 'إكس (تويتر)',
    platform_color: 'bg-[#1DA1F2]',
    posts_count: 100,
    quarter_id: 1,
    order: 0
  });

// Update program
const { error } = await supabase
  .from('programs')
  .update({ quarter_id: 2 })
  .eq('id', programId);

// Delete program
const { error } = await supabase
  .from('programs')
  .delete()
  .eq('id', programId);
```

### Podcast Episodes Endpoints

```typescript
// Load episodes
const { data, error } = await supabase
  .from('podcast_episodes')
  .select('*')
  .order('season', { ascending: true })
  .order('episode_number', { ascending: true });

// Insert episode
const { error } = await supabase
  .from('podcast_episodes')
  .insert({
    title: 'Episode Title',
    title_ar: 'عنوان الحلقة',
    description: 'Description',
    description_ar: 'الوصف بالعربي',
    guest: 'Guest Name',
    guest_ar: 'اسم الضيف',
    duration: '45:30',
    season: 1,
    episode_number: 1,
    status: 'published',
    publish_date: '2026-02-19',
    platform: 'spotify',
    color: 'from-[#0D1137] to-[#1a237e]'
  });
```

### Storage Upload (Audio Files)

```typescript
// Upload audio file
const { data, error } = await supabase.storage
  .from('podcast-audio')
  .upload(`episode-${Date.now()}.wav`, audioFile, {
    cacheControl: '3600',
    upsert: false
  });

// Get public URL
const { data } = supabase.storage
  .from('podcast-audio')
  .getPublicUrl(filePath);
```

---

## 🐛 Troubleshooting

### "Invalid supabaseUrl" Error

**Problem**: Console shows `Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL`

**Solution**:
1. Check `.env` file exists
2. Verify `VITE_SUPABASE_URL` starts with `https://`
3. Restart dev server: `npm run dev`

### Data Not Saving

**Problem**: Changes lost on page refresh

**Solutions**:
1. Check Supabase project is active
2. Verify `.env` credentials are correct
3. Check browser console for errors
4. Ensure SQL migration was run successfully
5. Check RLS policies allow writes

### "Table does not exist" Error

**Solution**:
1. Run `supabase-schema.sql` in SQL Editor
2. Check table names are spelled correctly
3. Verify schema is `public`

### Audio Upload Not Working

**Solution**:
1. Create `podcast-audio` storage bucket
2. Set bucket to public
3. Check file size (< 100MB for free tier)
4. Use supported formats: WAV, MP3, M4A

### Build Fails

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📁 Project Structure

```
brand/
├── src/
│   ├── components/         # Reusable components
│   ├── context/           # React Context (Auth, Database)
│   ├── lib/               # Supabase client
│   ├── pages/             # Main pages
│   └── platforms/         # Platform-specific pages
│       ├── news/
│       ├── academy/
│       ├── radar/
│       ├── launch/
│       └── saudi/
│           └── pages/
│               ├── PlanningPage.tsx      # Yearly planning
│               ├── PodcastPage.tsx       # Podcast management
│               └── SocialMediaPage.tsx   # Social media
├── supabase-schema.sql    # Database schema
├── supabase-migration.sql # Legacy migration
├── .env.example          # Environment template
└── package.json
```

---

## 🔐 Security Notes

### Current Setup (Development)

- RLS policies allow **public read/write**
- Anyone with anon key can modify data
- **NOT suitable for production**

### Production Recommendations

1. **Implement Authentication**:
   ```typescript
   const { user } = await supabase.auth.getUser();
   ```

2. **Update RLS Policies**:
   ```sql
   CREATE POLICY "Users can only edit their own programs"
   ON programs
   FOR UPDATE
   USING (auth.uid() = user_id);
   ```

3. **Use Environment Variables**:
   - Never commit `.env` to Git
   - Use `.env.local` for local development
   - Use platform env vars for production

---

## 📞 Support

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

### Common Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## ✅ Setup Checklist

- [ ] Created Supabase project
- [ ] Copied API credentials
- [ ] Updated `.env` file
- [ ] Ran `supabase-schema.sql`
- [ ] Created `podcast-audio` bucket
- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Verified tables in Supabase
- [ ] Tested adding a program
- [ ] Tested podcast upload

---

**🎉 You're all set! Happy coding!**
