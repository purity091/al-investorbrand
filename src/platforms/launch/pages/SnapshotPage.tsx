import React from 'react';
import { CheckCircle, XCircle, Rocket } from 'lucide-react';
import { SectionHeader } from '../../../components/SectionHeader';

export const SnapshotPage = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <SectionHeader
                title="مساعد الإطلاق | نظرة سريعة"
                subtitle="دليلك الشامل لإطلاق مشاريعك ومنتجاتك بنجاح."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#0D1137] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#00E1C1]">المبدأ التوجيهي</h3>
                        <p className="text-3xl font-black leading-tight">من الفكرة إلى السوق. نرافقك في كل خطوة.</p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Rocket className="w-64 h-64" />
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">رسالة المساعد</h3>
                        <p className="text-3xl font-bold text-[#0D1137]">إطلاق ناجح = تخطيط + تنفيذ + متابعة</p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <p className="text-sm text-slate-500 leading-relaxed italic">
                            "نحول أحلامك الريادية إلى مشاريع حقيقية."
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
                            <span className="font-bold text-emerald-800 text-lg">قوائم تحقق شاملة للإطلاق</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <span className="font-bold text-emerald-800 text-lg">نماذج وقوالب جاهزة</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <span className="font-bold text-emerald-800 text-lg">استشارات متخصصة</span>
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
                            <span className="font-bold text-rose-800 text-lg">لا ننفذ المشاريع بدلاً منك</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <span className="font-bold text-rose-800 text-lg">لا نضمن النجاح بدون عمل</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <span className="font-bold text-rose-800 text-lg">لا نقدم حلولاً سحرية</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
