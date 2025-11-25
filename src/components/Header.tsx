
import React from 'react';
import { Car } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center">
          <img 
            src="/logo-inverse-2025-10-20.png" 
            alt="RentalBookings" 
            className="h-6 sm:h-8 md:h-10 w-auto"
          />
        </div>
      </div>
    </header>
  );
};
