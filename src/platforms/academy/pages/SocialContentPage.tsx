import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

export const SocialContentPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="استراتيجية المجتمع التعليمي | Community Strategy"
                subtitle="التعليم ليس عملية فردية، بل رحلة تشاركية."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Youtube className="text-[#FF0000]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">يوتيوب (YouTube)</h3>
                    </div>
                    <p className="text-slate-600 mb-4">المنصة الأساسية للمحتوى التعليمي الطويل والمعمق.</p>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2">🔹 سلاسل تعليمية كاملة (Courses)</li>
                        <li className="flex gap-2">🔹 تحليلات فيديو أسبوعية</li>
                        <li className="flex gap-2">🔹 لقاءات بودكاست مصورة</li>
                    </ul>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageCircle className="text-[#0088cc]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">تيليجرام (Telegram)</h3>
                    </div>
                    <p className="text-slate-600 mb-4">مجتمعات تفاعلية للنقاش وتبادل الخبرات بين المتعلمين.</p>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2">🔹 قنوات تنبيهات حصرية</li>
                        <li className="flex gap-2">🔹 مجموعات نقاشية تحت إشراف مدربين</li>
                        <li className="flex gap-2">🔹 مسابقات واختبارات سريعة</li>
                    </ul>
                </div>

                <div className="bg-[#0D1137] col-span-1 lg:col-span-2 rounded-3xl p-10 text-white">
                    <h3 className="text-xl font-bold mb-6">ركائز المشاركة المجتمعية (Engagement Pillars)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 className="font-bold text-[#00E1C1] mb-2">التحفيز</h4>
                            <p className="text-sm text-blue-100">الاحتفال بإنجازات الطلاب وتخرجهم من الدورات.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 className="font-bold text-[#00E1C1] mb-2">الدعم المستمر</h4>
                            <p className="text-sm text-blue-100">إجابة استفساراتهم ومساعدتهم في تجاوز عقبات التعلم.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 className="font-bold text-[#00E1C1] mb-2">التطبيق العملي</h4>
                            <p className="text-sm text-blue-100">تحديات استثمارية افتراضية لتطبيق ما تعلموه.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
