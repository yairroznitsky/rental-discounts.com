
import React from 'react';
import { Car } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-[#219f61] text-white">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center">
          <img 
            src="/logo-inverse.png?v=3" 
            alt="RentalDiscounts" 
            className="h-6 sm:h-8 md:h-10 w-auto"
          />
        </div>
      </div>
    </header>
  );
};
