
import { isIATACode } from './utils.ts';

export async function transformKayakData(data: any, searchTerm: string) {
  console.log('Kayak API: Transforming data for', searchTerm, ':', JSON.stringify(data).substring(0, 500));
  
  let locations = [];
  
  // Enhanced data structure fallbacks - handle more KAYAK response formats
  if (Array.isArray(data)) {
    locations = data;
  } else if (data.suggestions && Array.isArray(data.suggestions)) {
    locations = data.suggestions;
  } else if (data.results && Array.isArray(data.results)) {
    locations = data.results;
  } else if (data.data && Array.isArray(data.data)) {
    locations = data.data;
  } else if (data.locations && Array.isArray(data.locations)) {
    locations = data.locations;
  } else {
    console.log('Kayak API: Unknown data structure, no locations found');
    return [];
  }

  const isIATA = isIATACode(searchTerm);
  console.log('Kayak API: Processing', locations.length, 'raw locations, isIATA:', isIATA);

  let transformedLocations = [];
  
  for (let i = 0; i < Math.min(locations.length, 15); i++) {
    const item = locations[i];
    
    console.log('Kayak API: Processing item:', JSON.stringify(item).substring(0, 300));
    
    // Enhanced field mapping with correct API field names
    const name = item.displayname || item.smartyDisplay || item.name || item.shortdisplayname || item.locationname || '';
    const city = item.cityname || item.cityonly || item.city || item.locationname || item.region || '';
    const country = item.country || item.countryName || item.countryCode || '';
    
    // Map airport codes correctly
    const code = item.ap || item.apicode || item.kayakId || item.code || item.iata || item.iataCode || item.airportCode || '';
    
    // Map location type correctly
    let type = item.loctype || item.kayakType || item.type || 'location';
    
    // Convert API type codes to readable types
    switch (type.toLowerCase()) {
      case 'ap':
        type = 'airport';
        break;
      case 'city':
        type = 'city';
        break;
      default:
        type = 'location';
    }
    
    // Generate compound ID using proper API fields
    const compoundId = generateCompoundId(item, code, type, i);
    
    const location = {
      id: compoundId,
      name: item.name || item.cityonly || item.airportname || name.split(',')[0] || '',
      displayName: name,
      city: item.cityonly || city.split(',')[0] || '',
      country,
      code,
      type,
      iconUrl: null // Skip icons for speed
    };

    console.log('Kayak API: Transformed location:', JSON.stringify(location));

    // Less restrictive filtering - allow more results through
    if (name && name.length > 0) {
      if (isIATA) {
        // For IATA searches, include airports and any location with matching code
        if (code === searchTerm.toUpperCase() || 
            name.toUpperCase().includes(searchTerm.toUpperCase()) ||
            type === 'airport') {
          transformedLocations.push(location);
        }
      } else {
        // For non-IATA searches, include all valid locations
        transformedLocations.push(location);
      }
    }
  }

  console.log('Kayak API: Filtered to', transformedLocations.length, 'valid locations');

  // For IATA searches, prioritize exact matches but don't limit to just one
  if (isIATA && transformedLocations.length > 0) {
    const exactMatch = transformedLocations.find(loc => loc.code === searchTerm.toUpperCase());
    if (exactMatch) {
      console.log('Kayak API: Found exact IATA match, prioritizing it');
      // Put exact match first, keep others
      transformedLocations = [exactMatch, ...transformedLocations.filter(loc => loc.code !== searchTerm.toUpperCase())];
    }
    // Limit IATA results to top 5 for better UX
    transformedLocations = transformedLocations.slice(0, 5);
  }

  return transformedLocations;
}

function generateCompoundId(item: any, code: string, type: string, index: number): string {
  // Extract numeric ID from various possible sources
  let numericId = '';
  
  // Try to get numeric ID from multiple sources, including API-specific fields
  if (item.placeID && /^\d+$/.test(item.placeID.toString())) {
    numericId = item.placeID.toString();
  } else if (item.indexId && /^\d+$/.test(item.indexId.toString())) {
    numericId = item.indexId.toString();
  } else if (item.cid && /^\d+$/.test(item.cid.toString())) {
    numericId = item.cid.toString();
  } else if (item.ctid && /^\d+$/.test(item.ctid.toString())) {
    numericId = item.ctid.toString();
  } else if (item.id && /^\d+$/.test(item.id.toString())) {
    numericId = item.id.toString();
  } else if (item.kayakId && /^\d+$/.test(item.kayakId.toString())) {
    numericId = item.kayakId.toString();
  } else if (item.id && typeof item.id === 'string') {
    // Try to extract numbers from string IDs
    const match = item.id.match(/\d+/);
    if (match) {
      numericId = match[0];
    }
  }
  
  // Generate type prefix
  let typePrefix = 'l'; // default for location
  switch (type.toLowerCase()) {
    case 'airport':
      typePrefix = 'a';
      break;
    case 'city':
      typePrefix = 'c';
      break;
    case 'hotel':
      typePrefix = 'h';
      break;
    case 'region':
      typePrefix = 'r';
      break;
  }
  
  // Use code if available, otherwise use a generic identifier
  const locationCode = code ? code.toLowerCase() : `loc${index}`;
  
  // Create compound ID - use a consistent format
  if (numericId) {
    const compoundId = `${locationCode}-${typePrefix}${numericId}`;
    console.log('Kayak API: Generated compound ID:', compoundId, 'for', item.name || item.displayname || 'unknown');
    return compoundId;
  } else {
    // Fallback for items without numeric IDs - use a default range
    const fallbackId = `${locationCode}-${typePrefix}${9000 + index}`;
    console.log('Kayak API: Generated fallback ID:', fallbackId, 'for', item.name || item.displayname || 'unknown');
    return fallbackId;
  }
}
