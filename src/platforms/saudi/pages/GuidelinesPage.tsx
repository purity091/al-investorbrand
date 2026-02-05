import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Scale, Users, FileCheck } from 'lucide-react';

export const GuidelinesPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="البيئة التنظيمية | Regulatory Guidelines"
                subtitle="الامتثال لأنظمة هيئة السوق المالية (CMA)."
            />

            <div className="bg-[#0D1137] text-white rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Scale size={300} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-8">معايير المحتوى المالي في المملكة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <FileCheck className="text-[#00E1C1]" />
                                <h4 className="font-bold">الإفصاح والشفافية</h4>
                            </div>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                أي تحليل لسهم مدرج يجب أن يتضمن إفصاحاً عن ملكية المحلل فيه، وتوضيح أن الرأي لا يعد توصية ملزمة.
                            </p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="text-[#00E1C1]" />
                                <h4 className="font-bold">حماية المستثمر</h4>
                            </div>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                تجنب أي لغة ترويجية مبالغ فيها (مثل "السهم الذهبي" أو "فرصة التدبيلة")، والتركيز على التحليل الفني والمالي المجرد.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
