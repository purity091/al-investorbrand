import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Code, Database, Server, Key } from 'lucide-react';

export const DevelopersPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="بوابة المطورين | Developer API"
                subtitle="ابنِ منتجات مالية باستخدام بياناتنا وأخبارك."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm leading-loose">
                        <p><span className="text-[#F9EB48]">GET</span> /v1/market/news/latest</p>
                        <p><span className="text-[#F9EB48]">GET</span> /v1/companies/{'{symbol}'}/profile</p>
                        <p><span className="text-[#F9EB48]">GET</span> /v1/analytics/sentiment</p>
                        <p className="mt-4 text-slate-500">// Response Example</p>
                        <p>{`{`}</p>
                        <p className="pl-4">"title": "Tadawul closes up 1.2%",</p>
                        <p className="pl-4">"timestamp": "2024-10-24T14:30:00Z",</p>
                        <p className="pl-4">"sentiment": "positive"</p>
                        <p>{`}`}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#0D1137]">خدمات البيانات المتاحة</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                            <Database className="text-[#00E1C1]" />
                            <div>
                                <h4 className="font-bold text-[#0D1137]">News Feed API</h4>
                                <p className="text-sm text-slate-600">تغذية إخبارية حية مفلترة حسب القطاع أو الشركة.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                            <Server className="text-[#00E1C1]" />
                            <div>
                                <h4 className="font-bold text-[#0D1137]">Market Data Stream</h4>
                                <p className="text-sm text-slate-600">أسعار الأسهم والمؤشرات بتأخير زمني بسيط.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                            <Key className="text-[#00E1C1]" />
                            <div>
                                <h4 className="font-bold text-[#0D1137]">Authentication</h4>
                                <p className="text-sm text-slate-600">نظام توثيق آمن عبر OAuth 2.0.</p>
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#0D1137] text-white px-8 py-4 rounded-xl font-bold w-full hover:bg-slate-800 transition-colors">
                        طلب مفتاح API Key
                    </button>
                </div>
            </div>
        </div>
    );
};
