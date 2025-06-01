// User types
export type UserRole = 'jobseeker' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: string;
}

// Interview types
export type JobRole = 'software-engineer' | 'data-analyst' | 'product-manager' | 'ux-designer' | 'marketing-specialist';

export type InterviewDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type InterviewMode = 'video' | 'audio' | 'text';

export interface InterviewQuestion {
  id: string;
  jobRole: JobRole;
  difficulty: InterviewDifficulty;
  question: string;
  category: string;
  expectedDuration?: number; // in seconds
}

export interface InterviewSession {
  id: string;
  userId: string;
  jobRole: JobRole;
  difficulty: InterviewDifficulty;
  mode: InterviewMode;
  startedAt: string;
  endedAt?: string;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  overallScore?: InterviewScore;
}

export interface InterviewResponse {
  questionId: string;
  responseText?: string;
  responseVideoUrl?: string;
  responseAudioUrl?: string;
  duration: number; // in seconds
  score?: InterviewScore;
}

export interface InterviewScore {
  overall: number; // 0-100
  fluency: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  relevance: number; // 0-100
  feedback: string;
}

// Resume types
export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  parsedData?: ResumeParsedData;
}

export interface ResumeParsedData {
  name?: string;
  email?: string;
  phone?: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export interface ResumeExperience {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}