
import React, { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLanguage } from '@/hooks/useLanguage';

interface SearchButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  onSubmit: () => void;
  className?: string;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  isGenerating,
  isDisabled,
  onSubmit,
  className = ""
}) => {
  const { t } = useLanguage();

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = useCallback(async () => {
    // Fire Google Ads conversion tracking using gtag_report_conversion
    if (typeof window !== 'undefined' && window.gtag_report_conversion) {
      window.gtag_report_conversion();
    }
    
    // Call onSubmit first to process the search and get the URL with parameters
    onSubmit();
  }, [onSubmit]);

  // Memoize button text and aria labels to prevent recalculation
  const buttonText = useMemo(() => 
    isGenerating ? 'Searching...' : t('searchCars'), 
    [isGenerating, t]
  );

  const ariaLabel = useMemo(() => 
    isGenerating 
      ? 'Searching for car rentals, please wait' 
      : `Search for car rentals - ${buttonText}`,
    [isGenerating, buttonText]
  );

  return (
    <Button
      type="submit"
      size="lg"
      disabled={isDisabled || isGenerating}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-describedby={isGenerating ? "search-loading-description" : undefined}
      className={`search-button w-full text-white font-bold py-4 text-lg shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center rounded-none ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isGenerating && (
          <Spinner 
            size="sm" 
            className="text-white search-spinner" 
            aria-hidden="true"
          />
        )}
        <span>
          {buttonText}
        </span>
      </div>
      {isGenerating && (
        <span id="search-loading-description" className="sr-only">
          Please wait while we search for available car rentals. This may take a few moments.
        </span>
      )}
    </Button>
  );
};
