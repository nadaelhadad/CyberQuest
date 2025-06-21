import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const slides = [
  {
    title: "Encrypted Repetition: A Pattern Emerges",
    icon: "🪞",
    lines: [
      "Modern encryption is designed to look random—but this file doesn't.",
      "You're facing a 160-byte binary file, but patterns are seeping through. The structure hints at an outdated encryption method known for exposing its secrets: ECB mode.",
      "",
      "This isn't just about decrypting data—it's about recognizing when the encryption itself betrays the message."
    ]
  },
  {
    title: "Understanding ECB (Electronic Codebook) Mode",
    icon: "🔐",
    lines: [
      "In AES-ECB mode, encryption is done block-by-block independently.",
      "If two plaintext blocks are identical, their encrypted versions will also be identical. This makes ECB easy to spot in files with repeating data.",
      "",
      "Unlike CBC or GCM, ECB does not use an initialization vector. That's why:",
      "• Repeated plaintext = repeated ciphertext",
      "• File structure may become visually obvious",
      "",
      "This mode is considered insecure today—precisely the flaw you're about to exploit."
    ]
  },
  {
    title: "Decryption Tools: CyberChef at Your Service",
    icon: "🧰",
    lines: [
      "You'll be using CyberChef to analyze and decode the file. It provides visual tools for working with binary data, encodings, and ciphers.",
      "",
      "For this challenge:",
      "1. Start with \"Detect ECB\" to visually verify block repetition.",
      "2. Use \"AES Decrypt\":",
      "   • Mode: ECB",
      "   • Key: RED_DAWN_SECRET0",
      "   • Key Encoding: UTF-8",
      "   • Input Type: Raw Binary",
      "3. If the decrypted output seems encoded, apply \"From Hex\" to translate it into readable text."
    ]
  },
  {
    title: "Decryption Key",
    icon: "🔑",
    lines: [
      "Your insider retrieved a valid key from the mole's notes:",
      "👉 RED_DAWN_SECRET0",
      "",
      "This key is available in the challenge interface and can be copied easily. Use it exactly as provided."
    ]
  },
  {
    title: "What You're Learning",
    icon: "🧠",
    lines: [
      "This challenge develops your understanding of:",
      "• AES encryption basics and insecure modes",
      "• Pattern analysis in ciphertext",
      "• Using CyberChef to decrypt and decode real-world encryption",
      "• Reading binary files and converting output into flags"
    ]
  },
  {
    title: "Mission Summary",
    icon: "🎯",
    lines: [
      "• Analyze the whisper3.bin file",
      "• Detect block-level repetition via ECB detection",
      "• Decrypt using AES-ECB with the provided key",
      "• If needed, decode hex output to reveal the true message",
      "• Extract the flag from the result (CTF format)"
    ]
  }
];

const MirrorBlockIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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
    localStorage.setItem('mirrorBlockIntroShown', 'true');
    onComplete();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-cyber-black/95 border-2 border-transparent rounded-2xl p-0 mt-24 shadow-2xl overflow-hidden">
      {/* Back to Story button */}
      <button
        onClick={() => navigate('/challenge/crypto-3?showOpening=true')}
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
                localStorage.setItem('mirrorBlockIntroShown', 'true');
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

export default MirrorBlockIntro; 