import React, { useState } from 'react';

const slides = [
  {
    title: "Reverse Engineering",
    icon: "🔓",
    lines: [
      "Welcome to the world of reverse engineering.",
      "You'll learn to analyze and decode hidden information.",
      "This challenge focuses on token analysis.",
      "The key is understanding how data is encoded."
    ]
  },
  {
    title: "What is a Token?",
    icon: "🎫",
    lines: [
      "Tokens are pieces of data that contain hidden information.",
      "They often use encoding to disguise their true content.",
      "Common encodings include Base64, Hex, and others.",
      "The challenge is figuring out what encoding was used."
    ]
  },
  {
    title: "Base64 Encoding",
    icon: "📄",
    lines: [
      "Base64 is a common way to encode binary data as text.",
      "It uses 64 characters: A-Z, a-z, 0-9, +, and /",
      "It often ends with = or == for padding.",
      "Many tokens use Base64 to hide their contents."
    ]
  },
  {
    title: "Analyzing the Token",
    icon: "🔍",
    lines: [
      "Look at the token's character set and length.",
      "If it contains only A-Z, a-z, 0-9, +, /, it's likely Base64.",
      "Check if it ends with = or == padding.",
      "Use CyberChef to decode and reveal the hidden content."
    ]
  },
  {
    title: "Your Mission",
    icon: "🎯",
    lines: [
      "Analyze the app.ini file from the memory clinic.",
      "Find the strange token within the configuration.",
      "Decode it to reveal the first shard of the master key.",
      "Submit the flag in the format: CTF{KeyShard_Alpha_XXXX}"
    ]
  },
  {
    title: "Tools You'll Use",
    icon: "🛠️",
    lines: [
      "Token Analyzer: Examine the token structure",
      "Base64 Decoder: Convert encoded data to readable text",
      "Look for patterns that indicate the encoding type",
      "The decoded result will reveal the key shard."
    ]
  },
  {
    title: "Ready to Reverse?",
    icon: "🚀",
    lines: [
      "You have the skills to analyze and decode tokens.",
      "Start by examining the token's characteristics.",
      "Use the right decoding method to reveal the secret.",
      "Good luck, reverse engineer!"
    ]
  }
];

const PlainTokenIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default PlainTokenIntro; 