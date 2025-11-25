import { CarRentalPartner, RentalLocation, SearchParams, DeepLinkConfig, ClickTrackingData } from '@/types/partner';
import { supabase } from '@/integrations/supabase/client';
import { generateClickId, parseLocationId } from '@/utils/clickIdGenerator';
import { LandingTrackingService } from '@/services/landingTrackingService';

export class AutoRentalsPartner extends CarRentalPartner {
  async searchLocations(searchTerm: string): Promise<RentalLocation[]> {
    console.log('AutoRentalsPartner: Searching locations for', searchTerm);
    
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
      console.error('AutoRentalsPartner: API Error:', response.status, response.statusText, errorText);
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('AutoRentalsPartner: API returned', data);

    if (data.error) {
      throw new Error(data.error);
    }

    const locations = Array.isArray(data) ? data : [];
    console.log('AutoRentalsPartner: Using', locations.length, 'locations from server');
    
    return locations;
  }

  generateDeepLink(searchParams: SearchParams, location: RentalLocation, clickId?: string): string {
    // Format dates for AutoRentals (YYYYMMDD format)
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10).replace(/-/g, '');
    };
    
    // Get pickup location (primary location passed as parameter for backward compatibility)
    const pickupLocationData = searchParams.pickupLocation || location;
    
    // Determine pickup location name based on location type
    let pickupLocationName;
    if (pickupLocationData?.displayName) {
      // Prefer displayName as it's the most complete location description
      pickupLocationName = pickupLocationData.displayName;
      console.log('AutoRentalsPartner: Using displayName for pickup:', pickupLocationName);
    } else if (pickupLocationData?.name) {
      // Use name as fallback
      pickupLocationName = pickupLocationData.name;
      console.log('AutoRentalsPartner: Using name for pickup:', pickupLocationName);
    } else if (pickupLocationData?.code) {
      // For airports, use IATA code
      pickupLocationName = pickupLocationData.code;
      console.log('AutoRentalsPartner: Using IATA code for pickup:', pickupLocationName);
    } else if (pickupLocationData?.id) {
      // Last resort: try to extract meaningful identifier
      const { iataCode } = parseLocationId(pickupLocationData.id);
      pickupLocationName = iataCode;
      console.log('AutoRentalsPartner: Using parsed identifier for pickup:', pickupLocationName);
    } else {
      pickupLocationName = 'Unknown Location';
      console.warn('AutoRentalsPartner: No valid pickup location data found');
    }
    
    // Get dropoff location - prioritize dropoffLocation from SearchParams
    const dropoffLocationData = searchParams.dropoffLocation;
    let dropoffLocationName = pickupLocationName; // Default to same as pickup
    
    if (dropoffLocationData) {
      // User selected a specific dropoff location from the dropoff field
      if (dropoffLocationData.displayName) {
        dropoffLocationName = dropoffLocationData.displayName;
        console.log('AutoRentalsPartner: Using displayName for dropoff:', dropoffLocationName);
      } else if (dropoffLocationData.name) {
        dropoffLocationName = dropoffLocationData.name;
        console.log('AutoRentalsPartner: Using name for dropoff:', dropoffLocationName);
      } else if (dropoffLocationData.code) {
        dropoffLocationName = dropoffLocationData.code;
        console.log('AutoRentalsPartner: Using IATA code for dropoff:', dropoffLocationName);
      }
    } else if (searchParams.dropoff !== searchParams.pickup) {
      // User typed different dropoff text but didn't select a location from dropdown
      const dropoffText = searchParams.dropoff.trim();
      console.log('AutoRentalsPartner: Dropoff text differs from pickup, using typed text as location name:', dropoffText);
      
      // For AutoRentals, we can use the typed text directly as the location name
      // since they accept full location names like "New York, New York, United States"
      dropoffLocationName = dropoffText;
    } else {
      console.log('AutoRentalsPartner: Dropoff same as pickup, using pickup location for dropoff');
    }
    
    console.log('AutoRentalsPartner: Using pickup location:', pickupLocationName, 'dropoff location:', dropoffLocationName);
    
    // Build AutoRentals URL with the correct format
    const baseUrl = 'https://www.autorentals.com/remotesearch';
    const params = new URLSearchParams({
      cid: '11001',
      tpm: clickId || '21207214', // Inject the click ID
      utm_campaign: '11001',
      utm_source: 'rental-bookings',
      utm_medium: 'widget',
      pl: pickupLocationName, // Use full location name for pickup
      dl: dropoffLocationName, // Use full location name for dropoff
      pd: formatDate(searchParams.pickupDate),
      pt: searchParams.pickupTime,
      dd: formatDate(searchParams.dropoffDate),
      dt: searchParams.dropoffTime,
      view: 'list'
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async trackClick(searchParams: SearchParams, location: RentalLocation, clickId?: string, landingId?: string): Promise<string> {
    // Use provided clickId or generate new one
    const finalClickId = clickId || generateClickId();
    
    // Get current session's landing ID
    const currentLandingId = LandingTrackingService.getCurrentLandingId();
    console.log('AutoRentalsPartner: Current landing ID from service:', currentLandingId);
    console.log('AutoRentalsPartner: Landing ID type:', typeof currentLandingId);
    console.log('AutoRentalsPartner: Landing ID length:', currentLandingId?.length);
    
    // Generate the deep link for redirect_url
    const deepLink = this.generateDeepLink(searchParams, location, finalClickId);
    
    const clickData: ClickTrackingData = {
      click_id: finalClickId,
      landing_id: currentLandingId, // This should be the actual landing ID, not "new_tab"
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
      search_params: {}, // Placeholder, will be updated
      auto_params: false
    };

    console.log('AutoRentalsPartner: Attempting to insert this data:', JSON.stringify(clickData, null, 2));

    try {
      const { error } = await supabase
        .from('rental_clicks')
        .insert([clickData]);

      if (error) {
        console.error('AutoRentalsPartner: Supabase error:', error);
        console.error('AutoRentalsPartner: Error details:', error.details);
        console.error('AutoRentalsPartner: Error hint:', error.hint);
        throw error;
      } else {
        console.log('AutoRentalsPartner: Click tracked successfully:', finalClickId);
      }
    } catch (error) {
      console.error('AutoRentalsPartner: Exception tracking click:', error);
      throw error;
    }

    return finalClickId;
  }

  private getDeepLinkConfig(): DeepLinkConfig {
    return {
      baseUrl: 'https://www.autorentals.com/remotesearch',
      campaignId: this.config.configurations.campaign_id || '11001',
      trackingParam: this.config.configurations.tracking_param || '21207214',
      utmParams: {
        utm_source: this.config.configurations.utm_source || 'rental-bookings',
        utm_medium: this.config.configurations.utm_medium || 'widget',
      }
    };
  }
} 