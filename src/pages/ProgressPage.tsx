import React from 'react';
import {
  TrendingUp, Zap, Flame, Trophy, CheckCircle, Award,
  Coffee, Layers, Code2, Database, Leaf, Atom, Package, ShieldCheck,
  Star, Target, ArrowRight, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP, getLevelProgress, LEVELS, ALL_BADGES } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import ProgressBar from '@/components/ui/ProgressBar';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Coffee, Layers, Code2, Database, Leaf, Atom, Package, ShieldCheck,
};

const RARITY_STYLES: Record<string, string> = {
  common:    'border-zinc-600/40 bg-zinc-900/40',
  rare:      'border-sky-500/40 bg-sky-950/30',
  epic:      'border-violet-500/40 bg-violet-950/30',
  legendary: 'border-amber-500/40 bg-amber-950/30',
};
const RARITY_ICON_STYLES: Record<string, string> = {
  common:    'bg-zinc-800/60 text-zinc-300',
  rare:      'bg-sky-950/60 text-sky-300',
  epic:      'bg-violet-950/60 text-violet-300',
  legendary: 'bg-amber-950/60 text-amber-300',
};
const RARITY_LABEL: Record<string, string> = {
  common:    'pill-zinc',
  rare:      'text-sky-300 border border-sky-500/40 bg-sky-950/40',
  epic:      'text-violet-300 border border-violet-500/40 bg-violet-950/40',
  legendary: 'text-amber-300 border border-amber-500/40 bg-amber-950/40',
};

function CircleRing({ value, size = 80, stroke = 7, color = '#10b981' }: {
  value: number; size?: number; stroke?: number; color?: string;
}) {
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#0f2018" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="progress-ring-circle"
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
      />
    </svg>
  );
}

export default function ProgressPage() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const level = getLevelFromXP(progress.xp);
  const levelPct = getLevelProgress(progress.xp);
  const totalLessons = ALL_MODULES_META.reduce((acc, m) => acc + m.lessons.length, 0);
  const nextLevel = LEVELS[level.level] ?? level;

  const stats = [
    { label: 'Total XP', value: progress.xp.toLocaleString(), icon: Zap, color: 'text-emerald-400' },
    { label: 'Study Streak', value: `${progress.streak} Days`, icon: Flame, color: 'text-amber-400' },
    { label: 'Lessons Done', value: `${progress.totalLessonsCompleted}/${totalLessons}`, icon: CheckCircle, color: 'text-teal-400' },
    { label: 'Badges Earned', value: `${progress.badges.length}/${ALL_BADGES.length}`, icon: Trophy, color: 'text-yellow-300' },
  ];

  const earnedBadges = ALL_BADGES.filter(b => progress.badges.includes(b.id));
  const lockedBadges = ALL_BADGES.filter(b => !progress.badges.includes(b.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
            <TrendingUp className="text-emerald-400" size={21} />
          </div>
          <div>
            <span className="eyebrow">Your Journey</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Progress & Achievements
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 text-base leading-relaxed ml-14">
          Track your XP, learning streaks, level rank, and unlocked achievement badges.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fade-up delay-100">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="panel p-5 rounded-2xl flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <stat.icon size={15} className={stat.color} />
              <span className="text-zinc-500 text-xs font-medium">{stat.label}</span>
            </div>
            <p className={`text-2xl font-extrabold font-mono ${stat.color} leading-none`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Current Level Card */}
      <div className="panel p-7 lg:p-8 mb-8 rounded-3xl animate-fade-up delay-150">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Ring */}
          <div className="relative shrink-0">
            <CircleRing value={levelPct} size={96} stroke={8} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-extrabold font-mono text-emerald-400">{levelPct}%</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-1">
              <Trophy size={18} className="text-amber-400" />
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Current Rank</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">{level.title}</h2>
            <p className="text-zinc-400 text-sm mb-4">
              Level {level.level} of {LEVELS.length} · {progress.xp.toLocaleString()} XP
            </p>
            <ProgressBar value={levelPct} size="md" color="accent" animated />
            <p className="text-zinc-500 text-xs mt-2 font-mono">
              {level.maxXP - progress.xp} XP needed for <span className="text-emerald-400">{nextLevel?.title}</span>
            </p>
          </div>

          <div className="hidden sm:flex flex-col gap-2 shrink-0 text-right">
            <button
              onClick={() => navigate('/job-readiness')}
              className="button-secondary text-xs !py-2.5 !px-4"
            >
              <Target size={13} />
              Job Readiness
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              className="button-ghost text-xs"
            >
              Roadmap <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="animate-fade-up delay-200">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
            <Award size={19} className="text-amber-400" />
            Achievement Badges
            <span className="text-xs font-mono text-zinc-500 ml-1">
              ({earnedBadges.length}/{ALL_BADGES.length} earned)
            </span>
          </h2>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Star size={11} className="fill-emerald-400" /> Unlocked Achievements
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {earnedBadges.map((badge, i) => {
                const IconComp = ICON_MAP[badge.icon];
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-5 rounded-2xl border ${RARITY_STYLES[badge.rarity] || RARITY_STYLES.common} transition-all hover-lift`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${RARITY_ICON_STYLES[badge.rarity]}`}>
                        {IconComp ? <IconComp size={20} /> : <Star size={20} />}
                      </div>
                      <span className={`pill text-[10px] ${RARITY_LABEL[badge.rarity] || 'pill-zinc'}`}>
                        {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-0.5">{badge.title}</h4>
                    <p className="text-zinc-400 text-xs mb-2.5 leading-relaxed">{badge.description}</p>
                    <span className="pill pill-emerald text-[10px]">
                      <Zap size={9} /> +{badge.xpReward} XP
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><Lock size={18} /> Locked — {lockedBadges.length} remaining</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {lockedBadges.map(badge => {
                const IconComp = ICON_MAP[badge.icon];
                return (
                  <div
                    key={badge.id}
                    className="p-4 rounded-2xl border border-[#142a20] bg-black/40 opacity-50"
                  >
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="p-2 rounded-xl bg-black/60 text-zinc-600">
                        {IconComp ? <IconComp size={18} /> : <Star size={18} />}
                      </div>
                      <span className="pill pill-zinc text-[10px]">Locked</span>
                    </div>
                    <h4 className="font-semibold text-zinc-400 text-sm mb-0.5">{badge.title}</h4>
                    <p className="text-zinc-600 text-xs">{badge.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
