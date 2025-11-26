import React from 'react';
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
import { useLanguage } from '@/hooks/useLanguage';

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

export const CarRentalCompanies = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Heading - Desktop only */}
      <div className="hidden lg:block text-center mb-6 lg:mb-8">
        <p className="text-lg lg:text-2xl text-gray-700 font-semibold">
          {t('brandsHeading')}
        </p>
      </div>
      
      {/* Brands in one line */}
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
        className="w-full cursor-pointer"
      >
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-2 lg:gap-2">
          {carRentalCompanies.map((company, index) => {
            const LogoComponent = company.component;
            return (
              <div key={index} className="flex-1 min-w-[80px] max-w-[120px] lg:max-w-none lg:flex-1">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 lg:p-2 border border-gray-100 hover:border-gray-200 group flex items-center justify-center aspect-square lg:aspect-auto lg:h-20">
                  <div className="w-full h-full flex items-center justify-center" aria-label={`${company.name} logo`}>
                    <LogoComponent 
                      className="w-full h-auto max-h-12 md:max-h-16 lg:max-h-14 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          And many more rental companies available
        </p>
      </div>
    </div>
  );
};

