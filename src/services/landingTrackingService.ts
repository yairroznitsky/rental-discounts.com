import { supabase } from '@/integrations/supabase/client';

export interface LandingData {
  landing_id: string;
  timestamp: string;
  url_params: any;
  metadata: {
    referrer: string;
    user_agent: string;
    ip: string;
    location: {
      city?: string;
      region?: string;
      country?: string;
      lat?: string;
      lng?: string;
    };
    device: string;
    url: string;
    pathname: string;
    screen_resolution?: string;
    language: string;
    timezone: string;
    viewport: {
      width: number;
      height: number;
    };
    // Additional fields for partner tracking
    partner?: string;
    deeplink?: string;
    parameters?: any;
    method?: string;
  };
}

export class LandingTrackingService {
  private static readonly COOKIE_NAME = 'landing_id';
  private static readonly COOKIE_EXPIRY = 5; // minutes

  private static generateLandingId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'RB-';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private static setCookie(name: string, value: string, minutes: number): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  private static getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private static removeCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
  }

  // Add IP info functionality from LandingService
  private static async getIpInfo(): Promise<any> {
    try {
      const response = await fetch('https://ipinfo.io/json');
      return await response.json();
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return {};
    }
  }

  // Add device type functionality from LandingService
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
    
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  }

  static async getOrCreateLandingId(): Promise<string> {
    // Check if landing ID exists in cookie
    let landingId = this.getCookie(this.COOKIE_NAME);
    
    if (!landingId) {
      // Generate new landing ID
      landingId = this.generateLandingId();
      console.log('🆔 Generated new landing ID:', landingId);
      
      // Set cookie with 5 minute expiry
      this.setCookie(this.COOKIE_NAME, landingId, this.COOKIE_EXPIRY);
      console.log('🍪 Saved landing ID to cookie:', landingId);
      
      // Log landing to database
      try {
        await this.logLanding(landingId);
        console.log('💾 Saved landing ID to database:', landingId);
      } catch (error) {
        console.error('❌ Failed to save landing ID to database:', error);
        // Remove the cookie if DB insert failed to keep them in sync
        this.removeCookie(this.COOKIE_NAME);
        throw error;
      }
    } else {
      console.log('🔄 Using existing landing ID from cookie:', landingId);
    }
    
    return landingId;
  }

  // Add this method to get current landing ID without creating new one
  static getCurrentLandingId(): string | null {
    return this.getCookie(this.COOKIE_NAME);
  }

  // Add method to set an existing landing ID from URL parameters
  static setExistingLandingId(landingId: string): void {
    console.log('🔗 Setting existing landing ID from URL:', landingId);
    // Set the cookie with the existing landing ID
    this.setCookie(this.COOKIE_NAME, landingId, this.COOKIE_EXPIRY);
    console.log('🍪 Saved existing landing ID to cookie:', landingId);
  }

  // Enhanced logLanding method that handles both basic and partner tracking
  static async logLanding(landingId: string, partnerData?: {
    partner: string;
    deeplink: string;
    parameters: any;
    method: 'new_tab' | 'redirect';
  }): Promise<void> {
    try {
      const landingData = {
        landing_id: landingId,
        metadata: {
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
          // Add enhanced data if partner tracking
          ...(partnerData && {
            ip: (await this.getIpInfo()).ip || '',
            location: {
              city: (await this.getIpInfo()).city,
              region: (await this.getIpInfo()).region,
              country: (await this.getIpInfo()).country,
              lat: (await this.getIpInfo()).loc?.split(',')[0],
              lng: (await this.getIpInfo()).loc?.split(',')[1],
            },
            device: this.getDeviceType(),
            partner: partnerData.partner,
            deeplink: partnerData.deeplink,
            parameters: partnerData.parameters,
            method: partnerData.method,
          })
        },
        url_params: window.location.search || ''
      };

      console.log('📝 Attempting to insert landing data:', landingData);

      const { error } = await supabase
        .from('landings')
        .insert([landingData]);

      if (error) {
        console.error('❌ Database insert error:', error);
        throw error;
      }
      
      console.log('✅ Landing successfully logged to database');
    } catch (error) {
      console.error('❌ Exception in logLanding:', error);
      throw error;
    }
  }

  // New method for partner-specific landing logging
  static async logPartnerLanding(
    partner: string, 
    deeplink: string, 
    parameters: any, 
    method: 'new_tab' | 'redirect'
  ): Promise<string> {
    // Get or create landing ID (reuse existing session)
    const landingId = await this.getOrCreateLandingId();
    
    try {
      await this.logLanding(landingId, {
        partner,
        deeplink,
        parameters,
        method
      });
      
      return landingId;
    } catch (error) {
      console.error('Error in logPartnerLanding:', error);
      return landingId;
    }
  }
} 