# 📋 دليل تنسيق JSON لصفحة التخطيط

## ✅ تنسيق JSON الصحيح

```json
{
  "programs": [
    {
      "id": 1,
      "title": "عنوان البرنامج بالإنجليزي",
      "titleAr": "عنوان البرنامج بالعربي",
      "platform": "twitter",
      "platformName": "إكس (تويتر)",
      "platformColor": "bg-[#1DA1F2]",
      "postsCount": 100,
      "quarterId": 1,
      "order": 0
    }
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🔧 الحقول المطلوبة

| الحقل | النوع | مطلوب | وصف |
|-------|-------|-------|-----|
| `id` | رقم | ✅ نعم | معرف فريد |
| `title` | نص | ✅ نعم | العنوان بالإنجليزي |
| `titleAr` | نص | ✅ نعم | العنوان بالعربي |
| `platform` | نص | ✅ نعم | معرف المنصة (twitter, linkedin, etc.) |
| `platformName` | نص | ✅ نعم | اسم المنصة بالعربي |
| `platformColor` | نص | ✅ نعم | لون Tailwind CSS |
| `postsCount` | رقم | ✅ نعم | عدد المنشورات |
| `quarterId` | رقم | ❌ لا | الربع السنوي (1, 2, 3, 4, أو null) |
| `order` | رقم | ❌ لا | الترتيب داخل الربع |

---

## 🎯 معرفات المنصات

| المعرف | الاسم | اللون |
|--------|-------|-------|
| `twitter` | إكس (تويتر) | `bg-[#1DA1F2]` |
| `linkedin` | لينكد إن | `bg-[#0077B5]` |
| `instagram` | إنستغرام | `bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]` |
| `youtube` | يوتيوب | `bg-[#FF0000]` |
| `facebook` | فيسبوك | `bg-[#1877F2]` |
| `telegram` | تيليجرام | `bg-[#0088cc]` |
| `tiktok` | تيك توك | `bg-black` |
| `snapchat` | سناب شات | `bg-[#FFFC00]` |

---

## 📥 إصلاحات الاستيراد

الآن دالة الاستيراد:

### ✅ **تتعامل مع تنسيقي الحقول:**
```javascript
// كل من camelCase و snake_case يعمل!
{
  "platformColor": "bg-[#1DA1F2]",  // ✅ camelCase
  "platform_color": "bg-[#1DA1F2]"  // ✅ snake_case (يُحوّل تلقائياً)
}
```

### ✅ **تتحقق من الحقول المطلوبة:**
- `title` (العنوان بالإنجليزي)
- `titleAr` (العنوان بالعربي)

البرامج بدون هذه الحقول تُتخطى مع تحذير.

### ✅ **توفر قيم افتراضية:**
```javascript
{
  platform: "twitter",        // افتراضي إذا لم يوجد
  platformName: "إكس (تويتر)", // يُكتشف تلقائياً من platform
  platformColor: "bg-[#1DA1F2]", // يُكتشف تلقائياً من platform
  postsCount: 100,            // افتراضي إذا لم يوجد
  quarterId: null,            // افتراضي إذا لم يوجد
  order: index                // يُعيّن تلقائياً
}
```

---

## 📤 تنسيق التصدير

عند التصدير، JSON سيكون:

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
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🧪 مثال: JSON الخاص بك (مُصحّح)

الـ JSON الأصلي كان **صحيح تقريباً**! إليك النسخة الكاملة:

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
      "order": 1
    }
    // ... بقية البرامج
  ],
  "exportDate": "2026-02-21T08:00:00.000Z",
  "version": "1.0"
}
```

---

## 🔍 التحقق من الصحة

بعد النشر:

1. **اختبر التصدير:**
   - اذهب لصفحة Planning
   - اضغط Export/Import
   - اضغط "تصدير البيانات"
   - تحقق من أن JSON يحتوي على أسماء الحقول الصحيحة

2. **اختبر الاستيراد:**
   - انسخ JSON المثال أعلاه
   - الصق في خانة الاستيراد
   - اضغط "استيراد البيانات"
   - تحقق من ظهور البرامج بشكل صحيح

3. **اختبر الحفظ:**
   - عدّل برنامج
   - احفظ في قاعدة البيانات
   - أعد تحميل الصفحة
   - تحقق من بقاء البيانات

---

## ✅ النتيجة المتوقعة

✅ التصدير يُنتج JSON صحيح بحقول camelCase
✅ الاستيراد يقبل camelCase و snake_case
✅ التحقق يمسك الحقول المفقودة
✅ الكشف التلقائي يملأ تفاصيل المنصة
✅ الحفظ في قاعدة البيانات يعمل بدون أخطاء

---

## 📁 الملفات المُعدّلة

| الملف | التغييرات |
|-------|-----------|
| `src/platforms/news/pages/PlanningPage.tsx` | ✅ تحسين الاستيراد/التصدير |
| `src/context/DatabaseContext.tsx` | ✅ تحويل camelCase ↔ snake_case |
| `PLANNING_JSON_FORMAT.md` | ✅ دليل التنسيق الكامل |

---

**حالة البناء:** ✅ ناجح (1,145 KB)

**جاهز!** فقط أعد نشر التطبيق واختبر الاستيراد/التصدير. 🎉
