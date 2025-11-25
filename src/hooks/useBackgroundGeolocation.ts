import { useState, useEffect } from 'react';
import { getClosestCityFromIP } from '@/services/ipLocationService';
import { RentalLocation } from '@/types/partner';

export const useBackgroundGeolocation = () => {
  const [defaultLocation, setDefaultLocation] = useState<RentalLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocationInBackground = async () => {
      if (hasAttempted) return;
      
      setIsLoading(true);
      setError(null);
      setHasAttempted(true);
      
      try {
        console.log('Background Geolocation: Starting IP location lookup...');
        const ipLocation = await getClosestCityFromIP();
        
        if (ipLocation) {
          console.log('Background Geolocation: IP location found:', ipLocation);
          const locationObj: RentalLocation = {
            id: `${ipLocation.iataCode.toLowerCase()}-ip`,
            name: ipLocation.name,
            city: ipLocation.name,
            country: ipLocation.country,
            code: ipLocation.iataCode,
            type: 'airport',
            displayName: `${ipLocation.name}, ${ipLocation.country}`
          };
          
          console.log('Background Geolocation: Setting default location:', locationObj);
          setDefaultLocation(locationObj);
        } else {
          console.warn('Background Geolocation: No IP location found');
          setError('Unable to determine location');
        }
      } catch (error) {
        console.error('Background Geolocation: Error:', error);
        console.error('Background Geolocation: Error details:', error instanceof Error ? error.stack : 'No stack trace');
        setError(error instanceof Error ? error.message : 'Location service error');
      } finally {
        setIsLoading(false);
      }
    };

    getLocationInBackground();
  }, [hasAttempted]);

  return {
    defaultLocation,
    isLoading,
    hasAttempted,
    error
  };
}; 