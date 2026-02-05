import React from 'react';
import { Check, XCircle } from 'lucide-react';

interface DoDontProps {
    isDo: boolean;
    title: string;
    description: string;
    imageContent?: React.ReactNode;
}

export const DoDont: React.FC<DoDontProps> = ({ isDo, title, description, imageContent }) => (
    <div className={`p-6 rounded-2xl border flex flex-col h-full ${isDo ? 'bg-emerald-50 border-emerald-100 shadow-sm shadow-emerald-100/50' : 'bg-rose-50 border-rose-100 shadow-sm shadow-rose-100/50'}`}>
        <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-3 ${isDo ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isDo ? <Check size={18} strokeWidth={3} /> : <XCircle size={18} strokeWidth={3} />}
            </div>
            <h4 className={`font-bold text-lg ${isDo ? 'text-emerald-800' : 'text-rose-800'}`}>{isDo ? 'مسموح' : 'مرفوض'}</h4>
        </div>
        <div className="bg-white rounded-xl p-6 mb-4 flex items-center justify-center border border-slate-100 aspect-video overflow-hidden">
            {imageContent}
        </div>
        <h5 className="font-bold text-slate-800 mb-2">{title}</h5>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
);
