// File: pages/ChallengesPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CaesarChallenge from '../components/CaesarChallenge';
import Dock17Challenge from '../components/Dock17Challenge';

const ChallengesPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();

  if (!challengeId) return <div className="text-white p-6">No challenge selected.</div>;

  switch (challengeId) {
    case 'crypto-1':
      return <CaesarChallenge />;
    case 'crypto-2':
      return <Dock17Challenge />;
    default:
      return <div className="text-white p-6">Unknown challenge: {challengeId}</div>;
  }
};

export default ChallengesPage;
