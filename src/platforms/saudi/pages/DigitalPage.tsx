import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Smartphone, PieChart, ArrowUpRight } from 'lucide-react';

export const DigitalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تجربة تداول الرقمية | Tadawul UX"
                subtitle="كيف نبني واجهات تناسب المستثمر السعودي؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0D1137] rounded-3xl p-10 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">التعريب الكامل (RTL First)</h3>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            لا نكتفي بترجمة الواجهات، بل نصممها من اليمين لليسار منذ البداية. الأرقام، المخططات، واتجاه الحركة.. كل شيء مصمم للقارئ العربي.
                        </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm self-end w-3/4">
                        <div className="flex justify-between items-center mb-2">
                            <span>الراجحي</span>
                            <ArrowUpRight className="text-[#00E1C1]" />
                        </div>
                        <div className="h-2 bg-white/20 rounded-full w-full">
                            <div className="h-full bg-[#00E1C1] rounded-full w-2/3"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                    <PieChart className="text-[#00E1C1] mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4">وضوح الزكاة والضريبة</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        نبرز البيانات التي تهم المستثمر المحلي بشكل خاص، مثل نسبة التطهير للسهم، وموقف الشركة من الزكاة، للتسهيل على المستثمر الملتزم.
                    </p>
                    <div className="flex gap-2">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">نسبة التطهير: 0.5%</span>
                        <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">نقية</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
