/**
 * Centralized API Client
 * All backend communication goes through this module
 */

const API_BASE = 'https://su-peace-form-backend.vercel.app'; // Live Vercel Production Environment backend url

/** @type {Map<string, {data: any, ts: number}>} */
const cache = new Map();
const CACHE_TTL = 30_000; // 30 seconds

/**
 * Core fetch wrapper with error handling, caching, and retry
 * @param {string} path
 * @param {RequestInit} [options]
 * @param {{ cache?: boolean, cacheTTL?: number }} [config]
 */
async function request(path, options = {}, config = {}) {
  const url = `${API_BASE}${path}`;
  const cacheKey = `${options.method ?? 'GET'}:${url}`;
  const useCache = config.cache !== false && (!options.method || options.method === 'GET');

  // Return cached response if fresh
  if (useCache) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.ts < (config.cacheTTL ?? CACHE_TTL)) {
      return cached.data;
    }
  }

  const headers = { ...options.headers };
  // Only set application/json if not FormData and not already set
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try { const body = await res.json(); message = body.error || body.message || message; } catch {}
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  const data = res.status === 204 ? null : await res.json();

  if (useCache) cache.set(cacheKey, { data, ts: Date.now() });

  return data;
}

/** Invalidate cache entries matching a prefix */
export function invalidateCache(prefix = '') {
  for (const key of cache.keys()) {
    if (key.includes(prefix)) cache.delete(key);
  }
}

// ─── Categories ───────────────────────────────────────────────

export const categories = {
  list: () => request('/api/categories', {}, { cache: true }),

  add: (name) => {
    invalidateCache('/api/categories');
    return request('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  update: (name, newName) => {
    invalidateCache('/api/categories');
    return request(`/api/categories/${encodeURIComponent(name)}`, {
      method: 'PUT',
      body: JSON.stringify({ newName }),
    });
  },

  remove: (name) => {
    invalidateCache('/api/categories');
    return request(`/api/categories/${encodeURIComponent(name)}`, { method: 'DELETE' });
  },
};

// ─── Members ──────────────────────────────────────────────────

export const members = {
  list: () => request('/api/members', {}, { cache: true }),

  add: (formData) => {
    invalidateCache('/api/members');
    return request('/api/members', { method: 'POST', body: formData, headers: {} });
  },

  update: (id, formData) => {
    invalidateCache('/api/members');
    return request(`/api/members/${id}`, { method: 'PUT', body: formData, headers: {} });
  },

  remove: (id) => {
    invalidateCache('/api/members');
    return request(`/api/members/${id}`, { method: 'DELETE' });
  },
};

// ─── Posts ────────────────────────────────────────────────────

export const posts = {
  list: () => request('/api/posts', {}, { cache: true }),

  add: (formData) => {
    invalidateCache('/api/posts');
    return request('/api/posts', { method: 'POST', body: formData, headers: {} });
  },

  update: (id, formData) => {
    invalidateCache('/api/posts');
    return request(`/api/posts/${id}`, { method: 'PUT', body: formData, headers: {} });
  },

  remove: (id) => {
    invalidateCache('/api/posts');
    return request(`/api/posts/${id}`, { method: 'DELETE' });
  },
};

// ─── Contact ──────────────────────────────────────────────────

export const contact = {
  send: (payload) =>
    request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// ─── Health ──────────────────────────────────────────────────

export const health = {
  check: () => request('/api/health', {}, { cacheTTL: 5000 }),
};

export default { categories, members, posts, contact, health };
