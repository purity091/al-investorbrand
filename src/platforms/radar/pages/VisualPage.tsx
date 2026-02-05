import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Palette, Moon, Layout } from 'lucide-react';

export const VisualPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="لغة البيانات البصرية | Data Visuals"
                subtitle="الجمال في الدقة التقنية."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-[#0D1137] p-10 rounded-3xl text-white">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                        <Moon size={20} className="text-[#00E1C1]" /> الوضع المظلم (Dark Mode)
                    </h3>
                    <p className="text-blue-200 mb-6 text-sm leading-relaxed">
                        الوضع الافتراضي لمنصة رادار. لماذا؟ لأن المتداولين يحدقون في الشاشات لساعات طويلة. الخلفيات الداكنة تقلل من إجهاد العين وتجعل "الألوان المضيئة" (الأخضر والأحمر) تبرز بوضوح أكبر.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="h-12 bg-[#1F2937] rounded-lg border border-[#374151]"></div>
                        <div className="h-12 bg-[#111827] rounded-lg border border-[#374151]"></div>
                        <div className="h-12 bg-black rounded-lg border border-[#374151]"></div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Palette size={20} className="text-[#0D1137]" /> ألوان الإشارة (Signal Colors)
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        نستخدم ألواناً نيونية (Neon) عالية التباين لضمان عدم تفويت أي إشارة.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-bold text-[#0D1137]">صعود قوي</span>
                            <div className="w-16 h-4 bg-[#10B981] rounded shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-bold text-[#0D1137]">هبوط حاد</span>
                            <div className="w-16 h-4 bg-[#EF4444] rounded shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-bold text-[#0D1137]">تنبيه / تحذير</span>
                            <div className="w-16 h-4 bg-[#F59E0B] rounded shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
