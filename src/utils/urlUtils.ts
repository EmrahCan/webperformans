export function normalizeUrl(url: string): string {
  if (!url) return '';
  
  // Remove any existing protocol
  url = url.replace(/^(https?:\/\/)/i, '');
  
  // Add https:// by default
  return `https://${url}`;
}