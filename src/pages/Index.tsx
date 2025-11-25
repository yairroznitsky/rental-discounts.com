

import React from 'react';
import { SearchHero } from '@/components/SearchHero';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

console.log('Index: Index page module loading');

const Index = () => {
  console.log('Index: Rendering Index page');
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchHero />
      </main>
      <Footer />
    </div>
  );
};

console.log('Index: Index component defined');

export default Index;
