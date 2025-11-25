
import { useState, useRef } from 'react';
import { RentalLocation } from '@/types/partner';
import { KayakLocation } from '@/types/location';
import { getCachedResult, setCachedResult } from '@/utils/locationCache';
import { partnerService } from '@/services/PartnerService';

// Convert KayakLocation to RentalLocation for backward compatibility
const convertToRentalLocation = (kayakLocation: KayakLocation): RentalLocation => ({
  id: kayakLocation.id,
  name: kayakLocation.name,
  displayName: kayakLocation.displayName,
  city: kayakLocation.city || '',
  country: kayakLocation.country || '',
  code: kayakLocation.code || '',
  type: kayakLocation.type || '',
  iconUrl: kayakLocation.iconUrl,
});

export const usePartnerLocationSearch = () => {
  const [locations, setLocations] = useState<RentalLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const searchLocations = async (searchTerm: string, partnerName?: string) => {
    if (searchTerm.length < 2) {
      setLocations([]);
      setError(null);
      setNoResults(false);
      return;
    }

    console.log('PartnerLocationSearch: Starting search for', searchTerm, 'with partner', partnerName || 'default');

    // Check browser cache
    const cacheKey = partnerName ? `${partnerName}_${searchTerm}` : searchTerm;
    const cachedResult = getCachedResult(cacheKey);
    if (cachedResult) {
      const convertedResult = cachedResult.map(convertToRentalLocation);
      setLocations(convertedResult);
      setError(null);
      setNoResults(convertedResult.length === 0);
      setIsLoading(false);
      return;
    }

    // Fetch from partner service
    setIsLoading(true);
    setError(null);
    setNoResults(false);
    
    try {
      const searchResults = await partnerService.searchLocations(searchTerm, partnerName);
      
      // Cache the result
      setCachedResult(cacheKey, searchResults);
      
      setLocations(searchResults);
      setNoResults(searchResults.length === 0);
      
    } catch (error) {
      console.error('PartnerLocationSearch: Error fetching locations:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch locations');
      setLocations([]);
      setNoResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = (searchTerm: string, partnerName?: string) => {
    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Immediate response for cached results
    const cacheKey = partnerName ? `${partnerName}_${searchTerm}` : searchTerm;
    const cachedResult = getCachedResult(cacheKey);
    
    if (cachedResult) {
      searchLocations(searchTerm, partnerName);
      return;
    }

    // Reduced debounce time for better UX
    debounceRef.current = setTimeout(() => {
      searchLocations(searchTerm, partnerName);
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
