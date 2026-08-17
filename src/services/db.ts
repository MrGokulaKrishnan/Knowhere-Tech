// ─────────────────────────────────────────────────────
// Knowhere Tech - Persistence Layer (IndexedDB + localStorage)
// ─────────────────────────────────────────────────────
import { openDB, type IDBPDatabase } from 'idb';
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
    console.warn('IndexedDB unavailable, falling back gracefully:', err);
    return null;
  });

  return dbPromise;
}

// ─── localStorage helpers ───
const LS_KEY = 'knowhere:progress';
const LS_SETTINGS = 'knowhere:settings';
const LS_LAST_ROUTE = 'knowhere:last-route';

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(progress));
  } catch { /* storage full */ }
}

export function loadProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(LS_KEY) || localStorage.getItem('stackpath:progress');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  } catch { /* ignore */ }
}

export function loadSettings(): UserSettings | null {
  try {
    const raw = localStorage.getItem(LS_SETTINGS) || localStorage.getItem('stackpath:settings');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

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
    localStorage.removeItem('stackpath:progress');
    localStorage.removeItem('stackpath:settings');
  } catch { /* ignore */ }
}

// ─── Notes ───
export async function saveNote(note: Note): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.put('notes', note);
  } catch { /* ignore */ }
}

export async function getNotesByLesson(lessonId: string): Promise<Note[]> {
  try {
    const database = await initDB();
    if (!database) return [];
    const all: Note[] = await database.getAll('notes');
    return all.filter(n => n.lessonId === lessonId);
  } catch { return []; }
}

export async function getAllNotes(): Promise<Note[]> {
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
}

// ─── Bookmarks ───
export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.put('bookmarks', bookmark);
  } catch { /* ignore */ }
}

export async function getAllBookmarks(): Promise<Bookmark[]> {
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
}

// ─── Quiz History ───
export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  try {
    const database = await initDB();
    if (database) await database.put('quiz-history', attempt);
  } catch { /* ignore */ }
}

export async function getQuizHistory(lessonId: string): Promise<QuizAttempt[]> {
  try {
    const database = await initDB();
    if (!database) return [];
    const all: QuizAttempt[] = await database.getAll('quiz-history');
    return all.filter(a => a.lessonId === lessonId);
  } catch { return []; }
}

export async function getAllQuizHistory(): Promise<QuizAttempt[]> {
  try {
    const database = await initDB();
    if (!database) return [];
    return database.getAll('quiz-history');
  } catch { return []; }
}

// ─── Export / Import ───
export async function exportAllData(): Promise<string> {
  const progress = loadProgress();
  const settings = loadSettings();
  const notes = await getAllNotes();
  const bookmarks = await getAllBookmarks();
  const quizHistory = await getAllQuizHistory();
  const payload = {
    version: 1,
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
    if (payload.progress) saveProgress(payload.progress);
    if (payload.settings) saveSettings(payload.settings);
    const database = await initDB();
    if (database) {
      if (Array.isArray(payload.notes)) {
        for (const note of payload.notes) await database.put('notes', note);
      }
      if (Array.isArray(payload.bookmarks)) {
        for (const bm of payload.bookmarks) await database.put('bookmarks', bm);
      }
      if (Array.isArray(payload.quizHistory)) {
        for (const qa of payload.quizHistory) await database.put('quiz-history', qa);
      }
    }
    return true;
  } catch { return false; }
}
