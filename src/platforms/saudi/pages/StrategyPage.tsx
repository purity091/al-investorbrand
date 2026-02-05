import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Users, Compass, Crosshair } from 'lucide-react';

export const StrategyPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="الاستراتيجية | Strategy"
                subtitle="لمن نتوجه؟ وكيف نصل إليهم؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Users className="text-[#00E1C1]" /> الجمهور المستهدف
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-[#0D1137] mb-2">المواطن المستثمر</h4>
                            <p className="text-sm text-slate-600">
                                الموظف الذي يطمح لتنمية مدخراته عبر سوق الأسهم أو العقار، ويبحث عن التوجيه الآمن.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-[#0D1137] mb-2">المستثمر الأجنبي</h4>
                            <p className="text-sm text-slate-600">
                                المؤسسات والأفراد المهتمين بالدخول للسوق السعودي المتنامي (FDI).
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Compass className="text-[#00E1C1]" /> التموضع (Positioning)
                    </h3>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full">
                        <p className="text-lg font-serif text-[#0D1137] leading-loose italic text-center my-auto">
                            "المستثمر سعودية ليس مجرد موقع أخبار، بل هو **الشريك المحلي** الذي يمسك بيدك لفهم تحولات الاقتصاد السعودي."
                        </p>
                        <div className="flex justify-center mt-6 gap-2">
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">محلي</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">موثوق</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">متعمق</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
