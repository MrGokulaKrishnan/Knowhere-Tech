import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Flame, Zap, Target, Trophy, BookOpen,
  Coffee, Code2, Database, Globe,
  Atom, Leaf, Server, Shield, Terminal, Package, Cloud, Layers, FolderOpen,
  MessageSquare, TrendingUp, GitBranch, Workflow, Network, TestTube, BookOpenCheck,
  CheckCircle2, ChevronRight, Star, PlayCircle, Map
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import { getLevelFromXP, getLevelProgress, LEVELS } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import ProgressBar from '@/components/ui/ProgressBar';
import { LiquidStatPill, LiquidStatCard } from '@/components/ui/LiquidGlassStats';

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

const MODULE_COLORS: Record<string, string> = {
  java:          'from-orange-500/20 to-amber-500/10 border-orange-500/25',
  oop:           'from-violet-500/20 to-purple-500/10 border-violet-500/25',
  dsa:           'from-blue-500/20 to-cyan-500/10 border-blue-500/25',
  sql:           'from-sky-500/20 to-blue-500/10 border-sky-500/25',
  react:         'from-cyan-500/20 to-teal-500/10 border-cyan-500/25',
  spring:        'from-emerald-500/20 to-green-500/10 border-emerald-500/25',
  docker:        'from-blue-400/20 to-blue-600/10 border-blue-400/25',
  aws:           'from-amber-500/20 to-yellow-500/10 border-amber-500/25',
  linux:         'from-zinc-400/20 to-zinc-600/10 border-zinc-400/25',
};

const ICON_COLORS: Record<string, string> = {
  java: 'text-orange-400',
  oop: 'text-violet-400',
  dsa: 'text-blue-400',
  sql: 'text-sky-400',
  react: 'text-cyan-400',
  spring: 'text-emerald-400',
  docker: 'text-blue-400',
  aws: 'text-amber-400',
  linux: 'text-zinc-300',
};

function GreetingHero() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const { user } = useAuth();
  const level = getLevelFromXP(progress?.xp || 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const userName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Engineer';

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 liquid-glass liquid-mesh-bg border-emerald-500/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-ambient-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="eyebrow">Knowhere Tech · Full Stack Cloud Platform</span>
              <span className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Star size={12} className="fill-amber-400" /> Firestore Connected
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
              {greeting},{' '}
              <span className="text-gradient">{userName}</span>
            </h1>

            <p className="text-zinc-300 text-base lg:text-lg leading-relaxed mb-7 max-w-xl">
              Master <span className="text-emerald-300 font-semibold">Java 25 LTS</span>, Spring Boot 3 microservices, React 19 frontends, and cloud-native architectures with real-time interactive concept engines.
            </p>

            {/* Liquid Glass Metric Badges: Novice Engineer, 0 XP, 1 Day Streak, 0 Lessons Done */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-7">
              <LiquidStatPill
                type="rank"
                value={level.title}
                onClick={() => navigate('/progress')}
              />
              <LiquidStatPill
                type="xp"
                value={`${(progress?.xp || 0).toLocaleString()} XP`}
                onClick={() => navigate('/progress')}
              />
              <LiquidStatPill
                type="streak"
                value={`${progress?.streak || 1} Day Streak`}
                onClick={() => navigate('/daily')}
              />
              <LiquidStatPill
                type="lessons"
                value={`${progress?.totalLessonsCompleted || 0} Lessons Done`}
                onClick={() => navigate('/roadmap')}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/java/intro')}
                className="button-primary"
              >
                <PlayCircle size={16} />
                <span>Start Java 25 Path</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate('/roadmap')}
                className="button-secondary"
              >
                <Map size={15} />
                <span>Interactive Roadmap</span>
              </button>
            </div>
          </div>

          {/* Right side stats visual */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-52">
            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-4xl font-extrabold text-gradient font-mono mb-1">
                {ALL_MODULES_META.reduce((s, m) => s + m.lessons.length, 0)}+
              </div>
              <div className="text-zinc-400 text-xs font-mono">Total Lessons</div>
            </div>
            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-4xl font-extrabold text-amber-400 font-mono mb-1">8</div>
              <div className="text-zinc-400 text-xs font-mono">Project Blueprints</div>
            </div>
            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="text-4xl font-extrabold text-sky-400 font-mono mb-1">500+</div>
              <div className="text-zinc-400 text-xs font-mono">Interview Q&A</div>
            </div>
          </div>
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

        {/* Liquid Glass Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-7">
          <LiquidStatCard
            type="lessons"
            title="Lessons Mastered"
            value={`${completed}/${total}`}
            subtitle={`${pct}% Mastered`}
          />
          <LiquidStatCard
            type="xp"
            title="Total Experience"
            value={`${(progress?.xp || 0).toLocaleString()} XP`}
            subtitle="Cloud Synced"
          />
          <LiquidStatCard
            type="streak"
            title="Study Streak"
            value={`${progress?.streak || 1} Days`}
            subtitle="Streak Active"
          />
          <LiquidStatCard
            type="rank"
            title="Current Rank"
            value={level.title}
            subtitle={`Next: ${nextLevel?.title || 'Max'}`}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2.5 text-sm">
            <span className="text-zinc-300 font-medium">Curriculum Completion</span>
            <span className="font-mono font-extrabold text-emerald-400">{pct}%</span>
          </div>
          <ProgressBar value={pct} size="md" color="primary" animated />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2.5 text-sm">
            <span className="text-zinc-300 font-medium">
              Rank · <strong className="text-white">{level.title}</strong>
            </span>
            <span className="text-zinc-500 font-mono text-xs">Next: {nextLevel?.title}</span>
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
      className="panel p-6 cursor-pointer hover:border-emerald-500/50 transition-all group rounded-3xl hover-lift"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-glow-pulse">
          <Coffee size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="eyebrow text-[10px]">Continue Learning</span>
          <h3 className="font-bold text-white text-base truncate mt-0.5 group-hover:text-emerald-300 transition-colors">
            Java 25 LTS Fundamentals
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">8 min · JVM Internals & JIT Compilation</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-black border border-[#142a20] flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/40 shrink-0 transition-all group-hover:translate-x-1">
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}

function DailyGoal() {
  const { progress } = useLearning();
  const completed = Math.min(progress?.dailyGoalCompleted || 0, progress?.dailyGoalTarget || 4);
  const target = progress?.dailyGoalTarget || 4;
  const pct = Math.round((completed / target) * 100);

  // Circular ring params
  const r = 32, cx = 40, cy = 40;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="panel p-6 border-[#142a20] rounded-3xl">
      <div className="flex items-center gap-4">
        {/* Circular progress ring */}
        <div className="relative shrink-0">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f2018" strokeWidth="7" />
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#10b981"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="progress-ring-circle"
              style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.5))' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-emerald-400 font-extrabold font-mono text-sm">{pct}%</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Target size={15} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Daily Target</h3>
          </div>
          <p className="text-2xl font-extrabold font-mono text-white leading-none mb-1">
            {completed}<span className="text-zinc-500 text-base">/{target}</span>
          </p>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">Complete {target} lessons daily to maintain your streak.</p>
        </div>
      </div>
    </div>
  );
}

