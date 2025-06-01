import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PerformanceStats from '../components/dashboard/PerformanceStats';
import RecentInterviews from '../components/dashboard/RecentInterviews';
import SkillsRadarChart from '../components/dashboard/SkillsRadarChart';
import Certifications from '../components/dashboard/Certifications';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ChevronRight, Calendar, BookOpen } from 'lucide-react';
import { mockSession } from '../data/mockData';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Track your progress and performance
              </p>
            </div>
            <div>
              <Button>New Interview</Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <PerformanceStats />
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <RecentInterviews sessions={[mockSession]} />
            </div>
            
            <div>
              <SkillsRadarChart />
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-8">
            <Certifications />
          </div>
          
          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Upcoming Interviews</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Scheduled practice sessions
                  </p>
                </div>
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <Calendar size={20} />
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">Thursday, June 8, 2023</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Mock Software Engineering Interview</h4>
                    <p className="text-sm text-gray-600">Advanced Difficulty • 10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline">Prepare</Button>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">Monday, June 12, 2023</p>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Frontend Developer Interview</h4>
                    <p className="text-sm text-gray-600">Intermediate Difficulty • 2:30 PM</p>
                  </div>
                  <Button size="sm" variant="outline">Prepare</Button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href="/scheduled-interviews" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block w-full"
                >
                  <Button variant="outline" className="w-full" rightIcon={<ChevronRight size={16} />}>
                    View All Scheduled Interviews
                  </Button>
                </a>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Learning Resources</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Recommended articles and videos
                  </p>
                </div>
                <div className="bg-accent/10 text-accent rounded-full p-3">
                  <BookOpen size={20} />
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-gray-500 text-xs font-semibold">ARTICLE</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-primary">How to Answer the "Tell Me About Yourself" Question</h4>
                    <p className="text-sm text-gray-500 mt-1">5 min read</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-gray-500 text-xs font-semibold">VIDEO</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-primary">Top 10 Behavioral Interview Questions and Answers</h4>
                    <p className="text-sm text-gray-500 mt-1">15 min video</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-gray-500 text-xs font-semibold">ARTICLE</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-primary">Answering Technical Questions: Tips and Strategies</h4>
                    <p className="text-sm text-gray-500 mt-1">8 min read</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 text-center">
                <a 
                  href="/resources" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block w-full"
                >
                  <Button variant="outline" className="w-full" rightIcon={<ChevronRight size={16} />}>
                    Browse All Resources
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;