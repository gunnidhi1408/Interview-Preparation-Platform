import React, { useState } from 'react';
import { Menu, X, User, LogOut, Bot, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import ChatBot from '../chat/ChatBot';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-primary mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 8h10M7 12h10M7 16h10" />
              </svg>
              <span className="text-xl font-bold text-primary">InterviewPro</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/interviews" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Interviews</a>
            <a href="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <a href="/resume" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Resume</a>
            <a href="/forum" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Forum</a>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  leftIcon={<Bot size={16} />}
                >
                  AI Assistant
                </Button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <User size={16} />
                    </div>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="py-1">
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                      <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <button 
                        onClick={logout} 
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  leftIcon={<Bot size={16} />}
                >
                  AI Assistant
                </Button>
                <a href="/login">
                  <Button variant="outline">Log in</Button>
                </a>
                <a href="/register">
                  <Button>Sign up</Button>
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Home</a>
            <a href="/interviews" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Interviews</a>
            <a href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Dashboard</a>
            <a href="/resume" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Resume</a>
            <a href="/forum" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Forum</a>
            <Button
              variant="outline"
              onClick={() => setIsChatOpen(!isChatOpen)}
              leftIcon={<Bot size={16} />}
              className="w-full"
            >
              AI Assistant
            </Button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <a href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Profile</a>
                <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100">Settings</a>
                <button 
                  onClick={logout} 
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-5 py-4 flex flex-col space-y-3">
                <a href="/login">
                  <Button variant="outline" className="w-full">Log in</Button>
                </a>
                <a href="/register">
                  <Button className="w-full">Sign up</Button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsChatOpen(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
              <ChatBot onClose={() => setIsChatOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;