import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Eye, ShieldCheck, Zap, Lock } from 'lucide-react';

export const CorePage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="القيم الجوهرية | Core Values"
                subtitle="الحقيقة تكمن في البيانات."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform">
                    <Eye className="text-[#00E1C1] mx-auto mb-4" size={32} />
                    <h3 className="font-bold text-white mb-2">الشفافية (Transparency)</h3>
                    <p className="text-xs text-slate-400">لا نخفي البيانات السيئة. نمنحك الصورة الكاملة، كما هي.</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform">
                    <Zap className="text-[#F59E0B] mx-auto mb-4" size={32} />
                    <h3 className="font-bold text-white mb-2">السرعة (Speed)</h3>
                    <p className="text-xs text-slate-400">في الأسواق، الثانية تساوي مالاً. أنظمتنا مصممة للتحديث اللحظي.</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform">
                    <ShieldCheck className="text-[#3B82F6] mx-auto mb-4" size={32} />
                    <h3 className="font-bold text-white mb-2">الدقة (Precision)</h3>
                    <p className="text-xs text-slate-400">بيانات مدققة ومراجعة. لا مجال للخطأ الحسابي.</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform">
                    <Lock className="text-[#EF4444] mx-auto mb-4" size={32} />
                    <h3 className="font-bold text-white mb-2">الخصوصية (Privacy)</h3>
                    <p className="text-xs text-slate-400">بياناتك المالية واستراتيجياتك هي سرك الخاص.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4">لماذا "رادار"؟</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        المستثمر الذكي لا يخمن، بل يحلل. نحن نوفر الأدوات التي تحول ضجيج السوق إلى إشارات واضحة لاتخاذ القرار. نحن عينُك التي لا تنام في السوق.
                    </p>
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-[#00E1C1] flex items-center justify-center relative animate-pulse">
                    <div className="w-24 h-24 bg-[#0D1137] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">RADAR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
