interface IPLocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  region?: string;
}

// Major US and Canadian cities with their IATA codes
const CITY_IATA_MAP: { [key: string]: string } = {
  'New York': 'NYC',
  'Los Angeles': 'LAX',
  'Chicago': 'ORD',
  'Houston': 'IAH',
  'Phoenix': 'PHX',
  'Philadelphia': 'PHL',
  'San Antonio': 'SAT',
  'San Diego': 'SAN',
  'Dallas': 'DFW',
  'San Jose': 'SJC',
  'Austin': 'AUS',
  'Jacksonville': 'JAX',
  'Fort Worth': 'DFW',
  'Columbus': 'CMH',
  'Charlotte': 'CLT',
  'San Francisco': 'SFO',
  'Indianapolis': 'IND',
  'Seattle': 'SEA',
  'Denver': 'DEN',
  'Washington': 'DCA',
  'Boston': 'BOS',
  'El Paso': 'ELP',
  'Nashville': 'BNA',
  'Detroit': 'DTW',
  'Oklahoma City': 'OKC',
  'Portland': 'PDX',
  'Las Vegas': 'LAS',
  'Memphis': 'MEM',
  'Louisville': 'SDF',
  'Baltimore': 'BWI',
  'Milwaukee': 'MKE',
  'Albuquerque': 'ABQ',
  'Tucson': 'TUS',
  'Fresno': 'FAT',
  'Sacramento': 'SMF',
  'Atlanta': 'ATL',
  'Kansas City': 'MCI',
  'Long Beach': 'LGB',
  'Colorado Springs': 'COS',
  'Raleigh': 'RDU',
  'Miami': 'MIA',
  'Virginia Beach': 'ORF',
  'Omaha': 'OMA',
  'Oakland': 'OAK',
  'Minneapolis': 'MSP',
  'Tulsa': 'TUL',
  'Arlington': 'DFW',
  'Tampa': 'TPA',
  'New Orleans': 'MSY',
  'Wichita': 'ICT',
  'Cleveland': 'CLE',
  'Bakersfield': 'BFL',
  'Aurora': 'DEN',
  'Anaheim': 'SNA',
  'Honolulu': 'HNL',
  'Santa Ana': 'SNA',
  'Corpus Christi': 'CRP',
  'Riverside': 'ONT',
  'Lexington': 'LEX',
  'Stockton': 'SCK',
  'Henderson': 'LAS',
  'Saint Paul': 'MSP',
  'St. Louis': 'STL',
  'Cincinnati': 'CVG',
  'Pittsburgh': 'PIT',
  'Greensboro': 'GSO',
  'Anchorage': 'ANC',
  'Plano': 'DFW',
  'Lincoln': 'LNK',
  'Orlando': 'MCO',
  'Irvine': 'SNA',
  'Newark': 'EWR',
  'Durham': 'RDU',
  'Chula Vista': 'SAN',
  'Toledo': 'TOL',
  'Fort Wayne': 'FWA',
  'St. Petersburg': 'PIE',
  'Laredo': 'LRD',
  'Jersey City': 'EWR',
  'Chandler': 'PHX',
  'Madison': 'MSN',
  'Lubbock': 'LBB',
  'Scottsdale': 'PHX',
  'Reno': 'RNO',
  'Buffalo': 'BUF',
  'Gilbert': 'PHX',
  'Glendale': 'PHX',
  'North Las Vegas': 'LAS',
  'Winston-Salem': 'INT',
  'Chesapeake': 'ORF',
  'Norfolk': 'ORF',
  'Fremont': 'OAK',
  'Garland': 'DFW',
  'Irving': 'DFW',
  'Hialeah': 'MIA',
  'Richmond': 'RIC',
  'Boise': 'BOI',
  'Spokane': 'GEG',
  'Baton Rouge': 'BTR',
  'Tacoma': 'SEA',
  'San Bernardino': 'ONT',
  'Grand Rapids': 'GRR',
  'Huntsville': 'HSV',
  'Salt Lake City': 'SLC',
  'Fayetteville': 'XNA',
  'Yonkers': 'JFK',
  'Amarillo': 'AMA',
  'McKinney': 'DFW',
  'Rochester': 'ROC',
  // Major Canadian cities (Phase 1 - Top 5)
  'Toronto': 'YYZ',
  'Montreal': 'YUL',
  'Vancouver': 'YVR',
  'Calgary': 'YYC',
  'Edmonton': 'YEG'
};

