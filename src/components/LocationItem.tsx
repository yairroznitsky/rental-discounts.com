
import React from 'react';
import { KayakLocation } from '@/types/location';
import { LocationIcon } from './LocationIcon';

interface LocationItemProps {
  location: KayakLocation;
  failedIcons: Set<string>;
  onIconError: (locationId: string) => void;
  onSelect: (location: KayakLocation) => void;
}

export const LocationItem: React.FC<LocationItemProps> = ({
  location,
  failedIcons,
  onIconError,
  onSelect
}) => {
  return (
    <button
      type="button"
      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
      onClick={() => onSelect(location)}
    >
      <div className="flex-shrink-0">
        <LocationIcon
          type={location.type}
          iconUrl={location.iconUrl}
          locationId={location.id}
          failedIcons={failedIcons}
          onIconError={onIconError}
        />
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {location.displayName}
        </div>
        {location.city && location.country && (
          <div className="text-sm text-gray-500">{location.city}, {location.country}</div>
        )}
      </div>
    </button>
  );
};
