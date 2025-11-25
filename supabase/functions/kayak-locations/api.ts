
import { getRandomDelay, sleep } from './utils.ts';

export async function fetchKayakLocations(searchTerm: string, cookies: string, userAgent: string) {
  console.log(`Kayak API: Starting search for "${searchTerm}"`);
  
  // Use only the prioritized endpoint
  const endpoint = `https://www.kayak.com/mvm/smartyv2/search?f=j&s=81&v=v1&lc=en&lc_cc=EN&where=${encodeURIComponent(searchTerm)}`;

  try {
    console.log(`Kayak API: Fetching from primary endpoint for "${searchTerm}": ${endpoint}`);
    
    const headers: Record<string, string> = {
      'User-Agent': userAgent,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.kayak.com/',
      'Origin': 'https://www.kayak.com',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };

    if (cookies) {
      headers['Cookie'] = cookies;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers
    });

    console.log(`Kayak API: Primary endpoint response status:`, response.status);

    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        const data = await response.json();
        console.log(`Kayak API: Primary endpoint returned data:`, JSON.stringify(data).substring(0, 200));
        
        if (data && (Array.isArray(data) || data.suggestions || data.results || data.data)) {
          return data;
        }
      }
    }
    
    console.log('Kayak API: Primary endpoint failed for', searchTerm);
    return null;
  } catch (error) {
    console.error('Kayak API: Error with primary endpoint:', error.message);
    return null;
  }
}
