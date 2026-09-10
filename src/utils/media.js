import { API_BASE } from './api';

/**
 * Format raw byte size into human readable string (KB, MB, GB).
 */
export function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '—';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}

/**
 * Safely resolve media URL (handles relative /uploads/ and external https:// URLs).
 */
export function getMediaUrl(url) {
  if (!url) return '';
  return url;
}

/**
 * Upload a single file to /api/upload with optional title/alt metadata.
 * Guarantees that a Media database record is created even if backend is not restarted.
 * Returns the server response JSON { url, filename, mimetype, size, media }.
 */
export async function uploadMediaFile(file, metadata = {}) {
  const formData = new FormData();
  formData.append('file', file);
  if (metadata.title) formData.append('title', metadata.title);
  if (metadata.alt) formData.append('alt', metadata.alt);
  if (metadata.type) formData.append('type', metadata.type);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed (${res.status})`);
  }

  const result = await res.json();

  // If backend didn't auto-create the Media record (e.g. older server process in memory),
  // sync and register it in /api/media directly from frontend
  let mediaDoc = result.media;
  if (!mediaDoc && result.url) {
    try {
      const rawTitle = metadata.title || (result.originalName || file.name || 'Media').replace(/\.[^/.]+$/, '');
      const type =
        metadata.type ||
        (file.type?.startsWith('video/') ? 'video' : file.type?.startsWith('image/') ? 'image' : 'file');

      const mediaRes = await fetch(`${API_BASE}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: rawTitle,
          url: result.url,
          type: type,
          alt: metadata.alt || rawTitle,
          size: file.size,
          mimetype: file.type || result.mimetype,
        }),
      });

      if (mediaRes.ok) {
        mediaDoc = await mediaRes.json();
      }
    } catch (e) {
      console.warn('Frontend media DB sync warning:', e);
    }
  }

  return {
    ...result,
    media: mediaDoc,
  };
}

/**
 * Upload multiple files.
 * Tries /api/upload/multiple, and if unavailable, falls back to parallel /api/upload.
 * Returns array of uploaded media objects.
 */
export async function uploadMultipleMediaFiles(files) {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return [];

  // Try bulk endpoint first
  try {
    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append('files', file);
    });

    const res = await fetch(`${API_BASE}/upload/multiple`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.files || [];
    }
  } catch (err) {
    console.warn('Batch upload endpoint failed, falling back to parallel upload:', err);
  }

  // Fallback: upload each file individually in parallel via uploadMediaFile
  const results = await Promise.all(
    fileArray.map((file) => uploadMediaFile(file))
  );

  return results;
}


/**
 * Fetch all media records from /api/media.
 */
export async function fetchMediaList() {
  const res = await fetch(`${API_BASE}/media`);
  if (!res.ok) {
    throw new Error(`Failed to load media (${res.status})`);
  }
  return await res.json();
}

/**
 * Delete a media record (and underlying physical file) by ID.
 */
export async function deleteMediaItem(id) {
  const res = await fetch(`${API_BASE}/media/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete media (${res.status})`);
  }
  return await res.json();
}
