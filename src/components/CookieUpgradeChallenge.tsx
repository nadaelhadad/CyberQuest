import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, Send, Cookie, CheckCircle, Star, Trophy, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';
import MeshBackground from './ui/MeshBackground';
import Terminal from './ui/Terminal';
import { categories } from '../data/categories';
import Card from './ui/Card';

const CookieUpgradeChallenge: React.FC = () => {
  const navigate = useNavigate();
  const { submitFlag, gameProgress, currentChallenge, setCurrentChallenge, useHint } = useGameStore();
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [seatClass, setSeatClass] = useState('economy');

  useEffect(() => {
    if (currentChallenge?.id !== 'web-2') {
      setCurrentChallenge('web-2');
    }
    // Read seatClass from cookie
    const match = document.cookie.match(/seatClass=([^;]+)/);
    setSeatClass(match ? match[1] : '');
  }, [currentChallenge?.id, setCurrentChallenge]);

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
      setShowSuccessModal(true);
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

  const handleHintReveal = (hint: any) => {
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

  // Get the challenge description from categories
  const webCategory = categories.find(cat => cat.id === 'web');
  const cookieUpgrade = webCategory?.challenges.find(ch => ch.id === 'web-2');
  const storyText = cookieUpgrade?.description || '';

  // Animation variants for modal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

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
            <Card className="p-6 bg-cyber-black bg-opacity-80 border border-cyber-blue-200">
              <div className="mb-6">
                <h1 className="text-2xl font-cyber text-cyber-yellow mb-2">🍪 Cookie Upgrade</h1>
                <p className="text-white text-sm mb-2">{storyText}</p>
                
              </div>
              <div className="mb-6 flex flex-col gap-4">
                <a
                  href="/gold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded font-cyber text-cyber-blue-200 underline bg-transparent border-none shadow-none hover:text-cyber-blue-300 transition text-center"
                  style={{ boxShadow: 'none', border: 'none', background: 'transparent' }}
                >
                   Try Accessing /gold
                </a>
                <a
                  href="https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pink-button px-4 py-2 rounded font-cyber bg-cyber-pink-200 text-white hover:bg-cyber-pink-300 transition shadow text-center"
                >
                  🍪 Open Cookie Editor
                </a>
                <a
                  href="https://gchq.github.io/CyberChef/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="orange-button px-4 py-2 rounded font-cyber bg-orange-600 text-white hover:bg-orange-300 transition shadow text-center"
                >
                  🧑‍🍳 Open CyberChef
                </a>
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <Input
                  fullWidth
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Enter your flag here"
                />
                <Button
                  onClick={handleFlagSubmit}
                  className="bg-purple-900 text-white hover:bg-purple-800 transition font-cyber flex items-center gap-2 self-start"
                >
                  <Send size={16} className="mr-2" /> Submit
                </Button>
              </div>
              {submissionStatus !== 'idle' && (
                <div className={`mt-3 p-2 text-sm rounded ${
                  submissionStatus === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                }`}>
                  {submissionMessage}
                </div>
              )}
            </Card>
          </div>
          {/* Hints Panel */}
          <div className="w-full md:w-80 bg-cyber-black/0 border border-cyber-yellow-900 rounded-xl shadow-lg px-3 py-2 mt-4 md:mt-0" style={{ height: 'auto', minHeight: 0, alignSelf: 'flex-start' }}>
            <h2 className="text-lg font-cyber text-cyber-pink-200 mb-2 flex items-center gap-2"><Lightbulb size={18} className="text-cyber-pink-200"/> Hints</h2>
            <div className="space-y-4">
              {currentChallenge.hints.map((hint) => (
                <div
                  key={hint.id}
                  className={`px-3 py-4 rounded-lg border ${
                    revealedHints.has(hint.id)
                      ? 'bg-cyber-yellow/10 border-cyber-yellow-200'
                      : 'bg-cyber-black/50 border-cyber-yellow-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb size={16} className="text-cyber-yellow" />
                      <span className="text-sm text-cyber-yellow">
                        {revealedHints.has(hint.id) ? hint.text : 'Hidden Hint'}
                      </span>
                    </div>
                    {!revealedHints.has(hint.id) && (
                      <Button size="sm" variant="outline" onClick={() => handleHintReveal(hint)}>
                        Reveal ({hint.cost} pts)
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
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
                      style={{ left: `${left}%`, bottom: '-30px' }}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -420, opacity: [1, 1, 0] }}
                      transition={{ duration, delay, ease: 'easeOut' }}
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
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
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
                    <span>+{currentChallenge?.points} Points!</span>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 border-cyber-blue-200 text-cyber-blue-100 px-8 py-3 rounded-lg text-lg font-bold hover:bg-cyber-blue-900/30 hover:scale-105 transition-all duration-300"
                    onClick={() => { setShowSuccessModal(false); navigate('/map'); }}
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

export default CookieUpgradeChallenge; 