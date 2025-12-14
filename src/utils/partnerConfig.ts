// Partner configuration utility
const DEFAULT_PARTNER_FALLBACK = 'kayak';

export const PARTNER_CONFIG = {
  // Partner names
  KAYAK: 'kayak',
  SKYSCANNER: 'skyscanner',
  AUTORENTALS: 'autorentals',

  // Default partner (can be changed via environment variable or config)
  DEFAULT_PARTNER: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DEFAULT_PARTNER) || DEFAULT_PARTNER_FALLBACK,

  // Partner display names
  DISPLAY_NAMES: {
    kayak: 'KAYAK',
    skyscanner: 'Skyscanner',
    autorentals: 'AutoRentals'
  }
} as const;

export const DEFAULT_GEO_PARTNER_CONFIG = {
  newTab: PARTNER_CONFIG.SKYSCANNER,
  redirect: PARTNER_CONFIG.AUTORENTALS
} as const;

export const GEO_PARTNER_CONFIG: Record<string, Partial<typeof DEFAULT_GEO_PARTNER_CONFIG>> = {};

// Function to get partner display name
export const getPartnerDisplayName = (partnerName: string): string => {
  return PARTNER_CONFIG.DISPLAY_NAMES[partnerName as keyof typeof PARTNER_CONFIG.DISPLAY_NAMES] || partnerName;
};

// Function to check if partner is valid
export const isValidPartner = (partnerName: string): boolean => {
  return Object.values(PARTNER_CONFIG.DISPLAY_NAMES).includes(partnerName as any);
};