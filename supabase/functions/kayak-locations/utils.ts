
// Utility functions
export function getRandomUserAgent(userAgents: string[]): string {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

export function getRandomDelay(min = 50, max = 200): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCacheKey(searchTerm: string): string {
  return `kayak_locations_${searchTerm.toLowerCase()}`;
}

export function isIATACode(searchTerm: string): boolean {
  return /^[A-Z]{3}$/.test(searchTerm.toUpperCase());
}
