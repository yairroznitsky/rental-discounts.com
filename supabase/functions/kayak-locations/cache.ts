
// Cache management
export const sessionCache = new Map();
export const responseCache = new Map();

export function getCachedResponse(cacheKey: string) {
  const cached = responseCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < 180000) { // 3 minutes
    return cached.data;
  }
  return null;
}

export function setCachedResponse(cacheKey: string, data: any) {
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}
