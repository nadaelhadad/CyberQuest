import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Award, Clock, Star, Shield, Trophy, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import AvatarSelector from '../components/ui/AvatarSelector';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import { AvatarOption } from '../data/avatars';
import { Challenge, Category } from '../types';

// Format time in seconds to HH:MM:SS
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const { categories, gameProgress, timePlayed, startTimer, stopTimer, loadUserProgress } = useGameStore();
  const navigate = useNavigate();
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const [hackerName, setHackerName] = useState(localStorage.getItem('hackerName') || '');
  const [hackerAge, setHackerAge] = useState(localStorage.getItem('hackerAge') || '');
  const [calculatedScore, setCalculatedScore] = useState(50);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  
  // Calculate score based on completed challenges and hints
  useEffect(() => {
    if (user) {
      const gameProgress = JSON.parse(localStorage.getItem(`gameProgress_${user.id}`) || 'null');
      let score = 50; // Base score
      let totalHintCost = 0;

      if (gameProgress) {
        // Calculate score based on completed challenges and hints
        gameProgress.completedChallenges.forEach((challengeId: string) => {
          // Find the challenge and its category
          for (const category of categories) {
            const challenge = category.challenges.find(c => c.id === challengeId);
            if (challenge) {
              // Add challenge points
              score += challenge.points;
              
              // Calculate hint costs for this challenge
              const usedHintsForChallenge = gameProgress.usedHints.filter((hintId: string) => hintId.startsWith(challengeId));
              usedHintsForChallenge.forEach((hintId: string) => {
                const hint = challenge.hints.find(h => h.id === hintId);
                if (hint) {
                  totalHintCost += hint.cost;
                }
              });
              break;
            }
          }
        });

        // Subtract total hint costs
        score -= totalHintCost;
        
        // Ensure minimum score of 50
        score = Math.max(score, 50);
      }

      setCalculatedScore(score);
    }
  }, [user, categories, gameProgress]);
  
  // Listen for changes to hackerName
  useEffect(() => {
    const handleHackerNameChange = (event: CustomEvent) => {
      setHackerName(event.detail);
    };

    window.addEventListener('hackerNameChanged', handleHackerNameChange as EventListener);
    return () => window.removeEventListener('hackerNameChanged', handleHackerNameChange as EventListener);
  }, []);

  // Listen for changes to hackerAge
  useEffect(() => {
    const handleHackerAgeChange = (event: CustomEvent) => {
      setHackerAge(event.detail);
    };

    window.addEventListener('hackerAgeChanged', handleHackerAgeChange as EventListener);
    return () => window.removeEventListener('hackerAgeChanged', handleHackerAgeChange as EventListener);
  }, []);

  // Update formatted time whenever timePlayed changes
  useEffect(() => {
    setFormattedTime(formatTime(timePlayed));
  }, [timePlayed]);

  // Start timer when component mounts
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handleAvatarSelect = (avatar: AvatarOption) => {
    if (!user) return;

    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, avatar: avatar.image };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user
    const updatedUser = { ...user, avatar: avatar.image };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update the user in the auth store
    setUser(updatedUser);

    // Close the selector
    setIsAvatarSelectorOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadUserProgress(user.id);
  }, [user, navigate, loadUserProgress]);

  // Calculate completion percentage
  const totalChallenges = categories.reduce((sum, category) => sum + category.challenges.length, 0);
  const completedChallenges = gameProgress.completedChallenges.length;
  const percentComplete = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  // Get recent completed challenges
  const recentCompletedChallenges = gameProgress.completedChallenges
    .slice(-5)
    .map(challengeId => {
      for (const category of categories) {
        const challenge = category.challenges.find(c => c.id === challengeId);
        if (challenge) {
          return { challenge, category };
        }
      }
      return null;
    })
    .filter((item): item is { challenge: Challenge; category: Category } => item !== null)
    .reverse();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-6" variants={itemVariants}>
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center text-cyber-blue-100 hover:text-cyber-blue-200 transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Map</span>
          </button>
          
          <h1 className="text-3xl font-cyber font-bold mb-2 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
            Hacker Profile
          </h1>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <motion.div variants={itemVariants}>
            <Card className="p-6" variant="primary">
              <div className="flex items-center mb-6">
                <Avatar 
                  src={user?.avatar}
                  size="md"
                  onClick={() => setIsAvatarSelectorOpen(true)}
                  className="mr-4"
                />
                <div>
                  <h2 className="text-2xl font-cyber mb-1">{hackerName || user?.username}</h2>
                  <div className="flex flex-col">
                    <span className="text-sm text-cyber-blue-100">@{user?.username}</span>
                    <span className="text-xs text-gray-400">ID: {user?.id}</span>
                    {hackerAge && <span className="text-xs text-gray-400">Age: {hackerAge}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="text-yellow-400 mr-2" size={20} />
                    <span className="text-gray-300">Score</span>
                  </div>
                  <span className="font-cyber text-xl">{calculatedScore}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="text-cyber-blue-100 mr-2" size={20} />
                    <span className="text-gray-300">Time Played</span>
                  </div>
                  <span className="font-mono">{formattedTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="text-cyber-pink-100 mr-2" size={20} />
                    <span className="text-gray-300">Challenges</span>
                  </div>
                  <span className="font-mono">{completedChallenges}/{totalChallenges}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="p-6 h-full" variant="dark">
              <h3 className="text-xl font-cyber mb-6">Progress & Achievements</h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Overall Completion</span>
                  <span className="font-semibold">{percentComplete}%</span>
                </div>
                <div className="h-3 bg-cyber-gray rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyber-blue-300 to-cyber-pink-300" 
                    style={{ width: `${percentComplete}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-cyber text-lg mb-4">Recent Activity</h4>
                
                {recentCompletedChallenges.length > 0 ? (
                  <div className="space-y-3">
                    {recentCompletedChallenges.map(({ challenge, category }, index) => (
                      <div 
                        key={index}
                        className="bg-cyber-gray bg-opacity-10 rounded-lg p-3 flex items-center"
                      >
                        <div className={`w-10 h-10 rounded-full bg-${category?.color}-300 bg-opacity-20 flex items-center justify-center mr-3`}>
                          <Trophy size={20} className={`text-${category?.color}-200`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h5 className="font-cyber">{challenge?.title}</h5>
                            <Badge variant="success" size="sm">{challenge?.points} pts</Badge>
                          </div>
                          <p className="text-sm text-gray-400">{category?.name} - Level {challenge?.difficulty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Trophy size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No challenges completed yet. Start solving!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        onSelect={handleAvatarSelect}
        currentAvatar={user?.avatar}
      />
    </motion.div>
  );
};

export default ProfilePage;