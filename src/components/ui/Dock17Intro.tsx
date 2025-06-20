import React, { useState } from 'react';

const slides = [
  {
    title: "Advanced Cryptography",
    icon: "🔐",
    lines: [
      "Welcome to advanced cryptography techniques.",
      "This challenge involves multiple layers of encryption.",
      "Each layer must be broken in the correct order.",
      "Patience and systematic approach are key to success."
    ]
  },
  {
    title: "Layered Encryption",
    icon: "📦",
    lines: [
      "The message is wrapped in multiple encryption layers.",
      "You must peel away each layer one by one.",
      "The order matters - decode from outside to inside.",
      "Each layer uses a different encryption method."
    ]
  },
  {
    title: "Common Encryption Types",
    icon: "🔍",
    lines: [
      "Base64: Encodes binary data as text (ends with = or ==)",
      "Hex: Converts data to hexadecimal representation",
      "ROT13: Simple letter substitution (A→N, B→O, etc.)",
      "Look for patterns to identify each encryption type."
    ]
  },
  {
    title: "Decoding Strategy",
    icon: "🧩",
    lines: [
      "Start by examining the file format and endings.",
      "Base64 typically ends with = or == padding.",
      "Hex contains only 0-9 and A-F characters.",
      "ROT13 only affects letters, numbers stay the same."
    ]
  },
  {
    title: "Your Mission",
    icon: "🎯",
    lines: [
      "Break through all encryption layers systematically.",
      "Use CyberChef to decode each layer in order.",
      "The final message will contain coordinates and time.",
      "Submit the flag in the format: CTF{Location_HH:MM:SS}"
    ]
  },
  {
    title: "Ready to Decrypt?",
    icon: "🚀",
    lines: [
      "You have the knowledge to tackle layered encryption.",
      "Take it one layer at a time.",
      "Don't rush - methodical approach wins here.",
      "Good luck, cryptographer!"
    ]
  }
];

const Dock17Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default Dock17Intro; 