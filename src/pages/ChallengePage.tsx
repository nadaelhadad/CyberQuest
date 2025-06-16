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
import CookieUpgradeChallenge from '../components/CookieUpgradeChallenge';
import CookieUpgradeIntro from '../components/ui/CookieUpgradeIntro';
import { useGameStore } from '../store/gameStore';
import HiddenShellChallenge from '../components/HiddenShellChallenge';
import HiddenShellIntro from '../components/ui/HiddenShellIntro';
import NumberSongChallenge from '../components/NumberSongChallenge';
import NumberSongIntro from '../components/ui/NumberSongIntro';
import OpeningScene from '../components/ui/OpeningScene';

const ChallengesPage = () => {
  // Support both { categoryId, id } and { challengeId } params for backward compatibility
  const params = useParams();
  const categoryId = params.categoryId;
  const id = params.id;
  const challengeId = params.challengeId;
  const [showCaesarIntro, setShowCaesarIntro] = useState(false);
  const [showDock17Intro, setShowDock17Intro] = useState(false);
  const [showLayeredCryIntro, setShowLayeredCryIntro] = useState(false);
  const [showPlainTokenIntro, setShowPlainTokenIntro] = useState(false);
  const [showCommentDoorIntro, setShowCommentDoorIntro] = useState(false);
  const [showForgottenSelfieIntro, setShowForgottenSelfieIntro] = useState(false);
  const [showZipLesson, setShowZipLesson] = useState(false);
  const [showCookieUpgradeIntro, setShowCookieUpgradeIntro] = useState(false);
  const [showHiddenShellIntro, setShowHiddenShellIntro] = useState(false);
  const [showNumberSongIntro, setShowNumberSongIntro] = useState(false);
  const [showOpeningScene, setShowOpeningScene] = useState(false);
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
    localStorage.removeItem('cookieUpgradeIntroShown');
    localStorage.removeItem('hiddenShellIntroShown');
    localStorage.removeItem('numberSongIntroShown');
    window.location.reload();
  };

  // Force show tutorials for testing - remove this later
  const forceShowTutorials = () => {
    localStorage.removeItem('caesarIntroShown');
    localStorage.removeItem('plainTokenIntroShown');
    localStorage.removeItem('forgottenSelfieIntroShown');
    localStorage.removeItem('dock17IntroShown');
    localStorage.removeItem('layeredCryIntroShown');
    localStorage.removeItem('commentDoorIntroShown');
    localStorage.removeItem('zipLessonShown');
    localStorage.removeItem('cookieUpgradeIntroShown');
    localStorage.removeItem('hiddenShellIntroShown');
    localStorage.removeItem('numberSongIntroShown');
    window.location.reload();
  };

  useEffect(() => {
    // Check for tutorial state on every render
    const shouldShowCaesarIntro = (categoryId === 'crypto-1' || challengeId === 'crypto-1') && 
      (localStorage.getItem('caesarIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');
    
    const shouldShowDock17Intro = (categoryId === 'crypto-2' || challengeId === 'crypto-2') && 
      (localStorage.getItem('layeredCryIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowLayeredCryIntro = (categoryId === 'crypto-3' || challengeId === 'crypto-3') && 
      (localStorage.getItem('layeredCryIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowPlainTokenIntro = (categoryId === 'reversing' && id === 'reversing-1') || challengeId === 'reversing-1';

    const shouldShowCommentDoorIntro = (categoryId === 'web-1' || challengeId === 'web-1') &&
      (localStorage.getItem('commentDoorIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowForgottenSelfieIntro = (categoryId === 'forensics-1' || challengeId === 'forensics-1') &&
      (localStorage.getItem('forgottenSelfieIntroShown') !== 'true' ||
       new URLSearchParams(location.search).get('showIntro') === 'true');

    const shouldShowZipLesson = (categoryId === 'reversing' && id === 'reversing-2') || challengeId === 'reversing-2';

    const shouldShowCookieUpgradeIntro = (categoryId === 'web' && id === 'web-2') || challengeId === 'web-2';

    // Always show HiddenShellIntro for this challenge
    const shouldShowHiddenShellIntro = (categoryId === 'reversing' && id === 'reversing-3') || challengeId === 'reversing-3';

    // Always show NumberSongIntro for this challenge
    const shouldShowNumberSongIntro = (categoryId === 'reversing' && id === 'reversing-4') || challengeId === 'reversing-4';

    // Opening scene for Caesar
    const shouldShowOpeningScene = (challengeId === 'crypto-1') && 
      (localStorage.getItem('caesarIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');

    setShowCaesarIntro(shouldShowCaesarIntro);
    setShowDock17Intro(shouldShowDock17Intro);
    setShowLayeredCryIntro(shouldShowLayeredCryIntro);
    setShowPlainTokenIntro(shouldShowPlainTokenIntro);
    setShowCommentDoorIntro(shouldShowCommentDoorIntro);
    setShowForgottenSelfieIntro(shouldShowForgottenSelfieIntro);
    setShowZipLesson(shouldShowZipLesson);
    setShowCookieUpgradeIntro(shouldShowCookieUpgradeIntro);
    setShowHiddenShellIntro(shouldShowHiddenShellIntro);
    setShowNumberSongIntro(shouldShowNumberSongIntro);
    setShowOpeningScene(shouldShowOpeningScene);
  }, [categoryId, id, challengeId, location.pathname, location.search]);

  // Find the challenge from categories
  const { categories, setCurrentChallenge } = useGameStore();
  const category = categories.find((cat: any) => cat.id === (categoryId || (challengeId && challengeId.split('-')[0])));
  const challenge = category?.challenges.find((ch: any) => ch.id === (id || challengeId));
  useEffect(() => {
    if (challenge) setCurrentChallenge(challenge.id);
  }, [challenge, setCurrentChallenge]);
  if (!challenge) return <div className="text-white p-6">Challenge not found.</div>;

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
    setShowZipLesson(false);
  };

  const handleCookieUpgradeIntroComplete = () => {
    setShowCookieUpgradeIntro(false);
  };

  const handleHiddenShellIntroComplete = () => {
    setShowHiddenShellIntro(false);
  };

  const handleNumberSongIntroComplete = () => {
    setShowNumberSongIntro(false);
  };

  const handleOpeningSceneComplete = () => {
    localStorage.setItem('caesarIntroShown', 'true');
    setShowOpeningScene(false);
  };

  // Show opening scene for Caesar Challenge
  if (challengeId === 'crypto-1' && showOpeningScene) {
    return <OpeningScene onComplete={handleOpeningSceneComplete} />;
  }

  // Show tutorials for each challenge
  if ((categoryId === 'crypto-1' || challengeId === 'crypto-1') && showCaesarIntro) {
    return <CaesarIntro onComplete={handleCaesarIntroComplete} />;
  }

  if ((categoryId === 'crypto-2' || challengeId === 'crypto-2') && showDock17Intro) {
    return <Dock17Intro onComplete={handleDock17IntroComplete} />;
  }

  if ((categoryId === 'crypto-3' || challengeId === 'crypto-3') && showLayeredCryIntro) {
    return <LayeredCryIntro onComplete={handleLayeredCryIntroComplete} />;
  }

  if (((categoryId === 'reversing' && id === 'reversing-1') || challengeId === 'reversing-1') && showPlainTokenIntro) {
    return <PlainTokenIntro onComplete={handlePlainTokenIntroComplete} />;
  }

  if ((categoryId === 'web-1' || challengeId === 'web-1') && showCommentDoorIntro) {
    return <CommentDoorIntro onComplete={handleCommentDoorIntroComplete} />;
  }

  if ((categoryId === 'forensics-1' || challengeId === 'forensics-1') && showForgottenSelfieIntro) {
    return <ForgottenSelfieIntro onComplete={handleForgottenSelfieIntroComplete} />;
  }

  if (((categoryId === 'web' && id === 'web-2') || challengeId === 'web-2') && showCookieUpgradeIntro) {
    return <CookieUpgradeIntro onComplete={handleCookieUpgradeIntroComplete} />;
  }

  if (((categoryId === 'reversing' && id === 'reversing-2') || challengeId === 'reversing-2') && showZipLesson) {
    return <ZipMiniLessonScene onStart={handleZipLessonComplete} />;
  }

  if (((categoryId === 'reversing' && id === 'reversing-3') || challengeId === 'reversing-3')) {
    return (
      <>
        {showHiddenShellIntro ? (
          <HiddenShellIntro onComplete={handleHiddenShellIntroComplete} />
        ) : (
          <HiddenShellChallenge />
        )}
      </>
    );
  }

  if (((categoryId === 'reversing' && id === 'reversing-4') || challengeId === 'reversing-4')) {
    return (
      <>
        {showNumberSongIntro ? (
          <NumberSongIntro onComplete={handleNumberSongIntroComplete} />
        ) : (
          <NumberSongChallenge />
        )}
      </>
    );
  }

  // Switch statement for all 13 challenges
  switch (id || challengeId) {
    case 'crypto-1':
      return <CaesarChallenge />;
    case 'crypto-2':
      return <Dock17Challenge />;
    case 'crypto-3':
      return <LayeredCryChallenge />;
    case 'reversing-1':
      return <PlainTokenChallenge />;
    case 'reversing-2':
      return <WeakZipChallenge />;
    case 'reversing-3':
      return <HiddenShellChallenge />;
    case 'reversing-4':
      return <NumberSongChallenge />;
    case 'web-1':
      return <CommentDoorChallenge />;
    case 'web-2':
      return <CookieUpgradeChallenge />;
    case 'forensics-1':
      return <ForgottenSelfieChallenge />;
    // Add other challenge cases as needed for all 13
    default:
      return <div className="text-white p-6">Unknown challenge: {id || challengeId}</div>;
  }
};

export default ChallengesPage;
