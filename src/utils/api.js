const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const API_BASE = BASE_URL ? `${BASE_URL}/api` : '/api';

/**
 * Robust fetch wrapper that safely normalizes endpoint URLs,
 * handles leading /api prefixes, /services/slug/ aliases, and checks content-type before parsing JSON.
 * Prevents "SyntaxError: Unexpected token '<', '<!doctype ' is not valid JSON" crashes.
 */
export async function apiFetch(endpoint, options = {}) {
  let cleanEndpoint = String(endpoint || '').trim();

  if (!cleanEndpoint.startsWith('http://') && !cleanEndpoint.startsWith('https://')) {
    // Strip all leading slashes
    cleanEndpoint = cleanEndpoint.replace(/^\/+/, '');

    // Strip leading "api/" if present so it doesn't double-prefix to /api/api/...
    if (cleanEndpoint.startsWith('api/')) {
      cleanEndpoint = cleanEndpoint.replace(/^api\//, '');
    }

    // Normalize any legacy "/services/slug/:slug" or "services/slug/:slug" to "services/:slug"
    if (cleanEndpoint.startsWith('services/slug/')) {
      cleanEndpoint = cleanEndpoint.replace(/^services\/slug\//, 'services/');
    }

    // Ensure cleanEndpoint starts with /
    cleanEndpoint = `/${cleanEndpoint}`;
  }

  const url =
    cleanEndpoint.startsWith('http://') || cleanEndpoint.startsWith('https://')
      ? cleanEndpoint
      : `${API_BASE}${cleanEndpoint}`;

  const fetchOptions = { ...options };
  if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
    fetchOptions.headers = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    };
  }

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch (err) {
    throw new Error(`Cannot connect to backend server. Make sure the server is running on port 5000 (${err.message})`);
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    if (isJson) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API error (${res.status})`);
    }
    throw new Error(`API error (${res.status}): Server returned non-JSON response`);
  }

  if (!isJson) {
    throw new Error('API returned HTML or invalid content type');
  }

  return await res.json();
}

