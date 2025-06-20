import React, { useState } from 'react';

const slides = [
  {
    title: "Multi-Layer Cryptography",
    icon: "🧊",
    lines: [
      "Welcome to the most complex cryptography challenge yet.",
      "This message is wrapped in three distinct encryption layers.",
      "Each layer must be decoded in the exact correct order.",
      "The final message contains critical mission coordinates."
    ]
  },
  {
    title: "Layer 1: Base64",
    icon: "📄",
    lines: [
      "The outermost layer is Base64 encoding.",
      "Look for the characteristic = or == padding at the end.",
      "Base64 converts binary data to readable text.",
      "Use CyberChef's 'From Base64' operation to decode."
    ]
  },
  {
    title: "Layer 2: Hexadecimal",
    icon: "🔢",
    lines: [
      "The second layer is hexadecimal encoding.",
      "Hex uses only characters 0-9 and A-F.",
      "Each hex digit represents 4 bits of data.",
      "Use CyberChef's 'From Hex' operation to decode."
    ]
  },
  {
    title: "Layer 3: ROT13",
    icon: "🔄",
    lines: [
      "The innermost layer is ROT13 substitution.",
      "Each letter is shifted 13 positions in the alphabet.",
      "A becomes N, B becomes O, C becomes P, etc.",
      "Numbers and symbols remain unchanged."
    ]
  },
  {
    title: "Decoding Order",
    icon: "📋",
    lines: [
      "1. Start with Base64 decode (outermost layer)",
      "2. Then decode from Hex (middle layer)",
      "3. Finally apply ROT13 (innermost layer)",
      "The result will be: CTF{Strike_02_Subway_21:15}"
    ]
  },
  {
    title: "Your Mission",
    icon: "🎯",
    lines: [
      "Break through all three encryption layers.",
      "Use CyberChef with the exact order: Base64 → Hex → ROT13.",
      "The coordinates reveal the next strike location.",
      "Submit the complete flag to complete the mission."
    ]
  },
  {
    title: "Ready to Decrypt?",
    icon: "🚀",
    lines: [
      "You have the knowledge to tackle this complex encryption.",
      "Remember: Base64 → Hex → ROT13 in that exact order.",
      "Take your time and verify each step.",
      "Good luck, master cryptographer!"
    ]
  }
];

const LayeredCryIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [slide, setSlide] = useState(0);
  const isLast = slide === slides.length - 1;
  const isFirst = slide === 0;
  const { title, icon, lines } = slides[slide];

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-cyber-black/95 border-2 border-transparent rounded-2xl p-0 mt-24 shadow-2xl overflow-hidden">
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
          <button
            onClick={() => setSlide(slide - 1)}
            disabled={isFirst}
            className={`px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-blue-700 transition-all duration-300 ${isFirst ? 'opacity-40 cursor-not-allowed' : 'hover:from-cyber-blue-600 hover:to-cyber-purple-600 hover:scale-105'}`}
          >
            ← Back
          </button>
          {!isLast ? (
            <button
              onClick={() => setSlide(slide + 1)}
              className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 hover:from-cyber-blue-500 hover:to-cyber-purple-500 transition-all duration-300 hover:scale-105"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onComplete}
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

export default LayeredCryIntro; 