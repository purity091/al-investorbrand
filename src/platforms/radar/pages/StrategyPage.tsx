import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';

export const StrategyPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="نموذج العمل | Business Strategy"
                subtitle="كيف نقدم قيمة للمتداولين المحترفين؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Free Tier */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm opacity-60">
                    <h3 className="text-xl font-bold text-[#0D1137] mb-2">Baisc (Free)</h3>
                    <p className="text-sm text-slate-500 mb-6">للمتابعة العامة.</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex gap-2 text-slate-400">✓ أسعار متأخرة 15 دقيقة</li>
                        <li className="flex gap-2 text-slate-400">✓ قائمة متابعة واحدة</li>
                        <li className="flex gap-2 text-slate-400">✓ أخبار عامة</li>
                    </ul>
                </div>

                {/* Pro Tier (Focus) */}
                <div className="bg-[#0D1137] p-8 rounded-3xl text-white shadow-xl relative scale-105 z-10">
                    <div className="absolute top-0 right-0 bg-[#00E1C1] text-[#0D1137] text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                    <h3 className="text-xl font-bold text-[#00E1C1] mb-2">Pro Trader</h3>
                    <p className="text-sm text-blue-200 mb-6">للمتداول اليومي (Day Trader).</p>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-2 text-white font-bold">✓ أسعار فورية (Real-time)</li>
                        <li className="flex gap-2 text-white">✓ عمق السوق (Level 2 Data)</li>
                        <li className="flex gap-2 text-white">✓ ماسح فني متقدم (Advanced Screener)</li>
                        <li className="flex gap-2 text-white">✓ تنبيهات غير محدودة</li>
                    </ul>
                </div>

                {/* Enterprise Tier */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0D1137] mb-2">Institutional</h3>
                    <p className="text-sm text-slate-500 mb-6">للمحافظ والصناديق.</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex gap-2 text-slate-800">✓ API Access</li>
                        <li className="flex gap-2 text-slate-800">✓ مدراء حسابات مخصصين</li>
                        <li className="flex gap-2 text-slate-800">✓ تقارير ملكية خاصة (Proprietary Reports)</li>
                    </ul>
                </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-emerald-900 mb-1">استراتيجية البيانات</h4>
                    <p className="text-sm text-emerald-700">نعتمد على عقود مباشرة مع البورصات لضمان عدم وجود وسطاء يؤخرون البيانات.</p>
                </div>
                <BarChart2 className="text-emerald-500 opacity-50" size={48} />
            </div>
        </div>
    );
};
