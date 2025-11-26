import React from 'react';
import { SearchForm } from './SearchForm';
import { useLanguage } from '@/hooks/useLanguage';
import { useFormPosition } from '@/hooks/useFormPosition';
import { CarRentalCompanies } from './CarRentalCompanies';
import { cn } from '@/lib/utils';

export const SearchHero = () => {
  const { t } = useLanguage();
  const { isFormPushedUp } = useFormPosition();

  return (
    <section className="relative min-h-screen lg:min-h-[65vh] flex flex-col">
      {/* Desktop Background Image */}
      <div className="absolute inset-0 hidden lg:block">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/highway-sunset-background.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Desktop Title Section */}
      <div className="container mx-auto max-w-7xl text-center pt-0 lg:pt-8 px-4 hidden lg:block relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 text-white drop-shadow-lg">
          {t('heroMainTitle')}
        </h1>
      </div>

      {/* Desktop Search Form */}
      <div className="flex-1 items-center justify-center px-4 pb-6 hidden lg:flex relative z-20">
        <div className="w-full max-w-7xl">
          <div className="bg-[#E5EAEA] rounded-none shadow-2xl p-6 md:p-8 border border-gray-100 backdrop-blur-sm bg-[#E5EAEA]/95">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Desktop Benefits - At bottom border */}
      <div className="hidden lg:block relative z-10 pb-6">
        <div className="container mx-auto max-w-7xl px-4">
          <ul className="flex flex-wrap justify-center gap-6 text-white drop-shadow-md">
            <li className="text-sm md:text-base font-medium">✓ {t('heroBenefit1')}</li>
            <li className="text-sm md:text-base font-medium">✓ {t('heroBenefit2')}</li>
            <li className="text-sm md:text-base font-medium">✓ {t('heroBenefit3')}</li>
            <li className="text-sm md:text-base font-medium">✓ {t('heroBenefit4')}</li>
          </ul>
        </div>
      </div>

      {/* Mobile Version - Simplified */}
      <div className="lg:hidden bg-white min-h-screen flex flex-col">
        <div className={cn(
          "container mx-auto max-w-lg text-center px-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "pt-1" : "pt-8"
        )}>
          <h1 className={cn(
            "font-bold mb-4 text-foreground transition-all duration-300 ease-in-out",
            isFormPushedUp ? "text-xl" : "text-3xl"
          )}>
            {t('heroMainTitle')}
          </h1>
        </div>
        
        <div className={cn(
          "flex items-center justify-center px-2 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "flex-1" : "flex-1"
        )}>
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-none shadow-2xl p-4 border-4 border-[#219f61]">
              <SearchForm />
            </div>
          </div>
        </div>
        
        {/* Benefits - Hide when form is pushed up */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          <ul className="space-y-2 text-foreground text-sm">
            <li>✓ {t('heroBenefit1')}</li>
            <li>✓ {t('heroBenefit2')}</li>
            <li>✓ {t('heroBenefit3')}</li>
            <li>✓ {t('heroBenefit4')}</li>
          </ul>
        </div>
        
        {/* Car Rental Companies - Hide when form is pushed up */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          <CarRentalCompanies />
        </div>
      </div>
    </section>
  );
};
