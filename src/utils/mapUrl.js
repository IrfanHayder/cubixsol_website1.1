/**
 * Converts any Google Maps link, iframe code, coordinates, or plain address string
 * into a valid, embeddable Google Maps iframe URL with appropriate zoom.
 */
export function formatMapEmbedUrl(input, customZoom) {
  if (!input || typeof input !== 'string') {
    return 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=6&ie=UTF8&iwloc=&output=embed';
  }

  const raw = input.trim();
  if (!raw) {
    return 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=6&ie=UTF8&iwloc=&output=embed';
  }

  // Helper to determine optimal zoom level
  const getOptimalZoom = (text) => {
    if (customZoom) return customZoom;
    const lower = (text || '').toLowerCase().trim();
    if (
      lower.includes('pakistan') ||
      lower.includes('united kingdom') ||
      lower === 'uk' ||
      lower.includes('united arab emirates') ||
      lower.includes('uae') ||
      lower === 'emirates'
    ) {
      if (lower.includes('united arab emirates') || lower.includes('uae')) return '7';
      return '6';
    }
    if (
      lower.includes('london') ||
      lower.includes('lahore') ||
      lower.includes('karachi') ||
      lower.includes('islamabad') ||
      lower.includes('dubai') ||
      lower.includes('abu dhabi')
    ) {
      return '11';
    }
    return '8';
  };

  // 1. If user pasted an <iframe> tag, extract src="..."
  const iframeMatch = raw.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return formatMapEmbedUrl(iframeMatch[1], customZoom);
  }

  // 2. If it's already a valid Google embed URL with output=embed or /embed
  if (raw.includes('/maps/embed')) {
    return raw;
  }

  // 3. If it's a google.com/maps/place/PlaceName/@lat,lng,...
  const placeMatch = raw.match(/\/maps\/place\/([^/@?]+)/i);
  if (placeMatch && placeMatch[1]) {
    const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    const z = getOptimalZoom(placeName);
    return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
  }

  // 4. If it's a google.com/maps/@lat,lng,zoom
  const coordsMatch = raw.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordsMatch) {
    const lat = coordsMatch[1];
    const lng = coordsMatch[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=7&ie=UTF8&iwloc=&output=embed`;
  }

  // 5. If it's a maps.google.com with ?q= parameter
  if (raw.includes('maps.google.com') && raw.includes('q=')) {
    try {
      const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
      const q = parsed.searchParams.get('q');
      if (q) {
        const z = getOptimalZoom(q);
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
      }
    } catch {
      // ignore
    }
  }

  // 6. If it's plain text address / location (e.g. "Pakistan", "United Kingdom", "United Arab Emirates")
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    const z = getOptimalZoom(raw);
    return `https://maps.google.com/maps?q=${encodeURIComponent(raw)}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
  }

  // 7. Generic URL fallback
  try {
    const parsed = new URL(raw);
    const q =
      parsed.searchParams.get('q') ||
      parsed.searchParams.get('query') ||
      parsed.pathname.split('/').filter(Boolean).pop();
    if (q) {
      const z = getOptimalZoom(q);
      return `https://maps.google.com/maps?q=${encodeURIComponent(q.replace(/\+/g, ' '))}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
    }
  } catch {
    // ignore
  }

  const z = getOptimalZoom(raw);
  return `https://maps.google.com/maps?q=${encodeURIComponent(raw)}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Splits links string into individual URLs, even if glued together without newlines
 * e.g. "https://maps.google.com/...Pakistanhttps://maps.google.com/...UK"
 */
export function extractIndividualUrls(input) {
  if (!input || typeof input !== 'string') return [];
  const raw = input.trim();
  if (!raw) return [];

  const rawLines = raw.split(/[\r\n]+/).map((s) => s.trim()).filter(Boolean);
  const result = [];

  for (const line of rawLines) {
    const splitByHttp = line.split(/(?=https?:\/\/)/i).map((s) => s.trim()).filter(Boolean);
    if (splitByHttp.length > 0) {
      result.push(...splitByHttp);
    } else {
      result.push(line);
    }
  }

  return result;
}

/**
 * Generates a direct, clickable Google Maps link for opening the pin location in a new tab.
 */
export function getDirectMapLink(input, defaultName = '') {
  const val = (input || '').trim();
  if (val.startsWith('http://') || val.startsWith('https://')) {
    if (val.includes('output=embed') || val.includes('/maps/embed')) {
      try {
        const parsed = new URL(val);
        const q = parsed.searchParams.get('q');
        if (q) return `https://www.google.com/maps/place/${encodeURIComponent(q.replace(/\+/g, ' '))}`;
      } catch {
        // ignore
      }
    }
    return val;
  }

  const query = val || defaultName;
  if (!query) return 'https://maps.google.com';
  return `https://www.google.com/maps/place/${encodeURIComponent(query)}`;
}

/**
 * Helper to test if a URL is related to a specific country/city name
 */
export function matchesLocation(url, name) {
  if (!url || !name) return false;
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanUrl = decodeURIComponent(url).toLowerCase().replace(/[^a-z0-9]/g, '');

  if (!cleanName || !cleanUrl) return false;
  if (cleanUrl.includes(cleanName)) return true;

  if (cleanName.includes('pakistan') || cleanName === 'pk') {
    return (
      cleanUrl.includes('pakistan') ||
      cleanUrl.includes('lahore') ||
      cleanUrl.includes('karachi') ||
      cleanUrl.includes('islamabad') ||
      cleanUrl.includes('rawalpindi') ||
      cleanUrl.includes('punjab')
    );
  }

  if (
    cleanName.includes('unitedkingdom') ||
    cleanName === 'uk' ||
    cleanName.includes('greatbritain') ||
    cleanName.includes('england') ||
    cleanName.includes('britain')
  ) {
    return (
      cleanUrl.includes('unitedkingdom') ||
      cleanUrl.includes('greatbritain') ||
      cleanUrl.includes('england') ||
      cleanUrl.includes('scotland') ||
      cleanUrl.includes('wales') ||
      cleanUrl.includes('london') ||
      cleanUrl.includes('birmingham') ||
      cleanUrl.includes('manchester')
    );
  }

  if (
    cleanName.includes('unitedarabemirates') ||
    cleanName === 'uae' ||
    cleanName.includes('emirates') ||
    cleanName.includes('dubai') ||
    cleanName.includes('abudhabi')
  ) {
    return (
      cleanUrl.includes('unitedarabemirates') ||
      cleanUrl.includes('emirates') ||
      cleanUrl.includes('uae') ||
      cleanUrl.includes('dubai') ||
      cleanUrl.includes('abudhabi') ||
      cleanUrl.includes('sharjah')
    );
  }

  if (
    cleanName.includes('unitedstates') ||
    cleanName === 'usa' ||
    cleanName === 'us' ||
    cleanName.includes('america')
  ) {
    return (
      cleanUrl.includes('unitedstates') ||
      cleanUrl.includes('usa') ||
      cleanUrl.includes('newyork') ||
      cleanUrl.includes('california') ||
      cleanUrl.includes('texas')
    );
  }

  return false;
}

/**
 * Parses multi-line content from a Contact Card (e.g. multiple phone numbers, locations, or emails)
 * and returns structured items with their individual links.
 */
export function parseContactCardItems(card) {
  if (!card) return [];
  const lines = (card.desc || '')
    .split(/[\r\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const rawLinks = extractIndividualUrls(card.link || '');

  const isLocationCard =
    (card.icon && ['MapPin', 'Globe', 'Building2', 'Navigation'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('location')) ||
    (card.title && card.title.toLowerCase().includes('office')) ||
    (card.title && card.title.toLowerCase().includes('address'));

  const isPhoneCard =
    (card.icon && ['Phone', 'PhoneCall', 'Headphones'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('call')) ||
    (card.title && card.title.toLowerCase().includes('phone'));

  const isEmailCard =
    (card.icon && ['Mail', 'MailPlus', 'MessageSquare'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('email'));

  return lines.map((line, idx) => {
    let text = line;
    let explicitLink = '';
    if (line.includes('|')) {
      const parts = line.split('|');
      text = parts[0].trim();
      explicitLink = parts.slice(1).join('|').trim();
    }

    let finalLink = explicitLink;

    if (!finalLink) {
      if (isLocationCard) {
        // Find if any of the extracted URLs matches this location name
        const matchedUrl = rawLinks.find((url) => matchesLocation(url, text));
        if (matchedUrl) {
          finalLink = matchedUrl;
        } else if (
          rawLinks.length > idx &&
          rawLinks[idx] &&
          !lines.some((otherLine, otherIdx) => otherIdx !== idx && matchesLocation(rawLinks[idx], otherLine))
        ) {
          finalLink = rawLinks[idx];
        } else if (rawLinks.length === 1 && matchesLocation(rawLinks[0], text)) {
          finalLink = rawLinks[0];
        } else {
          finalLink = getDirectMapLink(text);
        }
      } else if (rawLinks.length > 1 && rawLinks[idx]) {
        finalLink = rawLinks[idx];
      } else if (rawLinks.length === 1) {
        finalLink = rawLinks[0];
      }
    }

    // Auto-generate phone / email links if missing
    if (isPhoneCard && !finalLink) {
      const cleanPhone = text.replace(/[^0-9+]/g, '');
      if (cleanPhone) finalLink = `tel:${cleanPhone}`;
    } else if (isEmailCard && !finalLink) {
      const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) finalLink = `mailto:${emailMatch[0]}`;
    }

    return {
      text,
      link: finalLink,
      isLocation: isLocationCard,
      mapQuery: text,
    };
  });
}

/**
 * Extracts all locations for fallback or maps from pageData.locations or contactCards.
 */
export function extractLocations(contactCards = [], pageData = {}) {
  if (Array.isArray(pageData.locations) && pageData.locations.length > 0) {
    const valid = pageData.locations.filter((l) => l && (l.name || l.title || l.address));
    if (valid.length > 0) {
      return valid.map((loc, i) => {
        const name = loc.name || loc.title || loc.address || `Location ${i + 1}`;
        const address = loc.address || name;
        const mapUrl = formatMapEmbedUrl(loc.mapUrl || loc.embedUrl || address || name);
        const directLink = loc.link || getDirectMapLink(loc.mapUrl || address || name);
        return {
          id: loc._id || loc.id || `loc-${i}`,
          name,
          address,
          mapUrl,
          link: directLink,
        };
      });
    }
  }

  const locationCard = contactCards.find(
    (c) =>
      (c.icon && ['MapPin', 'Globe', 'Building2', 'Navigation'].includes(c.icon)) ||
      (c.title && c.title.toLowerCase().includes('location')) ||
      (c.title && c.title.toLowerCase().includes('office'))
  );

  if (locationCard && locationCard.desc) {
    const lines = locationCard.desc
      .split(/[\r\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const rawLinks = extractIndividualUrls(locationCard.link || '');

    if (lines.length > 0) {
      return lines.map((line, idx) => {
        let name = line;
        let explicitLink = '';
        if (line.includes('|')) {
          const parts = line.split('|');
          name = parts[0].trim();
          explicitLink = parts.slice(1).join('|').trim();
        }

        let locLink = explicitLink;
        if (!locLink) {
          const matched = rawLinks.find((u) => matchesLocation(u, name));
          if (matched) {
            locLink = matched;
          } else if (rawLinks.length > idx && rawLinks[idx]) {
            locLink = rawLinks[idx];
          } else {
            locLink = getDirectMapLink(name);
          }
        }

        return {
          id: `loc-card-${idx}`,
          name,
          address: name,
          mapUrl: formatMapEmbedUrl(locLink || name),
          link: locLink || getDirectMapLink(name),
        };
      });
    }
  }

  const defaultUrl = pageData.mapEmbedUrl || 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=6&ie=UTF8&iwloc=&output=embed';
  return [
    {
      id: 'loc-default',
      name: 'United Kingdom',
      address: 'United Kingdom',
      mapUrl: formatMapEmbedUrl(defaultUrl),
      link: getDirectMapLink(defaultUrl, 'United Kingdom'),
    },
  ];
}

