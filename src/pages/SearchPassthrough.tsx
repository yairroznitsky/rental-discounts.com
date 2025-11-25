import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useDeepLinkHandler } from '@/hooks/useDeepLinkHandler';
import { useBackgroundGeolocation } from '@/hooks/useBackgroundGeolocation';
import { SearchParams, RentalLocation } from '@/types/partner';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { LandingTrackingService } from '@/services/landingTrackingService';

const SearchPassthrough: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { defaultLocation, isLoading: isLocationLoading } = useBackgroundGeolocation();
  const { generateNewTabOnlyDeepLink, isGenerating } = useDeepLinkHandler();
  
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    const processSearch = async () => {
      // Prevent multiple executions
      if (hasProcessed) {
        console.log('SearchPassthrough: Already processed, skipping...');
        return;
      }
      
      try {
        setIsProcessing(true);
        setError(null);
        setHasProcessed(true);

        // Debug: Log all URL parameters
        console.log('SearchPassthrough: All URL parameters:', Object.fromEntries(searchParams.entries()));
        console.log('SearchPassthrough: Current URL:', window.location.href);

        // Check if coming from rent-off.com or flight-off.com and extract landing_id
        const referrer = document.referrer;
        const landingId = searchParams.get('landing_id');
        const isFromRentOff = referrer.includes('rent-off.com');
        const isFromFlightOff = referrer.includes('flight-off.com');
        
        console.log('SearchPassthrough: Referrer:', referrer);
        console.log('SearchPassthrough: Landing ID from URL:', landingId);
        console.log('SearchPassthrough: Is from rent-off.com:', isFromRentOff);
        console.log('SearchPassthrough: Is from flight-off.com:', isFromFlightOff);

        // If coming from rent-off.com or flight-off.com with landing_id, use it instead of creating a new one
        if ((isFromRentOff || isFromFlightOff) && landingId) {
          console.log('SearchPassthrough: Using landing_id from external site:', landingId);
          LandingTrackingService.setExistingLandingId(landingId);
        }

        // Extract search parameters from URL
        const pickup = searchParams.get('pickup') || '';
        const dropoff = searchParams.get('dropoff') || '';
        const pickupDate = searchParams.get('pickupDate') || '';
        const dropoffDate = searchParams.get('dropoffDate') || '';
        const pickupTime = searchParams.get('pickupTime') || '';
        const dropoffTime = searchParams.get('dropoffTime') || '';
        const differentDropoff = searchParams.get('differentDropoff') === 'true';

        console.log('SearchPassthrough: Extracted parameters:', {
          pickup, dropoff, pickupDate, dropoffDate, pickupTime, dropoffTime, differentDropoff
        });

        // Validate required parameters
        if (!pickup || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
          console.error('SearchPassthrough: Missing required parameters:', {
            pickup: !!pickup,
            pickupDate: !!pickupDate,
            dropoffDate: !!dropoffDate,
            pickupTime: !!pickupTime,
            dropoffTime: !!dropoffTime
          });
          throw new Error('Missing required search parameters');
        }

        // Parse location data if available
        let pickupLocation: RentalLocation | null = null;
        let dropoffLocation: RentalLocation | null = null;

        const pickupLocationData = searchParams.get('pickupLocation');
        const dropoffLocationData = searchParams.get('dropoffLocation');

        if (pickupLocationData) {
          try {
            pickupLocation = JSON.parse(decodeURIComponent(pickupLocationData));
          } catch (e) {
            console.warn('Failed to parse pickup location data:', e);
          }
        }

        if (dropoffLocationData && differentDropoff) {
          try {
            dropoffLocation = JSON.parse(decodeURIComponent(dropoffLocationData));
          } catch (e) {
            console.warn('Failed to parse dropoff location data:', e);
          }
        }

        // Create search parameters object
        const searchParamsObj: SearchParams = {
          pickup,
          dropoff: differentDropoff ? dropoff : pickup,
          pickupDate,
          dropoffDate,
          pickupTime,
          dropoffTime,
          pickupLocation,
          dropoffLocation
        };

        console.log('SearchPassthrough: Processing search with params:', searchParamsObj);

        // Wait a moment to show the loading state
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate and open new tab deep link
        await generateNewTabOnlyDeepLink(searchParamsObj, pickupLocation, defaultLocation);

      } catch (err) {
        console.error('SearchPassthrough: Error processing search:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while processing your search');
      } finally {
        setIsProcessing(false);
      }
    };

    processSearch();
  }, [searchParams, generateNewTabOnlyDeepLink, defaultLocation, hasProcessed]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    setHasProcessed(false);
    setError(null);
    window.location.reload();
  };

  if (isLocationLoading || isProcessing || isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          {/* Logo/Brand - Sleeker design */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white tracking-tight">
                  rental-bookings
                </span>
              </div>
            </div>
            <div className="w-32 h-1 bg-white/20 rounded-full mx-auto"></div>
          </div>
          
          {/* Loading Text - Sleeker */}
          <div className="space-y-6">
            <p className="text-white text-xl font-medium tracking-wide">
              {t('searchingForBestDeals')}
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            <div className="p-4 bg-red-50 rounded-2xl">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Search Error
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {error}
            </p>
            <div className="flex space-x-3 pt-2">
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="flex items-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </Button>
              <Button 
                onClick={handleRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SearchPassthrough;
