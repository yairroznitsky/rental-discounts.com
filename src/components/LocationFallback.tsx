import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, X } from 'lucide-react';

interface LocationFallbackProps {
  onLocationSelect: (location: { name: string; country: string; iataCode: string }) => void;
  onClose: () => void;
}

const LocationFallback: React.FC<LocationFallbackProps> = ({ onLocationSelect, onClose }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      // Simple IATA code mapping for common cities
      const iataMap: Record<string, string> = {
        'london': 'LHR',
        'paris': 'CDG',
        'new york': 'JFK',
        'los angeles': 'LAX',
        'chicago': 'ORD',
        'toronto': 'YYZ',
        'sydney': 'SYD',
        'tokyo': 'NRT',
        'berlin': 'BER',
        'madrid': 'MAD',
        'rome': 'FCO',
        'amsterdam': 'AMS',
        'dublin': 'DUB',
        'zurich': 'ZUR',
        'vienna': 'VIE',
        'milan': 'MXP',
        'barcelona': 'BCN',
        'lisbon': 'LIS',
        'brussels': 'BRU',
        'copenhagen': 'CPH',
        'stockholm': 'ARN',
        'oslo': 'OSL',
        'helsinki': 'HEL',
        'warsaw': 'WAW',
        'prague': 'PRG',
        'budapest': 'BUD',
        'bucharest': 'OTP',
        'sofia': 'SOF',
        'athens': 'ATH',
        'istanbul': 'IST',
        'moscow': 'SVO',
        'dubai': 'DXB',
        'singapore': 'SIN',
        'hong kong': 'HKG',
        'seoul': 'ICN',
        'beijing': 'PEK',
        'shanghai': 'PVG',
        'mumbai': 'BOM',
        'delhi': 'DEL',
        'bangkok': 'BKK',
        'jakarta': 'CGK',
        'manila': 'MNL',
        'kuala lumpur': 'KUL',
        'ho chi minh city': 'SGN',
        'hanoi': 'HAN',
        'taipei': 'TPE',
        'melbourne': 'MEL',
        'brisbane': 'BNE',
        'perth': 'PER',
        'adelaide': 'ADL',
        'auckland': 'AKL',
        'wellington': 'WLG',
        'montreal': 'YUL',
        'vancouver': 'YVR',
        'calgary': 'YYC',
        'edmonton': 'YEG',
        'ottawa': 'YOW',
        'quebec city': 'YQB',
        'halifax': 'YHZ',
        'winnipeg': 'YWG',
        'mexico city': 'MEX',
        'cancun': 'CUN',
        'guadalajara': 'GDL',
        'monterrey': 'MTY',
        'sao paulo': 'GRU',
        'rio de janeiro': 'GIG',
        'buenos aires': 'EZE',
        'santiago': 'SCL',
        'lima': 'LIM',
        'bogota': 'BOG',
        'caracas': 'CCS',
        'montevideo': 'MVD',
        'johannesburg': 'JNB',
        'cape town': 'CPT',
        'cairo': 'CAI',
        'casablanca': 'CMN',
        'tunis': 'TUN',
        'algiers': 'ALG',
        'lagos': 'LOS',
        'nairobi': 'NBO',
        'addis ababa': 'ADD',
        'dakar': 'DKR',
        'abidjan': 'ABJ',
        'accra': 'ACC',
        'douala': 'DLA',
        'kinshasa': 'FIH',
        'luanda': 'LAD',
        'maputo': 'MPM',
        'harare': 'HRE',
        'gaborone': 'GBE',
        'windhoek': 'WDH',
        'porto': 'OPO',
        'nice': 'NCE',
        'lyon': 'LYS',
        'marseille': 'MRS',
        'toulouse': 'TLS',
        'bordeaux': 'BOD',
        'nantes': 'NTE',
        'strasbourg': 'SXB',
        'lille': 'LIL',
        'rennes': 'RNS',
        'montpellier': 'MPL',
        'toulon': 'TLN',
        'orleans': 'ORE',
        'tours': 'TUF',
        'dijon': 'DIJ',
        'angers': 'ANE',
        'le havre': 'LEH',
        'saint-etienne': 'EBU',
        'nimes': 'FNI',
        'troyes': 'QYR',
        'le mans': 'LME',
        'amiens': 'QAM',
        'limoges': 'LIG',
        'annecy': 'NCY',
        'perpignan': 'PGF',
        'boulogne-billancourt': 'BOU',
        'mulhouse': 'MLH',
        'rouen': 'URO',
        'cannes': 'CEQ',
        'dunkerque': 'XDK',
        'nancy': 'NCE',
        'saint-denis': 'SDN',
        'argenteuil': 'ARG',
        'montreuil': 'MTR',
        'roubaix': 'RBA',
        'tourcoing': 'TCO',
        'nanterre': 'NAN',
        'avignon': 'AVN',
        'créteil': 'CRE',
        'dunkirk': 'XDK',
        'poitiers': 'PIS',
        'asnières-sur-seine': 'ANS',
        'courbevoie': 'COU',
        'versailles': 'VRS',
        'colombes': 'COL',
        'fort-de-france': 'FDF',
        'saint-pierre': 'SPE',
        'cayenne': 'CAY',
        'saint-paul': 'SPL',
        'nouméa': 'NOU',
        'papeete': 'PPT',
        'faaa': 'PPT',
        'pirae': 'PIR',
        'mahina': 'MAH',
        'punaauia': 'PUN',
        'paea': 'PAE',
        'moorea-maiao': 'MOZ',
        'huahine': 'HUH',
        'raiatea': 'RFP',
        'taha\'a': 'THA',
        'bora-bora': 'BOB',
        'maupiti': 'MAU',
        'tupai': 'TPI',
        'manihi': 'XMH',
        'tikehau': 'TIH',
        'arutua': 'AXR',
        'takapoto': 'TKP',
        'takume': 'TKU',
        'fakarava': 'FAV',
        'kauehi': 'KAU',
        'arue': 'ARU',
        'hitiaa o te ra': 'HIT'
      };

      const iataCode = iataMap[city.toLowerCase()] || 'UNK';
      
      onLocationSelect({
        name: city.trim(),
        country: country.trim(),
        iataCode
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#219f61]" />
            Set Your Location
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          We couldn't detect your location automatically. Please enter your city and country:
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., London, Paris, Tokyo"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g., United Kingdom, France, Japan"
              required
            />
          </div>
          
          <div className="flex space-x-3">
            <Button type="submit" className="flex-1">
              Set Location
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LocationFallback };
export default LocationFallback;
