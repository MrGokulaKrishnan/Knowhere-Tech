import React, { useState } from 'react';
import { Menu, Search, Flame, Zap, Trophy, AppWindow } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP } from '@/services/progressEngine';
import KnowhereLogo from '@/components/ui/KnowhereLogo';
import OpenInAppModal from '@/components/ui/OpenInAppModal';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Navbar({ onMenuClick, onSearchClick }: NavbarProps) {
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const [appModalOpen, setAppModalOpen] = useState(false);

  return (
    <>
      <header className="h-[76px] flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-[#142a20] bg-[#000000]/90 backdrop-blur-md shrink-0 z-30 select-none">
        {/* Left: Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#06150c] border border-emerald-500/40 text-emerald-300 hover:bg-[#0c2616] hover:border-emerald-400 text-xs font-semibold font-mono transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.12)] cursor-pointer"
            aria-label="Open navigation menu (Ctrl+B)"
            title="Open Courses Menu (Ctrl+B)"
          >
            <Menu size={17} className="text-emerald-400" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          <div className="flex items-center ml-1">
            <KnowhereLogo size="sm" showText={false} />
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#050806] border border-[#142a20] text-zinc-400 hover:border-emerald-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all text-xs mx-3 sm:mx-4 flex-1 max-w-md"
          aria-label="Search lessons and topics (Ctrl+K)"
        >
          <Search size={16} className="text-emerald-400 shrink-0" />
          <span className="hidden md:inline font-mono">Search concepts, syntax, interview questions...</span>
          <span className="md:hidden font-mono">Search...</span>
          <kbd className="hidden sm:inline-flex ml-auto items-center gap-1 rounded-lg bg-black border border-[#142a20] px-2 py-1 text-[11px] text-zinc-400 font-mono">
            Ctrl K
          </kbd>
        </button>

        {/* Right: Open In App + User Stats & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Open in App Button */}
          <button
            onClick={() => setAppModalOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl bg-[#050806] border border-[#142a20] hover:border-emerald-500/40 text-emerald-300 hover:bg-[#06150c] text-xs font-semibold font-mono transition-all hover:scale-[1.02]"
            title="Open or install Knowhere Tech as a standalone app"
          >
            <AppWindow size={15} className="text-emerald-400 shrink-0" />
            <span className="hidden lg:inline">Open in App</span>
            <span className="lg:hidden hidden sm:inline">App</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#050806] border border-[#142a20] text-xs">
            <Flame size={15} className="text-amber-400" />
            <span className="text-amber-300 font-mono font-bold">{progress?.streak || 1}d</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Zap size={15} className="text-emerald-400" />
            <span className="text-emerald-300 font-mono font-bold">{(progress?.xp || 0).toLocaleString()} XP</span>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#050806] border border-[#142a20] text-xs text-emerald-300">
            <Trophy size={14} className="text-emerald-400" />
            <span className="font-semibold">{level.title}</span>
          </div>
        </div>
      </header>

      {/* Open in App Modal */}
      <OpenInAppModal open={appModalOpen} onClose={() => setAppModalOpen(false)} />
    </>
  );
}
