# 🔧 Fix: Missing 'platformColor' Column Error

## ❌ Error Message
```
Could not find the 'platformColor' column of 'programs' in the schema cache
```

## 🎯 Root Cause

The code uses **camelCase** field names (`platformColor`, `platformName`, `postsCount`), but:
- Supabase database uses **snake_case** columns (`platform_color`, `platform_name`, `posts_count`)
- Your existing database table is missing the `platform_color` column

## ✅ Solution (2 Steps)

---

### **Step 1: Add Missing Column to Database**

Run this simple SQL to add the missing column:

**File:** `supabase-add-missing-columns.sql`

#### Instructions:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `jeemdvtinrkbapkqgund`

2. **Go to SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **"New query"**

3. **Copy & Run the Fix**
   - Open file: `supabase-add-missing-columns.sql` from your project
   - Copy **ALL** the SQL code
   - Paste into SQL Editor
   - Click **"Run"** or press `Ctrl+Enter`

4. **Verify Columns Exist**
   You should see output showing these columns:
   ```
   id, title, title_ar, platform, platform_name, platform_color,
   posts_count, quarter_id, order, created_at, updated_at
   ```

---

### **Step 2: Redeploy Application**

The code has been updated to properly transform field names:

**Changes Made:**
- ✅ `loadPrograms()` - Transforms `snake_case` → `camelCase`
- ✅ `savePrograms()` - Transforms `camelCase` → `snake_case`
- ✅ `loadPlatforms()` - Transforms `snake_case` → `camelCase`
- ✅ `savePlatforms()` - Transforms `camelCase` → `snake_case`

#### To Redeploy:

**Option A: Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Click your project: `al-investorbrand`
3. Go to **Deployments**
4. Click menu (⋮) on latest deployment
5. Click **"Redeploy"**
6. Wait ~1-2 minutes

**Option B: Push to Git** (if connected)
```bash
git add .
git commit -m "fix: Transform camelCase/snake_case for Supabase"
git push
```

---

## 📊 What Was Fixed

### **Database Schema:**

| Column (Database) | Type | Default |
|-------------------|------|---------|
| `platform_color` | TEXT | `'bg-[#1DA1F2]'` |
| `platform_name` | TEXT | `'Twitter'` |

### **Code Transformation:**

**Before Saving to Database:**
```typescript
// camelCase (JavaScript) → snake_case (Database)
{
  platformColor: "bg-[#1DA1F2]",
  platformName: "إكس (تويتر)",
  postsCount: 100,
  quarterId: 1
}
↓
{
  platform_color: "bg-[#1DA1F2]",
  platform_name: "إكس (تويتر)",
  posts_count: 100,
  quarter_id: 1
}
```

**After Loading from Database:**
```typescript
// snake_case (Database) → camelCase (JavaScript)
{
  platform_color: "bg-[#1DA1F2]",
  platform_name: "إكس (تويتر)",
  posts_count: 100,
  quarter_id: 1
}
↓
{
  platformColor: "bg-[#1DA1F2]",
  platformName: "إكس (تويتر)",
  postsCount: 100,
  quarterId: 1
}
```

---

## 📋 Verification Checklist

After running the migration and redeploying:

- [ ] SQL migration ran successfully
- [ ] `platform_color` column exists in `programs` table
- [ ] `platform_name` column exists in `programs` table
- [ ] Application redeployed on Vercel
- [ ] Open website - no console errors
- [ ] Test saving the JSON you provided - should work!
- [ ] Test loading programs - displays correctly

---

## 🧪 Test with Your JSON

After fixing, try saving this JSON:

```json
{
  "programs": [
    {
      "id": 1,
      "title": "Sports Economic Value Threads",
      "titleAr": "قيمة الرياضة الاقتصادية",
      "platform": "twitter",
      "platformName": "إكس (تويتر)",
      "platformColor": "bg-[#1DA1F2]",
      "postsCount": 100,
      "quarterId": 1,
      "order": 0
    }
    // ... rest of programs
  ]
}
```

**Expected Result:**
✅ Saves successfully without column errors
✅ Programs appear in correct quarters
✅ Colors display correctly

---

## 📁 Files Modified

| File | Status | Changes |
|------|--------|---------|
| `src/context/DatabaseContext.tsx` | ✅ Updated | Transform camelCase ↔ snake_case |
| `supabase-add-missing-columns.sql` | ✅ Created | Add missing columns |
| `supabase-fixed-migration.sql` | ✅ Updated | Added DEFAULT values |

---

## 🔍 Verify Database Schema

Run this query to check your columns:

```sql
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'programs'
ORDER BY ordinal_position;
```

**Expected Output:**

| column_name | data_type | is_nullable | column_default |
|-------------|-----------|-------------|----------------|
| id | bigint | NO | EXTRACT(...) |
| title | text | NO | - |
| title_ar | text | NO | - |
| platform | text | NO | - |
| platform_name | text | NO | 'Twitter' |
| platform_color | text | NO | 'bg-[#1DA1F2]' |
| posts_count | integer | YES | 100 |
| quarter_id | integer | YES | - |
| order | integer | YES | 0 |
| created_at | timestamptz | YES | NOW() |
| updated_at | timestamptz | YES | NOW() |

---

## ✅ Expected Result

After following these steps:

✅ **No more column errors**
✅ **JSON saves successfully**
✅ **Programs load correctly**
✅ **Colors display properly**
✅ **All CRUD operations work**

---

## 🎉 Success!

Once verified, your application should work perfectly:

- ✅ Save programs with all fields
- ✅ Load programs with correct data
- ✅ Platform colors work
- ✅ Platform names display
- ✅ All quarters show correctly

**Build Status:** ✅ Successful (1,144 KB)
**Deployment:** Ready to redeploy
**Database:** Fix migration ready to run

---

**Quick Fix Summary:**

1. Run: `supabase-add-missing-columns.sql` in Supabase SQL Editor
2. Redeploy application on Vercel
3. Test saving your JSON - should work! ✅

**Need help?** The fix files are:
- `supabase-add-missing-columns.sql` (add missing columns)
- `supabase-fixed-migration.sql` (complete fixed migration)
