import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Lightbulb, Send, Copy, ChevronDown, ChevronUp, CheckCircle, Trophy, Star, Clock, Award, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import Badge from './ui/Badge';
import MeshBackground from './ui/MeshBackground';
import { Hint } from '../types';

const LayeredCryChallenge: React.FC = () => {
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
  const [currentLayer, setCurrentLayer] = useState(1);

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
    if (currentChallenge?.id === "crypto-3") {
      setCurrentChallenge("crypto-3");
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

    // Only allow revealing hints in order
    const hintLayer = parseInt(hint.id.replace('layer', ''));
    if (hintLayer !== currentLayer) {
      setSubmissionStatus('error');
      setSubmissionMessage(`❌ Complete layer ${currentLayer} first!`);
      return;
    }

    useHint(hint.id);
    setRevealedHints(prev => new Set([...prev, hint.id]));
    setCurrentLayer(prev => prev + 1);
    setSubmissionStatus('success');
    setSubmissionMessage(`✅ Layer ${hintLayer} hint revealed! -${hint.cost} points`);

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
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <button onClick={() => navigate('/map')} className="flex items-center text-cyber-blue-100 hover:text-cyber-pink-100 mb-4">
              <ArrowLeft size={16} className="mr-2" /> Back to Map
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-cyber-black bg-opacity-80 border border-cyber-blue-200">
                <div className="mb-6">
                  <h1 className="text-2xl font-cyber text-cyber-blue-100 mb-2">🧊 Layered Cry – Silver</h1>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm">{currentChallenge.description}</p>
                    <div className="flex items-center gap-2 text-cyber-yellow">
                      <Layers size={16} />
                      <span>Layer {currentLayer}/3</span>
                    </div>
                  </div>
                </div>

                {/* Download Section */}
                <div className="mb-6">
                  <Button
                    onClick={() => window.open('/assets/challenges/whisper2.txt', '_blank')}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Encrypted Message
                  </Button>
                </div>

                {/* Tool Hints Section */}
                <div className="mb-6">
                  <h2 className="text-cyber-yellow text-sm font-bold mb-2">Decryption Tools</h2>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://gchq.github.io/CyberChef/#recipe=From_Base64()"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-blue-100 hover:text-cyber-pink-100 flex items-center gap-2"
                      >
                        <span>•</span> From Base64
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://gchq.github.io/CyberChef/#recipe=From_Hex()"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-blue-100 hover:text-cyber-pink-100 flex items-center gap-2"
                      >
                        <span>•</span> From Hex
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://gchq.github.io/CyberChef/#recipe=ROT13()"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-blue-100 hover:text-cyber-pink-100 flex items-center gap-2"
                      >
                        <span>•</span> ROT13
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Flag Submission */}
                <div className="mb-4">
                  <Input
                    fullWidth
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Enter your flag here"
                  />
                  <Button onClick={handleFlagSubmit} variant="primary" className="mt-2">
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

                {/* Hints Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-cyber-yellow text-sm font-bold">Layer Hints</h2>
                    <button
                      onClick={() => setHintsExpanded(!hintsExpanded)}
                      className="text-cyber-blue-100 hover:text-cyber-pink-100"
                    >
                      {hintsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {hintsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          {currentChallenge.hints.map((hint) => (
                            <div
                              key={hint.id}
                              className={`p-3 rounded-lg border ${
                                revealedHints.has(hint.id)
                                  ? 'bg-cyber-blue-900/30 border-cyber-blue-200'
                                  : 'bg-cyber-black/50 border-cyber-blue-900'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Lightbulb size={16} className="text-cyber-yellow" />
                                  <span className="text-sm text-cyber-blue-100">
                                    {revealedHints.has(hint.id) ? hint.text : 'Hidden Hint'}
                                  </span>
                                </div>
                                {!revealedHints.has(hint.id) && (
                                  <button
                                    onClick={() => handleHintReveal(hint)}
                                    className="hover:opacity-80 transition-opacity"
                                  >
                                    <Badge className="bg-cyber-blue-900 hover:bg-cyber-blue-800">
                                      Reveal ({hint.cost} pts)
                                    </Badge>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>

          <div>
            <Card className="p-4 bg-cyber-black border border-cyber-blue-100">
              <button
                onClick={() => setHintsExpanded(!hintsExpanded)}
                className="w-full flex items-center justify-between bg-cyber-gray p-2 rounded"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb size={16} /> 
                  Hints
                  <Badge variant="secondary" className="ml-2">
                    {gameProgress.score} pts
                  </Badge>
                </span>
                {hintsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {hintsExpanded && (
                <ul className="mt-3 space-y-3">
                  {currentChallenge.hints.map((hint, index) => {
                    const isRevealed = hint.isRevealed || revealedHints.has(hint.id);
                    return (
                      <li key={hint.id} className="bg-cyber-gray/50 p-3 rounded">
                        {isRevealed ? (
                          <p className="text-cyber-blue-100">{hint.text}</p>
                        ) : (
                          <button
                            onClick={() => handleHintReveal(hint)}
                            className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100"
                          >
                            <span>Hint {index + 1}</span>
                            <span className="text-xs">{hint.cost} pts</span>
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
                    onClick={() => navigate('/challenge/crypto-4')}
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

export default LayeredCryChallenge; 