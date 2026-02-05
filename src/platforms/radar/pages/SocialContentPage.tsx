import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Twitter, Bell, Activity, Send } from 'lucide-react';

export const SocialContentPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تنبيهات الأسواق الاجتماعية | Social Sentiments"
                subtitle="كيف ننقل نبض السوق من البيانات إلى الجمهور؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Twitter className="text-[#0D1137]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">رادار X (Alerts)</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <Bell size={14} className="text-[#F59E0B]" /> اختراق مستويات (Breakouts)
                            </h4>
                            <p className="text-slate-600 text-sm">تغريدات آلية عند اختراق سهم لمقاومة تاريخية أو كسر دعم رئيسي.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <Activity size={14} className="text-[#00E1C1]" /> حركة غير اعتيادية
                            </h4>
                            <p className="text-slate-600 text-sm">رصد السيولة الداخلة والخارجة بشكل مفاجئ (Volume Spikes).</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Send className="text-[#0088cc]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">بوتات التيليجرام (Bots)</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm mb-2">قنوات VIP</h4>
                            <p className="text-slate-600 text-sm">تقارير PDF آلية تصل للمشتركين قبل افتتاح الجلسة بنصف ساعة.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm mb-2">تنبيهات المحفظة</h4>
                            <p className="text-slate-600 text-sm">رسائل خاصة للمستخدم عند وصول سهم في قائمة مراقبته لسعر محدد.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
