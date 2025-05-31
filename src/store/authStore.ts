import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: User, token: string) => {
    set({ user, token, isAuthenticated: true });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, {
        username,
        password,
      });

      const { user, token } = res.data;
      set({ user, token, isAuthenticated: true, isLoading: false });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Login failed. Please try again.';
      set({ error: message, isLoading: false });
    }
  },

  register: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/register`, {
        username,
        password,
      });

      const { user, token } = res.data;
      set({ user, token, isAuthenticated: true, isLoading: false });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Registration failed. Please try again.';
      set({ error: message, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/login');
  },
}));
