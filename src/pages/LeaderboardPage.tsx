import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, Medal, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  rank: string;
  completedChallenges: string[];
  avatar?: string;
}

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { categories } = useGameStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Get game progress for each user
    const leaderboardData = users.map((u: any) => {
      const gameProgress = JSON.parse(localStorage.getItem(`gameProgress_${u.id}`) || 'null');
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

      return {
        id: u.id,
        username: u.username,
        points: score,
        rank: u.rank,
        completedChallenges: gameProgress ? gameProgress.completedChallenges : [],
        avatar: u.avatar
      };
    });
    
    // Sort by points in descending order
    const sortedLeaderboard = leaderboardData.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points);
    
    setLeaderboard(sortedLeaderboard);
    setIsLoading(false);
  }, [categories]);
  
  const filteredLeaderboard = leaderboard.filter(entry => 
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div className="mb-6" variants={itemVariants}>
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center text-cyber-blue-100 hover:text-cyber-blue-200 transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Map</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-3xl font-cyber font-bold mb-2 md:mb-0 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
              Global Leaderboard
            </h1>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-cyber-gray border-2 border-cyber-blue-200 rounded-lg py-2 pl-10 pr-4 text-white w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-blue-100 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading rankings...</p>
          </div>
        ) : (
          <>
            {/* Top 3 Players */}
            <motion.div 
              className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={itemVariants}
            >
              {leaderboard.slice(0, 3).map((entry, index) => {
                const medals = [
                  'bg-gradient-to-r from-yellow-400 to-yellow-600',
                  'bg-gradient-to-r from-gray-300 to-gray-500',
                  'bg-gradient-to-r from-amber-700 to-amber-900',
                ];
                
                const isCurrentUser = Boolean(user && entry.id === user.id);
                
                return (
                  <Card
                    key={entry.id}
                    variant={isCurrentUser ? 'secondary' : 'primary'}
                    glowing={isCurrentUser}
                    className={`p-4 text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                  >
                    <div className="relative inline-block mb-2">
                      <div className={`w-16 h-16 rounded-full overflow-hidden border-4 ${medals[index]}`}>
                        <Avatar 
                          src={entry.avatar}
                          size="sm"
                          className="w-full h-full"
                        />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${medals[index]} text-white font-bold`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="font-cyber text-lg truncate">{entry.username}</h3>
                    <p className="text-sm text-gray-300 mb-2">Score: {entry.points}</p>
                    
                    <div className="flex justify-center">
                      <Badge variant="primary" size="sm">
                        <Trophy size={12} className="mr-1" /> 
                        {entry.completedChallenges.length} Challenges
                      </Badge>
                    </div>
                    
                    {isCurrentUser && (
                      <div className="mt-2 text-xs text-cyber-blue-100">That's you!</div>
                    )}
                  </Card>
                );
              })}
            </motion.div>
            
            {/* Leaderboard Table */}
            <motion.div
              className="bg-cyber-black rounded-xl overflow-hidden"
              variants={itemVariants}
            >
              <table className="w-full">
                <thead className="bg-cyber-gray">
                  <tr>
                    <th className="py-4 px-2 md:px-6 text-left font-cyber">Rank</th>
                    <th className="py-4 px-2 md:px-6 text-left font-cyber">Player</th>
                    <th className="py-4 px-2 md:px-6 text-left font-cyber">Score</th>
                    <th className="py-4 px-2 md:px-6 text-left font-cyber hidden md:table-cell">Challenges</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((entry, index) => {
                    const isCurrentUser = Boolean(user && entry.id === user.id);
                    
                    return (
                      <tr 
                        key={entry.id} 
                        className={`border-b border-cyber-gray hover:bg-cyber-gray hover:bg-opacity-20 transition-colors ${
                          isCurrentUser ? 'bg-cyber-blue-300 bg-opacity-10' : ''
                        }`}
                      >
                        <td className="py-4 px-2 md:px-6">
                          <div className="flex items-center">
                            {index < 3 ? (
                              <Medal 
                                size={18} 
                                className={
                                  index === 0 
                                    ? 'text-yellow-400' 
                                    : index === 1 
                                      ? 'text-gray-300' 
                                      : 'text-amber-700'
                                } 
                              />
                            ) : (
                              <span className="font-mono">{index + 1}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-2 md:px-6">
                          <div className="flex items-center">
                            <Avatar 
                              src={entry.avatar}
                              size="sm"
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium">{entry.username}</div>
                              {isCurrentUser && (
                                <div className="text-xs text-cyber-blue-100">You</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 md:px-6 font-mono">{entry.points}</td>
                        <td className="py-4 px-2 md:px-6 hidden md:table-cell">{entry.completedChallenges.length}</td>
                      </tr>
                    );
                  })}
                  
                  {filteredLeaderboard.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400">
                        No players match your search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;