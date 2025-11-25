
import { useEffect, useState } from 'react';

export const useDateDefaults = () => {
  const [isMobile, setIsMobile] = useState(false);

  console.log('useDateDefaults: Hook initialized');

  useEffect(() => {
    console.log('useDateDefaults: Setting up mobile detection');
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      console.log('useDateDefaults: Mobile check:', { width: window.innerWidth, isMobile: mobile });
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      console.log('useDateDefaults: Cleaning up mobile detection');
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getPickupDate = () => {
    try {
      console.log('useDateDefaults: Getting pickup date, isMobile:', isMobile);
      const today = new Date();
      const daysToAdd = isMobile ? 1 : 7; // Tomorrow for mobile, 7 days for PC
      const pickupDate = new Date(today);
      pickupDate.setDate(today.getDate() + daysToAdd);
      const dateString = pickupDate.toISOString().split('T')[0];
      console.log('useDateDefaults: Pickup date calculated:', dateString);
      return dateString;
    } catch (error) {
      console.error('useDateDefaults: Error calculating pickup date:', error);
      return '';
    }
  };

  const getDropoffDate = (pickupDate: string) => {
    try {
      console.log('useDateDefaults: Getting dropoff date for pickup:', pickupDate);
      if (!pickupDate) return '';
      const pickup = new Date(pickupDate);
      const dropoff = new Date(pickup);
      dropoff.setDate(pickup.getDate() + 3); // 3 days after pickup
      const dateString = dropoff.toISOString().split('T')[0];
      console.log('useDateDefaults: Dropoff date calculated:', dateString);
      return dateString;
    } catch (error) {
      console.error('useDateDefaults: Error calculating dropoff date:', error);
      return '';
    }
  };

  const formatTime = (hours: number, minutes: number = 0) => {
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log('useDateDefaults: Time formatted:', timeString);
    return timeString;
  };

  console.log('useDateDefaults: Returning hook values');

  return {
    getPickupDate,
    getDropoffDate,
    defaultPickupTime: formatTime(12, 0), // 12:00 (Noon)
    defaultDropoffTime: formatTime(12, 0), // 12:00 (Noon)
  };
};
