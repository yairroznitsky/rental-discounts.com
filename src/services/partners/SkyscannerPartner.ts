import { CarRentalPartner, RentalLocation, SearchParams, DeepLinkConfig, ClickTrackingData } from '@/types/partner';
import { supabase } from '@/integrations/supabase/client';
import { generateClickId, parseLocationId } from '@/utils/clickIdGenerator';
import { LandingTrackingService } from '@/services/landingTrackingService';

export class SkyscannerPartner extends CarRentalPartner {
  async searchLocations(searchTerm: string): Promise<RentalLocation[]> {
    console.log('SkyscannerPartner: Searching locations for', searchTerm);
    
    // Use the same Kayak API for location search
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
      console.error('SkyscannerPartner: API Error:', response.status, response.statusText, errorText);
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('SkyscannerPartner: API returned', data);

    if (data.error) {
      throw new Error(data.error);
    }

    const locations = Array.isArray(data) ? data : [];
    console.log('SkyscannerPartner: Using', locations.length, 'locations from server');
    
    return locations;
  }

  generateDeepLink(searchParams: SearchParams, location: RentalLocation, clickId?: string): string {
    // Get pickup location (primary location passed as parameter for backward compatibility)
    const pickupLocationData = searchParams.pickupLocation || location;
    
    // Determine pickup location identifier based on location type
    let pickupLocationIdentifier;
    if (pickupLocationData?.type === 'airport' && pickupLocationData?.code) {
      // For airports, use IATA code
      pickupLocationIdentifier = pickupLocationData.code;
      console.log('SkyscannerPartner: Using airport IATA code for pickup:', pickupLocationIdentifier);
    } else if (pickupLocationData?.displayName || pickupLocationData?.name) {
      // For cities/locations, use displayName or name
      pickupLocationIdentifier = pickupLocationData.displayName || pickupLocationData.name;
      console.log('SkyscannerPartner: Using location name for pickup:', pickupLocationIdentifier);
    } else if (pickupLocationData?.code || pickupLocationData?.id) {
      // Fallback: try to extract meaningful identifier
      const { iataCode } = parseLocationId(pickupLocationData.code || pickupLocationData.id);
      pickupLocationIdentifier = iataCode;
      console.log('SkyscannerPartner: Using parsed identifier for pickup:', pickupLocationIdentifier);
    } else {
      pickupLocationIdentifier = 'UNKNOWN';
      console.warn('SkyscannerPartner: No valid pickup location data found');
    }
    
    // Get dropoff location - prioritize dropoffLocation from SearchParams
    const dropoffLocationData = searchParams.dropoffLocation;
    let dropoffLocationIdentifier = pickupLocationIdentifier; // Default to same as pickup
    
    if (dropoffLocationData) {
      // User selected a specific dropoff location from the dropoff field
      if (dropoffLocationData.type === 'airport' && dropoffLocationData.code) {
        dropoffLocationIdentifier = dropoffLocationData.code;
        console.log('SkyscannerPartner: Using airport IATA code for dropoff:', dropoffLocationIdentifier);
      } else {
        dropoffLocationIdentifier = dropoffLocationData.displayName || dropoffLocationData.name;
        console.log('SkyscannerPartner: Using location name for dropoff:', dropoffLocationIdentifier);
      }
    } else if (searchParams.dropoff !== searchParams.pickup) {
      // User typed different dropoff text but didn't select a location from dropdown
      const dropoffText = searchParams.dropoff.trim();
      console.log('SkyscannerPartner: Dropoff text differs from pickup, using typed text:', dropoffText);
      
      if (dropoffText.length >= 3 && dropoffText.length <= 4) {
        // Assume it's an IATA code if 3-4 characters
        dropoffLocationIdentifier = dropoffText.toUpperCase();
        console.log('SkyscannerPartner: Using typed text as IATA code for dropoff:', dropoffLocationIdentifier);
      } else {
        // Use typed text as location name
        dropoffLocationIdentifier = dropoffText;
        console.log('SkyscannerPartner: Using typed text as location name for dropoff:', dropoffLocationIdentifier);
      }
    } else {
      console.log('SkyscannerPartner: Dropoff same as pickup, using pickup location for dropoff');
    }
    
    // Skyscanner referral deep link format
    const baseUrl = 'https://skyscanner.com/g/referrals/v1/cars/day-view/';
    
    // Format dates and times for Skyscanner (YYYY-MM-DDTHH:MM format)
    const pickupTime = `${searchParams.pickupDate}T${searchParams.pickupTime}`;
    const dropoffTime = `${searchParams.dropoffDate}T${searchParams.dropoffTime}`;
    
    console.log('SkyscannerPartner: Using pickup location:', pickupLocationIdentifier, 'dropoff location:', dropoffLocationIdentifier);
    
    const params = new URLSearchParams({
      // Required Skyscanner referral parameters
      mediaPartnerId: '3495464',
      utm_term: clickId || '21208037', // Use clickId if provided, otherwise default
      
      // Location parameters
      pickupPlace: pickupLocationIdentifier,
      dropoffPlace: dropoffLocationIdentifier,
      
      // Date and time parameters (ISO format)
      pickupTime: pickupTime,
      dropoffTime: dropoffTime,
      
      // Driver and locale parameters
      driverAge: '30',
      locale: 'en-US',
      market: 'US'
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async trackClick(searchParams: SearchParams, location: RentalLocation, clickId?: string): Promise<string> {
    // Use provided clickId or generate new one
    const finalClickId = clickId || generateClickId();
    
    // Get current session's landing ID
    const currentLandingId = LandingTrackingService.getCurrentLandingId();
    
    // Capture URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const capturedParams: Record<string, string> = {};
    for (const [key, value] of urlParams.entries()) {
      capturedParams[key] = value;
    }
    
    // Generate the deep link for redirect_url
    const deepLink = this.generateDeepLink(searchParams, location, finalClickId);

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
      redirect_url: deepLink, // Add redirect_url
      search_params: capturedParams,
      auto_params: false
    };

    console.log('SkyscannerPartner: Attempting to insert this data:', JSON.stringify(clickData, null, 2));

    try {
      const { error } = await supabase
        .from('rental_clicks')
        .insert([clickData]);

      if (error) {
        console.error('SkyscannerPartner: Supabase error:', error);
        console.error('SkyscannerPartner: Error details:', error.details);
        console.error('SkyscannerPartner: Error hint:', error.hint);
        throw error;
      } else {
        console.log('SkyscannerPartner: Click tracked successfully:', finalClickId, 'with landing ID:', currentLandingId);
      }
    } catch (error) {
      console.error('SkyscannerPartner: Exception tracking click:', error);
      throw error;
    }

    return finalClickId;
  }

  private getDeepLinkConfig(): DeepLinkConfig {
    return {
      baseUrl: 'https://skyscanner.com/g/referrals/v1/cars/day-view/',
      customParams: {
        mediaPartnerId: this.config.configurations.mediaPartnerId || '3495464',
        utm_term: this.config.configurations.utm_term || '21208037',
      },
      utmParams: {
        utm_source: this.config.configurations.utm_source || 'rental-discounts',
        utm_medium: this.config.configurations.utm_medium || 'affiliate',
      }
    };
  }
} 