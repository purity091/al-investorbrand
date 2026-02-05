import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Zap, Activity, AlertOctagon } from 'lucide-react';

export const MessagingPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="لغة الآلة | Machine Tone"
                subtitle="موضوعية، دقيقة، وخالية من العواطف."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <Zap className="text-[#0D1137] mb-4" size={24} />
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">مباشرة (Direct)</h3>
                    <p className="text-sm text-slate-600">
                        لا مقدمات ولا حشو. الخبر في العنوان مباشرة. "أرامكو توزع 0.30 ريال"، انتهى.
                    </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <Activity className="text-[#0D1137] mb-4" size={24} />
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">رقمية (Numeric)</h3>
                    <p className="text-sm text-slate-600">
                        الكلمات قد تحتمل التأويل، الأرقام لا تكذب. نفضل "ارتفع 5%" على "ارتفع بقوة".
                    </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <AlertOctagon className="text-[#0D1137] mb-4" size={24} />
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">محايدة (Neutral)</h3>
                    <p className="text-sm text-slate-600">
                        لا "نبشر" ولا "نحذر" بمعناس العاطفي. نحن نعطي الإشارة، وأنت تتخذ القرار.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm mt-8">
                <h3 className="font-bold text-[#0D1137] text-lg mb-6">مقارنة الصياغة (Tone Comparison)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">News Style (صحفي)</span>
                        <p className="text-slate-600 italic border-l-4 border-slate-200 pl-4 py-2">
                            "شهدت أسواق المال اليوم حالة من التفاؤل بعد صدور بيانات التضخم التي جاءت أفضل من المتوقع، مما دفع المؤشر للارتفاع."
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-[#00E1C1] uppercase tracking-widest mb-2 block">Radar Style (تقني)</span>
                        <p className="text-[#0D1137] font-mono border-l-4 border-[#00E1C1] pl-4 py-2">
                            "CPI Data: 3.2% (Forecast: 3.4%). TASI: +1.2%. Sector: Banks +2.1%."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
