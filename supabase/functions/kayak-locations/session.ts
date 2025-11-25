
import { userAgents } from './constants.ts';
import { getRandomUserAgent, getRandomDelay, sleep } from './utils.ts';
import { sessionCache } from './cache.ts';

export async function establishKayakSession(): Promise<string> {
  const sessionKey = 'kayak_session';
  const cached = sessionCache.get(sessionKey);
  
  // Reduced cache time for fresher sessions
  if (cached && (Date.now() - cached.timestamp) < 300000) { // 5 minutes
    return cached.cookies;
  }

  try {
    console.log('Establishing new Kayak session...');
    
    const userAgent = getRandomUserAgent(userAgents);
    const response = await fetch('https://www.kayak.com/', {
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      }
    });

    const cookies = response.headers.get('set-cookie') || '';
    console.log('Session established, status:', response.status);
    
    sessionCache.set(sessionKey, {
      cookies,
      userAgent,
      timestamp: Date.now()
    });

    await sleep(getRandomDelay(100, 300));
    return cookies;
  } catch (error) {
    console.error('Failed to establish session:', error);
    return '';
  }
}
