import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface NeuroLockIntroProps {
  onComplete: () => void;
}

const NeuroLockIntro = ({ onComplete }: NeuroLockIntroProps) => {
  const navigate = useNavigate();
  const [showSkip, setShowSkip] = useState(false);

  // Show skip button after 5 seconds (for dev/testing)
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartMission = () => {
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleBackToMap = () => {
    navigate('/map');
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Primary Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(239,68,68,0.25)_2%,_transparent_3%)] bg-[length:100%_40px] animate-[gridMove_3s_linear_infinite]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,_rgba(239,68,68,0.25)_2%,_transparent_3%)] bg-[length:40px_100%] animate-[gridMove_3s_linear_infinite]" />
      
      {/* Secondary Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(168,85,247,0.2)_1%,_transparent_2%)] bg-[length:100%_80px] animate-[gridMove_2s_linear_infinite]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,_rgba(168,85,247,0.2)_1%,_transparent_2%)] bg-[length:80px_100%] animate-[gridMove_2s_linear_infinite]" />
      
      {/* Glowing Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(236,72,153,0.18)_1%,_transparent_2%)] bg-[length:100%_120px] animate-[gridMove_2s_linear_infinite]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,_rgba(236,72,153,0.18)_1%,_transparent_2%)] bg-[length:120px_100%] animate-[gridMove_2s_linear_infinite]" />
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-transparent" />
      </div>

      {/* Floating symbols */}
      <div className="absolute inset-0 overflow-hidden">
        {['🧠', '🔒', '🔑', '💾'].map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-red-400 mb-8"
          >
            NEUROLOCK PROTOCOL
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed"
          >
            <p className="mb-4">
              Agent. A rogue AI virus known as NeuroLock is targeting memory-backup clinics across the network.
            </p>
            <p className="mb-4">
              No ransom. No warning. Just encryption and deletion.
            </p>
            <p className="mb-4">
              Five layers of defense. Five hidden shards.
            </p>
            <p className="mb-4">
              The first key fragment has been detected.
            </p>
            <p>
              Analyze the code, and stop the digital collapse.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-12">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartMission}
              className="px-8 py-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg
                       shadow-lg shadow-red-500/30 transition-all duration-300
                       hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Start Mission
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToMap}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg
                       shadow-lg shadow-gray-500/30 transition-all duration-300
                       hover:shadow-gray-500/50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Back to Map
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Skip button (only visible after delay) */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={handleSkip}
            className="absolute bottom-4 right-4 text-gray-400 hover:text-white text-sm"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes gridMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 40px 40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NeuroLockIntro; 