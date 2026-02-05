import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Rss, Radio, TrendingUp, Newspaper } from 'lucide-react';

export const StrategyPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="غرفة الأخبار | Newsroom Strategy"
                subtitle="كيف نغطي الأسواق على مدار الساعة؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* The Wire */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <Rss className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">الشريط العاجل (The Wire)</h3>
                    <p className="text-sm text-slate-600 mb-6">
                        فريق متخصص يراقب إفصاحات الشركات والقرارات الحكومية لحظة بلحظة لبثها كعناوين عاجلة (Flash News).
                    </p>
                    <div className="text-xs font-mono text-slate-400 border-t border-slate-50 pt-4">
                        Target Latency: &lt; 30s form source
                    </div>
                </div>

                {/* Deep Dive */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#00E1C1] transition-colors">
                    <Newspaper className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">ما وراء الخبر (Deep Dive)</h3>
                    <p className="text-sm text-slate-600 mb-6">
                        بينما يركز الجميع على "ماذا حدث"، نركز نحن على "لماذا حدث؟" و "ماذا بعد؟". تقارير مطولة تشرح التداعيات.
                    </p>
                    <div className="text-xs font-mono text-slate-400 border-t border-slate-50 pt-4">
                        Format: Long-form / Explainer
                    </div>
                </div>

                {/* Visual Stories */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <TrendingUp className="text-[#0D1137] mb-6" size={32} />
                    <h3 className="font-bold text-xl text-[#0D1137] mb-2">القصة البصرية (Visuals)</h3>
                    <p className="text-sm text-slate-600 mb-6">
                        تحويل البيانات المالية الجامدة إلى قصص بصرية (Infographics) سهلة الفهم والمشاركة عبر التواصل الاجتماعي.
                    </p>
                    <div className="text-xs font-mono text-slate-400 border-t border-slate-50 pt-4">
                        Platforms: Instagram / LinkedIn
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="font-bold text-[#0D1137] mb-1 flex items-center gap-2">
                        <Radio size={16} className="text-red-500" /> البث الموحد (Syndication)
                    </h4>
                    <p className="text-sm text-slate-600">شبكة مراسلين في عواصم المال العربية (الرياض، دبي، القاهرة) لضمان تغطية ميدانية.</p>
                </div>
                <div className="flex -space-x-4">
                    <img className="w-10 h-10 rounded-full border-2 border-white grayscale" src="https://i.pravatar.cc/100?img=11" alt="" />
                    <img className="w-10 h-10 rounded-full border-2 border-white grayscale" src="https://i.pravatar.cc/100?img=12" alt="" />
                    <img className="w-10 h-10 rounded-full border-2 border-white grayscale" src="https://i.pravatar.cc/100?img=13" alt="" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">+15</div>
                </div>
            </div>
        </div>
    );
};
