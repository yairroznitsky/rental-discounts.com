
import React from 'react';
import { Label } from '@/components/ui/label';
import { AutocompleteInput } from './AutocompleteInput';
import { useLanguage } from '@/hooks/useLanguage';
import { KayakLocation } from '@/types/location';

interface LocationInputsProps {
  pickup: string;
  dropoff: string;
  differentDropoff: boolean;
  onPickupChange: (value: string, location?: KayakLocation) => void;
  onDropoffChange: (value: string, location?: KayakLocation) => void;
  onDifferentDropoffChange: (checked: boolean) => void;
  isDesktop?: boolean;
  // Fix: Change prop types to accept setter functions
  onPickupRef?: (ref: { getTopResult: () => KayakLocation | null }) => void;
  onDropoffRef?: (ref: { getTopResult: () => KayakLocation | null }) => void;
}

export const LocationInputs: React.FC<LocationInputsProps> = ({
  pickup,
  dropoff,
  differentDropoff,
  onPickupChange,
  onDropoffChange,
  onDifferentDropoffChange,
  isDesktop = false,
  onPickupRef,
  onDropoffRef
}) => {
  const { t } = useLanguage();
  const suffix = isDesktop ? '' : '-mobile';

  if (isDesktop) {
    return (
      <div>
        <Label htmlFor={`pickup${suffix}`} className="text-sm font-medium text-gray-700 mb-2 block">
          {t('pickupLocation')}
        </Label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <AutocompleteInput
            id={`pickup${suffix}`}
            value={pickup}
            onChange={onPickupChange}
            placeholder={t('locationPlaceholder')}
            isPickup={true}
            className="pl-10 h-12 border-2 border-yellow-400 focus:border-yellow-500 rounded-lg w-full"
            onRef={onPickupRef}
          />
        </div>
      </div>
    );
  }

  // Mobile layout (unchanged)
  return (
    <>
      {/* Pickup Location - Enhanced prominence */}
      <div className={isDesktop ? "lg:col-span-2" : ""}>
        <Label htmlFor={`pickup${suffix}`} className={`font-semibold text-gray-800 mb-3 block ${
          isDesktop ? 'text-base' : 'text-lg'
        }`}>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            {t('pickupLocation')}
          </span>
        </Label>
        <AutocompleteInput
          id={`pickup${suffix}`}
          value={pickup}
          onChange={onPickupChange}
          placeholder={t('pickupLocationPlaceholder')}
          isPickup={true}
          onRef={onPickupRef}
        />
      </div>

      {/* Drop-off Location Toggle & Field */}
      <div className={isDesktop ? "lg:col-span-1" : ""}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id={`different-dropoff${suffix}`}
              checked={differentDropoff}
              onChange={(e) => onDifferentDropoffChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor={`different-dropoff${suffix}`} className="text-sm text-gray-600">
              {t('differentDropoffLabel')}
            </Label>
          </div>
          {differentDropoff && (
            <AutocompleteInput
              id={`dropoff${suffix}`}
              value={dropoff}
              onChange={onDropoffChange}
              placeholder={t('dropoffLocationPlaceholder')}
              isPickup={false}
              onRef={onDropoffRef}
            />
          )}
        </div>
      </div>
    </>
  );
};
