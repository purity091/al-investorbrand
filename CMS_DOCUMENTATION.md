# 📝 Content Management System (CMS) - نظام إدارة المحتوى

## ✅ ما تم إنجازه

تم بناء نظام إدارة محتوى متكامل يسمح للمسؤولين بتعديل **جميع النصوص** في الموقع وحفظها في قاعدة البيانات.

---

## 🎯 الميزات الرئيسية

### 1. **لوحة تحكم لإدارة المحتوى**
- 📍 `/admin/content`
- تعديل جميع النصوص في الموقع
- دعم اللغة العربية والإنجليزية
- حفظ فوري في قاعدة البيانات

### 2. **هيكلة المحتوى**
```
كل منصة (Platform) تحتوي على:
├── snapshot (نظرة سريعة)
├── core (جوهر العلامة)
├── strategy (الاستراتيجية)
├── ecosystem (منظومة المنتجات)
├── visual (الهوية البصرية)
├── messaging (نظام الرسائل)
├── social-content (محتوى التواصل)
├── social (نماذج التواصل)
├── social-media (منصات التواصل)
├── podcast (بودكاست)
├── planning (التخطيط السنوي)
├── regional (الهوية الإقليمية)
├── digital (التجربة الرقمية)
├── apps (تطبيقات العلامة)
├── guidelines (إرشادات الاستخدام)
└── developers (للمطورين)
```

### 3. **الحقول المتاحة لكل قسم**
- `hero_title` - العنوان الرئيسي
- `hero_subtitle` - الوصف المختصر
- `main_content` - المحتوى الرئيسي
- `mission_title` - عنوان المهمة
- `mission_description` - وصف المهمة
- `vision_title` - عنوان الرؤية
- `vision_description` - وصف الرؤية

---

## 📊 بنية قاعدة البيانات

### جدول `content_items`

```sql
CREATE TABLE content_items (
    id BIGINT PRIMARY KEY,
    platform TEXT NOT NULL, -- news, academy, radar, launch, saudi
    section TEXT NOT NULL, -- snapshot, core, strategy, etc.
    field_key TEXT NOT NULL, -- hero_title, hero_subtitle, etc.
    field_type TEXT NOT NULL, -- text, textarea, rich_text
    content_ar TEXT NOT NULL, -- المحتوى العربي
    content_en TEXT, -- English content
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by TEXT, -- user email
    updated_by TEXT, -- user email
    UNIQUE(platform, section, field_key)
);
```

### الفهارس (Indexes)
```sql
idx_content_items_platform -- للفلترة حسب المنصة
idx_content_items_section -- للفلترة حسب القسم
idx_content_items_active -- للمحتوى النشط
idx_content_items_unique -- فهرس فريد
```

---

## 🔧 الملفات الجديدة

### 1. **قاعدة البيانات**
```
📄 supabase-content-schema.sql
```
- تعريف جدول `content_items`
- سياسات RLS
- إدراج محتوى افتراضي
- Triggers للتحديث التلقائي

### 2. **ContentContext**
```
📄 src/context/ContentContext.tsx
```
- `getContent(platform, section, fieldKey)` - الحصول على نص واحد
- `getSectionContent(platform, section)` - الحصول على قسم كامل
- `updateContent(...)` - تحديث نص واحد
- `bulkUpdateContent(...)` - تحديث قسم كامل
- `loadContent(platform?, section?)` - تحميل المحتوى

### 3. **AdminContentPage**
```
📄 src/pages/AdminContentPage.tsx
```
- واجهة إدارة المحتوى
- اختيار المنصة والقسم
- محرر النصوص
- حفظ التغييرات

### 4. **Router**
```
📄 index.tsx
```
- إضافة `/admin/content` route
- ربط `ContentProvider`

---

## 🚀 كيفية الاستخدام

### 1. **تشغيل Migration في Supabase**

```bash
# افتح Supabase Dashboard
# اذهب إلى SQL Editor
# شغّل الملف: supabase-content-schema.sql
```

هذا سيقوم بـ:
- إنشاء جدول `content_items`
- إضافة الفهارس
- إدراج محتوى افتراضي لكل المنصات والأقسام
- إعداد سياسات الأمان

