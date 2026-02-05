import React from 'react';
import { SectionHeader } from '../../../components/SectionHeader';
import { Package, Cloud, Lock } from 'lucide-react';

export const DevelopersPage = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <SectionHeader
                title="تقنيات التعليم | EdTech Stack"
                subtitle="البنية التحتية للمنصة الأكاديمية."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Cloud className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">Video Streaming</h3>
                    <p className="text-sm text-slate-500">Adaptive Bitrate Streaming (HLS) لضمان تجربة مشاهدة سلسة على أي سرعة إنترنت.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Package className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">Interactive Labs</h3>
                    <p className="text-sm text-slate-500">بيئات محاكاة (Sandboxes) مدمجة للتطبيق العملي على التحليل المالي.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <Lock className="text-[#0D1137] mb-4" size={32} />
                    <h3 className="font-bold text-lg mb-2">DRM Protection</h3>
                    <p className="text-sm text-slate-500">حماية المحتوى من القرصنة والنسخ غير المصرح به.</p>
                </div>
            </div>
        </div>
    );
};
