
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchResultsCard } from '@/components/SearchResultsCard';
import { useLanguage } from '@/hooks/useLanguage';

const Results = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  
  const searchData = {
    pickup: searchParams.get('pickup') || '',
    dropoff: searchParams.get('dropoff') || '',
    pickupDate: searchParams.get('pickupDate') || '',
    dropoffDate: searchParams.get('dropoffDate') || '',
    pickupTime: searchParams.get('pickupTime') || '',
    dropoffTime: searchParams.get('dropoffTime') || ''
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              {t('searchResults')}
            </h1>
            <p className="text-gray-600">
              {t('searchResultsSubtitle')}
            </p>
          </div>
          
          <SearchResultsCard searchData={searchData} />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">{t('carImagePlaceholder')}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Sample Car {i}</h3>
                <p className="text-gray-600 mb-3">Compact • Automatic • 4 seats</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    $45/day
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                    {t('selectCar')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
