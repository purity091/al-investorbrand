import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Tablet, Laptop, Watch } from 'lucide-react';

export const AppsPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="منصات الرادار | Radar Platforms"
                subtitle="تواجد أينما تكون الفرصة."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex flex-col items-center">
                    <Laptop className="text-[#0D1137] mb-6" size={48} />
                    <h3 className="font-bold text-lg text-[#0D1137]">Desktop Pro</h3>
                    <p className="text-sm text-slate-500 mt-2">القوة الكاملة للتحليل.</p>
                </div>
                <div className="flex flex-col items-center border-x border-slate-100 px-8">
                    <Tablet className="text-[#0D1137] mb-6" size={48} />
                    <h3 className="font-bold text-lg text-[#0D1137]">Tablet View</h3>
                    <p className="text-sm text-slate-500 mt-2">للمتابعة أثناء الاجتماعات.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Watch className="text-[#0D1137] mb-6" size={48} />
                    <h3 className="font-bold text-lg text-[#0D1137]">Watch OS</h3>
                    <p className="text-sm text-slate-500 mt-2">تنبيهات فورية على معصمك.</p>
                </div>
            </div>
        </div>
    );
};
