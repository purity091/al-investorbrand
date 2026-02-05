import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Palette, Eye, Type } from 'lucide-react';

export const VisualPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="هوية الأكاديمية | Visual Language"
                subtitle="التصميم في خدمة التعلم."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Palette size={20} className="text-[#00E1C1]" /> سيكولوجية الألوان
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm">
                        نبتعد عن الألوان الصارخة (مثل الأحمر الفاقع) التي تثير القلق، ونركز على الألوان التي تعزز التركيز والهدوء الذهني.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex-1 h-16 bg-[#0D1137] rounded-xl flex items-center justify-center text-white text-xs font-bold">Primary</div>
                        <div className="flex-1 h-16 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white text-xs font-bold">Focus</div>
                        <div className="flex-1 h-16 bg-[#F3F4F6] rounded-xl flex items-center justify-center text-slate-500 text-xs font-bold border border-slate-200">Bg</div>
                    </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-[#0D1137] mb-6 flex items-center gap-2">
                        <Type size={20} className="text-[#00E1C1]" /> الخطوط (Typography)
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm">
                        نستخدم خطوطاً عصرية وسهلة القراءة (Sans Serif) لتقليل الإجهاد البصري أثناء القراءة المطولة.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                        <p className="text-2xl font-bold text-[#0D1137] mb-1">العنوان الرئيسي</p>
                        <p className="text-base text-slate-600">النص العادي يجب أن يكون مريحاً للعين، بمسافات كافية بين الأسطر.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-dashed border-slate-300 rounded-2xl text-center">
                    <div className="w-full aspect-video bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300">
                        <Eye />
                    </div>
                    <span className="font-bold text-[#0D1137] text-sm">توضيحات بصرية (Visual Aids)</span>
                    <p className="text-xs text-slate-500 mt-1">استخدام الرسوم البيانية لتبسيط المفاهيم المعقدة.</p>
                </div>
                <div className="p-6 border border-dashed border-slate-300 rounded-2xl text-center">
                    <div className="w-full aspect-video bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300">
                        <span className="text-4xl font-black opacity-20">A+</span>
                    </div>
                    <span className="font-bold text-[#0D1137] text-sm">البساطة (Minimalism)</span>
                    <p className="text-xs text-slate-500 mt-1">مساحات بيضاء واسعة لراحة العين.</p>
                </div>
                <div className="p-6 border border-dashed border-slate-300 rounded-2xl text-center">
                    <div className="bg-[#0D1137] text-[#00E1C1] px-4 py-2 rounded-lg inline-block mb-4 mt-8 font-bold">
                        نصيحة هامة
                    </div>
                    <p className="font-bold text-[#0D1137] text-sm">عناصر التمييز</p>
                    <p className="text-xs text-slate-500 mt-1">ألوان مميزة للمعلومات الهامة والملاحظات.</p>
                </div>
            </div>
        </div>
    );
};
