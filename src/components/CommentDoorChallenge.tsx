import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Timer, Lightbulb, ChevronUp, ChevronDown, Send, Lock, ArrowLeft, CheckCircle, Star, Trophy, Clock, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Input from './ui/Input';
import MeshBackground from './ui/MeshBackground';
import Badge from './ui/Badge';
import Sparkles from './ui/Sparkles';
import CommentDoorIntro from './ui/CommentDoorIntro';

const CommentDoorChallenge: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [playerScore, setPlayerScore] = useState(100);
  const [flag, setFlag] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [hint1Visible, setHint1Visible] = useState(false);
  const [hint2Visible, setHint2Visible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!showIntro && !success) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showIntro, success]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLaunchWebsite = () => {
    window.open('/comment-door/index.html', '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flag.trim() === '') {
      setError('Please enter a flag');
      return;
    }
    if (flag === 'CTF{COMMENT_DOOR_123}') {
      setSuccess(true);
    } else {
      setError('Invalid flag. Try again!');
    }
  };

  const handleHintReveal = (hintNumber: number, cost: number) => {
    if (playerScore >= cost) {
      setPlayerScore(prev => prev - cost);
      switch (hintNumber) {
        case 1:
          setHint1Visible(true);
          break;
        case 2:
          setHint2Visible(true);
          break;
      }
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <CommentDoorIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white p-6">
      <MeshBackground />
      <div className="container mx-auto max-w-6xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/map" 
                className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-4"
              >
                ← Back to Map
              </Link>

              <div className="bg-cyber-black/80 border border-cyber-purple-500/30 rounded-lg p-8 shadow-lg shadow-cyber-purple-500/10">
                <div className="mb-6">
                  <h1 className="text-2xl font-cyber text-cyber-blue-100 mb-2">🛩️ Comment Door</h1>
                  <p className="text-cyber-purple-200 text-sm leading-relaxed">
                    SkyLine Air looks like a regular airline—until you find its hidden portal GOLD GATE, where stolen passenger data is traded. You must break through 5 flawed layers of web defense before the first illegal flight takes off tomorrow. The homepage might hide a secret path in the comments. View the page source carefully.
                  </p>
                </div>

                <div className="flex justify-center">
                  <a
                    href="/comment-door/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-md text-sky-300 transition underline"
                  >
                    http://localhost:5173/comment-door/index.html
                  </a>
                </div>

                

                {/* Flag Submission */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="flag" className="block text-cyber-yellow text-sm font-bold mb-2">
                      Submit Flag
                    </label>
                    <Input
                      id="flag"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      placeholder="Enter your flag here..."
                      className="bg-cyber-black/50 border-cyber-purple-500/30 text-cyber-purple-200 w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800 text-white w-full py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-700/20 font-semibold flex items-center justify-between"
                  >
                    <span>Submit Flag</span>
                    <Send className="w-4 h-4" />
                  </Button>
                  {submissionStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm font-medium ${
                        submissionStatus === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {submissionMessage}
                    </motion.div>
                  )}
                </form>

                <div className="flex justify-center items-center gap-2 text-cyber-purple-200 text-sm">
                  <Timer className="w-4 h-4" />
                  <span>Time Remaining: {formatTime(30 - timer)}</span>
                  <span className="mx-2">•</span>
                  <span>Points: {playerScore}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Hints */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-cyber-black/80 border border-cyber-purple-500/30 rounded-lg p-6 shadow-lg shadow-cyber-purple-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-cyber-yellow flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Hints
                  </h2>
                  <Badge variant="secondary">
                    {playerScore} pts
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-4 rounded border border-cyber-blue-200/20">
                    {hint1Visible ? (
                      <p className="text-cyber-blue-100 text-sm">Developers leave notes in the shadows.</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(1, 35)}
                        className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                      >
                        <span className="text-sm">Hint 1</span>
                        <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">-35 pts</span>
                      </button>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-4 rounded border border-cyber-blue-200/20">
                    {hint2Visible ? (
                      <p className="text-cyber-blue-100 text-sm">Comments conceal a hidden path.</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(2, 50)}
                        className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                      >
                        <span className="text-sm">Hint 2</span>
                        <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">-50 pts</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
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

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-cyber text-cyber-green-100 mb-2 drop-shadow-glow"
                >
                  Challenge Complete!
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center justify-center gap-2 text-cyber-yellow text-lg">
                    <Trophy size={24} />
                    <span>+50 Points Earned!</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyber-blue-100 text-base">
                    <Clock size={20} />
                    <span>Completion Time: {formatTime(timer)}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={() => navigate('/map')}
                    className="mt-4 px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/20"
                  >
                    Return to Map
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.5));
          }
        `}
      </style>
    </div>
  );
};

export default CommentDoorChallenge;