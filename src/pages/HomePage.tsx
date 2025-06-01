import React from 'react';
import { Play, Award, BarChart2, FileText, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in">
                  Ace Your Next Job Interview
                </h1>
                <p className="text-lg mb-8 text-white/90 animate-slide-up">
                  Practice with AI-powered mock interviews, receive real-time feedback, and track your progress to land your dream job.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
                  <Button 
                    className="bg-white text-primary hover:bg-gray-100"
                    leftIcon={<Play size={16} />}
                  >
                    Start Practicing
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl"></div>
                <img 
                  src="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Interview preparation" 
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Our platform provides a complete interview preparation experience that helps you build confidence and improve your skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <Play size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practice Interviews</h3>
                <p className="text-gray-600 mb-4">
                  Choose from various job roles and difficulty levels to simulate real interview experiences.
                </p>
                <a href="/interviews" className="text-primary font-medium flex items-center hover:underline">
                  Try it now <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get AI Feedback</h3>
                <p className="text-gray-600 mb-4">
                  Receive personalized feedback on your responses, including clarity, confidence, and relevance scores.
                </p>
                <a href="/dashboard" className="text-primary font-medium flex items-center hover:underline">
                  View demo <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                  <BarChart2 size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600 mb-4">
                  Monitor your improvement over time with detailed analytics and performance insights.
                </p>
                <a href="/dashboard" className="text-primary font-medium flex items-center hover:underline">
                  See analytics <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resume Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Resume analysis" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="order-1 md:order-2">
                <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mb-6">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Resume Analysis</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Upload your resume to receive personalized interview questions based on your experience and skills. Our AI analyzes your resume to identify strengths and potential areas for improvement.
                </p>
                <Button leftIcon={<FileText size={16} />}>
                  Upload Your Resume
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Hear from users who improved their interview skills and landed their dream jobs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-4">
                    JS
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica S.</h4>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "After using InterviewPro for just two weeks, I felt so much more confident in my technical interviews. The AI feedback helped me improve my communication skills, and I landed a job at a top tech company!"
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg mr-4">
                    MJ
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael J.</h4>
                    <p className="text-sm text-gray-500">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The customized questions based on my resume were spot on! Many of the questions I practiced with on InterviewPro came up during my actual interviews. Couldn't have prepared better!"
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg mr-4">
                    AT
                  </div>
                  <div>
                    <h4 className="font-semibold">Aisha T.</h4>
                    <p className="text-sm text-gray-500">Data Analyst</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As someone who gets nervous during interviews, the practice sessions helped me overcome my anxiety. The feedback on my speech patterns was invaluable. Thank you InterviewPro!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-secondary-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Start practicing today and gain the confidence you need to succeed in your job interviews.
            </p>
            <Button 
              className="bg-white text-secondary hover:bg-gray-100 px-8 py-3"
              size="lg"
            >
              Get Started For Free
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;