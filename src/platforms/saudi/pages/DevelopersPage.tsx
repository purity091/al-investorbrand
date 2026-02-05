import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Database, Link, Lock } from 'lucide-react';

export const DevelopersPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="الربط التقني | Local Integrations"
                subtitle="الربط مع المنصات والخدمات المحلية."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Link className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">نفاذ (Nafath)</h3>
                    <p className="text-sm text-slate-500">
                        دعم تسجيل الدخول الموحد عبر بوابة "نفاذ" الوطنية للتحقق من هوية المستخدمين المسجلين.
                    </p>
                    <span className="inline-block mt-4 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Trusted</span>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Database className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">Mada & Sadad</h3>
                    <p className="text-sm text-slate-500">
                        بوابات دفع محلية مدمجة بالكامل لقبول المدفوعات عبر بطاقات مدى وسداد.
                    </p>
                    <span className="inline-block mt-4 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">Payments</span>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Lock className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">Tadawul Data</h3>
                    <p className="text-sm text-slate-500">
                        ربط مباشر مع مزودي بيانات السوق المصرح لهم (Authorized Data Vendors).
                    </p>
                    <span className="inline-block mt-4 text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">Market Data</span>
                </div>
            </div>
        </div>
    );
};
