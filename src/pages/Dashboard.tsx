import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Flame, Zap, Target, Trophy, BookOpen,
  Coffee, Code2, Database, Globe,
  Atom, Leaf, Server, Shield, Terminal, Package, Cloud, Layers, FolderOpen,
  MessageSquare, TrendingUp, GitBranch, Workflow, Network, TestTube, BookOpenCheck,
  ShieldCheck, Compass, Sparkles, CheckCircle2
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP, getLevelProgress, LEVELS } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import ProgressBar from '@/components/ui/ProgressBar';

const MODULE_ICONS: Record<string, React.ReactNode> = {
  java: <Coffee size={18} />,
  dsa: <Code2 size={18} />,
  sql: <Database size={18} />,
  html: <Globe size={18} />,
  css: <BookOpen size={18} />,
  javascript: <Zap size={18} />,
  react: <Atom size={18} />,
  spring: <Leaf size={18} />,
  'spring-boot': <Leaf size={18} />,
  'rest-api': <Server size={18} />,
  security: <Shield size={18} />,
  linux: <Terminal size={18} />,
  networking: <Network size={18} />,
  git: <GitBranch size={18} />,
  docker: <Package size={18} />,
  devops: <Workflow size={18} />,
  aws: <Cloud size={18} />,
  testing: <TestTube size={18} />,
  'system-design': <Layers size={18} />,
  projects: <FolderOpen size={18} />,
  interview: <MessageSquare size={18} />,
};

function GreetingHero() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const total = ALL_MODULES_META.reduce((s, m) => s + m.lessons.length, 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="relative overflow-hidden panel mb-6 p-6 lg:p-8 border-[#142a20] bg-ambient-radial">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow text-emerald-400 font-mono">
              Knowhere Tech · 2027 Full Stack Platform
            </span>
          </div>

          <h1 className="text-2xl lg:text-4xl font-display font-extrabold text-white mb-2 tracking-tight">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Engineer</span>
          </h1>

          <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
            Interactive, visual engineering curriculum for Java 25 LTS, Spring Boot 3, React 19, and cloud architectures.
            Mastered <span className="text-emerald-400 font-mono font-semibold">{progress?.totalLessonsCompleted || 0} of {total}</span> concepts across the system.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
              <Trophy size={13} className="text-amber-400" />
              <span>{level.title}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
              <Zap size={13} className="text-emerald-400" />
              <span>{progress?.xp || 0} XP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-amber-300">
              <Flame size={13} className="text-amber-400" />
              <span>{progress?.streak || 1} Day Streak</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={() => navigate('/java/intro')}
            className="button-primary text-xs"
          >
            <span>Start Learning Java 25</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className="button-secondary text-xs"
          >
            <Compass size={14} />
            <span>Interactive Roadmap</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function OverallProgress() {
  const { progress } = useLearning();
  const total = ALL_MODULES_META.reduce((s, m) => s + m.lessons.length, 0);
  const completed = progress?.totalLessonsCompleted || 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const level = getLevelFromXP(progress?.xp || 0);
  const levelPct = getLevelProgress(progress?.xp || 0);
  const nextLevel = LEVELS[level.level] ?? level;

  return (
    <div className="panel p-5 mb-4 border-[#142a20]">
      <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-emerald-400" />
        Overall Progression & Metrics
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Lessons Mastered', value: `${completed}/${total}`, icon: BookOpen, color: 'text-emerald-400' },
          { label: 'Total Experience', value: `${(progress?.xp || 0).toLocaleString()} XP`, icon: Zap, color: 'text-teal-400' },
          { label: 'Study Streak', value: `${progress?.streak || 1} Days`, icon: Flame, color: 'text-amber-400' },
          { label: 'Badges Earned', value: `${(progress?.badges || []).length}`, icon: Trophy, color: 'text-emerald-300' },
        ].map(item => (
          <div key={item.label} className="p-3.5 rounded-xl bg-black border border-[#142a20] flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <item.icon size={13} className={item.color} />
              <span className="text-zinc-400 text-[11px] font-medium">{item.label}</span>
            </div>
            <span className="text-lg font-bold font-mono text-white mt-0.5">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-zinc-400">Curriculum Completion</span>
          <span className="font-mono font-bold text-emerald-400">{pct}%</span>
        </div>
        <ProgressBar value={pct} size="md" color="primary" animated />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-zinc-400">Rank Progression · <strong className="text-white">{level.title}</strong></span>
          <span className="text-zinc-500 font-mono text-[11px]">Next Tier: {nextLevel?.title}</span>
        </div>
        <ProgressBar value={levelPct} size="sm" color="accent" animated />
      </div>
    </div>
  );
}

function QuickResume() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/java/intro')}
      className="panel p-4 cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between gap-3 group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
          <Coffee size={20} />
        </div>
        <div className="min-w-0">
          <span className="eyebrow text-[9px] text-emerald-400 font-mono">
            Continue Learning
          </span>
          <h3 className="font-semibold text-white text-sm truncate">
            Java 25 LTS Fundamentals
          </h3>
          <p className="text-[11px] text-zinc-500 font-mono">8 min · Visual Bytecode Pipeline</p>
        </div>
      </div>
      <ArrowRight size={16} className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
    </div>
  );
}

