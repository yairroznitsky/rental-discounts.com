interface CityData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

// Major US cities database - focused on top 50 cities
const MAJOR_CITIES: CityData[] = [
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { name: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298 },
  { name: "Houston", country: "United States", latitude: 29.7604, longitude: -95.3698 },
  { name: "Phoenix", country: "United States", latitude: 33.4484, longitude: -112.0740 },
  { name: "Philadelphia", country: "United States", latitude: 39.9526, longitude: -75.1652 },
  { name: "San Antonio", country: "United States", latitude: 29.4241, longitude: -98.4936 },
  { name: "San Diego", country: "United States", latitude: 32.7157, longitude: -117.1611 },
  { name: "Dallas", country: "United States", latitude: 32.7767, longitude: -96.7970 },
  { name: "San Jose", country: "United States", latitude: 37.3382, longitude: -121.8863 },
  { name: "Austin", country: "United States", latitude: 30.2672, longitude: -97.7431 },
  { name: "Jacksonville", country: "United States", latitude: 30.3322, longitude: -81.6557 },
  { name: "Fort Worth", country: "United States", latitude: 32.7555, longitude: -97.3308 },
  { name: "Columbus", country: "United States", latitude: 39.9612, longitude: -82.9988 },
  { name: "Charlotte", country: "United States", latitude: 35.2271, longitude: -80.8431 },
  { name: "San Francisco", country: "United States", latitude: 37.7749, longitude: -122.4194 },
  { name: "Indianapolis", country: "United States", latitude: 39.7684, longitude: -86.1581 },
  { name: "Seattle", country: "United States", latitude: 47.6062, longitude: -122.3321 },
  { name: "Denver", country: "United States", latitude: 39.7392, longitude: -104.9903 },
  { name: "Washington", country: "United States", latitude: 38.9072, longitude: -77.0369 },
  { name: "Boston", country: "United States", latitude: 42.3601, longitude: -71.0589 },
  { name: "El Paso", country: "United States", latitude: 31.7619, longitude: -106.4850 },
  { name: "Nashville", country: "United States", latitude: 36.1627, longitude: -86.7816 },
  { name: "Detroit", country: "United States", latitude: 42.3314, longitude: -83.0458 },
  { name: "Oklahoma City", country: "United States", latitude: 35.4676, longitude: -97.5164 },
  { name: "Portland", country: "United States", latitude: 45.5152, longitude: -122.6784 },
  { name: "Las Vegas", country: "United States", latitude: 36.1699, longitude: -115.1398 },
  { name: "Memphis", country: "United States", latitude: 35.1495, longitude: -90.0490 },
  { name: "Louisville", country: "United States", latitude: 38.2527, longitude: -85.7585 },
  { name: "Baltimore", country: "United States", latitude: 39.2904, longitude: -76.6122 },
  { name: "Milwaukee", country: "United States", latitude: 43.0389, longitude: -87.9065 },
  { name: "Albuquerque", country: "United States", latitude: 35.0844, longitude: -106.6504 },
  { name: "Tucson", country: "United States", latitude: 32.2226, longitude: -110.9747 },
  { name: "Fresno", country: "United States", latitude: 36.7378, longitude: -119.7871 },
  { name: "Sacramento", country: "United States", latitude: 38.5816, longitude: -121.4944 },
  { name: "Atlanta", country: "United States", latitude: 33.7490, longitude: -84.3880 },
  { name: "Kansas City", country: "United States", latitude: 39.0997, longitude: -94.5786 },
  { name: "Long Beach", country: "United States", latitude: 33.7701, longitude: -118.1937 },
  { name: "Colorado Springs", country: "United States", latitude: 38.8339, longitude: -104.8214 },
  { name: "Raleigh", country: "United States", latitude: 35.7796, longitude: -78.6382 },
  { name: "Miami", country: "United States", latitude: 25.7617, longitude: -80.1918 },
  { name: "Virginia Beach", country: "United States", latitude: 36.8529, longitude: -75.9780 },
  { name: "Omaha", country: "United States", latitude: 41.2565, longitude: -95.9345 },
  { name: "Oakland", country: "United States", latitude: 37.8044, longitude: -122.2711 },
  { name: "Minneapolis", country: "United States", latitude: 44.9778, longitude: -93.2650 },
  { name: "Tulsa", country: "United States", latitude: 36.1540, longitude: -95.9928 },
  { name: "Arlington", country: "United States", latitude: 32.7357, longitude: -97.1081 },
  { name: "Tampa", country: "United States", latitude: 27.9506, longitude: -82.4572 },
  { name: "New Orleans", country: "United States", latitude: 29.9511, longitude: -90.0715 },
  { name: "Wichita", country: "United States", latitude: 37.6872, longitude: -97.3301 },
  { name: "Cleveland", country: "United States", latitude: 41.4993, longitude: -81.6944 },
  { name: "Bakersfield", country: "United States", latitude: 35.3733, longitude: -119.0187 },
  { name: "Aurora", country: "United States", latitude: 39.7294, longitude: -104.8319 },
  { name: "Anaheim", country: "United States", latitude: 33.8366, longitude: -117.9143 },
  { name: "Honolulu", country: "United States", latitude: 21.3099, longitude: -157.8581 },
  { name: "Santa Ana", country: "United States", latitude: 33.7455, longitude: -117.8677 },
  { name: "Corpus Christi", country: "United States", latitude: 27.8006, longitude: -97.3964 },
  { name: "Riverside", country: "United States", latitude: 33.9533, longitude: -117.3962 },
  { name: "Lexington", country: "United States", latitude: 38.0406, longitude: -84.5037 },
  { name: "Stockton", country: "United States", latitude: 37.9577, longitude: -121.2908 },
  { name: "Henderson", country: "United States", latitude: 36.0395, longitude: -114.9817 },
  { name: "Saint Paul", country: "United States", latitude: 44.9537, longitude: -93.0900 },
  { name: "St. Louis", country: "United States", latitude: 38.6270, longitude: -90.1994 },
  { name: "Cincinnati", country: "United States", latitude: 39.1031, longitude: -84.5120 },
  { name: "Pittsburgh", country: "United States", latitude: 40.4406, longitude: -79.9959 },
  { name: "Greensboro", country: "United States", latitude: 36.0726, longitude: -79.7920 },
  { name: "Anchorage", country: "United States", latitude: 61.2181, longitude: -149.9003 },
  { name: "Plano", country: "United States", latitude: 33.0198, longitude: -96.6989 },
  { name: "Lincoln", country: "United States", latitude: 40.8136, longitude: -96.7026 },
  { name: "Orlando", country: "United States", latitude: 28.5383, longitude: -81.3792 },
  { name: "Irvine", country: "United States", latitude: 33.6846, longitude: -117.8265 },
  { name: "Newark", country: "United States", latitude: 40.7357, longitude: -74.1724 },
  { name: "Durham", country: "United States", latitude: 35.9940, longitude: -78.8986 },
  { name: "Chula Vista", country: "United States", latitude: 32.6401, longitude: -117.0842 },
  { name: "Toledo", country: "United States", latitude: 41.6528, longitude: -83.5379 },
  { name: "Fort Wayne", country: "United States", latitude: 41.0793, longitude: -85.1394 },
  { name: "St. Petersburg", country: "United States", latitude: 27.7731, longitude: -82.6400 },
  { name: "Laredo", country: "United States", latitude: 27.5064, longitude: -99.5075 },
  { name: "Jersey City", country: "United States", latitude: 40.7178, longitude: -74.0431 },
  { name: "Chandler", country: "United States", latitude: 33.3062, longitude: -111.8413 },
  { name: "Madison", country: "United States", latitude: 43.0731, longitude: -89.4012 },
  { name: "Lubbock", country: "United States", latitude: 33.5779, longitude: -101.8552 },
  { name: "Scottsdale", country: "United States", latitude: 33.4942, longitude: -111.9261 },
  { name: "Reno", country: "United States", latitude: 39.5296, longitude: -119.8138 },
  { name: "Buffalo", country: "United States", latitude: 42.8864, longitude: -78.8784 },
  { name: "Gilbert", country: "United States", latitude: 33.3528, longitude: -111.7890 },
  { name: "Glendale", country: "United States", latitude: 33.5387, longitude: -112.1860 },
  { name: "North Las Vegas", country: "United States", latitude: 36.1989, longitude: -115.1175 },
  { name: "Winston-Salem", country: "United States", latitude: 36.0999, longitude: -80.2442 },
  { name: "Chesapeake", country: "United States", latitude: 36.7682, longitude: -76.2875 },
  { name: "Norfolk", country: "United States", latitude: 36.8508, longitude: -76.2859 },
  { name: "Fremont", country: "United States", latitude: 37.5485, longitude: -121.9886 },
  { name: "Garland", country: "United States", latitude: 32.9126, longitude: -96.6389 },
  { name: "Irving", country: "United States", latitude: 32.8140, longitude: -96.9489 },
  { name: "Hialeah", country: "United States", latitude: 25.8576, longitude: -80.2781 },
  { name: "Richmond", country: "United States", latitude: 37.5407, longitude: -77.4360 },
  { name: "Boise", country: "United States", latitude: 43.6150, longitude: -116.2023 },
  { name: "Spokane", country: "United States", latitude: 47.6588, longitude: -117.4260 },
  { name: "Baton Rouge", country: "United States", latitude: 30.4515, longitude: -91.1871 },
  { name: "Tacoma", country: "United States", latitude: 47.2529, longitude: -122.4443 },
  { name: "San Bernardino", country: "United States", latitude: 34.1083, longitude: -117.2898 },
  { name: "Grand Rapids", country: "United States", latitude: 42.9634, longitude: -85.6681 },
  { name: "Huntsville", country: "United States", latitude: 34.7304, longitude: -86.5861 },
  { name: "Salt Lake City", country: "United States", latitude: 40.7608, longitude: -111.8910 },
  { name: "Fayetteville", country: "United States", latitude: 35.0527, longitude: -78.8784 },
  { name: "Yonkers", country: "United States", latitude: 40.9312, longitude: -73.8987 },
  { name: "Amarillo", country: "United States", latitude: 35.2220, longitude: -101.8313 },
  { name: "McKinney", country: "United States", latitude: 33.1972, longitude: -96.6397 },
  { name: "Rochester", country: "United States", latitude: 43.1566, longitude: -77.6088 },
  // Major Canadian cities (Phase 1 - Top 5)
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
  { name: "Montreal", country: "Canada", latitude: 45.5017, longitude: -73.5673 },
  { name: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207 },
  { name: "Calgary", country: "Canada", latitude: 51.0447, longitude: -114.0719 },
  { name: "Edmonton", country: "Canada", latitude: 53.5461, longitude: -113.4938 }
];

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Find the closest city to given coordinates
function findClosestCity(latitude: number, longitude: number): CityData {
  let closestCity = MAJOR_CITIES[0];
  let shortestDistance = calculateDistance(latitude, longitude, closestCity.latitude, closestCity.longitude);

  for (const city of MAJOR_CITIES) {
    const distance = calculateDistance(latitude, longitude, city.latitude, city.longitude);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestCity = city;
    }
  }

  return closestCity;
}

// Get user's current location and find closest city
export async function getUserLocationAndClosestCity(): Promise<CityData | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const closestCity = findClosestCity(latitude, longitude);
        console.log('User location:', { latitude, longitude });
        console.log('Closest city:', closestCity);
        resolve(closestCity);
      },
      (error) => {
        console.error('Error getting location:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
} 