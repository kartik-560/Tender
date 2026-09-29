import { create } from 'zustand';
import api from '../shared/api';

function setCookie(name, value, maxAge) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function removeCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          setCookie('token', token, 604800); // 7 days
          set({ token, user, isAuthenticated: true, isLoading: false });
          return;
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          removeCookie('token');
        }
      }
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    const res = await api.login(email, password);
    if (res.token && res.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        setCookie('token', res.token, 604800); // 7 days
      }
      set({ token: res.token, user: res.user, isAuthenticated: true });
    }
    return res;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      removeCookie('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
