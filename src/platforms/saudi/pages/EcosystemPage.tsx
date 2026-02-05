import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Layers, ArrowRight } from 'lucide-react';

export const EcosystemPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="المنظومة | Ecosystem"
                subtitle="خدماتنا المترابطة لخدمة المستثمر."
            />

            <div className="relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-colors group">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#00E1C1] group-hover:text-[#0D1137] transition-colors">
                            <Layers size={24} />
                        </div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">بوابة المعرفة</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            مقالات، تقارير، وإنفوجرافيك تشرح أنظمة السوق والقرارات الاقتصادية الجديدة.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-colors group">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#00E1C1] group-hover:text-[#0D1137] transition-colors">
                            <Layers size={24} />
                        </div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">أدوات التحليل</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            متابعة حية لأسعار تاسي، نمو، والصناديق العقارية (REITs).
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-colors group">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl mb-6 flex items-center justify-center group-hover:bg-[#00E1C1] group-hover:text-[#0D1137] transition-colors">
                            <Layers size={24} />
                        </div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">مجتمع المستثمر</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            فعاليات ولقاءات دورية للربط بين المستثمرين ورواد الأعمال.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
