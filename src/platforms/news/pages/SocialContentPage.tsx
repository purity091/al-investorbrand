import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

export const SocialContentPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="استراتيجية محتوى التواصل | Social Content Strategy"
                subtitle="كيف نتحدث عن المال والأعمال في الفضاء الرقمي؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Twitter / X Strategy */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Twitter className="text-[#0D1137]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">منصة X (تويتر)</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">الهدف (Objective)</h4>
                            <p className="text-slate-600 text-sm">المصدر الأول للخبر العاجل والتحليل اللحظي.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">نوع المحتوى</h4>
                            <p className="text-slate-600 text-sm">عواجل السوق، ثريدز (Threads) تحليلية، إنفوجرافيك سريع للأرقام.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">نبرة الصوت</h4>
                            <p className="text-slate-600 text-sm">سريعة، حادة، ومباشرة. (Zero Fluff).</p>
                        </li>
                    </ul>
                </div>

                {/* LinkedIn Strategy */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Linkedin className="text-[#0077B5]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">لينكد إن (LinkedIn)</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">الهدف (Objective)</h4>
                            <p className="text-slate-600 text-sm">بناء سلطة العلامة التجارية (Brand Authority) في قطاع الأعمال.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">نوع المحتوى</h4>
                            <p className="text-slate-600 text-sm">تقارير، قصص نجاح شركات، آراء تنفيذية، مقالات رأي معمقة.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">نبرة الصوت</h4>
                            <p className="text-slate-600 text-sm">مهنية، رصينة، وملهمة لصناع القرار.</p>
                        </li>
                    </ul>
                </div>

                {/* Instagram Strategy */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Instagram className="text-[#E4405F]" size={28} />
                        <h3 className="text-xl font-bold text-[#0D1137]">إنستغرام (Instagram)</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">الهدف (Objective)</h4>
                            <p className="text-slate-600 text-sm">تبسيط المفاهيم المالية وجذب جيل الشباب.</p>
                        </li>
                        <li className="bg-slate-50 p-4 rounded-xl">
                            <h4 className="font-bold text-sm mb-2">نوع المحتوى</h4>
                            <p className="text-slate-600 text-sm">ريلز (Reels) سريعة، كاروسيل (Carousel) تعليمي، قصص (Stories) تفاعلية.</p>
                        </li>
                    </ul>
                </div>

                {/* Editorial Mix */}
                <div className="bg-[#0D1137] rounded-3xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-6">المزيج التحريري (Content Mix)</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span>أخبار الأسواق (News)</span>
                            <span className="font-bold text-[#00E1C1]">40%</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span>التحليل والرأي (Analysis)</span>
                            <span className="font-bold text-[#00E1C1]">30%</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span>التعليم المالي (Education)</span>
                            <span className="font-bold text-[#00E1C1]">20%</span>
                        </div>
                        <div className="flex items-center justify-between pb-2">
                            <span>لايف ستايل (Lifestyle)</span>
                            <span className="font-bold text-[#00E1C1]">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
