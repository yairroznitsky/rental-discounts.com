
import React from 'react';

interface LogoProps {
  className?: string;
}

export const AvisLogo = ({ className = "w-full h-full" }: LogoProps) => (
<svg
  className={className}
  width="200"
  height="80"
  viewBox="0 0 200 80"
  xmlns="http://www.w3.org/2000/svg"
>
  <image
    href="https://upload.wikimedia.org/wikipedia/commons/f/fd/Avis_logo.svg"
    width="200"
    height="80"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>

);
