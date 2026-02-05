import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export const GuidelinesPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="أخلاقيات ريادة الأعمال | Entrepreneurship Ethics"
                subtitle="ما نشجعه وما نحذر منه في مجتمعنا."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
                    <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                        <ThumbsUp /> ممارسات نشجعها
                    </h3>
                    <ul className="space-y-4">
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-emerald-800 font-medium">الشفافية الكاملة مع الشركاء والمستثمرين.</li>
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-emerald-800 font-medium">بناء منتج يحل مشكلة حقيقية، لا مجرد "ترند".</li>
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-emerald-800 font-medium">الاهتمام بصحة المؤسس النفسية وفريق العمل.</li>
                    </ul>
                </div>

                <div className="bg-rose-50 rounded-3xl p-10 border border-rose-100">
                    <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                        <ThumbsDown /> ممارسات نرفضها
                    </h3>
                    <ul className="space-y-4">
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-rose-800 font-medium">المبالغة في الأرقام والتوقعات (Hype) لخداع المستثمرين.</li>
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-rose-800 font-medium">سرقة أفكار أو جهود الآخرين ونسبتها للنفس.</li>
                        <li className="bg-white p-4 rounded-xl shadow-sm text-sm text-rose-800 font-medium">التنازل عن الجودة من أجل السرعة في الإطلاق.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
