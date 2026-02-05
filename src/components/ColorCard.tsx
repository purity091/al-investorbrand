import React from 'react';

interface ColorCardProps {
    name: string;
    hex: string;
    rgb: string;
    type: string;
    light?: boolean;
}

export const ColorCard: React.FC<ColorCardProps> = ({ name, hex, rgb, type, light = false }) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group transition-all hover:shadow-md">
            <div className="h-24 w-full transition-transform group-hover:scale-105 relative" style={{ backgroundColor: hex }}>
                {light && <div className="absolute inset-0 border border-slate-100 m-2 rounded-lg"></div>}
            </div>
            <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">{type}</span>
                <h4 className="text-sm font-bold text-[#0D1137] mb-3">{name}</h4>
                <div className="space-y-1">
                    <button onClick={() => copyToClipboard(hex)} className="w-full flex justify-between items-center text-[10px] font-mono bg-slate-50 p-1.5 rounded hover:bg-slate-100 transition-colors">
                        <span className="text-slate-400">HEX</span>
                        <span className="font-bold">{hex}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
