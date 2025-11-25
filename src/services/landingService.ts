import { supabase } from '@/integrations/supabase/client';
import { generateClickId } from '@/utils/clickIdGenerator';

export interface LandingData {
  landing_id: string;
  timestamp: string;
  metadata: any; // This will contain all the additional data
  url_params: any;
}

export class LandingService {
  private static async getIpInfo(): Promise<any> {
    try {
      const response = await fetch('https://ipinfo.io/json');
      return await response.json();
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return {};
    }
  }

  private static getDeviceType(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  private static captureUrlParameters(): any {
    const urlParams = new URLSearchParams(window.location.search);
    const params: any = {};
    
    // Capture all URL parameters
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  }

  static async logLanding(partner: string, deeplink: string, parameters: any, method: 'new_tab' | 'redirect'): Promise<string> {
    const landingId = generateClickId();
    
    try {
      const ipInfo = await this.getIpInfo();
      const urlParams = this.captureUrlParameters();
      
      // Consolidate all the additional data into the metadata field
      const metadata = {
        ip: ipInfo.ip || '',
        location: {
          city: ipInfo.city,
          region: ipInfo.region,
          country: ipInfo.country,
          lat: ipInfo.loc?.split(',')[0],
          lng: ipInfo.loc?.split(',')[1],
        },
        user_agent: navigator.userAgent,
        device: this.getDeviceType(),
        referrer: document.referrer,
        partner,
        deeplink,
        parameters,
        method,
      };
      
      const landingData: LandingData = {
        landing_id: landingId,
        timestamp: new Date().toISOString(),
        metadata, // All the additional data goes here
        url_params: urlParams // This will capture gclid, utm_*, etc.
      };

      const { error } = await supabase
        .from('landings')
        .insert([landingData]);

      if (error) {
        console.error('Error logging landing:', error);
      } else {
        console.log('Landing logged successfully:', landingId, 'with URL params:', urlParams);
      }

      return landingId;
    } catch (error) {
      console.error('Error in logLanding:', error);
      return landingId; // Still return landingId even if logging fails
    }
  }
} 