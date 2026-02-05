import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Palette, image } from 'lucide-react';

export const VisualPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="الهوية البصرية | Visual Identity"
                subtitle="ألواننا مستوحاة من طبيعة وراية المملكة."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-bold text-[#0D1137] text-lg mb-6">لوحة الألوان (Color Palette)</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-[#006C35] shadow-sm"></div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">أخضر العلم (Saudi Green)</h4>
                                <p className="text-xs text-slate-500 font-mono">#006C35</p>
                                <p className="text-sm text-slate-600 mt-1">اللون الأساسي، يرمز للنمو والرخاء.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-[#CBB588] shadow-sm"></div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">ذهبي الرمال (Desert Gold)</h4>
                                <p className="text-xs text-slate-500 font-mono">#CBB588</p>
                                <p className="text-sm text-slate-600 mt-1">للفخامة والأصالة والتراث.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-[#0D1137] shadow-sm"></div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">كحلي عميق (Deep Navy)</h4>
                                <p className="text-xs text-slate-500 font-mono">#0D1137</p>
                                <p className="text-sm text-slate-600 mt-1">للثقة والمهنية (اللون المشترك للمنصة الأم).</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] text-lg mb-6 flex items-center gap-2">
                        <Palette size={20} /> اتجاه التصوير (Photography)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1548115694-1da7545b7f2f?q=80&w=1956&auto=format&fit=crop" className="opacity-80 w-full h-full object-cover" alt="Saudi Architecture" />
                            <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-[10px] font-bold">عمارة حديثة</div>
                        </div>
                        <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1594970977226-c56783c55122?q=80&w=2070&auto=format&fit=crop" className="opacity-80 w-full h-full object-cover" alt="Saudi Professionals" />
                            <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-[10px] font-bold">كوادر وطنية</div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-4">
                        نستخدم صوراً تظهر شباباً وشابات سعوديين في بيئات عمل احترافية، ومباني أيقونية من الرياض وجدة.
                    </p>
                </div>
            </div>
        </div>
    );
};
