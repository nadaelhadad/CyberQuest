import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Key, UserPlus, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ username: '', password: '' });
    
    // Validate
    let valid = true;
    if (!username) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
      valid = false;
    }
    
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      valid = false;
    }
    
    if (!valid) return;
    
    // Attempt login
    await login(username, password);
    
    // If successful, navigate to map
    if (!error) {
      navigate('/map');
    }
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

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-16 flex items-center justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md p-8" variant="primary">
        <motion.div variants={itemVariants} className="mb-4 text-center">
          <div className="flex justify-center mb-3">
            <Shield size={40} className="text-cyber-blue-100" />
          </div>
          <h1 className="text-2xl font-cyber mb-1">Login to CyberQuest</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
        </motion.div>
        
        {error && (
          <motion.div
            variants={itemVariants}
            className="bg-cyber-red bg-opacity-20 border border-cyber-red rounded-md p-3 mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <motion.form onSubmit={handleSubmit} variants={itemVariants}>
          <div className="space-y-4 mb-6">
            <div>
              <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                fullWidth
                className="px-4 py-3"
                prefix={<User size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
                className="px-4 py-3"
                prefix={<Key size={18} className="text-gray-400" />}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            glowing
            fullWidth
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center text-sm text-gray-400">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-cyber-blue-100 hover:underline">
                Register here
              </Link>
            </p>
            <Link to="/" className="text-cyber-blue-100 hover:underline inline-flex items-center mt-4">
              <ArrowLeft size={14} className="mr-1" />
              Back to home
            </Link>
          </div>
        </motion.form>
      </Card>
    </motion.div>
  );
};

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' });
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ username: '', password: '', confirmPassword: '' });
    
    // Validate
    let valid = true;
    if (!username) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
      valid = false;
    } else if (username.length < 4) {
      setErrors(prev => ({ ...prev, username: 'Username must be at least 4 characters' }));
      valid = false;
    }
    
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      valid = false;
    } else if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      valid = false;
    }
    
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      valid = false;
    }
    
    if (!valid) return;
    
    // Attempt registration
    await register(username, password);
    
    // If successful, navigate to map
    if (!error) {
      navigate('/map');
    }
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

  return (
    <motion.div
      className="min-h-screen bg-cyber-dark pt-16 flex items-center justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md p-8" variant="secondary">
        <motion.div variants={itemVariants} className="mb-4 text-center">
          <div className="flex justify-center mb-3">
            <UserPlus size={40} className="text-cyber-pink-100" />
          </div>
          <h1 className="text-2xl font-cyber mb-1">Join CyberQuest</h1>
          <p className="text-gray-400 text-sm">Create your account to start the adventure</p>
        </motion.div>
        
        {error && (
          <motion.div
            variants={itemVariants}
            className="bg-cyber-red bg-opacity-20 border border-cyber-red rounded-md p-3 mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <motion.form onSubmit={handleSubmit} variants={itemVariants}>
          <div className="space-y-4 mb-6">
            <div>
              <Input
                type="text"
                label="Username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                fullWidth
                className="px-4 py-3"
                prefix={<User size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                type="password"
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
                className="px-4 py-3"
                prefix={<Key size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                fullWidth
                className="px-4 py-3"
                prefix={<Key size={18} className="text-gray-400" />}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            glowing
            fullWidth
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="text-center text-sm text-gray-400">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-cyber-pink-100 hover:underline">
                Login here
              </Link>
            </p>
            <Link to="/" className="text-cyber-pink-100 hover:underline inline-flex items-center mt-4">
              <ArrowLeft size={14} className="mr-1" />
              Back to home
            </Link>
          </div>
        </motion.form>
      </Card>
    </motion.div>
  );
};