import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Smartphone, Monitor, Moon, Sun } from 'lucide-react';

export const DigitalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تجربة القراءة الرقمية | Digital Experience"
                subtitle="كيف نقدم الخبر في عصر السرعة وتشتت الانتباه؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-[#00E1C1] transition-colors">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00E1C1] transition-colors">
                        <Smartphone className="text-[#0D1137] group-hover:text-white" size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">الأولية للموبايل (Mobile First)</h3>
                    <p className="text-sm text-slate-500">تصميم يراعي القراءة أثناء التنقل، بأزرار واضحة وخطوط مريحة للعين.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-[#00E1C1] transition-colors">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00E1C1] transition-colors">
                        <Monitor className="text-[#0D1137] group-hover:text-white" size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">كثافة المعلومات (Data Density)</h3>
                    <p className="text-sm text-slate-500">على الديسكتوب، نستغل المساحة لعرض الجداول المعقدة والرسوم البيانية التفاعلية.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-[#00E1C1] transition-colors">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00E1C1] transition-colors">
                        <Moon className="text-[#0D1137] group-hover:text-white" size={32} />
                    </div>
                    <h3 className="font-bold text-[#0D1137] mb-2">الوضع الليلي (Dark Mode)</h3>
                    <p className="text-sm text-slate-500">تجربة قراءة ليلية مريحة للمتداولين الذين يتابعون الأسواق العالمية متأخراً.</p>
                </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                <h3 className="font-bold text-[#0D1137] mb-6">مبادئ تجربة المستخدم (UX Principles)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#0D1137] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-[#0D1137]">الماسح الضوئي (Scannability)</h4>
                            <p className="text-sm text-slate-600">المستخدم لا يقرأ كل كلمة. نستخدم العناوين الفرعية، النقاط، والخط العريض لتسهيل المسح السريع.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#0D1137] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                        <div>
                            <h4 className="font-bold text-[#0D1137]">التسلسل الهرمي البصري</h4>
                            <p className="text-sm text-slate-600">الخبر الأهم يأخذ المساحة الأكبر. الألوان تحدد نوع الخبر (عاجل = أحمر، تحليل = كحلي).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
