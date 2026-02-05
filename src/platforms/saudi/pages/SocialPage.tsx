import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Landmark, TrendingUp, Calendar } from 'lucide-react';

export const SocialPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="قوالب السوق السعودي | Saudi Templates"
                subtitle="تصاميم تعكس الهوية المحلية وتخدم المستثمر."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Vision 2030 Card */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-gradient-to-b from-[#0D1137] to-[#1a237e] rounded-3xl p-6 flex flex-col items-center justify-center text-center relative border border-slate-200">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                            <Landmark className="text-[#00E1C1]" size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">مشاريع الرؤية</h3>
                        <p className="text-blue-200 text-sm">تغطية خاصة لمشاريع نيوم، القدية، والبحر الأحمر.</p>
                        <div className="absolute top-4 right-4 text-xs font-bold text-[#00E1C1] border border-[#00E1C1] px-2 py-0.5 rounded">2030</div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">بطاقة الرؤية</h4>
                        <p className="text-xs text-slate-500">للمشاريع الحكومية الكبرى.</p>
                    </div>
                </div>

                {/* IPO Calendar */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-[#0D1137]">اكتتاب جديد</span>
                            <Calendar className="text-[#00E1C1]" size={20} />
                        </div>
                        <div className="w-16 h-16 bg-slate-100 rounded-xl mb-4"></div>
                        <h3 className="text-xl font-bold text-[#0D1137]">شركة المطاحن الأولى</h3>
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">نطاق السعر</span>
                                <span className="font-bold">50 - 60 ريال</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">تاريخ الطرح</span>
                                <span className="font-bold">15 مارس</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">تقويم الاكتتابات</h4>
                        <p className="text-xs text-slate-500">للطروحات الأولية (IPO).</p>
                    </div>
                </div>

                {/* TASI Index */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 flex flex-col justify-center items-center text-center">
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">TASI Index</h3>
                        <h2 className="text-4xl font-black text-[#10B981] mb-2">12,450</h2>
                        <div className="flex items-center gap-2 text-[#10B981] font-bold bg-[#10B981]/10 px-3 py-1 rounded-full">
                            <TrendingUp size={16} /> +1.2%
                        </div>
                        <p className="mt-6 text-xs text-slate-500">إغلاق السوق السعودي</p>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">مؤشر تاسي</h4>
                        <p className="text-xs text-slate-500">ملخص السوق اليومي.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
