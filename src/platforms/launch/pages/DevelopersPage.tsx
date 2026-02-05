import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Code, Box, Layers } from 'lucide-react';

export const DevelopersPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="البنية التحتية للمنصة | Tech Stack"
                subtitle="الأدوات التي نبني بها مساعد الإطلاق."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="font-bold text-[#0D1137] text-xl">الواجهة الأمامية (Frontend)</h3>
                    <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm items-center">
                        <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold">N</div>
                        <div>
                            <h4 className="font-bold text-[#0D1137]">Next.js</h4>
                            <p className="text-xs text-slate-500">لأداء سريع و SEO ممتاز.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm items-center">
                        <div className="w-12 h-12 bg-[#38BDF8] text-white rounded-lg flex items-center justify-center font-bold">T</div>
                        <div>
                            <h4 className="font-bold text-[#0D1137]">Tailwind CSS</h4>
                            <p className="text-xs text-slate-500">لتصميم مرن وسريع التخصيص.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-[#0D1137] text-xl">الخدمات المصغرة (Microservices)</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        نعتمد بنية الخدمات المصغرة لتسهيل التوسع وإضافة أدوات جديدة للمنصة دون التأثير على استقرار النظام.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <Box className="mx-auto mb-2 text-[#0D1137]" />
                            <span className="font-bold text-sm">Auth Service</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl text-center">
                            <Layers className="mx-auto mb-2 text-[#0D1137]" />
                            <span className="font-bold text-sm">Payment Service</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
