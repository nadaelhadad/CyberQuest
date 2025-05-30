export interface User {
  id: string;
  username: string;
  xp: number;
  rank: string;
  points: number;
  timePlayed: number;
  completedChallenges: string[];
  avatar?: string;
}

export interface Challenge {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  points: number;
  hints: Hint[];
  flag: string;
  isCompleted: boolean;
  isLocked: boolean;
  solution: string;
}

export interface Hint {
  id: string;
  text: string;
  cost: number;
  isRevealed: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  challenges: Challenge[];
  isLocked: boolean;
}

export interface GameProgress {
  completedChallenges: string[];
  unlockedCategories: string[];
  unlockedChallenges: string[];
  usedHints: string[];
  score: number;
  unlockedAvatars: string[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
  completedChallenges: number;
  avatar?: string;
}