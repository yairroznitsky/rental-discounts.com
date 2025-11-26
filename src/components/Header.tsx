
import React from 'react';
import { LanguageToggle } from './LanguageToggle';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo on far left */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src="/logo-primary.png" 
              alt="RentalDiscounts" 
              className="h-4 lg:h-6 w-auto"
            />
          </div>
          
          {/* Language picker in middle-right area */}
          <div className="flex items-center ml-auto">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
