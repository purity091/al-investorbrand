import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Palette, Zap, Type } from 'lucide-react';

export const VisualPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="هوية مرنة | Agile Identity"
                subtitle="تصميم يعكس الحركة والسرعة."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-bold text-[#0D1137] mb-6 text-lg">الألوان الحيوية (Vibrant Palette)</h3>
                    <p className="text-slate-600 mb-6 text-sm">
                        نستخدم ألواناً مفعمة بالطاقة لتعكس روح الابتكار والشباب. نمزج الكحلي الرصين مع تدرجات مشرقة.
                    </p>
                    <div className="space-y-4">
                        <div className="h-16 rounded-xl bg-gradient-to-r from-[#0D1137] to-[#1a237e] flex items-center px-6 text-white text-xs font-bold shadow-lg">Trust Base (Navy)</div>
                        <div className="h-16 rounded-xl bg-gradient-to-r from-[#00E1C1] to-[#2DD4BF] flex items-center px-6 text-[#0D1137] text-xs font-bold shadow-lg">Growth & Energy (Teal)</div>
                        <div className="h-16 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] flex items-center px-6 text-[#0D1137] text-xs font-bold shadow-lg">Ideas (Amber)</div>
                    </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Zap size={20} /> العناصر البصرية (Motifs)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-4 text-center">
                            <div>
                                <span className="text-4xl">🚀</span>
                                <p className="text-xs font-bold mt-2 text-slate-600">صور انطلاق</p>
                            </div>
                        </div>
                        <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-4 text-center">
                            <div>
                                <span className="text-4xl">🧩</span>
                                <p className="text-xs font-bold mt-2 text-slate-600">قطع تركيب</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        نستعير استعارات بصرية (Visual Metaphors) مثل التركيب، البناء، والصعود للفضاء للتعبير عن مراحل نمو الشركة.
                    </p>
                </div>
            </div>
        </div>
    );
};