function SkillsGrid() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const FEATURED_MODULES = [
    { key: 'java',     label: 'Java 25 LTS',           desc: 'Records, pattern matching, virtual threads & JVM internals' },
    { key: 'oop',      label: 'OOP Architecture',       desc: 'Encapsulation, inheritance, polymorphism & SOLID principles' },
    { key: 'dsa',      label: 'DSA & Algorithms',       desc: 'Big-O analysis, linked lists, trees, graphs, BFS/DFS & DP' },
    { key: 'sql',      label: 'SQL & Relational DB',    desc: 'Multi-table JOINs, window functions, indexing & ACID' },
    { key: 'react',    label: 'React 19 & Hooks',       desc: 'Virtual DOM, custom hooks, context API, state & routing' },
    { key: 'spring',   label: 'Spring Boot 3',          desc: 'IoC container, Spring Data JPA, security filters & REST' },
    { key: 'docker',   label: 'Docker & Containers',    desc: 'Multi-stage builds, Compose, networking & volume management' },
    { key: 'aws',      label: 'AWS Cloud Architecture', desc: 'EC2, S3, RDS, ECS Fargate, CloudFront & VPC design' },
    { key: 'linux',    label: 'Linux Bash Terminal',    desc: 'Filesystem, permissions, bash scripting & service management' },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <BookOpenCheck size={22} className="text-emerald-400" />
            Curriculum Modules
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Structured pathways from Java foundations to cloud deployment.</p>
        </div>

        <button
          onClick={() => navigate('/roadmap')}
          className="button-ghost hidden sm:flex"
        >
          <span>Full Roadmap</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_MODULES.map((item, i) => {
          const mod = progress?.modules?.[item.key];
          const completedCount = mod?.completedLessons || 0;
          const totalCount = ALL_MODULES_META.find(m => m.key === item.key)?.lessons?.length || 10;
          const pct = Math.min(100, Math.round((completedCount / totalCount) * 100));
          const colorClass = MODULE_COLORS[item.key] || 'from-emerald-500/20 to-teal-500/10 border-emerald-500/25';
          const iconColor = ICON_COLORS[item.key] || 'text-emerald-400';

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.045, type: 'spring', damping: 20, stiffness: 200 }}
              onClick={() => navigate(`/${item.key}`)}
              className="panel p-7 cursor-pointer hover:border-emerald-500/50 transition-all duration-200 group flex flex-col justify-between rounded-3xl hover-lift"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClass} border flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
                    {MODULE_ICONS[item.key] || <BookOpen size={22} />}
                  </div>
                  <span className={`pill ${pct === 100 ? 'pill-emerald' : pct > 0 ? 'pill-amber' : 'pill-zinc'}`}>
                    {pct === 100 ? '✓ Done' : completedCount > 0 ? `${completedCount} done` : 'Available'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-gradient transition-colors">
                  {item.label}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-zinc-500 text-xs font-mono">{completedCount}/{totalCount} lessons</span>
                  <span className={`text-xs font-mono font-bold ${pct > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>{pct}%</span>
                </div>
                <ProgressBar value={pct} size="xs" color="primary" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile roadmap button */}
      <div className="flex sm:hidden justify-center mt-6">
        <button
          onClick={() => navigate('/roadmap')}
          className="button-secondary w-full max-w-xs"
        >
          <span>View Full Roadmap</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 selection:bg-emerald-500/30">
      <GreetingHero />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2">
          <OverallProgress />
        </div>
        <div className="flex flex-col gap-5">
          <QuickResume />
          <DailyGoal />
        </div>
      </div>
      <SkillsGrid />
    </div>
  );
}
