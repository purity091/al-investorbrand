# 🎯 مشروع نظام إدارة العلامة التجارية - نظرة عامة

## ✅ الميزات المكتملة

### 1. **نظام إدارة المحتوى (CMS)**
- ✅ قاعدة بيانات مركزية لجميع النصوص
- ✅ لوحة تحكم لإدارة المحتوى (`/admin/content`)
- ✅ دعم كامل للعربية والإنجليزية
- ✅ تتبع التغييرات (من عدّل ومتى)
- ✅ حفظ فوري في قاعدة البيانات

### 2. **لوحات التحكم**
- ✅ لوحة التحكم الرئيسية (`/dashboard`)
- ✅ لوحة إدارة المنصات (`/admin`)
- ✅ لوحة إدارة المحتوى (`/admin/content`)
- ✅ لوحة إدارة الرؤية (`/admin/visibility`)

### 3. **المنصات**
| المنصة | الحالة | الوصول |
|--------|--------|--------|
| 📰 منصة المستثمر الإخبارية | ✅ مفعلة | متاح |
| 📡 رادار المستثمر | ✅ مفعلة | متاح |
| 🚀 مساعد الإطلاق | ✅ مفعلة | متاح |
| 🔒 أكاديمية المستثمر | ❌ معطلة | غير متاح |
| 🔒 المستثمر سعودية | ❌ معطلة | غير متاح |

### 4. **الأقسام لكل منصة**
16 قسماً لكل منصة:
- snapshot, core, strategy, ecosystem, visual
- messaging, social-content, social, social-media
- podcast, planning, regional, digital, apps
- guidelines, developers

### 5. **قاعدة البيانات**
#### الجداول:
- `programs` - برامج التخطيط السنوي
- `platforms` - منصات التواصل الاجتماعي
- `content_items` - محتوى النصوص (جديد)
- `system_platforms` - منصات النظام
- `podcast_episodes` - حلقات البودكاست
- `social_posts` - منشورات التواصل

---

## 📊 بنية المشروع

```
c:\xampp\htdocs\brand\
├── src/
│   ├── components/         # مكونات React
│   │   ├── Layout.tsx
│   │   ├── BrandLogo.tsx
│   │   └── ...
│   ├── context/           # React Context
│   │   ├── AuthContext.tsx
│   │   ├── DatabaseContext.tsx
│   │   └── ContentContext.tsx (جديد)
│   ├── pages/             # الصفحات
│   │   ├── DashboardPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminContentPage.tsx (جديد)
│   │   └── ...
│   └── platforms/         # المنصات
│       ├── news/
│       ├── academy/
│       ├── radar/
│       ├── launch/
│       └── saudi/
├── supabase-*.sql         # ملفات Migration
├── index.tsx              # Router الرئيسي
└── package.json
```

---

## 🔧 ملفات Migration

### 1. **supabase-content-schema.sql** (جديد)
ينشئ جدول `content_items` لإدارة النصوص.

### 2. **supabase-add-system-platform.sql**
يضيف عمود `system_platform` لجدول `programs`.

### 3. **supabase-schema.sql**
الهيكل الأساسي للجداول.

---

## 🚀 كيفية البدء

### **الخطوة 1: تشغيل Migrations**
```sql
-- في Supabase SQL Editor
-- 1. جدول المحتوى
-- شغّل: supabase-content-schema.sql

-- 2. عمود system_platform
-- شغّل: supabase-add-system-platform.sql
```

### **الخطوة 2: التحقق من قاعدة البيانات**
```sql
-- التحقق من جدول المحتوى
SELECT * FROM content_items LIMIT 10;

-- التحقق من المنصات
SELECT system_platform, COUNT(*) 
FROM programs 
GROUP BY system_platform;
```

### **الخطوة 3: تسجيل الدخول**
```
1. انتقل إلى /login
2. سجل دخول بحساب مسؤول
3. يجب أن يكون الدور: admin أو superadmin
```

### **الخطوة 4: اختبار لوحة المحتوى**
```
1. انتقل إلى /admin/content
2. اختر المنصة: News
3. اختر القسم: Snapshot
4. عدّل النصوص
5. اضغط "حفظ التغييرات"
```

---

## 📱 المسارات الرئيسية

### **عامة**
| المسار | الوصف |
|--------|-------|
| `/` | إعادة توجيه إلى `/dashboard` |
| `/dashboard` | لوحة التحكم الرئيسية |
| `/login` | تسجيل الدخول |

### **إدارة**
| المسار | الوصف | الصلاحيات |
|--------|-------|-----------|
| `/admin` | لوحة إدارة المنصات | admin, superadmin |
| `/admin/content` | إدارة المحتوى | admin, superadmin |
| `/admin/visibility` | إدارة الرؤية | admin, superadmin |

