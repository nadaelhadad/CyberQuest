// File: pages/ChallengesPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CaesarChallenge from '../components/CaesarChallenge';
import Dock17Challenge from '../components/Dock17Challenge';
import LayeredCryChallenge from '../components/LayeredCryChallenge';
import PlainTokenChallenge from '../components/PlainTokenChallenge';
import CommentDoorChallenge from '../components/CommentDoorChallenge';
import ForgottenSelfieChallenge from '../components/ForgottenSelfieChallenge';
import WeakZipChallenge from '../components/WeakZipChallenge';
import CaesarIntro from '../components/ui/CaesarIntro';
import Dock17Intro from '../components/ui/Dock17Intro';
import LayeredCryIntro from '../components/ui/LayeredCryIntro';
import PlainTokenIntro from '../components/ui/PlainTokenIntro';
import CommentDoorIntro from '../components/ui/CommentDoorIntro';
import ForgottenSelfieIntro from '../components/ui/ForgottenSelfieIntro';
import ZipMiniLessonScene from '../components/ZipMiniLessonScene';

const ChallengesPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [showCaesarIntro, setShowCaesarIntro] = useState(false);
  const [showDock17Intro, setShowDock17Intro] = useState(false);
  const [showLayeredCryIntro, setShowLayeredCryIntro] = useState(false);
  const [showPlainTokenIntro, setShowPlainTokenIntro] = useState(false);
  const [showCommentDoorIntro, setShowCommentDoorIntro] = useState(false);
  const [showForgottenSelfieIntro, setShowForgottenSelfieIntro] = useState(false);
  const [showZipLesson, setShowZipLesson] = useState(false);
  const location = useLocation();

  // Temporary debug function to clear all tutorial localStorage
  const clearAllTutorials = () => {
    localStorage.removeItem('caesarIntroShown');
    localStorage.removeItem('dock17IntroShown');
    localStorage.removeItem('layeredCryIntroShown');
    localStorage.removeItem('plainTokenIntroShown');
    localStorage.removeItem('commentDoorIntroShown');
    localStorage.removeItem('forgottenSelfieIntroShown');
    localStorage.removeItem('zipLessonShown');
    window.location.reload();
  };

  // Debug info
  console.log('ChallengePage Debug:', {
    challengeId,
    caesarIntroShown: localStorage.getItem('caesarIntroShown'),
    forgottenSelfieIntroShown: localStorage.getItem('forgottenSelfieIntroShown'),
    plainTokenIntroShown: localStorage.getItem('plainTokenIntroShown'),
    showIntroParam: new URLSearchParams(location.search).get('showIntro'),
    locationPathname: location.pathname,
    locationSearch: location.search
  });

  // Force show tutorials for testing - remove this later
  const forceShowTutorials = () => {
    localStorage.removeItem('caesarIntroShown');
    localStorage.removeItem('plainTokenIntroShown');
    localStorage.removeItem('forgottenSelfieIntroShown');
    localStorage.removeItem('dock17IntroShown');
    localStorage.removeItem('layeredCryIntroShown');
    localStorage.removeItem('commentDoorIntroShown');
    localStorage.removeItem('zipLessonShown');
    window.location.reload();
  };

  useEffect(() => {
    // Check for tutorial state on every render
    const shouldShowCaesarIntro = challengeId === 'crypto-1' && 
      (localStorage.getItem('caesarIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');
    
    const shouldShowDock17Intro = challengeId === 'crypto-2' && 
      (localStorage.getItem('layeredCryIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowLayeredCryIntro = challengeId === 'crypto-3' && 
      (localStorage.getItem('layeredCryIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowPlainTokenIntro = challengeId === 'reversing-1' &&
      (localStorage.getItem('plainTokenIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowCommentDoorIntro = challengeId === 'web-1' &&
      (localStorage.getItem('commentDoorIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    // const shouldShowLayeredCryIntro = challengeId === 'web-1' &&
    //    (localStorage.getItem('commentDoorIntroShown') !== 'true' ||
    //     new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowForgottenSelfieIntro = challengeId === 'forensics-1' &&
      (localStorage.getItem('forgottenSelfieIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowZipLesson = challengeId === 'reversing-2' &&
      (localStorage.getItem('zipLessonShown') !== 'true' ||
      new URLSearchParams(location.search).get('showIntro') === 'true');

    setShowCaesarIntro(shouldShowCaesarIntro);
    setShowDock17Intro(shouldShowDock17Intro);
    setShowLayeredCryIntro(shouldShowLayeredCryIntro);
    setShowPlainTokenIntro(shouldShowPlainTokenIntro);
    setShowCommentDoorIntro(shouldShowCommentDoorIntro);
    setShowForgottenSelfieIntro(shouldShowForgottenSelfieIntro);
    setShowZipLesson(shouldShowZipLesson);

    // Debug the tutorial states
    console.log('Tutorial States:', {
      shouldShowCaesarIntro,
      shouldShowPlainTokenIntro,
      shouldShowForgottenSelfieIntro,
      shouldShowDock17Intro,
      shouldShowLayeredCryIntro,
      shouldShowCommentDoorIntro,
      shouldShowZipLesson
    });
  }, [challengeId, location.pathname, location.search]);

  if (!challengeId) return <div className="text-white p-6">No challenge selected.</div>;

  // Handle tutorial completion
  const handleCaesarIntroComplete = () => {
    localStorage.setItem('caesarIntroShown', 'true');
    setShowCaesarIntro(false);
  };

  const handleDock17IntroComplete = () => {
    localStorage.setItem('dock17IntroShown', 'true');
    setShowDock17Intro(false);
  };

  const handleLayeredCryIntroComplete = () => {
    localStorage.setItem('layeredCryIntroShown', 'true');
    setShowLayeredCryIntro(false);
  };

  const handlePlainTokenIntroComplete = () => {
    localStorage.setItem('plainTokenIntroShown', 'true');
    setShowPlainTokenIntro(false);
  };

  const handleCommentDoorIntroComplete = () => {
    localStorage.setItem('commentDoorIntroShown', 'true');
    setShowCommentDoorIntro(false);
  };

  const handleForgottenSelfieIntroComplete = () => {
    localStorage.setItem('forgottenSelfieIntroShown', 'true');
    setShowForgottenSelfieIntro(false);
  };
  
  const handleZipLessonComplete = () => {
    localStorage.setItem('zipLessonShown', 'true');
    setShowZipLesson(false);
  };

  // Show tutorials for each challenge
  if (challengeId === 'crypto-1' && showCaesarIntro) {
    return <CaesarIntro onComplete={handleCaesarIntroComplete} />;
  }

  if (challengeId === 'crypto-2' && showDock17Intro) {
    return <Dock17Intro onComplete={handleDock17IntroComplete} />;
  }

  if (challengeId === 'crypto-3' && showLayeredCryIntro) {
    return <LayeredCryIntro onComplete={handleLayeredCryIntroComplete} />;
  }

  if (challengeId === 'reversing-1' && showPlainTokenIntro) {
    return <PlainTokenIntro onComplete={handlePlainTokenIntroComplete} />;
  }

  if (challengeId === 'web-1' && showCommentDoorIntro) {
    return <CommentDoorIntro onComplete={handleCommentDoorIntroComplete} />;
  }

  if (challengeId === 'forensics-1' && showForgottenSelfieIntro) {
    return <ForgottenSelfieIntro onComplete={handleForgottenSelfieIntroComplete} />;
  }

  if (challengeId === 'reversing-2' && showZipLesson) {
    return <ZipMiniLessonScene onStart={handleZipLessonComplete} />;
  }

  switch (challengeId) {
    case 'crypto-1':
      return (
        <div>
          {/* Debug button - remove in production */}
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={forceShowTutorials}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-bold"
              title="Force show all tutorials"
            >
              🔧 Force Tutorials
            </button>
          </div>
          <CaesarChallenge />
        </div>
      );
    case 'crypto-2':
      return (
        <div>
          {/* Debug button - remove in production */}
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={forceShowTutorials}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-bold"
              title="Force show all tutorials"
            >
              🔧 Force Tutorials
            </button>
          </div>
          <Dock17Challenge />
        </div>
      );
    case 'crypto-3':
      return (
        <div>
          {/* Debug button - remove in production */}
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={forceShowTutorials}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-bold"
              title="Force show all tutorials"
            >
              🔧 Force Tutorials
            </button>
          </div>
          <LayeredCryChallenge />
        </div>
      );
    case 'reversing-1':
      return (
        <div>
          {/* Debug button - remove in production */}
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={forceShowTutorials}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-bold"
              title="Force show all tutorials"
            >
              🔧 Force Tutorials
            </button>
          </div>
          <PlainTokenChallenge />
        </div>
      );
    case 'reversing-2':
      return <WeakZipChallenge />;
    case 'web-1':
      return <CommentDoorChallenge />;
    case 'forensics-1':
      return (
        <div>
          {/* Debug button - remove in production */}
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={forceShowTutorials}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded font-bold"
              title="Force show all tutorials"
            >
              🔧 Force Tutorials
            </button>
          </div>
          <ForgottenSelfieChallenge />
        </div>
      );
    default:
      return <div className="text-white p-6">Unknown challenge: {challengeId}</div>;
  }
};

export default ChallengesPage;
