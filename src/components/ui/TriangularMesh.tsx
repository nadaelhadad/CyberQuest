import React from 'react';
import { motion } from 'framer-motion';

interface TriangularMeshProps {
  className?: string;
  color?: string;
  opacity?: number;
  speed?: number;
}

const TriangularMesh: React.FC<TriangularMeshProps> = ({
  className = '',
  color = 'rgb(59, 130, 246)', // cyber-blue
  opacity = 0.15,
  speed = 20,
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary Triangle Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(60deg, ${color} ${opacity * 100}%, transparent ${opacity * 100}%),
            linear-gradient(-60deg, ${color} ${opacity * 100}%, transparent ${opacity * 100}%)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />

      {/* Secondary Triangle Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(120deg, ${color} ${opacity * 100}%, transparent ${opacity * 100}%),
            linear-gradient(-120deg, ${color} ${opacity * 100}%, transparent ${opacity * 100}%)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '20px 20px'],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />

      {/* Accent Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${color} 1px, transparent 1px),
            linear-gradient(0deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: opacity * 0.5,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '10px 10px'],
        }}
        transition={{
          duration: speed * 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default TriangularMesh; 