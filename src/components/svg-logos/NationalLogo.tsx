
import React from 'react';

interface LogoProps {
  className?: string;
}

export const NationalLogo = ({ className = "w-full h-full" }: LogoProps) => (
<svg
  className={className}
  width="200"
  height="80"
  viewBox="0 0 200 80"
  xmlns="http://www.w3.org/2000/svg"
>
  <image
    href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/National-Car-Rental-Logo.svg/500px-National-Car-Rental-Logo.svg.png"
    width="200"
    height="80"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>

);
