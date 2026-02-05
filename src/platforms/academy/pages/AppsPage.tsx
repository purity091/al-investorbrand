import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Download, Tablet, Monitor } from 'lucide-react';

export const AppsPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تطبيقات التعلم | Learning Apps"
                subtitle="تعلم في أي وقت، حتى بدون إنترنت."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                    <Download className="mx-auto text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-lg mb-2">Offline Mode</h3>
                    <p className="text-sm text-slate-500">حمل الدروس وشاهدها في الطائرة أو السيارة.</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                    <Tablet className="mx-auto text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-lg mb-2">iPad Optimized</h3>
                    <p className="text-sm text-slate-500">دعم كامل للأجهزة اللوحية وتعدد المهام (Split View).</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                    <Monitor className="mx-auto text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-lg mb-2">AirPlay / Chromecast</h3>
                    <p className="text-sm text-slate-500">بث الدروس على شاشة التلفاز لتجربة صفية كاملة.</p>
                </div>
            </div>
        </div>
    );
};
