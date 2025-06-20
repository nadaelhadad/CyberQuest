import React, { useState } from 'react';

const slides = [
  {
    title: "Web Exploitation",
    icon: "🌐",
    lines: [
      "Welcome to web exploitation challenges.",
      "You'll learn to find hidden information in web pages.",
      "This challenge focuses on HTML source code analysis.",
      "Developers sometimes leave clues in unexpected places."
    ]
  },
  {
    title: "HTML Comments",
    icon: "💬",
    lines: [
      "HTML comments are hidden from website visitors.",
      "They're written as <!-- comment text -->",
      "Developers use them for notes, debugging, or hiding secrets.",
      "Always check the page source for hidden comments."
    ]
  },
  {
    title: "Viewing Page Source",
    icon: "👁️",
    lines: [
      "Right-click on any webpage and select 'View Page Source'.",
      "Or press Ctrl+U (Windows) or Cmd+U (Mac).",
      "This shows you the raw HTML code behind the page.",
      "Look for <!-- --> tags that contain hidden information."
    ]
  },
  {
    title: "Hidden Clues",
    icon: "🔍",
    lines: [
      "Comments might contain passwords, hints, or flags.",
      "They could be disguised as normal developer notes.",
      "Sometimes they're encoded or encrypted.",
      "Don't overlook anything that looks suspicious."
    ]
  },
  {
    title: "Your Mission",
    icon: "🎯",
    lines: [
      "Examine the webpage's HTML source code.",
      "Find hidden comments that contain clues.",
      "Decode any encoded information you discover.",
      "Submit the flag to unlock the next challenge."
    ]
  },
  {
    title: "Tools You'll Use",
    icon: "🛠️",
    lines: [
      "Browser Developer Tools: View page source",
      "Text Search: Look for comment patterns",
      "Decoding Tools: Convert encoded text",
      "Your detective skills to spot hidden clues."
    ]
  },
  {
    title: "Ready to Hack?",
    icon: "🚀",
    lines: [
      "You have the knowledge to explore web pages deeply.",
      "Remember to check the source code thoroughly.",
      "Look for patterns and hidden information.",
      "Good luck, web explorer!"
    ]
  }
];

const CommentDoorIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default CommentDoorIntro; 