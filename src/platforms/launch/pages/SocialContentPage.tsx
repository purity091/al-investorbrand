import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Linkedin, Users, Coffee } from 'lucide-react';

export const SocialContentPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="التواصل مع الرواد | Entrepreneur Community"
                subtitle="كيف نبني مجتمعاً داعماً لرواد الأعمال؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0077B5] rounded-3xl p-10 text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <Linkedin className="text-white" size={32} />
                        <h3 className="text-2xl font-bold">LinkedIn Strategy</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed mb-6">
                        المنصة الأهم لرواد الأعمال. نركز هنا على المحتوى "العملي" و "الملهم".
                    </p>
                    <ul className="space-y-4">
                        <li className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <h4 className="font-bold mb-1">قصص الفشل قبل النجاح (Failure Stories)</h4>
                            <p className="text-xs text-blue-100 opacity-80">لتعليم المرونة والواقعية، بعيداً عن تجميل ريادة الأعمال.</p>
                        </li>
                        <li className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <h4 className="font-bold mb-1">دروس من الخنادق (Tips from Trenches)</h4>
                            <p className="text-xs text-blue-100 opacity-80">نصائح عملية من مؤسسين يواجهون تحديات التوظيف والتمويل يومياً.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Coffee className="text-[#0D1137]" size={32} />
                        <h3 className="text-2xl font-bold text-[#0D1137]">جلسات حوارية</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                        سلسلة لقاءات أسبوعية على Twitter Spaces و YouTube Live.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#00E1C1]">01</div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">جلسة العصف الذهني</h4>
                                <p className="text-xs text-slate-500">نساعد أحد الرواد في حل مشكلة معينة بمشاركة الجمهور.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#00E1C1]">02</div>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">تفكيك نموذج العمل</h4>
                                <p className="text-xs text-slate-500">تحليل Business Model لشركة عالمية ناجحة.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
