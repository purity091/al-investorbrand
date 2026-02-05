import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Smartphone, Bell, Bookmark, Zap } from 'lucide-react';

export const AppsPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تطبيقات الأخبار | Mobile Apps"
                subtitle="السوق في جيبك. في أي وقت، وفي أي مكان."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0D1137] text-lg">تنبيهات ذكية</h3>
                            <p className="text-slate-600">لا نزعجك بكل خبر. اختر الشركات والقطاعات التي تهمك فقط لتصلك تنبيهاتها.</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Bookmark size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0D1137] text-lg">مكتبتي (My Library)</h3>
                            <p className="text-slate-600">احفظ المقالات والتحليلات لقرائتها لاحقاً، حتى بدون اتصال بالإنترنت.</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0D1137] text-lg">الموجز السريع</h3>
                            <p className="text-slate-600">قصص (Stories) يومية تلخص أهم أحداث السوق في 60 ثانية.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1137] rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00E1C1]/20 to-transparent"></div>
                    <Smartphone className="w-48 h-48 text-white mx-auto mb-6 opacity-90" strokeWidth={1} />
                    <h3 className="text-2xl font-black text-white mb-2">تطبيق المستثمر</h3>
                    <p className="text-blue-200 mb-8">متوفر قريباً على iOS و Android</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-[#0D1137] px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">App Store</button>
                        <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">Google Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
