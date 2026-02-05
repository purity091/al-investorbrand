import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Map, Server, Globe } from 'lucide-react';

export const RegionalPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="مصادر البيانات الإقليمية | Data Sources"
                subtitle="من أين نستقي بياناتنا لكل سوق؟"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-[#0D1137] text-lg mb-4 flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/800px-Flag_of_Saudi_Arabia.svg.png" alt="KSA" className="w-6 h-4 rounded-sm object-cover" />
                        السوق السعودي (Tadawul)
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>مزود البيانات:</span>
                            <span className="font-bold text-[#0D1137]">Tadawul Group API</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>التأخير:</span>
                            <span className="font-bold text-[#00E1C1]">مباشر (Real-time)</span>
                        </li>
                        <li className="flex justify-between pb-2">
                            <span>التغطية:</span>
                            <span className="font-bold text-[#0D1137]">الرئيسي + نمو</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-[#0D1137] text-lg mb-4 flex items-center gap-2">
                        <Globe className="text-slate-400" size={20} />
                        الأسواق الأمريكية (US Market)
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>مزود البيانات:</span>
                            <span className="font-bold text-[#0D1137]">Nasdaq / NYSE</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                            <span>التأخير:</span>
                            <span className="font-bold text-[#F59E0B]">15 دقيقة (للمجاني)</span>
                        </li>
                        <li className="flex justify-between pb-2">
                            <span>التغطية:</span>
                            <span className="font-bold text-[#0D1137]">S&P 500, Tech Stocks</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
