import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ChevronRight, Award, Brain, Fingerprint } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  const categoryCards = [
    {
      title: 'Cryptography',
      description: 'Master the art of secure communications and code breaking.',
      icon: <Shield className="w-10 h-10 text-cyber-blue-200" />,
      action: () => navigate('/map?category=crypto'),
    },
    {
      title: 'SQL Injection',
      description: 'Learn to exploit and defend against database vulnerabilities.',
      icon: <Lock className="w-10 h-10 text-cyber-green-200" />,
      action: () => navigate('/map?category=sqli'),
    },
    {
      title: 'Web Exploitation',
      description: 'Uncover and mitigate common web application security issues.',
      icon: <Fingerprint className="w-10 h-10 text-cyber-pink-200" />,
      action: () => navigate('/map?category=webexploit'),
    },
  ];
  
  const features = [
    {
      title: 'Immersive Learning',
      description: 'Engage with realistic scenarios in a cyberpunk-themed world',
      icon: <Brain className="w-8 h-8 text-cyber-pink-100" />,
    },
    {
      title: 'Track Progress',
      description: 'Monitor your skills development with detailed statistics',
      icon: <Award className="w-8 h-8 text-cyber-blue-100" />,
    },
    {
      title: 'Compete & Share',
      description: 'Join the leaderboard and connect with other security enthusiasts',
      icon: <Fingerprint className="w-8 h-8 text-cyber-green-100" />,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="min-h-[80vh] relative flex items-center justify-center px-4 py-16 bg-cyber-black bg-opacity-60 overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue-300/20 to-cyber-pink-300/20"></div>
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-gray/40 via-cyber-dark/60 to-cyber-black"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-cyber font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CyberQuest
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 font-future"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Master cybersecurity skills through immersive, <br />
            game-based challenges in a cyberpunk world
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isAuthenticated ? (
              <Button 
                variant="primary" 
                size="lg" 
                glowing
                onClick={() => navigate('/map')}
                className="group"
              >
                <span className="mr-2">Enter The Grid</span>
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <>
                <Button 
                  variant="primary" 
                  size="lg" 
                  glowing
                  onClick={() => navigate('/register')}
                  className="group"
                >
                  <span className="mr-2">Start Your Journey</span>
                  <ChevronRight className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </>
            )}
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-cyber-gray bg-opacity-30 backdrop-blur-sm border border-cyber-blue-200 border-opacity-30 rounded-lg p-6"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-cyber text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Categories Preview */}
      <motion.section className="py-16 px-4" variants={itemVariants}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-cyber font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100">
              Begin Your Training
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Dive into multiple cybersecurity disciplines through our interactive challenges. 
              Each category tests different skills essential for cyber defense.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoryCards.map((card, index) => (
              <Card 
                key={index}
                variant="primary"
                hoverable
                glowing
                onClick={card.action}
                className="p-6 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-cyber text-center mb-3">{card.title}</h3>
                <p className="text-gray-300 text-sm text-center mb-4">{card.description}</p>
                <div className="mt-auto text-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={card.action}
                    className="group"
                  >
                    <span className="mr-1">Explore</span>
                    <ChevronRight className="transition-transform group-hover:translate-x-1" size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/map')}
              className="group"
            >
              <span className="mr-2">View All Challenges</span>
              <ChevronRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;