// Add this country code mapping before the COUNTRY_AIRPORT_MAP
const COUNTRY_CODE_MAP: { [key: string]: string } = {
  'AD': 'Andorra',
  'AE': 'United Arab Emirates',
  'AF': 'Afghanistan',
  'AG': 'Antigua and Barbuda',
  'AI': 'Anguilla',
  'AL': 'Albania',
  'AM': 'Armenia',
  'AO': 'Angola',
  'AQ': 'Antarctica',
  'AR': 'Argentina',
  'AS': 'American Samoa',
  'AT': 'Austria',
  'AU': 'Australia',
  'AW': 'Aruba',
  'AX': 'Åland Islands',
  'AZ': 'Azerbaijan',
  'BA': 'Bosnia and Herzegovina',
  'BB': 'Barbados',
  'BD': 'Bangladesh',
  'BE': 'Belgium',
  'BF': 'Burkina Faso',
  'BG': 'Bulgaria',
  'BH': 'Bahrain',
  'BI': 'Burundi',
  'BJ': 'Benin',
  'BL': 'Saint Barthélemy',
  'BM': 'Bermuda',
  'BN': 'Brunei',
  'BO': 'Bolivia',
  'BQ': 'Caribbean Netherlands',
  'BR': 'Brazil',
  'BS': 'Bahamas',
  'BT': 'Bhutan',
  'BV': 'Bouvet Island',
  'BW': 'Botswana',
  'BY': 'Belarus',
  'BZ': 'Belize',
  'CA': 'Canada',
  'CC': 'Cocos Islands',
  'CD': 'Democratic Republic of the Congo',
  'CF': 'Central African Republic',
  'CG': 'Republic of the Congo',
  'CH': 'Switzerland',
  'CI': 'Ivory Coast',
  'CK': 'Cook Islands',
  'CL': 'Chile',
  'CM': 'Cameroon',
  'CN': 'China',
  'CO': 'Colombia',
  'CR': 'Costa Rica', // This is the key one!
  'CU': 'Cuba',
  'CV': 'Cape Verde',
  'CW': 'Curaçao',
  'CX': 'Christmas Island',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'DE': 'Germany',
  'DJ': 'Djibouti',
  'DK': 'Denmark',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'DZ': 'Algeria',
  'EC': 'Ecuador',
  'EE': 'Estonia',
  'EG': 'Egypt',
  'EH': 'Western Sahara',
  'ER': 'Eritrea',
  'ES': 'Spain',
  'ET': 'Ethiopia',
  'FI': 'Finland',
  'FJ': 'Fiji',
  'FK': 'Falkland Islands',
  'FM': 'Micronesia',
  'FO': 'Faroe Islands',
  'FR': 'France',
  'GA': 'Gabon',
  'GB': 'United Kingdom',
  'GD': 'Grenada',
  'GE': 'Georgia',
  'GF': 'French Guiana',
  'GG': 'Guernsey',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GL': 'Greenland',
  'GM': 'Gambia',
  'GN': 'Guinea',
  'GP': 'Guadeloupe',
  'GQ': 'Equatorial Guinea',
  'GR': 'Greece',
  'GS': 'South Georgia and the South Sandwich Islands',
  'GT': 'Guatemala',
  'GU': 'Guam',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HK': 'Hong Kong',
  'HM': 'Heard Island and McDonald Islands',
  'HN': 'Honduras',
  'HR': 'Croatia', // This is the problematic one!
  'HT': 'Haiti',
  'HU': 'Hungary',
  'ID': 'Indonesia',
  'IE': 'Ireland',
  'IL': 'Israel',
  'IM': 'Isle of Man',
  'IN': 'India',
  'IO': 'British Indian Ocean Territory',
  'IQ': 'Iraq',
  'IR': 'Iran',
  'IS': 'Iceland',
  'IT': 'Italy',
  'JE': 'Jersey',
  'JM': 'Jamaica',
  'JO': 'Jordan',
  'JP': 'Japan',
  'KE': 'Kenya',
  'KG': 'Kyrgyzstan',
  'KH': 'Cambodia',
  'KI': 'Kiribati',
  'KM': 'Comoros',
  'KN': 'Saint Kitts and Nevis',
  'KP': 'North Korea',
  'KR': 'South Korea',
  'KW': 'Kuwait',
  'KY': 'Cayman Islands',
  'KZ': 'Kazakhstan',
  'LA': 'Laos',
  'LB': 'Lebanon',
  'LC': 'Saint Lucia',
  'LI': 'Liechtenstein',
  'LK': 'Sri Lanka',
  'LR': 'Liberia',
  'LS': 'Lesotho',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'LV': 'Latvia',
  'LY': 'Libya',
  'MA': 'Morocco',
  'MC': 'Monaco',
  'MD': 'Moldova',
  'ME': 'Montenegro',
  'MF': 'Saint Martin',
  'MG': 'Madagascar',
  'MH': 'Marshall Islands',
  'MK': 'North Macedonia',
  'ML': 'Mali',
  'MM': 'Myanmar',
  'MN': 'Mongolia',
  'MO': 'Macao',
  'MP': 'Northern Mariana Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MS': 'Montserrat',
  'MT': 'Malta',
  'MU': 'Mauritius',
  'MV': 'Maldives',
  'MW': 'Malawi',
  'MX': 'Mexico',
  'MY': 'Malaysia',
  'MZ': 'Mozambique',
  'NA': 'Namibia',
  'NC': 'New Caledonia',
  'NE': 'Niger',
  'NF': 'Norfolk Island',
  'NG': 'Nigeria',
  'NI': 'Nicaragua',
  'NL': 'Netherlands',
  'NO': 'Norway',
  'NP': 'Nepal',
  'NR': 'Nauru',
  'NU': 'Niue',
  'NZ': 'New Zealand',
  'OM': 'Oman',
  'PA': 'Panama',
  'PE': 'Peru',
  'PF': 'French Polynesia',
  'PG': 'Papua New Guinea',
  'PH': 'Philippines',
  'PK': 'Pakistan',
  'PL': 'Poland',
  'PM': 'Saint Pierre and Miquelon',
  'PN': 'Pitcairn Islands',
  'PR': 'Puerto Rico',
  'PS': 'Palestine',
  'PT': 'Portugal',
  'PW': 'Palau',
  'PY': 'Paraguay',
  'QA': 'Qatar',
  'RE': 'Réunion',
  'RO': 'Romania',
  'RS': 'Serbia',
  'RU': 'Russia',
  'RW': 'Rwanda',
  'SA': 'Saudi Arabia',
  'SB': 'Solomon Islands',
  'SC': 'Seychelles',
  'SD': 'Sudan',
  'SE': 'Sweden',
  'SG': 'Singapore',
  'SH': 'Saint Helena',
  'SI': 'Slovenia',
  'SJ': 'Svalbard and Jan Mayen',
  'SK': 'Slovakia',
  'SL': 'Sierra Leone',
  'SM': 'San Marino',
  'SN': 'Senegal',
  'SO': 'Somalia',
  'SR': 'Suriname',
  'SS': 'South Sudan',
  'ST': 'São Tomé and Príncipe',
  'SV': 'El Salvador',
  'SX': 'Sint Maarten',
  'SY': 'Syria',
  'SZ': 'Eswatini',
  'TC': 'Turks and Caicos Islands',
  'TD': 'Chad',
  'TF': 'French Southern Territories',
  'TG': 'Togo',
  'TH': 'Thailand',
  'TJ': 'Tajikistan',
  'TK': 'Tokelau',
  'TL': 'East Timor',
  'TM': 'Turkmenistan',
  'TN': 'Tunisia',
  'TO': 'Tonga',
  'TR': 'Turkey',
  'TT': 'Trinidad and Tobago',
  'TV': 'Tuvalu',
  'TW': 'Taiwan',
  'TZ': 'Tanzania',
  'UA': 'Ukraine',
  'UG': 'Uganda',
  'UM': 'United States Minor Outlying Islands',
  'US': 'United States',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VA': 'Vatican City',
  'VC': 'Saint Vincent and the Grenadines',
  'VE': 'Venezuela',
  'VG': 'British Virgin Islands',
  'VI': 'U.S. Virgin Islands',
  'VN': 'Vietnam',
  'VU': 'Vanuatu',
  'WF': 'Wallis and Futuna',
  'WS': 'Samoa',
  'YE': 'Yemen',
  'YT': 'Mayotte',
  'ZA': 'South Africa',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

// Major international airports by country
const COUNTRY_AIRPORT_MAP: { [key: string]: { city: string; airport: string; iataCode: string } } = {
  'Afghanistan': { city: 'Kabul', airport: 'Kabul International Airport', iataCode: 'KBL' },
  'Albania': { city: 'Tirana', airport: 'Tirana International Airport', iataCode: 'TIA' },
  'Algeria': { city: 'Algiers', airport: 'Houari Boumediene Airport', iataCode: 'ALG' },
  'Argentina': { city: 'Buenos Aires', airport: 'Ezeiza International Airport', iataCode: 'EZE' },
  'Australia': { city: 'Sydney', airport: 'Sydney Airport', iataCode: 'SYD' },
  'Austria': { city: 'Vienna', airport: 'Vienna International Airport', iataCode: 'VIE' },
  'Bahrain': { city: 'Manama', airport: 'Bahrain International Airport', iataCode: 'BAH' },
  'Bangladesh': { city: 'Dhaka', airport: 'Hazrat Shahjalal International Airport', iataCode: 'DAC' },
  'Belgium': { city: 'Brussels', airport: 'Brussels Airport', iataCode: 'BRU' },
  'Brazil': { city: 'São Paulo', airport: 'Guarulhos International Airport', iataCode: 'GRU' },
  'Bulgaria': { city: 'Sofia', airport: 'Sofia International Airport', iataCode: 'SOF' },
  'Cambodia': { city: 'Phnom Penh', airport: 'Phnom Penh International Airport', iataCode: 'PNH' },
  'Cameroon': { city: 'Douala', airport: 'Douala International Airport', iataCode: 'DLA' },
  'Canada': { city: 'Toronto', airport: 'Toronto Pearson International Airport', iataCode: 'YYZ' },
  'Chile': { city: 'Santiago', airport: 'Arturo Merino Benítez International Airport', iataCode: 'SCL' },
  'China': { city: 'Beijing', airport: 'Beijing Capital International Airport', iataCode: 'PEK' },
  'Colombia': { city: 'Bogotá', airport: 'El Dorado International Airport', iataCode: 'BOG' },
  'Costa Rica': { city: 'San José', airport: 'Juan Santamaría International Airport', iataCode: 'SJO' },
  'Croatia': { city: 'Zagreb', airport: 'Zagreb Airport', iataCode: 'ZAG' },
  'Czech Republic': { city: 'Prague', airport: 'Václav Havel Airport Prague', iataCode: 'PRG' },
  'Denmark': { city: 'Copenhagen', airport: 'Copenhagen Airport', iataCode: 'CPH' },
  'Dominican Republic': { city: 'Santo Domingo', airport: 'Las Américas International Airport', iataCode: 'SDQ' },
  'Ecuador': { city: 'Quito', airport: 'Mariscal Sucre International Airport', iataCode: 'UIO' },
  'Egypt': { city: 'Cairo', airport: 'Cairo International Airport', iataCode: 'CAI' },
  'El Salvador': { city: 'San Salvador', airport: 'Monseñor Óscar Arnulfo Romero International Airport', iataCode: 'SAL' },
  'Estonia': { city: 'Tallinn', airport: 'Tallinn Airport', iataCode: 'TLL' },
  'Ethiopia': { city: 'Addis Ababa', airport: 'Bole International Airport', iataCode: 'ADD' },
  'Finland': { city: 'Helsinki', airport: 'Helsinki Airport', iataCode: 'HEL' },
  'France': { city: 'Paris', airport: 'Charles de Gaulle Airport', iataCode: 'CDG' },
  'Germany': { city: 'Berlin', airport: 'Berlin Brandenburg Airport', iataCode: 'BER' },
  'Ghana': { city: 'Accra', airport: 'Kotoka International Airport', iataCode: 'ACC' },
  'Greece': { city: 'Athens', airport: 'Athens International Airport', iataCode: 'ATH' },
  'Guatemala': { city: 'Guatemala City', airport: 'La Aurora International Airport', iataCode: 'GUA' },
  'Honduras': { city: 'Tegucigalpa', airport: 'Toncontín International Airport', iataCode: 'TGU' },
  'Hong Kong': { city: 'Hong Kong', airport: 'Hong Kong International Airport', iataCode: 'HKG' },
  'Hungary': { city: 'Budapest', airport: 'Budapest Ferenc Liszt International Airport', iataCode: 'BUD' },
  'Iceland': { city: 'Reykjavík', airport: 'Keflavík International Airport', iataCode: 'KEF' },
  'India': { city: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International Airport', iataCode: 'BOM' },
  'Indonesia': { city: 'Jakarta', airport: 'Soekarno–Hatta International Airport', iataCode: 'CGK' },
  'Iran': { city: 'Tehran', airport: 'Imam Khomeini International Airport', iataCode: 'IKA' },
  'Iraq': { city: 'Baghdad', airport: 'Baghdad International Airport', iataCode: 'BGW' },
  'Ireland': { city: 'Dublin', airport: 'Dublin Airport', iataCode: 'DUB' },
  'Israel': { city: 'Tel Aviv', airport: 'Ben Gurion Airport', iataCode: 'TLV' },
  'Italy': { city: 'Rome', airport: 'Leonardo da Vinci International Airport', iataCode: 'FCO' },
  'Jamaica': { city: 'Kingston', airport: 'Norman Manley International Airport', iataCode: 'KIN' },
  'Japan': { city: 'Tokyo', airport: 'Haneda Airport', iataCode: 'HND' },
  'Jordan': { city: 'Amman', airport: 'Queen Alia International Airport', iataCode: 'AMM' },
  'Kazakhstan': { city: 'Almaty', airport: 'Almaty International Airport', iataCode: 'ALA' },
  'Kenya': { city: 'Nairobi', airport: 'Jomo Kenyatta International Airport', iataCode: 'NBO' },
  'Kuwait': { city: 'Kuwait City', airport: 'Kuwait International Airport', iataCode: 'KWI' },
  'Latvia': { city: 'Riga', airport: 'Riga International Airport', iataCode: 'RIX' },
  'Lebanon': { city: 'Beirut', airport: 'Beirut–Rafic Hariri International Airport', iataCode: 'BEY' },
  'Lithuania': { city: 'Vilnius', airport: 'Vilnius Airport', iataCode: 'VNO' },
  'Luxembourg': { city: 'Luxembourg', airport: 'Luxembourg Airport', iataCode: 'LUX' },
  'Malaysia': { city: 'Kuala Lumpur', airport: 'Kuala Lumpur International Airport', iataCode: 'KUL' },
  'Maldives': { city: 'Malé', airport: 'Velana International Airport', iataCode: 'MLE' },
  'Malta': { city: 'Valletta', airport: 'Malta International Airport', iataCode: 'MLA' },
  'Mexico': { city: 'Mexico City', airport: 'Benito Juárez International Airport', iataCode: 'MEX' },
  'Monaco': { city: 'Monaco', airport: 'Nice Côte d\'Azur Airport', iataCode: 'NCE' },
  'Mongolia': { city: 'Ulaanbaatar', airport: 'Chinggis Khaan International Airport', iataCode: 'ULN' },
  'Morocco': { city: 'Casablanca', airport: 'Mohammed V International Airport', iataCode: 'CMN' },
  'Myanmar': { city: 'Yangon', airport: 'Yangon International Airport', iataCode: 'RGN' },
  'Nepal': { city: 'Kathmandu', airport: 'Tribhuvan International Airport', iataCode: 'KTM' },
  'Netherlands': { city: 'Amsterdam', airport: 'Amsterdam Airport Schiphol', iataCode: 'AMS' },
  'New Zealand': { city: 'Auckland', airport: 'Auckland Airport', iataCode: 'AKL' },
  'Nicaragua': { city: 'Managua', airport: 'Augusto C. Sandino International Airport', iataCode: 'MGA' },
  'Nigeria': { city: 'Lagos', airport: 'Murtala Muhammed International Airport', iataCode: 'LOS' },
  'North Korea': { city: 'Pyongyang', airport: 'Pyongyang International Airport', iataCode: 'FNJ' },
  'Norway': { city: 'Oslo', airport: 'Oslo Airport', iataCode: 'OSL' },
  'Oman': { city: 'Muscat', airport: 'Muscat International Airport', iataCode: 'MCT' },
  'Pakistan': { city: 'Karachi', airport: 'Jinnah International Airport', iataCode: 'KHI' },
  'Panama': { city: 'Panama City', airport: 'Tocumen International Airport', iataCode: 'PTY' },
  'Paraguay': { city: 'Asunción', airport: 'Silvio Pettirossi International Airport', iataCode: 'ASU' },
  'Peru': { city: 'Lima', airport: 'Jorge Chávez International Airport', iataCode: 'LIM' },
  'Philippines': { city: 'Manila', airport: 'Ninoy Aquino International Airport', iataCode: 'MNL' },
  'Poland': { city: 'Warsaw', airport: 'Warsaw Chopin Airport', iataCode: 'WAW' },
  'Portugal': { city: 'Lisbon', airport: 'Lisbon Airport', iataCode: 'LIS' },
  'Puerto Rico': { city: 'San Juan', airport: 'Luis Muñoz Marín International Airport', iataCode: 'SJU' },
  'Qatar': { city: 'Doha', airport: 'Hamad International Airport', iataCode: 'DOH' },
  'Romania': { city: 'Bucharest', airport: 'Henri Coandă International Airport', iataCode: 'OTP' },
  'Russia': { city: 'Moscow', airport: 'Sheremetyevo International Airport', iataCode: 'SVO' },
  'Saudi Arabia': { city: 'Riyadh', airport: 'King Khalid International Airport', iataCode: 'RUH' },
  'Senegal': { city: 'Dakar', airport: 'Blaise Diagne International Airport', iataCode: 'DSS' },
  'Serbia': { city: 'Belgrade', airport: 'Nikola Tesla Airport', iataCode: 'BEG' },
  'Singapore': { city: 'Singapore', airport: 'Singapore Changi Airport', iataCode: 'SIN' },
  'Slovakia': { city: 'Bratislava', airport: 'Bratislava Airport', iataCode: 'BTS' },
  'Slovenia': { city: 'Ljubljana', airport: 'Ljubljana Jože Pučnik Airport', iataCode: 'LJU' },
  'South Africa': { city: 'Johannesburg', airport: 'O. R. Tambo International Airport', iataCode: 'JNB' },
  'South Korea': { city: 'Seoul', airport: 'Incheon International Airport', iataCode: 'ICN' },
  'Spain': { city: 'Madrid', airport: 'Adolfo Suárez Madrid–Barajas Airport', iataCode: 'MAD' },
  'Sri Lanka': { city: 'Colombo', airport: 'Bandaranaike International Airport', iataCode: 'CMB' },
  'Sweden': { city: 'Stockholm', airport: 'Stockholm Arlanda Airport', iataCode: 'ARN' },
  'Switzerland': { city: 'Zurich', airport: 'Zurich Airport', iataCode: 'ZRH' },
  'Syria': { city: 'Damascus', airport: 'Damascus International Airport', iataCode: 'DAM' },
  'Taiwan': { city: 'Taipei', airport: 'Taiwan Taoyuan International Airport', iataCode: 'TPE' },
  'Thailand': { city: 'Bangkok', airport: 'Suvarnabhumi Airport', iataCode: 'BKK' },
  'Tunisia': { city: 'Tunis', airport: 'Tunis–Carthage International Airport', iataCode: 'TUN' },
  'Turkey': { city: 'Istanbul', airport: 'Istanbul Airport', iataCode: 'IST' },
  'Ukraine': { city: 'Kyiv', airport: 'Boryspil International Airport', iataCode: 'KBP' },
  'United Arab Emirates': { city: 'Dubai', airport: 'Dubai International Airport', iataCode: 'DXB' },
  'United Kingdom': { city: 'London', airport: 'Heathrow Airport', iataCode: 'LHR' },
  'Uruguay': { city: 'Montevideo', airport: 'Carrasco International Airport', iataCode: 'MVD' },
  'Venezuela': { city: 'Caracas', airport: 'Simón Bolívar International Airport', iataCode: 'CCS' },
  'Vietnam': { city: 'Ho Chi Minh City', airport: 'Tan Son Nhat International Airport', iataCode: 'SGN' }
};

// Get user's location based on IP address with fallbacks
export async function getUserLocationByIP(): Promise<IPLocationData | null> {
  console.log('IP Location Service: Starting getUserLocationByIP...');
  
  // Try multiple IP location services
  const endpoints = [
    'https://ipapi.co/json/',
    'https://ipinfo.io/json',
    'https://ip-api.com/json/',
    'https://api.ipgeolocation.io/ipgeo?apiKey=free'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`IP Location: Trying endpoint: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        console.warn(`IP Location: ${endpoint} returned ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`IP Location: Success from ${endpoint}:`, data);
      
      // Handle different API response formats
      let city, country, latitude, longitude, region;
      
      if (endpoint.includes('ipapi.co')) {
        // ipapi.co format
        city = data.city;
        country = data.country_name;
        latitude = data.latitude;
        longitude = data.longitude;
        region = data.region;
      } else if (endpoint.includes('ipinfo.io')) {
        // ipinfo.io format
        city = data.city;
        country = COUNTRY_CODE_MAP[data.country] || data.country;
        latitude = data.loc ? parseFloat(data.loc.split(',')[0]) : 0;
        longitude = data.loc ? parseFloat(data.loc.split(',')[1]) : 0;
        region = data.region;
      } else if (endpoint.includes('ip-api.com')) {
        // ip-api.com format
        city = data.city;
        country = data.country;
        latitude = data.lat;
        longitude = data.lon;
        region = data.regionName;
      } else if (endpoint.includes('ipgeolocation.io')) {
        // ipgeolocation.io format
        city = data.city;
        country = data.country_name;
        latitude = data.latitude;
        longitude = data.longitude;
        region = data.state_prov;
      }
      
      if (city && country) {
        console.log(`IP Location: Parsed data - City: ${city}, Country: ${country}`);
        return {
          city,
          country,
          latitude: latitude || 0,
          longitude: longitude || 0,
          region: region || ''
        };
      }
      
    } catch (error) {
      console.error(`IP Location: Failed to fetch from ${endpoint}:`, error);
      console.error(`IP Location: Error type:`, error instanceof Error ? error.constructor.name : typeof error);
      console.error(`IP Location: Error message:`, error instanceof Error ? error.message : String(error));
      if (error instanceof Error && error.stack) {
        console.error(`IP Location: Error stack:`, error.stack);
      }
      continue;
    }
  }
  
  console.error('IP Location: All endpoints failed, using fallback location');
  
  // Fallback: Return a default location (New York) if all APIs fail
  return {
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    region: 'NY'
  };
}

