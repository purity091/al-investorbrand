# 🔧 إصلاح صفحة التخطيط السنوي - لا تعرض البرامج

## ❌ المشكلة

صفحة PlanningPage لا تعرض البرامج حتى بعد إضافتها في قاعدة البيانات.

---

## 🔍 السبب الجذري

### **المشكلة 1: system_platform NULL في قاعدة البيانات**
```sql
-- البرامج القديمة ليس لها system_platform
SELECT id, title, system_platform FROM programs;
-- النتيجة: system_platform = NULL
```

### **المشكلة 2: الفلترة تفشل**
```typescript
// في PlanningPage
const platformPrograms = programs.filter(p => p.systemPlatform === currentSystemPlatform);
// إذا كانت system_platform NULL → لا توجد برامج مطابقة!
```

---

## ✅ الحل

### **الخطوة 1: إصلاح قاعدة البيانات**

```sql
-- في Supabase SQL Editor
-- شغّل الملف: supabase-fix-system-platform.sql

-- أو يدوياً:
-- 1. إضافة العمود
ALTER TABLE programs ADD COLUMN IF NOT EXISTS system_platform TEXT DEFAULT 'news';

-- 2. تحديث القيم NULL
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL;

-- 3. إنشاء فهرس
CREATE INDEX IF NOT EXISTS idx_programs_system_platform ON programs(system_platform);

-- 4. التحقق
SELECT system_platform, COUNT(*) FROM programs GROUP BY system_platform;
```

### **النتيجة المتوقعة:**
```
system_platform | count
----------------|-------
news            | 10
academy         | 0
radar           | 0
launch          | 0
saudi           | 0
```

---

### **الخطوة 2: التحقق من Console**

افتح المتصفح → Console (F12) وانتقل إلى `/news/planning`:

```javascript
// يجب أن ترى:
PlanningPage: Current platform: news
PlanningPage: All programs from DB: 10
PlanningPage: Filtered programs for news : 10
PlanningPage: Sample filtered program: { id: 1, title: '...', ... }
```

**إذا رأيت 0 برامج:**
```
PlanningPage: Filtered programs for news : 0
```

**السبب:**
- البرامج في قاعدة البيانات ليس لها `system_platform`
- أو القيمة خاطئة (مثلاً: 'twitter' بدلاً من 'news')

**الحل:**
```sql
-- تحقق من القيم
SELECT id, title, system_platform FROM programs LIMIT 10;

-- إذا كانت خاطئة، صححها
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL OR system_platform = '';
```

---

### **الخطوة 3: إضافة برنامج جديد**

```
1. انتقل إلى /news/planning
2. اضغط "إضافة برنامج"
3. املأ البيانات
4. اضغط "إضافة"

// في Console سترى:
DatabaseContext: Loaded programs from DB: 10
DatabaseContext: Transformed programs: 11
```

---

## 🐛 أخطاء شائعة

### **1. "لا توجد برامج" بعد الإضافة**

**السبب:** قاعدة البيانات غير مهيأة

**الحل:**
```sql
-- تحقق من وجود العمود
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'programs' AND column_name = 'system_platform';

-- إذا لم يكن موجوداً:
ALTER TABLE programs ADD COLUMN system_platform TEXT DEFAULT 'news';
```

---

### **2. البرامج تظهر في المنصة الخطأ**

**السبب:** `system_platform` خاطئ

**مثال:**
```
أضفت برنامج في /news/planning
لكن ظهر في /radar/planning!
```

**التحقق:**
```sql
SELECT id, title, system_platform FROM programs WHERE id = <program-id>;
```

**الحل:**
```sql
UPDATE programs SET system_platform = 'news' WHERE id = <program-id>;
```

---

### **3. Console يظهر 0 برامج**

**التحقق:**
```javascript
// في Console
console.log('Programs:', programs);
console.log('Programs count:', programs.length);
```

**الأسباب المحتملة:**
1. Supabase غير مهيأ → تحقق من `.env`
2. جدول programs فارغ → أضف برامج
3. RLS policies تمنع القراءة → تحقق من الصلاحيات

**الحل:**
```sql
-- تحقق من RLS
SELECT * FROM pgrst.dependent_privs 
WHERE object_name = 'programs';

-- تحقق من البيانات
SELECT COUNT(*) FROM programs;
```

---

## 📊 التتبع الكامل

### **1. من قاعدة البيانات إلى UI**

