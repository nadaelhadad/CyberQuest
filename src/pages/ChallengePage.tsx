// File: pages/ChallengesPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CaesarChallenge from '../components/CaesarChallenge';
import Dock17Challenge from '../components/Dock17Challenge';
import LayeredCryChallenge from '../components/LayeredCryChallenge';
import OpeningScene from '../components/ui/OpeningScene';

const ChallengesPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [showOpeningScene, setShowOpeningScene] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check for opening scene state on every render
    const shouldShowOpeningScene = challengeId === 'crypto-1' && 
      (localStorage.getItem('caesarIntroShown') !== 'true' || 
       new URLSearchParams(location.search).get('showIntro') === 'true');
    
    setShowOpeningScene(shouldShowOpeningScene);
  }, [challengeId, location.search]);

  if (!challengeId) return <div className="text-white p-6">No challenge selected.</div>;

  // Handle opening scene completion
  const handleOpeningSceneComplete = () => {
    localStorage.setItem('caesarIntroShown', 'true');
    setShowOpeningScene(false);
  };

  // Show opening scene for Caesar Challenge
  if (challengeId === 'crypto-1' && showOpeningScene) {
    return <OpeningScene onComplete={handleOpeningSceneComplete} />;
  }

  switch (challengeId) {
    case 'crypto-1':
      return <CaesarChallenge />;
    case 'crypto-2':
      return <Dock17Challenge />;
    case 'crypto-3':
      return <LayeredCryChallenge />;
    default:
      return <div className="text-white p-6">Unknown challenge: {challengeId}</div>;
  }
};

export default ChallengesPage;
