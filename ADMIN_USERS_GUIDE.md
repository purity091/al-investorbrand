# 👥 Admin User Management - إدارة حسابات المسؤولين

## ✅ ما تم إنجازه

تم بناء نظام متكامل لإنشاء وإدارة حسابات المسؤولين مع صلاحيات كاملة للوصول إلى:
- ✅ لوحة إدارة المحتوى (`/admin/content`)
- ✅ لوحة إدارة المستخدمين (`/admin/users`)
- ✅ لوحة إدارة الرؤية (`/admin/visibility`)
- ✅ لوحة التحكم الرئيسية (`/admin`)

---

## 🚀 كيفية إنشاء حساب مسؤول

### **الطريقة 1: عبر SQL (مباشرة في Supabase)**

#### **الخطوة 1: تشغيل ملف SQL**
```sql
-- في Supabase SQL Editor
-- شغّل الملف: supabase-admin-users.sql
```

#### **الخطوة 2: إنشاء حساب مسؤول**
```sql
-- إنشاء مدير أعلى (superadmin)
SELECT create_admin_user(
    'admin@example.com',
    'Admin@123',
    'مدير النظام',
    'superadmin'
);

-- إنشاء مسؤول عادي (admin)
SELECT create_admin_user(
    'manager@example.com',
    'Manager@123',
    'مدير المحتوى',
    'admin'
);
```

#### **الخطوة 3: التحقق**
```sql
-- عرض جميع المستخدمين
SELECT * FROM admin_users_view;
```

---

### **الطريقة 2: عبر واجهة المستخدم**

#### **الخطوة 1: تسجيل الدخول**
```
1. انتقل إلى /login
2. سجل دخول بحساب مسؤول حالي
   (يجب أن يكون admin أو superadmin)
```

#### **الخطوة 2: الوصول لإدارة المستخدمين**
```
1. من لوحة التحكم /admin
2. اضغط على "إدارة المستخدمين"
3. أو انتقل مباشرة إلى /admin/users
```

#### **الخطوة 3: إضافة مسؤول جديد**
```
1. اضغط "مسؤول جديد"
2. أدخل:
   - البريد الإلكتروني
   - كلمة المرور (8 أحرف على الأقل)
   - الاسم الكامل
   - الدور (مسؤول / مدير أعلى)
3. اضغط "إنشاء"
```

---

## 🔐 الصلاحيات

### **Superadmin (مدير أعلى)**
- ✅ إنشاء/تعديل/حذف أي مستخدم
- ✅ تغيير أدوار المستخدمين (بما في ذلك superadmin)
- ✅ الوصول لجميع لوحات التحكم
- ✅ إدارة المحتوى في جميع المنصات
- ✅ إدارة رؤية الأقسام

### **Admin (مسؤول)**
- ✅ إنشاء/تعديل المستخدمين (باستثناء superadmin)
- ✅ الوصول لجميع لوحات التحكم
- ✅ إدارة المحتوى في جميع المنصات
- ✅ إدارة رؤية الأقسام
- ❌ لا يمكنه تعديل superadmin

### **User (مستخدم عادي)**
- ✅ تصفح الموقع
- ✅ عرض المحتوى
- ❌ لا وصول للوحات التحكم
- ❌ لا إدارة للمحتوى

---

## 📊 بنية قاعدة البيانات

### **جدول profiles**
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user', -- user, admin, superadmin
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **دالة create_admin_user**
```sql
create_admin_user(
    p_email TEXT,
    p_password TEXT,
    p_full_name TEXT,
    p_role TEXT DEFAULT 'admin'
) RETURNS JSON
```

**الاستخدام:**
```sql
SELECT create_admin_user(
    'admin@example.com',
    'Password123!',
    'مدير النظام',
    'superadmin'
);
```

**النتيجة:**
```json
{
    "success": true,
    "user_id": "uuid-here",
    "email": "admin@example.com",
    "role": "superadmin"
}
```

---

## 🎯 واجهة إدارة المستخدمين

### **الوصول:**
```
/admin/users
```

### **الصلاحيات المطلوبة:**
- admin أو superadmin فقط

### **الميزات:**

#### **1. عرض جميع المستخدمين**
- جدول بكل المستخدمين
- الاسم، البريد، الدور، الحالة
- تاريخ الإنشاء

#### **2. إضافة مسؤول جديد**
```
[+] مسؤول جديد
├── البريد الإلكتروني
├── كلمة المرور
├── الاسم الكامل
└── الدور (مسؤول / مدير أعلى)
```

#### **3. تعديل الدور**
```
من قائمة منسدلة:
- مستخدم
- مسؤول
- مدير أعلى (superadmin فقط)
```

#### **4. حذف مستخدم**
```
⚠️ تأكيد الحذف
- يحذف من profiles
- يحذف من auth.users
```

#### **5. إحصائيات**
- إجمالي المستخدمين
- عدد المسؤولين
- عدد المدراء الأعلى

---

## 🔒 الأمان

### **سياسات RLS**

#### **إنشاء المستخدمين**
```sql
-- فقط admins يمكنهم إنشاء مستخدمين جدد
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
```

