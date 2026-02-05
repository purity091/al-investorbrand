import React from 'react';
import { MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface RegionalLogoCardProps {
    name: string;
    code: string;
    city: string;
    flag: string;
}

export const RegionalLogoCard: React.FC<RegionalLogoCardProps> = ({ name, code, city, flag }) => (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all group border-b-4 hover:border-[#00E1C1]">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{flag}</span>
                <div>
                    <h4 className="font-black text-[#0D1137] text-base leading-none mb-1">{name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{city}</p>
                </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-300 group-hover:text-[#00E1C1] transition-colors">
                <MapPin size={16} />
            </div>
        </div>
        <div className="bg-[#0D1137] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden h-44">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
            <BrandLogo color="#FFFFFF" secondaryColor="#00E1C1" className="w-14 h-14 relative z-10" />
            <div className="text-center relative z-10">
                <p className="text-white font-black text-sm tracking-tight mb-0.5">المستثمر</p>
                <p className="text-[#00E1C1] text-[9px] font-bold uppercase tracking-[0.25em] leading-none opacity-80">{code}</p>
            </div>
        </div>
    </div>
);
