import React from 'react';
import { Menu, Search, Flame, Zap, ShieldCheck } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP } from '@/services/progressEngine';
import KnowhereLogo from '@/components/ui/KnowhereLogo';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Navbar({ onMenuClick, onSearchClick }: NavbarProps) {
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);

  return (
    <header className="h-[60px] flex items-center justify-between px-4 lg:px-6 border-b border-[#142a20] bg-[#000000]/90 backdrop-blur-md shrink-0 z-30 select-none">
      {/* Left: Mobile Menu & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-emerald-950/40 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="hidden lg:flex items-center">
          <KnowhereLogo size="sm" showText={false} />
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        onClick={onSearchClick}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#050806] border border-[#142a20] text-zinc-400 hover:border-emerald-500/50 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all text-xs mx-4 flex-1 max-w-sm"
        aria-label="Search lessons and topics (Ctrl+K)"
      >
        <Search size={14} className="text-emerald-400" />
        <span className="hidden sm:inline">Search lessons, syntax, interview questions...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="hidden sm:inline-flex ml-auto items-center gap-1 rounded bg-black border border-[#142a20] px-1.5 py-0.5 text-[10px] text-zinc-500 font-mono">
          Ctrl K
        </kbd>
      </button>

      {/* Right: User Stats & Badges */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#050806] border border-[#142a20] text-xs">
          <Flame size={13} className="text-amber-400" />
          <span className="text-amber-400 font-mono font-bold">{progress?.streak || 1}d</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <Zap size={13} className="text-emerald-400" />
          <span className="text-emerald-400 font-mono font-bold">{progress?.xp || 0} XP</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#050806] border border-[#142a20] text-[11px] text-emerald-300">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Lv.{level.level} {level.title}</span>
        </div>
      </div>
    </header>
  );
}
