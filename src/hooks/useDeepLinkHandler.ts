
import { useState, useEffect, useCallback } from 'react';
import { SearchParams, RentalLocation } from '@/types/partner';
import { partnerService } from '@/services/PartnerService';
import { LandingTrackingService } from '@/services/landingTrackingService';
import { useToast } from '@/hooks/use-toast';
import { ErrorLoggingService } from '@/services/errorLoggingService';

export const useDeepLinkHandler = () => {
  // Global landing ID - created once when component mounts
  const [landingId, setLandingId] = useState<string | null>(null);

  // Initialize landing ID when component mounts
  useEffect(() => {
    const initializeLanding = async () => {
      try {
        const id = await LandingTrackingService.getOrCreateLandingId();
        setLandingId(id);
        console.log('Landing initialized with ID:', id);
      } catch (error) {
        console.error('Failed to initialize landing:', error);
      }
    };

    initializeLanding();
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const openPopup = (url: string): boolean => {
    try {
      window.open(url, '_blank');
      return true;
    } catch (error) {
      return false;
    }
  };

  const generateFallbackUrl = (searchParams: SearchParams, location: RentalLocation | null): string | null => {
    if (!location) return null;
    
    try {
      // Simple fallback to Kayak with basic parameters
      const pickupDate = searchParams.pickupDate;
      const dropoffDate = searchParams.dropoffDate;
      const pickupTime = searchParams.pickupTime;
      const dropoffTime = searchParams.dropoffTime;
      
      // Extract IATA code from location
      const locationCode = location.code || location.id;
      const iataCode = locationCode.includes('-') ? locationCode.split('-')[0] : locationCode;
      
      // Format time for Kayak (HH:mm -> HH:mm)
      const formatTime = (time: string) => time.replace(':', '');
      const pickupDateTime = `${pickupDate}-${formatTime(pickupTime)}`;
      const dropoffDateTime = `${dropoffDate}-${formatTime(dropoffTime)}`;
      
      // Generate basic Kayak URL
      const baseUrl = 'https://www.kayak.com/cars';
      const params = new URLSearchParams({
        pickuplocation: iataCode,
        pickupdate: pickupDateTime,
        dropoffdate: dropoffDateTime,
        utm_source: 'rental-discounts',
        utm_medium: 'fallback'
      });
      
      return `${baseUrl}?${params.toString()}`;
    } catch (error) {
      console.error('DeepLinkHandler: Error generating fallback URL:', error);
      return null;
    }
  };

  const generateAndOpenDeepLink = async (
    searchParams: SearchParams, 
    location: RentalLocation | null,
    defaultLocation: RentalLocation | null
  ) => {
    const finalLocation = location || defaultLocation;

    if (!finalLocation) {
      const errorId = await ErrorLoggingService.logValidationError(
        "Location Needed",
        "User attempted search without selecting a pickup location",
        {
          component: 'SearchForm',
          function: 'generateAndOpenDeepLink',
          search_params: searchParams
        }
      );
      
      toast({
        title: "Location Needed",
        description: "Please enter a pickup location to continue",
        variant: "default",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log('DeepLinkHandler: Starting deep link generation...');
      console.log('DeepLinkHandler: Search params:', searchParams);
      console.log('DeepLinkHandler: Final location:', finalLocation);
      
      // Determine user country from detected default location (user origin, not destination)
      const userCountry = defaultLocation?.country;

      // Get default partners for new tab and redirect with timeout
      console.log('DeepLinkHandler: Getting new tab partner...');
      const newTabPartnerPromise = partnerService.getDefaultNewTabPartner(userCountry);
      const redirectPartnerPromise = partnerService.getDefaultRedirectPartner(userCountry);
      
      const [newTabPartner, redirectPartner] = await Promise.all([
        Promise.race([
          newTabPartnerPromise,
          new Promise<null>((_, reject) => 
            setTimeout(() => reject(new Error('Partner service timeout')), 10000)
          )
        ]),
        Promise.race([
          redirectPartnerPromise,
          new Promise<null>((_, reject) => 
            setTimeout(() => reject(new Error('Partner service timeout')), 10000)
          )
        ])
      ]);
      
      console.log('DeepLinkHandler: New tab partner:', newTabPartner?.displayName, newTabPartner);
      console.log('DeepLinkHandler: Redirect partner:', redirectPartner?.displayName, redirectPartner);

      if (!newTabPartner && !redirectPartner) {
        console.error('DeepLinkHandler: Both partners are null');
        await ErrorLoggingService.logPartnerError(
          "No Partners Available",
          "Both new tab and redirect partners are unavailable",
          'unknown',
          {
            component: 'DeepLinkHandler',
            function: 'generateAndOpenDeepLink',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
        throw new Error('No partners available for search');
      }

      // Use the same partner for both if one is missing
      const effectiveNewTabPartner = newTabPartner || redirectPartner;
      const effectiveRedirectPartner = redirectPartner || newTabPartner;

      if (!effectiveNewTabPartner || !effectiveRedirectPartner) {
        console.error('DeepLinkHandler: Cannot find suitable partners');
        await ErrorLoggingService.logPartnerError(
          "Partner Service Not Responding",
          "Cannot find suitable partners after timeout",
          'unknown',
          {
            component: 'DeepLinkHandler',
            function: 'generateAndOpenDeepLink',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
        throw new Error('Partner service not responding properly');
      }

      // Get partner names for logging and tracking
      const newTabPartnerName = effectiveNewTabPartner.name;
      const redirectPartnerName = effectiveRedirectPartner.name;

      // Log landing for new tab partner (with error handling)
      console.log('DeepLinkHandler: Logging landing for new tab partner...');
      let newTabLandingId: string | null = null;
      try {
        newTabLandingId = await Promise.race([
          LandingTrackingService.logLanding(newTabPartnerName, 'new_tab_deeplink', searchParams, 'new_tab'),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Landing service timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to log landing for new tab partner:', error);
        await ErrorLoggingService.logNetworkError(
          "Landing Service Timeout",
          `Failed to log landing for new tab partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          {
            component: 'DeepLinkHandler',
            function: 'logLanding',
            partner_name: newTabPartnerName,
            search_params: searchParams
          }
        );
      }

      // Log landing for redirect partner (with error handling)
      console.log('DeepLinkHandler: Logging landing for redirect partner...');
      let redirectLandingId: string | null = null;
      try {
        redirectLandingId = await Promise.race([
          LandingTrackingService.logLanding(redirectPartnerName, 'redirect_deeplink', searchParams, 'redirect'),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Landing service timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to log landing for redirect partner:', error);
        await ErrorLoggingService.logNetworkError(
          "Landing Service Timeout",
          `Failed to log landing for redirect partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          {
            component: 'DeepLinkHandler',
            function: 'logLanding',
            partner_name: redirectPartnerName,
            search_params: searchParams
          }
        );
      }

      console.log('DeepLinkHandler: New tab landing ID:', newTabLandingId);
      console.log('DeepLinkHandler: Redirect landing ID:', redirectLandingId);

      // Track click with BOTH partners (with error handling)
      console.log('DeepLinkHandler: Tracking clicks for both partners...');
      let newTabClickId: string | null = null;
      let redirectClickId: string | null = null;
      
      try {
        newTabClickId = await Promise.race([
          partnerService.trackClick(searchParams, finalLocation, newTabPartnerName),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Click tracking timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to track click for new tab partner:', error);
        await ErrorLoggingService.logPartnerError(
          "Click Tracking Timeout",
          `Failed to track click for new tab partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          newTabPartnerName,
          {
            component: 'DeepLinkHandler',
            function: 'trackClick',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
      }

      try {
        redirectClickId = await Promise.race([
          partnerService.trackClick(searchParams, finalLocation, redirectPartnerName),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Click tracking timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to track click for redirect partner:', error);
        await ErrorLoggingService.logPartnerError(
          "Click Tracking Timeout",
          `Failed to track click for redirect partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          redirectPartnerName,
          {
            component: 'DeepLinkHandler',
            function: 'trackClick',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
      }

      console.log('DeepLinkHandler: New tab click ID:', newTabClickId);
      console.log('DeepLinkHandler: Redirect click ID:', redirectClickId);

      // Generate both URLs with their respective click IDs
      console.log('DeepLinkHandler: Generating new tab URL...');
      const newTabUrl = await partnerService.generateDeepLink(searchParams, finalLocation, newTabPartnerName, newTabClickId || undefined);
      console.log('DeepLinkHandler: New tab URL:', newTabUrl);
      
      console.log('DeepLinkHandler: Generating redirect URL...');
      const redirectUrl = await partnerService.generateDeepLink(searchParams, finalLocation, redirectPartnerName, redirectClickId || undefined);
      console.log('DeepLinkHandler: Redirect URL:', redirectUrl);
      
      // Open new tab with default new tab partner
      console.log('DeepLinkHandler: Opening popup...');
      const tabOpened = openPopup(newTabUrl);
      
      if (tabOpened) {
        toast({
          title: "Search Started",
          description: `Opening ${effectiveNewTabPartner.displayName} in a new tab and redirecting to ${effectiveRedirectPartner.displayName}`,
        });
        
        // Redirect current page to default redirect partner
        console.log('DeepLinkHandler: Redirecting to:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        toast({
          title: "Almost There!",
          description: "Please allow popups and try again to start your search",
          variant: "default",
        });
      }
      
    } catch (error) {
      console.error('DeepLinkHandler: Deep link generation error:', error);
      console.error('DeepLinkHandler: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      // Log the main error to Supabase
      const errorId = await ErrorLoggingService.logSystemError(
        "Search Unavailable - Deep Link Generation Failed",
        error instanceof Error ? error.message : 'Unknown error during deep link generation',
        {
          component: 'DeepLinkHandler',
          function: 'generateAndOpenDeepLink',
          search_params: searchParams,
          location_data: finalLocation,
          error_type: error instanceof Error ? error.constructor.name : 'Unknown'
        },
        error instanceof Error ? error.stack : undefined
      );
      
      // Try a simple fallback search as last resort
      try {
        console.log('DeepLinkHandler: Attempting fallback search...');
        const fallbackUrl = generateFallbackUrl(searchParams, finalLocation);
        if (fallbackUrl) {
          console.log('DeepLinkHandler: Using fallback URL:', fallbackUrl);
          const tabOpened = openPopup(fallbackUrl);
          if (tabOpened) {
            await ErrorLoggingService.logSystemError(
              "Fallback Search Used",
              "Main search failed but fallback search was successful",
              {
                component: 'DeepLinkHandler',
                function: 'fallback_search',
                search_params: searchParams,
                location_data: finalLocation,
                fallback_url: fallbackUrl,
                original_error_id: errorId
              }
            );
            
            toast({
              title: "Search Started",
              description: "Opening search in a new tab using fallback service.",
            });
            return; // Success with fallback
          }
        }
      } catch (fallbackError) {
        console.error('DeepLinkHandler: Fallback also failed:', fallbackError);
        await ErrorLoggingService.logSystemError(
          "Fallback Search Also Failed",
          `Both main and fallback searches failed. Fallback error: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`,
          {
            component: 'DeepLinkHandler',
            function: 'fallback_search',
            search_params: searchParams,
            location_data: finalLocation,
            original_error_id: errorId
          }
        );
      }
      
      // Provide more specific error messages based on the error type
      let errorTitle = "Search Unavailable";
      let errorDescription = "We're having trouble starting your search. Please try again in a moment.";
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorTitle = "Connection Timeout";
          errorDescription = "The search service is taking longer than expected. Please check your internet connection and try again.";
        } else if (error.message.includes('partner')) {
          errorTitle = "Service Temporarily Unavailable";
          errorDescription = "Our search partners are temporarily unavailable. Please try again in a few minutes.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorTitle = "Network Error";
          errorDescription = "Please check your internet connection and try again.";
        }
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "default",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const generateRedirectOnlyDeepLink = async (
    searchParams: SearchParams, 
    location: RentalLocation | null,
    defaultLocation: RentalLocation | null
  ) => {
    const finalLocation = location || defaultLocation;

    if (!finalLocation) {
      const errorId = await ErrorLoggingService.logValidationError(
        "Location Needed",
        "User attempted search without selecting a pickup location",
        {
          component: 'SearchForm',
          function: 'generateRedirectOnlyDeepLink',
          search_params: searchParams
        }
      );
      
      toast({
        title: "Location Needed",
        description: "Please enter a pickup location to continue",
        variant: "default",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log('DeepLinkHandler: Starting redirect-only deep link generation...');
      console.log('DeepLinkHandler: Search params:', searchParams);
      console.log('DeepLinkHandler: Final location:', finalLocation);
      
      // Get default redirect partner only
      console.log('DeepLinkHandler: Getting redirect partner...');
      const redirectPartner = await Promise.race([
        partnerService.getDefaultRedirectPartner(defaultLocation?.country),
        new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Partner service timeout')), 10000)
        )
      ]);
      
      console.log('DeepLinkHandler: Redirect partner:', redirectPartner?.displayName, redirectPartner);

      if (!redirectPartner) {
        console.error('DeepLinkHandler: Redirect partner is null');
        await ErrorLoggingService.logPartnerError(
          "No Redirect Partner Available",
          "Redirect partner is unavailable",
          'unknown',
          {
            component: 'DeepLinkHandler',
            function: 'generateRedirectOnlyDeepLink',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
        throw new Error('No redirect partner available for search');
      }

      const redirectPartnerName = redirectPartner.name;

      // Log landing for redirect partner
      console.log('DeepLinkHandler: Logging landing for redirect partner...');
      let redirectLandingId: string | null = null;
      try {
        redirectLandingId = await Promise.race([
          LandingTrackingService.logLanding(redirectPartnerName, 'redirect_deeplink', searchParams, 'redirect'),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Landing service timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to log landing for redirect partner:', error);
        await ErrorLoggingService.logNetworkError(
          "Landing Service Timeout",
          `Failed to log landing for redirect partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          {
            component: 'DeepLinkHandler',
            function: 'logLanding',
            partner_name: redirectPartnerName,
            search_params: searchParams
          }
        );
      }

      console.log('DeepLinkHandler: Redirect landing ID:', redirectLandingId);

      // Track click for redirect partner
      console.log('DeepLinkHandler: Tracking click for redirect partner...');
      let redirectClickId: string | null = null;
      
      try {
        redirectClickId = await Promise.race([
          partnerService.trackClick(searchParams, finalLocation, redirectPartnerName),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Click tracking timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to track click for redirect partner:', error);
        await ErrorLoggingService.logPartnerError(
          "Click Tracking Timeout",
          `Failed to track click for redirect partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          redirectPartnerName,
          {
            component: 'DeepLinkHandler',
            function: 'trackClick',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
      }

      console.log('DeepLinkHandler: Redirect click ID:', redirectClickId);

      // Generate redirect URL
      console.log('DeepLinkHandler: Generating redirect URL...');
      const redirectUrl = await partnerService.generateDeepLink(searchParams, finalLocation, redirectPartnerName, redirectClickId || undefined);
      console.log('DeepLinkHandler: Redirect URL:', redirectUrl);
      
      // Redirect current page to redirect partner
      console.log('DeepLinkHandler: Redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error('DeepLinkHandler: Redirect-only deep link generation error:', error);
      
      // Log the error
      await ErrorLoggingService.logSystemError(
        "Search Unavailable - Redirect Deep Link Generation Failed",
        error instanceof Error ? error.message : 'Unknown error during redirect deep link generation',
        {
          component: 'DeepLinkHandler',
          function: 'generateRedirectOnlyDeepLink',
          search_params: searchParams,
          location_data: finalLocation,
          error_type: error instanceof Error ? error.constructor.name : 'Unknown'
        },
        error instanceof Error ? error.stack : undefined
      );
      
      // Try fallback
      try {
        console.log('DeepLinkHandler: Attempting fallback redirect...');
        const fallbackUrl = generateFallbackUrl(searchParams, finalLocation);
        if (fallbackUrl) {
          console.log('DeepLinkHandler: Using fallback URL:', fallbackUrl);
          window.location.href = fallbackUrl;
          return;
        }
      } catch (fallbackError) {
        console.error('DeepLinkHandler: Fallback also failed:', fallbackError);
      }
      
      toast({
        title: "Search Unavailable",
        description: "We're having trouble starting your search. Please try again in a moment.",
        variant: "default",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateNewTabOnlyDeepLink = async (
    searchParams: SearchParams, 
    location: RentalLocation | null,
    defaultLocation: RentalLocation | null
  ) => {
    const finalLocation = location || defaultLocation;

    if (!finalLocation) {
      const errorId = await ErrorLoggingService.logValidationError(
        "Location Needed",
        "User attempted search without selecting a pickup location",
        {
          component: 'SearchPassthrough',
          function: 'generateNewTabOnlyDeepLink',
          search_params: searchParams
        }
      );
      
      toast({
        title: "Location Needed",
        description: "Please enter a pickup location to continue",
        variant: "default",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log('DeepLinkHandler: Starting new-tab-only deep link generation...');
      console.log('DeepLinkHandler: Search params:', searchParams);
      console.log('DeepLinkHandler: Final location:', finalLocation);
      
      // Get default new tab partner only
      console.log('DeepLinkHandler: Getting new tab partner...');
      const newTabPartner = await Promise.race([
        partnerService.getDefaultNewTabPartner(defaultLocation?.country),
        new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Partner service timeout')), 10000)
        )
      ]);
      
      console.log('DeepLinkHandler: New tab partner:', newTabPartner?.displayName, newTabPartner);

      if (!newTabPartner) {
        console.error('DeepLinkHandler: New tab partner is null');
        await ErrorLoggingService.logPartnerError(
          "No New Tab Partner Available",
          "New tab partner is unavailable",
          'unknown',
          {
            component: 'DeepLinkHandler',
            function: 'generateNewTabOnlyDeepLink',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
        throw new Error('No new tab partner available for search');
      }

      const newTabPartnerName = newTabPartner.name;

      // Log landing for new tab partner
      console.log('DeepLinkHandler: Logging landing for new tab partner...');
      let newTabLandingId: string | null = null;
      try {
        newTabLandingId = await Promise.race([
          LandingTrackingService.logLanding(newTabPartnerName, 'new_tab_deeplink', searchParams, 'new_tab'),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Landing service timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to log landing for new tab partner:', error);
        await ErrorLoggingService.logNetworkError(
          "Landing Service Timeout",
          `Failed to log landing for new tab partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          {
            component: 'DeepLinkHandler',
            function: 'logLanding',
            partner_name: newTabPartnerName,
            search_params: searchParams
          }
        );
      }

      console.log('DeepLinkHandler: New tab landing ID:', newTabLandingId);

      // Track click for new tab partner
      console.log('DeepLinkHandler: Tracking click for new tab partner...');
      let newTabClickId: string | null = null;
      
      try {
        newTabClickId = await Promise.race([
          partnerService.trackClick(searchParams, finalLocation, newTabPartnerName),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Click tracking timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.warn('DeepLinkHandler: Failed to track click for new tab partner:', error);
        await ErrorLoggingService.logPartnerError(
          "Click Tracking Timeout",
          `Failed to track click for new tab partner: ${error instanceof Error ? error.message : 'Unknown error'}`,
          newTabPartnerName,
          {
            component: 'DeepLinkHandler',
            function: 'trackClick',
            search_params: searchParams,
            location_data: finalLocation
          }
        );
      }

      console.log('DeepLinkHandler: New tab click ID:', newTabClickId);

      // Generate new tab URL
      console.log('DeepLinkHandler: Generating new tab URL...');
      const newTabUrl = await partnerService.generateDeepLink(searchParams, finalLocation, newTabPartnerName, newTabClickId || undefined);
      console.log('DeepLinkHandler: New tab URL:', newTabUrl);
      
      // Redirect current page to new tab partner
      console.log('DeepLinkHandler: Redirecting to new tab partner...');
      window.location.href = newTabUrl;
      
    } catch (error) {
      console.error('DeepLinkHandler: New-tab-only deep link generation error:', error);
      
      // Log the error
      await ErrorLoggingService.logSystemError(
        "Search Unavailable - New Tab Deep Link Generation Failed",
        error instanceof Error ? error.message : 'Unknown error during new tab deep link generation',
        {
          component: 'DeepLinkHandler',
          function: 'generateNewTabOnlyDeepLink',
          search_params: searchParams,
          location_data: finalLocation,
          error_type: error instanceof Error ? error.constructor.name : 'Unknown'
        },
        error instanceof Error ? error.stack : undefined
      );
      
      // Try fallback
      try {
        console.log('DeepLinkHandler: Attempting fallback redirect...');
        const fallbackUrl = generateFallbackUrl(searchParams, finalLocation);
        if (fallbackUrl) {
          console.log('DeepLinkHandler: Using fallback URL:', fallbackUrl);
          window.location.href = fallbackUrl;
          return;
        }
      } catch (fallbackError) {
        console.error('DeepLinkHandler: Fallback also failed:', fallbackError);
      }
      
      toast({
        title: "Search Unavailable",
        description: "We're having trouble starting your search. Please try again in a moment.",
        variant: "default",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAndOpenDeepLink,
    generateRedirectOnlyDeepLink,
    generateNewTabOnlyDeepLink,
    isGenerating
  };
};
