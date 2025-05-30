import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, User, LogOut, X, BarChart2, Settings, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hackerName, setHackerName] = useState('');
  const [hackerAge, setHackerAge] = useState(localStorage.getItem('hackerAge') || '');
  const settingsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Initialize hackerName to username for new users
  useEffect(() => {
    if (user?.username) {
      // Clear any existing hacker name for this user
      localStorage.removeItem('hackerName');
      setHackerName(user.username);
      localStorage.setItem('hackerName', user.username);
    }
  }, [user]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
  };

  const handleSave = () => {
    localStorage.setItem('hackerName', hackerName);
    localStorage.setItem('hackerAge', hackerAge);
    window.dispatchEvent(new CustomEvent('hackerNameChanged', { detail: hackerName }));
    window.dispatchEvent(new CustomEvent('hackerAgeChanged', { detail: hackerAge }));
    setIsSettingsOpen(false);
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
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
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const navLinks = [
    { to: '/', label: 'Home', icon: <Shield size={18} /> },
    { to: '/map', label: 'Game Map', icon: <BarChart2 size={18} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <BarChart2 size={18} /> },
  ];
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      className="bg-cyber-black bg-opacity-80 backdrop-blur-md border-b border-cyber-blue-200 py-3 px-4 fixed top-0 left-0 right-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Shield size={24} className="text-cyber-blue-100" />
            <span className="font-cyber text-xl bg-gradient-to-r from-cyber-blue-100 to-cyber-pink-100 text-transparent bg-clip-text">
              CyberQuest
            </span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div key={link.to} variants={itemVariants}>
              <Link 
                to={link.to}
                className={`flex items-center space-x-1 text-sm font-future ${
                  location.pathname === link.to 
                    ? 'text-cyber-blue-100 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <motion.div variants={itemVariants} className="relative" ref={settingsRef}>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                >
                  <Settings size={18} />
                  <span className="text-sm font-future">Settings</span>
                  <ChevronDown size={14} className={`transform transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-cyber-black border border-cyber-blue-200 rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-300">Hacker Name</label>
                          <input
                            type="text"
                            value={hackerName}
                            onChange={(e) => setHackerName(e.target.value)}
                            className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue-200 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
                            placeholder="Enter your hacker name"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-gray-300">Age</label>
                          <input
                            type="number"
                            value={hackerAge}
                            onChange={(e) => setHackerAge(e.target.value)}
                            className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue-200 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue-100"
                            placeholder="Enter your age"
                            min="1"
                            max="100"
                          />
                        </div>

                        <Button
                          onClick={handleSave}
                          variant="primary"
                          size="sm"
                          className="w-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link to="/profile" className="flex flex-col items-end text-gray-300 hover:text-white">
                  <span className="text-sm font-future">{hackerName || user?.username}</span>
                  <span className="text-xs text-cyber-blue-100">@{user?.username}</span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <motion.div variants={itemVariants}>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/register">
                  <Button variant="primary" size="sm" glowing>Register</Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          variants={itemVariants}
        >
          <Menu size={24} />
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 z-50 bg-cyber-black`}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Shield size={24} className="text-cyber-blue-100" />
              <span className="font-cyber text-xl">CyberQuest</span>
            </Link>
            <button 
              className="text-white"
              onClick={toggleMenu}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-3 p-2 rounded ${
                  location.pathname === link.to 
                    ? 'bg-cyber-gray text-cyber-blue-100'
                    : 'text-gray-300'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-cyber-gray">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link to="/profile" className="flex flex-col p-2 text-gray-300">
                  <span className="font-future">{hackerName || user?.username}</span>
                  <span className="text-sm text-cyber-blue-100">@{user?.username}</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" fullWidth>Login</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="primary" glowing fullWidth>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;