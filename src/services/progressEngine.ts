// ─────────────────────────────────────────────────────
// Knowhere Tech - Progress Engine (XP, Levels, Streaks)
// ─────────────────────────────────────────────────────
import type { UserProgress, UserSettings, ModuleKey, Level, Badge } from '@/types';
import { saveProgress, loadProgress } from './db';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'kt-' + Math.random().toString(36).substring(2, 11);
}

// ─── XP Rewards ───
export const XP_REWARDS = {
  COMPLETE_LESSON: 20,
  FINISH_QUIZ: 30,
  PERFECT_QUIZ: 50,
  COMPLETE_PROJECT: 500,
  FIRST_LESSON_IN_MODULE: 10,
  DAILY_CHALLENGE: 40,
  STREAK_BONUS_7: 70,
  STREAK_BONUS_30: 300,
};

// ─── Level Thresholds ───
export const LEVELS: Level[] = [
  { level: 1, title: 'Novice Engineer',    minXP: 0,    maxXP: 200,   color: '#4B6352' },
  { level: 2, title: 'Java Developer',     minXP: 200,  maxXP: 600,   color: '#10B981' },
  { level: 3, title: 'Backend Engineer',   minXP: 600,  maxXP: 1200,  color: '#34D399' },
  { level: 4, title: 'Spring Architect',   minXP: 1200, maxXP: 2500,  color: '#14B8A6' },
  { level: 5, title: 'Full Stack Engineer',minXP: 2500, maxXP: 5000,  color: '#2DD4BF' },
  { level: 6, title: 'Cloud Architect',    minXP: 5000, maxXP: 10000, color: '#F59E0B' },
  { level: 7, title: 'Staff Engineer 2027',minXP: 10000,maxXP: 99999, color: '#10B981' },
];

export function getLevelFromXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getLevelProgress(xp: number): number {
  const lvl = getLevelFromXP(xp);
  const range = lvl.maxXP - lvl.minXP;
  const progress = xp - lvl.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}

// ─── Default Progress ───
const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  reducedMotion: false,
  fontSize: 'md',
  dailyGoal: 4,
  language: 'en',
};

export function createDefaultProgress(): UserProgress {
  return {
    userId: generateId(),
    xp: 0,
    level: 1,
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalLessonsCompleted: 0,
    badges: ['first-step'],
    modules: {},
    lessons: {},
    settings: DEFAULT_SETTINGS,
    dailyGoalCompleted: 0,
    dailyGoalTarget: 4,
  };
}

// ─── Progress Mutations ───
export function addXP(progress: UserProgress, amount: number): UserProgress {
  const newXP = (progress?.xp || 0) + amount;
  const newLevel = getLevelFromXP(newXP);
  return { ...progress, xp: newXP, level: newLevel.level };
}

export function markLessonComplete(
  progress: UserProgress,
  lessonId: string,
  moduleKey: ModuleKey,
  quizScore?: number,
): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lessonProgress = progress?.lessons?.[lessonId];
  if (lessonProgress?.status === 'completed') return progress;

  const updatedLessons = {
    ...(progress?.lessons || {}),
    [lessonId]: {
      lessonId,
      moduleKey,
      status: 'completed' as const,
      completedAt: new Date().toISOString(),
      quizScore,
      quizAttempts: (lessonProgress?.quizAttempts ?? 0) + 1,
      timeSpent: lessonProgress?.timeSpent ?? 0,
    },
  };

  const currentModule = progress?.modules?.[moduleKey] || { completedLessons: 0, totalLessons: 10, percentage: 0 };
  const updatedModules = {
    ...(progress?.modules || {}),
    [moduleKey]: {
      ...currentModule,
      moduleKey,
      completedLessons: currentModule.completedLessons + 1,
      percentage: Math.min(100, Math.round(((currentModule.completedLessons + 1) / (currentModule.totalLessons || 10)) * 100))
    }
  };

  let streak = progress?.streak || 1;
  if (progress?.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yd = yesterday.toISOString().split('T')[0];
    streak = progress?.lastActiveDate === yd ? streak + 1 : 1;
  }

  let updated: UserProgress = {
    ...progress,
    lessons: updatedLessons,
    modules: updatedModules,
    totalLessonsCompleted: (progress?.totalLessonsCompleted || 0) + 1,
    lastActiveDate: today,
    streak,
    dailyGoalCompleted: (progress?.dailyGoalCompleted || 0) + 1,
  };

  updated = addXP(updated, XP_REWARDS.COMPLETE_LESSON);
  saveProgress(updated);
  return updated;
}

