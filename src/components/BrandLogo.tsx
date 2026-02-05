import React from 'react';
import { BRAND_COLORS } from '../constants/constants';

interface BrandLogoProps {
    className?: string;
    color?: string;
    secondaryColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-12 h-12", color = BRAND_COLORS.navy, secondaryColor = BRAND_COLORS.cyan }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="8" height="50" rx="2" fill={color} />
        <rect x="30" y="15" width="8" height="70" rx="2" fill={color} />
        <rect x="46" y="5" width="8" height="35" rx="2" fill={secondaryColor} />
        <rect x="46" y="60" width="8" height="35" rx="2" fill={secondaryColor} />
        <rect x="62" y="15" width="8" height="70" rx="2" fill={color} />
        <rect x="77" y="25" width="8" height="50" rx="2" fill={color} />
    </svg>
);
