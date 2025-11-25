
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './constants.ts';
import { getCacheKey } from './utils.ts';
import { getCachedResponse, setCachedResponse, sessionCache } from './cache.ts';
import { establishKayakSession } from './session.ts';
import { fetchKayakLocations } from './api.ts';
import { transformKayakData } from './transform.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get('q');

    if (!searchTerm) {
      return new Response(
        JSON.stringify({ error: 'Search term is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (searchTerm.length < 2) {
      return new Response(
        JSON.stringify([]),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Kayak Function: Processing search for: "${searchTerm}"`);

    // Check cache first
    const cacheKey = getCacheKey(searchTerm);
    const cachedData = getCachedResponse(cacheKey);
    
    if (cachedData) {
      console.log('Kayak Function: Returning cached result for', searchTerm);
      return new Response(JSON.stringify(cachedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch from Kayak API
    console.log('Kayak Function: Not in cache, fetching from Kayak API for', searchTerm);

    // Establish session
    const sessionData = sessionCache.get('kayak_session');
    let cookies = '';
    let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    if (!sessionData || (Date.now() - sessionData.timestamp) > 300000) {
      cookies = await establishKayakSession();
      const newSessionData = sessionCache.get('kayak_session');
      if (newSessionData) {
        userAgent = newSessionData.userAgent;
      }
    } else {
      cookies = sessionData.cookies;
      userAgent = sessionData.userAgent;
    }

    // Fetch data from Kayak
    const rawData = await fetchKayakLocations(searchTerm, cookies, userAgent);
    
    let finalData = [];
    
    if (rawData) {
      finalData = await transformKayakData(rawData, searchTerm);
      console.log('Kayak Function: Successfully transformed data, returning', finalData.length, 'locations');
    } else {
      console.log('Kayak Function: No data returned from Kayak API for', searchTerm);
    }

    // Cache the result (even if empty)
    setCachedResponse(cacheKey, finalData);

    console.log(`Kayak Function: Returning ${finalData.length} locations for "${searchTerm}"`);
    
    return new Response(JSON.stringify(finalData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Kayak Function: Error in kayak-locations function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
