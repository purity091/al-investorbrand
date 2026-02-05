import React from 'react';

interface ColorStackProps {
    color: string;
    name: string;
}

export const ColorStack: React.FC<ColorStackProps> = ({ color, name }) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-transform hover:translate-y-[-4px]">
        <div className="h-64 w-full rounded-2xl overflow-hidden flex flex-col shadow-inner">
            <div className="flex-1 bg-[#0D1137]" title="Navy Base"></div>
            <div className="h-12 bg-[#00E1C1]" title="Innovation Cyan"></div>
            <div className="h-10 bg-[#F8FAFC]" title="Surface White"></div>
            <div className="h-8" style={{ backgroundColor: color }} title={name}></div>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{name}</span>
        </div>
    </div>
);
