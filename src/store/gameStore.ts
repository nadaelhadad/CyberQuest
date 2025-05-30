import { create } from 'zustand';
import { Category, Challenge, GameProgress } from '../types';
import { useAuthStore } from './authStore';

// Data
import { categories } from '../data/categories';

interface GameState {
  categories: Category[];
  currentCategory: Category | null;
  currentChallenge: Challenge | null;
  gameProgress: GameProgress;
  timePlayed: number;
  isTimerRunning: boolean;
  calculatedScore: number;
  
  // Actions
  setCurrentCategory: (categoryId: string | null) => void;
  setCurrentChallenge: (challengeId: string | null) => void;
  completeChallenge: (challengeId: string) => void;
  useHint: (hintId: string) => void;
  unlockCategory: (categoryId: string) => void;
  unlockChallenge: (challengeId: string) => void;
  submitFlag: (challengeId: string, flag: string) => boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  loadUserProgress: (userId: string) => void;
}

const initialGameProgress: GameProgress = {
  completedChallenges: [],
  unlockedCategories: ['crypto'], // Start with first category unlocked
  unlockedChallenges: ['crypto-1'], // Start with first challenge unlocked
  usedHints: [],
  score: 50, // Starting with 50 points
  unlockedAvatars: ['cyber-ninja', 'quantum-mage'], // Start with first two avatars unlocked
};

