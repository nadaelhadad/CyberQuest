import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-cyber-black bg-opacity-90 backdrop-blur-md border-t border-cyber-blue-300 text-white py-6"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield size={20} className="text-cyber-blue-100" />
              <h3 className="font-cyber text-lg">CyberQuest</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Learn cybersecurity through gamified challenges in a cyberpunk world
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-4 border-t border-cyber-gray text-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} CyberQuest. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;