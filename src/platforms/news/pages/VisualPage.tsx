import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Type, Layout, Image } from 'lucide-react';

export const VisualPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="هوية الصحيفة | Visual Journalism"
                subtitle="التصميم الكلاسيكي بروح عصرية."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Type size={20} className="text-red-600" /> الخطوط (Typography)
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Headlines</span>
                            <p className="text-3xl font-serif font-bold text-[#0D1137] mt-1 leading-tight">
                                خط "نسخ" عصري قوي يعكس الهيبة والجدية.
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Body Text</span>
                            <p className="text-lg text-slate-600 mt-1 leading-relaxed">
                                خط نصوص سهل القراءة (بسيط)، مع مسافات مريحة للعين لتشجيع القراءة الطويلة (Long-reads).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Layout size={20} className="text-red-600" /> الشبكة (Grid System)
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm">
                        نعتمد "الشبكة السويسرية" (Swiss Grid) في التصميم. تنظيم صارم للعناصر، مساحات بيضاء، وخطوط فاصلة دقيقة. لا فوضى، الخبر هو البطل.
                    </p>
                    <div className="grid grid-cols-12 gap-2 h-24 mt-4 opacity-50">
                        <div className="col-span-8 bg-[#0D1137] rounded"></div>
                        <div className="col-span-4 bg-slate-300 rounded"></div>
                        <div className="col-span-4 bg-slate-300 rounded"></div>
                        <div className="col-span-4 bg-slate-300 rounded"></div>
                        <div className="col-span-4 bg-slate-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
