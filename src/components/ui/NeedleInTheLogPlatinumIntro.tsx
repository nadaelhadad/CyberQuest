import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const slides = [
  {
    title: "Mission Brief: Hidden in the Logs",
    icon: "🕵️‍♂️",
    lines: [
      "The studio's access logs hold a hidden clue.",
      "A suspicious URL appeared just before the hijack.",
      "But it's buried deep inside the raw HTTP access log — and it's not written plainly.",
      "Your job is to trace that hidden trail."
    ]
  },
  {
    title: "Understanding Access Logs",
    icon: "🧾",
    lines: [
      "Web access logs contain a list of all incoming HTTP requests. Each line shows:",
      "• IP address",
      "• Accessed URL",
      "• User-agent",
      "• Timestamp",
      "• Query strings",
      "Among thousands of lines, a single **crafted request** may hold a hidden message."
    ]
  },
  {
    title: "Spotting SQL Injection in URLs",
    icon: "🧨",
    lines: [
      "SQL injection is when attackers insert malicious SQL code in a URL to trick a web server.",
      "Example:",
      "`/search?q=1%27+UNION+SELECT+...`",
      "In this case, someone may have hidden coordinates or instructions using a similar trick.",
      "But everything is URL-encoded — unreadable until decoded."
    ]
  },
  {
    title: "Tool Combo: CyberChef and Regex",
    icon: "🔧",
    lines: [
      "Use **CyberChef** to paste the access log content.",
      "Then:",
      "1. Use `Find / Replace` or manual scan to locate the line with `UNION` or `SELECT`.",
      "2. Use **URL Decode** — sometimes twice — to decode encoded content.",
      "3. Look closely for suspicious patterns like:",
      "   • `' UNION SELECT '...`",
      "   • Encoded pipes `|`, colons `:`, and curly braces `{}`"
    ]
  },
  {
    title: "Your Objective",
    icon: "🎯",
    lines: [
      "• Identify the suspicious URL.",
      "• Decode the embedded message.",
      "• Extract coordinates, time, and the mission reference."
    ]
  },
  {
    title: "What You'll Learn",
    icon: "📚",
    lines: [
      "This tutorial helps you:",
      "• Analyze large logs efficiently",
      "• Recognize encoded payloads and decode them",
      "• Understand how SQL injection may leak data",
      "• Use CyberChef creatively with real-world data"
    ]
  }
];

const NeedleInTheLogPlatinumIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-cyber-black/95 border-2 border-transparent rounded-2xl p-0 mt-24 shadow-2xl overflow-hidden">
      {/* Back to Story button */}
      <button
        onClick={() => navigate('/challenge/forensics-4?showOpening=true')}
        className="absolute top-4 left-4 z-20 px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-gray-700 to-cyber-blue-700 hover:from-cyber-blue-600 hover:to-cyber-purple-600 transition-all duration-300 hover:scale-105"
      >
        ← Back to the Story
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
              onClick={onComplete}
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-green-500 to-cyber-blue-500 hover:from-cyber-green-400 hover:to-cyber-blue-400 text-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Challenge 🎯
            </button>
          )}
        </div>
        
        {/* Skip Tutorial Button */}
        <button
          onClick={onComplete}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-lg font-bold text-cyber-gray-400 hover:text-cyber-blue-100 bg-cyber-gray-800 hover:bg-cyber-gray-700 transition-all duration-300 hover:scale-105"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  );
};

export default NeedleInTheLogPlatinumIntro; 