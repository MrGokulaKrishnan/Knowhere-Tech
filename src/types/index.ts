// ─────────────────────────────────────────────────────
// StackPath - Core TypeScript Types
// ─────────────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export type ModuleKey =
  | 'java' | 'oop' | 'advanced-java' | 'dsa' | 'sql'
  | 'html' | 'css' | 'javascript' | 'react'
  | 'spring' | 'spring-boot' | 'rest-api' | 'security'
  | 'linux' | 'networking' | 'git' | 'docker'
  | 'devops' | 'aws' | 'testing' | 'system-design'
  | 'projects' | 'interview';

export interface CodeLine {
  code: string;
  explanation: string;
  token?: string; // highlighted token
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'code-output' | 'bug-find' | 'match';
  question: string;
  code?: string;
  options?: string[];
  answer: string | number;
  explanation: string;
  points: number;
}

export interface PracticeTask {
  id: string;
  type: 'predict-output' | 'find-bug' | 'complete-method' | 'choose-correct' | 'explain';
  question: string;
  code?: string;
  answer: string;
  hint?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  level: Difficulty;
  answer: string;
  example?: string;
  followUp?: string;
}

export interface Lesson {
  id: string;
  moduleKey: ModuleKey;
  title: string;
  slug: string;
  difficulty: Difficulty;
  duration: number; // minutes
  order: number;
  prerequisites: string[];
  tags: string[];
  explanation: string;
  beginnerExplanation: string;
  technicalExplanation: string;
  keyPoints: string[];
  codeExample?: string;
  codeLanguage?: string;
  codeLines?: CodeLine[];
  visualizer?: string; // id of visualizer component to render
  quiz: QuizQuestion[];
  practice: PracticeTask[];
  interviewQuestions: InterviewQuestion[];
  resources?: { title: string; url: string }[];
  xpReward: number;
}

export interface Module {
  key: ModuleKey;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  color: string; // tailwind color class
  lessons: Lesson[];
  order: number;
}

export interface RoadmapNode {
  id: string;
  moduleKey: ModuleKey | 'start' | 'job-ready';
  title: string;
  icon: string;
  lessonCount: number;
  dependencies: string[]; // node ids
  position: { x: number; y: number };
}

// ─── Progress Types ───
export interface LessonProgress {
  lessonId: string;
  moduleKey: ModuleKey;
  status: LessonStatus;
  completedAt?: string;
  quizScore?: number;
  quizAttempts: number;
  timeSpent: number; // seconds
}

export interface ModuleProgress {
  moduleKey: ModuleKey;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lastAccessedLessonId?: string;
  lastAccessedAt?: string;
}

export interface UserProgress {
  userId: string; // local uuid, no auth
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  totalLessonsCompleted: number;
  badges: string[];
  modules: Record<string, ModuleProgress>;
  lessons: Record<string, LessonProgress>;
  settings: UserSettings;
  dailyGoalCompleted: number;
  dailyGoalTarget: number;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  reducedMotion: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  dailyGoal: number;
  language: 'en';
}

// ─── Badge Types ───
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// ─── Note Types ───
export interface Note {
  id: string;
  lessonId: string;
  moduleKey: ModuleKey;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Bookmark Types ───
export interface Bookmark {
  id: string;
  type: 'lesson' | 'interview' | 'project' | 'code';
  referenceId: string;
  title: string;
  moduleKey?: ModuleKey;
  createdAt: string;
}

// ─── Quiz History Types ───
export interface QuizAttempt {
  id: string;
  lessonId: string;
  score: number;
  maxScore: number;
  percentage: number;
  answers: Record<string, string | number>;
  completedAt: string;
}

// ─── Search Types ───
export interface SearchResult {
  type: 'lesson' | 'interview' | 'project' | 'topic';
  id: string;
  title: string;
  description: string;
  module?: string;
  url: string;
}

// ─── XP Level Types ───
export interface Level {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
}

// ─── Project Types ───
export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  techStack: string[];
  features: string[];
  architecture: string;
  apiDesign?: string[];
  dbSchema?: string;
  dockerSetup?: string;
  awsSetup?: string;
  xpReward: number;
}
