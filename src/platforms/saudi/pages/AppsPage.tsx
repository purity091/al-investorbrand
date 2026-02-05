import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Smartphone, Wallet, FileText } from 'lucide-react';

export const AppsPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تطبيقات المستثمر السعودي | Local Apps"
                subtitle="خدمات مخصصة للسوق المحلي."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Wallet className="text-[#0D1137]" size={28} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">حاسبة الزكاة</h3>
                    <p className="text-sm text-slate-500">
                        أداة مجانية تحسب زكاة الأسهم تلقائياً بناءً على محفظتك والقوائم المالية للشركات.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="text-[#0D1137]" size={28} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">دليل الاكتتابات</h3>
                    <p className="text-sm text-slate-500">
                        تطبيق متخصص يتابع نشرات الإصدار، وتخصيص الأسهم، وتواريخ الإدراج.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Smartphone className="text-[#0D1137]" size={28} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">أخبار تاسي</h3>
                    <p className="text-sm text-slate-500">
                        مجمّع أخبار (Aggregator) يجمع أخبار السوق السعودي من أرقام، تداول، والصحف المحلية في مكان واحد.
                    </p>
                </div>
            </div>
        </div>
    );
};
