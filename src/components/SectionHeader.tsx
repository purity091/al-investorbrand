import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="mb-12 border-b border-slate-200 pb-8">
        <h2 className="text-4xl font-extrabold text-[#0D1137] mb-3 tracking-tight">{title}</h2>
        <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">{subtitle}</p>
    </div>
);
