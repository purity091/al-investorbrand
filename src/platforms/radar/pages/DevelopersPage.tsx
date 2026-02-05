import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Cpu, Activity, Zap } from 'lucide-react';

export const DevelopersPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="المحرك التقني | Technical Engine"
                subtitle="كيف نعالج ملايين البيانات في أجزاء من الثانية؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
                    <Zap className="text-[#F9EB48] mb-6" size={40} />
                    <h3 className="font-bold text-[#0D1137] mb-2">WebSockets</h3>
                    <p className="text-sm text-slate-600">اتصال ثنائي الاتجاه (Bi-directional) لضمان وصول تحديثات الأسعار دون الحاجة لتحديث الصفحة.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
                    <Cpu className="text-[#00E1C1] mb-6" size={40} />
                    <h3 className="font-bold text-[#0D1137] mb-2">Edge Computing</h3>
                    <p className="text-sm text-slate-600">معالجة البيانات في خوادم قريبة جغرافياً من المستخدم لتقليل الـ Latency إلى أدنى حد.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:translate-y-[-5px] transition-transform">
                    <Activity className="text-[#0D1137] mb-6" size={40} />
                    <h3 className="font-bold text-[#0D1137] mb-2">Time-Series DB</h3>
                    <p className="text-sm text-slate-600">استخدام قواعد بيانات متخصصة (مثل InfluxDB) لتخزين واسترجاع تاريخ الأسعار بكفاءة.</p>
                </div>
            </div>
        </div>
    );
};
