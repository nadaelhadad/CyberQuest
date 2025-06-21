// File: pages/ChallengesPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import WhisperOneChallenge from '../components/WhisperOneChallenge';
import Dock17Challenge from '../components/Dock17Challenge';
import MirrorBlock from '../components/MirrorBlock';
import EchoPad from '../components/EchoPad';
import PlainTokenChallenge from '../components/PlainTokenChallenge';
import CommentDoorChallenge from '../components/CommentDoorChallenge';
import ForgottenSelfieChallenge from '../components/ForgottenSelfieChallenge';
import WeakZipChallenge from '../components/WeakZipChallenge';
import CaesarIntro from '../components/ui/CaesarIntro';
import Dock17Intro from '../components/ui/Dock17Intro';
import MirrorBlockIntro from '../components/ui/MirrorBlockIntro';
import PlainTokenIntro from '../components/ui/PlainTokenIntro';
import CommentDoorIntro from '../components/ui/CommentDoorIntro';
import ForgottenSelfieIntro from '../components/ui/ForgottenSelfieIntro';
import ZipMiniLessonScene from '../components/ZipMiniLessonScene';
import LayeredCry from '../components/LayeredCry';
import OpeningScene from '../components/ui/OpeningScene';
import FalseTrackSilver from '../components/FalseTrackSilver';
import FalseTrackSilverIntro from '../components/FalseTrackSilverIntro';
import ThreeSecondBurstGold from '../components/ThreeSecondBurstGold';
import ThreeSecondBurstGoldIntro from '../components/ui/ThreeSecondBurstGoldIntro';
import NeedleInTheLogPlatinum from '../components/NeedleInTheLogPlatinum';
import NeedleInTheLogPlatinumIntro from '../components/ui/NeedleInTheLogPlatinumIntro';
import { useGameStore } from '../store/gameStore';

const ChallengesPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [showCaesarIntro, setShowCaesarIntro] = useState(false);
  const [showDock17Intro, setShowDock17Intro] = useState(false);
  const [showMirrorBlockIntro, setShowMirrorBlockIntro] = useState(false);
  const [showPlainTokenIntro, setShowPlainTokenIntro] = useState(false);
  const [showCommentDoorIntro, setShowCommentDoorIntro] = useState(false);
  const [showForgottenSelfieIntro, setShowForgottenSelfieIntro] = useState(false);
  const [showZipLesson, setShowZipLesson] = useState(false);
  const [showOpeningScene, setShowOpeningScene] = useState(false);
  const [showFalseTrackSilverIntro, setShowFalseTrackSilverIntro] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { submitFlag, gameProgress, currentChallenge, setCurrentChallenge, useHint } = useGameStore();

  // Temporary debug function to clear all tutorial localStorage
  const clearAllTutorials = () => {
    localStorage.removeItem('caesarIntroShown');
    localStorage.removeItem('dock17IntroShown');
    localStorage.removeItem('mirrorBlockIntroShown');
    localStorage.removeItem('plainTokenIntroShown');
    localStorage.removeItem('commentDoorIntroShown');
    localStorage.removeItem('forgottenSelfieIntroShown');
    localStorage.removeItem('zipLessonShown');
    localStorage.removeItem('falseTrackSilverIntroShown');
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
    localStorage.removeItem('mirrorBlockIntroShown');
    localStorage.removeItem('commentDoorIntroShown');
    localStorage.removeItem('zipLessonShown');
    localStorage.removeItem('falseTrackSilverIntroShown');
    window.location.reload();
  };

  useEffect(() => {
    // Check for opening scene state on every render
    const shouldShowOpeningScene = challengeId === 'crypto-1' && 
      new URLSearchParams(location.search).get('showOpening') === 'true';
    
    const shouldShowCaesarIntro = challengeId === 'crypto-1' && 
      (localStorage.getItem('caesarIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');
    
    const shouldShowDock17Intro = challengeId === 'crypto-2' && 
      (localStorage.getItem('mirrorBlockIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowMirrorBlockIntro = challengeId === 'crypto-3' && 
      (localStorage.getItem('mirrorBlockIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowPlainTokenIntro = challengeId === 'reversing-1' &&
      (localStorage.getItem('plainTokenIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowCommentDoorIntro = challengeId === 'web-1' &&
      (localStorage.getItem('commentDoorIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowForgottenSelfieIntro = challengeId === 'forensics-1' &&
      (localStorage.getItem('forgottenSelfieIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowZipLesson = challengeId === 'reversing-2' &&
      (localStorage.getItem('zipLessonShown') !== 'true' ||
      new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowFalseTrackSilverIntro = challengeId === 'forensics-2' &&
      (localStorage.getItem('falseTrackSilverIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    setShowOpeningScene(shouldShowOpeningScene);
    setShowCaesarIntro(shouldShowCaesarIntro);
    setShowDock17Intro(shouldShowDock17Intro);
    setShowMirrorBlockIntro(shouldShowMirrorBlockIntro);
    setShowPlainTokenIntro(shouldShowPlainTokenIntro);
    setShowCommentDoorIntro(shouldShowCommentDoorIntro);
    setShowForgottenSelfieIntro(shouldShowForgottenSelfieIntro);
    setShowZipLesson(shouldShowZipLesson);
    setShowFalseTrackSilverIntro(shouldShowFalseTrackSilverIntro);

    // Debug the tutorial states
    console.log('Tutorial States:', {
      shouldShowCaesarIntro,
      shouldShowPlainTokenIntro,
      shouldShowForgottenSelfieIntro,
      shouldShowDock17Intro,
      shouldShowMirrorBlockIntro,
      shouldShowCommentDoorIntro,
      shouldShowZipLesson,
      shouldShowFalseTrackSilverIntro
    });
  }, [challengeId, location.pathname, location.search]);

  if (!challengeId) return <div className="text-white p-6">No challenge selected.</div>;

  // Handle opening scene completion
  const handleOpeningSceneComplete = () => {
    setShowOpeningScene(false);
  };

  // Handle tutorial completion
  const handleCaesarIntroComplete = () => {
    localStorage.setItem('caesarIntroShown', 'true');
    setShowCaesarIntro(false);
    setCurrentChallenge('crypto-1');
  };

  const handleDock17IntroComplete = () => {
    localStorage.setItem('dock17IntroShown', 'true');
    setShowDock17Intro(false);
  };

  const handleMirrorBlockIntroComplete = () => {
    localStorage.setItem('mirrorBlockIntroShown', 'true');
    setShowMirrorBlockIntro(false);
    setCurrentChallenge('crypto-3');
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

  const handleFalseTrackSilverIntroComplete = () => {
    localStorage.setItem('falseTrackSilverIntroShown', 'true');
    setShowFalseTrackSilverIntro(false);
  };

  const handleThreeSecondBurstGoldIntroComplete = () => {
    // Mark tutorial as completed
    localStorage.setItem('threeSecondBurstGoldIntroShown', 'true');
    setCurrentChallenge('forensics-3');
    navigate('/challenge/forensics-3');
  };

  const handleNeedleInTheLogPlatinumIntroComplete = () => {
    // Mark tutorial as completed
    localStorage.setItem('needleInTheLogPlatinumIntroShown', 'true');
    setCurrentChallenge('forensics-4');
    navigate('/challenge/forensics-4');
  };

  // Show opening scene for WhisperOne Challenge
  if (challengeId === 'crypto-1' && showOpeningScene) {
    return <OpeningScene onComplete={handleOpeningSceneComplete} />;
  }

  // Show tutorials for each challenge
  if (challengeId === 'crypto-1' && showCaesarIntro) {
    return <CaesarIntro onComplete={handleCaesarIntroComplete} />;
  }

  if (challengeId === 'crypto-2' && showDock17Intro) {
    return <Dock17Intro onComplete={handleDock17IntroComplete} />;
  }

  if (challengeId === 'crypto-3' && showMirrorBlockIntro) {
    return <MirrorBlockIntro onComplete={handleMirrorBlockIntroComplete} />;
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

  if (challengeId === 'forensics-2' && showFalseTrackSilverIntro) {
    return <FalseTrackSilverIntro onComplete={handleFalseTrackSilverIntroComplete} />;
  }

  if (challengeId === 'forensics-3') {
    // Check if tutorial should be shown
    const showTutorial = !localStorage.getItem('threeSecondBurstGoldIntroShown') || location.search.includes('showTutorial=true');
    if (showTutorial) {
      return <ThreeSecondBurstGoldIntro onComplete={handleThreeSecondBurstGoldIntroComplete} />;
    }
    return <ThreeSecondBurstGold />;
  }

  if (challengeId === 'forensics-4') {
    // Check if tutorial should be shown
    const showTutorial = !localStorage.getItem('needleInTheLogPlatinumIntroShown') || location.search.includes('showTutorial=true');
    if (showTutorial) {
      return <NeedleInTheLogPlatinumIntro onComplete={handleNeedleInTheLogPlatinumIntroComplete} />;
    }
    return <NeedleInTheLogPlatinum />;
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
          <WhisperOneChallenge />
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
          <LayeredCry />
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
          <MirrorBlock />
        </div>
      );
    case 'crypto-4':
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
          <EchoPad />
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
    case 'forensics-2':
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
          <FalseTrackSilver />
        </div>
      );
    case 'forensics-3':
      return <ThreeSecondBurstGold />;
    case 'forensics-4':
      return <NeedleInTheLogPlatinum />;
    default:
      return <div className="text-white p-6">Unknown challenge: {challengeId}</div>;
  }
};

export default ChallengesPage;
