import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Camera, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from './Button';
import MeshBackground from './MeshBackground';

interface ForgottenSelfieIntroProps {
  onComplete: () => void;
}

const ForgottenSelfieIntro: React.FC<ForgottenSelfieIntroProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyber-black text-white flex items-center justify-center p-4">
      <MeshBackground />
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cyber-black/80 border border-cyber-blue-500/30 rounded-lg p-8 shadow-lg shadow-cyber-blue-500/10"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 text-cyber-blue-200"
            >
              <div className="mt-1">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">DIGITAL FORENSICS</h3>
                <p className="text-sm leading-relaxed text-cyber-gray-300">
                  Every night at 02:17, a pirate signal hijacks a TV channel for 61 seconds. The video? Empty streets. The audio? A voice played backward: 'Find me before dawn.'
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 text-cyber-blue-400"
            >
              <div className="mt-1">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-cyber-gray-300">
                  We recovered five clues. Uncover the hijacker's next move—and who they really are.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-4 text-cyber-blue-400"
            >
              <div className="mt-1">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-cyber-gray-300">
                  A selfie from the latest crash says, 'Already left the city.' Prove the speaker never left town.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center items-center gap-4 pt-4"
            >
              <Button
                onClick={() => navigate('/map')}
                className="bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue-500/20 font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Map</span>
              </Button>
              <Button
                onClick={onComplete}
                className="bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue-500/20 font-semibold flex items-center gap-2"
              >
                <span>Start Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgottenSelfieIntro; 