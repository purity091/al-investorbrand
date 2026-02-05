import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Target, Heart, Anchor, Star } from 'lucide-react';

export const CorePage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="جوهر العلامة | Brand Core"
                subtitle="قيمنا مستمدة من طموح وطن."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">المهمة (Mission)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        تمكين كل مواطن ومقيم من فهم واستغلال الفرص الاستثمارية التي تخلقها رؤية المملكة 2030.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center scale-105 z-10 border-emerald-500/20 shadow-emerald-500/5">
                    <div className="w-16 h-16 bg-[#00E1C1] text-[#0D1137] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00E1C1]/20">
                        <Star size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">الرؤية (Vision)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        أن نكون المرجع الأول والموثوق لكل معلومة استثمارية في السوق السعودي.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">الوعد (Promise)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        معلومات دقيقة، تحليل محايد، ولغة بسيطة يفهمها الجميع.
                    </p>
                </div>
            </div>

            <div className="bg-[#0D1137] rounded-3xl p-10 text-white">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Anchor className="text-[#00E1C1]" /> القيم الجوهرية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                        <div className="w-1 h-full bg-[#00E1C1] rounded-full"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">الوطنية الطموحة</h4>
                            <p className="text-blue-100 text-sm">نحن جزء من قصة نجاح هذا الوطن، ونعمل لتعزيز ازدهاره المالي.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 h-full bg-[#00E1C1] rounded-full"></div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">المصداقية المطلقة</h4>
                            <p className="text-blue-100 text-sm">لا مكان للشائعات. بياناتنا من المصادر الرسمية فقط.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
