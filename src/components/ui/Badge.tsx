import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  glowing = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-cyber rounded';
  
  const variantStyles = {
    primary: 'bg-cyber-blue-300 text-white',
    secondary: 'bg-cyber-pink-200 text-white',
    success: 'bg-cyber-green-200 text-white',
    warning: 'bg-cyber-yellow text-black',
    danger: 'bg-cyber-red text-white',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };
  
  const glowEffect = {
    primary: glowing ? 'shadow-neon-blue' : '',
    secondary: glowing ? 'shadow-neon-pink' : '',
    success: glowing ? 'shadow-neon-green' : '',
    warning: glowing ? 'shadow-neon-yellow' : '',
    danger: glowing ? 'shadow-neon-orange' : '',
  };

  const badgeVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.3,
        repeat: glowing ? Infinity : 0,
        repeatType: 'reverse' as const,
        repeatDelay: 1
      } 
    }
  };

  return (
    <motion.span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowEffect[variant]} ${className}`}
      variants={badgeVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.span>
  );
};

export default Badge;