import React, { useState } from 'react';
import { Sparkles, LogIn, LogOut, CheckCircle2, ChevronDown, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP } from '@/services/progressEngine';

interface CyberSignInButtonProps {
  onOpenAuthModal: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export default function CyberSignInButton({ onOpenAuthModal, className = '', size = 'md' }: CyberSignInButtonProps) {
  const { user, logOut } = useAuth();
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // If user is authenticated, render the Holographic Profile Pill
  if (user) {
    const displayName = user.displayName || user.email?.split('@')[0] || 'Developer';
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="cyber-btn-wrapper group"
          aria-label="User profile and sync settings"
          title={`Signed in as ${user.email}`}
        >
          <div className="cyber-btn-inner !py-1.5 !px-2.5 sm:!px-3 flex items-center gap-2">
            {/* Avatar with glowing ring */}
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-6 h-6 rounded-full border border-emerald-400/80 object-cover shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-emerald-900/90 border border-emerald-400 flex items-center justify-center font-mono font-bold text-[11px] text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  {initial}
                </div>
              )}
              {/* Online pulse beacon */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black cyber-beacon" />
            </div>

            {/* Name */}
            <span className="hidden sm:inline font-mono font-bold text-xs text-zinc-100 max-w-[100px] truncate tracking-tight">
              {displayName}
            </span>

            {/* Micro Level Tag */}
            <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 font-bold">
              Lv.{level.level}
            </span>

            <ChevronDown size={13} className={`text-emerald-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            <div className="absolute right-0 mt-2.5 w-64 p-3 rounded-2xl bg-[#040906]/98 border border-emerald-500/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.2)] z-50 animate-scale-in">
              <div className="px-3 py-2.5 mb-2 rounded-xl bg-black/60 border border-[#142a20]">
                <div className="flex items-center gap-2 mb-1">
                  <UserIcon size={13} className="text-emerald-400" />
                  <p className="text-xs font-bold text-white truncate">{displayName}</p>
                </div>
                <p className="text-[11px] font-mono text-zinc-400 truncate pl-5">{user.email}</p>
                <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-[#142a20]/70 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>Cloud Firestore Sync Active</span>
                </div>
              </div>

              <div className="px-3 py-1.5 mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Total XP:</span>
                <span className="text-emerald-400 font-bold">{(progress?.xp || 0).toLocaleString()} XP</span>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logOut();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors font-mono cursor-pointer border border-transparent hover:border-rose-500/30"
              >
                <LogOut size={14} className="text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Unauthenticated: Render Unique Cyber Hologram Sign In Button
  return (
    <button
      onClick={onOpenAuthModal}
      className={`cyber-btn-wrapper group ${className}`}
      aria-label="Sign in or create account"
    >
      <div className={`cyber-btn-inner ${size === 'sm' ? '!py-1.5 !px-3 text-[11px]' : '!py-2 !px-4 text-xs'}`}>
        {/* Glowing Beacon Pill */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </span>

        {/* Icon */}
        <Sparkles size={13} className="text-emerald-300 group-hover:rotate-12 transition-transform duration-300" />

        {/* Label */}
        <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent font-extrabold tracking-wider">
          Sign In
        </span>

        {/* Arrow / Login accent */}
        <LogIn size={13} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-200" />
      </div>
    </button>
  );
}
