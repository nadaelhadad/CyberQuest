import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "What Is File Header Analysis?",
    icon: "🔍",
    lines: [
      "Not all files tell the truth about what they are.",
      "Hackers often disguise files by changing their extensions.",
      "That's why forensic analysts dig deeper: they inspect the file header.",
      "This is where the file's true identity hides — in its magic bytes."
    ]
  },
  {
    title: "What Are Magic Bytes?",
    icon: "🔐",
    lines: [
      "Every file type starts with a unique signature of bytes.",
      "For example:",
      "- JPG files start with FF D8",
      "- PNG files start with 89 50 4E 47",
      "- MP3 files start with 49 44 33 or FF FB",
      "Even if someone renames a file, these byte patterns never lie."
    ]
  },
  {
    title: "Tools You'll Use",
    icon: "🛠️",
    lines: [
      "To solve this case, you'll use two browser tools:",
      "- CyberChef to extract the hidden files from a zip archive",
      "- HexEd.it to peek into the binary structure and spot real file headers",
      "These tools help you see what your computer usually hides."
    ]
  },
  {
    title: "The Audio Deception",
    icon: "🎵",
    lines: [
      "You're given a zip named street_sounds.zip.",
      "Most files sound like normal street noise…",
      "…but one file won't play. Suspicious?",
      "That file may not be audio at all. Could it be something visual?"
    ]
  },
  {
    title: "Forensic Technique: Open in Hex Editor",
    icon: "🔬",
    lines: [
      "Open the strange file in HexEd.it.",
      "Look at the first few bytes at the top — do they match an image format?",
      "Look deeper… sometimes messages are embedded in invisible metadata or comments.",
      "Can you find a hidden message?"
    ]
  },
  {
    title: "Your Mission",
    icon: "🎯",
    lines: [
      "Find the file with the fake identity.",
      "Inspect its header.",
      "Look for anything hidden in the binary or metadata.",
      "Find the flag and submit it to mark the challenge as complete."
    ]
  },
  {
    title: "Ready to Investigate?",
    icon: "🕵️",
    lines: [
      "Use everything you've learned:",
      "- Unzip carefully",
      "- Think like a hacker",
      "- Trust the data, not the name",
      "You're now a digital sleuth. Time to uncover the truth."
    ]
  }
];

const FalseTrackSilverIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const navigate = useNavigate();
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

export default FalseTrackSilverIntro; 