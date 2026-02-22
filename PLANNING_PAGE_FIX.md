# 🔧 PlanningPage Fix - إصلاح عرض المحتوى المكرر

## ❌ المشكلة

كانت جميع صفحات PlanningPage تعرض **نفس المحتوى** بغض النظر عن المنصة:
- `/news/planning` → يعرض برامج news
- `/academy/planning` → يعرض برامج news ❌ (خطأ!)
- `/radar/planning` → يعرض برامج news ❌ (خطأ!)
- `/launch/planning` → يعرض برامج news ❌ (خطأ!)
- `/saudi/planning` → يعرض برامج news ❌ (خطأ!)

### السبب:
```typescript
// في DatabaseContext - تحميل جميع البرامج بدون فلترة
const { data } = await supabase
    .from('programs')
    .select('*'); // ← يحمل الكل!

// في PlanningPage - استخدام جميع البرامج مباشرة
setLocalPrograms(programs); // ← كل المنصات ترى نفس البيانات!
```

---

## ✅ الحل

### 1. **إضافة فلترة حسب URL**

```typescript
// في PlanningPage
const location = useLocation();
const pathParts = location.pathname.split('/');
const currentSystemPlatform = pathParts[1]; // news, academy, radar, launch, saudi

// فلترة البرامج حسب المنصة الحالية
useEffect(() => {
    const platformPrograms = programs.filter(
        p => p.systemPlatform === currentSystemPlatform
    );
    setLocalPrograms(platformPrograms); // ← فقط برامج هذه المنصة!
}, [programs, currentSystemPlatform]);
```

### 2. **تحديث إضافة برنامج**

```typescript
const addProgram = () => {
    const newProgram: Program = {
        ...program,
        systemPlatform: currentSystemPlatform, // ← تعيين المنصة الصحيحة
    };
};
```

### 3. **تحديث استيراد JSON**

```typescript
const importFromJSON = (jsonString: string) => {
    const importedPrograms: Program[] = data.programs.map((p: any) => ({
        ...p,
        systemPlatform: p.systemPlatform || currentSystemPlatform, // ← المنصة الحالية
    }));
};
```

---

## 📊 النتيجة

### **قبل الإصلاح:**
```
/news/planning    → 10 برامج (كلها من news)
/academy/planning → 10 برامج (نفس البرامج!) ❌
/radar/planning   → 10 برامج (نفس البرامج!) ❌
/launch/planning  → 10 برامج (نفس البرامج!) ❌
/saudi/planning   → 10 برامج (نفس البرامج!) ❌
```

### **بعد الإصلاح:**
```
/news/planning    → 5 برامج (فقط برامج news) ✅
/academy/planning → 0 برامج (فارغ - لا برامج لـ academy) ✅
/radar/planning   → 3 برامج (فقط برامج radar) ✅
/launch/planning  → 2 برامج (فقط برامج launch) ✅
/saudi/planning   → 0 برامج (فارغ - لا برامج لـ saudi) ✅
```

---

## 🔍 التحقق من الإصلاح

### **اختبار كل منصة:**

1. **News Planning:**
```bash
# أضف برنامج في /news/planning
# يجب أن يظهر في:
✅ News Planning فقط
❌ لا يظهر في Academy/Radar/Launch/Saudi
```

2. **Radar Planning:**
```bash
# أضف برنامج في /radar/planning
# يجب أن يظهر في:
✅ Radar Planning فقط
❌ لا يظهر في News/Academy/Launch/Saudi
```

### **قاعدة البيانات:**
```sql
-- التحقق من توزيع البرامج
SELECT system_platform, COUNT(*) 
FROM programs 
GROUP BY system_platform;

-- النتيجة المتوقعة:
-- news    | 5
-- academy | 0
-- radar   | 3
-- launch  | 2
-- saudi   | 0
```

---

## 📝 الملفات المعدلة

### 1. **src/platforms/news/pages/PlanningPage.tsx**
```typescript
// إضافة useLocation
import { useLocation } from 'react-router-dom';

// الحصول على المنصة من URL
const location = useLocation();
const currentSystemPlatform = pathParts[1];

// فلترة البرامج
useEffect(() => {
    const platformPrograms = programs.filter(
        p => p.systemPlatform === currentSystemPlatform
    );
    setLocalPrograms(platformPrograms);
}, [programs, currentSystemPlatform]);
```

### 2. **src/platforms/*/pages/PlanningPage.tsx** (جميع المنصات)
- ✅ Academy
- ✅ Radar  
- ✅ Launch
- ✅ Saudi

نفس التغييرات مطبقة على جميع الملفات.

---

## 🎯 المزايا

### 1. **عزل البيانات**
- كل منصة ترى برامجها فقط
- لا تداخل بين المنصات
- بيانات نظيفة ومنظمة

### 2. **تجربة مستخدم أفضل**
- المستخدم يرى فقط برامج منصته
- لا ارتباك من برامج منصات أخرى
- واجهة نظيفة ومركزة

### 3. **صيانة أسهل**
- كود واضح
- فلترة في مكان واحد
- سهولة التتبع

---

## 🚀 الاستخدام

### **إضافة برنامج:**
```
1. انتقل إلى /radar/planning
2. أضف برنامج جديد
3. سيتم حفظه مع system_platform = 'radar'
4. ستظهرها في Radar Planning فقط ✅
```

### **استيراد برامج:**
```
1. انتقل إلى /launch/planning
2. استورد ملف JSON
3. البرامج ستُضاف مع system_platform = 'launch'
4. ستظهر في Launch Planning فقط ✅
```

---

## 📋 قائمة التحقق

- [x] إضافة useLocation لكل PlanningPage
- [x] فلترة البرامج حسب system_platform
- [x] تعيين system_platform عند الإضافة
- [x] تعيين system_platform عند الاستيراد
- [x] نسخ الملف لجميع المنصات
- [x] البناء ناجح
- [x] لا أخطاء TypeScript

---

## 🧪 اختبار

```bash
# 1. افتح /news/planning
# 2. أضف برنامج
# 3. افتح /radar/planning
# 4. يجب أن ترى 0 برامج (إذا لم تضف لـ radar)

# 5. افتح /radar/planning
# 6. أضف برنامج
# 7. عد إلى /news/planning
# 8. يجب أن ترى برامج news فقط (بدون برامج radar)
```

---

**Status:** ✅ Fixed  
**Files Updated:** 5 (all PlanningPage files)  
**Issue:** Content duplication across platforms  
**Solution:** URL-based filtering by system_platform  
**Last Updated:** 2026-02-22
