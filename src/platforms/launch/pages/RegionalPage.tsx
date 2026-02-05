import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Globe, Building, Scale } from 'lucide-react';

export const RegionalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="بيئة الأعمال المحلية | Local Business Environment"
                subtitle="كيف تطلق مشروعاً في العالم العربي؟ القوانين والثقافة."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <Building className="text-[#0D1137] mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4">المسرعات والحاضنات</h3>
                    <p className="text-slate-600 mb-6">
                        دليل شامل لأهم الجهات الداعمة في المنطقة، وكيفية التقديم عليها.
                    </p>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>السعودية</span>
                            <span className="font-bold text-[#00E1C1]">منشآت، كراج، مسك</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>الإمارات</span>
                            <span className="font-bold text-[#00E1C1]">DIFC Hive, Hub71</span>
                        </li>
                        <li className="flex justify-between pb-2">
                            <span>مصر</span>
                            <span className="font-bold text-[#00E1C1]">Flat6Labs, AUC V-Lab</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    <Scale className="text-[#0D1137] mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-[#0D1137] mb-4">البيئة التشريعية</h3>
                    <p className="text-slate-600 mb-6">
                        ما تحتاج معرفته قبل أن تبدأ قانونياً.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
                            <span className="font-bold text-[#0D1137]">التراخيص التجارية</span>
                            <p className="text-sm text-slate-500">خطوات السجل التجاري الفوري.</p>
                        </div>
                        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
                            <span className="font-bold text-[#0D1137]">الملكية الفكرية</span>
                            <p className="text-sm text-slate-500">حماية العلامة التجارية وبراءات الاختراع.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
