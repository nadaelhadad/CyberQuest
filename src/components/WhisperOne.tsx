import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Award, Send, Copy, ChevronDown, ChevronUp, Lightbulb, CheckCircle, Trophy, Star, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useGameStore } from '../store/gameStore';
import { Hint } from '../types';

const decryptCaesar = (text: string, shift: number) => {
    return text.replace(/[A-Z]/gi, (char) => {
      const start = char >= 'a' ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - start + (26 - shift % 26)) % 26) + start);
    });
  };

const CaesarChallenge: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const {
    categories,
    currentChallenge,
    setCurrentChallenge,
    submitFlag,
    useHint,
    gameProgress,
  } = useGameStore();

  const [flagInput, setFlagInput] = useState('');
  const [caesarInput, setCaesarInput] = useState('VHQG ORJV WR VHUYHU 17');
  const [caesarShift, setCaesarShift] = useState(0);
  const [decryptedOutput, setDecryptedOutput] = useState('');
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
    if (challengeId) {
      setCurrentChallenge(challengeId);
    }
    setIsTimerRunning(true);
    return () => setIsTimerRunning(false);
  }, [challengeId, setCurrentChallenge]);

  useEffect(() => {
    let intervalId: number;
    if (isTimerRunning) {
      intervalId = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  useEffect(() => {
    setDecryptedOutput(decryptCaesar(caesarInput, caesarShift));
  }, [caesarInput, caesarShift]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlagSubmit = () => {
    if (!flagInput.trim()) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please enter a flag');
      return;
    }

    const isCorrect = submitFlag(currentChallenge?.id || '', flagInput.trim());
    if (isCorrect) {
      setSubmissionStatus('success');
      setSubmissionMessage('✅ Correct! Well done, Agent.');
      setIsTimerRunning(false);
      setShowSuccessModal(true);
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
  const category = categories.find(cat => cat.challenges.some(ch => ch.id === currentChallenge.id));

  return (
    <div className="min-h-screen bg-cyber-dark bg-cover bg-center pt-20 pb-12 px-4 font-mono" style={{ backgroundImage: "url('/images/bg-circuit-dark.jpg')" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <button 
            onClick={() => {
              localStorage.removeItem('caesarIntroShown');
              navigate('/challenge/crypto-1?showIntro=true');
            }} 
            className="flex items-center text-cyber-blue-100 hover:text-cyber-pink-100 mb-4"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Story
          </button>

          <Card className="p-6 bg-cyber-black bg-opacity-80 border border-cyber-blue-200">
            <div className="mb-4">
              <h1 className="text-2xl font-cyber text-cyber-blue-100 mb-2">{currentChallenge.title}</h1>
              <p className="text-white text-sm">{currentChallenge.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-cyber-yellow text-sm font-bold mb-2">Caesar Cipher Tool</h2>
              <Input
                fullWidth
                value={caesarInput}
                onChange={(e) => setCaesarInput(e.target.value)}
                placeholder="Enter encrypted text"
              />
              <div className="flex justify-center gap-6 mt-4">
                <Button size="lg" className="text-lg px-6 py-2" onClick={() => setCaesarShift(prev => prev - 1)}>-1 Shift</Button>
                <Button size="lg" className="text-lg px-6 py-2" onClick={() => setCaesarShift(prev => prev + 1)}>+1 Shift</Button>
              </div>
              <div className="text-center text-white mt-2">Current Shift: {caesarShift}</div>
              {decryptedOutput && (
                <div className="relative mt-4 bg-cyber-gray p-4 rounded border border-cyber-blue-200 text-lime-300 text-center">
                  <button
                    onClick={() => navigator.clipboard.writeText(decryptedOutput)}
                    className="absolute top-2 right-2 text-cyber-blue-100 hover:text-cyber-blue-300"
                    title="Copy"
                  >
                    <Copy size={18} />
                  </button>
                  {decryptedOutput}
                </div>
              )}
            </div>

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
          </Card>
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
                    <li key={hint.id} className="p-3 bg-cyber-dark border border-cyber-blue-200 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-cyber-yellow font-bold">Hint {index + 1}</span>
                        <Badge variant={gameProgress.score >= hint.cost ? "warning" : "danger"}>
                          {hint.cost} pts
                        </Badge>
                      </div>
                      {isRevealed ? (
                        <p className="text-white text-sm">{hint.text}</p>
                      ) : (
                        <div className="space-y-2">
                          {gameProgress.score >= hint.cost ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleHintReveal(hint)}
                              className="w-full"
                            >
                              Reveal Hint
                            </Button>
                          ) : (
                            <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                              <Lock size={14} />
                              <span>Not enough points</span>
                            </div>
                          )}
                        </div>
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
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-cyber-black border-2 border-cyber-green-200 rounded-xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 50% 50%, #00ff00 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 50%, #00ffff 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 50%, #00ff00 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div variants={itemVariants}>
                  <div className="relative inline-block">
                    <CheckCircle size={80} className="mx-auto mb-4 text-cyber-green-200" />
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
                      <Star size={24} className="text-cyber-yellow" fill="currentColor" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-3xl font-cyber text-cyber-green-200 mb-2">
                  Challenge Complete!
                </motion.h2>

                <motion.div variants={itemVariants} className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-cyber-yellow">
                    <Trophy size={20} />
                    <span>+{currentChallenge?.points} Points Earned!</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyber-blue-100">
                    <Clock size={20} />
                    <span>Completion Time: {formatTime(timer)}</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => navigate('/map')}>
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

export default CaesarChallenge;