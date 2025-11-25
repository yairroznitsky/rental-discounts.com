
import React from 'react';

interface LogoProps {
  className?: string;
}

export const AlamoLogo = ({ className = "w-full h-full" }: LogoProps) => (
  <svg
    className={className}
    width="300"
    height="180"
    viewBox="0 0 300 180"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Alamo_Rent_a_Car_%28logo%29.svg/1086px-Alamo_Rent_a_Car_%28logo%29.svg.png"
      width="300"
      height="180"
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>

);
