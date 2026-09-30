import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const api = {
  // Authentication
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (name, email, password, role) => apiClient.post('/auth/register', { name, email, password, role }),

  // Tenders
  getAllTenders: () => apiClient.get('/tenders'),
  getTenderById: (id) => apiClient.get(`/tenders/${id}`),
  uploadTender: (formData) => apiClient.post('/tenders/upload', formData),
  registerTender: (payload) => apiClient.post('/tenders/register', payload),
  deleteTender: (id) => apiClient.delete(`/tenders/${id}`),

  // Analytics
  getAnalytics: () => apiClient.get('/analytics'),
};

export default api;
