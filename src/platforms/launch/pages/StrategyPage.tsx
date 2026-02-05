import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { GitMerge, Users, Zap } from 'lucide-react';

export const StrategyPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="رحلة المؤسس | Founder Journey"
                subtitle="كيف نرافقك من الفكرة إلى التخارج؟"
            />

            <div className="relative border-l-2 border-dashed border-slate-300 ml-6 md:ml-10 space-y-16 py-8">
                <div className="relative pl-12">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-white border-4 border-slate-300 rounded-full"></div>
                    <div>
                        <h3 className="text-xl font-bold text-[#0D1137] mb-2 flex items-center gap-2">
                            <span className="bg-slate-100 px-2 py-1 rounded text-xs">مرحلة 1</span>
                            الفكرة والتحقق (Ideation & Validation)
                        </h3>
                        <p className="text-slate-600 mb-4 max-w-2xl">
                            نساعدك في اختبار فرضياتك. هل هناك سوق لمنتجك؟ كيف تنشئ صفحة هبوط (Landing Page) وتجمع المهتمين الأوائل؟
                        </p>
                    </div>
                </div>

                <div className="relative pl-12">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-white border-4 border-[#00E1C1] rounded-full"></div>
                    <div>
                        <h3 className="text-xl font-bold text-[#0D1137] mb-2 flex items-center gap-2">
                            <span className="bg-[#E6FFFA] text-[#00E1C1] px-2 py-1 rounded text-xs">مرحلة 2</span>
                            البناء والإطلاق (Build & Launch)
                        </h3>
                        <p className="text-slate-600 mb-4 max-w-2xl">
                            أدوات الـ No-Code لبناء نموذج أولي (MVP) سريعاً. تجهيز الملفات القانونية، وبدء المبيعات الأولى.
                        </p>
                    </div>
                </div>

                <div className="relative pl-12">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-white border-4 border-[#0D1137] rounded-full"></div>
                    <div>
                        <h3 className="text-xl font-bold text-[#0D1137] mb-2 flex items-center gap-2">
                            <span className="bg-[#E2E8F0] text-[#0D1137] px-2 py-1 rounded text-xs">مرحلة 3</span>
                            النمو والتمويل (Growth & Scale)
                        </h3>
                        <p className="text-slate-600 mb-4 max-w-2xl">
                            تجهيز ملف الاستثمار (Investment Deck)، الوصول للمستثمرين الملائكيين (Angels)، وتوسيع الفريق.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <GitMerge className="mx-auto mb-2 text-[#0D1137]" />
                    <h4 className="font-bold">Lean Startup</h4>
                    <p className="text-xs text-slate-500">منهجيتنا الأساسية.</p>
                </div>
                <div>
                    <Users className="mx-auto mb-2 text-[#0D1137]" />
                    <h4 className="font-bold">Community First</h4>
                    <p className="text-xs text-slate-500">ابنِ الجمهور قبل المنتج.</p>
                </div>
                <div>
                    <Zap className="mx-auto mb-2 text-[#0D1137]" />
                    <h4 className="font-bold">Fail Fast</h4>
                    <p className="text-xs text-slate-500">افشل سريعاً، تعلم أسرع.</p>
                </div>
            </div>
        </div>
    );
};
