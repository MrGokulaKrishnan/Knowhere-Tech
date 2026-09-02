import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, Trophy, CheckCircle, ChevronRight, Info,
  Map, Lock, Coffee, Layers, Code2, Database, Atom, Leaf,
  Server, Terminal, Package, Workflow, Cloud, GitBranch,
  Network, TestTube, ShieldCheck, BookOpen, FolderOpen, MessageSquare
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { ROADMAP_NODES } from '@/data/roadmapData';
import { clsx } from 'clsx';

type NodeStatus = 'completed' | 'in-progress' | 'available' | 'locked';

const NODE_ICONS: Record<string, React.ReactNode> = {
  java: <Coffee size={20} />,
  oop: <Layers size={20} />,
  dsa: <Code2 size={20} />,
  sql: <Database size={20} />,
  react: <Atom size={20} />,
  spring: <Leaf size={20} />,
  'spring-boot': <Leaf size={20} />,
  'rest-api': <Server size={20} />,
  linux: <Terminal size={20} />,
  docker: <Package size={20} />,
  devops: <Workflow size={20} />,
  aws: <Cloud size={20} />,
  git: <GitBranch size={20} />,
  networking: <Network size={20} />,
  testing: <TestTube size={20} />,
  security: <ShieldCheck size={20} />,
  'system-design': <Layers size={20} />,
  'advanced-java': <Coffee size={20} />,
  projects: <FolderOpen size={20} />,
  interview: <MessageSquare size={20} />,
};

function getNodeStatus(
  node: typeof ROADMAP_NODES[0],
  progress: ReturnType<typeof useLearning>['progress']
): NodeStatus {
  if (node.id === 'start') return 'completed';
  if (node.id === 'job-ready') {
    return (progress?.totalLessonsCompleted || 0) >= 40 ? 'available' : 'locked';
  }
  const mod = progress?.modules?.[node.id];
  if (mod && mod.percentage >= 100) return 'completed';
  if (mod && (mod.percentage > 0 || mod.completedLessons > 0)) return 'in-progress';

  if (node.dependencies && node.dependencies.length > 0) {
    const allMet = node.dependencies.every(depId => {
      if (depId === 'start') return true;
      const depMod = progress?.modules?.[depId];
      return depMod && depMod.percentage >= 100;
    });
    if (!allMet) return 'locked';
  }

  return 'available';
}

const STATUS_STYLES: Record<NodeStatus, string> = {
  completed:   'border-emerald-500/60 bg-emerald-950/25 text-white shadow-[0_0_20px_rgba(16,185,129,0.12)] glow-border-emerald',
  'in-progress': 'border-amber-500/60 bg-amber-950/20 text-white shadow-[0_0_20px_rgba(245,158,11,0.12)]',
  available:   'border-[#1e3a2a] bg-[#060a08] hover:border-emerald-500/50 text-zinc-100',
  locked:      'border-[#142a20]/50 bg-black/40 opacity-50 text-zinc-500',
};

