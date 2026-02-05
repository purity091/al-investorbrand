import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { ClipboardList, CheckSquare, Calendar } from 'lucide-react';

export const SocialPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="أدوات وقوالب النشر | Toolkit Templates"
                subtitle="محتوى جاهز للاستخدام من قبل رواد الأعمال."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Checklist Card */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-white rounded-3xl border-2 border-[#0D1137] p-6 relative shadow-[8px_8px_0px_0px_#0D1137]">
                        <div className="absolute top-4 right-4 text-[#00E1C1]">
                            <ClipboardList size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-[#0D1137] mt-8 mb-4">قائمة ما قبل الإطلاق</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-2 items-center text-sm text-slate-600"><CheckSquare size={16} /> حجز النطاق (Domain)</li>
                            <li className="flex gap-2 items-center text-sm text-slate-600"><CheckSquare size={16} /> تجهيز صفحات الهبوط</li>
                            <li className="flex gap-2 items-center text-sm text-slate-600"><CheckSquare size={16} /> إعداد تحليلات جوجل</li>
                            <li className="flex gap-2 items-center text-sm text-slate-600"><CheckSquare size={16} /> اختبار الدفع الإلكتروني</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">قوائم التحقق (Checklists)</h4>
                        <p className="text-xs text-slate-500">قابلة للحفظ والمشاركة.</p>
                    </div>
                </div>

                {/* Event Countdown */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-[#00E1C1] rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 opacity-50 pattern-grid-lg"></div>
                        <h4 className="font-bold text-[#0D1137] text-lg uppercase tracking-widest mb-2 relative z-10">Webinar</h4>
                        <h2 className="text-4xl font-black text-[#0D1137] mb-4 relative z-10">كيف تسعر منتجك؟</h2>
                        <div className="bg-[#0D1137] text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 relative z-10">
                            <Calendar size={16} /> غداً - 8 مساءً
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">إعلان الفعاليات</h4>
                        <p className="text-xs text-slate-500">للويبينارات وورش العمل.</p>
                    </div>
                </div>

                {/* Quote Card */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-slate-50 rounded-3xl p-8 flex flex-col justify-center text-left border border-slate-200">
                        <span className="text-6xl font-serif text-[#00E1C1] leading-none mb-4">"</span>
                        <p className="text-[#0D1137] font-bold text-xl leading-relaxed">
                            إذا لم تشعر بالحرج من النسخة الأولى لمنتجك، فأنت قد أطلقته متأخراً جداً.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                            <div>
                                <p className="text-sm font-bold text-[#0D1137]">ريد هوفمان</p>
                                <p className="text-xs text-slate-500">مؤسس لينكد إن</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">اقتباس ريادي</h4>
                        <p className="text-xs text-slate-500">لتغيير العقلية (Mindset Shift).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
