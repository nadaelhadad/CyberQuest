import React, { useState } from 'react';

const slides = [
  {
    title: "What is a ZIP File?",
    icon: "🗜️",
    lines: [
      "ZIP files are like digital suitcases.",
      "They bundle multiple files into one compressed package.",
      "People use them to save space and send groups of files easily.",
      "Sometimes, they're locked with a password for extra privacy."
    ]
  },
  {
    title: "Are ZIP Passwords Always Secure?",
    icon: "🔒",
    lines: [
      "Not all ZIP passwords are strong.",
      'Many people use easy-to-guess passwords like "1234", "admin", or their own name.',
      "A password on a ZIP file doesn't always mean it's truly protected.",
      "Cracking weak passwords is often possible with the right tools."
    ]
  },
  {
    title: "Hidden Clues in ZIP Files",
    icon: "💬",
    lines: [
      "ZIP files can contain hidden notes called comments.",
      "Creators sometimes leave hints or clues there.",
      "You can view comments using tools like WinRAR or 7-Zip.",
      "Always check for extra info before trying to crack a ZIP."
    ]
  },
  {
    title: "Meet John the Ripper",
    icon: "🧑‍💻",
    lines: [
      "John the Ripper is a powerful password-cracking tool.",
      <span className="font-bold">It doesn't crack ZIPs directly — you need to convert it to txt first:</span>,
      "➤  zip2john yourfile.zip > hash.txt",
      <span className="font-bold">Then crack it with:</span>,
      "➤  john --format=zip hash.txt",
      "➤ Use flags like --show, --status, or --restore to monitor sessions.",
      <span className="font-bold">You can also try 🔧 Hashcat (GPU-powered):</span>,
      "➤  hashcat -m 13600 hash.txt wordlist.txt",
      <span className="font-bold">Or test logins with 🧪 Hydra:</span>,
      "➤  hydra -l admin -P passwords.txt ftp://target"
    ]
  },
  
  {
    title: "What If the ZIP Opens, But…",
    icon: "🧩",
    lines: [
      "Sometimes, you unlock a ZIP but the file inside looks like random letters and numbers.",
      "This means the file is still encrypted or encoded.",
      "Try using CyberChef to decode or decrypt the contents.",
      "CyberChef can help with Base64, XOR, and more."
    ]
  },
  {
    title: "Want to Learn More?",
    icon: "🌐",
    lines: [
      "Explore more about ZIP files and password cracking:",
      <a
        key="john"
        href="https://www.openwall.com/john/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyber-blue-300 hover:underline"
      >
        • John the Ripper
      </a>,
      <a
        key="cyberchef"
        href="https://gchq.github.io/CyberChef/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyber-blue-300 hover:underline"
      >
        • CyberChef
      </a>,
      <a
        key="7zip"
        href="https://www.7-zip.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyber-blue-300 hover:underline"
      >
        • 7-Zip
      </a>,
    ]
  }
  
,  
  {
    title: "Ready to Try?",
    icon: "🕹️	",
    lines: [
      "You've learned the basics of ZIP files and password cracking!",
      "Now, put your skills to the test in the challenge.",
      "Good luck, and have fun hacking!"
    ]
  }
];

const ZipMiniLessonScene: React.FC<{ onStart: () => void }> = ({ onStart }) => {
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
              onClick={onStart}
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyber-green-500 to-cyber-blue-500 hover:from-cyber-green-400 hover:to-cyber-blue-400 text-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Challenge 🕹️	
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZipMiniLessonScene;










 