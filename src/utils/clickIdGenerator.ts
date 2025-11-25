
export const generateClickId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const formatTimeForKayak = (time: string): string => {
  // Convert "HH:MM" to "Hh" format according to Kayak spec
  // Examples: "09:30" → "9h", "14:45" → "14h"
  const [hours] = time.split(':');
  const hour = parseInt(hours, 10);
  return `${hour}h`;
};

export const parseLocationId = (locationId: string): { iataCode: string; locationId: string } => {
  // Parse compound location IDs like "tlh-a15927"
  const parts = locationId.split('-');
  if (parts.length >= 2) {
    return {
      iataCode: parts[0].toUpperCase(),
      locationId: parts[1]
    };
  }
  return {
    iataCode: locationId.toUpperCase(),
    locationId: locationId
  };
};
