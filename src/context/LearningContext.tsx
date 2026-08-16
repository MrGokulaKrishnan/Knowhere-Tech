import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProgress, ModuleKey, UserSettings } from '@/types';
import { loadOrCreateProgress, markLessonComplete, addXP } from '@/services/progressEngine';
import { saveProgress, saveSettings } from '@/services/db';

interface LearningContextType {
  progress: UserProgress;
  completeLesson: (lessonId: string, moduleKey: ModuleKey, quizScore?: number) => void;
  awardXP: (amount: number) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetProgress: () => void;
}

const LearningContext = createContext<LearningContextType | null>(null);

type Action =
  | { type: 'COMPLETE_LESSON'; lessonId: string; moduleKey: ModuleKey; quizScore?: number }
  | { type: 'AWARD_XP'; amount: number }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> }
  | { type: 'RESET' }
  | { type: 'LOAD'; progress: UserProgress };

function reducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case 'LOAD': return action.progress;
    case 'COMPLETE_LESSON':
      return markLessonComplete(state, action.lessonId, action.moduleKey, action.quizScore);
    case 'AWARD_XP':
      return addXP(state, action.amount);
    case 'UPDATE_SETTINGS': {
      const updated = { ...state, settings: { ...state.settings, ...action.settings } };
      saveSettings(updated.settings);
      return updated;
    }
    case 'RESET': {
      import('@/services/progressEngine').then(({ createDefaultProgress }) => {
        const fresh = createDefaultProgress();
        saveProgress(fresh);
      });
      return state; // will be refreshed via page reload
    }
    default: return state;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, null, loadOrCreateProgress);

  useEffect(() => {
    const loaded = loadOrCreateProgress();
    dispatch({ type: 'LOAD', progress: loaded });
  }, []);

  // Auto-persist on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeLesson = useCallback(
    (lessonId: string, moduleKey: ModuleKey, quizScore?: number) => {
      dispatch({ type: 'COMPLETE_LESSON', lessonId, moduleKey, quizScore });
    },
    []
  );

  const awardXP = useCallback((amount: number) => {
    dispatch({ type: 'AWARD_XP', amount });
  }, []);

  const updateSettings = useCallback((settings: Partial<UserSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <LearningContext.Provider value={{ progress, completeLesson, awardXP, updateSettings, resetProgress }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
}
