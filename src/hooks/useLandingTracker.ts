import { useEffect } from 'react';
import { LandingTrackingService } from '@/services/landingTrackingService';

export const useLandingTracker = () => {
  useEffect(() => {
    const initializeLanding = async () => {
      try {
        await LandingTrackingService.getOrCreateLandingId();
      } catch (error) {
        console.error('Error initializing landing tracking:', error);
      }
    };

    initializeLanding();
  }, []);
}; 