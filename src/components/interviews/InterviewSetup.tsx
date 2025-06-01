import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { JobRole, InterviewDifficulty, InterviewMode } from '../../types';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Card from '../ui/Card';
import { jobRoles, difficulties, interviewModes } from '../../data/mockData';

interface InterviewSetupProps {
  onStartInterview: (settings: {
    jobRole: JobRole;
    difficulty: InterviewDifficulty;
    mode: InterviewMode;
  }) => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onStartInterview }) => {
  const [jobRole, setJobRole] = useState<JobRole | ''>('');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | ''>('');
  const [mode, setMode] = useState<InterviewMode | ''>('video');
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInterview = () => {
    if (!jobRole || !difficulty || !mode) {
      return;
    }

    setIsLoading(true);
    // Simulating loading state
    setTimeout(() => {
      onStartInterview({
        jobRole: jobRole as JobRole,
        difficulty: difficulty as InterviewDifficulty,
        mode: mode as InterviewMode,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Setup Your Interview</h2>
      <div className="space-y-6">
        <div>
          <Select
            label="Job Role"
            options={jobRoles}
            value={jobRole}
            onChange={setJobRole}
            helperText="Select the position you're applying for"
            required
          />
        </div>

        <div>
          <Select
            label="Difficulty Level"
            options={difficulties}
            value={difficulty}
            onChange={setDifficulty}
            helperText="Choose based on your experience level"
            required
          />
        </div>

        <div>
          <Select
            label="Interview Mode"
            options={interviewModes}
            value={mode}
            onChange={setMode}
            helperText="How would you like to respond to questions?"
            required
          />
        </div>

        <div className="pt-4">
          <Button
            onClick={handleStartInterview}
            className="w-full"
            disabled={!jobRole || !difficulty || !mode}
            isLoading={isLoading}
            leftIcon={<Play size={16} />}
          >
            Start Interview
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InterviewSetup;