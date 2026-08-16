import React from 'react';
import { TrendingUp, Zap, Flame, Trophy, BookOpen, CheckCircle, Award, Star } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP, getLevelProgress, LEVELS, ALL_BADGES } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';

export default function ProgressPage() {
  const { progress } = useLearning();
  const level = getLevelFromXP(progress.xp);
  const levelPct = getLevelProgress(progress.xp);
  const totalLessons = ALL_MODULES_META.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="text-primary" size={24} />
          <h1 className="text-2xl font-display font-bold text-text">
            Personal Progress & Achievements
          </h1>
        </div>
        <p className="text-text-muted text-sm">
          Track your overall experience points (XP), learning streaks, level rank, and unlocked badges.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total XP', value: progress.xp.toLocaleString(), icon: Zap, color: 'text-primary' },
          { label: 'Study Streak', value: `${progress.streak} Days`, icon: Flame, color: 'text-warning' },
          { label: 'Completed', value: `${progress.totalLessonsCompleted}/${totalLessons}`, icon: CheckCircle, color: 'text-secondary' },
          { label: 'Badges Earned', value: `${progress.badges.length}/${ALL_BADGES.length}`, icon: Trophy, color: 'text-accent' },
        ].map(stat => (
          <Card key={stat.label}>
            <div className="flex items-center gap-2 mb-1.5">
              <stat.icon size={16} className={stat.color} />
              <span className="text-text-subtle text-xs">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold font-display text-text">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Current Level Rank */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Current Rank</span>
            <h2 className="text-xl font-bold text-text">{level.title}</h2>
          </div>
          <span className="text-xs font-mono text-text-subtle">
            Level {level.level} of {LEVELS.length}
          </span>
        </div>
        <ProgressBar value={levelPct} size="md" color="accent" showLabel animated />
        <p className="text-text-subtle text-xs mt-2">
          {progress.xp} XP current · {level.maxXP} XP required for next rank
        </p>
      </Card>

      {/* Badges Matrix */}
      <Card className="mb-6">
        <h2 className="text-base font-semibold text-text mb-1 flex items-center gap-2">
          <Award size={18} className="text-warning" /> Earned Badges & Milestones
        </h2>
        <p className="text-xs text-text-subtle mb-4">Complete modules, maintain streaks, and score on quizzes to unlock badges.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_BADGES.map(badge => {
            const isEarned = progress.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all ${
                  isEarned
                    ? 'border-warning/40 bg-warning/5'
                    : 'border-border bg-bg-elevated opacity-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{badge.icon}</span>
                  {isEarned ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-primary text-text-subtle border border-border">
                      Locked
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-text text-sm mb-0.5">{badge.title}</h4>
                <p className="text-text-subtle text-xs mb-2">{badge.description}</p>
                <span className="text-[10px] font-mono text-primary">+{badge.xpReward} XP</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
