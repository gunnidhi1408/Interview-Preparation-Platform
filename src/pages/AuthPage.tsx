import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Interview preparation" 
                  className="relative rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {mode === 'login' ? 'Welcome Back!' : 'Join InterviewPro Today'}
                </h2>
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? 'Sign in to access your personalized interview practice sessions.' 
                    : 'Create an account to start practicing interviews and improve your chances of landing your dream job.'}
                </p>
              </div>
            </div>
            
            <div>
              {mode === 'login' ? <LoginForm /> : <RegisterForm />}
              
              <div className="mt-8 text-center md:hidden">
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? "Don't have an account?" 
                    : "Already have an account?"}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="ml-2 text-primary font-medium hover:underline"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;