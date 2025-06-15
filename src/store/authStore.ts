import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  initializeAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  initializeAuth: () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('currentUser');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isInitialized: true 
        });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      set({ isInitialized: true });
    }
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  clearError: () => {
    set({ error: null });
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Check if running in development mode (no backend)
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment) {
        // Development mode - use localStorage authentication
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.username === username && u.password === password);
        
        if (!user) {
          throw new Error('Invalid username or password');
        }
        
        // Generate a simple token for development
        const token = `dev_token_${user.id}_${Date.now()}`;
        
        set({ 
          user: {
            id: user.id,
            username: user.username,
            xp: user.xp || 0,
            rank: user.rank || 'Novice',
            points: user.points || 50,
            timePlayed: user.timePlayed || 0,
            completedChallenges: user.completedChallenges || [],
            avatar: user.avatar
          }, 
          token, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          username: user.username,
          xp: user.xp || 0,
          rank: user.rank || 'Novice',
          points: user.points || 50,
          timePlayed: user.timePlayed || 0,
          completedChallenges: user.completedChallenges || [],
          avatar: user.avatar
        }));
      } else {
        // Production mode - use backend API
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
          username,
          password,
        });

        const { user, token } = res.data;
        set({ user, token, isAuthenticated: true, isLoading: false });
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error instanceof Error 
          ? error.message
          : 'Login failed. Please try again.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Check if running in development mode (no backend)
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment) {
        // Development mode - use localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.find((u: any) => u.username === username)) {
          throw new Error('Username already exists');
        }
        
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          username,
          password, // In production, this should be hashed
          xp: 0,
          rank: 'Novice',
          points: 50,
          timePlayed: 0,
          completedChallenges: [],
          avatar: 'public/avatars/cyber-ninja.png'
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Generate a simple token for development
        const token = `dev_token_${newUser.id}_${Date.now()}`;
        
        const userForState = {
          id: newUser.id,
          username: newUser.username,
          xp: newUser.xp,
          rank: newUser.rank,
          points: newUser.points,
          timePlayed: newUser.timePlayed,
          completedChallenges: newUser.completedChallenges,
          avatar: newUser.avatar
        };
        
        set({ 
          user: userForState, 
          token, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(userForState));
      } else {
        // Production mode - use backend API
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
          username,
          password,
        });

        const { user, token } = res.data;
        set({ user, token, isAuthenticated: true, isLoading: false });
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error instanceof Error 
          ? error.message
          : 'Registration failed. Please try again.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      error: null 
    });
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },
}));