import React from 'react';
import { Trophy, BarChart2, Home, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InterviewScore } from '../../types';

interface InterviewFeedbackProps {
  score: InterviewScore;
  onFinish: () => void;
  onStartNew: () => void;
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({
  score,
  onFinish,
  onStartNew,
}) => {
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-success';
    if (value >= 70) return 'text-accent';
    if (value >= 50) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-success';
    if (value >= 70) return 'bg-accent';
    if (value >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const ScoreBar = ({ label, value }: { label: string; value: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-medium ${getScoreColor(value)}`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getProgressColor(value)}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Trophy size={32} />
          </div>
          <h2 className="text-2xl font-bold">Interview Completed!</h2>
          <p className="text-gray-600 mt-2">
            Great job! Here's your personalized feedback.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 size={20} className="mr-2 text-primary" />
            Performance Metrics
          </h3>
          <ScoreBar label="Overall Score" value={score.overall} />
          <ScoreBar label="Fluency" value={score.fluency} />
          <ScoreBar label="Clarity" value={score.clarity} />
          <ScoreBar label="Confidence" value={score.confidence} />
          <ScoreBar label="Relevance" value={score.relevance} />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Detailed Feedback</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700">{score.feedback}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onFinish}
            variant="outline"
            className="flex-1"
            leftIcon={<Home size={16} />}
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={onStartNew}
            className="flex-1"
            leftIcon={<RefreshCw size={16} />}
          >
            Practice Again
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InterviewFeedback;