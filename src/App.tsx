import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import GameMapPage from './pages/GameMapPage';
import ChallengePage from './pages/ChallengePage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import GoldPage from './pages/GoldPage';

function App() {
  const location = useLocation();
  const { initializeAuth } = useAuthStore();
  
  // Initialize authentication state on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auth routes - redirect to map if already logged in */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute requireAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <GameMapPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenge/:categoryId/:id" 
          element={
            <ProtectedRoute>
              <ChallengePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/gold" 
          element={<GoldPage />} 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;