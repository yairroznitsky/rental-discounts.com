
import { useState, useRef } from 'react';
import { KayakLocation } from '@/types/location';
import { getCachedResult, setCachedResult } from '@/utils/locationCache';
import { ErrorLoggingService } from '@/services/errorLoggingService';

// Convert RentalLocation from API to KayakLocation for UI
const convertToKayakLocation = (rentalLocation: Record<string, unknown>): KayakLocation => ({
  id: rentalLocation.id,
  name: rentalLocation.name,
  displayName: rentalLocation.displayName,
  city: rentalLocation.city || '',
  country: rentalLocation.country || '',
  code: rentalLocation.code || '',
  type: rentalLocation.type || 'location',
  iconUrl: rentalLocation.iconUrl,
});

export const useLocationSearch = () => {
  const [locations, setLocations] = useState<KayakLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const searchLocations = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setLocations([]);
      setError(null);
      setNoResults(false);
      return;
    }

    console.log('LocationSearch: Starting search for', searchTerm);

    // Check browser cache first
    const cachedResult = getCachedResult(searchTerm);
    if (cachedResult) {
      console.log('LocationSearch: Using cached result for', searchTerm);
      const convertedResults = cachedResult.map(convertToKayakLocation);
      setLocations(convertedResults);
      setError(null);
      setNoResults(convertedResults.length === 0);
      setIsLoading(false);
      return;
    }

    // Fetch from Kayak API
    setIsLoading(true);
    setError(null);
    setNoResults(false);
    
    try {
      console.log('LocationSearch: Fetching from Kayak API for', searchTerm);
      
      const functionUrl = `https://vbtmydsmqlkzfmbcmfxb.supabase.co/functions/v1/kayak-locations?q=${encodeURIComponent(searchTerm)}`;
      
      const response = await fetch(functionUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidG15ZHNtcWxremZtYmNtZnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTIxNzMsImV4cCI6MjA2NzM2ODE3M30.RANxc31cwdBp3o26XVuBTp11IWE_HcW0oI9ITsJekdo`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('LocationSearch: API returned', data);

      if (data.error) {
        throw new Error(data.error);
      }

      const searchResults = Array.isArray(data) ? data : [];
      const convertedResults = searchResults.map(convertToKayakLocation);
      
      // Cache the result
      setCachedResult(searchTerm, searchResults);
      
      setLocations(convertedResults);
      setNoResults(convertedResults.length === 0);
      
    } catch (error) {
      console.error('LocationSearch: Error fetching locations:', error);
      
      // Log the error to Supabase
      await ErrorLoggingService.logNetworkError(
        "Location Search API Failed",
        error instanceof Error ? error.message : 'Failed to fetch locations',
        {
          component: 'useLocationSearch',
          function: 'searchLocations',
          search_term: searchTerm,
          api_endpoint: 'kayak-locations'
        }
      );
      
      setError(error instanceof Error ? error.message : 'Failed to fetch locations');
      setLocations([]);
      setNoResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = (searchTerm: string) => {
    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Check cache first for immediate response
    const cachedResult = getCachedResult(searchTerm);
    if (cachedResult) {
      searchLocations(searchTerm);
      return;
    }

    // Debounced search for new terms
    debounceRef.current = setTimeout(() => {
      searchLocations(searchTerm);
    }, 150);
  };

  return {
    locations,
    isLoading,
    error,
    noResults,
    searchLocations: debouncedSearch
  };
};
