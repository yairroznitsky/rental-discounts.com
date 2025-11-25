
import React, { useState, useEffect } from 'react';
import { useSearchForm } from '@/hooks/useSearchForm';
import { useDeepLinkHandler } from '@/hooks/useDeepLinkHandler';
import { useBackgroundGeolocation } from '@/hooks/useBackgroundGeolocation';
import { useLanguage } from '@/hooks/useLanguage';
import { LocationInputs } from './LocationInputs';
import { DateTimeInputs } from './DateTimeInputs';
import { SearchButton } from './SearchButton';
import { KayakLocation } from '@/types/location';
import { RentalLocation } from '@/types/partner';
import { AutocompleteInput } from './AutocompleteInput';
import LocationFallback from './LocationFallback';

export const SearchForm = () => {
  const { t } = useLanguage();
  const { defaultLocation, isLoading: isLocationLoading } = useBackgroundGeolocation();
  const { generateRedirectOnlyDeepLink, isGenerating } = useDeepLinkHandler();
  
  const {
    formData,
    differentDropoff,
    selectedPickupLocation,
    selectedDropoffLocation,
    setDifferentDropoff,
    setSelectedPickupLocation,
    setSelectedDropoffLocation,
    handleInputChange,
    handlePickupDateChange,
  } = useSearchForm();

  // Fix: Change from useRef to useState for the location search refs
  const [pickupLocationSearchRef, setPickupLocationSearchRef] = useState<{ getTopResult: () => KayakLocation | null } | null>(null);
  const [dropoffLocationSearchRef, setDropoffLocationSearchRef] = useState<{ getTopResult: () => KayakLocation | null } | null>(null);
  
  // State for location fallback modal
  const [showLocationFallback, setShowLocationFallback] = useState(false);

  // Store detected location in memory/cookie for analytics but don't auto-populate form
  useEffect(() => {
    console.log('SearchForm: Location detection status:', {
      defaultLocation: !!defaultLocation,
      isLocationLoading,
      detectedLocation: defaultLocation ? {
        city: defaultLocation.city,
        country: defaultLocation.country,
        code: defaultLocation.code
      } : null
    });
    
    if (defaultLocation) {
      console.log('SearchForm: Location detected and stored in memory:', defaultLocation);
      
      // Store location in localStorage for analytics/tracking
      try {
        localStorage.setItem('detectedLocation', JSON.stringify({
          city: defaultLocation.city,
          country: defaultLocation.country,
          code: defaultLocation.code,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.warn('SearchForm: Could not store location in localStorage:', error);
      }
      
      // You can also set a cookie here if needed
      // document.cookie = `detectedLocation=${JSON.stringify(defaultLocation)}; path=/; max-age=86400`;
    }
  }, [defaultLocation, isLocationLoading]);

  // Note: No automatic fallback modal since we're not auto-populating the field
  // Users can manually click the "Set" button if they want to set their location

  const convertToRentalLocation = (kayakLocation: KayakLocation): RentalLocation => ({
    id: kayakLocation.id,
    name: kayakLocation.name,
    displayName: kayakLocation.displayName,
    city: kayakLocation.city,
    country: kayakLocation.country,
    code: kayakLocation.code,
    type: kayakLocation.type,
    iconUrl: kayakLocation.iconUrl,
  });

  const handleLocationFallbackSelect = (location: { name: string; country: string; iataCode: string }) => {
    console.log('SearchForm: Location fallback selected:', location);
    
    // Convert to KayakLocation format
    const kayakLocation: KayakLocation = {
      id: `${location.name.toLowerCase().replace(/\s+/g, '-')}-${location.iataCode}`,
      name: location.name,
      displayName: `${location.name}, ${location.country}`,
      city: location.name,
      country: location.country,
      code: location.iataCode,
      type: 'airport',
      iconUrl: undefined
    };
    
    // Update form data
    handleInputChange('pickup', kayakLocation.displayName);
    setSelectedPickupLocation(kayakLocation);
    setShowLocationFallback(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    console.log('SearchForm: handleSubmit called with formData:', formData);
    console.log('SearchForm: differentDropoff:', differentDropoff);
    console.log('SearchForm: selectedPickupLocation:', selectedPickupLocation);
    console.log('SearchForm: selectedDropoffLocation:', selectedDropoffLocation);
    
    // Validate required form data (pickup can be empty if we have defaultLocation)
    if ((!formData.pickup && !defaultLocation) || !formData.pickupDate || !formData.dropoffDate || !formData.pickupTime || !formData.dropoffTime) {
      console.error('SearchForm: Missing required form data:', {
        pickup: !!formData.pickup,
        defaultLocation: !!defaultLocation,
        pickupDate: !!formData.pickupDate,
        dropoffDate: !!formData.dropoffDate,
        pickupTime: !!formData.pickupTime,
        dropoffTime: !!formData.dropoffTime
      });
      alert('Please fill in all required fields before searching.');
      return;
    }
    
    // Get pickup location
    let pickupRentalLocation: RentalLocation | null = null;
    
    // Check if the pickup text looks like an IATA code (3-4 characters, all caps or mixed case)
    const pickupText = formData.pickup.trim();
    const pickupLooksLikeIataCode = pickupText.length >= 3 && pickupText.length <= 4 && /^[A-Za-z]{3,4}$/.test(pickupText);
    
    // If user has selected a specific pickup location from dropdown, use it
    if (selectedPickupLocation) {
      pickupRentalLocation = convertToRentalLocation(selectedPickupLocation);
      console.log('SearchForm: Using selected pickup location:', selectedPickupLocation);
    }
    // If pickup text looks like an IATA code, don't use search results - let partners handle typed text
    else if (pickupLooksLikeIataCode) {
      console.log('SearchForm: Pickup text looks like IATA code, not using search results:', pickupText);
      pickupRentalLocation = null; // Let partners handle typed text directly
    }
    // If pickup field has content and pickup location search ref is available, try to get top result
    else if (formData.pickup.length >= 2 && pickupLocationSearchRef) {
      const topResult = pickupLocationSearchRef.getTopResult();
      if (topResult) {
        console.log('SearchForm: Using top pickup search result as fallback:', topResult);
        pickupRentalLocation = convertToRentalLocation(topResult);
      }
    }
    // If pickup field is empty, use auto-detected location as fallback
    else if (!formData.pickup && defaultLocation) {
      console.log('SearchForm: Pickup field is empty, using auto-detected location:', defaultLocation);
      pickupRentalLocation = defaultLocation;
    }
    
    // Get dropoff location - always check if dropoff field has a different location
    let dropoffRentalLocation: RentalLocation | null = null;
    
    // Check if the dropoff text looks like an IATA code (3-4 characters, all caps or mixed case)
    const dropoffText = formData.dropoff.trim();
    const looksLikeIataCode = dropoffText.length >= 3 && dropoffText.length <= 4 && /^[A-Za-z]{3,4}$/.test(dropoffText);
    
    // If user has selected a specific dropoff location from dropdown, use it
    if (selectedDropoffLocation) {
      dropoffRentalLocation = convertToRentalLocation(selectedDropoffLocation);
      console.log('SearchForm: Using selected dropoff location:', selectedDropoffLocation);
    } 
    // If dropoff text looks like an IATA code, don't use search results - let partners handle typed text
    else if (looksLikeIataCode) {
      console.log('SearchForm: Dropoff text looks like IATA code, not using search results:', dropoffText);
      dropoffRentalLocation = null; // Let partners handle typed text directly
    }
    // If dropoff field has content and dropoff location search ref is available, try to get top result
    else if (formData.dropoff.length >= 2 && dropoffLocationSearchRef) {
      const topResult = dropoffLocationSearchRef.getTopResult();
      if (topResult) {
        console.log('SearchForm: Using top dropoff search result as fallback:', topResult);
        dropoffRentalLocation = convertToRentalLocation(topResult);
      }
    }
    
    // Use detected location if pickup field is empty
    const pickupLocation = formData.pickup || (defaultLocation ? defaultLocation.displayName : '');
    const dropoffLocation = differentDropoff ? (formData.dropoff || (defaultLocation ? defaultLocation.displayName : '')) : pickupLocation;
    
    const searchParams = {
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      pickupTime: formData.pickupTime,
      dropoffTime: formData.dropoffTime,
      pickupLocation: pickupRentalLocation,
      dropoffLocation: dropoffRentalLocation
    };

    // Build URL with search parameters for the passthrough page
    const currentPath = window.location.pathname;
    const searchUrl = currentPath === '/' ? '/search' : `${currentPath}/search`;
    
    const urlParams = new URLSearchParams();
    urlParams.set('pickup', searchParams.pickup);
    urlParams.set('dropoff', searchParams.dropoff);
    urlParams.set('pickupDate', searchParams.pickupDate);
    urlParams.set('dropoffDate', searchParams.dropoffDate);
    urlParams.set('pickupTime', searchParams.pickupTime);
    urlParams.set('dropoffTime', searchParams.dropoffTime);
    urlParams.set('differentDropoff', differentDropoff.toString());
    
    if (pickupRentalLocation) {
      urlParams.set('pickupLocation', encodeURIComponent(JSON.stringify(pickupRentalLocation)));
    }
    
    if (dropoffRentalLocation) {
      urlParams.set('dropoffLocation', encodeURIComponent(JSON.stringify(dropoffRentalLocation)));
    }
    
    const fullSearchUrl = `${searchUrl}?${urlParams.toString()}`;
    
    console.log('SearchForm: Generated search URL with parameters:', fullSearchUrl);
    console.log('SearchForm: URL parameters:', Object.fromEntries(urlParams.entries()));
    
    // Open new tab with the full URL including parameters
    const newTab = window.open(fullSearchUrl, '_blank');
    
    if (newTab) {
      console.log('SearchForm: Successfully opened new tab with search parameters');
    } else {
      console.error('SearchForm: Failed to open new tab - popup may be blocked');
    }

    // Redirect current page to redirect partner
    console.log('SearchForm: Redirecting current page to redirect partner...');
    await generateRedirectOnlyDeepLink(searchParams, pickupRentalLocation, defaultLocation);
  };

  const handlePickupLocationChange = (value: string, location?: KayakLocation) => {
    handleInputChange('pickup', value);
    setSelectedPickupLocation(location || null);
  };

  const handleDropoffLocationChange = (value: string, location?: KayakLocation) => {
    handleInputChange('dropoff', value);
    setSelectedDropoffLocation(location || null);
  };

  const handleDifferentDropoffChange = (checked: boolean) => {
    setDifferentDropoff(checked);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Desktop Layout - All fields in one line with proper alignment */}
      <div className="hidden lg:block">
        {/* Main horizontal form row */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-end gap-4">
            {/* Pickup Location */}
            <div className="flex-1">
              <LocationInputs
                pickup={formData.pickup}
                dropoff={formData.dropoff}
                differentDropoff={differentDropoff}
                onPickupChange={handlePickupLocationChange}
                onDropoffChange={handleDropoffLocationChange}
                onDifferentDropoffChange={handleDifferentDropoffChange}
                isDesktop={true}
                onPickupRef={setPickupLocationSearchRef}
                onDropoffRef={setDropoffLocationSearchRef}
              />
            </div>

            {/* Date/Time Fields */}
            <div className="flex items-end gap-4">
              <DateTimeInputs
                pickupDate={formData.pickupDate}
                pickupTime={formData.pickupTime}
                dropoffDate={formData.dropoffDate}
                dropoffTime={formData.dropoffTime}
                onPickupDateChange={handlePickupDateChange}
                onInputChange={handleInputChange}
                isDesktop={true}
              />

              {/* Search Button */}
              <div className="flex-shrink-0">
                <SearchButton
                  isGenerating={isGenerating}
                  isDisabled={isGenerating}
                  onSubmit={handleSubmit}
                  className="h-12 px-8 bg-[#219f61] hover:bg-[#1a7d4d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Different Dropoff Selector - Below the form */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="different-dropoff-desktop"
                checked={differentDropoff}
                onChange={(e) => handleDifferentDropoffChange(e.target.checked)}
                className="w-4 h-4 text-[#219f61] bg-gray-100 border-gray-300 rounded focus:ring-[#219f61]"
              />
              <label htmlFor="different-dropoff-desktop" className="text-sm font-medium text-gray-700 cursor-pointer">
                {t('dropCarOffDifferentLocation')}
              </label>
            </div>
            
            {/* Dropoff Location Field - Same width as pickup location */}
            {differentDropoff && (
              <div className="mt-4 flex-1">
                <label htmlFor="dropoff-desktop" className="text-sm font-medium text-gray-700 mb-2 block">
                  Drop-off location
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <AutocompleteInput
                    id="dropoff-desktop"
                    value={formData.dropoff}
                    onChange={handleDropoffLocationChange}
                    placeholder="Airport, city, or station"
                    isPickup={false}
                    className="pl-10 h-12 border-2 border-[#219f61] focus:border-[#1a7d4d] focus:ring-[#219f61] rounded-lg w-full"
                    onRef={setDropoffLocationSearchRef}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Unchanged */}
      <div className="lg:hidden space-y-4">
        <div className="bg-[#E5EAEA] p-4 rounded-xl border border-[#E5EAEA]">
          <LocationInputs
            pickup={formData.pickup}
            dropoff={formData.dropoff}
            differentDropoff={differentDropoff}
            onPickupChange={handlePickupLocationChange}
            onDropoffChange={handleDropoffLocationChange}
            onDifferentDropoffChange={handleDifferentDropoffChange}
            isDesktop={false}
            onPickupRef={setPickupLocationSearchRef}
            onDropoffRef={setDropoffLocationSearchRef}
          />
        </div>

        <DateTimeInputs
          pickupDate={formData.pickupDate}
          pickupTime={formData.pickupTime}
          dropoffDate={formData.dropoffDate}
          dropoffTime={formData.dropoffTime}
          onPickupDateChange={handlePickupDateChange}
          onInputChange={handleInputChange}
          isDesktop={false}
        />

        <SearchButton
          isGenerating={isGenerating}
          isDisabled={isGenerating}
          onSubmit={handleSubmit}
        />
      </div>
      
      {/* Location Fallback Modal */}
      {showLocationFallback && (
        <LocationFallback
          onLocationSelect={handleLocationFallbackSelect}
          onClose={() => setShowLocationFallback(false)}
        />
      )}
    </form>
  );
};
