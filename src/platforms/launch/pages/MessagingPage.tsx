import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Megaphone, MessageSquare, Sparkles } from 'lucide-react';

export const MessagingPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="نبرة المحفز | Motivator Tone"
                subtitle="كيف نخاطب قادة المستقبل؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#F59E0B]">
                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-orange-600">
                        <Sparkles size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">ملهمة (Inspiring)</h3>
                    <p className="text-sm text-slate-600">
                        نؤمن بأنك تستطيع تغيير العالم. نستخدم لغة تحفيزية ولكن واقعية. "ابدأ الآن"، "اصنع مستقبلك".
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#F59E0B]">
                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-orange-600">
                        <Megaphone size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">داعية للفعل (Actionable)</h3>
                    <p className="text-sm text-slate-600">
                        نكره التنظير. كل جملة يجب أن تدفعك لخطوة عملية. نستخدم صيغ الأمر اللطيف: "حمل القالب"، "جرب الأداة".
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#F59E0B]">
                    <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-orange-600">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">صادقة (Honest)</h3>
                    <p className="text-sm text-slate-600">
                        لا نجمل الفشل. ريادة الأعمال صعبة، ونحن نتحدث عن صعوباتها بصراحة لنهيئك للتحدي.
                    </p>
                </div>
            </div>

            <div className="bg-[#0D1137] rounded-3xl p-10 mt-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-4">مانيفستو المؤسس (Founder's Manifesto)</h3>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-blue-100 max-w-3xl">
                        "نحن لا نبني الشركات لنصبح أثرياء فحسب، بل لنبني حلولاً، ونخلق وظائف، ونترك أثراً. الطريق صعب، لكنه يستحق العناء. ونحن معك في كل خطوة."
                    </p>
                </div>
                <div className="absolute top-0 left-0 p-10 opacity-10 font-black text-9xl text-white select-none">BUILD</div>
            </div>
        </div>
    );
};