#### **تعديل الأدوار**
```sql
-- فقط admins يمكنهم تعديل الأدوار
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
```

### **حماية الصفحات**

#### **في AdminUsersPage.tsx**
```typescript
const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

if (!isAdmin) {
    return <AccessDenied />;
}
```

---

## 📋 قائمة التحقق

### **للبدء**
- [ ] تشغيل `supabase-admin-users.sql` في Supabase
- [ ] إنشاء حساب superadmin أولي
- [ ] اختبار تسجيل الدخول
- [ ] الوصول إلى `/admin/users`

### **للاختبار**
- [ ] إنشاء حساب مسؤول جديد
- [ ] تسجيل الخروج
- [ ] تسجيل الدخول بالحساب الجديد
- [ ] التحقق من الصلاحيات

---

## 🎨 لقطات الشاشة

### **صفحة إدارة المستخدمين**
```
┌─────────────────────────────────────────────────┐
│ ← إدارة المستخدمين            [+] مسؤول جديد   │
├─────────────────────────────────────────────────┤
│ المستخدم     البريد       الدور    الحالة      │
├─────────────────────────────────────────────────┤
│ 👤 أحمد      admin@...   superadmin  ✅ نشط    │
│ 👤 محمد      manager@..  admin       ✅ نشط    │
│ 👤 علي       user@...    user        ⏸️ غير نشط│
└─────────────────────────────────────────────────┘

📊 الإحصائيات:
├── إجمالي: 50
├── المسؤولين: 5
└── المدراء الأعلى: 2
```

### **نافذة إضافة مسؤول**
```
┌──────────────────────────────┐
│ مسؤول جديد                ✕  │
├──────────────────────────────┤
│ البريد الإلكتروني:           │
│ [admin@example.com       ]   │
│                              │
│ كلمة المرور:                 │
│ [••••••••                ]   │
│                              │
│ الاسم الكامل:                │
│ [مدير النظام             ]   │
│                              │
│ الدور:                       │
│ [مسؤول ▼                 ]   │
│                              │
│ [إلغاء]        [إنشاء]       │
└──────────────────────────────┘
```

---

## 🚀 الاستخدام العملي

### **1. إنشاء فريق المحتوى**
```sql
-- مدير المحتوى
SELECT create_admin_user(
    'content@example.com',
    'Content@123',
    'مدير المحتوى',
    'admin'
);

-- محرر
SELECT create_admin_user(
    'editor@example.com',
    'Editor@123',
    'محرر المحتوى',
    'admin'
);
```

### **2. إنشاء فريق التقنية**
```sql
-- مدير التقنية
SELECT create_admin_user(
    'tech@example.com',
    'Tech@123',
    'مدير التقنية',
    'admin'
);
```

### **3. إنشاء مدراء أعلى**
```sql
-- المدير التنفيذي
SELECT create_admin_user(
    'ceo@example.com',
    'CEO@123',
    'المدير التنفيذي',
    'superadmin'
);
```

---

## 💡 نصائح

### **1. كلمات المرور**
```
✅ استخدم كلمات مرور قوية
✅ 8 أحرف على الأقل
✅ أحرف كبيرة وصغيرة
✅ أرقام ورموز
❌ لا تستخدم كلمات مرور ضعيفة
```

### **2. الصلاحيات**
```
✅ امنح أقل صلاحيات ضرورية
✅ استخدم admin للمحررين
✅ استخدم superadmin للمدراء فقط
❌ لا تمنح superadmin إلا للضرورة
```

### **3. المراجعة**
```
✅ راجع المستخدمين دورياً
✅ احذف الحسابات غير المستخدمة
✅ حدّث الصلاحيات عند الحاجة
```

---

## 🐛 استكشاف الأخطاء

### **"غير مصرح لك"**
```
السبب: المستخدم ليس admin
الحل: سجل دخول بحساب admin أو superadmin
```

### **"فشل إنشاء المستخدم"**
```
الأسباب المحتملة:
1. البريد مستخدم بالفعل
2. كلمة المرور ضعيفة
3. خطأ في قاعدة البيانات

الحل:
1. استخدم بريد مختلف
2. استخدم كلمة مرور أقوى
3. تحقق من Console
```

### **"لا يمكن حذف المستخدم"**
```
السبب: تحاول حذف نفسك
الحل: اطلب من مستخدم آخر حذفك
```

---

## 📞 الدعم

### **ملفات المساعدة**
- 📄 `supabase-admin-users.sql` - ملف SQL
- 📄 `CMS_DOCUMENTATION.md` - دليل إدارة المحتوى
- 📄 `FULL_PROJECT_SUMMARY.md` - ملخص المشروع

### **الروابط**
- لوحة التحكم: `/admin`
- إدارة المستخدمين: `/admin/users`
- إدارة المحتوى: `/admin/content`
- إدارة الرؤية: `/admin/visibility`

---

**Status:** ✅ Production Ready  
**Users Management:** ✅ مكتمل  
**Roles:** user, admin, superadmin  
**Security:** ✅ RLS Policies  
**Last Updated:** 2026-02-22