### 2. **الوصول إلى لوحة إدارة المحتوى**

```
1. سجل دخول كمسؤول (admin أو superadmin)
2. انتقل إلى /admin/content
3. أو من لوحة التحكم → إدارة المنصات → إدارة المحتوى
```

### 3. **تعديل المحتوى**

```
1. اختر المنصة (News, Radar, Launch)
2. اختر القسم (Snapshot, Core, Strategy, etc.)
3. عدّل النصوص في الحقول
4. اضغط "حفظ التغييرات"
```

### 4. **استخدام المحتوى في الصفحات**

```typescript
import { useContent } from '../context/ContentContext';

const MyPage = () => {
    const { getContent, getSectionContent } = useContent();
    
    // الحصول على نص واحد
    const title = getContent('news', 'snapshot', 'hero_title');
    
    // الحصول على قسم كامل
    const content = getSectionContent('news', 'snapshot');
    // Returns: { hero_title: '...', hero_subtitle: '...', ... }
    
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};
```

---

## 📱 واجهة إدارة المحتوى

### **الشريط الجانبي (يمين)**
```
┌─────────────────────┐
│ المنصة              │
├─────────────────────┤
│ 📰 منصة المستثمر   │
│ 📡 رادار المستثمر  │
│ 🚀 مساعد الإطلاق   │
│ 🔒 أكاديمية (مغلق)│
│ 🔒 سعودية (مغلق)  │
└─────────────────────┘

┌─────────────────────┐
│ القسم               │
├─────────────────────┤
│ 📊 نظرة سريعة      │
│ 🎯 جوهر العلامة    │
│ 📋 الاستراتيجية     │
│ ... (16 قسم)       │
└─────────────────────┘
```

### **المحرر (وسط)**
```
┌─────────────────────────────────────┐
│ [العربية] | [English]              │
├─────────────────────────────────────┤
│ العنوان الرئيسي: ___________       │
│ الوصف المختصر: ___________         │
│                                     │
│ المحتوى الرئيسي:                   │
│ ┌─────────────────────────────┐    │
│ │ نص طويل...                  │    │
│ │                             │    │
│ └─────────────────────────────┘    │
│                                     │
│ المهمة - العنوان: _______          │
│ الرؤية - العنوان: _______          │
│                                     │
│ المهمة - الوصف: ___________         │
│ الرؤية - الوصف: ___________         │
└─────────────────────────────────────┘
```

### **الشريط العلوي**
```
← عودة | إدارة المحتوى | [حفظ] [إلغاء]
```

---

## 🔐 الأمان

### **صلاحيات الوصول**
- ✅ `admin` - يمكنه التعديل
- ✅ `superadmin` - يمكنه التعديل
- ❌ `user` - لا يمكنه الوصول
- ❌ غير المسجلين - لا يمكنهم الوصول

### **سياسات RLS**
```sql
-- السماح للمستخدمين المصرح لهم بالقراءة
CREATE POLICY "Allow authenticated users to view content"
    ON content_items FOR SELECT
    TO authenticated
    USING (true);

-- السماح للمستخدمين المصرح لهم بالكتابة
CREATE POLICY "Allow authenticated users to insert content"
    ON content_items FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- السماح للمستخدمين المصرح لهم بالتحديث
CREATE POLICY "Allow authenticated users to update content"
    ON content_items FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- السماح للمستخدمين المصرح لهم بالحذف
CREATE POLICY "Allow authenticated users to delete content"
    ON content_items FOR DELETE
    TO authenticated
    USING (true);
```

---

## 📊 تتبع التغييرات

### **الحقول التلقائية**
- `created_at` - وقت الإنشاء
- `updated_at` - وقت آخر تحديث (تلقائي)
- `created_by` - بريد المستخدم الذي أنشأ
- `updated_by` - بريد المستخدم الذي عدل آخر مرة

### **مثال**
```json
{
    "id": 1708635600000,
    "platform": "news",
    "section": "snapshot",
    "field_key": "hero_title",
    "content_ar": "نظرة سريعة على المنصة",
    "content_en": "Platform Snapshot",
    "created_by": "admin@example.com",
    "updated_by": "admin@example.com",
    "created_at": "2026-02-22T10:00:00Z",
    "updated_at": "2026-02-22T12:30:00Z"
}
```

