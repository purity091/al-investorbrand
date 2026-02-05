import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Scale, AlertTriangle, FileCheck } from 'lucide-react';

export const MessagingPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="سياسة التحرير | Editorial Policy"
                subtitle="الدستور الذي يحكم كل كلمة نكتبها."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#EF4444]">
                    <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[#EF4444]">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">عاجلة ولكن متزنة</h3>
                    <p className="text-sm text-slate-600">
                        "عاجل: السوق ينهار" (x) خطأ.
                        <br />
                        "عاجل: المؤشر يفقد 200 نقطة بضغط من قطاع البنوك" (✓) صح.
                        التهويل ممنوع، حتى في الأخبار العاجلة.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#0D1137]">
                    <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[#0D1137]">
                        <Scale size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">فصل الرأي عن الخبر</h3>
                    <p className="text-sm text-slate-600">
                        الخبر مقدس، والرأي حر. مقالات الرأي توضع في إطار واضح ومميز (Op-Ed) ليعرف القارئ أنها وجهة نظر الكاتب وليست خبراً.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-[#00E1C1]">
                    <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[#00E1C1]">
                        <FileCheck size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0D1137] mb-2">إسناد المصادر (Attribution)</h3>
                    <p className="text-sm text-slate-600">
                        لا نستخدم "مصادر مطلعة" إلا في أضيق الحدود. نذكر المصدر دائماً: "حسب بيانات البنك المركزي"، "نقلاً عن رويترز".
                    </p>
                </div>
            </div>

            <div className="mt-8 bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <p className="font-serif italic text-xl text-[#0D1137]">"المصداقية هي عملتنا الوحيدة في هذا السوق. إذا فقدناها، فقدنا كل شيء."</p>
                <span className="block mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Editor-in-Chief</span>
            </div>
        </div>
    );
};
