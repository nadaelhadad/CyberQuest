import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Lightbulb, Send, CheckCircle, Star, Clock, Award, Sparkles, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import Badge from './ui/Badge';
import MeshBackground from './ui/MeshBackground';

const PlainTokenChallenge: React.FC = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [hintsExpanded, setHintsExpanded] = useState(true);
  const [hint1Visible, setHint1Visible] = useState(false);
  const [hint2Visible, setHint2Visible] = useState(false);
  const [hint3Visible, setHint3Visible] = useState(false);
  const [hint1Used, setHint1Used] = useState(false);
  const [hint2Used, setHint2Used] = useState(false);
  const [hint3Used, setHint3Used] = useState(false);
  const [playerScore, setPlayerScore] = useState(100);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedFlag = flag.trim();
    
    if (trimmedFlag === 'CTF{KeyShard_Alpha_7842}') {
      setSubmissionStatus('success');
      setSubmissionMessage('✅ Correct! Well done, Agent.');
      setIsTimerRunning(false);
      setShowSuccess(true);
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

  const handleDownload = () => {
    const pythonCode = `import base64

def confuse():
    t = "==gM0gzNfFGawxWQfRmchh2U5V2S"
    return t[::-1]  

def access():
    scrambled = confuse()
    true = scrambled[::-1] 
    print("Access Granted" if validate(true) else "Denied")

def validate(val):
    decoded = base64.b64decode(val.encode()).decode()
    return "CTF{" in decoded and "Alpha" in decoded`;

    const blob = new Blob([pythonCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app_helper.py';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleHintReveal = (hintNumber: number, cost: number) => {
    if (playerScore < cost) {
      setSubmissionStatus('error');
      setSubmissionMessage(`❌ Not enough points! Need ${cost} points to reveal this hint.`);
      return;
    }

    if (hintNumber === 1) {
      setHint1Visible(true);
      setHint1Used(true);
    } else if (hintNumber === 2) {
      setHint2Visible(true);
      setHint2Used(true);
    } else if (hintNumber === 3) {
      setHint3Visible(true);
      setHint3Used(true);
    }

    setPlayerScore(prev => prev - cost);
    setSubmissionStatus('success');
    setSubmissionMessage(`✅ Hint ${hintNumber} revealed! -${cost} points`);

    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white p-6">
      <MeshBackground />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 max-w-[700px] mx-auto"
          >
            <Link 
              to="/map" 
              className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-4"
            >
              ← Back to Map
            </Link>

            <Card className="bg-cyber-black/80 border-cyber-purple-500/30 p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-cyber-yellow mb-2">🔓 Plain Token</h1>
                  <p className="text-cyber-purple-200 text-sm">
                    NeuroLock ransomware doesn't ask for money. It threatens to erase entire memory-backup clinics unless victims solve riddles. The cure is hidden in the code. Break through all 5 layers. Rebuild the master key. Save the minds. An app.ini file from the first clinic contains a strange token. Could this be the first shard of the master key?
                  </p>
                </div>

                {/* Download Helper Script */}
                <div className="flex justify-end mb-6">
                  <Button
                    onClick={handleDownload}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-700/20 font-semibold w-48 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download app.ini
                  </Button>
                </div>

                {/* CyberChef Tool Section */}
                <div className="mb-6">
                  <h2 className="text-cyber-yellow text-sm font-bold mb-2">Decryption Tools</h2>
                  <div className="space-y-2">
                    <a
                      href="https://gchq.github.io/CyberChef"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 font-semibold"
                    >
                      <Wrench className="w-4 h-4 text-emerald-400" />
                      CyberChef - Advanced Decryption Tool
                    </a>
                  </div>
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
              </div>
            </Card>
          </motion.div>

          {/* Right Panel - Hints */}
          <div className="lg:col-span-4">
            <Card className="p-4 bg-cyber-black border border-cyber-purple-500/30">
              <button
                onClick={() => setHintsExpanded(!hintsExpanded)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-2 rounded hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-cyber-yellow" /> 
                  <span className="text-cyber-blue-100 font-semibold">Hints</span>
                  <Badge variant="secondary" className="ml-2">
                    {playerScore} pts
                  </Badge>
                </span>
                {hintsExpanded ? <ChevronUp size={16} className="text-cyber-blue-100" /> : <ChevronDown size={16} className="text-cyber-blue-100" />}
              </button>
              
              {hintsExpanded && (
                <ul className="mt-3 space-y-2">
                  <li className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-3 rounded border border-cyber-blue-200/20">
                    {hint1Visible ? (
                      <p className="text-cyber-blue-100 text-sm">Tokens cloak secrets in plain sight.</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(1, 25)}
                        className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                      >
                        <span className="text-sm">Hint 1</span>
                        <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">-25 pts</span>
                      </button>
                    )}
                  </li>

                  <li className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-3 rounded border border-cyber-blue-200/20">
                    {hint2Visible ? (
                      <p className="text-cyber-blue-100 text-sm">Base64 veils the shard within.</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(2, 30)}
                        className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                      >
                        <span className="text-sm">Hint 2</span>
                        <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">-30 pts</span>
                      </button>
                    )}
                  </li>

                  <li className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-3 rounded border border-cyber-blue-200/20">
                    {hint3Visible ? (
                      <p className="text-cyber-blue-100 text-sm">Hint: Decoded whispers reveal the key.</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(3, 40)}
                        className="w-full flex items-center justify-between text-cyber-gray-400 hover:text-cyber-blue-100 transition-colors duration-200"
                      >
                        <span className="text-sm">Hint 3</span>
                        <span className="text-xs bg-cyber-blue-200/20 px-2 py-1 rounded">-40 pts</span>
                      </button>
                    )}
                  </li>
                </ul>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
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
                    <Award size={24} />
                    <span>+100 Points!</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-cyber-blue-100 text-base">
                    <Clock size={20} />
                    <span>Time: {formatTime(timer)}</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-green-400 to-cyber-blue-400 text-white px-8 py-3 rounded-lg text-lg font-bold shadow-lg hover:scale-105 hover:shadow-cyber-green-200/40 transition-all duration-300"
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

      <style>
        {`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
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

export default PlainTokenChallenge; 