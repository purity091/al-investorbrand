import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Layout, PenTool, MousePointer } from 'lucide-react';

export const DigitalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="أدوات بناء المشاريع | Project Builder UX"
                subtitle="كيف نصمم أدوات تساعدك على الإنجاز؟"
            />

            <div className="bg-[#0D1137] rounded-3xl p-12 text-white text-center">
                <h3 className="text-2xl font-bold mb-8">فلسفة "الخطوة بخطوة" (Wizard Interface)</h3>
                <div className="flex justify-center items-center gap-4 md:gap-8">
                    <div className="flex flex-col items-center opacity-50">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold mb-2">1</div>
                        <span className="text-xs">الفكرة</span>
                    </div>
                    <div className="h-1 w-16 bg-white/20"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-[#00E1C1] text-[#0D1137] shadow-[0_0_30px_rgba(0,225,193,0.4)] flex items-center justify-center font-bold text-xl mb-2">2</div>
                        <span className="text-sm font-bold text-[#00E1C1]">التخطيط</span>
                    </div>
                    <div className="h-1 w-16 bg-white/20"></div>
                    <div className="flex flex-col items-center opacity-50">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold mb-2">3</div>
                        <span className="text-xs">التنفيذ</span>
                    </div>
                </div>
                <p className="mt-8 max-w-xl mx-auto text-blue-100">
                    نقسم المهام الكبيرة والمعقدة (مثل كتابة خطة عمل) إلى خطوات صغيرة، بسيطة، وقابلة للتنفيذ لتجنب شعور الرواد بالإحباط.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Layout className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#0D1137] text-lg">قوالب السحب والإفلات (Drag & Drop)</h4>
                        <p className="text-slate-600 text-sm mt-2">
                            لبناء نموذج العمل التجاري (Business Model Canvas) بسهولة دون الحاجة لمهارات تصميم.
                        </p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <PenTool className="text-[#0D1137]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#0D1137] text-lg">المحرر الذكي (Smart Editor)</h4>
                        <p className="text-slate-600 text-sm mt-2">
                            محرر نصوص يقترح عليك الصياغة المناسبة للمستثمرين أثناء كتابتك للعرض التقديمي (Pitch Deck).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
