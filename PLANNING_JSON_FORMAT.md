# 📋 Planning Page JSON Format Guide

## ✅ Correct JSON Format

Your JSON export/import should follow this exact structure:

```json
{
  "programs": [
    {
      "id": 1,
      "title": "Program Title in English",
      "titleAr": "عنوان البرنامج بالعربي",
      "platform": "twitter",
      "platformName": "إكس (تويتر)",
      "platformColor": "bg-[#1DA1F2]",
      "postsCount": 100,
      "quarterId": 1,
      "order": 0,
      "description": "Program description in English",
      "descriptionAr": "وصف البرنامج بالعربية",
      "objectives": "Objective 1 | Objective 2 | Objective 3",
      "objectivesAr": "الهدف 1 | الهدف 2 | الهدف 3"
    }
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🔧 Field Names (Important!)

### ✅ **Use camelCase** (JavaScript convention):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | ✅ Yes | Unique identifier |
| `title` | string | ✅ Yes | English title |
| `titleAr` | string | ✅ Yes | Arabic title |
| `platform` | string | ✅ Yes | Platform ID (twitter, linkedin, etc.) |
| `platformName` | string | ✅ Yes | Platform name in Arabic |
| `platformColor` | string | ✅ Yes | Tailwind CSS class for color |
| `postsCount` | number | ✅ Yes | Number of posts (e.g., 100) |
| `quarterId` | number | ❌ No | Quarter (1, 2, 3, 4, or null) |
| `order` | number | ❌ No | Display order within quarter |
| `description` | string | ❌ No | English description |
| `descriptionAr` | string | ❌ No | Arabic description |
| `objectives` | string | ❌ No | English objectives |
| `objectivesAr` | string | ❌ No | Arabic objectives |

---

## 🎯 Platform IDs

Use these exact platform IDs:

| Platform ID | Name (Arabic) | Color Class |
|-------------|---------------|-------------|
| `twitter` | إكس (تويتر) | `bg-[#1DA1F2]` |
| `linkedin` | لينكد إن | `bg-[#0077B5]` |
| `instagram` | إنستغرام | `bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]` |
| `youtube` | يوتيوب | `bg-[#FF0000]` |
| `telegram` | تيليجرام | `bg-[#0088cc]` |
| `tiktok` | تيك توك | `bg-black` |
| `facebook` | فيسبوك | `bg-[#1877F2]` |
| `snapchat` | سناب شات | `bg-[#FFFC00]` |

---

## 📥 Import Fixes Applied

The import function now:

### ✅ **Handles both field name formats:**
```javascript
// Both camelCase and snake_case work now!
{
  "platformColor": "bg-[#1DA1F2]",  // ✅ camelCase
  "platform_color": "bg-[#1DA1F2]"  // ✅ snake_case (auto-converted)
}
```

### ✅ **Validates required fields:**
- `title` (English title)
- `titleAr` (Arabic title)

Programs without these will be skipped with a warning.

### ✅ **Provides default values:**
```javascript
{
  platform: "twitter",        // Default if missing
  platformName: "إكس (تويتر)", // Auto-detected from platform ID
  platformColor: "bg-[#1DA1F2]", // Auto-detected from platform ID
  postsCount: 100,            // Default if missing
  quarterId: null,            // Default if missing
  order: index                // Auto-assigned based on position
}
```

---

## 📤 Export Format

When you export, the JSON will have:

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
      "order": 0,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    }
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🧪 Example: Your JSON (Corrected)

