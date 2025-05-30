import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TerminalProps {
  initialText?: string;
  className?: string;
  commands?: Record<string, (args: string[]) => string>;
  readOnly?: boolean;
  showPrompt?: boolean;
  autoFocus?: boolean;
  onCommandEntered?: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({
  initialText = '',
  className = '',
  commands = {},
  readOnly = false,
  showPrompt = true,
  autoFocus = true,
  onCommandEntered,
}) => {
  const [history, setHistory] = useState<string[]>(initialText ? [initialText] : []);
  const [inputValue, setInputValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = '> ';

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = inputValue.trim();
      
      if (command) {
        // Add to display history
        setHistory(prev => [...prev, `${prompt}${command}`]);
        
        // Process command
        if (onCommandEntered) {
          onCommandEntered(command);
        } else {
          processCommand(command);
        }
        
        // Add to command history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const processCommand = (commandLine: string) => {
    const [cmd, ...args] = commandLine.split(' ');
    
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    
    if (cmd === 'help') {
      const availableCommands = Object.keys(commands).concat(['help', 'clear']);
      setHistory(prev => [...prev, `Available commands: ${availableCommands.join(', ')}`]);
      return;
    }
    
    if (cmd in commands) {
      const output = commands[cmd](args);
      setHistory(prev => [...prev, output]);
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}. Type 'help' for available commands.`]);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`bg-cyber-black border-2 border-cyber-blue-200 rounded-md p-4 font-terminal text-white overflow-hidden ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-green-200"></div>
        </div>
        <div className="flex items-center">
          <Sparkles size={14} className="text-cyber-blue-100 mr-1" />
          <span className="text-xs text-cyber-blue-100">CyberQuest Terminal</span>
        </div>
      </div>
      
      <div
        ref={terminalRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-gray scrollbar-track-transparent"
      >
        {history.map((line, index) => (
          <motion.div
            key={index}
            className="whitespace-pre-wrap break-all mb-1"
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            {line}
          </motion.div>
        ))}
        
        {!readOnly && (
          <div className="flex items-center">
            {showPrompt && <span className="text-cyber-green-200">{prompt}</span>}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white"
              autoFocus={autoFocus}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;