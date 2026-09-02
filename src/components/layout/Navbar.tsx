import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Flame, Zap, Trophy, Fingerprint, LogOut, CheckCircle2 } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import { getLevelFromXP } from '@/services/progressEngine';
import KnowhereLogo from '@/components/ui/KnowhereLogo';
import AuthModal from '@/components/auth/AuthModal';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Navbar({ onMenuClick, onSearchClick }: NavbarProps) {
  const { progress } = useLearning();
  const { user, logOut } = useAuth();
  const level = getLevelFromXP(progress?.xp || 0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      <header className="h-[80px] flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-emerald-500/20 bg-black/80 backdrop-blur-2xl shrink-0 z-30 select-none relative overflow-visible shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        {/* Specular Top Ambient Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

        {/* Left: Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-gradient-to-b from-[#091f13] to-[#040e08] border border-emerald-500/35 text-emerald-300 hover:border-emerald-400/70 text-xs font-bold font-mono transition-all hover:scale-[1.03] shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer group"
            aria-label="Open navigation menu (Ctrl+B)"
            title="Open Courses Menu (Ctrl+B)"
          >
            <Menu size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline tracking-wide">Menu</span>
          </button>

          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity">
            <div className="flex items-center ml-1">
              <KnowhereLogo size="sm" showText={false} />
            </div>

            {/* Brand name visible on md+ */}
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-white font-extrabold text-sm tracking-tight">Knowhere</span>
              <span className="text-emerald-400/80 text-[10px] font-mono tracking-widest uppercase">Tech</span>
            </div>
          </Link>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={onSearchClick}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-xs mx-3 sm:mx-5 flex-1 max-w-lg transition-all duration-200 ${
            searchFocused
              ? 'bg-[#06140c] border-emerald-400/60 text-white shadow-[0_0_25px_rgba(16,185,129,0.25)]'
              : 'bg-[#040a06]/80 border-[#142a20] text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200 hover:bg-[#061208]'
          }`}
          aria-label="Search lessons and topics (Ctrl+K)"
        >
          <Search size={15} className="text-emerald-400 shrink-0" />
          <span className="hidden md:inline font-mono text-zinc-500">Search concepts, syntax, topics...</span>
          <span className="md:hidden font-mono text-zinc-500">Search...</span>
          <kbd className="hidden sm:inline-flex ml-auto items-center gap-1 rounded-lg bg-black/80 border border-[#142a20] px-2 py-1 text-[10px] text-zinc-500 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Right: Stats & Auth Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Streak */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#040a06] border border-[#142a20] text-xs">
            <Flame size={14} className="text-amber-400" />
            <span className="text-amber-300 font-mono font-bold">{progress?.streak || 1}d</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs shadow-[0_0_18px_rgba(16,185,129,0.15)]">
            <Zap size={14} className="text-emerald-400" />
            <span className="text-emerald-300 font-mono font-bold">{(progress?.xp || 0).toLocaleString()} XP</span>
          </div>

          {/* Level */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#040a06] border border-[#142a20] text-xs text-emerald-300">
            <Trophy size={13} className="text-emerald-400" />
            <span className="font-semibold truncate max-w-[120px]">{level.title}</span>
          </div>

          {/* Auth Button / Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-b from-[#0a2014] to-[#040e08] border border-emerald-500/40 hover:border-emerald-400 text-xs text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.18)] cursor-pointer"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full border border-emerald-400/50 object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-800/80 border border-emerald-400 flex items-center justify-center font-mono font-bold text-[11px] text-emerald-200">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium text-xs max-w-[110px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Firestore Connected" />
              </button>

              {userDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-[#050b07]/95 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-scale-in">
                    <div className="px-3 py-2 mb-2 border-b border-[#142a20]">
                      <p className="text-xs font-bold text-white truncate">{user.displayName || 'Developer'}</p>
                      <p className="text-[11px] font-mono text-zinc-400 truncate">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-emerald-400">
                        <CheckCircle2 size={12} /> Live Cloud Firestore Sync
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/40 transition-colors font-mono cursor-pointer"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer group"
            >
              <Fingerprint size={15} className="text-black stroke-[2.2] group-hover:scale-110 transition-transform" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* Auth Modal Trigger */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}

