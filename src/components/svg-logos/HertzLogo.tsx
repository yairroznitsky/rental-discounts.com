
import React from 'react';

interface LogoProps {
  className?: string;
}

export const HertzLogo = ({ className = "w-full h-full" }: LogoProps) => (
  <svg
    className={className}
    width="500"
    height="248"
    viewBox="0 0 500 248"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      href="https://upload.wikimedia.org/wikipedia/commons/3/3e/Hertz-Logo.svg"
      width="500"
      height="248"
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>

);