// Enhanced Canada location resolver (Phase 1 - Incremental improvement)
function getCanadianCityByRegion(city: string, region?: string): { name: string; iataCode: string } | null {
  // Direct city mapping for major Canadian cities
  const canadianCityMapping: { [key: string]: string } = {
    'toronto': 'YYZ',
    'montreal': 'YUL',
    'vancouver': 'YVR',
    'calgary': 'YYC',
    'edmonton': 'YEG'
  };
  
  const normalizedCity = city.toLowerCase();
  
  // Check for direct city match first
  if (canadianCityMapping[normalizedCity]) {
    return {
      name: city,
      iataCode: canadianCityMapping[normalizedCity]
    };
  }
  
  // Regional fallbacks based on province/region
  if (region) {
    const normalizedRegion = region.toLowerCase();
    
    // Ontario region fallback
    if (normalizedRegion.includes('ontario') || normalizedRegion.includes('on')) {
      return { name: 'Toronto', iataCode: 'YYZ' };
    }
    
    // Quebec region fallback
    if (normalizedRegion.includes('quebec') || normalizedRegion.includes('qc')) {
      return { name: 'Montreal', iataCode: 'YUL' };
    }
    
    // British Columbia region fallback
    if (normalizedRegion.includes('british columbia') || normalizedRegion.includes('bc')) {
      return { name: 'Vancouver', iataCode: 'YVR' };
    }
    
    // Alberta region fallback
    if (normalizedRegion.includes('alberta') || normalizedRegion.includes('ab')) {
      return { name: 'Calgary', iataCode: 'YYC' };
    }
  }
  
  // Default fallback for Canada
  return { name: 'Toronto', iataCode: 'YYZ' };
}

