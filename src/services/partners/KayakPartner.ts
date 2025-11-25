import { CarRentalPartner, RentalLocation, SearchParams, DeepLinkConfig, ClickTrackingData } from '@/types/partner';
import { supabase } from '@/integrations/supabase/client';
import { generateClickId, parseLocationId } from '@/utils/clickIdGenerator';
import { LandingTrackingService } from '@/services/landingTrackingService';

// Helper functions for Kayak URL formatting according to official documentation
function formatDateTimeForKayak(date: string, time: string): string {
  // Format: YYYY-MM-DD or YYYY-MM-DD-HHh
  // If time is provided and not default (12:00), include it
  if (time && time !== '12:00') {
    const [hours] = time.split(':');
    const hour = parseInt(hours, 10);
    return `${date}-${hour}h`;
  }
  return date;
}

function formatLocationForKayak(locationIdentifier: string): string {
  // According to Kayak docs and user specification:
  // - IATA Code: 3-letter airport codes (e.g., BOS, JFK)
  // - US locations: City-State format (e.g., New-York-City,NY)
  // - Non-US locations: City,Country format (e.g., Barcelona,España)
  
  // If it's a 3-letter code (likely IATA), return as-is
  if (locationIdentifier.length === 3 && /^[A-Z]{3}$/i.test(locationIdentifier)) {
    return locationIdentifier.toUpperCase();
  }
  
  // For city names, determine if it's US or non-US based on the location data
  const isUSLocation = isLocationInUS(locationIdentifier);
  
  if (isUSLocation) {
    // US format: City-State (e.g., New-York-City,NY)
    return formatUSLocation(locationIdentifier);
  } else {
    // Non-US format: City,Country (e.g., Barcelona,España)
    return formatNonUSLocation(locationIdentifier);
  }
}

function isLocationInUS(locationIdentifier: string): boolean {
  // Enhanced heuristic to detect US locations
  // Look for common US state abbreviations, state names, or "United States" in the identifier
  const usIndicators = [
    // State abbreviations
    ',NY', ',CA', ',FL', ',TX', ',IL', ',PA', ',OH', ',GA', ',NC', ',MI',
    ',NJ', ',VA', ',WA', ',AZ', ',MA', ',TN', ',IN', ',MO', ',MD', ',WI',
    ',CO', ',MN', ',SC', ',AL', ',LA', ',KY', ',OR', ',OK', ',CT', ',UT',
    ',IA', ',NV', ',AR', ',MS', ',KS', ',NM', ',NE', ',WV', ',ID', ',HI',
    ',NH', ',ME', ',MT', ',RI', ',DE', ',SD', ',ND', ',AK', ',VT', ',WY',
    ',DC',
    // Full state names
    'New York', 'California', 'Florida', 'Texas', 'Illinois', 'Pennsylvania',
    'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia',
    'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri',
    'Maryland', 'Wisconsin', 'Colorado', 'Minnesota', 'South Carolina', 'Alabama',
    'Louisiana', 'Kentucky', 'Oregon', 'Oklahoma', 'Connecticut', 'Utah',
    'Iowa', 'Nevada', 'Arkansas', 'Mississippi', 'Kansas', 'New Mexico',
    'Nebraska', 'West Virginia', 'Idaho', 'Hawaii', 'New Hampshire', 'Maine',
    'Montana', 'Rhode Island', 'Delaware', 'South Dakota', 'North Dakota',
    'Alaska', 'Vermont', 'Wyoming',
    // Country indicators
    'United States', 'USA', 'US', 'America'
  ];
  
  const lowerIdentifier = locationIdentifier.toLowerCase();
  return usIndicators.some(indicator => 
    lowerIdentifier.includes(indicator.toLowerCase())
  );
}

