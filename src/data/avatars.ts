export interface AvatarOption {
  id: string;
  name: string;
  image: string;
  description: string;
  gender: 'male' | 'female' | 'non-binary';
  style: {
    hair: string;
    clothing: string;
    accessories?: string[];
  };
  personality: string[];
  requiredPoints: number;
  isLocked: boolean;
}

// Function to check if an avatar is unlocked based on score
export const isAvatarUnlocked = (avatar: AvatarOption, score: number): boolean => {
  return score >= avatar.requiredPoints;
};

export const avatarOptions: AvatarOption[] = [
  {
    id: 'cyber-ninja',
    name: 'Cyber Ninja',
    image: 'public/avatars/cyber-ninja.png',
    description: 'A stealthy hacker who moves through the digital shadows',
    gender: 'male',
    style: {
      hair: 'Short, spiked with neon highlights',
      clothing: 'Dark tech-wear with glowing accents',
      accessories: ['Cybernetic visor', 'Stealth gloves']
    },
    personality: ['Strategic', 'Mysterious', 'Precise'],
    requiredPoints: 0,
    isLocked: false
  },
  {
    id: 'quantum-mage',
    name: 'Quantum Mage',
    image: 'public/avatars/quantum-mage.png',
    description: 'A master of quantum computing and encryption',
    gender: 'female',
    style: {
      hair: 'Long, flowing with holographic strands',
      clothing: 'Futuristic robe with circuit patterns',
      accessories: ['Quantum crystal pendant', 'Holographic staff']
    },
    personality: ['Intellectual', 'Creative', 'Intuitive'],
    requiredPoints: 0,
    isLocked: false
  },
  {
    id: 'neural-hunter',
    name: 'Neural Hunter',
    image: 'public/avatars/neural-hunter.png',
    description: 'An expert in neural networks and AI systems',
    gender: 'non-binary',
    style: {
      hair: 'Medium length with geometric patterns',
      clothing: 'Smart fabric jumpsuit with neural interface',
      accessories: ['Neural link implant', 'AI companion drone']
    },
    personality: ['Analytical', 'Adaptable', 'Innovative'],
    requiredPoints: 150,
    isLocked: true
  },
  {
    id: 'crypto-sage',
    name: 'Crypto Sage',
    image: 'public/avatars/crypto-sage.png',
    description: 'A master of cryptography and blockchain technology',
    gender: 'male',
    style: {
      hair: 'Bald with glowing circuit tattoos',
      clothing: 'Minimalist tech-wear with encryption symbols',
      accessories: ['Smart glasses', 'Crypto key necklace']
    },
    personality: ['Methodical', 'Patient', 'Wise'],
    requiredPoints: 500,
    isLocked: true
  },
  {
    id: 'binary-warrior',
    name: 'Binary Warrior',
    image: 'public/avatars/binary-warrior.png',
    description: 'A fierce defender of digital rights and freedom',
    gender: 'female',
    style: {
      hair: 'Braided with data stream effects',
      clothing: 'Armored tech-suit with binary patterns',
      accessories: ['Shield generator', 'Combat visor']
    },
    personality: ['Brave', 'Determined', 'Protective'],
    requiredPoints: 1000,
    isLocked: true
  },
  {
    id: 'data-druid',
    name: 'Data Druid',
    image: 'public/avatars/data-druid.png',
    description: 'A guardian of data and information flow',
    gender: 'non-binary',
    style: {
      hair: 'Wild with data particle effects',
      clothing: 'Organic-tech hybrid outfit',
      accessories: ['Data crystal staff', 'Nature-tech amulet']
    },
    personality: ['Balanced', 'Harmonious', 'Guardian'],
    requiredPoints: 2000,
    isLocked: true
  }
];

export const defaultAvatar = avatarOptions[0]; 