import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Notebook, Mic, Video, Mail } from 'lucide-react';

export const EcosystemPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="منتجات المحتوى | Content Products"
                subtitle="كيف تصلك المعلومة؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Mail className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2 text-[#0D1137]">النشرة الصباحية (Brief)</h3>
                    <p className="text-sm text-slate-600">
                        "قهوتك المالية". ملخص لأهم 5 أخبار يجب أن تعرفها قبل افتتاح السوق، تصلك بريدك الإلكتروني الساعة 8 صباحاً.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Mic className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2 text-[#0D1137]">بودكاست "إغلاق"</h3>
                    <p className="text-sm text-slate-600">
                        حلقة صوتية مدتها 10 دقائق تلخص أحداث الجلسة، تصدر بعد إغلاق السوق السعودي مباشرة.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Video className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2 text-[#0D1137]">مقابلات الرؤساء (CEO Talks)</h3>
                    <p className="text-sm text-slate-600">
                        لقاءات فيديو حصرية مع الرؤساء التنفيذيين للشركات المدرجة لمناقشة النتائج المالية والخطط المستقبلية.
                    </p>
                </div>
            </div>

            <div className="bg-[#0D1137] text-white p-10 rounded-3xl flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                        <Notebook className="text-[#00E1C1]" /> ملفات خاصة (Dossiers)
                    </h3>
                    <p className="text-blue-100 max-w-xl">
                        تغطيات موسمية مكثفة لأحداث كبرى، مثل (الميزانية السعودية، مؤتمر دافوس، إدراج شركة كبرى).
                    </p>
                </div>
                <button className="bg-[#00E1C1] text-[#0D1137] px-6 py-2 rounded-xl font-bold hover:bg-white transition-colors">
                    تصفح الأرشيف
                </button>
            </div>
        </div>
    );
};
