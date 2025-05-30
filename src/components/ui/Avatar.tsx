import React from 'react';
import { motion } from 'framer-motion';
import { defaultAvatar } from '../../data/avatars';

interface AvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  size = 'md', 
  onClick,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <motion.div 
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <div
        className={`w-full h-full rounded-full overflow-hidden bg-cyber-gray flex items-center justify-center cursor-pointer transition-all duration-200 ${
          onClick ? 'hover:ring-2 hover:ring-cyber-blue-100' : ''
        }`}
        onClick={onClick}
      >
        <img 
          src={src || defaultAvatar.image} 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

export default Avatar; 