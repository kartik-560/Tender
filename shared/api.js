const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getAuthHeader() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Authentication
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async register(name, email, password, role) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  // Tenders
  async getAllTenders() {
    try {
      const res = await fetch(`${BASE_URL}/tenders`, {
        headers: { ...getAuthHeader() },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch tenders');
      return await res.json();
    } catch (err) {
      console.warn('Backend fetch error, retrying or fallback:', err.message);
      throw err;
    }
  },

  async getTenderById(id) {
    const res = await fetch(`${BASE_URL}/tenders/${id}`, {
      headers: { ...getAuthHeader() },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Tender not found');
    return res.json();
  },

  async uploadTender(formData) {
    const res = await fetch(`${BASE_URL}/tenders/upload`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        // Note: Do not set Content-Type header for FormData, browser sets it with boundary
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to upload tender document');
    return data;
  },

  async deleteTender(id) {
    const res = await fetch(`${BASE_URL}/tenders/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Analytics
  async getAnalytics() {
    const res = await fetch(`${BASE_URL}/analytics`, {
      headers: { ...getAuthHeader() },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },
};

export default api;