function DailyGoal() {
  const { progress } = useLearning();
  const completed = Math.min(progress?.dailyGoalCompleted || 0, progress?.dailyGoalTarget || 4);
  const target = progress?.dailyGoalTarget || 4;
  const pct = Math.round((completed / target) * 100);

  return (
    <div className="panel p-4 border-[#142a20]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
          <Target size={14} className="text-emerald-400" /> Daily Target
        </h3>
        <span className="font-mono text-xs text-emerald-400 font-bold">
          {completed}/{target} complete
        </span>
      </div>
      <ProgressBar value={pct} size="sm" color="accent" animated />
    </div>
  );
}

function SkillsGrid() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const FEATURED_MODULES = [
    { key: 'java', label: 'Java 25 LTS', desc: 'Core language, records, and virtual threads' },
    { key: 'oop', label: 'OOP Architecture', desc: 'Encapsulation, inheritance & dynamic dispatch' },
    { key: 'dsa', label: 'DSA & Algorithms', desc: 'Big-O, two-pointers, sorting & trees' },
    { key: 'sql', label: 'SQL & Database', desc: 'Relational queries, indexing & ACID joins' },
    { key: 'react', label: 'React 19', desc: 'Components, hooks, actions & reconciliation' },
    { key: 'spring', label: 'Spring Boot 3', desc: 'IoC container, DI & auto-configuration' },
    { key: 'docker', label: 'Docker & Containers', desc: 'Multi-stage builds & container networking' },
    { key: 'aws', label: 'AWS Cloud Architecture', desc: 'EC2, S3, RDS, ECS Fargate & CloudFront' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <BookOpenCheck size={16} className="text-emerald-400" />
          Curriculum Modules
        </h2>
        <button
          onClick={() => navigate('/roadmap')}
          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          Full Roadmap <ArrowRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FEATURED_MODULES.map((item, i) => {
          const mod = progress?.modules?.[item.key];
          const completedCount = mod?.completedLessons || 0;
          const totalCount = 10;
          const pct = Math.min(100, Math.round((completedCount / totalCount) * 100));

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/${item.key}`)}
              className="panel p-4 cursor-pointer hover:border-emerald-500/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                    {MODULE_ICONS[item.key] || <BookOpen size={16} />}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-emerald-300 transition-colors">
                    {completedCount > 0 ? `${completedCount} done` : 'Ready'}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-emerald-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.desc}
                </p>
              </div>

              <div>
                <ProgressBar value={pct} size="xs" color="primary" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      <GreetingHero />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <OverallProgress />
        </div>
        <div className="flex flex-col gap-3">
          <QuickResume />
          <DailyGoal />
        </div>
      </div>
      <SkillsGrid />
    </div>
  );
}
