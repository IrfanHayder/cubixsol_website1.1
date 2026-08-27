const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const API_BASE = BASE_URL ? `${BASE_URL}/api` : '/api';

/**
 * Robust fetch wrapper that safely checks res.ok and content-type before parsing JSON.
 * Prevents "SyntaxError: Unexpected token '<', '<!doctype ' is not valid JSON" crashes.
 */
export async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE}${cleanEndpoint}`;

  const res = await fetch(url, options);

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
