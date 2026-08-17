import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Flame, Zap, Target, Trophy, BookOpen,
  Coffee, Code2, Database, Globe,
  Atom, Leaf, Server, Shield, Terminal, Package, Cloud, Layers, FolderOpen,
  MessageSquare, TrendingUp, GitBranch, Workflow, Network, TestTube, BookOpenCheck,
  ShieldCheck, Compass, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP, getLevelProgress, LEVELS } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import ProgressBar from '@/components/ui/ProgressBar';

const MODULE_ICONS: Record<string, React.ReactNode> = {
  java: <Coffee size={22} />,
  oop: <Layers size={22} />,
  dsa: <Code2 size={22} />,
  sql: <Database size={22} />,
  html: <Globe size={22} />,
  css: <BookOpen size={22} />,
  javascript: <Zap size={22} />,
  react: <Atom size={22} />,
  spring: <Leaf size={22} />,
  'spring-boot': <Leaf size={22} />,
  'rest-api': <Server size={22} />,
  security: <Shield size={22} />,
  linux: <Terminal size={22} />,
  networking: <Network size={22} />,
  git: <GitBranch size={22} />,
  docker: <Package size={22} />,
  devops: <Workflow size={22} />,
  aws: <Cloud size={22} />,
  testing: <TestTube size={22} />,
  'system-design': <Layers size={22} />,
  projects: <FolderOpen size={22} />,
  interview: <MessageSquare size={22} />,
};

