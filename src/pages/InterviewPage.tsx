import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import InterviewSetup from '../components/interviews/InterviewSetup';
import InterviewQuestion from '../components/interviews/InterviewQuestion';
import InterviewFeedback from '../components/interviews/InterviewFeedback';
import Button from '../components/ui/Button';
import {
  InterviewQuestion as IInterviewQuestion,
  InterviewScore,
  JobRole,
  InterviewDifficulty,
  InterviewMode
} from '../types';
import { getQuestionsForInterview } from '../data/mockData';

type InterviewStage = 'setup' | 'in-progress' | 'feedback';

interface InterviewPageProps {
  navigate: (path: string) => void;
}

const InterviewPage: React.FC<InterviewPageProps> = ({ navigate }) => {
  const [stage, setStage] = useState<InterviewStage>('setup');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<IInterviewQuestion[]>([]);
  const [responses, setResponses] = useState<{ questionId: string; text?: string; duration: number }[]>([]);
  const [interviewSettings, setInterviewSettings] = useState<{
    jobRole: JobRole;
    difficulty: InterviewDifficulty;
    mode: InterviewMode;
  } | null>(null);

  const startInterview = (settings: {
    jobRole: JobRole;
    difficulty: InterviewDifficulty;
    mode: InterviewMode;
  }) => {
    const selectedQuestions = getQuestionsForInterview(settings.jobRole, settings.difficulty, 5);
    setQuestions(selectedQuestions);
    setInterviewSettings(settings);
    setStage('in-progress');
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const handleQuestionComplete = (response: { text?: string; duration: number }) => {
    const currentQuestion = questions[currentQuestionIndex];

    setResponses([...responses, {
      questionId: currentQuestion.id,
      ...response
    }]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage('feedback');
    }
  };

  const handleFinishInterview = () => {
    navigate('/dashboard');
  };

  const handleStartNewInterview = () => {
    setStage('setup');
  };

  const mockScore: InterviewScore = {
    overall: 85,
    fluency: 80,
    clarity: 90,
    confidence: 85,
    relevance: 90,
    feedback:
      "Great job! Your responses were clear and well-structured. You demonstrated strong technical knowledge and professional experience. To improve further, try to provide more specific examples with measurable outcomes. Also, consider practicing your responses to be more concise while still being comprehensive."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            {stage === 'setup' ? (
              <h1 className="text-3xl font-bold text-gray-900">Practice Interview</h1>
            ) : stage === 'in-progress' ? (
              <div className="flex items-center justify-between">
                <div>
                  <Button
                    variant="outline"
                    className="mb-2"
                    size="sm"
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={handleStartNewInterview}
                  >
                    Exit Interview
                  </Button>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h1>
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-sm">
                  <span className="font-medium">
                    {interviewSettings?.jobRole
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-600 capitalize">{interviewSettings?.difficulty}</span>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">Interview Feedback</h1>
            )}
          </div>

          <div className="mb-12">
            {stage === 'setup' && (
              <InterviewSetup onStartInterview={startInterview} />
            )}

            {stage === 'in-progress' && interviewSettings && (
              <InterviewQuestion
                question={questions[currentQuestionIndex]}
                mode={interviewSettings.mode}
                onComplete={handleQuestionComplete}
                isLast={currentQuestionIndex === questions.length - 1}
              />
            )}

            {stage === 'feedback' && (
              <InterviewFeedback
                score={mockScore}
                onFinish={handleFinishInterview}
                onStartNew={handleStartNewInterview}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InterviewPage;
