/**
 * Converts any Google Maps link, iframe code, coordinates, or plain address string
 * into a valid, embeddable Google Maps iframe URL.
 */
export function formatMapEmbedUrl(input) {
  if (!input || typeof input !== 'string') {
    return 'https://maps.google.com/maps?q=New%20York%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed';
  }

  const raw = input.trim();
  if (!raw) {
    return 'https://maps.google.com/maps?q=New%20York%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed';
  }

  // 1. If user pasted an <iframe> tag, extract src="..."
  const iframeMatch = raw.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return formatMapEmbedUrl(iframeMatch[1]);
  }

  // 2. If it's already a valid Google embed URL with output=embed or /embed
  if (raw.includes('/maps/embed') || (raw.includes('maps.google.com') && raw.includes('output=embed'))) {
    return raw;
  }

  // 3. If it's a google.com/maps/place/PlaceName/@lat,lng,...
  const placeMatch = raw.match(/\/maps\/place\/([^/@?]+)/i);
  if (placeMatch && placeMatch[1]) {
    const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }

  // 4. If it's a google.com/maps/@lat,lng,zoom
  const coordsMatch = raw.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordsMatch) {
    const lat = coordsMatch[1];
    const lng = coordsMatch[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }

  // 5. If it's a maps.google.com with ?q= parameter but missing output=embed
  if (raw.includes('maps.google.com') && raw.includes('q=')) {
    try {
      const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
      const q = parsed.searchParams.get('q');
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      }
    } catch {
      // ignore
    }
  }

  // 6. If it's plain text address / location (e.g. "London, UK" or "United Kingdom")
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(raw)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }

  // 7. Generic URL fallback
  try {
    const parsed = new URL(raw);
    const q =
      parsed.searchParams.get('q') ||
      parsed.searchParams.get('query') ||
      parsed.pathname.split('/').filter(Boolean).pop();
    if (q) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(q.replace(/\+/g, ' '))}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
  } catch {
    // ignore
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(raw)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}
