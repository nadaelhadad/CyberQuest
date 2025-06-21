import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const slides = [
  {
    title: "Mission Brief: Just Three Seconds",
    icon: "🎧",
    lines: [
      "Sometimes, all we get is a sliver of digital evidence.",
      "In this case, engineers managed to capture just **3 seconds of network traffic** during a suspected hijacking operation.",
      "You're now handed a `burst.pcap` file – a capture of those crucial seconds. What secrets left the studio in that brief moment?"
    ]
  },
  {
    title: "Understanding PCAPs",
    icon: "📡",
    lines: [
      "A `.pcap` (Packet Capture) file is a digital recording of network traffic.",
      "These files contain **raw packets** flowing across a network — DNS lookups, TCP handshakes, HTTP requests, file uploads, and more.",
      "When analyzing `.pcap` files, we aim to extract useful information such as:",
      "• Accessed websites",
      "• Uploaded or downloaded content", 
      "• Credentials sent in plaintext",
      "• Suspicious or anomalous behavior"
    ]
  },
  {
    title: "Tool Spotlight: aPackets",
    icon: "🔍",
    lines: [
      "[aPackets](https://apackets.com) is a beginner-friendly web tool that helps you inspect `.pcap` files without needing complex software.",
      "Just upload the `.pcap`, and aPackets will parse it, detect protocols, extract objects (like POST data), and let you explore the contents easily."
    ]
  },
  {
    title: "Base64 & Data Encoding",
    icon: "🧪",
    lines: [
      "Sometimes, attackers encode the contents they transmit to avoid detection.",
      "**Base64** is a popular encoding method to safely transmit binary data as text.",
      "When you find a Base64 string (often ending with `==`), it's a sign that something was hidden in plain sight. Tools like CyberChef help you decode and analyze such data with ease."
    ]
  },
  {
    title: "Your Mission Objective",
    icon: "🎯",
    lines: [
      "• Load `burst.pcap` in aPackets.",
      "• Locate any **HTTP POST payloads** in the traffic.",
      "• If you find something encoded, copy it and head to **CyberChef**.",
      "• Use the \"From Base64\" operation to decode.",
      "• Look for any hidden messages or suspicious data in the decoded content."
    ]
  },
  {
    title: "Why This Matters",
    icon: "🧠",
    lines: [
      "This challenge introduces you to the fundamentals of:",
      "• Inspecting PCAPs for meaningful content",
      "• Recognizing and decoding Base64",
      "• Understanding how short time windows can still leak critical intel",
      "Learning to interpret PCAPs is a key step for aspiring digital forensics analysts and threat hunters."
    ]
  }
];

const ThreeSecondBurstGoldIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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
        onClick={() => navigate('/challenge/forensics-3?showOpening=true')}
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
      </div>
    </div>
  );
};

export default ThreeSecondBurstGoldIntro; 