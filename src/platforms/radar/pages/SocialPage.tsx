import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export const SocialPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="بطاقات البيانات | Data Cards"
                subtitle="قوالب بصرية لعرض البيانات المعقدة ببساطة."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Bullish Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/3] bg-[#0D1137] rounded-2xl relative overflow-hidden p-6 flex flex-col justify-center items-center border border-slate-200">
                        <TrendingUp className="text-[#00E1C1] mb-2 w-16 h-16" />
                        <h2 className="text-4xl font-black text-white">+5.2%</h2>
                        <span className="text-blue-200 mt-2 font-mono">SAUDI ARAMCO</span>
                        <div className="absolute bottom-0 w-full h-1 bg-[#00E1C1]"></div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">القالب الإيجابي (Bullish)</h4>
                        <p className="text-xs text-slate-500">للأسهم المرتفعة.</p>
                    </div>
                </div>

                {/* Bearish Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/3] bg-white rounded-2xl relative overflow-hidden p-6 flex flex-col justify-center items-center border border-slate-200 shadow-sm">
                        <TrendingDown className="text-[#EF4444] mb-2 w-16 h-16" />
                        <h2 className="text-4xl font-black text-[#0D1137]">-3.8%</h2>
                        <span className="text-slate-500 mt-2 font-mono">TESLA INC</span>
                        <div className="absolute bottom-0 w-full h-1 bg-[#EF4444]"></div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">القالب السلبي (Bearish)</h4>
                        <p className="text-xs text-slate-500">للأسهم الهابطة.</p>
                    </div>
                </div>

                {/* Signal Template */}
                <div className="space-y-4">
                    <div className="aspect-[4/3] bg-slate-50 rounded-2xl relative overflow-hidden p-6 flex flex-col items-center justify-center border border-dashed border-slate-300">
                        <div className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-1">
                            <AlertCircle size={12} /> إشارة فنية
                        </div>
                        <h3 className="text-xl font-bold text-[#0D1137]">تقاطع ذهبي</h3>
                        <p className="text-slate-500 text-sm mt-1">Golden Cross</p>
                        <p className="text-xs text-slate-400 mt-2 font-mono">MA(50) {'>'} MA(200)</p>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-[#0D1137]">بطاقة الإشارات</h4>
                        <p className="text-xs text-slate-500">للتحليلات الفنية الآلية.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
