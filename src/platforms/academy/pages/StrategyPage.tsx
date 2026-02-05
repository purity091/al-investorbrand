import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Map, Footprints, Flag } from 'lucide-react';

export const StrategyPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="مسار التعلم | Learning Path"
                subtitle="من الصفر إلى الاحتراف: رحلة الطالب في الأكاديمية."
            />

            <div className="relative border-l-2 border-slate-200 ml-6 md:ml-10 space-y-12">
                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#00E1C1]"></div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-slate-100 text-[#0D1137] px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest">المرحلة 1</span>
                            <h3 className="text-xl font-bold text-[#0D1137]">التوعية (Awareness)</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            استهداف المبتدئين تماماً. المحتوى هنا مجاني، قصير، وجذاب بصرياً (Reels, TikToks) لكسر حاجز الخوف من المصطلحات المالية.
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-slate-50 px-2 py-1 rounded border border-slate-200">#ادخار</span>
                            <span className="text-[10px] bg-slate-50 px-2 py-1 rounded border border-slate-200">#ميزانية</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#0D1137]"></div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest">المرحلة 2</span>
                            <h3 className="text-xl font-bold text-[#0D1137]">التمكين (Empowerment)</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            دورات تأسيسية مكثفة (Bootcamps). يتعلم الطالب كيف يفتح محفظة، يقرأ القوائم المالية، ويحلل الشركات الأساسية.
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-slate-50 px-2 py-1 rounded border border-slate-200">#تحليل_أساسي</span>
                            <span className="text-[10px] bg-slate-50 px-2 py-1 rounded border border-slate-200">#محفظة</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#00E1C1] border-4 border-[#00E1C1]"></div>
                    <div className="bg-[#0D1137] p-8 rounded-3xl text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-white/10 text-white px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest">المرحلة 3</span>
                            <h3 className="text-xl font-bold">الإتقان (Mastery)</h3>
                        </div>
                        <p className="text-blue-100 mb-4">
                            برامج احترافية متقدمة (Derivatives, Algo Trading). شهادات معتمدة، وتوجيه مباشر من خبراء السوق (Mentorship).
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-white/10 px-2 py-1 rounded">#مشتقات</span>
                            <span className="text-[10px] bg-white/10 px-2 py-1 rounded">#خوارزميات</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
