import React, { useState } from 'react';

const slides = [
  {
    title: "Number Song Mission",
    icon: "🎵",
    lines: [
      "Welcome to the Number Song reversing challenge!",
      "Your goal: Decode the main.js file filled with numbers and eval calls.",
      "Find the fourth shard hidden within the encoded JavaScript."
    ]
  },
  {
    title: "What Are Eval Calls?",
    icon: "🔢",
    lines: [
      "eval() is a JavaScript function that executes code from a string.",
      "Attackers use it to hide malicious code or obfuscate their intentions.",
      "Your job: understand what the eval calls are building!"
    ]
  },
  {
    title: "Analyzing the Numbers",
    icon: "📊",
    lines: [
      "The numbers in main.js aren't random—they have meaning.",
      "They likely represent ASCII character codes or encoded data.",
      "Use an ASCII table to convert numbers to characters."
    ]
  },
  {
    title: "Decoding Strategy",
    icon: "🧩",
    lines: [
      "Look for patterns in the numbers and eval calls.",
      "Try converting numbers to ASCII characters.",
      "See what string the eval function is trying to execute."
    ]
  },
  {
    title: "Tools & Hints",
    icon: "🛠️",
    lines: [
      "Use CyberChef for decoding and analysis.",
      "Check the hints panel if you get stuck (costs points).",
      "Think step by step: numbers → characters → eval → flag."
    ]
  },
  {
    title: "Ready to Decode?",
    icon: "🚀",
    lines: [
      "You have the skills to crack this number puzzle!",
      "Download the main.js file, analyze every detail, and find the shard.",
      "Good luck, code detective!"
    ]
  }
];

const NumberSongIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [slide, setSlide] = useState(0);
  const isLast = slide === slides.length - 1;
  const isFirst = slide === 0;
  const { title, icon, lines } = slides[slide];

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-cyber-black/95 border-2 border-transparent rounded-2xl p-0 mt-24 shadow-2xl overflow-hidden">
      {/* Neon Gradient Border */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0" style={{
        background: 'linear-gradient(120deg, #ffb86c 0%, #ff4dcb 50%, #00f0ff 100%)',
        filter: 'blur(8px)',
        opacity: 0.25
      }} />
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(90deg,rgba(255,200,80,0.08) 1px,transparent 1px),linear-gradient(180deg,rgba(255,200,80,0.08) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
      <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col items-center min-h-[420px]">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl md:text-5xl drop-shadow-glow">{icon}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-cyber-yellow drop-shadow-glow">{title}</h1>
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
            className={`px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-yellow-700 transition-all duration-300 ${isFirst ? 'opacity-40 cursor-not-allowed' : 'hover:from-cyber-yellow-600 hover:to-cyber-pink-600 hover:scale-105'}`}
          >
            ← Back
          </button>
          {!isLast ? (
            <button
              onClick={() => setSlide(slide + 1)}
              className="px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-yellow-600 to-cyber-pink-600 hover:from-cyber-yellow-500 hover:to-cyber-pink-500 transition-all duration-300 hover:scale-105"
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

export default NumberSongIntro; 