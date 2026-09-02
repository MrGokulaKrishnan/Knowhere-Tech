// ─────────────────────────────────────────────────────
// Knowhere Tech - Cloud Firestore & Persistence Layer
// ─────────────────────────────────────────────────────
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { openDB, type IDBPDatabase } from 'idb';
import { db, auth } from '@/services/firebase';
import type { Note, Bookmark, QuizAttempt, UserProgress, UserSettings } from '@/types';

const DB_NAME = 'knowhere-tech-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase | null> | null = null;

export async function initDB(): Promise<IDBPDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) return null;
  if (dbPromise) return dbPromise;

  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('notes')) {
        database.createObjectStore('notes', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('bookmarks')) {
        database.createObjectStore('bookmarks', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('quiz-history')) {
        database.createObjectStore('quiz-history', { keyPath: 'id' });
      }
    },
  }).catch(err => {
    console.warn('Local storage fallback enabled:', err);
    return null;
  });

  return dbPromise;
}

// ─── Local Storage Keys (Fallback & Cache) ───
const LS_KEY = 'knowhere:progress';
const LS_SETTINGS = 'knowhere:settings';
const LS_LAST_ROUTE = 'knowhere:last-route';

export function saveLastRoute(route: string): void {
  try { localStorage.setItem(LS_LAST_ROUTE, route); } catch { /* ignore */ }
}

export function loadLastRoute(): string {
  try { return localStorage.getItem(LS_LAST_ROUTE) || '/dashboard'; } catch { return '/dashboard'; }
}

export function clearAllStorage(): void {
  try {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_SETTINGS);
    localStorage.removeItem(LS_LAST_ROUTE);
  } catch { /* ignore */ }
}

// ─── User Progress & Settings (Firestore + Local Cache) ───

export async function saveProgress(progress: UserProgress, targetUid?: string): Promise<void> {
  // Always update local cache for instant offline reads
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(progress));
  } catch { /* storage full */ }

  const uid = targetUid || auth.currentUser?.uid;
  if (!uid) return;

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      progress,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('Failed to sync progress to Cloud Firestore:', err);
  }
}

export function loadProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export async function fetchCloudProgress(targetUid?: string): Promise<UserProgress | null> {
  const uid = targetUid || auth.currentUser?.uid;
  if (!uid) return loadProgress();

  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists() && snap.data()?.progress) {
      const cloudProgress = snap.data().progress as UserProgress;
      try { localStorage.setItem(LS_KEY, JSON.stringify(cloudProgress)); } catch { /* ignore */ }
      return cloudProgress;
    }
  } catch (err) {
    console.warn('Could not fetch cloud progress, using local cache:', err);
  }
  return loadProgress();
}

export function subscribeToUserProgress(
  callback: (progress: UserProgress) => void,
  targetUid?: string
): Unsubscribe | null {
  const uid = targetUid || auth.currentUser?.uid;
  if (!uid) return null;

  const userDocRef = doc(db, 'users', uid);
  return onSnapshot(userDocRef, (snap) => {
    if (snap.exists() && snap.data()?.progress) {
      const p = snap.data().progress as UserProgress;
      try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch { /* ignore */ }
      callback(p);
    }
  }, (error) => {
    console.warn('Firestore progress subscription warning:', error);
  });
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  try {
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  } catch { /* ignore */ }

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      settings,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('Failed to sync settings to Cloud Firestore:', err);
  }
}

export function loadSettings(): UserSettings | null {
  try {
    const raw = localStorage.getItem(LS_SETTINGS);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ─── Notes (Firestore + Local Fallback) ───

export async function saveNote(note: Note): Promise<void> {
  // 1. Save to local fallback
  try {
    const database = await initDB();
    if (database) await database.put('notes', note);
  } catch { /* ignore */ }

  // 2. Save to Cloud Firestore
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const noteDocRef = doc(db, 'users', uid, 'notes', note.id);
    await setDoc(noteDocRef, {
      ...note,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Failed to save note to Firestore:', err);
  }
}

export async function getNotesByLesson(lessonId: string): Promise<Note[]> {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const notesCol = collection(db, 'users', uid, 'notes');
      const snap = await getDocs(notesCol);
      if (!snap.empty) {
        const notes: Note[] = [];
        snap.forEach((d) => {
          const n = d.data() as Note;
          if (n.lessonId === lessonId) notes.push(n);
        });
        if (notes.length > 0) return notes;
      }
    } catch { /* fallback to local */ }
  }

  try {
    const database = await initDB();
    if (!database) return [];
    const all: Note[] = await database.getAll('notes');
    return all.filter(n => n.lessonId === lessonId);
  } catch { return []; }
}

export async function getAllNotes(): Promise<Note[]> {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const notesCol = collection(db, 'users', uid, 'notes');
      const snap = await getDocs(notesCol);
      const notes: Note[] = [];
      snap.forEach((d) => notes.push(d.data() as Note));
      if (notes.length > 0) return notes;
    } catch { /* fallback */ }
  }

  try {
    const database = await initDB();
    if (!database) return [];
    return database.getAll('notes');
  } catch { return []; }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.delete('notes', id);
  } catch { /* ignore */ }

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const noteDocRef = doc(db, 'users', uid, 'notes', id);
    await deleteDoc(noteDocRef);
  } catch (err) {
    console.warn('Failed to delete note from Firestore:', err);
  }
}

// ─── Bookmarks (Firestore + Local Fallback) ───

export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.put('bookmarks', bookmark);
  } catch { /* ignore */ }

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const bmDocRef = doc(db, 'users', uid, 'bookmarks', bookmark.id);
    await setDoc(bmDocRef, bookmark);
  } catch (err) {
    console.warn('Failed to save bookmark to Firestore:', err);
  }
}

