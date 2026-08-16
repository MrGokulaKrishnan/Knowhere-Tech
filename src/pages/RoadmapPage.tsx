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
  completed: 'border-emerald-500/60 bg-emerald-950/30 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  'in-progress': 'border-emerald-400/60 bg-emerald-950/20 text-white',
  available: 'border-[#142a20] bg-[#050806e6] hover:border-emerald-500/50 text-zinc-100',
  locked: 'border-[#142a20]/50 bg-black/40 opacity-40 text-zinc-600',
};

const STATUS_BADGE: Record<NodeStatus, React.ReactNode> = {
  completed: <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">Completed</span>,
  'in-progress': <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-500/40 animate-pulse">In Progress</span>,
  available: <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#050806] text-zinc-400 border border-[#142a20]">Available</span>,
  locked: <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-black text-zinc-600 border border-[#142a20]">Locked</span>,
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
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Map className="text-emerald-400" size={22} />
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
            2027 Java Full Stack Developer Roadmap
          </h1>
        </div>
        <p className="text-zinc-400 text-sm">
          Sequential engineering milestones from language fundamentals to production cloud architectures.
        </p>
      </div>

      {/* Legend */}
      <div className="panel flex flex-wrap gap-3 mb-8 p-3.5 items-center justify-between">
        <span className="text-xs font-mono text-zinc-500 uppercase">Milestone Status:</span>
        <div className="flex flex-wrap gap-2.5">
          {Object.entries(STATUS_BADGE).map(([status, badge]) => (
            <div key={status} className="flex items-center gap-1.5">
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Tree */}
      <div className="relative">
        {/* Vertical Emerald Neon Connecting Line */}
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-[#142a20] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />

        <div className="space-y-3">
          {ROADMAP_NODES.map((node, index) => {
            const status = getNodeStatus(node.id, progress);
            const isStart = node.id === 'start';
            const isEnd = node.id === 'job-ready';
            const mod = progress?.modules?.[node.moduleKey];
            const completedCount = mod?.completedLessons || 0;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.4) }}
                className="relative pl-14"
              >
                {/* Node Milestone Circle */}
                <div className={clsx(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-300',
                  isStart
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105'
                    : isEnd
                    ? 'border-amber-400 bg-amber-950/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105'
                    : status === 'completed'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : status === 'in-progress'
                    ? 'border-emerald-400 bg-emerald-950/30 text-emerald-400'
                    : 'border-[#142a20] bg-black text-zinc-600'
                )}>
                  {isStart && <Rocket size={18} />}
                  {isEnd && <Trophy size={18} />}
                  {!isStart && !isEnd && (
                    status === 'completed' ? <CheckCircle size={16} /> :
                    status === 'in-progress' ? <Circle size={14} className="animate-ping" /> :
                    <span className="font-mono text-xs">{index}</span>
                  )}
                </div>

                {/* Milestone Card */}
                {isStart || isEnd ? (
                  <div className={clsx(
                    'p-4 rounded-2xl border font-display font-extrabold text-sm text-center tracking-wider uppercase',
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
                      'p-4 rounded-2xl border transition-all duration-200',
                      status !== 'locked' && 'cursor-pointer',
                      STATUS_STYLES[status],
                      hoveredId === node.id && status !== 'locked' && 'scale-[1.01]'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-sm">{node.title}</span>
                          {STATUS_BADGE[status]}
                        </div>
                        <p className="text-zinc-500 text-xs font-mono">
                          {node.lessonCount} Lessons
                          {completedCount > 0 && ` · ${completedCount} Completed`}
                        </p>
                      </div>

                      {status !== 'locked' && (
                        <ChevronRight size={16} className="text-zinc-500 group-hover:text-emerald-400 shrink-0 ml-3" />
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
      <div className="mt-8 panel p-4 flex items-start gap-3 text-xs text-zinc-400">
        <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
        <p>
          Each milestone incorporates interactive syntax explainers, visual algorithmic animations, and targeted technical interview discussions. Progress saves locally.
        </p>
      </div>
    </div>
  );
}