// Find the closest major city to the IP location
export async function getClosestCityFromIP(): Promise<{ name: string; country: string; iataCode: string; rawApiData?: Record<string, unknown> } | null> {
  try {
    console.log('IP Location Service: Starting getClosestCityFromIP...');
    const ipLocation = await getUserLocationByIP();
    
    if (!ipLocation) {
      console.log('IP Location Service: No IP location data received, using fallback');
      // Fallback to New York if no location data
      return {
        name: 'New York',
        country: 'United States',
        iataCode: 'JFK'
      };
    }
    
    console.log('IP Location Service: Received IP location data:', ipLocation);
    
    // First, try to get the IATA code for the specific city (US and Canadian cities)
    const iataCode = CITY_IATA_MAP[ipLocation.city];
    
    // Enhanced Canada-specific logic (Phase 1 - Incremental improvement)
    if (!iataCode && ipLocation.country.toLowerCase().includes('canada')) {
      console.log('IP Location: Detected Canada, using enhanced Canadian location resolver');
      const canadianLocation = getCanadianCityByRegion(ipLocation.city, ipLocation.region);
      if (canadianLocation) {
        return {
          name: canadianLocation.name,
          country: 'Canada',
          iataCode: canadianLocation.iataCode
        };
      }
    }
    
    // If not found in city mappings, try to get the country's major airport
    if (!iataCode) {
      let countryAirport = COUNTRY_AIRPORT_MAP[ipLocation.country];
      
      // If no exact match, try to find partial matches
      if (!countryAirport) {
        const countryKeys = Object.keys(COUNTRY_AIRPORT_MAP);
        const matchingCountry = countryKeys.find(key => 
          key.toLowerCase().includes(ipLocation.country.toLowerCase()) ||
          ipLocation.country.toLowerCase().includes(key.toLowerCase())
        );
        
        if (matchingCountry) {
          countryAirport = COUNTRY_AIRPORT_MAP[matchingCountry];
        }
      }
      
      if (countryAirport) {
        return {
          name: countryAirport.city,
          country: ipLocation.country,
          iataCode: countryAirport.iataCode
        };
      }
    }
    
    // If we found a US city IATA code, use it
    if (iataCode) {
      return {
        name: ipLocation.city,
        country: ipLocation.country,
        iataCode: iataCode
      };
    }
    
    // Final fallback - use JFK for any unrecognized location
    return {
      name: 'New York',
      country: 'United States',
      iataCode: 'JFK'
    };
  } catch (error) {
    return null;
  }
} 