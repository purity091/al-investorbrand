import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Globe, MapPin } from 'lucide-react';

export const RegionalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="التغطية الإقليمية | Regional Coverage"
                subtitle="استراتيجية تخصيص المحتوى للأسواق العربية المختلفة."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0D1137] mb-6 flex items-center gap-3">
                        <MapPin className="text-[#00E1C1]" />
                        أولويات التغطية الجغرافية
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl font-black text-slate-200">01</span>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">السوق السعودي (المركز)</h4>
                                <p className="text-sm text-slate-600 mt-1">التركيز على رؤية 2030، المشاريع الكبرى (نيوم، البحر الأحمر)، وتداول.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl font-black text-slate-200">02</span>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">الخليج العربي (GCC)</h4>
                                <p className="text-sm text-slate-600 mt-1">أسواق الإمارات (دبي/أبوظبي)، قطر للطاقة، وصناديق الثروة السيادية.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-2xl font-black text-slate-200">03</span>
                            <div>
                                <h4 className="font-bold text-[#0D1137]">مصر وشمال أفريقيا</h4>
                                <p className="text-sm text-slate-600 mt-1">الشركات الناشئة، الاقتصاد الكلي، والفرص الاستثمارية الناهضة.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1137] rounded-3xl p-10 text-white">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <Globe className="text-[#00E1C1]" />
                        معايير التوطين (Localization)
                    </h3>
                    <ul className="space-y-4 text-blue-100 leading-relaxed">
                        <li className="flex gap-3">
                            <span className="text-[#00E1C1] font-bold">•</span>
                            <span>استخدام المصطلحات المالية الدقيقة المتداولة في كل سوق محلي.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00E1C1] font-bold">•</span>
                            <span>مراعاة التوقيت المحلي للنشر (Time Zones) لكل منطقة.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#00E1C1] font-bold">•</span>
                            <span>احترام الخصوصيات والثقافة المحلية لكل دولة.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
