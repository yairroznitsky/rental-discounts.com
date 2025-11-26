import React from 'react';

export const WorldMapBackground = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 2000 1000"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background base – keep it white like the reference */}
      <rect width="2000" height="1000" fill="#ffffff" opacity="1" />
      
      {/* Latitude/Longitude grid for subtle global feel */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i) => (
        <line
          key={`lon-${i}`}
          x1={(i * 2000) / 20}
          y1="0"
          x2={(i * 2000) / 20}
          y2="1000"
          stroke="#0ea5e9"
          strokeWidth="0.5"
          opacity="0.06"
        />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={`lat-${i}`}
          x1="0"
          y1={(i * 1000) / 10}
          x2="2000"
          y2={(i * 1000) / 10}
          stroke="#0ea5e9"
          strokeWidth="0.5"
          opacity="0.06"
        />
      ))}
      
      {/* North America */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        {/* Canada/USA */}
        <path d="M 300 150 L 450 140 L 550 160 L 600 200 L 620 250 L 610 300 L 590 340 L 550 360 L 500 355 L 450 340 L 400 320 L 360 290 L 340 250 L 330 200 L 310 160 Z" />
        {/* Mexico/Central America */}
        <path d="M 350 340 L 420 350 L 450 380 L 455 420 L 440 450 L 410 460 L 380 450 L 360 420 L 355 380 Z" />
      </g>
      
      {/* South America */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        <path d="M 400 500 L 480 510 L 540 550 L 570 620 L 565 720 L 540 780 L 500 800 L 460 795 L 430 770 L 410 720 L 395 660 L 390 600 L 395 540 Z" />
      </g>
      
      {/* Europe */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        <path d="M 900 200 L 1000 190 L 1100 210 L 1130 260 L 1120 310 L 1090 340 L 1050 350 L 1000 345 L 950 330 L 920 300 L 900 250 Z" />
        {/* British Isles */}
        <path d="M 950 220 L 970 215 L 980 230 L 975 245 L 965 250 L 955 245 L 950 235 Z" />
        {/* Scandinavia */}
        <path d="M 1050 150 L 1100 140 L 1130 170 L 1140 210 L 1120 240 L 1090 245 L 1065 230 L 1055 200 L 1052 170 Z" />
        {/* Iberian Peninsula */}
        <path d="M 900 300 L 940 295 L 950 320 L 945 345 L 930 355 L 915 350 L 905 330 Z" />
        {/* Italy */}
        <path d="M 1070 320 L 1100 315 L 1110 380 L 1105 420 L 1085 425 L 1075 400 L 1072 350 Z" />
      </g>
      
      {/* Africa */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        <path d="M 1050 400 L 1150 390 L 1250 410 L 1280 460 L 1270 560 L 1250 640 L 1210 700 L 1160 720 L 1110 715 L 1070 680 L 1040 620 L 1025 550 L 1020 480 L 1030 430 Z" />
        {/* Madagascar */}
        <path d="M 1320 600 L 1360 595 L 1370 630 L 1365 660 L 1345 665 L 1330 645 L 1325 620 Z" />
      </g>
      
      {/* Asia */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        {/* Main Asia */}
        <path d="M 1200 150 L 1500 140 L 1700 160 L 1800 200 L 1820 280 L 1800 360 L 1750 420 L 1680 440 L 1600 430 L 1520 400 L 1450 360 L 1380 320 L 1320 280 L 1280 240 L 1250 200 L 1220 170 Z" />
        {/* Middle East */}
        <path d="M 1150 380 L 1250 370 L 1280 400 L 1275 440 L 1250 460 L 1210 465 L 1180 445 L 1160 415 Z" />
        {/* India */}
        <path d="M 1400 420 L 1480 410 L 1510 450 L 1515 510 L 1495 550 L 1460 560 L 1430 540 L 1410 500 L 1405 450 Z" />
        {/* China */}
        <path d="M 1450 300 L 1600 290 L 1680 320 L 1710 380 L 1700 430 L 1660 450 L 1600 445 L 1550 420 L 1500 380 L 1470 340 Z" />
        {/* Japan */}
        <path d="M 1760 340 L 1820 335 L 1835 360 L 1830 385 L 1810 390 L 1785 375 L 1770 355 Z" />
        {/* Southeast Asia */}
        <path d="M 1500 520 L 1580 515 L 1620 545 L 1630 590 L 1610 620 L 1570 630 L 1540 610 L 1510 575 L 1505 545 Z" />
      </g>
      
      {/* Australia */}
      <g opacity="0.9" fill="#FACC15" stroke="#F59E0B" strokeWidth="1">
        <path d="M 1650 680 L 1750 675 L 1800 700 L 1820 740 L 1805 780 L 1770 795 L 1720 790 L 1680 765 L 1660 730 L 1655 700 Z" />
        {/* New Zealand */}
        <path d="M 1850 780 L 1880 775 L 1890 810 L 1885 835 L 1865 840 L 1855 820 L 1852 800 Z" />
      </g>
      
      {/* Map pins & connecting routes – blue like the reference */}
      <g opacity="0.9">
        {/* Pins */}
        <circle cx="500" cy="250" r="10" fill="#0ea5e9" />
        <circle cx="1030" cy="270" r="10" fill="#0ea5e9" />
        <circle cx="1500" cy="350" r="10" fill="#0ea5e9" />
        <circle cx="450" cy="650" r="10" fill="#0ea5e9" />
        <circle cx="1160" cy="550" r="10" fill="#0ea5e9" />
        <circle cx="1730" cy="720" r="10" fill="#0ea5e9" />
        <circle cx="1100" cy="550" r="10" fill="#0ea5e9" />

        {/* Dashed flight-style arcs */}
        <path
          d="M500 250 Q 760 160 1030 270"
          fill="none"
          stroke="#6b7280"
          strokeWidth="3"
          strokeDasharray="10 10"
          opacity="0.8"
        />
        <path
          d="M1030 270 Q 1250 260 1500 350"
          fill="none"
          stroke="#6b7280"
          strokeWidth="3"
          strokeDasharray="10 10"
          opacity="0.8"
        />
        <path
          d="M500 250 Q 420 420 450 650"
          fill="none"
          stroke="#6b7280"
          strokeWidth="3"
          strokeDasharray="10 10"
          opacity="0.8"
        />
        <path
          d="M1030 270 Q 1020 380 1100 550"
          fill="none"
          stroke="#6b7280"
          strokeWidth="3"
          strokeDasharray="10 10"
          opacity="0.8"
        />
        <path
          d="M1500 350 Q 1620 420 1730 720"
          fill="none"
          stroke="#6b7280"
          strokeWidth="3"
          strokeDasharray="10 10"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

