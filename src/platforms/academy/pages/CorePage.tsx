import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Target, Lightbulb, GraduationCap, Shield } from 'lucide-react';

export const CorePage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="القيم الجوهرية | Core Values"
                subtitle="التعليم هو الاستثمار الوحيد الذي لا يخسر."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 group-hover:bg-blue-100 transition-colors"></div>
                    <Target className="text-[#0D1137] mb-6 relative z-10" size={40} />
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4 relative z-10">المهمة (Mission)</h3>
                    <p className="text-slate-600 leading-relaxed relative z-10">
                        دمقرطة المعرفة المالية. نؤمن أن وعي الاستثمار حق للجميع، وليس حكراً على الخبراء والمؤسسات.
                    </p>
                </div>

                <div className="bg-[#0D1137] p-10 rounded-3xl text-white relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0 group-hover:bg-white/10 transition-colors"></div>
                    <Lightbulb className="text-[#00E1C1] mb-6 relative z-10" size={40} />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">الرؤية (Vision)</h3>
                    <p className="text-blue-100 leading-relaxed relative z-10">
                        أن نخرج جيلاً عربياً قادراً على تحقيق استقلاله المالي بذكاء ومسؤولية.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center">
                    <GraduationCap className="mb-4 text-[#00E1C1]" size={32} />
                    <h4 className="font-bold text-[#0D1137] mb-2">التعليم المستمر</h4>
                    <p className="text-xs text-slate-500">الأسواق تتغير، ونحن نتعلم كل يوم.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center">
                    <Shield className="mb-4 text-[#00E1C1]" size={32} />
                    <h4 className="font-bold text-[#0D1137] mb-2">الأمانة العلمية</h4>
                    <p className="text-xs text-slate-500">لا نبيع أوهام الثراء السريع.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center">
                    <Users className="mb-4 text-[#00E1C1]" size={32} />
                    <h4 className="font-bold text-[#0D1137] mb-2">المجتمع الداعم</h4>
                    <p className="text-xs text-slate-500">نتعلم معاً وننمو معاً.</p>
                </div>
            </div>
        </div>
    );
};

// Start Icon Mock
const Users = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
