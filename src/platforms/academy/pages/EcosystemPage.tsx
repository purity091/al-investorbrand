import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { PlayCircle, Video, BookOpen, Users } from 'lucide-react';

export const EcosystemPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="مكونات الأكاديمية | Academy Components"
                subtitle="بيئة تعليمية متكاملة."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                        <PlayCircle size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">دورات مسجلة (On-Demand)</h3>
                        <p className="text-sm text-slate-600">
                            مكتبة تضم مئات الساعات من المحتوى المسجل بجودة 4K، مقسمة إلى وحدات صغيرة (Micro-learning) لسهولة الاستيعاب.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Video size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">ورش عمل حية (Live Workshops)</h3>
                        <p className="text-sm text-slate-600">
                            جلسات "Zoom" تفاعلية أسبوعية لتحليل السوق بشكل مباشر والإجابة على أسئلة الطلاب.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">المكتبة الرقمية (E-Library)</h3>
                        <p className="text-sm text-slate-600">
                            ملخصات كتب عالمية، قوالب إكسل جاهزة للتقييم المالي، وقواميس للمصطلحات.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Users size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#0D1137] text-lg mb-2">نادي الاستثمار (Investment Club)</h3>
                        <p className="text-sm text-slate-600">
                            مجتمع مغلق للمتميزين لمناقشة الفرص وتبادل الخبرات تحت إشراف النخبة.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
