import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { ShieldCheck, AlertTriangle, FileText } from 'lucide-react';

export const GuidelinesPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="الميثاق التحريري | Editorial Guidelines"
                subtitle="دستور العمل الصحفي في منصة المستثمر."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-[#0D1137]">
                    <ShieldCheck className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">التحقق (Fact-Checking)</h3>
                    <p className="text-sm text-slate-600">قاعدة الصحافة الأولى: تحقق قبل أن تنشر. مصدران مستقلان كحد أدنى لأي خبر غير رسمي.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-[#00E1C1]">
                    <FileText className="text-[#00E1C1] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">الوضوح (Clarity)</h3>
                    <p className="text-sm text-slate-600">الاقتصاد معقد، دورنا هو تبسيطه. تجنب المصطلحات المبهمة دون شرح.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-[#EF4444]">
                    <AlertTriangle className="text-[#EF4444] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">تضارب المصالح</h3>
                    <p className="text-sm text-slate-600">يجب على المحرر الإفصاح عن أي ملكية أسهم في الشركات التي يكتب عنها.</p>
                </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl space-y-6">
                <h3 className="font-bold text-[#0D1137] text-xl">قائمة الممنوعات (Red Lines)</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-700">نشر الشائعات التي قد تؤثر على السوق.</span>
                    </li>
                    <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-700">العناوين المضللة (Clickbait) لجذب الزوار.</span>
                    </li>
                    <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-700">نسخ المحتوى من مصادر أخرى دون إشارة.</span>
                    </li>
                    <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-700">إبداء رأي شخصي في خبر (الرأي له مقالاته الخاصة).</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
