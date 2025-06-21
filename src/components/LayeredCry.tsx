import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Lightbulb, Send, Copy, ChevronDown, ChevronUp, CheckCircle, Trophy, Star, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import Badge from './ui/Badge';
import MeshBackground from './ui/MeshBackground';
import { Hint } from '../types';

const LayeredCry = () => {
  const navigate = useNavigate();
  const { submitFlag, gameProgress, currentChallenge, setCurrentChallenge, useHint } = useGameStore();
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [hintsExpanded, setHintsExpanded] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  useEffect(() => {
    if (currentChallenge?.id === "crypto-2") {
      setCurrentChallenge("crypto-2");
    }
    setIsTimerRunning(true);
    return () => setIsTimerRunning(false);
  }, [currentChallenge?.id, setCurrentChallenge]);

  useEffect(() => {
    let intervalId: number;
    if (isTimerRunning) {
      intervalId = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlagSubmit = () => {
    if (!flagInput.trim()) {
      setSubmissionStatus('error');
      setSubmissionMessage('❌ Please enter a flag');
      return;
    }

    const isCorrect = submitFlag(currentChallenge?.id || '', flagInput.trim());
    if (isCorrect) {
      setSubmissionStatus('success');
      setSubmissionMessage('✅ Correct! Well done, Agent.');
      setIsTimerRunning(false);
      setShowSuccessModal(true);
      // Play success sound
      const audio = new Audio('/sounds/success.mp3');
      audio.volume = 0.3;
      audio.play();
    } else {
      setSubmissionStatus('error');
      setSubmissionMessage('❌ Incorrect flag. Try again.');
    }

    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }, 3000);
  };

  const handleHintReveal = (hint: Hint) => {
    if (gameProgress.score < hint.cost) {
      setSubmissionStatus('error');
      setSubmissionMessage(`❌ Not enough points! Need ${hint.cost} points to reveal this hint.`);
      return;
    }

    useHint(hint.id);
    setRevealedHints(prev => new Set([...prev, hint.id]));
    setSubmissionStatus('success');
    setSubmissionMessage(`✅ Hint revealed! -${hint.cost} points`);

    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }, 3000);
  };

  if (!currentChallenge) return null;

  return (
    <div className="min-h-screen bg-cyber-dark pt-20 pb-12 px-4">
      {/* Mesh Network Background */}
      <div className="fixed inset-0">
        <MeshBackground />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center min-h-[80vh]">
        <div className="lg:col-span-9 lg:col-start-2 xl:col-span-9 xl:col-start-2 flex flex-col justify-center">
          <button onClick={() => navigate('/map')} className="flex items-center text-cyber-blue-100 hover:text-cyber-pink-100 mb-4">
            <ArrowLeft size={16} className="mr-2" /> Back to Map
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 md:p-16 xl:p-20 bg-cyber-black bg-opacity-80 border border-cyber-blue-200 text-lg xl:text-xl min-h-[500px] flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-2xl font-cyber text-cyber-blue-100 mb-2">🧊 Layered Cry – Silver</h1>
                <div className="flex items-center gap-4">
                  <p className="text-white text-lg flex-1">Next message is wrapped three times. Strip every layer to find strike two.</p>
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/assets/challenges/whisper2.txt';
                      link.download = 'whisper2.txt';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 font-semibold whitespace-nowrap"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </div>

              {/* Tool Hints Section */}
              <div className="mb-6">
                <h2 className="text-cyber-yellow text-sm font-bold mb-2">Decryption Tools</h2>
                <div className="space-y-2">
                  <a
                    href="https://gchq.github.io/CyberChef"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 font-semibold"
                  >
                    <span className="text-xl">🧪</span>
                    CyberChef - Advanced Decryption Tool
                  </a>
                </div>
              </div>
              
              {/* Flag Submission */}
              <div className="mb-4">
                <Input
                  fullWidth
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Enter your flag here"
                />
                <Button 
                  onClick={handleFlagSubmit}
                  variant="primary" 
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 font-semibold"
                >
                  <Send size={16} className="mr-2" /> Submit
                </Button>
                {submissionStatus !== 'idle' && (
                  <div className={`mt-3 p-2 text-sm rounded ${
                    submissionStatus === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {submissionMessage}
                  </div>
                )}
              </div>

              <div className="flex justify-between text-white text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {formatTime(timer)}
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} /> {currentChallenge.points} pts | Player: {gameProgress.score} pts
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-2 lg:col-start-11 flex flex-col justify-center">
          <Card className="p-4 bg-cyber-black border border-cyber-blue-100 backdrop-blur-sm bg-opacity-90">
            <button
              onClick={() => setHintsExpanded(!hintsExpanded)}
              className="w-full flex items-center justify-between bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-2 rounded hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Lightbulb size={16} className="text-cyber-yellow" /> 
                <span className="text-cyber-blue-100 font-semibold">Hints</span>
                <Badge variant="secondary" className="ml-2">
                  {gameProgress.score} pts
                </Badge>
              </span>
              {hintsExpanded ? <ChevronUp size={16} className="text-cyber-blue-100" /> : <ChevronDown size={16} className="text-cyber-blue-100" />}
            </button>
            {hintsExpanded && (
              <ul className="mt-3 space-y-2">
                {currentChallenge.hints.map((hint, index) => {
                  const isRevealed = hint.isRevealed || revealedHints.has(hint.id);
                  return (
                    <li key={hint.id} className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-3 rounded border border-cyber-blue-200/20">
                      {isRevealed ? (
                        <p className="text-cyber-blue-100 text-sm">{hint.text}</p>
                      ) : (
                        <button
                          onClick={() => handleHintReveal(hint)}
                          className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                        >
                          <span className="text-sm">Hint {index + 1}</span>
                          <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">{hint.cost} pts</span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
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

              <div className="relative z-10 text-center">
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
                  Level Complete!
                </motion.h2>

                <motion.div variants={itemVariants} className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-cyber-yellow text-lg">
                    <Trophy size={24} />
                    <span>+{currentChallenge?.points} Points!</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyber-blue-100 text-base">
                    <Clock size={20} />
                    <span>Time: {formatTime(timer)}</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                  <Button
                    variant="primary"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-green-400 to-cyber-blue-400 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg hover:scale-105 hover:shadow-cyber-green-200/40 transition-all duration-300"
                    onClick={() => navigate('/challenge/crypto-3')}
                  >
                    Next Challenge <ArrowRight size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-cyber-blue-200 text-cyber-blue-100 px-8 py-3 rounded-lg text-lg font-bold hover:bg-cyber-blue-900/30 hover:scale-105 transition-all duration-300"
                    onClick={() => navigate('/map')}
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

export default LayeredCry;