export function loadOrCreateProgress(): UserProgress {
  const existing = loadProgress();
  if (existing && existing.userId) return existing;
  const fresh = createDefaultProgress();
  saveProgress(fresh);
  return fresh;
}

// ─── Job Readiness Score ───
export type JobReadinessScore = {
  label: string;
  moduleKey: string;
  score: number;
  color: string;
};

export function calculateJobReadiness(
  progress: UserProgress,
  moduleTotals: Record<string, number>,
): JobReadinessScore[] {
  const weights: { label: string; key: string; color: string }[] = [
    { label: 'Java 25 LTS',   key: 'java',         color: '#10B981' },
    { label: 'Spring Boot 3', key: 'spring-boot',  color: '#34D399' },
    { label: 'React 19',      key: 'react',        color: '#14B8A6' },
    { label: 'SQL & DB',      key: 'sql',          color: '#2DD4BF' },
    { label: 'DSA',           key: 'dsa',          color: '#10B981' },
    { label: 'Linux & Bash',  key: 'linux',        color: '#4B6352' },
    { label: 'Docker',        key: 'docker',       color: '#34D399' },
    { label: 'AWS Cloud',     key: 'aws',          color: '#F59E0B' },
    { label: 'System Design', key: 'system-design',color: '#14B8A6' },
    { label: 'Projects',      key: 'projects',     color: '#10B981' },
    { label: 'Interview Prep',key: 'interview',    color: '#34D399' },
  ];

  return weights.map(w => {
    const mod = progress?.modules?.[w.key];
    const total = moduleTotals[w.key] ?? 10;
    const completed = mod?.completedLessons ?? 0;
    return {
      label: w.label,
      moduleKey: w.key,
      score: Math.min(100, Math.round((completed / total) * 100)),
      color: w.color,
    };
  });
}

export function getOverallJobReadiness(scores: JobReadinessScore[]): number {
  if (!scores || scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
}

// ─── Badges (Strictly Professional, No Emojis) ───
export const ALL_BADGES: Badge[] = [
  { id: 'first-step',       title: 'First Step',        description: 'Initiate your 2027 developer roadmap', icon: 'Zap', condition: 'firstLesson',     xpReward: 10, rarity: 'common' },
  { id: 'java-beginner',    title: 'Java 25 Master',    description: 'Complete 5 Java core lessons',        icon: 'Coffee', condition: 'java5',          xpReward: 25, rarity: 'common' },
  { id: 'oop-master',       title: 'OOP Architect',     description: 'Master Encapsulation, Records & Polymorphism', icon: 'Layers', condition: 'oopAll', xpReward: 50, rarity: 'rare' },
  { id: 'dsa-starter',      title: 'DSA Pioneer',       description: 'Complete Big-O & Sorting modules',    icon: 'Code2', condition: 'dsa5',           xpReward: 25, rarity: 'common' },
  { id: 'sql-explorer',     title: 'SQL Maestro',       description: 'Master relational JOIN operations',   icon: 'Database', condition: 'sql5',           xpReward: 25, rarity: 'common' },
  { id: 'spring-dev',       title: 'Spring Boot Pro',   description: 'Build robust enterprise services',    icon: 'Leaf', condition: 'springBootAll',   xpReward: 100, rarity: 'epic' },
  { id: 'react-dev',        title: 'React 19 Engineer', description: 'Master components, hooks & actions',  icon: 'Atom', condition: 'reactAll',        xpReward: 100, rarity: 'epic' },
  { id: 'dockerized',       title: 'Container Captain', description: 'Deploy multi-stage Docker apps',      icon: 'Package', condition: 'dockerAll',       xpReward: 75, rarity: 'rare' },
  { id: 'job-ready',        title: 'Job Ready 2027',    description: 'Reach maximum competency score',      icon: 'ShieldCheck', condition: 'jobReady',        xpReward: 500, rarity: 'legendary' },
];
