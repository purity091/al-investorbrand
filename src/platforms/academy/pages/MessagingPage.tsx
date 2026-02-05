import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { MessageCircle, Smile, UserCheck } from 'lucide-react';

export const MessagingPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="لغة المعلم | TeacherTone"
                subtitle="كيف نتحدث مع طلابنا؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#3B82F6]">
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <Smile size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">مشجعة (Encouraging)</h3>
                    <p className="text-sm text-slate-600">
                        المال مخيف للبعض. دورنا هو طمأنة الطالب وبناء ثقته بنفسه. "أنت قادر على الفهم"، "خطوة بخطوة".
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#3B82F6]">
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <MessageCircle size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">واضحة (Clear)</h3>
                    <p className="text-sm text-slate-600">
                        لا نتفلسف. إذا كان هناك مصطلح معقد، نشرحه فوراً. نستخدم القياس (Analogy) لتقريب الصورة.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#3B82F6]">
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <UserCheck size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">موجهة (Mentorship)</h3>
                    <p className="text-sm text-slate-600">
                        نحن لسنا مجرد أرشيف معلومات، نحن مرشدون. نوجه الطالب لما ينفعه ونحذره مما يضره.
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl mt-8">
                <div className="flx flex-col gap-6">
                    <h3 className="font-bold text-[#0D1137] text-lg mb-4">مثال على التبسيط (Simplification)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-4 bg-white rounded-xl border border-red-100 opacity-70">
                            <span className="text-xs font-bold text-red-500 mb-2 block">معقد (تجنبه)</span>
                            <p className="text-sm text-slate-500">
                                "السندات هي أدوات دين ذات دخل ثابت تصدرها الجهات السيادية لتمويل العجز في الموازنة العامة."
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-green-100 shadow-sm">
                            <span className="text-xs font-bold text-green-600 mb-2 block">مبسط (نستخدمه)</span>
                            <p className="text-sm text-[#0D1137]">
                                "تخيل السندات كأنها قرض منك للحكومة. أنت تقرضهم المال، وهم يعيدونه لك لاحقاً مع فائدة إضافية مضمونة."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
