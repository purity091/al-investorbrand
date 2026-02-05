import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Image, Type, Layout } from 'lucide-react';

export const SocialPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="قوالب النشر الإعلامي | Media Templates"
                subtitle="قوالب بصرية موحدة لضمان سرعة النشر وتناسق الهوية."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Breaking News Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-slate-900 rounded-2xl relative overflow-hidden group border border-slate-200">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#EF4444]"></div>
                        <div className="p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 rounded">عاجل</span>
                                <div className="w-8 h-8 rounded bg-white/10"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                                <div className="h-4 w-full bg-white/20 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">قالب الخبر العاجل</h4>
                        <p className="text-xs text-slate-500">يستخدم للأحداث ذات الأهمية القصوى والفورية.</p>
                    </div>
                </div>

                {/* Market Summary Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-white rounded-2xl relative overflow-hidden group border border-slate-200 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#00E1C1]"></div>
                        <div className="p-6 h-full flex flex-col justify-center items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                <Layout className="text-[#0D1137]" />
                            </div>
                            <div className="space-y-2 w-full">
                                <div className="h-6 w-1/2 bg-slate-100 rounded mx-auto"></div>
                                <div className="h-32 w-full bg-slate-50 rounded border border-dashed border-slate-200"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">ملخص الأسواق</h4>
                        <p className="text-xs text-slate-500">للإغلاقات اليومية وأداء المؤشرات.</p>
                    </div>
                </div>

                {/* Quote Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-[#0D1137] rounded-2xl relative overflow-hidden group border border-slate-200">
                        <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                            <Type className="text-[#00E1C1] mb-4" size={32} />
                            <p className="text-white font-serif text-lg leading-relaxed">"الاستثمار ليس عملية مضاربة، بل هو شراء أصول منتجة."</p>
                            <div className="mt-4 pt-4 border-t border-white/10 w-full">
                                <div className="h-3 w-1/3 bg-white/20 rounded mx-auto mb-2"></div>
                                <div className="h-2 w-1/4 bg-white/10 rounded mx-auto"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">قالب الاقتباس</h4>
                        <p className="text-xs text-slate-500">لتصريحات المسؤولين والخبراء.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
