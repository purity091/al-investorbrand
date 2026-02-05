import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Building2, Landmark, Map } from 'lucide-react';

export const RegionalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="جغرافية الاستثمار | Investment Map"
                subtitle="الفرص الاستثمارية حسب مناطق المملكة."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <Map className="absolute top-4 right-4 text-slate-100 -z-0" size={150} />
                    <h3 className="text-xl font-bold text-[#0D1137] mb-6 relative z-10 flex items-center gap-2">
                        <Building2 className="text-[#00E1C1]" /> المنطقة الوسطى (الرياض)
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 relative z-10">
                        عاصمة المال والأعمال ومقر المقرات الإقليمية (Regional HQs).
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 relative z-10">
                        <li>• قطاع التقنية المالية (Fintech)</li>
                        <li>• الخدمات اللوجستية</li>
                        <li>• العقار ومشاريع الإسكان</li>
                    </ul>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <Map className="absolute top-4 right-4 text-slate-100 -z-0" size={150} />
                    <h3 className="text-xl font-bold text-[#0D1137] mb-6 relative z-10 flex items-center gap-2">
                        <Landmark className="text-[#00E1C1]" /> المنطقة الغربية (مكة/جدة)
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 relative z-10">
                        بوابة الحرمين والسياحة والتجارة البحرية.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 relative z-10">
                        <li>• قطاع الحج والعمرة</li>
                        <li>• السياحة والضيافة</li>
                        <li>• النقل والخدمات اللوجستية (ميناء جدة)</li>
                    </ul>
                </div>

                <div className="col-span-1 lg:col-span-2 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-[#0D1137] mb-2">نيوم والشمال (The Future)</h3>
                    <p className="text-sm text-slate-600">
                        تركيز هائل على الطاقة المتجددة، الهيدروجين الأخضر، والتقنيات المستقبلية.
                    </p>
                </div>
            </div>
        </div>
    );
};
