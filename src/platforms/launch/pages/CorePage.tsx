import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Rocket, PenTool, Flag, HeartHandshake } from 'lucide-react';

export const CorePage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="روح الريادة | Entrepreneurial Spirit"
                subtitle="نحن نساعد الحالمين على بناء الواقع."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-[#0D1137] text-white p-10 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E1C1] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:opacity-10 transition-opacity"></div>
                    <Rocket className="text-[#00E1C1] mb-6" size={48} />
                    <h3 className="text-2xl font-bold mb-4">المهمة (Mission)</h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        تبسيط رحلة ريادة الأعمال. إزالة الغموض عن التراخيص، التمويل، والنمو، ليتمكن المؤسس من التركيز على منتجه فقط.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <PenTool className="text-[#0D1137] shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-[#0D1137]">العملية (Practicality)</h4>
                            <p className="text-sm text-slate-600">لا نظريات أكاديمية معقدة. أدوات وخطوات عملية قابلة للتنفيذ فوراً.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <Flag className="text-[#0D1137] shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-[#0D1137]">الجرأة (Boldness)</h4>
                            <p className="text-sm text-slate-600">نشجع المخاطرة المحسوبة والابتكار الذي يكسر القواعد التقليدية.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <HeartHandshake className="text-[#0D1137] shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-[#0D1137]">المساندة (Support)</h4>
                            <p className="text-sm text-slate-600">ريادة الأعمال رحلة موحشة، نحن هنا لنكون الرفيق والداعم.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