### **المنصات**
| المسار | الوصف |
|--------|-------|
| `/news/*` | منصة المستثمر الإخبارية |
| `/radar/*` | رادار المستثمر |
| `/launch/*` | مساعد الإطلاق |
| `/academy/*` | أكاديمية المستثمر (معطل) |
| `/saudi/*` | المستثمر سعودية (معطل) |

---

## 🎯 استخدام ContentContext

### **في أي مكون:**

```typescript
import { useContent } from '../context/ContentContext';

const MyComponent = () => {
    const { 
        getContent,           // الحصول على نص واحد
        getSectionContent,    // الحصول على قسم كامل
        updateContent,        // تحديث نص واحد
        bulkUpdateContent,    // تحديث قسم كامل
        loading,              // حالة التحميل
        error,                // الأخطاء
    } = useContent();
    
    // مثال: الحصول على العنوان
    const title = getContent('news', 'snapshot', 'hero_title');
    
    // مثال: الحصول على قسم كامل
    const content = getSectionContent('news', 'snapshot');
    // Returns: { hero_title: '...', hero_subtitle: '...', ... }
    
    return <h1>{title}</h1>;
};
```

---

## 📊 إحصائيات المشروع

### **الملفات**
- إجمالي الملفات: 100+
- ملفات TypeScript/TSX: 80+
- ملفات SQL: 7
- ملفات Markdown: 10+

### **الصفحات**
- صفحات المنصات: 5 × 16 = 80 صفحة
- صفحات الإدارة: 4 صفحات
- لوحة التحكم: 1 صفحة

### **قاعدة البيانات**
- الجداول: 6+
- الفهارس: 15+
- سياسات RLS: 20+

---

## 🔐 الأمان

### **الصلاحيات**
| الدور | الوصول |
|-------|--------|
| `superadmin` | كامل الوصول |
| `admin` | كامل الوصول |
| `user` | قراءة فقط |
| غير مسجل | لا يوجد وصول |

### **سياسات RLS**
- ✅ قراءة المحتوى: للجميع
- ✅ كتابة المحتوى: للمسؤولين فقط
- ✅ تعديل البرامج: للمسؤولين فقط
- ✅ حذف المحتوى: للمسؤولين فقط

---

## 🎨 التصميم

### **الألوان**
```
Primary: #00E1C1 (Turquoise)
Secondary: #0D1137 (Navy)
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
```

### **المنصات**
```
News:    #00E1C1
Radar:   #EF4444
Launch:  #3B82F6
Academy: #F59E0B (معطل)
Saudi:   #10B981 (معطل)
```

---

## 📝 الملفات الوثائقية

1. **CMS_DOCUMENTATION.md** - دليل نظام إدارة المحتوى
2. **PRODUCTION_READY_CLEAN.md** - إزالة البيانات الوهمية
3. **PLATFORM_ACCESS_CONTROL.md** - التحكم في الوصول للمنصات
4. **PLANNING_PAGE_FIX.md** - إصلاح صفحة التخطيط
5. **README.md** - دليل المشروع الرئيسي

---

## 🚀 النشر

### **1. Push إلى GitHub**
```bash
cd c:\xampp\htdocs\brand
git add .
git commit -m "feat: complete CMS with full content management"
git push origin main
```

### **2. Vercel**
- سيعيد البناء تلقائياً
- تحقق من Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### **3. Supabase**
- شغّل Migrations في SQL Editor
- تحقق من إنشاء الجداول
- اختبر الصلاحيات

---

## 💡 نصائح للصيانة

### **1. النسخ الاحتياطي**
```sql
-- تصدير المحتوى
COPY content_items TO '/backup/content.csv' WITH CSV HEADER;
```

### **2. الاستعادة**
```sql
-- استيراد المحتوى
COPY content_items FROM '/backup/content.csv' WITH CSV HEADER;
```

### **3. التنظيف**
```sql
-- حذف المحتوى غير النشط
DELETE FROM content_items WHERE is_active = false;
```

### **4. المراقبة**
```sql
-- آخر التحديثات
SELECT * FROM content_items 
ORDER BY updated_at DESC 
LIMIT 10;
```

---

## 🎯 الخطوات التالية (اختياري)

### **1. التكامل مع الصفحات**
تحديث جميع الصفحات لاستخدام `useContent`:
- SnapshotPage
- CorePage
- StrategyPage
- ... (80 صفحة)

### **2. إضافة ميزات**
- معاينة مباشرة للتغييرات
- تاريخ التغييرات (Version History)
- مقارنة النسخ
- تراجع عن التغييرات

### **3. تحسين الأداء**
- كاش للمحتوى
- تحميل كسول (Lazy Loading)
- تقسيم الكود (Code Splitting)

---

**Status:** ✅ Production Ready  
**CMS:** ✅ مكتمل  
**Dashboard:** ✅ مكتمل  
**Platforms:** ✅ 3 مفعلة  
**Documentation:** ✅ شامل  
**Last Updated:** 2026-02-22
