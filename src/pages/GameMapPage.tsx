import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Lock, Database, Code, Globe, ChevronRight, Award, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';

const icons = {
  'Shield': Shield,
  'Terminal': Lock,
  'Database': Database,
  'Code': Code,
  'Globe': Globe,
};

const GameMapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { categories, gameProgress, setCurrentCategory, setCurrentChallenge } = useGameStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
  }, [searchParams]);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentCategory(categoryId);
  };
  
  const handleChallengeSelect = (challengeId: string) => {
    setCurrentChallenge(challengeId);
    navigate(`/challenge/${challengeId}`);
  };
  
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  
  // Check if user is authenticated before entering a challenge
  const handleChallengeClick = (challengeId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    handleChallengeSelect(challengeId);
  };
  
  // Get the right icon component
  const getCategoryIcon = (iconName: string) => {
    const IconComponent = icons[iconName as keyof typeof icons] || Shield;
    return <IconComponent />;
  };
  
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
  
  const nodeVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
    locked: { filter: 'grayscale(100%)', opacity: 0.7 },
  };
  
  // Line connecting nodes
  const LineConnector = ({ completed = false }) => (
    <div className={`h-0.5 w-12 ${completed ? 'bg-cyber-green-200' : 'bg-gray-600'}`}></div>
  );

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1
            className="text-3xl md:text-4xl font-cyber font-bold mb-4 bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            CyberQuest Map
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Navigate through various cybersecurity challenges. 
            Complete each level to unlock new skills and advance your journey.
          </motion.p>
        </div>
        
        {/* Categories Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {categories.map((category) => {
              const isLocked = category.isLocked && !gameProgress.unlockedCategories.includes(category.id);
              const isSelected = selectedCategory === category.id;
              const IconComponent = icons[category.icon as keyof typeof icons] || Shield;
              
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isLocked && handleCategorySelect(category.id)}
                >
                  <Card
                    variant={isSelected ? 'secondary' : 'primary'}
                    glowing={isSelected}
                    className={`w-36 md:w-48 p-4 text-center transition-all duration-300 ${
                      isSelected ? 'border-cyber-pink-200' : ''
                    }`}
                  >
                    <div className={`flex justify-center mb-3 text-${category.color}-200`}>
                      <IconComponent size={28} />
                    </div>
                    <h3 className="font-cyber text-sm md:text-base truncate">{category.name}</h3>
                    
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-cyber-black bg-opacity-70 rounded-lg">
                        <Lock className="text-gray-400" size={24} />
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Challenge Map Section */}
        {selectedCategoryData && (
          <motion.div
            className="bg-cyber-black rounded-xl p-6 border border-gray-800 md:p-8 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className={`mr-3 text-${selectedCategoryData.color}-200`}>
                  {getCategoryIcon(selectedCategoryData.icon)}
                </div>
                <div>
                  <h2 className="text-xl font-cyber text-white">{selectedCategoryData.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedCategoryData.description}</p>
                </div>
              </div>
              
              {/* Challenge Nodes */}
              <div className="py-6 px-4 overflow-x-auto">
                <div className="flex flex-col space-y-12 min-w-[700px]">
                  {/* First row of challenges */}
                  <div className="flex items-center justify-between">
                    {selectedCategoryData.challenges.slice(0, 3).map((challenge, index) => {
                      const isLocked = challenge.isLocked && !gameProgress.unlockedChallenges.includes(challenge.id);
                      const isCompleted = gameProgress.completedChallenges.includes(challenge.id);
                      
                      return (
                        <React.Fragment key={challenge.id}>
                          <motion.div
                            variants={nodeVariants}
                            initial="initial"
                            animate={isLocked ? "locked" : "animate"}
                            whileHover={!isLocked ? "hover" : undefined}
                            whileTap={!isLocked ? "tap" : undefined}
                            className="relative"
                            onClick={() => !isLocked && handleChallengeClick(challenge.id)}
                          >
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer ${
                              isCompleted 
                                ? 'bg-cyber-green-300 bg-opacity-20 border-2 border-cyber-green-200' 
                                : isLocked 
                                  ? 'bg-gray-800 border-2 border-gray-700'
                                  : 'bg-cyber-blue-300 bg-opacity-20 border-2 border-cyber-blue-200'
                            }`}>
                              <div className="text-center">
                                <div className="font-cyber text-2xl mb-1">
                                  {challenge.difficulty}
                                </div>
                                <div className="text-xs font-semibold">
                                  {isCompleted ? 'COMPLETED' : isLocked ? 'LOCKED' : 'AVAILABLE'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center">
                              <div className="font-cyber text-sm">{challenge.title}</div>
                              <div className="text-xs text-gray-400">{challenge.points} pts</div>
                            </div>
                            
                            {isLocked && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Lock className="text-gray-400" size={24} />
                              </div>
                            )}
                            
                            {isCompleted && (
                              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                                <Badge variant="success" glowing>
                                  <Award size={14} className="mr-1" />
                                  <span>Completed</span>
                                </Badge>
                              </div>
                            )}
                          </motion.div>
                          
                          {index < 2 && (
                            <LineConnector completed={isCompleted && gameProgress.completedChallenges.includes(selectedCategoryData.challenges[index + 1].id)} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  
                  {/* Second row of challenges */}
                  <div className="flex items-center justify-around ml-16 mr-16">
                    {selectedCategoryData.challenges.slice(3, 5).map((challenge, index) => {
                      const isLocked = challenge.isLocked && !gameProgress.unlockedChallenges.includes(challenge.id);
                      const isCompleted = gameProgress.completedChallenges.includes(challenge.id);
                      
                      return (
                        <React.Fragment key={challenge.id}>
                          <motion.div
                            variants={nodeVariants}
                            initial="initial"
                            animate={isLocked ? "locked" : "animate"}
                            whileHover={!isLocked ? "hover" : undefined}
                            whileTap={!isLocked ? "tap" : undefined}
                            className="relative"
                            onClick={() => !isLocked && handleChallengeClick(challenge.id)}
                          >
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer ${
                              isCompleted 
                                ? 'bg-cyber-green-300 bg-opacity-20 border-2 border-cyber-green-200' 
                                : isLocked 
                                  ? 'bg-gray-800 border-2 border-gray-700'
                                  : 'bg-cyber-blue-300 bg-opacity-20 border-2 border-cyber-blue-200'
                            }`}>
                              <div className="text-center">
                                <div className="font-cyber text-2xl mb-1">
                                  {challenge.difficulty}
                                </div>
                                <div className="text-xs font-semibold">
                                  {isCompleted ? 'COMPLETED' : isLocked ? 'LOCKED' : 'AVAILABLE'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center">
                              <div className="font-cyber text-sm">{challenge.title}</div>
                              <div className="text-xs text-gray-400">{challenge.points} pts</div>
                            </div>
                            
                            {isLocked && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Lock className="text-gray-400" size={24} />
                              </div>
                            )}
                            
                            {isCompleted && (
                              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                                <Badge variant="success" glowing>
                                  <Award size={14} className="mr-1" />
                                  <span>Completed</span>
                                </Badge>
                              </div>
                            )}
                          </motion.div>
                          
                          {index === 0 && (
                            <LineConnector completed={isCompleted && gameProgress.completedChallenges.includes(selectedCategoryData.challenges[4].id)} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-cyber-blue-200 mr-2"></div>
                    <span className="text-xs text-gray-400">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-cyber-green-200 mr-2"></div>
                    <span className="text-xs text-gray-400">Completed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-700 mr-2"></div>
                    <span className="text-xs text-gray-400">Locked</span>
                  </div>
                </div>
                
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => navigate('/leaderboard')}
                  >
                    <Award size={14} className="mr-1" />
                    <span>Leaderboard</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {!selectedCategoryData && (
          <motion.div
            className="bg-cyber-black rounded-xl p-8 border border-gray-800 text-center"
            variants={itemVariants}
          >
            <Info size={40} className="mx-auto mb-4 text-cyber-blue-100" />
            <h3 className="text-xl font-cyber mb-2">Select a Category</h3>
            <p className="text-gray-400 mb-6">Choose a category from above to view its challenges.</p>
            <Button 
              variant="primary" 
              onClick={() => handleCategorySelect('crypto')} // Default to crypto as it's unlocked
              className="mx-auto"
            >
              Start with Cryptography <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GameMapPage;