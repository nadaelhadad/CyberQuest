import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const slides = [
  {
    title: "A Note That Looks… Silly?",
    icon: "🕵️‍♀️",
    lines: [
      "You've found a note that says:",
      "\"Pngf vf sha!\"",
      "",
      "At first glance, it seems like nonsense. But cybersecurity professionals know: anything strange might be a cipher.",
      "It's your job to decrypt this innocent-looking message and reveal the strike details hidden within."
    ]
  },
  {
    title: "What Is a Caesar Cipher?",
    icon: "🔐",
    lines: [
      "The Caesar cipher is one of the oldest known encryption techniques.",
      "It works by shifting each letter in a message by a fixed number of places in the alphabet.",
      "",
      "For example:",
      "• A → D (shift 3)",
      "• B → E",
      "• Z → C (wraps around!)",
      "",
      "It's simple, but when used cleverly — like in this challenge — it can still hide secrets in plain sight."
    ]
  },
  {
    title: "Meet ROT13: A Special Caesar",
    icon: "🔁",
    lines: [
      "ROT13 is a variant of the Caesar cipher that shifts each letter exactly 13 places.",
      "The twist? Doing it twice brings the message back to the original — so ROT13 is its own reverse!",
      "",
      "Why use ROT13?",
      "It's often used in jokes, puzzles, or to obscure spoilers — and in our case: clues to a cyber attack."
    ]
  },
  {
    title: "Try It Yourself in CyberChef",
    icon: "🧰",
    lines: [
      "Head over to CyberChef, one of the most beginner-friendly tools for decoding simple ciphers.",
      "",
      "There, you can:",
      "• Paste the note",
      "• Apply the \"ROT13\" operation",
      "• Instantly reveal the real message",
      "",
      "Keep an eye out — a real CTF flag might appear when you decrypt the second line, too!"
    ]
  },
  {
    title: "Your Objective",
    icon: "🎯",
    lines: [
      "• Decrypt both lines of the note",
      "• Understand how ROT13 works",
      "• Locate the correct flag and enter it in the challenge input",
      "",
      "This is your first step into the world of classic ciphers. Learn it well — many future challenges will build on it."
    ]
  }
];

const CaesarIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [slide, setSlide] = useState(0);
  const [slideJump, setSlideJump] = useState(0);
  const isLast = slide === slides.length - 1;
  const isFirst = slide === 0;
  const { title, icon, lines } = slides[slide];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('slide') === 'last') {
      setSlide(slides.length - 1);
      setSlideJump(j => j + 1);
    }
  }, [location.search]);

  const handleSkipTutorial = () => {
    localStorage.setItem('caesarIntroShown', 'true');
    onComplete();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-cyber-black/95 border-2 border-transparent rounded-2xl p-0 mt-24 shadow-2xl overflow-hidden">
      {/* Back to Story button */}
      <button
        onClick={() => navigate('/challenge/crypto-1?showOpening=true')}
        className="absolute top-4 left-4 z-20 px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-blue-700 hover:from-cyber-blue-600 hover:to-cyber-purple-600 transition-all duration-300 hover:scale-105"
      >
        ← Back to the Story
      </button>

      {/* Skip Tutorial button */}
      <button
        onClick={handleSkipTutorial}
        className="absolute top-4 right-4 z-20 px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-red-700 hover:from-cyber-red-600 hover:to-cyber-pink-600 transition-all duration-300 hover:scale-105"
      >
        Skip Tutorial
      </button>
      
      {/* Neon Gradient Border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0" style={{
        background: 'linear-gradient(120deg, #00f0ff 0%, #a259ff 50%, #ff26a9 100%)',
        filter: 'blur(8px)',
        opacity: 0.25
      }} />
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(90deg,rgba(80,255,255,0.08) 1px,transparent 1px),linear-gradient(180deg,rgba(80,255,255,0.08) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
      <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col items-center min-h-[420px]">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl md:text-5xl drop-shadow-glow">{icon}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-cyber-blue-200 drop-shadow-glow">{title}</h1>
        </div>
        <ul className="mb-8 space-y-4 max-w-2xl text-lg text-cyber-gray-100">
          {lines.map((line, i) => (
            <li key={i} className="leading-relaxed">{line}</li>
          ))}
        </ul>
        <div className="flex justify-between w-full max-w-2xl mt-auto">
          {!isFirst ? (
            <button
              onClick={() => setSlide(slide - 1)}
              className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-blue-700 transition-all duration-300 hover:from-cyber-blue-600 hover:to-cyber-purple-600 hover:scale-105"
            >
              ← Back
            </button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}
          {!isLast ? (
            <button
              onClick={() => setSlide(slide + 1)}
              className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 transition-all duration-300 hover:scale-105"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => {
                // Mark tutorial as completed and call the onComplete callback
                localStorage.setItem('caesarIntroShown', 'true');
                onComplete();
              }}
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-green-500 to-cyber-blue-500 hover:from-cyber-green-400 hover:to-cyber-blue-400 text-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Challenge 🎯
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaesarIntro; 