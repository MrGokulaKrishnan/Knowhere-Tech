import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Trophy, CheckCircle, Circle, ChevronRight, Info, Map, Sparkles } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { ROADMAP_NODES } from '@/data/roadmapData';
import { clsx } from 'clsx';

type NodeStatus = 'completed' | 'in-progress' | 'available' | 'locked';

function getNodeStatus(nodeId: string, progress: ReturnType<typeof useLearning>['progress']): NodeStatus {
  if (nodeId === 'start') return 'completed';
  if (nodeId === 'job-ready') {
    return (progress?.totalLessonsCompleted || 0) > 40 ? 'available' : 'locked';
  }
  const mod = progress?.modules?.[nodeId];
  if (!mod) {
    return 'available';
  }
  if (mod.percentage >= 100) return 'completed';
  if (mod.percentage > 0 || mod.completedLessons > 0) return 'in-progress';
  return 'available';
}

const STATUS_STYLES: Record<NodeStatus, string> = {
  completed: 'border-emerald-500/60 bg-emerald-950/30 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  'in-progress': 'border-emerald-400/60 bg-emerald-950/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]',
  available: 'border-[#142a20] bg-[#060a08] hover:border-emerald-500/50 text-zinc-100',
  locked: 'border-[#142a20]/50 bg-black/40 opacity-40 text-zinc-600',
};

const STATUS_BADGE: Record<NodeStatus, React.ReactNode> = {
  completed: <span className="text-xs font-mono px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">Completed</span>,
  'in-progress': <span className="text-xs font-mono px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/50 animate-pulse font-bold">In Progress</span>,
  available: <span className="text-xs font-mono px-3 py-1 rounded-xl bg-[#070c09] text-zinc-400 border border-[#142a20]">Available</span>,
  locked: <span className="text-xs font-mono px-3 py-1 rounded-xl bg-black text-zinc-600 border border-[#142a20]">Locked</span>,
};

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNodeClick = (node: typeof ROADMAP_NODES[0], status: NodeStatus) => {
    if (status === 'locked') return;
    if (node.moduleKey === 'start' || node.moduleKey === 'job-ready') return;
    navigate(`/${node.moduleKey}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Map className="text-emerald-400" size={26} />
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white">
            Java Full Stack Developer Roadmap
          </h1>
        </div>
        <p className="text-zinc-400 text-base leading-relaxed max-w-3xl">
          Sequential engineering milestones from JVM core language fundamentals to high-throughput Spring Boot microservices, React 19, and cloud architectures.
        </p>
      </div>

      {/* Legend */}
      <div className="panel flex flex-wrap gap-4 mb-10 p-5 items-center justify-between rounded-2xl">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">Milestone Progress Key:</span>
        <div className="flex flex-wrap gap-3">
          {Object.entries(STATUS_BADGE).map(([status, badge]) => (
            <div key={status} className="flex items-center gap-2">
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Tree */}
      <div className="relative">
        {/* Vertical Emerald Neon Connecting Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-gradient-to-b from-emerald-500 via-teal-400 to-[#142a20] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.35)]" />

        <div className="space-y-5">
          {ROADMAP_NODES.map((node, index) => {
            const status = getNodeStatus(node.id, progress);
            const isStart = node.id === 'start';
            const isEnd = node.id === 'job-ready';
            const mod = progress?.modules?.[node.moduleKey];
            const completedCount = mod?.completedLessons || 0;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.4) }}
                className="relative pl-16"
              >
                {/* Node Milestone Circle */}
                <div className={clsx(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-300 shadow-lg',
                  isStart
                    ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                    : isEnd
                    ? 'border-amber-400 bg-amber-950/80 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                    : status === 'completed'
                    ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300'
                    : status === 'in-progress'
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-400'
                    : 'border-[#142a20] bg-black text-zinc-600'
                )}>
                  {isStart && <Rocket size={22} />}
                  {isEnd && <Trophy size={22} />}
                  {!isStart && !isEnd && (
                    status === 'completed' ? <CheckCircle size={20} /> :
                    status === 'in-progress' ? <Circle size={18} className="animate-ping" /> :
                    <span className="font-mono text-sm font-bold">{index}</span>
                  )}
                </div>

                {/* Milestone Card */}
                {isStart || isEnd ? (
                  <div className={clsx(
                    'p-6 rounded-3xl border font-display font-extrabold text-base text-center tracking-wider uppercase shadow-md',
                    isStart ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300' : 'border-amber-500/50 bg-amber-950/30 text-amber-300'
                  )}>
                    {node.title}
                  </div>
                ) : (
                  <div
                    onClick={() => handleNodeClick(node, status)}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={clsx(
                      'p-6 rounded-3xl border transition-all duration-200',
                      status !== 'locked' && 'cursor-pointer',
                      STATUS_STYLES[status],
                      hoveredId === node.id && status !== 'locked' && 'scale-[1.01] -translate-y-0.5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-bold text-white text-base lg:text-lg">{node.title}</span>
                          {STATUS_BADGE[status]}
                        </div>
                        <p className="text-zinc-400 text-xs font-mono">
                          {node.lessonCount} Structured Lessons
                          {completedCount > 0 && ` · ${completedCount} Completed`}
                        </p>
                      </div>

                      {status !== 'locked' && (
                        <div className="w-9 h-9 rounded-xl bg-black border border-[#142a20] flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 shrink-0 ml-4">
                          <ChevronRight size={18} />
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

      {/* Info Transparency Note */}
      <div className="mt-10 panel p-6 flex items-start gap-4 text-xs text-zinc-400 rounded-2xl">
        <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-zinc-300">
          Each milestone incorporates interactive syntax explainers, visual algorithmic animations, and targeted technical interview discussions. All completed milestones persist locally in your browser storage.
        </p>
      </div>
    </div>
  );
}
