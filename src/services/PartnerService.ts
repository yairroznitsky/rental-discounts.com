import { CarRentalPartner, PartnerConfig, RentalLocation, SearchParams } from '@/types/partner';
import { KayakPartner } from './partners/KayakPartner';
import { SkyscannerPartner } from './partners/SkyscannerPartner';
import { AutoRentalsPartner } from './partners/AutoRentalsPartner';
import { supabase } from '@/integrations/supabase/client';
import { LandingTrackingService } from '../services/landingTrackingService';
import { ErrorLoggingService } from './errorLoggingService';
import { DEFAULT_GEO_PARTNER_CONFIG, GEO_PARTNER_CONFIG } from '@/utils/partnerConfig';

export class PartnerService {
  private partners: Map<string, CarRentalPartner> = new Map();
  private initialized = false;
  private activePartner: string = 'kayak'; // Default to Kayak
  private defaultNewTabPartner: string = DEFAULT_GEO_PARTNER_CONFIG.newTab;
  private defaultRedirectPartner: string = DEFAULT_GEO_PARTNER_CONFIG.redirect;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('PartnerService: Initializing partners...');
    
    try {
      // Add timeout to database operations
      const dbTimeout = 8000; // 8 seconds timeout
      
      const partnersPromise = supabase
        .from('rental_partners')
        .select('*')
        .eq('is_active', true)
        .order('name');

      const configsPromise = supabase
        .from('partner_configurations')
        .select('*');

      // Race against timeout
      const [partnersResult, configsResult] = await Promise.all([
        Promise.race([
          partnersPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database timeout')), dbTimeout)
          )
        ]),
        Promise.race([
          configsPromise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database timeout')), dbTimeout)
          )
        ])
      ]);

      const { data: partnersData, error: partnersError } = partnersResult as any;
      const { data: configurationsData, error: configError } = configsResult as any;

      if (partnersError) {
        console.error('PartnerService: Error fetching partners:', partnersError);
      }

      if (configError) {
        console.error('PartnerService: Error fetching configurations:', configError);
      }

      // Group configurations by partner_id
      const configsByPartner = new Map();
      configurationsData?.forEach((config: any) => {
        if (!configsByPartner.has(config.partner_id)) {
          configsByPartner.set(config.partner_id, {});
        }
        configsByPartner.get(config.partner_id)[config.config_key] = config.config_value;
      });

      // Initialize partner instances from database
      partnersData?.forEach((partner: any) => {
        const partnerConfig: PartnerConfig = {
          id: partner.id,
          name: partner.name,
          displayName: partner.display_name,
          isActive: partner.is_active,
          configurations: configsByPartner.get(partner.id) || {}
        };

        this.initializePartner(partner.name, partnerConfig);
      });

      // Ensure fallback partners are always available
      this.ensureFallbackPartners();

      this.initialized = true;
      console.log(`PartnerService: Initialized ${this.partners.size} partners`);
    } catch (error) {
      console.error('PartnerService: Error during initialization:', error);
      
      // Log the initialization error
      await ErrorLoggingService.logSystemError(
        "Partner Service Initialization Failed",
        error instanceof Error ? error.message : 'Unknown error during partner service initialization',
        {
          component: 'PartnerService',
          function: 'initialize',
          error_type: error instanceof Error ? error.constructor.name : 'Unknown',
          partners_count: this.partners.size
        },
        error instanceof Error ? error.stack : undefined
      );
      
      // Create fallback partners even if database fails
      this.createFallbackPartners();
      this.initialized = true;
      console.log(`PartnerService: Using fallback partners only (${this.partners.size} partners)`);
    }
  }

  private ensureFallbackPartners(): void {
    // Ensure AutoRentals partner is always available (fallback)
    if (!this.partners.has('autorentals')) {
      console.log('PartnerService: Creating fallback AutoRentals partner');
      const fallbackConfig: PartnerConfig = {
        id: 'autorentals-fallback',
        name: 'autorentals',
        displayName: 'AutoRentals',
        isActive: true,
        configurations: {
          campaign_id: '11001',
          tracking_param: '21207214',
          utm_source: 'rental-discounts',
          utm_medium: 'widget'
        }
      };
      this.initializePartner('autorentals', fallbackConfig);
    }

    // Ensure Skyscanner partner is always available (fallback)
    if (!this.partners.has('skyscanner')) {
      console.log('PartnerService: Creating fallback Skyscanner partner');
      const fallbackConfig: PartnerConfig = {
        id: 'skyscanner-fallback',
        name: 'skyscanner',
        displayName: 'Skyscanner',
        isActive: true,
        configurations: {
          mediaPartnerId: '3495464',
          utm_term: '21207558',
          utm_source: 'rental-discounts',
          utm_medium: 'affiliate'
        }
      };
      this.initializePartner('skyscanner', fallbackConfig);
    }

    // Ensure Kayak partner is always available (fallback)
    if (!this.partners.has('kayak')) {
      console.log('PartnerService: Creating fallback Kayak partner');
      const fallbackConfig: PartnerConfig = {
        id: 'kayak-fallback',
        name: 'kayak',
        displayName: 'Kayak',
        isActive: true,
        configurations: {
          affiliateId: 'rental-discounts',
          utm_source: 'rental-discounts',
          utm_medium: 'affiliate'
        }
      };
      this.initializePartner('kayak', fallbackConfig);
    }
  }

  private initializePartner(partnerName: string, config: PartnerConfig): void {
    let partnerInstance: CarRentalPartner | null = null;
    
    switch (partnerName) {
      case 'kayak':
        partnerInstance = new KayakPartner(config);
        break;
      case 'skyscanner':
        partnerInstance = new SkyscannerPartner(config);
        break;
      case 'autorentals':
        partnerInstance = new AutoRentalsPartner(config);
        break;
      default:
        console.warn(`PartnerService: Unknown partner type: ${partnerName}`);
    }

    if (partnerInstance) {
      this.partners.set(partnerName, partnerInstance);
      console.log(`PartnerService: Initialized ${config.displayName} partner`);
    }
  }

  private createFallbackPartners(): void {
    console.log('PartnerService: Creating fallback partners due to initialization error');
    
    // Create fallback AutoRentals partner
    const autoRentalsConfig: PartnerConfig = {
      id: 'autorentals-fallback',
      name: 'autorentals',
      displayName: 'AutoRentals',
      isActive: true,
      configurations: {
        campaign_id: '11001',
        tracking_param: '21207214',
        utm_source: 'rental-discounts',
        utm_medium: 'widget'
      }
    };
    this.initializePartner('autorentals', autoRentalsConfig);

    // Create fallback Skyscanner partner
    const skyscannerConfig: PartnerConfig = {
      id: 'skyscanner-fallback',
      name: 'skyscanner',
      displayName: 'Skyscanner',
      isActive: true,
      configurations: {
        mediaPartnerId: '3495464',
        utm_term: '21207558',
        utm_source: 'rental-discounts',
        utm_medium: 'affiliate'
      }
    };
    this.initializePartner('skyscanner', skyscannerConfig);

    // Create fallback Kayak partner
    const kayakConfig: PartnerConfig = {
      id: 'kayak-fallback',
      name: 'kayak',
      displayName: 'Kayak',
      isActive: true,
      configurations: {
        affiliateId: 'rental-discounts',
        utm_source: 'rental-discounts',
        utm_medium: 'affiliate'
      }
    };
    this.initializePartner('kayak', kayakConfig);
  }

  async getPartner(partnerName: string): Promise<CarRentalPartner | null> {
    await this.initialize();
    return this.partners.get(partnerName) || null;
  }

  async getActivePartners(): Promise<CarRentalPartner[]> {
    await this.initialize();
    return Array.from(this.partners.values()).filter(partner => partner.isActive);
  }

  async getDefaultPartner(): Promise<CarRentalPartner | null> {
    await this.initialize();
    return this.partners.get(this.activePartner) || this.partners.get('skyscanner') || null;
  }

  // Method to switch between partners
  setActivePartner(partnerName: string): void {
    if (this.partners.has(partnerName)) {
      this.activePartner = partnerName;
      console.log(`PartnerService: Switched to ${partnerName} partner`);
    } else {
      console.warn(`PartnerService: Partner ${partnerName} not found`);
    }
  }

  // Get current active partner name
  getActivePartnerName(): string {
    return this.activePartner;
  }

  async searchLocations(searchTerm: string, partnerName?: string): Promise<RentalLocation[]> {
    await this.initialize();
    
    const partner = partnerName 
      ? await this.getPartner(partnerName)
      : await this.getDefaultPartner();

    if (!partner) {
      console.warn('PartnerService: No partner available for search');
      return [];
    }

    try {
      return await partner.searchLocations(searchTerm);
    } catch (error) {
      console.error(`PartnerService: Error searching with ${partner.displayName}:`, error);
      return [];
    }
  }

  async generateDeepLink(searchParams: SearchParams, location: RentalLocation, partnerName?: string, clickId?: string): Promise<string> {
    await this.initialize();
    
    const partner = partnerName 
      ? await this.getPartner(partnerName)
      : await this.getDefaultPartner();

    if (!partner) {
      console.warn('PartnerService: No partner available for deep link generation');
      return '#';
    }

    try {
      return partner.generateDeepLink(searchParams, location, clickId);
    } catch (error) {
      console.error(`PartnerService: Error generating deep link with ${partner.displayName}:`, error);
      return '#';
    }
  }

  async trackClick(
    searchParams: SearchParams, 
    location: RentalLocation, 
    partnerName: string,
    clickId?: string, // Add clickId parameter
    landingId?: string // Add landingId parameter
  ): Promise<string> {
    const partner = await this.getPartner(partnerName); // Added await here
    if (!partner) {
      throw new Error(`Partner ${partnerName} not found`);
    }

    // Pass the clickId and landingId to the partner's trackClick method
    return await partner.trackClick(searchParams, location, clickId, landingId);
  }

  private resolvePartnerForGeo(type: 'newTab' | 'redirect', userCountry?: string): string {
    const normalizedCountry = userCountry?.trim().toUpperCase() ?? '';
    const override = normalizedCountry ? GEO_PARTNER_CONFIG[normalizedCountry] : undefined;
    const fallback = type === 'newTab' ? this.defaultNewTabPartner : this.defaultRedirectPartner;
    return override?.[type] ?? fallback;
  }

  // Get default partner for new tab
  async getDefaultNewTabPartner(userCountry?: string): Promise<CarRentalPartner | null> {
    try {
      await this.initialize();
      const targetPartnerName = this.resolvePartnerForGeo('newTab', userCountry);
      const partner =
        this.partners.get(targetPartnerName) ||
        this.partners.get(this.defaultNewTabPartner) ||
        this.partners.get('kayak');
      if (!partner) {
        console.error('PartnerService: No default new tab partner available. Available partners:', Array.from(this.partners.keys()));
        // Try to get any available partner as fallback
        const anyPartner = Array.from(this.partners.values())[0];
        if (anyPartner) {
          console.warn('PartnerService: Using fallback partner for new tab:', anyPartner.displayName);
          return anyPartner;
        }
      }
      return partner;
    } catch (error) {
      console.error('PartnerService: Error getting default new tab partner:', error);
      // Return any available partner as last resort
      const anyPartner = Array.from(this.partners.values())[0];
      return anyPartner || null;
    }
  }

  // Get default partner for redirect
  async getDefaultRedirectPartner(userCountry?: string): Promise<CarRentalPartner | null> {
    try {
      await this.initialize();
      const targetPartnerName = this.resolvePartnerForGeo('redirect', userCountry);
      const partner =
        this.partners.get(targetPartnerName) ||
        this.partners.get(this.defaultRedirectPartner) ||
        this.partners.get('autorentals');
      if (!partner) {
        console.error('PartnerService: No default redirect partner available. Available partners:', Array.from(this.partners.keys()));
        // Try to get any available partner as fallback
        const anyPartner = Array.from(this.partners.values())[0];
        if (anyPartner) {
          console.warn('PartnerService: Using fallback partner for redirect:', anyPartner.displayName);
          return anyPartner;
        }
      }
      return partner;
    } catch (error) {
      console.error('PartnerService: Error getting default redirect partner:', error);
      // Return any available partner as last resort
      const anyPartner = Array.from(this.partners.values())[0];
      return anyPartner || null;
    }
  }

  // Set default new tab partner
  async setDefaultNewTabPartner(partnerName: string): Promise<void> {
    await this.initialize(); // Ensure partners are initialized first
    if (this.partners.has(partnerName)) {
      this.defaultNewTabPartner = partnerName;
      console.log(`PartnerService: Set default new tab partner to ${partnerName}`);
    } else {
      console.warn(`PartnerService: Partner ${partnerName} not found for new tab. Available partners:`, Array.from(this.partners.keys()));
    }
  }

  // Set default redirect partner
  async setDefaultRedirectPartner(partnerName: string): Promise<void> {
    await this.initialize(); // Ensure partners are initialized first
    if (this.partners.has(partnerName)) {
      this.defaultRedirectPartner = partnerName;
      console.log(`PartnerService: Set default redirect partner to ${partnerName}`);
    } else {
      console.warn(`PartnerService: Partner ${partnerName} not found for redirect. Available partners:`, Array.from(this.partners.keys()));
    }
  }

  // Get current default partner names
  getDefaultNewTabPartnerName(): string {
    return this.defaultNewTabPartner;
  }

  getDefaultRedirectPartnerName(): string {
    return this.defaultRedirectPartner;
  }
}

// Export singleton instance
export const partnerService = new PartnerService();
