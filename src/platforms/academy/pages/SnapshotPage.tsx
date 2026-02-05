import React from 'react';
import { CheckCircle, XCircle, GraduationCap } from 'lucide-react';
import { SectionHeader } from '../../../components/SectionHeader';
import { BrandLogo } from '../../../components/BrandLogo';

export const SnapshotPage = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <SectionHeader
                title="أكاديمية المستثمر | نظرة سريعة"
                subtitle="منصة تعليمية متكاملة لبناء جيل واعٍ مالياً."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#0D1137] rounded-3xl p-10 text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#00E1C1]">المبدأ التوجيهي</h3>
                        <p className="text-3xl font-black leading-tight">التعليم المالي حق لكل عربي، ونحن نجعله متاحاً للجميع.</p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <GraduationCap className="w-64 h-64" />
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">رسالة الأكاديمية</h3>
                        <p className="text-3xl font-bold text-[#0D1137]">من الصفر إلى الاحتراف في عالم الاستثمار</p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <p className="text-sm text-slate-500 leading-relaxed italic">
                            "نبني عقولاً استثمارية، لا مجرد متداولين."
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
                    <h3 className="text-xl font-bold mb-6 text-emerald-900 flex items-center gap-2">
                        <CheckCircle size={20} />
                        ما نقدمه
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                            <span className="font-bold text-emerald-800 text-lg">دورات تعليمية منهجية</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <span className="font-bold text-emerald-800 text-lg">محتوى تفاعلي ومرئي</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <span className="font-bold text-emerald-800 text-lg">شهادات معتمدة</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-rose-50 rounded-3xl p-10 border border-rose-100">
                    <h3 className="text-xl font-bold mb-6 text-rose-900 flex items-center gap-2">
                        <XCircle size={20} />
                        ما لا نفعله
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                            <span className="font-bold text-rose-800 text-lg">لا نعد بالثراء السريع</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <span className="font-bold text-rose-800 text-lg">لا نبيع توصيات استثمارية</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <span className="font-bold text-rose-800 text-lg">لا نختصر الطريق للمتعلم</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