function GreetingHero() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const total = ALL_MODULES_META.reduce((s, m) => s + m.lessons.length, 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="relative overflow-hidden panel mb-8 p-8 lg:p-12 border-[#142a20] bg-ambient-radial rounded-3xl">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              Knowhere Tech · Full Stack Engineering Platform
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white mb-4 tracking-tight leading-tight">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Full Stack Engineer</span>
          </h1>

          <p className="text-zinc-300 text-base lg:text-lg max-w-2xl leading-relaxed mb-6">
            Master enterprise Java 25 LTS, high-throughput Spring Boot 3 microservices, React 19 frontends, and cloud-native Kubernetes infrastructure with visual concept tracers.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 font-mono text-xs">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-300">
              <Trophy size={16} className="text-amber-400" />
              <span className="font-bold">{level.title}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-400">
              <Zap size={16} className="text-emerald-400" />
              <span className="font-bold">{(progress?.xp || 0).toLocaleString()} XP</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/50 border border-emerald-800/50 text-amber-300">
              <Flame size={16} className="text-amber-400" />
              <span className="font-bold">{progress?.streak || 1} Day Streak</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
          <button
            onClick={() => navigate('/java/intro')}
            className="button-primary text-sm !py-3.5 !px-6"
          >
            <span>Start Java 25 Path</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className="button-secondary text-sm !py-3.5 !px-6"
          >
            <Compass size={16} />
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
    <div className="panel p-7 lg:p-8 border-[#142a20] rounded-3xl h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
          <TrendingUp size={20} className="text-emerald-400" />
          Overall Progression & Live Metrics
        </h2>

        {/* 4-Metric Spacious Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
          {[
            { label: 'Lessons Mastered', value: `${completed}/${total}`, icon: BookOpen, color: 'text-emerald-400' },
            { label: 'Total Experience', value: `${(progress?.xp || 0).toLocaleString()} XP`, icon: Zap, color: 'text-teal-400' },
            { label: 'Study Streak', value: `${progress?.streak || 1} Days`, icon: Flame, color: 'text-amber-400' },
            { label: 'Badges Earned', value: `${(progress?.badges || []).length}`, icon: Trophy, color: 'text-emerald-300' },
          ].map(item => (
            <div key={item.label} className="p-5 rounded-2xl bg-black border border-[#142a20] flex flex-col gap-1.5 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2">
                <item.icon size={16} className={item.color} />
                <span className="text-zinc-400 text-xs font-medium">{item.label}</span>
              </div>
              <span className="text-2xl font-extrabold font-mono text-white mt-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-zinc-300 font-medium">Curriculum Completion</span>
            <span className="font-mono font-bold text-emerald-400 text-base">{pct}%</span>
          </div>
          <ProgressBar value={pct} size="md" color="primary" animated />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-zinc-300 font-medium">Rank Progression · <strong className="text-white">{level.title}</strong></span>
            <span className="text-zinc-400 font-mono text-xs">Next Tier: {nextLevel?.title}</span>
          </div>
          <ProgressBar value={levelPct} size="sm" color="accent" animated />
        </div>
      </div>
    </div>
  );
}

function QuickResume() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/java/intro')}
      className="panel p-6 cursor-pointer hover:border-emerald-500/60 transition-all flex items-center justify-between gap-4 group rounded-3xl"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <Coffee size={26} />
        </div>
        <div className="min-w-0">
          <span className="eyebrow text-[10px] text-emerald-400 font-mono">
            Continue Learning
          </span>
          <h3 className="font-bold text-white text-base truncate mt-0.5 group-hover:text-emerald-300 transition-colors">
            Java 25 LTS Fundamentals
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">8 min · Interactive JIT Compilation</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-xl bg-black border border-[#142a20] flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40 shrink-0 transition-colors">
        <ChevronRight size={18} />
      </div>
    </div>
  );
}

function DailyGoal() {
  const { progress } = useLearning();
  const completed = Math.min(progress?.dailyGoalCompleted || 0, progress?.dailyGoalTarget || 4);
  const target = progress?.dailyGoalTarget || 4;
  const pct = Math.round((completed / target) * 100);

  return (
    <div className="panel p-6 border-[#142a20] rounded-3xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Target size={16} className="text-emerald-400" /> Daily Target
        </h3>
        <span className="font-mono text-sm text-emerald-400 font-bold">
          {completed}/{target} complete
        </span>
      </div>
      <ProgressBar value={pct} size="sm" color="accent" animated />
      <p className="text-xs text-zinc-400 mt-3 font-mono">Complete 4 lessons daily to maintain learning streak.</p>
    </div>
  );
}

function SkillsGrid() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const FEATURED_MODULES = [
    { key: 'java', label: 'Java 25 LTS', desc: 'Core language, records, pattern matching & virtual threads' },
    { key: 'oop', label: 'OOP Architecture', desc: 'Encapsulation, inheritance, dynamic dispatch & SOLID' },
    { key: 'dsa', label: 'DSA & Algorithms', desc: 'Big-O, linked lists, hash maps, trees, graph BFS/DFS & DP' },
    { key: 'sql', label: 'SQL & Relational DB', desc: 'Relational queries, multi-table JOINs, indexing & ACID' },
    { key: 'react', label: 'React 19 & Hooks', desc: 'Virtual DOM, custom hooks, context, state & router' },
    { key: 'spring', label: 'Spring Boot 3', desc: 'IoC container, DI, Spring Data JPA, security & REST' },
    { key: 'docker', label: 'Docker & Containers', desc: 'Multi-stage image layers, compose & network isolation' },
    { key: 'aws', label: 'AWS Cloud Architecture', desc: 'EC2, S3, RDS, ECS Fargate, CloudFront & VPC' },
    { key: 'linux', label: 'Linux Bash Terminal', desc: 'Filesystem permissions, bash pipelines & service management' },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <BookOpenCheck size={22} className="text-emerald-400" />
            Curriculum Modules
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">Structured pathways from foundations to cloud deployment.</p>
        </div>

        <button
          onClick={() => navigate('/roadmap')}
          className="button-secondary text-xs !py-2.5 !px-4 font-mono"
        >
          <span>View Full Roadmap</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_MODULES.map((item, i) => {
          const mod = progress?.modules?.[item.key];
          const completedCount = mod?.completedLessons || 0;
          const totalCount = 10;
          const pct = Math.min(100, Math.round((completedCount / totalCount) * 100));

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => navigate(`/${item.key}`)}
              className="panel p-7 cursor-pointer hover:border-emerald-500/60 transition-all duration-200 group flex flex-col justify-between rounded-3xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    {MODULE_ICONS[item.key] || <BookOpen size={22} />}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-emerald-300 transition-colors bg-black px-2.5 py-1 rounded-lg border border-[#142a20]">
                    {completedCount > 0 ? `${completedCount} completed` : 'Available'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
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
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 selection:bg-emerald-500/30">
      <GreetingHero />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <OverallProgress />
        </div>
        <div className="flex flex-col gap-6">
          <QuickResume />
          <DailyGoal />
        </div>
      </div>
      <SkillsGrid />
    </div>
  );
}