function formatUSLocation(locationIdentifier: string): string {
  // Format: City-State (e.g., New-York-City,NY)
  const formatted = locationIdentifier
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-,]/g, '') // Keep only word chars, hyphens, and commas
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .replace(/,+/g, ','); // Replace multiple commas with single comma
  
  // Capitalize properly for US format
  if (formatted.includes(',')) {
    const parts = formatted.split(',');
    const cityPart = parts[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('-');
    const statePart = parts[1].toUpperCase(); // State codes should be uppercase
    return `${cityPart},${statePart}`;
  }
  
  // If no comma and no state information, try to infer state for known cities
  const cityStateMap: { [key: string]: string } = {
    'hillsdale': 'MI',
    'new-york': 'NY',
    'los-angeles': 'CA',
    'chicago': 'IL',
    'houston': 'TX',
    'phoenix': 'AZ',
    'philadelphia': 'PA',
    'san-antonio': 'TX',
    'san-diego': 'CA',
    'dallas': 'TX',
    'san-jose': 'CA',
    'austin': 'TX',
    'jacksonville': 'FL',
    'fort-worth': 'TX',
    'columbus': 'OH',
    'charlotte': 'NC',
    'san-francisco': 'CA',
    'indianapolis': 'IN',
    'seattle': 'WA',
    'denver': 'CO',
    'washington': 'DC',
    'boston': 'MA',
    'el-paso': 'TX',
    'nashville': 'TN',
    'detroit': 'MI',
    'oklahoma-city': 'OK',
    'portland': 'OR',
    'las-vegas': 'NV',
    'memphis': 'TN',
    'louisville': 'KY',
    'baltimore': 'MD',
    'milwaukee': 'WI',
    'albuquerque': 'NM',
    'tucson': 'AZ',
    'fresno': 'CA',
    'sacramento': 'CA',
    'atlanta': 'GA',
    'kansas-city': 'MO',
    'long-beach': 'CA',
    'colorado-springs': 'CO',
    'raleigh': 'NC',
    'miami': 'FL',
    'virginia-beach': 'VA',
    'omaha': 'NE',
    'oakland': 'CA',
    'minneapolis': 'MN',
    'tulsa': 'OK',
    'arlington': 'TX',
    'tampa': 'FL',
    'new-orleans': 'LA',
    'wichita': 'KS',
    'cleveland': 'OH',
    'bakersfield': 'CA',
    'aurora': 'CO',
    'anaheim': 'CA',
    'honolulu': 'HI',
    'santa-ana': 'CA',
    'corpus-christi': 'TX',
    'riverside': 'CA',
    'lexington': 'KY',
    'stockton': 'CA',
    'henderson': 'NV',
    'saint-paul': 'MN',
    'st-louis': 'MO',
    'cincinnati': 'OH',
    'pittsburgh': 'PA',
    'greensboro': 'NC',
    'anchorage': 'AK',
    'plano': 'TX',
    'lincoln': 'NE',
    'orlando': 'FL',
    'irvine': 'CA',
    'newark': 'NJ',
    'durham': 'NC',
    'chula-vista': 'CA',
    'toledo': 'OH',
    'fort-wayne': 'IN',
    'st-petersburg': 'FL',
    'laredo': 'TX',
    'jersey-city': 'NJ',
    'chandler': 'AZ',
    'madison': 'WI',
    'lubbock': 'TX',
    'scottsdale': 'AZ',
    'reno': 'NV',
    'buffalo': 'NY',
    'gilbert': 'AZ',
    'glendale': 'AZ',
    'north-las-vegas': 'NV',
    'winston-salem': 'NC',
    'chesapeake': 'VA',
    'norfolk': 'VA',
    'fremont': 'CA',
    'garland': 'TX',
    'irving': 'TX',
    'hialeah': 'FL',
    'richmond': 'VA',
    'boise': 'ID',
    'spokane': 'WA',
    'baton-rouge': 'LA',
    'tacoma': 'WA',
    'san-bernardino': 'CA',
    'grand-rapids': 'MI',
    'huntsville': 'AL',
    'salt-lake-city': 'UT',
    'fayetteville': 'AR',
    'yonkers': 'NY',
    'amarillo': 'TX',
    'mckinney': 'TX',
    'rochester': 'NY'
  };
  
  const normalizedCity = formatted.toLowerCase();
  if (cityStateMap[normalizedCity]) {
    const cityPart = formatted.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('-');
    const statePart = cityStateMap[normalizedCity];
    return `${cityPart},${statePart}`;
  }
  
  // If no comma and no known city mapping, just capitalize the city name
  return formatted.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('-');
}

function formatNonUSLocation(locationIdentifier: string): string {
  // Format: City,Country (e.g., Barcelona,España)
  const formatted = locationIdentifier
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-,]/g, '') // Keep only word chars, hyphens, and commas
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .replace(/,+/g, ','); // Replace multiple commas with single comma
  
  // Capitalize properly for non-US format
  if (formatted.includes(',')) {
    const parts = formatted.split(',');
    const cityPart = parts[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('-');
    const countryPart = parts[1].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('-');
    return `${cityPart},${countryPart}`;
  }
  
  // If no comma, just capitalize the city name
  return formatted.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('-');
}

