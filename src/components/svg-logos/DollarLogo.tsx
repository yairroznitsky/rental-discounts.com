
import React from 'react';

interface LogoProps {
  className?: string;
}

export const DollarLogo = ({ className = "w-full h-full" }: LogoProps) => (
  <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="80" fill="#00A651" rx="8"/>
    <text x="100" y="45" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">
      Dollar
    </text>
  </svg>
);