export async function getAllBookmarks(): Promise<Bookmark[]> {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const bmCol = collection(db, 'users', uid, 'bookmarks');
      const snap = await getDocs(bmCol);
      const list: Bookmark[] = [];
      snap.forEach((d) => list.push(d.data() as Bookmark));
      if (list.length > 0) return list;
    } catch { /* fallback */ }
  }

  try {
    const database = await initDB();
    if (!database) return [];
    return database.getAll('bookmarks');
  } catch { return []; }
}

export async function deleteBookmark(id: string): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.delete('bookmarks', id);
  } catch { /* ignore */ }

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const bmDocRef = doc(db, 'users', uid, 'bookmarks', id);
    await deleteDoc(bmDocRef);
  } catch (err) {
    console.warn('Failed to delete bookmark from Firestore:', err);
  }
}

// ─── Quiz History (Firestore + Local Fallback) ───

export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.put('quiz-history', attempt);
  } catch { /* ignore */ }

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    const qaDocRef = doc(db, 'users', uid, 'quiz_history', attempt.id);
    await setDoc(qaDocRef, attempt);
  } catch (err) {
    console.warn('Failed to save quiz attempt to Firestore:', err);
  }
}

export async function getQuizHistory(lessonId: string): Promise<QuizAttempt[]> {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const qaCol = collection(db, 'users', uid, 'quiz_history');
      const snap = await getDocs(qaCol);
      const list: QuizAttempt[] = [];
      snap.forEach((d) => {
        const item = d.data() as QuizAttempt;
        if (item.lessonId === lessonId) list.push(item);
      });
      if (list.length > 0) return list;
    } catch { /* fallback */ }
  }

  try {
    const database = await initDB();
    if (!database) return [];
    const all: QuizAttempt[] = await database.getAll('quiz-history');
    return all.filter(a => a.lessonId === lessonId);
  } catch { return []; }
}

export async function getAllQuizHistory(): Promise<QuizAttempt[]> {
  const uid = auth.currentUser?.uid;
  if (uid) {
    try {
      const qaCol = collection(db, 'users', uid, 'quiz_history');
      const snap = await getDocs(qaCol);
      const list: QuizAttempt[] = [];
      snap.forEach((d) => list.push(d.data() as QuizAttempt));
      if (list.length > 0) return list;
    } catch { /* fallback */ }
  }

  try {
    const database = await initDB();
    if (!database) return [];
    return database.getAll('quiz-history');
  } catch { return []; }
}

// ─── Guest-to-Cloud Data Migration ───

export async function migrateLocalDataToFirestore(uid: string): Promise<void> {
  if (!uid) return;

  try {
    // 1. Migrate Progress
    const localProgress = loadProgress();
    if (localProgress && (localProgress.xp > 0 || localProgress.totalLessonsCompleted > 0)) {
      const userDocRef = doc(db, 'users', uid);
      const snap = await getDoc(userDocRef);
      if (!snap.exists() || (snap.data()?.progress?.xp || 0) < localProgress.xp) {
        await setDoc(userDocRef, {
          progress: localProgress,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      }
    }

    // 2. Migrate Notes
    const database = await initDB();
    if (database) {
      const localNotes: Note[] = await database.getAll('notes');
      for (const n of localNotes) {
        if (n && n.id) {
          const noteDocRef = doc(db, 'users', uid, 'notes', n.id);
          await setDoc(noteDocRef, n, { merge: true });
        }
      }

      // 3. Migrate Bookmarks
      const localBookmarks: Bookmark[] = await database.getAll('bookmarks');
      for (const b of localBookmarks) {
        if (b && b.id) {
          const bmDocRef = doc(db, 'users', uid, 'bookmarks', b.id);
          await setDoc(bmDocRef, b, { merge: true });
        }
      }

      // 4. Migrate Quiz History
      const localQuizHistory: QuizAttempt[] = await database.getAll('quiz-history');
      for (const q of localQuizHistory) {
        if (q && q.id) {
          const qaDocRef = doc(db, 'users', uid, 'quiz_history', q.id);
          await setDoc(qaDocRef, q, { merge: true });
        }
      }
    }
  } catch (err) {
    console.warn('Automatic local to Firestore sync completed with notice:', err);
  }
}

// ─── Export / Import ───

export async function exportAllData(): Promise<string> {
  const progress = await fetchCloudProgress() || loadProgress();
  const settings = loadSettings();
  const notes = await getAllNotes();
  const bookmarks = await getAllBookmarks();
  const quizHistory = await getAllQuizHistory();
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    progress,
    settings,
    notes,
    bookmarks,
    quizHistory,
  };
  return JSON.stringify(payload, null, 2);
}

export async function importAllData(jsonStr: string): Promise<boolean> {
  try {
    const payload = JSON.parse(jsonStr);
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return false;
    }

    if (payload.progress && typeof payload.progress === 'object') {
      await saveProgress(payload.progress as UserProgress);
    }
    if (payload.settings && typeof payload.settings === 'object') {
      await saveSettings(payload.settings as UserSettings);
    }

    if (Array.isArray(payload.notes)) {
      for (const note of payload.notes) {
        if (note && typeof note === 'object' && typeof note.id === 'string') {
          await saveNote(note);
        }
      }
    }
    if (Array.isArray(payload.bookmarks)) {
      for (const bm of payload.bookmarks) {
        if (bm && typeof bm === 'object' && typeof bm.id === 'string') {
          await saveBookmark(bm);
        }
      }
    }
    if (Array.isArray(payload.quizHistory)) {
      for (const qa of payload.quizHistory) {
        if (qa && typeof qa === 'object' && typeof qa.id === 'string') {
          await saveQuizAttempt(qa);
        }
      }
    }
    return true;
  } catch {
    return false;
  }
}
