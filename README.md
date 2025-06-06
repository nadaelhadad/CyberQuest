# CyberQuest - Cyberpunk Cybersecurity Learning Platform 🔒

CyberQuest is an immersive, gamified cybersecurity learning platform set in a cyberpunk world. Master real-world security skills through interactive challenges and climb the global leaderboard.

## 🚀 Features

- **Interactive Challenges**: Progress through various cybersecurity categories
- **Real-time Scoring**: Earn points and track your progress
- **Immersive UI**: Cyberpunk-themed interface with animations
- **Profile System**: Customize your hacker identity
- **Global Leaderboard**: Compete with other security enthusiasts
- **Hint System**: Get help when stuck while managing your point balance

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nadaelhadad/CyberQuest.git
   cd yberQuest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   ```sql
   CREATE DATABASE cyberquest;
   ```

4. Update the PostgreSQL connection configuration at server.js:
   ```env
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'cyberquest',
      password: 'yourpostgresqlpassword',
      port: 5432, 
    });

   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🎮 Challenge Categories

- **Cryptography**: Master encryption and code-breaking
- **Web Exploitation**: Learn web security fundamentals
- **Digital Forensics**: Investigate digital evidence
- **Reverse Engineering**: Analyze and understand code

## 👾 Game Features

- Progressive difficulty levels
- Real-time scoring system
- Unlockable achievements
- Custom avatar system
- Interactive tutorials
- Hint system with point management

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- SQL injection protection
- XSS prevention

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