export const useGameStore = create<GameState>((set, get) => ({
  categories: categories,
  currentCategory: null,
  currentChallenge: null,
  gameProgress: initialGameProgress,
  timePlayed: 0,
  isTimerRunning: false,
  calculatedScore: 50,
  
  loadUserProgress: (userId: string) => {
    const savedProgress = localStorage.getItem(`gameProgress_${userId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      // For new users (no completed challenges), set score to exactly 50
      if (progress.completedChallenges.length === 0) {
        progress.score = 50;
        progress.unlockedAvatars = ['cyber-ninja', 'quantum-mage'];
      } else {
        // For existing users, ensure score is at least 50
        progress.score = Math.max(progress.score, 50);
        // Update unlocked avatars based on score
        const unlockedAvatars = ['cyber-ninja', 'quantum-mage'];
        if (progress.score >= 150) unlockedAvatars.push('neural-hunter');
        if (progress.score >= 500) unlockedAvatars.push('crypto-sage');
        if (progress.score >= 1000) unlockedAvatars.push('binary-warrior');
        if (progress.score >= 2000) unlockedAvatars.push('data-druid');
        progress.unlockedAvatars = unlockedAvatars;
      }
      set({ gameProgress: progress, calculatedScore: progress.score });
    } else {
      // New user, set initial progress with exactly 50 points
      const initialProgress = {
        score: 50,
        completedChallenges: [],
        unlockedChallenges: ['crypto-1'],
        usedHints: [],
        unlockedCategories: ['crypto'],
        unlockedAvatars: ['cyber-ninja', 'quantum-mage']
      };
      set({ gameProgress: initialProgress, calculatedScore: 50 });
      localStorage.setItem(`gameProgress_${userId}`, JSON.stringify(initialProgress));
    }
  },
  
  startTimer: () => {
    if (!get().isTimerRunning) {
      set({ isTimerRunning: true });
      const timer = setInterval(() => {
        set(state => ({ timePlayed: state.timePlayed + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  },
  
  stopTimer: () => {
    set({ isTimerRunning: false });
  },
  
  resetTimer: () => {
    set({ timePlayed: 0 });
  },
  
  setCurrentCategory: (categoryId: string | null) => {
    if (!categoryId) {
      set({ currentCategory: null });
      return;
    }
    
    const category = get().categories.find(c => c.id === categoryId) || null;
    set({ currentCategory: category });
  },
  
  setCurrentChallenge: (challengeId: string | null) => {
    if (!challengeId) {
      set({ currentChallenge: null });
      return;
    }
    
    let foundChallenge: Challenge | null = null;
    
    for (const category of get().categories) {
      const challenge = category.challenges.find(c => c.id === challengeId);
      if (challenge) {
        foundChallenge = challenge;
        break;
      }
    }
    
    set({ currentChallenge: foundChallenge });
  },
  
  completeChallenge: (challengeId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    // Find the challenge and its category
    const currentCategory = get().categories.find(c => c.challenges.some(ch => ch.id === challengeId));
    if (!currentCategory) return;

    const challenge = currentCategory.challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    // Check if challenge is already completed
    const currentProgress = localStorage.getItem(`gameProgress_${user.id}`);
    if (currentProgress) {
      const progress = JSON.parse(currentProgress);
      if (progress.completedChallenges.includes(challengeId)) {
        return; // Challenge already completed, do nothing
      }
    }

    // Get current progress
    let currentScore = 50; // Start with base 50 points
    let allUsedHints = [];
    let usedHintsForThisChallenge = [];
    if (currentProgress) {
      const progress = JSON.parse(currentProgress);
      currentScore = progress.score;
      allUsedHints = progress.usedHints || [];
      usedHintsForThisChallenge = allUsedHints.filter((hintId: string) => hintId.startsWith(challengeId));
    }

    // Calculate total hint cost for this challenge only
    const totalHintCost = usedHintsForThisChallenge.reduce((total: number, hintId: string) => {
      const hint = challenge.hints.find(h => h.id === hintId);
      return total + (hint ? hint.cost : 0);
    }, 0);
    
    // Calculate final score: current score + challenge points
    // Note: Hint costs are already subtracted when hints are used
    const newScore = currentScore + challenge.points;
    
    // Find the next challenge
    const currentIndex = currentCategory.challenges.findIndex(ch => ch.id === challengeId);
    const nextChallenge = currentCategory.challenges[currentIndex + 1];
    
    // Update categories to unlock the next challenge
    const updatedCategories = get().categories.map(category => {
      if (category.id === currentCategory.id) {
        return {
          ...category,
          challenges: category.challenges.map(ch => {
            if (ch.id === nextChallenge?.id) {
              return { ...ch, isLocked: false };
            }
            return ch;
          })
        };
      }
      return category;
    });

    // Update unlocked avatars based on new score
    const unlockedAvatars = ['cyber-ninja', 'quantum-mage'];
    if (newScore >= 150) unlockedAvatars.push('neural-hunter');
    if (newScore >= 500) unlockedAvatars.push('crypto-sage');
    if (newScore >= 1000) unlockedAvatars.push('binary-warrior');
    if (newScore >= 2000) unlockedAvatars.push('data-druid');

    // Update game progress
    const updatedProgress = {
      score: newScore,
      completedChallenges: [...(JSON.parse(currentProgress || '{}').completedChallenges || []), challengeId],
      unlockedChallenges: nextChallenge 
        ? [...(JSON.parse(currentProgress || '{}').unlockedChallenges || []), nextChallenge.id]
        : JSON.parse(currentProgress || '{}').unlockedChallenges || [],
      usedHints: allUsedHints,
      unlockedCategories: JSON.parse(currentProgress || '{}').unlockedCategories || ['crypto'],
      unlockedAvatars: unlockedAvatars
    };

    // Update state and localStorage
    set((state) => ({
      categories: updatedCategories,
      gameProgress: updatedProgress,
      calculatedScore: newScore
    }));

    localStorage.setItem(`gameProgress_${user.id}`, JSON.stringify(updatedProgress));

    // Update user points in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return {
          ...u,
          points: newScore,
          xp: newScore
        };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user in localStorage
    const currentUser = { ...user, points: newScore, xp: newScore };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Force unlock the next challenge
    if (nextChallenge) {
      get().unlockChallenge(nextChallenge.id);
    }
  },
  
  useHint: (hintId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { gameProgress, currentChallenge } = get();
    
    if (!currentChallenge || gameProgress.usedHints.includes(hintId)) {
      return; // No current challenge or hint already used
    }
    
    // Find the hint
    let hintCost = 0;
    
    for (const hint of currentChallenge.hints) {
      if (hint.id === hintId) {
        hintCost = hint.cost;
        break;
      }
    }
    
    // Get current progress from localStorage
    const currentProgress = localStorage.getItem(`gameProgress_${user.id}`);
    let currentScore = 50; // Start with base 50 points
    
    if (currentProgress) {
      const progress = JSON.parse(currentProgress);
      currentScore = progress.score; // Use current score instead of resetting to 50
    }
    
    // Check if player has enough points
    if (currentScore < hintCost) {
      return; // Not enough points
    }
    
    // Calculate new score after using hint
    const newScore = currentScore - hintCost;
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      usedHints: [...gameProgress.usedHints, hintId],
      score: newScore,
    };
    
    // Update state
    set({ 
      gameProgress: updatedProgress,
      calculatedScore: newScore
    });

    // Save to localStorage
    localStorage.setItem(
      `gameProgress_${user.id}`,
      JSON.stringify({
        ...JSON.parse(currentProgress || '{}'),
        score: newScore,
        usedHints: [...(JSON.parse(currentProgress || '{}').usedHints || []), hintId],
      })
    );

    // Update user points in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return {
          ...u,
          points: newScore,
          xp: newScore
        };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user in localStorage
    const currentUser = { ...user, points: newScore, xp: newScore };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  },
  
  unlockCategory: (categoryId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { gameProgress } = get();
    
    if (gameProgress.unlockedCategories.includes(categoryId)) {
      return; // Already unlocked
    }
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      unlockedCategories: [...gameProgress.unlockedCategories, categoryId],
    };
    
    set({ gameProgress: updatedProgress });

    // Save to localStorage
    localStorage.setItem(
      `gameProgress_${user.id}`,
      JSON.stringify(updatedProgress)
    );
  },
  
  unlockChallenge: (challengeId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { gameProgress } = get();
    
    // Update game progress
    const updatedProgress = {
      ...gameProgress,
      unlockedChallenges: [...gameProgress.unlockedChallenges, challengeId],
    };
    
    // Update categories to unlock the challenge
    const updatedCategories = get().categories.map(category => {
      return {
        ...category,
        challenges: category.challenges.map(ch => {
          if (ch.id === challengeId) {
            return { ...ch, isLocked: false };
          }
          return ch;
        })
      };
    });

    // Update state immediately
    set({ 
      gameProgress: updatedProgress,
      categories: updatedCategories
    });

    // Save to localStorage
    localStorage.setItem(
      `gameProgress_${user.id}`,
      JSON.stringify(updatedProgress)
    );

    // Force a re-render by updating the current challenge
    const currentChallenge = get().currentChallenge;
    if (currentChallenge) {
      set({ currentChallenge: null });
      setTimeout(() => {
        set({ currentChallenge });
      }, 0);
    }
  },
  
  submitFlag: (challengeId: string, flag: string) => {
    const { categories } = get();
    
    // Find the challenge
    let correctFlag = '';
    let foundChallenge = null;
    
    for (const category of categories) {
      const challenge = category.challenges.find(c => c.id === challengeId);
      if (challenge) {
        correctFlag = challenge.flag;
        foundChallenge = challenge;
        break;
      }
    }
    
    const isCorrect = flag.trim() === correctFlag;
    
    if (isCorrect && foundChallenge) {
      // Find the next challenge
      const currentCategory = categories.find(c => c.challenges.some(ch => ch.id === challengeId));
      if (currentCategory) {
        const currentIndex = currentCategory.challenges.findIndex(ch => ch.id === challengeId);
        const nextChallenge = currentCategory.challenges[currentIndex + 1];
        
        if (nextChallenge) {
          // Unlock the next challenge first
          get().unlockChallenge(nextChallenge.id);
        }
      }
      // Then complete the current challenge
      get().completeChallenge(challengeId);
    }
    
    return isCorrect;
  },
}));