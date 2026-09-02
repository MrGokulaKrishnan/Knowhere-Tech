import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Mail, Lock, Sparkles, CheckCircle2, AlertCircle,
  ShieldCheck, Send, KeyRound
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import KnowhereLogo from '@/components/ui/KnowhereLogo';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const {
    signInWithGoogle,
    sendPasswordlessLink,
    signInWithPassword,
    signUpWithPassword,
    authError,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<'passwordless' | 'password' | 'signup'>('passwordless');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  if (!open) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    clearError();
    try {
      await signInWithGoogle();
      onClose();
    } catch {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordlessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    clearError();
    try {
      await sendPasswordlessLink(email.trim());
      setLinkSent(true);
    } catch {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    clearError();
    try {
      if (mode === 'signup') {
        await signUpWithPassword(email.trim(), password);
      } else {
        await signInWithPassword(email.trim(), password);
      }
      onClose();
    } catch {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Liquid Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={() => {
            clearError();
            onClose();
          }}
        />

        {/* Liquid Glass Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#040806]/95 border border-emerald-500/30 rounded-3xl p-7 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(16,185,129,0.18)] backdrop-blur-2xl overflow-hidden z-10"
        >
          {/* Ambient Liquid Gradient Orbs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Specular Highlight Top Border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => {
              clearError();
              onClose();
            }}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/60 border border-[#142a20] flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500/50 transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <KnowhereLogo size="md" showText={false} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Sign In to Knowhere Tech
            </h2>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Sync your progress, notes, and quiz achievements across all devices in real-time Cloud Firestore.
            </p>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google 1-Click Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#09150e] hover:bg-[#0f2419] border border-emerald-500/40 hover:border-emerald-400 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] group cursor-pointer mb-5"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-[#142a20] w-full" />
            <span className="bg-[#040806] px-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Or with email
            </span>
            <div className="border-t border-[#142a20] w-full" />
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-black/50 p-1 border border-[#142a20] mb-5">
            <button
              onClick={() => {
                setMode('passwordless');
                setLinkSent(false);
                clearError();
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                mode === 'passwordless'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Magic Link
            </button>
            <button
              onClick={() => {
                setMode('password');
                clearError();
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                mode !== 'passwordless'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Password
            </button>
          </div>

          {/* Mode 1: Passwordless Sign-in Form */}
          {mode === 'passwordless' && (
            <div>
              {linkSent ? (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">Magic Link Sent!</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    We sent a passwordless sign-in link to <span className="text-emerald-300 font-mono">{email}</span>. Click the link in your email to sign in automatically.
                  </p>
                  <button
                    onClick={() => setLinkSent(false)}
                    className="button-ghost text-xs !py-1.5 !px-3"
                  >
                    Send to different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePasswordlessSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-zinc-500" size={16} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="developer@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/80 border border-[#142a20] text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-600 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} /> Send Passwordless Link
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Mode 2: Password Sign-in / Sign-up Form */}
          {mode !== 'passwordless' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-zinc-500" size={15} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@example.com"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/80 border border-[#142a20] text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-600 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 text-zinc-500" size={15} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/80 border border-[#142a20] text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-600 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim() || !password}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : mode === 'signup' ? (
                  <>
                    <Sparkles size={14} /> Create Account
                  </>
                ) : (
                  <>
                    <KeyRound size={14} /> Sign In
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signup' ? 'password' : 'signup')}
                  className="text-xs text-zinc-400 hover:text-emerald-300 font-mono transition-colors"
                >
                  {mode === 'signup'
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Create one"}
                </button>
              </div>
            </form>
          )}

          {/* Footer Security Assurance */}
          <div className="mt-6 pt-4 border-t border-[#142a20] flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Secured with Firebase Authentication</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