Your original JSON was **almost correct**! Here it is with all fields:

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
      "order": 0,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 2,
      "title": "Club Loyalty as Long-Term Investment Series",
      "titleAr": "محبة النادي الرياضي كاستثمار طويل الأمد",
      "platform": "facebook",
      "platformName": "فيسبوك",
      "platformColor": "bg-[#1877F2]",
      "postsCount": 100,
      "quarterId": 1,
      "order": 1,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 3,
      "title": "Most Profitable Sectors in Sports Industry Analysis",
      "titleAr": "أكثر المجالات ربحًا في صناعة الرياضة",
      "platform": "linkedin",
      "platformName": "لينكد إن",
      "platformColor": "bg-[#0077B5]",
      "postsCount": 100,
      "quarterId": 2,
      "order": 0,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 4,
      "title": "Global Sports Popularity Insights",
      "titleAr": "أكثر الرياضات شعبية بحسب الدول",
      "platform": "twitter",
      "platformName": "إكس (تويتر)",
      "platformColor": "bg-[#1DA1F2]",
      "postsCount": 100,
      "quarterId": 2,
      "order": 1,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 5,
      "title": "European Sports Economy Deep Dive",
      "titleAr": "الاقتصاد الرياضي الأوروبي",
      "platform": "linkedin",
      "platformName": "لينكد إن",
      "platformColor": "bg-[#0077B5]",
      "postsCount": 100,
      "quarterId": 3,
      "order": 0,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 6,
      "title": "Clubs Impact on Local Economy Stories",
      "titleAr": "أداء الأندية الرياضية وأثرها على الاقتصاد المحلي",
      "platform": "facebook",
      "platformName": "فيسبوك",
      "platformColor": "bg-[#1877F2]",
      "postsCount": 100,
      "quarterId": 3,
      "order": 1,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 7,
      "title": "Sports Club Management & National Economy Strategy",
      "titleAr": "اقتصاد إدارة الأندية وأثرها المالي على السوق والاقتصاد الوطني",
      "platform": "linkedin",
      "platformName": "لينكد إن",
      "platformColor": "bg-[#0077B5]",
      "postsCount": 100,
      "quarterId": 4,
      "order": 0,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    },
    {
      "id": 8,
      "title": "Sports Economy Awareness Capsules",
      "titleAr": "ملفات توعوية في الاقتصاد الرياضي",
      "platform": "twitter",
      "platformName": "إكس (تويتر)",
      "platformColor": "bg-[#1DA1F2]",
      "postsCount": 100,
      "quarterId": 4,
      "order": 1,
      "description": "",
      "descriptionAr": "",
      "objectives": "",
      "objectivesAr": ""
    }
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🔧 What Was Fixed

### **Before:**
```javascript
// ❌ Import didn't normalize field names
const importedPrograms = data.programs.map(p => ({
  ...p,  // Used raw data without validation
  id: p.id || Date.now() + index,
  order: p.order || index,
}));
```

### **After:**
```javascript
// ✅ Import now handles both formats and validates
const importedPrograms = data.programs.map((p, index) => ({
  id: p.id || (Date.now() + index),
  title: p.title || p.title || '',
  titleAr: p.titleAr || p.title_ar || '',  // ✅ snake_case support
  platform: p.platform || 'twitter',
  platformName: p.platformName || p.platform_name || platform.nameAr,  // ✅ Auto-detect
  platformColor: p.platformColor || p.platform_color || platform.color,  // ✅ Auto-detect
  postsCount: p.postsCount || p.posts_count || 100,  // ✅ snake_case support
  quarterId: p.quarterId || p.quarter_id || null,  // ✅ snake_case support
  // ... validation for all fields
}));
```

---

## ✅ Testing Checklist

After deploying:

1. **Test Export:**
   - Go to Planning page
   - Click Export/Import
   - Click "تصدير البيانات"
   - Verify JSON has correct field names

2. **Test Import:**
   - Copy the example JSON above
   - Paste in import text area
   - Click "استيراد البيانات"
   - Verify programs appear correctly

3. **Test Save:**
   - Modify a program
   - Save to database
   - Reload page
   - Verify data persists

---

## 🎉 Expected Result

✅ Export produces valid JSON with camelCase fields
✅ Import accepts both camelCase and snake_case
✅ Validation catches missing required fields
✅ Auto-detection fills in platform details
✅ Save to database works without column errors

---

**Build Status:** ✅ Successful (1,145 KB)
**All Platforms:** Updated (News, Academy, Radar, Launch, Saudi)
