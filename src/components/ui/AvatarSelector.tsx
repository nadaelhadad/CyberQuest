import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Shield, Brain, Lock, Code, Database } from 'lucide-react';
import { avatarOptions, AvatarOption, isAvatarUnlocked } from '../../data/avatars';
import Card from './Card';
import { useGameStore } from '../../store/gameStore';

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: AvatarOption) => void;
  currentAvatar?: string;
}

const getCharacterIcon = (id: string) => {
  switch (id) {
    case 'cyber-ninja':
      return <Sparkles className="text-cyber-blue-100" />;
    case 'quantum-mage':
      return <Brain className="text-purple-400" />;
    case 'neural-hunter':
      return <Brain className="text-red-400" />;
    case 'crypto-sage':
      return <Lock className="text-yellow-400" />;
    case 'binary-warrior':
      return <Shield className="text-green-400" />;
    case 'data-druid':
      return <Database className="text-teal-400" />;
    default:
      return <Code className="text-cyber-blue-100" />;
  }
};

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentAvatar
}) => {
  const { calculatedScore } = useGameStore();
  const [avatars, setAvatars] = useState<AvatarOption[]>(avatarOptions);

  // Update avatar unlocking status when score changes
  useEffect(() => {
    const updatedAvatars = avatarOptions.map(avatar => ({
      ...avatar,
      isLocked: !isAvatarUnlocked(avatar, calculatedScore)
    }));
    
    setAvatars(updatedAvatars);
    
    // Update localStorage with new avatar status
    localStorage.setItem('avatarOptions', JSON.stringify(updatedAvatars));
  }, [calculatedScore]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <Card className="p-6" variant="dark">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-cyber font-bold bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
                Choose Your Character
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avatars.map((avatar) => {
                const isUnlocked = isAvatarUnlocked(avatar, calculatedScore);
                const isSelected = currentAvatar === avatar.image;

                return (
                  <motion.div
                    key={avatar.id}
                    whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                    whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
                  >
                    <Card
                      variant={isSelected ? 'secondary' : 'primary'}
                      className={`cursor-pointer overflow-hidden relative ${
                        !isUnlocked ? 'opacity-60' : ''
                      }`}
                      onClick={() => isUnlocked && onSelect(avatar)}
                    >
                      <div className="aspect-square w-full bg-cyber-gray bg-opacity-20 rounded-t-lg overflow-hidden">
                        <img
                          src={avatar.image}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        {getCharacterIcon(avatar.id)}
                      </div>
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-center">
                            <Lock size={32} className="mx-auto mb-2 text-cyber-pink-100" />
                            <p className="text-sm font-cyber">Requires {avatar.requiredPoints} points</p>
                            <p className="text-xs text-gray-400 mt-1">Current: {calculatedScore} points</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-cyber font-bold">{avatar.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-cyber-gray bg-opacity-50">
                            {avatar.gender}
                          </span>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">{avatar.description}</p>

                        <div className="space-y-2">
                          <div>
                            <h4 className="text-xs text-cyber-blue-100 mb-1">Style</h4>
                            <div className="text-xs text-gray-400">
                              <p>Hair: {avatar.style.hair}</p>
                              <p>Clothing: {avatar.style.clothing}</p>
                              {avatar.style.accessories && (
                                <p>Accessories: {avatar.style.accessories.join(', ')}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs text-cyber-blue-100 mb-1">Personality</h4>
                            <div className="flex flex-wrap gap-1">
                              {avatar.personality.map((trait, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-full bg-cyber-gray bg-opacity-30"
                                >
                                  {trait}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AvatarSelector; 