import React, { useState } from 'react';

const slides = [
  {
    title: "Hidden Shell Mission",
    icon: "💻",
    lines: [
      "Welcome to the Hidden Shell reversing challenge!",
      "Your goal: Uncover the secret command or flag hidden in the intercepted logs.",
      "You have a zip file with encrypted logs—can you find the shell?"
    ]
  },
  {
    title: "What Are Shells?",
    icon: "🐚",
    lines: [
      "A shell is a command-line interface to interact with the system.",
      "Attackers often hide backdoors or secret commands in logs or scripts.",
      "Your job: analyze the files and spot anything suspicious!"
    ]
  },
  {
    title: "Analyzing Logs",
    icon: "📝",
    lines: [
      "Extract the zip file and inspect its contents.",
      "Look for unusual commands, encoded data, or hidden messages.",
      "Try using tools like CyberChef to decode or analyze suspicious strings."
    ]
  },
  {
    title: "Hints & Tools",
    icon: "🧑‍💻",
    lines: [
      "If you get stuck, use the provided hints panel for help (costs points).",
      "CyberChef is great for decoding, decryption, and data analysis.",
      "Think like a hacker: what would you hide in a log file?"
    ]
  },
  {
    title: "Ready to Investigate?",
    icon: "🚀",
    lines: [
      "You have the skills to uncover the hidden shell!",
      "Download the logs, analyze every detail, and submit the flag when found.",
      "Good luck, cyber detective!"
    ]
  }
];

const HiddenShellIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default HiddenShellIntro; 