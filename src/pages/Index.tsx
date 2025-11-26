

import React from 'react';
import { SearchHero } from '@/components/SearchHero';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarRentalCompanies } from '@/components/CarRentalCompanies';

console.log('Index: Index page module loading');

const Index = () => {
  console.log('Index: Rendering Index page');
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchHero />
        {/* Desktop Car Rental Companies - Below the fold */}
        <div className="hidden lg:block bg-white py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <CarRentalCompanies />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

console.log('Index: Index component defined');

export default Index;
