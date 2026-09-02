import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyForKnowhereTechInit',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'knowheretech.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'knowheretech',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'knowheretech.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1029384756',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1029384756:web:abcd1234ef5678',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-KNOWHERE01'
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
