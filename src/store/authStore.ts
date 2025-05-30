import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.username === username);
      
      if (user && password === 'password') { // Simple password check for demo
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ error: 'Invalid username or password', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },

  register: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      if (users.some((u: User) => u.username === username)) {
        set({ error: 'Username already taken', isLoading: false });
        return;
      }
      
      // Create new user with exactly 50 points
      const newUser: User = {
        id: Date.now().toString(),
        username,
        xp: 50,
        rank: 'Newbie',
        points: 50,
        timePlayed: 0,
        completedChallenges: [],
      };
      
      // Add new user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Initialize game progress for new user with exactly 50 points
      const initialGameProgress = {
        score: 50,
        completedChallenges: [],
        unlockedChallenges: ['crypto-1'],
        usedHints: [],
        unlockedCategories: ['crypto'],
      };

      // Clear any existing progress for this user ID
      localStorage.removeItem(`gameProgress_${newUser.id}`);
      
      // Set new progress
      localStorage.setItem(`gameProgress_${newUser.id}`, JSON.stringify(initialGameProgress));
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
    }
  },

  logout: () => {
    const user = useAuthStore.getState().user;
    if (user) {
      // Clear game progress for the user
      localStorage.removeItem(`gameProgress_${user.id}`);
    }
    set({ user: null, isAuthenticated: false });
    // Clear any sensitive data
    localStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = '/login';
  },
}));