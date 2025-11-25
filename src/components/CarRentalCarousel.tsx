
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { HertzLogo } from './svg-logos/HertzLogo';
import { AvisLogo } from './svg-logos/AvisLogo';
import { BudgetLogo } from './svg-logos/BudgetLogo';
import { EnterpriseLogo } from './svg-logos/EnterpriseLogo';
import { AlamoLogo } from './svg-logos/AlamoLogo';
import { NationalLogo } from './svg-logos/NationalLogo';
import { ThriftyLogo } from './svg-logos/ThriftyLogo';
import { DollarLogo } from './svg-logos/DollarLogo';
import { SixtLogo } from './svg-logos/SixtLogo';
import { EuropcarLogo } from './svg-logos/EuropcarLogo';

const carRentalCompanies = [
  { 
    name: 'Hertz',
    component: HertzLogo,
    color: '#FFC72C'
  },
  { 
    name: 'Avis',
    component: AvisLogo,
    color: '#ED1C24'
  },
  { 
    name: 'Budget',
    component: BudgetLogo,
    color: '#FF6600'
  },
  { 
    name: 'Enterprise',
    component: EnterpriseLogo,
    color: '#00A651'
  },
  { 
    name: 'Alamo',
    component: AlamoLogo,
    color: '#0066CC'
  },
  { 
    name: 'National',
    component: NationalLogo,
    color: '#00A651'
  },
  { 
    name: 'Thrifty',
    component: ThriftyLogo,
    color: '#0066CC'
  },
  { 
    name: 'Dollar',
    component: DollarLogo,
    color: '#00A651'
  },
  { 
    name: 'Sixt',
    component: SixtLogo,
    color: '#FF5F00'
  },
  { 
    name: 'Europcar',
    component: EuropcarLogo,
    color: '#0066CC'
  }
];

export const CarRentalCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 2000, 
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
  );

  return (
    <div
      role="button"
      aria-label="Start search"
      onClick={() => {
        const btn = document.querySelector<HTMLButtonElement>('.search-button');
        if (btn && !btn.disabled) btn.click();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const btn = document.querySelector<HTMLButtonElement>('.search-button');
          if (btn && !btn.disabled) btn.click();
        }
      }}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {carRentalCompanies.map((company, index) => {
            const LogoComponent = company.component;
            return (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-24 h-20 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2" aria-label={`${company.name} logo`}>
                        <LogoComponent 
                          className="w-full h-full transition-all duration-300 group-hover:brightness-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          And many more rental companies available
        </p>
      </div>
    </div>
  );
};
