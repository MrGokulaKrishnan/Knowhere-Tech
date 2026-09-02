import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProgress, ModuleKey, UserSettings } from '@/types';
import { loadOrCreateProgress, markLessonComplete, addXP, createDefaultProgress } from '@/services/progressEngine';
import { saveProgress, saveSettings, fetchCloudProgress, subscribeToUserProgress, migrateLocalDataToFirestore } from '@/services/db';
import { useAuth } from '@/context/AuthContext';

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
      const fresh = createDefaultProgress();
      saveProgress(fresh);
      return fresh;
    }
    default: return state;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, null, loadOrCreateProgress);
  const { user } = useAuth();

  // 1. Initial local load
  useEffect(() => {
    const loaded = loadOrCreateProgress();
    dispatch({ type: 'LOAD', progress: loaded });
  }, []);

  // 2. Cloud Firestore synchronization on login / user change
  useEffect(() => {
    if (!user) return;

    let unsub: (() => void) | null = null;

    const setupCloudSync = async () => {
      // Migrate local learning data to Firestore on first sign-in
      await migrateLocalDataToFirestore(user.uid);
      
      // Fetch cloud progress
      const cloudP = await fetchCloudProgress(user.uid);
      if (cloudP) {
        dispatch({ type: 'LOAD', progress: cloudP });
      }

      // Subscribe to real-time updates from Firestore
      const un = subscribeToUserProgress((p) => {
        dispatch({ type: 'LOAD', progress: p });
      }, user.uid);

      if (un) unsub = un;
    };

    setupCloudSync();

    return () => {
      if (unsub) unsub();
    };
  }, [user]);

  // 3. Auto-persist on every local mutation
  useEffect(() => {
    if (progress) {
      saveProgress(progress, user?.uid);
    }
  }, [progress, user]);

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

