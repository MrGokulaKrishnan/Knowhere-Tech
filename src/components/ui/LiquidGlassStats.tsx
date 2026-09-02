import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export type StatType = 'rank' | 'xp' | 'streak' | 'lessons';

interface LiquidGlassIconProps {
  type: StatType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

/**
 * Custom Multi-Layered Liquid Glass Refractive Icons
 * Designed with specular convex highlights, fluid gradient orbs, and neon plasma glows.
 */
export function LiquidGlassIcon({ type, size = 'md', className, animate = true }: LiquidGlassIconProps) {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const containerSizes = sizeMap[size];

  if (type === 'streak') {
    return (
      <div className={clsx('relative flex items-center justify-center shrink-0 select-none group', containerSizes, className)}>
        {/* Outer Liquid Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/30 via-orange-500/25 to-rose-500/20 blur-md group-hover:blur-lg group-hover:scale-125 transition-all duration-500" />
        
        {/* Glass Orb Shell */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#2a1306]/90 via-[#160a03]/95 to-[#080301] border border-amber-500/40 p-1.5 flex items-center justify-center shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.35),0_4px_12px_rgba(245,158,11,0.25)] backdrop-blur-xl overflow-hidden">
          {/* Specular curved liquid highlight */}
          <div className="absolute top-0 left-1 right-1 h-[40%] bg-gradient-to-b from-white/30 via-amber-200/10 to-transparent rounded-t-xl pointer-events-none" />
          
          {/* Custom Multi-layered Flame SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" fill="none">
            <defs>
              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
              <linearGradient id="flameCore" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              d="M12 2C10.5 5 8.5 7 8.5 10C8.5 11 8.8 11.8 9.3 12.5C7.4 12.8 6 14.5 6 16.5C6 19.5 8.7 22 12 22C15.3 22 18 19.5 18 16.5C18 13.7 15.5 10.5 14 8C13.5 10 12.5 11 12 11C11.5 11 10.8 10 11.2 8.5C11.6 7 12 5.5 12 2Z"
              fill="url(#flameGrad)"
            />
            <path
              d="M12 14C11 15 10.5 16 10.5 17.2C10.5 18.8 11.2 19.8 12 20C12.8 19.8 13.5 18.8 13.5 17.2C13.5 16 13 15 12 14Z"
              fill="url(#flameCore)"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'xp') {
    return (
      <div className={clsx('relative flex items-center justify-center shrink-0 select-none group', containerSizes, className)}>
        {/* Outer Plasma Energy Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/35 via-teal-400/25 to-cyan-400/20 blur-md group-hover:blur-lg group-hover:scale-125 transition-all duration-500" />
        
        {/* Glass Orb Shell */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#062014]/90 via-[#03120b]/95 to-[#010805] border border-emerald-400/45 p-1.5 flex items-center justify-center shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.4),0_4px_14px_rgba(16,185,129,0.3)] backdrop-blur-xl overflow-hidden">
          {/* Specular curved liquid highlight */}
          <div className="absolute top-0 left-1 right-1 h-[40%] bg-gradient-to-b from-white/35 via-emerald-200/10 to-transparent rounded-t-xl pointer-events-none" />
          
          {/* Custom Electric Lightning Crystal SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(52,211,153,0.85)]" fill="none">
            <defs>
              <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="45%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path
              d="M13 2L4 13.5H11L9.5 22L19.5 9.5H12.5L13 2Z"
              fill="url(#xpGrad)"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Plasma Spark Core */}
            <circle cx="11.5" cy="11.5" r="1.5" fill="#ffffff" opacity="0.9" />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'rank') {
    return (
      <div className={clsx('relative flex items-center justify-center shrink-0 select-none group', containerSizes, className)}>
        {/* Outer Imperial Gold-Emerald Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-emerald-400/25 to-yellow-300/20 blur-md group-hover:blur-lg group-hover:scale-125 transition-all duration-500" />
        
        {/* Glass Orb Shell */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#1b1706]/90 via-[#0f0e04]/95 to-[#060601] border border-amber-400/45 p-1.5 flex items-center justify-center shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.4),0_4px_14px_rgba(245,158,11,0.25)] backdrop-blur-xl overflow-hidden">
          {/* Specular curved liquid highlight */}
          <div className="absolute top-0 left-1 right-1 h-[40%] bg-gradient-to-b from-white/35 via-amber-200/10 to-transparent rounded-t-xl pointer-events-none" />
          
          {/* Custom Crown/Trophy Gem SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" fill="none">
            <defs>
              <linearGradient id="rankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            <path
              d="M3 6L6.5 15H17.5L21 6L15.5 10.5L12 3.5L8.5 10.5L3 6Z"
              fill="url(#rankGrad)"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 16.5H17.5L16.5 19H7.5L6.5 16.5Z"
              fill="#fbbf24"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
            <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      </div>
    );
  }

  // type === 'lessons'
  return (
    <div className={clsx('relative flex items-center justify-center shrink-0 select-none group', containerSizes, className)}>
      {/* Outer Cyber Neon Teal Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/35 via-cyan-400/25 to-emerald-400/20 blur-md group-hover:blur-lg group-hover:scale-125 transition-all duration-500" />
      
      {/* Glass Orb Shell */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#051a19]/90 via-[#020e0d]/95 to-[#010605] border border-cyan-400/45 p-1.5 flex items-center justify-center shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.4),0_4px_14px_rgba(45,212,191,0.25)] backdrop-blur-xl overflow-hidden">
        {/* Specular curved liquid highlight */}
        <div className="absolute top-0 left-1 right-1 h-[40%] bg-gradient-to-b from-white/35 via-cyan-200/10 to-transparent rounded-t-xl pointer-events-none" />
        
        {/* Custom Holographic Verified Lesson Book SVG */}
        <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(45,212,191,0.85)]" fill="none">
          <defs>
            <linearGradient id="lessonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path
            d="M4 19.5C4 18.1 5.1 17 6.5 17H20V4H6.5C5.1 4 4 5.1 4 6.5V19.5Z"
            fill="url(#lessonGrad)"
            opacity="0.85"
          />
          <path
            d="M9 11.5L11.5 14L16 9"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface LiquidStatPillProps {
  type: StatType;
  value: string | number;
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Interactive Liquid Glass Metric Capsule for Navbar and Section Badges
 */
export function LiquidStatPill({ type, value, label, onClick, className }: LiquidStatPillProps) {
  const borderGradientMap = {
    streak: 'hover:border-amber-400/70 border-amber-500/30 from-[#170a03]/90 via-[#0a0502]/95 to-black shadow-[0_0_20px_rgba(245,158,11,0.12)]',
    xp: 'hover:border-emerald-400/70 border-emerald-500/35 from-[#06180e]/90 via-[#030d07]/95 to-black shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    rank: 'hover:border-yellow-400/70 border-amber-500/35 from-[#171304]/90 via-[#0a0802]/95 to-black shadow-[0_0_20px_rgba(251,191,36,0.14)]',
    lessons: 'hover:border-cyan-400/70 border-cyan-500/30 from-[#041617]/90 via-[#020b0c]/95 to-black shadow-[0_0_20px_rgba(6,182,212,0.12)]',
  };

  const textGradientMap = {
    streak: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200',
    xp: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300',
    rank: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-amber-400',
    lessons: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative group flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-gradient-to-b border backdrop-blur-2xl transition-all duration-300 cursor-pointer select-none hover:scale-[1.03] active:scale-[0.98]',
        borderGradientMap[type],
        className
      )}
    >
      {/* Specular Liquid Top Reflection Line */}
      <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <LiquidGlassIcon type={type} size="sm" />

      <div className="flex flex-col leading-none">
        <span className={clsx('font-mono font-extrabold text-xs sm:text-sm tracking-tight', textGradientMap[type])}>
          {value}
        </span>
        {label && (
          <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

interface LiquidStatCardProps {
  type: StatType;
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

/**
 * Large Liquid Glass Hero Metric Card for Dashboard & Progress Page
 */
export function LiquidStatCard({ type, title, value, subtitle, className }: LiquidStatCardProps) {
  const borderMap = {
    rank: 'border-amber-500/35 hover:border-amber-400/70 shadow-[0_15px_35px_rgba(245,158,11,0.12),inset_0_1.5px_1.5px_rgba(255,255,255,0.15)]',
    xp: 'border-emerald-500/40 hover:border-emerald-400/80 shadow-[0_15px_35px_rgba(16,185,129,0.15),inset_0_1.5px_1.5px_rgba(255,255,255,0.18)]',
    streak: 'border-orange-500/35 hover:border-orange-400/70 shadow-[0_15px_35px_rgba(234,88,12,0.12),inset_0_1.5px_1.5px_rgba(255,255,255,0.15)]',
    lessons: 'border-cyan-500/35 hover:border-cyan-400/70 shadow-[0_15px_35px_rgba(6,182,212,0.12),inset_0_1.5px_1.5px_rgba(255,255,255,0.15)]',
  };

  const bgGradientMap = {
    rank: 'from-[#171104]/80 via-[#0a0802]/90 to-[#030301]/95',
    xp: 'from-[#061c10]/80 via-[#030f08]/90 to-[#010603]/95',
    streak: 'from-[#1a0c04]/80 via-[#0d0602]/90 to-[#040201]/95',
    lessons: 'from-[#041a19]/80 via-[#020d0d]/90 to-[#010505]/95',
  };

  const textGradientMap = {
    rank: 'from-yellow-200 via-amber-300 to-amber-400',
    xp: 'from-emerald-200 via-teal-300 to-cyan-300',
    streak: 'from-amber-200 via-orange-300 to-rose-300',
    lessons: 'from-cyan-200 via-teal-300 to-emerald-300',
  };

  return (
    <div
      className={clsx(
        'relative group p-5 sm:p-6 rounded-3xl bg-gradient-to-b border backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden',
        borderMap[type],
        bgGradientMap[type],
        className
      )}
    >
      {/* Specular curved lens reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Ambient background fluid mesh glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/5 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-400 group-hover:text-zinc-200 transition-colors">
          {title}
        </span>
        <LiquidGlassIcon type={type} size="md" />
      </div>

      <div>
        <div className={clsx('text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r mb-1', textGradientMap[type])}>
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] font-mono text-zinc-400/90 leading-tight truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

interface UniqueSignInButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Ultra-Unique Liquid Glass Cyber Sign-In Button
 * Built with refractive multi-tone liquid gradients, specular lens highlights, and electric glow animation.
 */
export function UniqueSignInButton({ onClick, className }: UniqueSignInButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative group px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl select-none cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]',
        className
      )}
    >
      {/* Ambient Pulsing Liquid Halo Aura */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-60 group-hover:opacity-100 blur-md transition-opacity duration-300 animate-glow-pulse pointer-events-none" />

      {/* Outer Liquid Glass Capsule Container */}
      <div className="relative flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-2xl bg-gradient-to-b from-[#0d2a1b]/95 via-[#06180f]/98 to-[#020b06] border border-emerald-400/60 group-hover:border-emerald-300 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.45),0_8px_24px_rgba(16,185,129,0.35)] backdrop-blur-2xl">
        
        {/* Shimmering Specular Sweep Animation across the glass surface */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Specular Top Curved Highlight Line */}
        <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        {/* Custom Refractive Glass Key / Login Icon */}
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-xl bg-gradient-to-b from-emerald-400 to-teal-600 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.8)] shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full text-black font-bold" fill="currentColor">
            <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
          </svg>
        </div>

        {/* Sign In Text with Shimmering Gradient */}
        <span className="font-mono font-extrabold text-xs sm:text-sm tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-300 group-hover:from-white group-hover:to-cyan-200">
          Sign In
        </span>

        {/* Liquid Plasma Pulse Indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </span>
      </div>
    </button>
  );
}
