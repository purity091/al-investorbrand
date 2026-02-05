import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { BarChart2, EyeOff, Info } from 'lucide-react';

export const GuidelinesPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="معايير عرض البيانات | Data Visualization Standards"
                subtitle="كيف نعرض الأرقام لتصبح قراراً؟"
            />

            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#EF4444]">
                                <EyeOff size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">تجنب "خداع المحاور" (Axis Manipulation)</h4>
                                <p className="text-sm text-slate-600">يجب أن يبدأ المحور Y من الصفر دائماً في مقارنات الحجم، لتجنب تضخيم الفروقات البسيطة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-[#00E1C1]">
                                <BarChart2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">الألوان ذات الدلالة</h4>
                                <p className="text-sm text-slate-600">الأخضر للارتفاع، الأحمر للانخفاض. لا نستخدم هذه الألوان في سياق آخر لتجنب إرباك المتداول.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <h4 className="font-bold text-[#0D1137] mb-4 flex items-center gap-2">
                            <Info size={16} /> لوحة الألوان الوظيفية
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 bg-[#10B981] rounded"></div>
                                <span className="text-xs font-mono">Success / Bullish</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 bg-[#EF4444] rounded"></div>
                                <span className="text-xs font-mono">Error / Bearish</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 bg-[#F59E0B] rounded"></div>
                                <span className="text-xs font-mono">Warning / Volatile</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 bg-[#3B82F6] rounded"></div>
                                <span className="text-xs font-mono">Info / Neutral</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
