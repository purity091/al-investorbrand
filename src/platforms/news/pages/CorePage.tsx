import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { ShieldAlert, Feather, Scale, Globe } from 'lucide-react';

export const CorePage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="ميثاق الشرف | Editorial Charter"
                subtitle="كيف نصنع خبراً تثق به؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-[#0D1137] text-white p-10 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Scale size={300} />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 relative z-10">المهمة المقدسة (Mission)</h3>
                    <p className="text-blue-100 text-lg leading-relaxed relative z-10 mb-8">
                        في عصر "الترند" وانتشار الشائعات، مهمتنا هي أن نكون "فلتر الضجيج". نحن لا ننقل الخبر فحسب، بل نتحقق من صحته، ونحلل سياقه، ونشرح أثره على محفظتك.
                    </p>
                    <div className="flex gap-4 relative z-10">
                        <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-bold border border-white/10">الدقة أولاً</div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg text-sm font-bold border border-white/10">السرعة ثانياً</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D1137] text-lg">سياسة التصحيح</h4>
                            <p className="text-slate-600 text-sm">إذا أخطأنا، نعترف فوراً. الموثوقية تبنى بالشفافية، لا بالادعاء بالكمال.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D1137] text-lg">منظور محلي، معايير عالمية</h4>
                            <p className="text-slate-600 text-sm">نطبق معايير رويترز و بلومبيرغ في التحرير، لكننا نكتب بلسان عربي يفهم خصوصية منطقتنا.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                            <Feather size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0D1137] text-lg">الاستقلالية</h4>
                            <p className="text-slate-600 text-sm">لا يخضع محتوانا لأي ضغوط تجارية من المعلنين. الخبر هو الملك.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
