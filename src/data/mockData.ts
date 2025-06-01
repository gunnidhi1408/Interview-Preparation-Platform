import { InterviewQuestion, JobRole, InterviewDifficulty, InterviewSession } from '../types';

export const mockQuestions: InterviewQuestion[] = [
  {
    id: '1',
    jobRole: 'software-engineer',
    difficulty: 'intermediate',
    question: 'Can you explain the difference between asynchronous and synchronous programming?',
    category: 'Technical',
    expectedDuration: 120,
  },
  {
    id: '2',
    jobRole: 'software-engineer',
    difficulty: 'intermediate',
    question: 'Describe a challenging project you worked on and how you overcame obstacles.',
    category: 'Behavioral',
    expectedDuration: 180,
  },
  {
    id: '3',
    jobRole: 'software-engineer',
    difficulty: 'advanced',
    question: 'How would you design a scalable system for handling millions of concurrent users?',
    category: 'System Design',
    expectedDuration: 240,
  },
  {
    id: '4',
    jobRole: 'data-analyst',
    difficulty: 'intermediate',
    question: 'Explain how you would approach cleaning and preprocessing a dataset with missing values.',
    category: 'Technical',
    expectedDuration: 150,
  },
  {
    id: '5',
    jobRole: 'data-analyst',
    difficulty: 'intermediate',
    question: 'Describe a time when you had to present complex data insights to non-technical stakeholders.',
    category: 'Behavioral',
    expectedDuration: 180,
  },
  {
    id: '6',
    jobRole: 'product-manager',
    difficulty: 'intermediate',
    question: 'How do you prioritize features in a product backlog?',
    category: 'Product Strategy',
    expectedDuration: 180,
  },
  {
    id: '7',
    jobRole: 'product-manager',
    difficulty: 'advanced',
    question: 'Describe how you would validate a new product idea before investing resources in development.',
    category: 'Product Strategy',
    expectedDuration: 210,
  },
  {
    id: '8',
    jobRole: 'ux-designer',
    difficulty: 'intermediate',
    question: 'Walk me through your design process from requirement gathering to final deliverables.',
    category: 'Process',
    expectedDuration: 180,
  },
  {
    id: '9',
    jobRole: 'ux-designer',
    difficulty: 'intermediate',
    question: 'How do you incorporate user feedback into your designs?',
    category: 'User Research',
    expectedDuration: 150,
  },
  {
    id: '10',
    jobRole: 'marketing-specialist',
    difficulty: 'intermediate',
    question: 'Describe a successful marketing campaign you planned and executed. What metrics did you use to measure success?',
    category: 'Strategy',
    expectedDuration: 180,
  },
];

export const getQuestionsForInterview = (
  jobRole: JobRole,
  difficulty: InterviewDifficulty,
  count: number = 5
): InterviewQuestion[] => {
  const filteredQuestions = mockQuestions.filter(
    q => q.jobRole === jobRole && q.difficulty === difficulty
  );
  
  // If not enough questions with exact match, include other difficulties
  let questions = filteredQuestions.length >= count 
    ? filteredQuestions 
    : mockQuestions.filter(q => q.jobRole === jobRole);
  
  // Shuffle array to get random questions
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  
  // Return desired number of questions
  return shuffled.slice(0, count);
};

export const mockSession: InterviewSession = {
  id: 'session-1',
  userId: '1',
  jobRole: 'software-engineer',
  difficulty: 'intermediate',
  mode: 'video',
  startedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  endedAt: new Date().toISOString(),
  questions: mockQuestions.slice(0, 5),
  responses: [
    {
      questionId: '1',
      responseText: 'Asynchronous programming allows operations to run in parallel without blocking the main thread...',
      duration: 115,
      score: {
        overall: 85,
        fluency: 80,
        clarity: 90,
        confidence: 85,
        relevance: 85,
        feedback: 'Good technical explanation with clear examples. Could improve by mentioning more real-world scenarios.',
      }
    },
    {
      questionId: '2',
      responseText: 'In my previous role, I faced a challenging project where we had to migrate a legacy system...',
      duration: 175,
      score: {
        overall: 90,
        fluency: 85,
        clarity: 90,
        confidence: 95,
        relevance: 90,
        feedback: 'Excellent response that clearly demonstrates problem-solving abilities and leadership.',
      }
    },
  ],
  overallScore: {
    overall: 88,
    fluency: 83,
    clarity: 90,
    confidence: 90,
    relevance: 88,
    feedback: 'Strong performance overall. You demonstrated good technical knowledge and communication skills. Consider providing more specific metrics to quantify your achievements.',
  }
};

export const jobRoles: {id: JobRole; label: string}[] = [
  { id: 'software-engineer', label: 'Software Engineer' },
  { id: 'data-analyst', label: 'Data Analyst' },
  { id: 'product-manager', label: 'Product Manager' },
  { id: 'ux-designer', label: 'UX Designer' },
  { id: 'marketing-specialist', label: 'Marketing Specialist' },
];

export const difficulties: {id: InterviewDifficulty; label: string}[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export const interviewModes: {id: string; label: string}[] = [
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio Only' },
  { id: 'text', label: 'Text' },
];