
export interface RentalLocation {
  id: string;
  name: string;
  displayName: string;
  city: string;
  country: string;
  code: string;
  type: string;
  iconUrl?: string | null;
  partnerMetadata?: Record<string, unknown>;
}

export interface SearchParams {
  pickup: string;
  dropoff: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  pickupLocation?: RentalLocation;
  dropoffLocation?: RentalLocation;
}

export interface DeepLinkConfig {
  baseUrl: string;
  affiliateId?: string;
  mediaPartnerId?: string;
  utmTerm?: string;
  campaignId?: string;
  trackingParam?: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

export interface PartnerConfig {
  id: string;
  name: string;
  displayName: string;
  isActive: boolean;
  configurations: Record<string, string>;
}

export interface ClickTrackingData {
  click_id: string;
  partner: string;
  iata_code: string | null;
  location_id: string | null;
  pickup_date_new: string | null;
  pickup_time_new: string | null;
  dropoff_date_new: string | null;
  dropoff_time_new: string | null;
  timestamp?: string; // Optional since DB has default
  placement: string; // Required, no default in our code
  redirect_url: string; // Required, no default in our code
  search_params: Record<string, unknown>;
  auto_params: boolean;
  landing_id: string | null;
}

export abstract class CarRentalPartner {
  protected config: PartnerConfig;

  constructor(config: PartnerConfig) {
    this.config = config;
  }

  abstract searchLocations(searchTerm: string): Promise<RentalLocation[]>;
  abstract generateDeepLink(searchParams: SearchParams, location: RentalLocation, clickId?: string): string;
  abstract trackClick(searchParams: SearchParams, location: RentalLocation, clickId?: string, landingId?: string): Promise<string>;
  
  get name(): string {
    return this.config.name;
  }
  
  get displayName(): string {
    return this.config.displayName;
  }
  
  get isActive(): boolean {
    return this.config.isActive;
  }
}
