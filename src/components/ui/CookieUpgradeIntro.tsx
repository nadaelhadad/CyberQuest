import React, { useState } from 'react';

const slides = [
  {
    title: "Cookie Upgrade Mission",
    icon: "🍪",
    lines: [
      "Welcome to the Cookie Upgrade web challenge!",
      "Your goal: Access the SkyLine Gold Lounge by upgrading your seat class.",
      "The /gold page checks your browser cookies for special access.",
      "Can you find the right cookie and value to get in?"
    ]
  },
  {
    title: "What Are Cookies?",
    icon: "🔑",
    lines: [
      "Cookies are small pieces of data stored by your browser for each website.",
      "Websites use cookies to remember your login, preferences, or privileges.",
      "You can view and edit cookies using browser devtools or extensions."
    ]
  },
  {
    title: "Inspecting Cookies",
    icon: "🕵️‍♂️",
    lines: [
      "Open your browser's DevTools (F12 or Ctrl+Shift+I).",
      "Go to the Application/Storage tab, then Cookies.",
      "Look for a cookie named seatClass. Its value controls your access!"
    ]
  },
  {
    title: "Editing Cookies",
    icon: "📝",
    lines: [
      "You can change cookie values using DevTools or a cookie editor extension.",
      "Try setting seatClass to firstClass and refresh /gold.",
      "If done right, you'll unlock the download!"
    ]
  },
  {
    title: "Mission Tips",
    icon: "💡",
    lines: [
      "If you get 'Access Denied', check your cookie value and spelling.",
      "Make sure the cookie path is set to / so /gold can read it.",
      "Use the provided Cookie Editor or DevTools for easy editing."
    ]
  },
  {
    title: "Ready to Upgrade?",
    icon: "🚀",
    lines: [
      "You have the knowledge to hack your way into the Gold Lounge!",
      "Edit your cookies, refresh /gold, and claim your reward.",
      "Good luck, web explorer!"
    ]
  }
];

const CookieUpgradeIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

export default CookieUpgradeIntro; 