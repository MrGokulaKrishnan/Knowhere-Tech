import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { auth, googleProvider, getActionCodeSettings } from '@/services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  isEmailLinkSignIn: boolean;
  clearError: () => void;
  signInWithGoogle: () => Promise<User | null>;
  sendPasswordlessLink: (email: string) => Promise<void>;
  completePasswordlessSignIn: (email: string, linkHref?: string) => Promise<User | null>;
  signInWithPassword: (email: string, pass: string) => Promise<User>;
  signUpWithPassword: (email: string, pass: string) => Promise<User>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const EMAIL_FOR_SIGN_IN_KEY = 'knowhere_email_for_signin';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isEmailLinkSignIn, setIsEmailLinkSignIn] = useState(false);

  // Check on mount for auth state and passwordless magic link
  useEffect(() => {
    // 1. Check if incoming URL is a Firebase Email Sign-In link
    if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
      setIsEmailLinkSignIn(true);
      const savedEmail = window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
      if (savedEmail) {
        signInWithEmailLink(auth, savedEmail, window.location.href)
          .then((result) => {
            setUser(result.user);
            window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);
            setIsEmailLinkSignIn(false);
            // Clean up the URL query params without full page reload
            window.history.replaceState({}, document.title, window.location.pathname);
          })
          .catch((err: any) => {
            setAuthError(err.message || 'Failed to complete passwordless sign-in.');
          });
      }
    }

    // 2. Auth state observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setAuthError(null);

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err: any) {
      // Fallback to redirect if popup is blocked
      if (err.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      setAuthError(err.message || 'Google sign-in failed.');
      throw err;
    }
  };

  const sendPasswordlessLink = async (email: string): Promise<void> => {
    setAuthError(null);
    try {
      const actionCodeSettings = getActionCodeSettings();
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send magic sign-in link.');
      throw err;
    }
  };

  const completePasswordlessSignIn = async (email: string, linkHref?: string): Promise<User | null> => {
    setAuthError(null);
    try {
      const href = linkHref || window.location.href;
      const result = await signInWithEmailLink(auth, email, href);
      window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);
      setIsEmailLinkSignIn(false);
      window.history.replaceState({}, document.title, window.location.pathname);
      return result.user;
    } catch (err: any) {
      setAuthError(err.message || 'Failed to verify email link.');
      throw err;
    }
  };

  const signInWithPassword = async (email: string, pass: string): Promise<User> => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      return cred.user;
    } catch (err: any) {
      setAuthError(err.message || 'Sign in failed.');
      throw err;
    }
  };

  const signUpWithPassword = async (email: string, pass: string): Promise<User> => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      return cred.user;
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed.');
      throw err;
    }
  };

  const logOut = async (): Promise<void> => {
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to sign out.');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isEmailLinkSignIn,
        clearError,
        signInWithGoogle,
        sendPasswordlessLink,
        completePasswordlessSignIn,
        signInWithPassword,
        signUpWithPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
