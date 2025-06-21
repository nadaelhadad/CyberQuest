import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Define routes where Navbar should be shown
  const showNavbarRoutes = [
    '/',
    '/map',
    '/leaderboard',
    '/challenge',
    '/profile'
  ];

  // Define routes where Footer should be shown
  const showFooterRoutes = [
    '/',
    '/leaderboard',
    '/login',
    '/register'
  ];

  // Check if current route should show Navbar
  const shouldShowNavbar = showNavbarRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if current route should show Footer
  const shouldShowFooter = showFooterRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout; 