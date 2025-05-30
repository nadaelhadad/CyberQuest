import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Award, Send, Copy, ChevronDown, ChevronUp, Lightbulb, CheckCircle, Trophy, Star, Lock, Radio, Wifi, Eye, Cpu, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import CyberChef from './CyberChef';
import { Hint } from '../types';

const Dock17Challenge = () => {
  const navigate = useNavigate();
  const { submitFlag, gameProgress, currentChallenge, setCurrentChallenge, useHint } = useGameStore();
  const [flagInput, setFlagInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [hintsExpanded, setHintsExpanded] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [revealedHints, setRevealedHints] = useState(new Set());
  const [transmissionActive, setTransmissionActive] = useState(false);
  const [matrixRain, setMatrixRain] = useState<Array<{
    id: number;
    x: number;
    y: number;
    speed: number;
    char: string;
  }>>([]);
  const [scanlines, setScanlines] = useState(true);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTransmissionActive(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scanlineInterval = setInterval(() => {
      setScanlines(prev => !prev);
    }, 50);
    return () => clearInterval(scanlineInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlagSubmit = () => {
    if (!flagInput.trim()) {
      setSubmissionStatus('error');
      setSubmissionMessage('🚫 TRANSMISSION INCOMPLETE - Enter decoded message');
      return;
    }

    const isCorrect = submitFlag(currentChallenge?.id || '', flagInput.trim());
    if (isCorrect) {
      setSubmissionStatus('success');
      setSubmissionMessage('🎯 MISSION SUCCESS - Enemy plans exposed!');
      setIsTimerRunning(false);
      setShowSuccessModal(true);
    } else {
      setSubmissionStatus('error');
      setSubmissionMessage('⚠ DECRYPTION FAILED - Signal corrupted, try again');
    }

    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }, 4000);
  };

  const handleHintReveal = (hint: Hint) => {
    if (gameProgress.score < hint.cost) {
      setSubmissionStatus('error');
      setSubmissionMessage(`❌ INSUFFICIENT CLEARANCE - Need ${hint.cost} security points`);
      return;
    }

    useHint(hint.id);
    setRevealedHints(prev => new Set([...prev, hint.id]));
    setSubmissionStatus('success');
    setSubmissionMessage(`🔓 CLASSIFIED INTEL ACCESSED - Cost: ${hint.cost} points`);

    setTimeout(() => {
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }, 3000);
  };

  if (!currentChallenge) return null;

  return (
    <div className="min-h-screen bg-cyber-dark bg-cover bg-center pt-20 pb-12 px-4 font-mono" style={{ backgroundImage: "url('/images/bg-circuit-dark.jpg')" }}>
      {/* Matrix rain background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {matrixRain.map(drop => (
          <div
            key={drop.id}
            className="absolute text-green-400 text-xs font-mono pointer-events-none"
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              pointerEvents: 'none',
              animation: `matrix-fall ${3 + Math.random() * 2}s linear infinite`
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      {/* Scanlines effect */}
      {scanlines && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {Array.from({length: 50}).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-cyan-400 pointer-events-none"
              style={{ top: `${i * 2}%` }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <button onClick={() => navigate('/map')} className="flex items-center text-cyber-blue-100 hover:text-cyber-pink-100 mb-4">
            <ArrowLeft size={16} className="mr-2" /> Back to Map
          </button>

          <div className="space-y-6">
            {/* Challenge Info */}
            <div className="bg-gradient-to-br from-gray-900 via-green-900/20 to-black border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={24} className="text-green-400" />
                <h1 className="text-2xl font-bold text-white">{currentChallenge.title}</h1>
              </div>
              <p className="text-gray-300">{currentChallenge.description}</p>
            </div>

            {/* CyberChef Tool */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">CRYPTANALYSIS SUITE</h2>
                <p className="text-gray-400">Advanced decryption tools for signal analysis</p>
              </div>

              <CyberChef />
            </div>

            {/* Flag Submission */}
            <div className="bg-gradient-to-br from-gray-900 via-green-900/20 to-black border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={24} className="text-green-400" />
                <h3 className="text-xl font-bold text-white">MISSION OBJECTIVE: DECODE THE MESSAGE</h3>
              </div>
              
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="Enter the fully decoded message here..."
                className="w-full bg-black/50 text-white p-4 rounded-lg border border-green-500/50 mb-4 font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 backdrop-blur-sm"
              />
              
              <button
                onClick={handleFlagSubmit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all flex items-center gap-2 font-semibold"
              >
                <Send size={16} /> 
                TRANSMIT DECODED MESSAGE
              </button>
            
              {submissionStatus !== 'idle' && (
                <div className={`mt-4 p-4 text-sm rounded-lg font-semibold ${
                  submissionStatus === 'success' 
                    ? 'bg-green-900/50 text-green-300 border border-green-500/50' 
                    : 'bg-red-900/50 text-red-300 border border-red-500/50'
                }`}>
                  {submissionMessage}
                </div>
              )}

              <div className="flex justify-between text-gray-300 text-sm mt-6 pt-4 border-t border-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} /> 
                  <span className="font-mono">{formatTime(timer)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" /> 
                    <span>{currentChallenge.points} pts available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-cyan-400" />
                    <span>Security Level: {gameProgress.score}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hints Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 via-green-900/20 to-black border-2 border-green-500 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">CLASSIFIED INTEL</h3>
              <button
                onClick={() => setHintsExpanded(!hintsExpanded)}
                className="text-green-400 hover:text-green-300"
              >
                {hintsExpanded ? '▼' : '▶'}
              </button>
            </div>

            {hintsExpanded && (
              <div className="space-y-4">
                {currentChallenge.hints.map((hint) => (
                  <div
                    key={hint.id}
                    className={`p-4 rounded-lg border ${
                      revealedHints.has(hint.id)
                        ? 'bg-green-900/20 border-green-500/50'
                        : 'bg-gray-900/50 border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-300">
                        HINT {hint.id.split('-').pop()}
                      </span>
                      <span className="text-sm text-yellow-400">{hint.cost} pts</span>
                    </div>
                    {revealedHints.has(hint.id) ? (
                      <p className="text-gray-300">{hint.text}</p>
                    ) : (
                      <button
                        onClick={() => handleHintReveal(hint)}
                        className="w-full py-2 px-4 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors"
                      >
                        REVEAL HINT
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 via-green-900/20 to-black border-2 border-green-500 rounded-xl p-8 max-w-lg w-full mx-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4">MISSION ACCOMPLISHED</h2>
              <p className="text-gray-300 mb-6">
                You've successfully decoded the enemy transmission and exposed their plans!
              </p>
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg">
                  <p className="text-green-300 font-mono">+{currentChallenge.points} points earned</p>
                </div>
                <button
                  onClick={() => navigate('/map')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all font-semibold"
                >
                  CONTINUE OPERATION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .blink {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Dock17Challenge;