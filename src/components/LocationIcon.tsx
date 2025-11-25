
import React from 'react';
import { Plane, Building2, MapPin } from 'lucide-react';

interface LocationIconProps {
  type?: string;
  iconUrl?: string | null;
  locationId: string;
  failedIcons: Set<string>;
  onIconError: (locationId: string) => void;
}

export const LocationIcon: React.FC<LocationIconProps> = ({
  type,
  iconUrl,
  locationId,
  failedIcons,
  onIconError
}) => {
  const getLocationIcon = (type?: string) => {
    switch (type) {
      case 'airport':
        return <Plane className="h-4 w-4 text-blue-500 flex-shrink-0" />;
      case 'city':
        return <Building2 className="h-4 w-4 text-green-500 flex-shrink-0" />;
      case 'hotel':
        return <Building2 className="h-4 w-4 text-purple-500 flex-shrink-0" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />;
    }
  };

  if (iconUrl && !failedIcons.has(locationId)) {
    return (
      <img 
        src={iconUrl} 
        alt={`${type} icon`}
        className="h-4 w-4 object-contain"
        onError={() => onIconError(locationId)}
      />
    );
  }

  return getLocationIcon(type);
};
