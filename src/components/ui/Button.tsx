import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glowing = false,
  children,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'font-cyber rounded transition-all focus:outline-none flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-cyber-blue-200 text-white hover:bg-cyber-blue-300',
    secondary: 'bg-cyber-pink-200 text-white hover:bg-cyber-pink-300',
    danger: 'bg-cyber-red text-white hover:bg-opacity-90',
    success: 'bg-cyber-green-200 text-white hover:bg-cyber-green-300',
    warning: 'bg-cyber-yellow text-black hover:bg-opacity-90',
    outline: 'bg-transparent border-2 border-cyber-blue-100 text-cyber-blue-100 hover:bg-cyber-blue-100 hover:bg-opacity-10',
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6',
  };
  
  const glowEffect = {
    primary: glowing ? 'shadow-neon-blue' : '',
    secondary: glowing ? 'shadow-neon-pink' : '',
    danger: glowing ? 'shadow-neon-orange' : '',
    success: glowing ? 'shadow-neon-green' : '',
    warning: glowing ? 'shadow-neon-yellow' : '',
    outline: glowing ? 'shadow-neon-blue' : '',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowEffect[variant]} ${widthStyle} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;