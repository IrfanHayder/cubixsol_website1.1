/**
 * Converts any Google Maps link, iframe code, coordinates, or plain address string
 * into a valid, embeddable Google Maps iframe URL.
 */
export function formatMapEmbedUrl(input) {
  if (!input || typeof input !== 'string') {
    return 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=13&ie=UTF8&iwloc=&output=embed';
  }

  const raw = input.trim();
  if (!raw) {
    return 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=13&ie=UTF8&iwloc=&output=embed';
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

  // 6. If it's plain text address / location (e.g. "London, UK" or "United Kingdom" or "Pakistan")
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

/**
 * Generates a direct, clickable Google Maps link for opening in a new tab.
 */
export function getDirectMapLink(input, defaultName = '') {
  if (!input && !defaultName) return 'https://maps.google.com';
  const val = (input || '').trim();

  // If already a valid URL
  if (val.startsWith('http://') || val.startsWith('https://')) {
    // If it's an embed URL, convert to search URL
    if (val.includes('output=embed') || val.includes('/maps/embed')) {
      try {
        const parsed = new URL(val);
        const q = parsed.searchParams.get('q');
        if (q) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
      } catch {
        // ignore
      }
    }
    return val;
  }

  const query = val || defaultName;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Helper to test if a URL is related to a specific country/city name
 */
function matchesLocation(url, name) {
  if (!url || !name) return false;
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanUrl = url.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanUrl.includes(cleanName)) return true;

  if (cleanName.includes('unitedkingdom') || cleanName === 'uk') {
    return cleanUrl.includes('unitedkingdom') || cleanUrl.includes('uk') || cleanUrl.includes('london') || cleanUrl.includes('greatbritain');
  }
  if (cleanName.includes('pakistan') || cleanName === 'pk') {
    return cleanUrl.includes('pakistan') || cleanUrl.includes('lahore') || cleanUrl.includes('karachi') || cleanUrl.includes('islamabad');
  }
  if (cleanName.includes('unitedarabemirates') || cleanName === 'uae' || cleanName.includes('emirates') || cleanName.includes('dubai')) {
    return cleanUrl.includes('emirates') || cleanUrl.includes('dubai') || cleanUrl.includes('uae') || cleanUrl.includes('abudhabi');
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
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const rawLinks = (card.link || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const isLocationCard =
    (card.icon && ['MapPin', 'Globe', 'Building2', 'Navigation'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('location')) ||
    (card.title && card.title.toLowerCase().includes('office'));

  const isPhoneCard =
    (card.icon && ['Phone', 'PhoneCall', 'Headphones'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('call')) ||
    (card.title && card.title.toLowerCase().includes('phone'));

  const isEmailCard =
    (card.icon && ['Mail', 'MailPlus', 'MessageSquare'].includes(card.icon)) ||
    (card.title && card.title.toLowerCase().includes('email'));

  return lines.map((line, idx) => {
    // Check if line itself has "Text | Link" format
    let text = line;
    let explicitLink = '';
    if (line.includes('|')) {
      const parts = line.split('|');
      text = parts[0].trim();
      explicitLink = parts.slice(1).join('|').trim();
    }

    // Determine link
    let finalLink = explicitLink;

    if (!finalLink) {
      if (rawLinks.length > 1 && rawLinks[idx]) {
        finalLink = rawLinks[idx];
      } else if (rawLinks.length === 1) {
        if (isLocationCard) {
          // If only 1 link was provided, check if it actually matches this location
          if (matchesLocation(rawLinks[0], text)) {
            finalLink = rawLinks[0];
          } else {
            finalLink = getDirectMapLink(text);
          }
        } else if (!isLocationCard) {
          finalLink = rawLinks[0];
        }
      }
    }

    // Smart link generation based on type if still empty or location
    if (isLocationCard) {
      if (!finalLink) {
        finalLink = getDirectMapLink(text);
      }
    } else if (isPhoneCard && !finalLink) {
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
 * Extracts all locations for the interactive map switcher from pageData.locations or contactCards.
 */
export function extractLocations(contactCards = [], pageData = {}) {
  // 1. If explicit locations are configured in pageData
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

  // 2. Otherwise extract from the "Our Location" / MapPin card in contactCards
  const locationCard = contactCards.find(
    (c) =>
      (c.icon && ['MapPin', 'Globe', 'Building2', 'Navigation'].includes(c.icon)) ||
      (c.title && c.title.toLowerCase().includes('location')) ||
      (c.title && c.title.toLowerCase().includes('office'))
  );

  if (locationCard && locationCard.desc) {
    const lines = locationCard.desc
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const rawLinks = (locationCard.link || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

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
          if (rawLinks.length > 1 && rawLinks[idx]) {
            locLink = rawLinks[idx];
          } else if (rawLinks.length === 1 && matchesLocation(rawLinks[0], name)) {
            locLink = rawLinks[0];
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

  // 3. Fallback to default mapEmbedUrl in pageData
  const defaultUrl = pageData.mapEmbedUrl || 'https://maps.google.com/maps?q=United%20Kingdom&t=&z=13&ie=UTF8&iwloc=&output=embed';
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

