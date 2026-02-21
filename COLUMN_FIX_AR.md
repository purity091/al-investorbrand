# 🔧 إصلاح خطأ عمود 'platformColor'

## ❌ رسالة الخطأ
```
Could not find the 'platformColor' column of 'programs' in the schema cache
```

## 🎯 السبب

الكود يستخدم أسماء حقول **camelCase** (`platformColor`, `platformName`)، لكن:
- قاعدة بيانات Supabase تستخدم أعمدة **snake_case** (`platform_color`, `platform_name`)
- جدول قاعدة البيانات الحالي يفتقد عمود `platform_color`

## ✅ الحل (خطوتين)

---

### **الخطوة 1: إضافة العمود المفقود**

شغّل هذا SQL لإضافة العمود المفقود:

**الملف:** `supabase-add-missing-columns.sql`

#### التعليمات:

1. **افتح Supabase Dashboard**
   - https://supabase.com/dashboard
   - اختر مشروعك: `jeemdvtinrkbapkqgund`

2. **اذهب إلى SQL Editor**
   - اضغط **SQL Editor**
   - اضغط **"New query"**

3. **انسخ وشغّل الإصلاح**
   - افتح الملف: `supabase-add-missing-columns.sql`
   - انسخ كل كود SQL
   - الصق في SQL Editor
   - اضغط **"Run"**

4. **تحقق من وجود الأعمدة**
   يجب أن ترى:
   ```
   platform_color, platform_name, posts_count, quarter_id
   ```

---

### **الخطوة 2: إعادة نشر التطبيق**

تم تحديث الكود لتحويل أسماء الحقول بشكل صحيح:

**التغييرات:**
- ✅ `loadPrograms()` - يحوّل `snake_case` → `camelCase`
- ✅ `savePrograms()` - يحوّل `camelCase` → `snake_case`
- ✅ `loadPlatforms()` - يحوّل `snake_case` → `camelCase`
- ✅ `savePlatforms()` - يحوّل `camelCase` → `snake_case`

#### لإعادة النشر:

1. https://vercel.com/dashboard
2. مشروعك: `al-investorbrand`
3. **Deployments** → القائمة (⋮) → **Redeploy**
4. انتظر 1-2 دقيقة

---

## 📋 التحقق

بعد تشغيل الترحيل وإعادة النشر:

- [ ] تم تشغيل SQL بنجاح
- [ ] عمود `platform_color` موجود في جدول `programs`
- [ ] عمود `platform_name` موجود في جدول `programs`
- [ ] تم إعادة نشر التطبيق
- [ ] الموقع يعمل بدون أخطاء
- [ ] حفظ JSON يعمل بدون أخطاء

---

## 🧪 اختبر مع JSON الخاص بك

بعد الإصلاح، حاول حفظ هذا JSON:

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
  ]
}
```

**النتيجة المتوقعة:**
✅ يُحفظ بنجاح بدون أخطاء
✅ البرامج تظهر في الأرباع الصحيحة
✅ الألوان تعمل بشكل صحيح

---

## 🔍 التحقق من قاعدة البيانات

شغّل هذا الاستعلام للتحقق من الأعمدة:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'programs'
ORDER BY ordinal_position;
```

يجب أن ترى هذه الأعمدة:
- `platform_color` (text)
- `platform_name` (text)
- `posts_count` (integer)
- `quarter_id` (integer)

---

## ✅ النتيجة المتوقعة

بعد اتباع الخطوات:

✅ **لا توجد أخطاء أعمدة**
✅ **JSON يُحفظ بنجاح**
✅ **البرامج تُحمّل بشكل صحيح**
✅ **الألوان تعمل**
✅ **جميع العمليات تعمل**

---

## 📁 الملفات

| الملف | الوصف |
|-------|-------|
| [`supabase-add-missing-columns.sql`](c:\xampp\htdocs\brand\supabase-add-missing-columns.sql) | إضافة الأعمدة المفقودة |
| [`COLUMN_FIX.md`](c:\xampp\htdocs\brand\COLUMN_FIX.md) | دليل الإصلاح الكامل |

---

## 🚀 ملخص سريع

**الخطوات:**

1. ✅ شغّل `supabase-add-missing-columns.sql` في Supabase
2. ✅ أعد نشر التطبيق من Vercel
3. ✅ اختبر حفظ JSON - يجب أن يعمل!

**حالة البناء:** ✅ ناجح (1,144 KB)

---

**جاهز!** فقط شغّل الترحيل وأعد النشر. 🎉
