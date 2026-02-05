import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Twitter, MessageCircle, Mic } from 'lucide-react';

export const SocialContentPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="المجتمع السعودي | Saudi Community"
                subtitle="كيف نخاطب المستثمر السعودي في منصات التواصل؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Twitter className="text-[#0D1137]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">المشهد في "تويتر السعودية"</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2 text-[#00E1C1]">الهاشتاقات النشطة</h4>
                            <p className="text-slate-600 text-sm">التفاعل اللحظي مع هاشتاقات مثل #تاسي، #تداول، #رؤية_2030 لضمان الوصول للجمهور المستهدف.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2 text-[#00E1C1]">المساحات الصوتية (Spaces)</h4>
                            <p className="text-slate-600 text-sm">استضافة محللين سعوديين أسبوعياً لمناقشة إغلاق السوق.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageCircle className="text-[#25D366]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">Whatsapp Groups</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                        مجتمعات مغلقة وموثوقة للمستثمرين الجادين.
                    </p>
                    <div className="space-y-3 font-mono text-sm text-slate-500">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span>مجموعة كبار المستثمرين</span>
                            <span className="text-emerald-500">نشطة</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span>مجموعة الاكتتابات</span>
                            <span className="text-emerald-500">نشطة</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-[#0D1137] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8">
                    <Mic className="text-[#00E1C1] w-24 h-24 stroke-1" />
                    <div>
                        <h3 className="text-2xl font-bold mb-4">بودكاست "أموالنا"</h3>
                        <p className="text-blue-100 leading-relaxed">
                            أول بودكاست سعودي يغطي قصص نجاح الشركات العائلية وتحولها إلى شركات مساهمة عامة، بلهجة سعودية بيضاء قريبة من القلب.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
