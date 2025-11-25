
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, MapIcon } from 'lucide-react';
import { KayakLocation } from '@/types/location';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useFormPosition } from '@/hooks/useFormPosition';
import { LocationItem } from './LocationItem';
import { cn } from '@/lib/utils';

interface AutocompleteInputProps {
  id: string;
  value: string;
  onChange: (value: string, location?: KayakLocation) => void;
  placeholder?: string;
  isPickup?: boolean;
  className?: string;
  // Add ref prop for parent component to access search results
  onRef?: (ref: { getTopResult: () => KayakLocation | null }) => void;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  isPickup = true,
  className = "",
  onRef
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const skipBlurCloseRef = useRef(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const { locations, isLoading, error, noResults, searchLocations } = useLocationSearch();
  const { setIsFormPushedUp } = useFormPosition();

  // Detect mobile device and viewport changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const updateViewport = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };
    
    checkMobile();
    updateViewport();
    
    window.addEventListener('resize', checkMobile);
    window.visualViewport?.addEventListener('resize', updateViewport);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    searchLocations(inputValue);
    setIsOpen(inputValue.length >= 2);
  };

  const handleLocationSelect = (location: KayakLocation) => {
    onChange(location.displayName, location);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleIconError = (locationId: string) => {
    setFailedIcons(prev => new Set([...prev, locationId]));
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (isMobile) {
      setIsFormPushedUp(true);
    }
    if (value.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => {
      if (skipBlurCloseRef.current) {
        skipBlurCloseRef.current = false;
        return;
      }
      setIsFocused(false);
      setIsOpen(false);
      if (isMobile) {
        setIsFormPushedUp(false);
      }
    }, 200);
  };

  const blurForMobileScroll = () => {
    if (!isMobile || !inputRef.current) return;
    skipBlurCloseRef.current = true;
    inputRef.current.blur();
    setIsFormPushedUp(false);
  };

  useEffect(() => {
    if (!isMobile || !isFocused) return;
    const dropdownEl = dropdownRef.current;
    if (!dropdownEl) return;

    const viewportEl = dropdownEl.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]');
    if (!viewportEl) return;

    const handleTouchInteraction = () => {
      blurForMobileScroll();
    };

    viewportEl.addEventListener('touchstart', handleTouchInteraction, { passive: true });
    viewportEl.addEventListener('touchmove', handleTouchInteraction, { passive: true });

    return () => {
      viewportEl.removeEventListener('touchstart', handleTouchInteraction);
      viewportEl.removeEventListener('touchmove', handleTouchInteraction);
    };
  }, [isMobile, isFocused]);

  // Calculate dropdown position for mobile with proper scrolling
  const getDropdownStyle = () => {
    if (!isMobile || !containerRef.current) {
      return {};
    }

    const rect = containerRef.current.getBoundingClientRect();
    const keyboardHeight = window.innerHeight - viewportHeight;
    const availableHeight = viewportHeight - rect.bottom - 20;
    
    // Ensure the dropdown doesn't go below the viewport
    const maxHeight = Math.max(200, Math.min(availableHeight, 350));

    return {
      position: 'fixed' as const,
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      right: `${window.innerWidth - rect.right}px`,
      height: `${maxHeight}px`,
      zIndex: 99999,
    };
  };

  // Limit results to 6 items for mobile
  const limitedLocations = locations.slice(0, 6);

  // Expose the best result to parent component (airport first, then first result)
  useEffect(() => {
    if (onRef) {
      onRef({
        getTopResult: () => {
          if (locations.length === 0) return null;
          
          // First, try to find an airport
          const airport = locations.find(location => location.type === 'airport');
          if (airport) {
            console.log('AutocompleteInput: Found airport as best result:', airport);
            return airport;
          }
          
          // If no airport found, return the first result
          console.log('AutocompleteInput: No airport found, using first result:', locations[0]);
          return locations[0];
        }
      });
    }
  }, [locations, onRef]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", !isMobile && "z-[100000]")}
    >
      <Input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={cn(
          "w-full transition-all duration-200",
          className
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {isLoading ? (
          <Loader2 className={`text-gray-400 animate-spin ${isPickup ? 'h-5 w-5' : 'h-4 w-4'}`} />
        ) : (
          <MapIcon className={`text-gray-400 ${isPickup ? 'h-5 w-5' : 'h-4 w-4'}`} />
        )}
      </div>
      
      {error && (
        <div className="absolute z-[99999] w-full mt-1 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600 shadow-lg">
          {error}
        </div>
      )}

      {noResults && !isLoading && !error && (
        <div className="absolute z-[99999] w-full mt-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600 text-center shadow-lg">
          No locations found for "{value}"
        </div>
      )}
      
      {isFocused && (limitedLocations.length > 0 || isLoading) && (
        <div 
          ref={dropdownRef}
          className={cn(
            "bg-white border border-gray-200 rounded-lg shadow-lg",
            isMobile ? "" : "absolute top-full left-0 right-0 z-[100100] mt-1"
          )}
          style={getDropdownStyle()}
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2">Searching locations...</p>
            </div>
          ) : (
            <ScrollArea className={isMobile ? "h-full" : "h-[420px]"}>
              <div>
                {limitedLocations.map((location, index) => (
                  <LocationItem
                    key={location.id}
                    location={location}
                    failedIcons={failedIcons}
                    onIconError={handleIconError}
                    onSelect={handleLocationSelect}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
};
