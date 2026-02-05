import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Filter, Bell, LineChart, Globe } from 'lucide-react';

export const EcosystemPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="أدوات الرادار | Radar Tools"
                subtitle="ترسانة المتداول التقنية."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 group hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00E1C1] transition-colors">
                        <Filter size={28} className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">الماسح الضوئي (Market Screener)</h3>
                        <p className="text-sm text-slate-600">
                            فلترة آلاف الشركات في ثوانٍ. (أعطني الشركات التي مكرر ربحيتها أقل من 15 وتوزع أرباحاً).
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 group hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00E1C1] transition-colors">
                        <Bell size={28} className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">نظام التنبيهات (Alert System)</h3>
                        <p className="text-sm text-slate-600">
                            تنبيهات شرطية معقدة. (إذا كسر الراجحي سعر 70 وارتفعت السيولة 20%، أرسل لي رسالة).
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 group hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00E1C1] transition-colors">
                        <LineChart size={28} className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">الرسوم البيانية (Charting)</h3>
                        <p className="text-sm text-slate-600">
                            شارتات احترافية تدعم مئات المؤشرات الفنية (RSI, MACD, Bollinger Bands).
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 group hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00E1C1] transition-colors">
                        <Globe size={28} className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">الخريطة الحرارية (Heatmap)</h3>
                        <p className="text-sm text-slate-600">
                            نظرة جوية للسوق بأكمله. تعرف على القطاعات المشتعلة والقطاعات الباردة بلمحة واحدة.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
