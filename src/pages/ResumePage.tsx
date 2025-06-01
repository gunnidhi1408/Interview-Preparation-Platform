import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ResumeUpload from '../components/resume/ResumeUpload';
import Card from '../components/ui/Card';

const ResumePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Manager</h1>
            <p className="text-gray-600 mt-1">
              Upload and manage your resume to personalize your interview experience
            </p>
          </div>
          
          <div className="mb-12">
            <ResumeUpload />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-bold mb-4">Resume Analysis</h2>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your resume to identify strengths and areas for improvement.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <h3 className="font-medium mb-3">Key Skills Identified</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">React</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">JavaScript</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">TypeScript</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Node.js</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Express</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">MongoDB</span>
                </div>
                
                <h3 className="font-medium mb-3">Experience Highlights</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>3 years of experience with React.js and front-end development</li>
                  <li>Led a team of 5 developers on a major project</li>
                  <li>Experience with CI/CD pipelines and deployment</li>
                </ul>
                
                <h3 className="font-medium mb-3">Suggestions</h3>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">⚠️</span>
                    <span>Consider adding more quantifiable achievements to your work experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">⚠️</span>
                    <span>Your resume could benefit from more emphasis on leadership experiences</span>
                  </li>
                </ul>
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-bold mb-4">Interview Customization</h2>
              <p className="text-gray-600 mb-6">
                Based on your resume, we've personalized interview questions for you.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-medium">Technical Question</h3>
                  <p className="text-gray-700">
                    "You mentioned React.js experience on your resume. Can you explain the concept of React hooks and when you'd use them?"
                  </p>
                </div>
                
                <div className="border-l-4 border-secondary pl-4 py-2">
                  <h3 className="font-medium">Leadership Question</h3>
                  <p className="text-gray-700">
                    "You led a team of 5 developers on a project. Describe how you handled conflicts within the team."
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-4 py-2">
                  <h3 className="font-medium">Problem-Solving Question</h3>
                  <p className="text-gray-700">
                    "Based on your MongoDB experience, how would you design a database schema for a social media application?"
                  </p>
                </div>
                
                <div className="border-l-4 border-success pl-4 py-2">
                  <h3 className="font-medium">Project Question</h3>
                  <p className="text-gray-700">
                    "Tell me about your CI/CD experience mentioned on your resume. What tools did you use and what challenges did you face?"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumePage;