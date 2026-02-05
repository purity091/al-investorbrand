import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Globe, BookOpen } from 'lucide-react';

export const RegionalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="التعليم المالي محلياً | Localized Education"
                subtitle="مناهج عالمية، بروح وأمثلة عربية."
            />

            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold text-[#0D1137] mb-6">لماذا التوطين (Localization)؟</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            النظريات المالية عالمية، لكن التطبيق يختلف. الضرائب، الأنظمة القانونية، والشريعة الإسلامية عوامل حاسمة في المنطقة العربية.
                        </p>
                        <div className="flex gap-4 items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <BookOpen className="text-emerald-600" />
                            <div>
                                <h4 className="font-bold text-emerald-800">التوافق مع الشريعة</h4>
                                <p className="text-xs text-emerald-600">ركن أساسي في محتوانا التعليمي للمنطقة.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-bold text-[#0D1137]">أمثلة من واقعنا</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-[#00E1C1] font-bold">1.</span>
                                <span className="text-slate-600">بدل شرح الرهن العقاري الأمريكي، نشرح التمويل العقاري السعودي المدعوم.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#00E1C1] font-bold">2.</span>
                                <span className="text-slate-600">استخدام شركات مثل "أرامكو" و"سابك" كحالات دراسية بدلاً من "Coca-Cola".</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#00E1C1] font-bold">3.</span>
                                <span className="text-slate-600">شرح أدوات الدين المحلية (الصكوك) بدلاً من التركيز فقط على السندات التقليدية.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
