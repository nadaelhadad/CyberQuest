import React, { useState } from 'react';

const slides = [
  {
    title: "What is a Caesar Cipher?",
    icon: "🔐",
    lines: [
      "A Caesar cipher is one of the oldest encryption methods.",
      "It shifts each letter in the alphabet by a fixed number of positions.",
      "Julius Caesar used this to send secret messages to his generals.",
      "Today, it's a great way to learn basic cryptography concepts."
    ]
  },
  {
    title: "How Does It Work?",
    icon: "🔄",
    lines: [
      "Each letter is replaced by a letter a certain number of positions down the alphabet.",
      "For example, with a shift of 3: A becomes D, B becomes E, C becomes F...",
      "The alphabet wraps around, so Z becomes C with a shift of 3.",
      "The key is knowing how many positions to shift."
    ]
  },
  {
    title: "Breaking the Code",
    icon: "🔍",
    lines: [
      "Since there are only 25 possible shifts (1-25), it's easy to try them all.",
      "Look for patterns that make sense in English.",
      "Common words like 'THE', 'AND', 'FOR' can help identify the correct shift.",
      "The message should read like normal English when decoded correctly."
    ]
  },
  {
    title: "Your Mission",
    icon: "📱",
    lines: [
      "You found a phone with a Caesar cipher on the lock screen.",
      "The message is encrypted with a shift cipher.",
      "Use the Caesar Cipher tool to try different shifts.",
      "Find the correct shift to unlock the phone and reveal the secret message."
    ]
  },
  {
    title: "Tools You'll Use",
    icon: "🛠️",
    lines: [
      "Caesar Cipher Tool: Try different shift values",
      "Look for readable text as you adjust the shift",
      "The flag format will be clear once you decode it",
      "Remember: the message should make sense in English!"
    ]
  },
  {
    title: "Ready to Decrypt?",
    icon: "🎯",
    lines: [
      "You have the tools and knowledge to break this cipher.",
      "Start with common shifts like 3, 13, or 25.",
      "Look for patterns that form real words.",
      "Good luck, code breaker!"
    ]
  }
];

const CaesarIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default CaesarIntro; 