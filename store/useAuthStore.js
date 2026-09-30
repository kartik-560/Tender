import { create } from 'zustand';
import Cookies from 'js-cookie';
import api from '../shared/api';

const useAuthStore = create((set) => ({
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
          Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'Lax' });
          set({ token, user, isAuthenticated: true, isLoading: false });
          return;
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          Cookies.remove('token', { path: '/' });
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
        Cookies.set('token', res.token, { expires: 7, path: '/', sameSite: 'Lax' });
      }
      set({ token: res.token, user: res.user, isAuthenticated: true });
    }
    return res;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Cookies.remove('token', { path: '/' });
    }
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

export { useAuthStore };
export default useAuthStore;
