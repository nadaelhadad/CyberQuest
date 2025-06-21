import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';

const FLAG = 'CTF{Admin_Cabin_Seat_1A}';

const GoldPage: React.FC = () => {
  const [seatClass, setSeatClass] = useState('');
  const [showDenied, setShowDenied] = useState(false);

  // 🔄 Live cookie polling every second
  useEffect(() => {
    // Always reset seatClass to economy on page load
    document.cookie = 'seatClass=economy; path=/';
    setSeatClass('economy');

    const checkCookie = () => {
      const match = document.cookie.match(/seatClass=([^;]+)/);
      setSeatClass(match ? match[1] : 'economy');
    };

    checkCookie(); // initial check
    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clear denied message if seatClass is now firstClass
  useEffect(() => {
    if (seatClass === 'firstClass' && showDenied) {
      setShowDenied(false);
    }
  }, [seatClass, showDenied]);

  const handleDownload = async () => {
    if (seatClass !== 'firstClass') {
      setShowDenied(true);
      return;
    }

    // Obfuscated code: prints atob('Q1RGe0FkbWluX0NhYmluX1NlYXRfMUEpfQ==')
    const obfuscated = `(() => {
  const _0xabc = [
    'bG9n',                                  // 'log'
    'Q1RGe0FkbWluX0NhYmluX1NlYXRfMUEpfQ==',  // Base64 encoded flag
    'YXRvYg==',                              // 'atob'
    'Y29uc29sZQ=='                           // 'console'
  ];

  // Obfuscation: rotating array elements
  (function (_0xdef, _0x123) {
    const _0x456 = function (_0x789) {
      while (--_0x789) {
        _0xdef.push(_0xdef.shift());
      }
    };
    _0x456(++_0x123);
  })(_0xabc, 0x1b); // 0x1b = 27

  // Accessor function to decode obfuscated values
  const _0x789 = function (_0xdef, _0x123) {
    _0xdef = _0xdef - 0x0;
    let _0x456 = _0xabc[_0xdef];
    return _0x456;
  };

  // Final decoded call:
  // window["console"]["log"]( window["atob"]("Q1RGe0FkbWluX0NhYmluX1NlYXRfMUEpfQ==") );
  window[_0x789('3')][_0x789('0')](
    window[_0x789('2')](
      window[_0x789('1')]
    )
  );
})();`;

    const zip = new JSZip();
    zip.file('flag.js', obfuscated);
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'contents.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleSetCookie = () => {
    document.cookie = 'seatClass=firstClass; path=/';
    alert('Cookie set to firstClass! You can now try downloading.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#181c24', color: '#fff', fontFamily: 'monospace' }}>
      <header style={{
        background: '#23293a',
        padding: '2rem 0',
        textAlign: 'center',
        boxShadow: '0 2px 8px #0002'
      }}>
        <h1 style={{ fontSize: '2.2rem', color: '#ffd700', margin: 0 }}>
          SkyLine Gold Lounge Internal Portal
        </h1>
      </header>

      <main style={{
        maxWidth: 500,
        margin: '3rem auto',
        background: '#23293a',
        borderRadius: 12,
        boxShadow: '0 4px 24px #0004',
        padding: '2.5rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#bfc7d5', fontSize: '1.1rem', marginBottom: 24 }}>
          Secure file available for authorized staff only.
        </p>

        

        <button
          onClick={handleDownload}
          style={{
            background: seatClass === 'firstClass' ? '#ffd700' : '#bfc7d5',
            color: '#23293a',
            fontWeight: 700,
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: 8,
            padding: '0.9rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'background 0.2s',
            marginBottom: 16
          }}
        >
          📁 Download contents.zip
        </button>

        

        {showDenied && (
          <div style={{
            marginTop: 24,
            background: '#2d1c1c',
            color: '#ff4d4f',
            borderRadius: 8,
            padding: '1.2rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px #ff4d4f22'
          }}>
            🚫 Access Denied<br />
            You are not authorized to download this file.
          </div>
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        color: '#bfc7d5',
        fontSize: '0.95rem',
        padding: '1.5rem 0 0.5rem',
        opacity: 0.7
      }}>
        &copy; {new Date().getFullYear()} SkyLine Internal Systems
      </footer>
    </div>
  );
};

export default GoldPage;
