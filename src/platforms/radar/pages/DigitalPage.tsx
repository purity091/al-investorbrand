import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Monitor, MousePointer, LayoutDashboard } from 'lucide-react';

export const DigitalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="بيئة العمل الاحترافية | Trading Terminal"
                subtitle="واجهة مستخدم مصممة لاستيعاب مئات البيانات في شاشة واحدة."
            />

            <div className="bg-[#0D1137] rounded-3xl p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <LayoutDashboard size={200} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">فلسفة التصميم (Dashboard UX)</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 bg-[#00E1C1] rounded-lg flex items-center justify-center text-[#0D1137] font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-[#00E1C1]">كثافة عالية (High Density)</h4>
                                    <p className="text-sm text-blue-200 mt-1">تقليل المساحات البيضاء لزيادة كمية المعلومات المعروضة دون فوضى.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-[#00E1C1]">التباين اللوني (High Contrast)</h4>
                                    <p className="text-sm text-blue-200 mt-1">خلفيات داكنة مع ألوان ساطعة (أخضر/أحمر) لتمييز حالة السوق فوراً.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-[#00E1C1]">التخصيص (Customization)</h4>
                                    <p className="text-sm text-blue-200 mt-1">نظام "ويدجت" (Widget System) يسمح للمستخدم ببناء شاشته الخاصة.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <span className="text-xs font-mono text-slate-400">MARKET WATCH</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="space-y-2 font-mono text-sm">
                            <div className="flex justify-between">
                                <span>AAPL</span>
                                <span className="text-green-400">175.40 ▲</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GOOGL</span>
                                <span className="text-red-400">138.20 ▼</span>
                            </div>
                            <div className="flex justify-between">
                                <span>TSLA</span>
                                <span className="text-green-400">240.50 ▲</span>
                            </div>
                            <div className="flex justify-between">
                                <span>AMZN</span>
                                <span className="text-slate-400">128.90 -</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
