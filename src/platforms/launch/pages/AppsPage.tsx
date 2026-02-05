import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Zap, Briefcase, FileText } from 'lucide-react';

export const AppsPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تطبيقات الإنتاجية | Productivity Apps"
                subtitle="مكتبك الرقمي لإدارة المشروع."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <Briefcase className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">Launchpad</h3>
                    <p className="text-slate-600 text-sm">لوحة تحكم مركزية لمتابعة تقدم المشروع في كل المراحل.</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <Zap className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">Pitch Builder</h3>
                    <p className="text-slate-600 text-sm">أداة لبناء العروض التقديمية الاستثمارية بناءً على أفضل الممارسات العالمية.</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <FileText className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">Legal Docs</h3>
                    <p className="text-slate-600 text-sm">مولد عقود تلقائي (اتفاقية الشركاء، عقود التوظيف، NDA).</p>
                </div>
            </div>
        </div>
    );
};
