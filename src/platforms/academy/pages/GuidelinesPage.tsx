import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Book, Check } from 'lucide-react';

export const GuidelinesPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="معايير الجودة الأكاديمية | Quality Guidelines"
                subtitle="كيف نضمن جودة المحتوى التعليمي؟"
            />

            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                            <Book className="text-[#00E1C1]" /> هيكلة الدروس (Lesson Structure)
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="bg-slate-100 text-[#0D1137] font-bold text-xs p-1 rounded min-w-[30px] text-center mt-1">10%</span>
                                <p className="text-sm text-slate-600">المقدمة والخطاف (Hook): لماذا هذا الدرس مهم؟ وماذا ستتعلم؟</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="bg-slate-100 text-[#0D1137] font-bold text-xs p-1 rounded min-w-[30px] text-center mt-1">60%</span>
                                <p className="text-sm text-slate-600">المحتوى الأساسي (Core): الشرح النظري + الأمثلة العملية.</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="bg-slate-100 text-[#0D1137] font-bold text-xs p-1 rounded min-w-[30px] text-center mt-1">20%</span>
                                <p className="text-sm text-slate-600">التطبيق (Action): تمرين عملي أو سؤال تفاعلي.</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="bg-slate-100 text-[#0D1137] font-bold text-xs p-1 rounded min-w-[30px] text-center mt-1">10%</span>
                                <p className="text-sm text-slate-600">الملخص (Recap): أهم النقاط الرئيسية.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl">
                        <h4 className="font-bold text-[#0D1137] mb-4">قائمة التحقق للمدربين (Trainer Checklist)</h4>
                        <ul className="space-y-3">
                            {["جودة الصوت عالية (بدون صدى)", "شرح بصري (ليس مجرد رأس يتحدث)", "أمثلة من السوق الحالي", "تقسيم الفيديو الطويل إلى فصول"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check size={16} className="text-[#00E1C1]" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