export class KayakPartner extends CarRentalPartner {
  async searchLocations(searchTerm: string): Promise<RentalLocation[]> {
    console.log('KayakPartner: Searching locations for', searchTerm);
    
    const functionUrl = `https://vbtmydsmqlkzfmbcmfxb.supabase.co/functions/v1/kayak-locations?q=${encodeURIComponent(searchTerm)}`;
    
    const response = await fetch(functionUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidG15ZHNtcWxremZtYmNtZnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTIxNzMsImV4cCI6MjA2NzM2ODE3M30.RANxc31cwdBp3o26XVuBTp11IWE_HcW0oI9ITsJekdo`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('KayakPartner: API Error:', response.status, response.statusText, errorText);
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('KayakPartner: API returned', data);

    if (data.error) {
      throw new Error(data.error);
    }

    const locations = Array.isArray(data) ? data : [];
    console.log('KayakPartner: Using', locations.length, 'locations from server');
    
    return locations;
  }

  generateDeepLink(searchParams: SearchParams, location: RentalLocation, clickId?: string): string {
    const config = this.getDeepLinkConfig();
    
    // Get pickup location (primary location passed as parameter for backward compatibility)
    const pickupLocationData = searchParams.pickupLocation || location;
    
    // Determine pickup location identifier based on location type
    let pickupLocationIdentifier;
    if (pickupLocationData?.type === 'airport' && pickupLocationData?.code) {
      // For airports, use IATA code
      pickupLocationIdentifier = pickupLocationData.code;
      console.log('KayakPartner: Using airport IATA code for pickup:', pickupLocationIdentifier);
    } else if (pickupLocationData?.displayName || pickupLocationData?.name) {
      // For cities/locations, use the full location information to preserve state/country
      pickupLocationIdentifier = pickupLocationData.displayName || pickupLocationData.name;
      console.log('KayakPartner: Using full location name for pickup:', pickupLocationIdentifier);
    } else if (pickupLocationData?.code || pickupLocationData?.id) {
      // Fallback: try to extract meaningful identifier
      const { iataCode } = parseLocationId(pickupLocationData.code || pickupLocationData.id);
      pickupLocationIdentifier = iataCode;
      console.log('KayakPartner: Using parsed identifier for pickup:', pickupLocationIdentifier);
    } else {
      pickupLocationIdentifier = 'UNKNOWN';
      console.warn('KayakPartner: No valid pickup location data found');
    }
    
    // Get dropoff location - prioritize dropoffLocation from SearchParams
    const dropoffLocationData = searchParams.dropoffLocation;
    let dropoffLocationIdentifier: string;
    
    if (dropoffLocationData) {
      // User selected a specific dropoff location from the dropoff field
      if (dropoffLocationData.type === 'airport' && dropoffLocationData.code) {
        dropoffLocationIdentifier = dropoffLocationData.code;
        console.log('KayakPartner: Using airport IATA code for dropoff:', dropoffLocationIdentifier);
      } else {
        // For cities/locations, use the full location information to preserve state/country
        dropoffLocationIdentifier = dropoffLocationData.displayName || dropoffLocationData.name;
        console.log('KayakPartner: Using full location name for dropoff:', dropoffLocationIdentifier);
      }
    } else if (searchParams.dropoff !== searchParams.pickup) {
      // User typed different dropoff text but didn't select a location from dropdown
      const dropoffText = searchParams.dropoff.trim();
      console.log('KayakPartner: Dropoff text differs from pickup, using typed text:', dropoffText);
      
      if (dropoffText.length >= 3 && dropoffText.length <= 4) {
        // Assume it's an IATA code if 3-4 characters
        dropoffLocationIdentifier = dropoffText.toUpperCase();
        console.log('KayakPartner: Using typed text as IATA code for dropoff:', dropoffLocationIdentifier);
      } else {
        // Use typed text as location name, but try to simplify if it's too complex
        if (dropoffText.includes(',')) {
          // Extract just the first part (city name) before the first comma
          dropoffLocationIdentifier = dropoffText.split(',')[0].trim();
          console.log('KayakPartner: Simplified complex dropoff text to city name:', dropoffLocationIdentifier);
        } else {
          dropoffLocationIdentifier = dropoffText;
          console.log('KayakPartner: Using typed text as location name for dropoff:', dropoffLocationIdentifier);
        }
      }
    } else {
      // Default to same as pickup if no specific dropoff is provided
      dropoffLocationIdentifier = pickupLocationIdentifier;
      console.log('KayakPartner: Dropoff same as pickup, using pickup location for dropoff');
    }
    
    // Format dates and times according to official Kayak documentation:
    // YYYY-MM-DD or YYYY-MM-DD-HHh format
    const pickupDateTime = formatDateTimeForKayak(searchParams.pickupDate, searchParams.pickupTime);
    const dropoffDateTime = formatDateTimeForKayak(searchParams.dropoffDate, searchParams.dropoffTime);
    
    // Format location identifiers according to Kayak specs:
    // IATA Code, or 'City,State/Country' (in English or local language)
    const formattedPickupLocation = formatLocationForKayak(pickupLocationIdentifier);
    const formattedDropoffLocation = formatLocationForKayak(dropoffLocationIdentifier);
    
    // Build the cars path according to official Kayak documentation:
    // /cars/{Pick_Up_Destination}/{Drop_Off_Destination}/{Pick_Up_Date_Hour}/{Drop_Off_Date_Hour}
    const carsPath = `/cars/${formattedPickupLocation}/${formattedDropoffLocation}/${pickupDateTime}/${dropoffDateTime}`;
    
    // Build the final KAYAK affiliate URL according to official documentation:
    // {domain}/in?a={integrationCode}[&{trackingParameters}]&url={URL}
    const baseUrl = 'https://www.kayak.com/in';
    const params = new URLSearchParams({
      a: 'kan_317604_592756', // Integration code
      encoder: '27_1', // Fixed value for advanced tracking
      enc_pid: 'deeplinks', // Product ID
      enc_eid: '0', // Experiment ID (0 for false)
      enc_cid: clickId || generateClickId(), // Click ID (Max 50 chars, alphanumeric + underscore)
      enc_lid: 'cars-rentals', // Location ID (Max 50 chars, alphanumeric + underscore)
      url: carsPath // URL-encoded cars path
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;
    console.log('KayakPartner: Generated deep link:', finalUrl);
    console.log('KayakPartner: Cars path:', carsPath);
    console.log('KayakPartner: Pickup location:', pickupLocationIdentifier, '-> formatted:', formattedPickupLocation);
    console.log('KayakPartner: Dropoff location:', dropoffLocationIdentifier, '-> formatted:', formattedDropoffLocation);
    console.log('KayakPartner: Pickup date/time:', pickupDateTime);
    console.log('KayakPartner: Dropoff date/time:', dropoffDateTime);
    
    return finalUrl;
  }

  async trackClick(searchParams: SearchParams, location: RentalLocation, clickId?: string, landingId?: string): Promise<string> {
    // Use provided clickId or generate new one
    const finalClickId = clickId || generateClickId();
    
    // Get current session's landing ID
    const currentLandingId = LandingTrackingService.getCurrentLandingId();
    
    // Generate the deep link for redirect_url
    const deepLink = this.generateDeepLink(searchParams, location, finalClickId);
    
    // Capture URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const capturedParams: Record<string, string> = {};
    for (const [key, value] of urlParams.entries()) {
      capturedParams[key] = value;
    }
    
    const clickData: ClickTrackingData = {
      click_id: finalClickId,
      landing_id: currentLandingId,
      partner: this.name,
      iata_code: location.code,
      location_id: location.id,
      pickup_date_new: searchParams.pickupDate,
      pickup_time_new: searchParams.pickupTime,
      dropoff_date_new: searchParams.dropoffDate,
      dropoff_time_new: searchParams.dropoffTime,
      timestamp: new Date().toISOString(), // Add timestamp
      placement: 'new_tab', // Add placement
      redirect_url: deepLink, // Use the generated deep link
      search_params: capturedParams,
      auto_params: false
    };

    try {
      const { error } = await supabase
        .from('rental_clicks')
        .insert([clickData]);

      if (error) {
        console.error('KayakPartner: Error tracking click:', error);
        throw error;
      } else {
        console.log('KayakPartner: Click tracked successfully:', finalClickId, 'with landing ID:', currentLandingId);
      }
    } catch (error) {
      console.error('KayakPartner: Exception tracking click:', error);
      throw error;
    }

    return finalClickId;
  }

  private getDeepLinkConfig(): DeepLinkConfig {
    return {
      baseUrl: 'https://www.kayak.com/cars',
      affiliateId: 'kan_317604_592756', // Always use the new affiliate ID
      utmParams: {
        utm_source: this.config.configurations.utm_source || 'rental-discounts',
        utm_medium: this.config.configurations.utm_medium || 'affiliate',
      }
    };
  }
}
