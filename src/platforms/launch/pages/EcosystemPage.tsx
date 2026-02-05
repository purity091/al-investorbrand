import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { FileText, Wrench, Users, Briefcase } from 'lucide-react';

export const EcosystemPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="حقيبة المؤسس | Founder's Kit"
                subtitle="كل ما تحتاجه في مكان واحد."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-[#00E1C1] group-hover:text-white transition-colors">
                            <FileText size={28} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">50+ قالب</span>
                    </div>
                    <h3 className="font-bold text-[#0D1137] text-lg mb-2">مكتبة القوالب (Templates)</h3>
                    <p className="text-sm text-slate-600">
                        عقود تأسيس، نماذج مالية (Excel)، عروض تقديمية (PPT)، خطط تسويقية جاهزة للتعديل.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-[#00E1C1] group-hover:text-white transition-colors">
                            <Wrench size={28} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">SaaS Deals</span>
                    </div>
                    <h3 className="font-bold text-[#0D1137] text-lg mb-2">متجر الأدوات (Deals)</h3>
                    <p className="text-sm text-slate-600">
                        خصومات حصرية لرواد "مساعد الإطلاق" على خدمات مثل AWS, Google Cloud, HubSpot, Stripe.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-[#00E1C1] group-hover:text-white transition-colors">
                            <Users size={28} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Mentors</span>
                    </div>
                    <h3 className="font-bold text-[#0D1137] text-lg mb-2">شبكة المرشدين</h3>
                    <p className="text-sm text-slate-600">
                        حجز ساعات استشارية (Office Hours) مع رواد أعمال سابقين ومستثمرين.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-[#00E1C1] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-[#00E1C1] group-hover:text-white transition-colors">
                            <Briefcase size={28} />
                        </div>
                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Jobs</span>
                    </div>
                    <h3 className="font-bold text-[#0D1137] text-lg mb-2">التوظيف (Co-Founder Match)</h3>
                    <p className="text-sm text-slate-600">
                        منصة للبحث عن شريك مؤسس تقني أو تجاري يشاركك الشغف والرؤية.
                    </p>
                </div>
            </div>
        </div>
    );
};
