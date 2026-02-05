import React from 'react';
import { BrandLogo } from './BrandLogo';
import { BRAND_COLORS } from '../constants/constants';

interface SocialTemplatePostProps {
    title: string;
    bgClass?: string;
    textColor?: string;
}

export const SocialTemplatePost: React.FC<SocialTemplatePostProps> = ({ title, bgClass = "bg-[#0D1137]", textColor = "text-white" }) => (
    <div className={`aspect-square rounded-2xl relative overflow-hidden shadow-xl border border-slate-100 group`}>
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${bgClass}`}></div>
        <div className="absolute inset-0 flex flex-col p-8 z-10">
            <div className="flex justify-between items-start mb-auto">
                <BrandLogo className="w-10 h-10" color={bgClass.includes('0D1137') ? "#FFFFFF" : BRAND_COLORS.navy} />
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#00E1C1] rotate-45 opacity-40 rounded-3xl"></div>
                <h3 className={`text-2xl font-black leading-tight relative z-10 ${textColor}`}>
                    {title}
                </h3>
            </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-white flex items-center px-4 justify-between border-t border-slate-100">
            <div className="flex gap-4">
                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
            </div>
            <div className="w-4 h-4 rounded-sm border border-slate-300"></div>
        </div>
    </div>
);
