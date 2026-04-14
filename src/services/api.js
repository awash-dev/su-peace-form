const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const fetchJSON = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ── POSTS (News) ──────────────────────────────────────────────────
export const getPosts = () => fetchJSON('/posts')

export const createPost = (formData) =>
  fetch(`${BASE_URL}/posts`, { method: 'POST', body: formData }).then(async r => {
    const d = await r.json(); if (!r.ok) throw new Error(d.error); return d
  })

export const updatePost = (id, formData) =>
  fetch(`${BASE_URL}/posts/${id}`, { method: 'PUT', body: formData }).then(async r => {
    const d = await r.json(); if (!r.ok) throw new Error(d.error); return d
  })

export const deletePost = (id) =>
  fetchJSON(`/posts/${id}`, { method: 'DELETE' })

// ── MEMBERS ───────────────────────────────────────────────────────
export const getMembers = () => fetchJSON('/members')

export const createMember = (formData) =>
  fetch(`${BASE_URL}/members`, { method: 'POST', body: formData }).then(async r => {
    const d = await r.json(); if (!r.ok) throw new Error(d.error); return d
  })

export const updateMember = (id, formData) =>
  fetch(`${BASE_URL}/members/${id}`, { method: 'PUT', body: formData }).then(async r => {
    const d = await r.json(); if (!r.ok) throw new Error(d.error); return d
  })

export const deleteMember = (id) =>
  fetchJSON(`/members/${id}`, { method: 'DELETE' })

// ── CATEGORIES ────────────────────────────────────────────────────
export const getCategories = () => fetchJSON('/categories')

export const createCategory = (name) =>
  fetchJSON('/categories', { method: 'POST', body: JSON.stringify({ name }) })

export const updateCategory = (name, newName) =>
  fetchJSON(`/categories/${encodeURIComponent(name)}`, {
    method: 'PUT', body: JSON.stringify({ newName })
  })

export const deleteCategory = (name) =>
  fetchJSON(`/categories/${encodeURIComponent(name)}`, { method: 'DELETE' })

// ── CONTACT ───────────────────────────────────────────────────────
export const sendContact = (data) =>
  fetchJSON('/contact', { method: 'POST', body: JSON.stringify(data) })

// ── EXPORT ────────────────────────────────────────────────────────
export const exportMembersCSV = () => {
  window.open(`${BASE_URL}/export/members`, '_blank')
}
