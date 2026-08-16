import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP, getLevelProgress, LEVELS } from '@/services/progressEngine';

export function useProgress() {
  const { progress, completeLesson, awardXP } = useLearning();
  const level = getLevelFromXP(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);
  const nextLevel = LEVELS[level.level] ?? level;

  const isLessonCompleted = (lessonId: string) =>
    progress.lessons[lessonId]?.status === 'completed';

  const getModuleProgress = (moduleKey: string) =>
    progress.modules[moduleKey] ?? { completedLessons: 0, totalLessons: 0, percentage: 0 };

  return {
    progress,
    level,
    levelProgress,
    nextLevel,
    xp: progress.xp,
    streak: progress.streak,
    badges: progress.badges,
    totalCompleted: progress.totalLessonsCompleted,
    isLessonCompleted,
    getModuleProgress,
    completeLesson,
    awardXP,
  };
}
