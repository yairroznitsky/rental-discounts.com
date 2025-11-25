
import React from 'react';

interface LogoProps {
  className?: string;
}

export const ThriftyLogo = ({ className = "w-full h-full" }: LogoProps) => (
<svg
  className={className}
  width="200"
  height="80"
  viewBox="0 0 200 80"
  xmlns="http://www.w3.org/2000/svg"
>
  <image
    href="https://upload.wikimedia.org/wikipedia/commons/2/26/Thrifty_Car_Rental_logo.svg"
    width="200"
    height="80"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>

);
