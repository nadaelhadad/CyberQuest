import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Clock, Smartphone, Send, Lock, Trophy, Sparkles, ArrowLeft, Download, CheckCircle, Star } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import { useGameStore } from '../store/gameStore';

const ForgottenSelfieChallenge = () => {
  const navigate = useNavigate();
  const { categories, submitFlag } = useGameStore();
  const challenge = categories
    .find(cat => cat.id === 'forensics')
    ?.challenges.find(ch => ch.id === 'forensics-1');

  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [hints, setHints] = useState(challenge?.hints || []);

  useEffect(() => {
    if (!success) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [success]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitFlag('forensics-1', flag)) {
      setSuccess(true);
    } else {
      setError('Incorrect flag. Try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleHint = (hintId: string) => {
    setHints(hints.map(hint => 
      hint.id === hintId ? { ...hint, isRevealed: true } : hint
    ));
  };

  const handleImageUpload = () => {
    setImageUploaded(true);
  };

  const handleAnalyze = () => {
    setShowMetadata(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/avatars/converted_selfie.jpg';
    link.download = 'suspicious-selfie.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!challenge) {
    return <div className="text-white p-6">Loading challenge...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white p-6">
      <div className="max-w-7xl mx-auto pt-16">
        <button
          onClick={() => navigate('/map')}
          className="text-cyber-gray-400 hover:text-cyber-blue-400 transition-colors duration-300 mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back to Map</span>
        </button>
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Challenge Description */}
          <div className="col-span-8 bg-cyber-black/50 border border-cyber-blue-500/30 rounded-lg p-4 h-fit">
            <div className="flex justify-end mb-2">
              <div className="text-cyber-gray-400">Time: {formatTime(timer)}</div>
            </div>
            <h1 className="text-2xl font-bold text-cyber-blue-400 mb-2 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              {challenge.title}
            </h1>
            
            <div className="text-cyber-gray-300 mb-4">
              <p className="mb-2">{challenge.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative">
              <Input
                      id="flag"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      placeholder="Enter CTF{Place_HH:MM:SS}"
                      className="bg-cyber-black/50 border-cyber-purple-500/30 text-cyber-purple-200 w-full"
                    />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 left-0 text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-800/40 font-semibold flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Submit Flag
              </Button>
            </form>

            {/* Investigation Tools */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-cyber-blue-400 mb-4">Investigation Tools</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open('https://www.metadata2go.com/', '_blank')}
                  className="w-full bg-gradient-to-r from-teal-800 to-cyan-600 hover:from-teal-700 hover:to-cyan-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-800/40 font-semibold flex items-center gap-2"
                >
                  <span>🔍 Open Metadata Analyzer</span>
                </Button>
                <Button
                  onClick={() => window.open('https://www.gps-coordinates.net/', '_blank')}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-600/40 font-semibold flex items-center gap-2"
                >
                  <span>🛰️ Open GPS Converter</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Image Analysis */}
          <div className="col-span-4 space-y-6">
            {/* Image Upload Card */}
            <div className="bg-cyber-black/50 border border-cyber-blue-500/30 rounded-lg p-6">
              {!imageUploaded ? (
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-cyber-blue-400" />
                  <Button
                    onClick={handleImageUpload}
                    className="w-full bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue-500/20 font-semibold flex items-center justify-center gap-2"
                  >
                    🖼️ Upload Selfie
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-square bg-cyber-gray-800 rounded-lg overflow-hidden">
                    <img
                      src="/avatars/converted_selfie.jpg"
                      alt="Suspicious selfie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!showMetadata && (
                    <Button
                      onClick={handleDownload}
                      className="w-full mt-3 bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 font-semibold flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Selfie
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Hints Panel */}
            <div className="bg-cyber-black/50 border border-cyber-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyber-blue-400 mb-4">Hints</h3>
              <div className="space-y-4">
                {hints.map(hint => (
                  <div key={hint.id} className="space-y-2">
                    <Button
                      onClick={() => handleHint(hint.id)}
                      disabled={hint.isRevealed}
                      className={`w-full ${
                        hint.isRevealed
                          ? 'bg-cyber-gray-800 text-cyber-gray-500'
                          : 'bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-white'
                      } px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold flex items-center justify-between`}
                    >
                      <span>Hint {hint.id.split('-').pop()}</span>
                      {!hint.isRevealed && <span className="text-sm">-{hint.cost} points</span>}
                    </Button>
                    {hint.isRevealed && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-cyber-gray-300 text-sm p-3 bg-cyber-gray-800/50 rounded-lg"
                      >
                        {hint.text}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-cyber-black via-cyber-blue-900 to-cyber-green-900 border-4 border-cyber-green-300 shadow-2xl rounded-2xl p-10 max-w-lg w-full mx-4 relative overflow-hidden"
            >
              {/* Confetti/Particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                style={{ zIndex: 1 }}
              >
                {[...Array(18)].map((_, i) => {
                  const left = Math.random() * 100;
                  const delay = i * 0.13;
                  const duration = 1.7 + Math.random() * 0.8;
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${left}%`,
                        bottom: '-30px',
                      }}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -420, opacity: [1, 1, 0] }}
                      transition={{
                        duration,
                        delay,
                        ease: 'easeOut',
                      }}
                    >
                      <Sparkles size={18} className="text-cyber-green-200 drop-shadow-glow" />
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="relative z-10">
                <motion.div variants={itemVariants}>
                  <div className="relative inline-block">
                    <CheckCircle size={90} className="mx-auto mb-4 text-cyber-green-200 drop-shadow-glow animate-bounce-slow" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <Star size={28} className="text-cyber-yellow" fill="currentColor" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-4xl font-cyber text-cyber-green-100 mb-2 drop-shadow-glow">
                  Challenge Complete!
                </motion.h2>

                <motion.div variants={itemVariants} className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-cyber-yellow text-lg">
                    <Trophy size={24} />
                    <span>+{challenge.points} Points!</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyber-blue-100 text-base">
                    <Clock size={20} />
                    <span>Time: {formatTime(timer)}</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                  <Button
                    onClick={() => navigate('/map')}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg hover:scale-105 hover:shadow-cyber-blue-500/40 transition-all duration-300"
                  >
                    Return to Map
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgottenSelfieChallenge; 