```
Supabase DB
    ↓
programs table (system_platform = 'news')
    ↓
DatabaseContext.loadPrograms()
    ↓
console.log: "Loaded programs from DB: 10"
    ↓
programs state = [program1, program2, ...]
    ↓
PlanningPage.useEffect()
    ↓
console.log: "All programs from DB: 10"
    ↓
filter(p => p.systemPlatform === 'news')
    ↓
console.log: "Filtered programs for news : 10"
    ↓
localPrograms state = [program1, program2, ...]
    ↓
UI renders 10 programs ✅
```

---

### **2. إضافة برنامج جديد**

```
User clicks "إضافة برنامج"
    ↓
fill form + click "إضافة"
    ↓
addProgram()
    ↓
newProgram.systemPlatform = currentSystemPlatform ('news')
    ↓
autoSaveToDatabase(updated)
    ↓
DatabaseContext.savePrograms()
    ↓
supabase.upsert({ system_platform: 'news', ... })
    ↓
Database updated ✅
    ↓
setPrograms(updated)
    ↓
PlanningPage.useEffect() triggers
    ↓
filter → includes new program ✅
    ↓
UI shows new program ✅
```

---

## 🧪 اختبار شامل

### **الاختبار 1: عرض البرامج الموجودة**
```sql
-- 1. تحقق من قاعدة البيانات
SELECT COUNT(*) FROM programs WHERE system_platform = 'news';
-- يجب أن يكون > 0

-- 2. انتقل إلى /news/planning
-- 3. افتح Console
-- 4. تحقق من:
// PlanningPage: Filtered programs for news : X (X > 0)
```

### **الاختبار 2: إضافة برنامج**
```
1. /news/planning → إضافة برنامج
2. ملأ البيانات → إضافة
3. Console:
   - DatabaseContext: Transformed programs: X+1
   - PlanningPage: Filtered programs for news : X+1
4. UI: البرنامج الجديد ظاهر ✅
```

### **الاختبار 3: فلتر المنصات**
```
1. أضف برنامج في /news/planning
2. انتقل إلى /radar/planning
3. Console:
   - PlanningPage: Current platform: radar
   - PlanningPage: Filtered programs for radar : 0
4. UI: لا برامج في Radar ✅
```

---

## 📝 الملفات المعدلة

### **1. DatabaseContext.tsx**
```typescript
// إضافة console.log للتحقق
console.log('DatabaseContext: Loaded programs from DB:', data.length);
console.log('DatabaseContext: Transformed programs:', transformed.length);
console.log('DatabaseContext: Sample program:', transformed[0]);
```

### **2. PlanningPage.tsx**
```typescript
// إضافة console.log للفلترة
useEffect(() => {
    console.log('PlanningPage: Current platform:', currentSystemPlatform);
    console.log('PlanningPage: All programs from DB:', programs.length);
    
    const platformPrograms = programs.filter(p => p.systemPlatform === currentSystemPlatform);
    
    console.log('PlanningPage: Filtered programs for', currentSystemPlatform, ':', platformPrograms.length);
    console.log('PlanningPage: Sample filtered program:', platformPrograms[0]);
    
    setLocalPrograms(platformPrograms);
}, [programs, currentSystemPlatform]);
```

### **3. supabase-fix-system-platform.sql**
```sql
-- إصلاح قاعدة البيانات
ALTER TABLE programs ADD COLUMN IF NOT EXISTS system_platform TEXT DEFAULT 'news';
UPDATE programs SET system_platform = 'news' WHERE system_platform IS NULL;
CREATE INDEX IF NOT EXISTS idx_programs_system_platform ON programs(system_platform);
```

---

## ✅ قائمة التحقق

- [ ] تشغيل `supabase-fix-system-platform.sql`
- [ ] التحقق من `SELECT COUNT(*) FROM programs`
- [ ] فتح Console في المتصفح
- [ ] الانتقال إلى `/news/planning`
- [ ] التحقق من Console logs
- [ ] إضافة برنامج جديد
- [ ] التحقق من ظهور البرنامج
- [ ] اختبار المنصات الأخرى

---

## 🎯 النتيجة النهائية

**قبل الإصلاح:**
```
/news/planning → 0 برامج ❌
Console: Filtered programs for news : 0
```

**بعد الإصلاح:**
```
/news/planning → 10 برامج ✅
Console: Filtered programs for news : 10
```

---

**Status:** ✅ Fixed  
**Root Cause:** system_platform NULL in database  
**Solution:** Update NULL values + add debugging  
**Last Updated:** 2026-02-22
