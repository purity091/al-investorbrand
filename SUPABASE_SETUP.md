# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Fill in:
   - **Name**: brand-system (or your choice)
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
4. Click "Create new project"

## Step 2: Get API Credentials

1. Once project is created, go to **Settings** (gear icon in sidebar)
2. Click on **API**
3. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open `.env` file in the project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

## Step 4: Create Database Tables

1. In Supabase dashboard, click on **SQL Editor** (icon looks like `</>`)
2. Click "New query"
3. Open the file `supabase-migration.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" or press Ctrl+Enter

This will create:
- `programs` table - stores all your planning programs
- `platforms` table - stores social media platforms configuration
- Indexes for better performance
- Security policies (RLS)
- Default platforms data

## Step 5: Verify Setup

1. Run the development server: `npm run dev`
2. Navigate to any platform's Planning page (e.g., `/news/planning`)
3. You should see:
   - Programs loaded from the database
   - Auto-save indicator when you make changes
   - Data persists across page refreshes

## Features

### Auto-Save
- Programs are automatically saved to Supabase when you:
  - Add a new program
  - Delete a program
  - Drag & drop programs between quarters
  - Import programs from JSON

### Load Status
- Loading indicator while fetching data from database
- Error messages if connection fails
- Fallback to default programs if database is empty

### Data Persistence
- All programs are stored in Supabase
- Data persists across browser sessions
- Export/Import still works for backups

## Database Schema

### programs table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Unique identifier (auto-generated) |
| title | TEXT | English title |
| title_ar | TEXT | Arabic title |
| platform | TEXT | Platform ID (twitter, linkedin, etc.) |
| platform_name | TEXT | Platform Arabic name |
| platform_color | TEXT | CSS color class |
| posts_count | INTEGER | Number of posts (default: 100) |
| quarter_id | INTEGER | Quarter assignment (1-4 or null) |
| order | INTEGER | Display order within quarter |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### platforms table
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Platform ID (twitter, linkedin, etc.) |
| name | TEXT | English name |
| name_ar | TEXT | Arabic name |
| color | TEXT | CSS color class |
| enabled | BOOLEAN | Is platform active |
| followers_count | TEXT | Follower count display |
| posts_count | INTEGER | Total posts count |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

## Troubleshooting

### "Failed to load programs"
- Check your Supabase project is active
- Verify `.env` values are correct
- Check browser console for error messages
- Ensure SQL migration was run successfully

### "Row Level Security" errors
- Make sure you ran the full SQL migration
- Policies should allow public access for this demo
- For production, implement proper authentication

### Data not saving
- Check Supabase dashboard for any errors
- Verify table structure matches schema
- Check network tab in browser DevTools

## Security Notes

⚠️ **Current setup is for development/demo purposes only**

The current RLS policies allow anyone with your anon key to read/write data. For production:

1. Implement authentication (Supabase Auth)
2. Update RLS policies to restrict access by user
3. Never commit `.env` file to version control
4. Consider using Supabase Edge Functions for sensitive operations

## Next Steps

1. Customize platforms in the database
2. Add user authentication
3. Create analytics/dashboard views
4. Set up automated backups
5. Configure database webhooks for notifications