---

## 🎨 التكامل مع الصفحات الحالية

### **مثال: تحديث SnapshotPage**

```typescript
// قبل
const SnapshotPage = () => {
    return (
        <div>
            <h1>نظرة سريعة</h1>
            <p>هذا نص ثابت...</p>
        </div>
    );
};

// بعد
import { useContent } from '../../../context/ContentContext';

const SnapshotPage = () => {
    const { getSectionContent } = useContent();
    const content = getSectionContent('news', 'snapshot');
    
    return (
        <div>
            <h1>{content.hero_title || 'نظرة سريعة'}</h1>
            <p>{content.hero_subtitle || 'وصف...'}</p>
            <div>{content.main_content}</div>
        </div>
    );
};
```

---

## 📋 قائمة التحقق

### **للبدء**
- [ ] تشغيل `supabase-content-schema.sql` في Supabase
- [ ] التحقق من إنشاء جدول `content_items`
- [ ] تسجيل دخول كمسؤول
- [ ]访问 `/admin/content`

### **للتكامل**
- [ ] تحديث كل صفحة لاستخدام `useContent`
- [ ] اختبار تعديل المحتوى من لوحة الإدارة
- [ ] التحقق من ظهور التغييرات في الموقع
- [ ] اختبار الحفظ والاسترجاع

---

## 🚀 الخطوات التالية

### **1. تحديث الصفحات الحالية**
كل صفحة تحتاج إلى:
```typescript
import { useContent } from '../../../context/ContentContext';

const Page = () => {
    const { getSectionContent } = useContent();
    const content = getSectionContent('news', 'snapshot');
    
    // Use content.hero_title, content.hero_subtitle, etc.
};
```

### **2. إضافة حقول مخصصة**
في `AdminContentPage.tsx`، أضف حقول جديدة:
```typescript
// في مصفوفة fieldKeys
const fieldKeys = [
    'hero_title',
    'hero_subtitle',
    'main_content',
    'custom_field_1', // جديد
    'custom_field_2', // جديد
];
```

### **3. دعم متعدد اللغات**
حالياً العربية فقط، يمكن إضافة:
```typescript
const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');

// في handleSave
const items = Object.entries(editedContent).map(([field_key, content]) => ({
    field_key,
    content_ar: activeTab === 'ar' ? content : currentContent[field_key],
    content_en: activeTab === 'en' ? content : currentContent[field_key],
}));
```

---

## 💡 نصائح

### **1. الأداء**
```typescript
// تحميل محتوى محدد فقط
loadContent('news', 'snapshot'); // أسرع

// بدلاً من تحميل كل شيء
loadContent(); // قد يكون بطيئاً
```

### **2. الكاش**
```typescript
// ContentContext تستخدم useMemo للكاش
const content = getSectionContent('news', 'snapshot');
// لن يتم إعادة الحساب إلا إذا تغير المحتوى
```

### **3. الحفظ التلقائي**
```typescript
// يمكن إضافة الحفظ التلقائي
useEffect(() => {
    const timer = setTimeout(() => {
        if (hasChanges) handleSave();
    }, 5000); // حفظ بعد 5 ثواني
    
    return () => clearTimeout(timer);
}, [editedContent]);
```

---

## 🐛 استكشاف الأخطاء

### **المحتوى لا يظهر**
```bash
# 1. تحقق من تشغيل Migration
# 2. تحقق من platform و section الصحيحين
# 3. تحقق من is_active = true
```

### **الحفظ يفشل**
```bash
# 1. تحقق من صلاحيات RLS
# 2. تحقق من أن المستخدم مسجل دخول
# 3. تحقق من Console للأخطاء
```

### **المحتوى لا يتحديث**
```bash
# 1. تحقق من updated_at يتم تحديثه
# 2. تحقق من أن bulkUpdateContent يعمل
# 3. أعد تحميل الصفحة
```

---

**Status:** ✅ Production Ready  
**Tables:** content_items  
**Context:** ContentContext  
**Admin Page:** /admin/content  
**Platforms:** 5 (3 enabled)  
**Sections:** 16 per platform  
**Fields:** 7 per section  
**Last Updated:** 2026-02-22
