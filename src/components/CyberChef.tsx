import React, { useState } from 'react';
import { Terminal, Shield, Lock, Zap, Copy, ArrowRight } from 'lucide-react';

type DecoderType = 'hex' | 'base64' | 'cipher';

const CyberChef: React.FC = () => {
  const [activeDecoder, setActiveDecoder] = useState<DecoderType>('hex');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decodeHex = (hex: string) => {
    try {
      const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, '');
      if (cleanHex.length % 2 !== 0) return 'Error: Invalid hex length';
      
      let result = '';
      for (let i = 0; i < cleanHex.length; i += 2) {
        const byte = parseInt(cleanHex.substr(i, 2), 16);
        result += String.fromCharCode(byte);
      }
      return result;
    } catch (e) {
      return 'Error: Invalid hex string';
    }
  };

  const decodeBase64 = (base64: string) => {
    try {
      const cleanBase64 = base64.trim().replace(/\s/g, '');
      return atob(cleanBase64);
    } catch (e) {
      return 'Error: Invalid Base64 string';
    }
  };

  const decodeROT13 = (text: string) => {
    return text.replace(/[A-Za-z]/g, (char) => {
      const isUpper = char === char.toUpperCase();
      const charCode = char.toUpperCase().charCodeAt(0);
      const decodedChar = String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
      return isUpper ? decodedChar : decodedChar.toLowerCase();
    });
  };

  const handleDecode = () => {
    if (!input.trim()) {
      setOutput('Error: No input provided');
      return;
    }

    let decoded = '';
    switch (activeDecoder) {
      case 'hex':
        decoded = decodeHex(input);
        break;
      case 'base64':
        decoded = decodeBase64(input);
        break;
      case 'cipher':
        decoded = decodeROT13(input);
        break;
    }

    setOutput(decoded);
  };

  const handleCopy = () => {
    if (output && !output.startsWith('Error:')) {
      navigator.clipboard.writeText(output);
    }
  };

  const getPlaceholder = () => {
    switch (activeDecoder) {
      case 'hex':
        return 'Enter hexadecimal data...';
      case 'base64':
        return 'Enter Base64 encoded string...';
      case 'cipher':
        return 'Enter encrypted text...';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-black border-2 border-cyan-400 rounded-xl overflow-hidden">
      {/* Tool Header */}
      <div className="bg-black/50 p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-cyan-400">CYBERCHEF DECODER</h2>
        <p className="text-sm text-gray-400">Advanced decryption tools for signal analysis</p>
      </div>

      {/* Tool Selection */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveDecoder('hex')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all ${
            activeDecoder === 'hex' 
              ? 'bg-cyan-400/20 text-cyan-300 border-b-2 border-cyan-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Terminal size={16} />
          <span className="font-semibold">HEX ANALYZER</span>
        </button>
        <button
          onClick={() => setActiveDecoder('base64')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all ${
            activeDecoder === 'base64' 
              ? 'bg-cyan-400/20 text-cyan-300 border-b-2 border-cyan-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Shield size={16} />
          <span className="font-semibold">BASE64 DECODER</span>
        </button>
        <button
          onClick={() => setActiveDecoder('cipher')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-all ${
            activeDecoder === 'cipher' 
              ? 'bg-cyan-400/20 text-cyan-300 border-b-2 border-cyan-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Lock size={16} />
          <span className="font-semibold">CIPHER BREAKER</span>
        </button>
      </div>

      {/* Input/Output Section */}
      <div className="p-6 space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm text-blue-300 mb-2 font-semibold">ENCRYPTED INPUT:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full h-32 bg-black/50 text-green-300 p-3 rounded border border-gray-600 font-mono text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDecode}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Zap size={16} /> DECRYPT
          </button>
          <button
            onClick={handleCopy}
            className="bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-500 transition-all flex items-center gap-2"
            title="Copy output"
          >
            <Copy size={16} />
            <span className="font-semibold">COPY</span>
          </button>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm text-green-300 mb-2 font-semibold">DECRYPTED OUTPUT:</label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Decrypted data will appear here..."
              className="w-full h-32 bg-black/70 text-lime-300 p-3 rounded border border-green-600 font-mono text-sm"
            />
            {output && !output.startsWith('Error:') && (
              <button
                onClick={() => setInput(output)}
                className="absolute bottom-2 right-2 bg-green-600/20 text-green-300 p-2 rounded hover:bg-green-600/30 transition-all"
                title="Use as input"
              >
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberChef; 