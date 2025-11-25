
import { KayakLocation } from '@/types/location';

// Browser-side cache for frequently searched locations
const locationCache = new Map<string, { data: KayakLocation[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedResult = (searchTerm: string): KayakLocation[] | null => {
  const cacheKey = searchTerm.toLowerCase();
  const cached = locationCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('LocationCache: Using cached result for', searchTerm);
    return cached.data;
  }
  
  return null;
};

export const setCachedResult = (searchTerm: string, data: KayakLocation[]) => {
  const cacheKey = searchTerm.toLowerCase();
  locationCache.set(cacheKey, { data, timestamp: Date.now() });
  console.log('LocationCache: Cached result for', searchTerm, data.length, 'items');
};
