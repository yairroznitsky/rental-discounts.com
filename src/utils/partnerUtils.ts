
import { SearchParams } from '@/types/partner';
import { partnerService } from '@/services/PartnerService';

export const generatePartnerDeepLink = async (
  searchParams: SearchParams,
  locationId: string,
  partnerName?: string
): Promise<string> => {
  try {
    // For now, we'll use a simplified approach since we don't have the full location object
    // In a real implementation, you'd fetch the location details
    const mockLocation = {
      id: locationId,
      name: searchParams.pickup,
      displayName: searchParams.pickup,
      city: '',
      country: '',
      code: '',
      type: 'location'
    };

    const deepLink = await partnerService.generateDeepLink(searchParams, mockLocation, partnerName);
    
    // Track the click
    await partnerService.trackClick(searchParams, mockLocation, partnerName);
    
    return deepLink;
  } catch (error) {
    console.error('Error generating partner deep link:', error);
    return '#';
  }
};

export const getAvailablePartners = async () => {
  try {
    return await partnerService.getActivePartners();
  } catch (error) {
    console.error('Error fetching available partners:', error);
    return [];
  }
};
