// ─────────────────────────────────────────────────────
// StackPath - Persistence Layer (IndexedDB + localStorage)
// ─────────────────────────────────────────────────────
import { openDB, type IDBPDatabase } from 'idb';
import type { Note, Bookmark, QuizAttempt, UserProgress, UserSettings } from '@/types';

const DB_NAME = 'stackpath-db';
const DB_VERSION = 1;

let db: IDBPDatabase | null = null;

export async function initDB() {
  if (db) return db;
  db = await openDB(DB_NAME, DB_VERSION, {
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
  });
  return db;
}

// ─── localStorage helpers ───
const LS_KEY = 'stackpath:progress';
const LS_SETTINGS = 'stackpath:settings';
const LS_LAST_ROUTE = 'stackpath:last-route';

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(progress));
  } catch { /* storage full */ }
}

export function loadProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
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
    const raw = localStorage.getItem(LS_SETTINGS);
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
  localStorage.removeItem(LS_KEY);
  localStorage.removeItem(LS_SETTINGS);
  localStorage.removeItem(LS_LAST_ROUTE);
}

// ─── Notes ───
export async function saveNote(note: Note): Promise<void> {
  const database = await initDB();
  await database.put('notes', note);
}

export async function getNotesByLesson(lessonId: string): Promise<Note[]> {
  const database = await initDB();
  const all: Note[] = await database.getAll('notes');
  return all.filter(n => n.lessonId === lessonId);
}

export async function getAllNotes(): Promise<Note[]> {
  const database = await initDB();
  return database.getAll('notes');
}

export async function deleteNote(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('notes', id);
}

// ─── Bookmarks ───
export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  const database = await initDB();
  await database.put('bookmarks', bookmark);
}

export async function getAllBookmarks(): Promise<Bookmark[]> {
  const database = await initDB();
  return database.getAll('bookmarks');
}

export async function deleteBookmark(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('bookmarks', id);
}

// ─── Quiz History ───
export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  const database = await initDB();
  await database.put('quiz-history', attempt);
}

export async function getQuizHistory(lessonId: string): Promise<QuizAttempt[]> {
  const database = await initDB();
  const all: QuizAttempt[] = await database.getAll('quiz-history');
  return all.filter(a => a.lessonId === lessonId);
}

export async function getAllQuizHistory(): Promise<QuizAttempt[]> {
  const database = await initDB();
  return database.getAll('quiz-history');
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
    if (Array.isArray(payload.notes)) {
      for (const note of payload.notes) await database.put('notes', note);
    }
    if (Array.isArray(payload.bookmarks)) {
      for (const bm of payload.bookmarks) await database.put('bookmarks', bm);
    }
    if (Array.isArray(payload.quizHistory)) {
      for (const qa of payload.quizHistory) await database.put('quiz-history', qa);
    }
    return true;
  } catch { return false; }
}