const STATUS_BADGE: Record<NodeStatus, React.ReactNode> = {
  completed:   <span className="pill pill-emerald text-[10px]"><CheckCircle size={9} /> Completed</span>,
  'in-progress': <span className="pill pill-amber text-[10px] animate-pulse">⟳ In Progress</span>,
  available:   <span className="pill pill-zinc text-[10px]">Available</span>,
  locked:      <span className="pill pill-zinc text-[10px] opacity-60"><Lock size={9} /> Locked</span>,
};

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleNodeClick = (node: typeof ROADMAP_NODES[0], status: NodeStatus) => {
    if (status === 'locked') {
      const prereqTitles = node.dependencies
        .filter(depId => depId !== 'start')
        .map(depId => {
          const depNode = ROADMAP_NODES.find(n => n.id === depId);
          return depNode ? depNode.title : depId;
        });

      let msg = '';
      if (node.id === 'job-ready') {
        msg = 'Complete 40+ lessons across the curriculum to unlock this milestone';
      } else if (prereqTitles.length > 0) {
        msg = `Complete first: ${prereqTitles.join(', ')}`;
      } else {
        msg = 'Prerequisites required to unlock this module';
      }

      setToastMessage(msg);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    if (node.moduleKey === 'start' || node.moduleKey === 'job-ready') return;
    navigate(`/${node.moduleKey}`);
  };

  const completedCount = ROADMAP_NODES.filter(n => {
    if (n.id === 'start' || n.id === 'job-ready') return false;
    const s = getNodeStatus(n, progress);
    return s === 'completed';
  }).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
            <Map className="text-emerald-400" size={21} />
          </div>
          <div>
            <span className="eyebrow">Learning Journey</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Java Full Stack Roadmap
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 text-base leading-relaxed max-w-3xl ml-14">
          Sequential engineering milestones from JVM fundamentals to high-throughput Spring Boot microservices, React 19, and cloud-native AWS deployments.
        </p>

        {/* Progress summary */}
        <div className="flex flex-wrap gap-3 mt-5 ml-14">
          <span className="pill pill-emerald">{completedCount} Modules Completed</span>
          <span className="pill pill-zinc">{ROADMAP_NODES.length - 2} Total Modules</span>
          <span className="pill pill-amber">{progress?.totalLessonsCompleted || 0} Lessons Done</span>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-4 rounded-2xl bg-[#06140c] border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Lock size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Milestone Locked</p>
                <p className="text-xs font-mono text-emerald-300/80">{toastMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-black/40 hover:bg-emerald-950/60 transition-colors border border-[#142a20] cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Legend */}
      <div className="panel p-5 mb-8 rounded-2xl animate-fade-up delay-100">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Progress Legend:</span>
          {Object.entries(STATUS_BADGE).map(([status, badge]) => (
            <div key={status} className="flex items-center gap-2">{badge}</div>
          ))}
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[26px] top-6 bottom-6 w-1 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-[#0f1f17]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-pulse" />
        </div>

        <div className="space-y-4">
          {ROADMAP_NODES.map((node, index) => {
            const status = getNodeStatus(node, progress);
            const isStart = node.id === 'start';
            const isEnd = node.id === 'job-ready';
            const mod = progress?.modules?.[node.moduleKey];
            const completedLessons = mod?.completedLessons || 0;
            const nodeIcon = NODE_ICONS[node.moduleKey] || <BookOpen size={20} />;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.5), type: 'spring', damping: 20, stiffness: 200 }}
                className="relative pl-16"
              >
                {/* Node Circle */}
                <div className={clsx(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-300',
                  isStart
                    ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.45)]'
                    : isEnd
                    ? 'border-amber-400 bg-amber-950/80 text-amber-300 shadow-[0_0_22px_rgba(245,158,11,0.45)]'
                    : status === 'completed'
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : status === 'in-progress'
                    ? 'border-amber-400 bg-amber-950/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'border-[#142a20] bg-black text-zinc-600'
                )}>
                  {isStart && <Rocket size={20} />}
                  {isEnd && <Trophy size={20} />}
                  {!isStart && !isEnd && (
                    status === 'completed' ? <CheckCircle size={18} className="text-emerald-400" /> :
                    status === 'in-progress' ? nodeIcon :
                    status === 'locked' ? <Lock size={16} className="text-zinc-600" /> :
                    nodeIcon
                  )}
                </div>

                {/* Card */}
                {isStart || isEnd ? (
                  <div
                    onClick={isEnd && status === 'locked' ? () => handleNodeClick(node, status) : undefined}
                    className={clsx(
                      'p-5 rounded-2xl border font-extrabold text-sm text-center tracking-wider uppercase',
                      isEnd && status === 'locked' && 'cursor-pointer hover:opacity-75 transition-opacity',
                      isStart
                        ? 'border-emerald-500/50 bg-emerald-950/25 text-emerald-300'
                        : status === 'available'
                        ? 'border-amber-500/50 bg-amber-950/25 text-amber-300 cursor-pointer hover:border-amber-400'
                        : 'border-amber-500/30 bg-amber-950/15 text-amber-400/60'
                    )}
                  >
                  <div className="flex items-center justify-center gap-2">
                    {isStart ? <Rocket size={18} /> : <Trophy size={18} />}
                    <span>{node.title}</span>
                  </div>
                  </div>
                ) : (
                  <div
                    onClick={() => handleNodeClick(node, status)}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={clsx(
                      'p-5 rounded-2xl border transition-all duration-200 cursor-pointer',
                      STATUS_STYLES[status],
                      hoveredId === node.id && status !== 'locked' && '-translate-y-0.5 scale-[1.005]'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                          <span className="font-bold text-white text-base">{node.title}</span>
                          {STATUS_BADGE[status]}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                          <span>{node.lessonCount} lessons</span>
                          {completedLessons > 0 && (
                            <span className="text-emerald-400 font-bold">· {completedLessons} completed</span>
                          )}
                        </div>
                      </div>

                      {status !== 'locked' && (
                        <div className={clsx(
                          'w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ml-4 transition-all',
                          status === 'completed'
                            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
                            : 'bg-black border-[#142a20] text-zinc-500'
                        )}>
                          <ChevronRight size={15} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-10 panel p-6 flex items-start gap-4 rounded-2xl">
        <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-sm text-zinc-300">
          Each milestone includes interactive visual concept tracers, syntax explainers, algorithmic animations, and targeted technical interview Q&A. All progress is saved locally in your browser.
        </p>
      </div>
    </div>
  );
}
