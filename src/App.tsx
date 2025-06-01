import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import InterviewPage from './pages/InterviewPage';
import ResumePage from './pages/ResumePage';
import ForumPage from './pages/ForumPage';
import AuthPage from './pages/AuthPage';

// Simple routing without using React Router
type Route = 'home' | 'dashboard' | 'interviews' | 'resume' | 'forum' | 'login' | 'register';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');

  // Initialize route based on current URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        setCurrentRoute('home');
        break;
      case '/dashboard':
        setCurrentRoute('dashboard');
        break;
      case '/interviews':
        setCurrentRoute('interviews');
        break;
      case '/resume':
        setCurrentRoute('resume');
        break;
      case '/forum':
        setCurrentRoute('forum');
        break;
      case '/login':
        setCurrentRoute('login');
        break;
      case '/register':
        setCurrentRoute('register');
        break;
      default:
        setCurrentRoute('home');
    }
  }, []);

  // Navigation function to update both the UI state and browser URL
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    
    switch (path) {
      case '/':
        setCurrentRoute('home');
        break;
      case '/dashboard':
        setCurrentRoute('dashboard');
        break;
      case '/interviews':
        setCurrentRoute('interviews');
        break;
      case '/resume':
        setCurrentRoute('resume');
        break;
      case '/forum':
        setCurrentRoute('forum');
        break;
      case '/login':
        setCurrentRoute('login');
        break;
      case '/register':
        setCurrentRoute('register');
        break;
      default:
        setCurrentRoute('home');
    }
  };

  // Listen for popstate events (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      
      switch (path) {
        case '/':
          setCurrentRoute('home');
          break;
        case '/dashboard':
          setCurrentRoute('dashboard');
          break;
        case '/interviews':
          setCurrentRoute('interviews');
          break;
        case '/resume':
          setCurrentRoute('resume');
          break;
        case '/forum':
          setCurrentRoute('forum');
          break;
        case '/login':
          setCurrentRoute('login');
          break;
        case '/register':
          setCurrentRoute('register');
          break;
        default:
          setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <AuthProvider>
      {currentRoute === 'home' && <HomePage navigate={navigate} />}
      {currentRoute === 'dashboard' && <DashboardPage navigate={navigate} />}
      {currentRoute === 'interviews' && <InterviewPage navigate={navigate} />}
      {currentRoute === 'resume' && <ResumePage navigate={navigate} />}
      {currentRoute === 'forum' && <ForumPage />}
      {(currentRoute === 'login' || currentRoute === 'register') && <AuthPage navigate={navigate} />}
    </AuthProvider>
  );
};

export default App;