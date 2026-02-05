import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { MessageSquare, Mic2 } from 'lucide-react';

export const MessagingPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="نبرة الصوت | Tone of Voice"
                subtitle="كيف نتحدث؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#00E1C1]">
                    <h3 className="font-bold text-lg text-[#0D1137] mb-4">طموحة (Ambitious)</h3>
                    <p className="text-sm text-slate-600">
                        لغتنا تعكس روح التغيير والحماس في المملكة. نستخدم مفردات مثل "مستقبل"، "ريادة"، "انطلاق"، "فرص".
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#00E1C1]">
                    <h3 className="font-bold text-lg text-[#0D1137] mb-4">واثقة (Confident)</h3>
                    <p className="text-sm text-slate-600">
                        نتحدث بلغة الأرقام والحقائق. لا نتردد في قول الحقيقة، ونعتز بإنجازاتنا الوطنية دون مبالغة.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#00E1C1]">
                    <h3 className="font-bold text-lg text-[#0D1137] mb-4">مرحبّة (Welcoming)</h3>
                    <p className="text-sm text-slate-600">
                        نخاطب العالم بأسره. لغتنا العربية فصيحة لكنها سلسة (بيضاء)، ولغتنا الإنجليزية احترافية وعالمية.
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 mt-8">
                <h3 className="font-bold text-[#0D1137] text-lg mb-6 flex items-center gap-2">
                    <MessageSquare size={20} /> أمثلة تطبيقية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">لا تقل</span>
                        <p className="mt-2 text-slate-500 line-through">
                            "السوق السعودي انهار اليوم وخسر المتداولون أموالهم."
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">قل (نبرتنا)</span>
                        <p className="mt-2 text-[#0D1137] font-medium">
                            "المؤشر العام يشهد حركة تصحيحية، مما يخلق نقاط دخول جديدة للمستثمرين على المدى الطويل."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
