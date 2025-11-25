import React from 'react';
import { SearchForm } from './SearchForm';
import { useLanguage } from '@/hooks/useLanguage';
import { useFormPosition } from '@/hooks/useFormPosition';
import { CarRentalCarousel } from './CarRentalCarousel';
import { cn } from '@/lib/utils';

export const SearchHero = () => {
  const { t } = useLanguage();
  const { isFormPushedUp } = useFormPosition();

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Desktop Background Image */}
      <div className="absolute inset-0 hidden lg:block">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/coastal-mustang-background.png')`
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Desktop Title Section */}
      <div className="container mx-auto max-w-7xl text-center pt-12 md:pt-16 px-4 hidden lg:block relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {t('heroMainTitle')}
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Desktop Search Form */}
      <div className="flex-1 items-center justify-center px-4 pb-6 hidden lg:flex relative z-20">
        <div className="w-full max-w-7xl">
          <div className="bg-[#E5EAEA] rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 backdrop-blur-sm bg-[#E5EAEA]/95">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Desktop Car Rental Companies Carousel */}
      <div className="px-4 pb-6 hidden lg:block relative z-10">
        <div className="container mx-auto max-w-7xl">
          <CarRentalCarousel />
        </div>
      </div>

      {/* Mobile Version - Simplified */}
      <div className="lg:hidden bg-[#219f61] min-h-screen flex flex-col">
        <div className={cn(
          "container mx-auto max-w-lg text-center px-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "pt-1" : "pt-8"
        )}>
          <h1 className={cn(
            "font-bold mb-2 text-white transition-all duration-300 ease-in-out",
            isFormPushedUp ? "text-xl" : "text-3xl"
          )}>
            {t('heroMainTitle')}
          </h1>
          <p className={cn(
            "text-white/90 mb-4 transition-all duration-300 ease-in-out",
            isFormPushedUp ? "text-sm" : "text-base"
          )}>
            {t('heroSubtitle')}
          </p>
        </div>
        
        <div className={cn(
          "flex items-center justify-center px-2 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "flex-1" : "flex-1"
        )}>
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-xl shadow-2xl p-4 border-4 border-[#219f61]">
              <SearchForm />
            </div>
          </div>
        </div>
        
        {/* Benefits - Hide when form is pushed up */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          <ul className="space-y-2 text-white text-sm">
            <li>✓ Get up to 30% off</li>
            <li>✓ Free cancellations</li>
            <li>✓ Compare over 200 car rental companies</li>
            <li>✓ Exclusive discounts</li>
          </ul>
        </div>
        
        {/* Carousel - Hide when form is pushed up */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-300 ease-in-out",
          isFormPushedUp ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          <CarRentalCarousel />
        </div>
      </div>
    </section>
  );
};
