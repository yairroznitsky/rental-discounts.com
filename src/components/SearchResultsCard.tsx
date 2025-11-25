
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface SearchData {
  pickup: string;
  dropoff: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
}

interface SearchResultsCardProps {
  searchData: SearchData;
}

export const SearchResultsCard: React.FC<SearchResultsCardProps> = ({ searchData }) => {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{t('yourSearch')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('pickupLocation')}</p>
              <p className="text-gray-900">{searchData.pickup || t('notSpecified')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-[#219f61] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('pickupDate')}</p>
              <p className="text-gray-900">{formatDate(searchData.pickupDate) || t('notSpecified')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('pickupTime')}</p>
              <p className="text-gray-900">{searchData.pickupTime || t('notSpecified')}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('dropoffLocation')}</p>
              <p className="text-gray-900">{searchData.dropoff || t('notSpecified')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-[#219f61] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('dropoffDate')}</p>
              <p className="text-gray-900">{formatDate(searchData.dropoffDate) || t('notSpecified')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-600">{t('dropoffTime')}</p>
              <p className="text-gray-900">{searchData.dropoffTime || t('notSpecified')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
