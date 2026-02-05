import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Laptop, PlayCircle, Trophy, BarChart } from 'lucide-react';

export const DigitalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="نظام إدارة التعلم | LMS Experience"
                subtitle="تجربة تعليمية مصممة للتركيز والإنجاز."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0D1137] text-white p-10 rounded-3xl">
                    <Laptop className="text-[#00E1C1] mb-6" size={40} />
                    <h3 className="text-2xl font-bold mb-4">واجهة المشغل (Player UI)</h3>
                    <p className="text-blue-100 leading-relaxed mb-6">
                        تصميم خالٍ من المشتتات. الفيديو يحتل المركز، مع إمكانية تدوين الملاحظات المتزامنة (Time-synced Notes) مباشرة على الشاشة.
                    </p>
                    <div className="flex gap-2">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">Dark Mode</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">Focus Mode</span>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <Trophy className="text-[#F59E0B] mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4">التلعيب (Gamification)</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        نحول التعلم إلى رحلة ممتعة. نقاط خبرة (XP)، مستويات (Levels)، وشارات (Badges) عند إتمام المهام.
                    </p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="w-2/3 bg-[#F59E0B] h-full rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-slate-100">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0D1137] mb-4">لوحة القيادة الشخصية (Student Dashboard)</h3>
                    <p className="text-slate-600 mb-4">
                        نظرة شاملة على تقدمك. استكمل من حيث توقفت، وراجع إحصائيات تعلمك الأسبوعية.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2"><PlayCircle size={16} /> متابعة آخر درس</li>
                        <li className="flex items-center gap-2"><BarChart size={16} /> تحليل ساعات الدراسة</li>
                    </ul>
                </div>
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-[#0D1137]">دورة الأسهم</span>
                            <span className="text-[#00E1C1]">75%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full">
                            <div className="w-3/4 bg-[#00E1C1] h-full rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-[#0D1137]">المحاسبة المالية</span>
                            <span className="text-[#00E1C1]">30%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full">
                            <div className="w-1/3 bg-[#00E1C1] h-full rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
