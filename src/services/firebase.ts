import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDCTk_yIy9U6jyJYi-ms7ZFHjET3L5sv9M',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'knowheretech.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'knowheretech',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'knowheretech.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '749135545310',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:749135545310:web:f0977ec193bedd020f534f',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-69QV0YB425'
};

// Initialize Firebase App singleton safely
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app);

// Initialize Firebase Cloud Firestore Database
export const db: Firestore = getFirestore(app);

// Configure Google Auth Provider with account selection prompt
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Action code settings for Passwordless Email Sign-In (Magic Link)
export const getActionCodeSettings = (redirectUrl?: string) => ({
  url: redirectUrl || (typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:5173/'),
  handleCodeInApp: true,
});
