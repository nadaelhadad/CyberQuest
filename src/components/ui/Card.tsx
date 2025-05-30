import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  hoverable?: boolean;
  variant?: 'primary' | 'secondary' | 'dark' | 'light';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowing = false,
  hoverable = false,
  variant = 'primary',
  onClick,
}) => {
  const baseStyles = 'rounded-lg overflow-hidden relative backdrop-blur-sm bg-opacity-20';
  
  const variantStyles = {
    primary: 'bg-cyber-gray border-cyber-blue-200 text-white',
    secondary: 'bg-cyber-gray border-cyber-pink-200 text-white',
    dark: 'bg-cyber-black border-cyber-gray text-white',
    light: 'bg-white bg-opacity-10 border-white border-opacity-20 text-white',
  };
  
  const glowEffect = {
    primary: glowing ? 'shadow-neon-blue border' : 'border',
    secondary: glowing ? 'shadow-neon-pink border' : 'border',
    dark: glowing ? 'shadow-md border' : 'border',
    light: glowing ? 'shadow-md border' : 'border',
  };
  
  const hoverEffect = hoverable ? 'cursor-pointer transition-all duration-300' : '';
  
  const cardVariants = {
    initial: { scale: 1 },
    hover: hoverable ? { scale: 1.02, boxShadow: '0 0 15px rgba(0, 200, 255, 0.5)' } : {},
    tap: hoverable ? { scale: 0.98 } : {},
  };

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${glowEffect[variant]} ${hoverEffect} ${className}`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;