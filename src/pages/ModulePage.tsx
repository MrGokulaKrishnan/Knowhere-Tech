import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, ChevronRight, ArrowRight, Zap, Trophy, Target, Layers } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { ALL_MODULES_META } from '@/data/modules/meta';
import type { ModuleKey } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import { clsx } from 'clsx';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:     'pill-emerald',
  intermediate: 'pill-amber',
  advanced:     'pill-red',
};

interface ModulePageProps {
  moduleKey: ModuleKey;
}

export default function ModulePage({ moduleKey }: ModulePageProps) {
  const navigate = useNavigate();
  const { progress } = useLearning();
  const meta = ALL_MODULES_META.find(m => m.key === moduleKey);

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <Layers size={40} className="text-zinc-700 mb-4" />
        <p className="text-zinc-400 mb-6 text-lg">Module not found: {moduleKey}</p>
        <button onClick={() => navigate('/dashboard')} className="button-secondary">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const mod = progress?.modules?.[moduleKey];
  const completed = mod?.completedLessons || 0;
  const pct = meta.lessons.length > 0 ? Math.min(100, Math.round((completed / meta.lessons.length) * 100)) : 0;

  // Find first incomplete lesson for "Continue" action
  const nextLesson = meta.lessons.find(l => progress?.lessons?.[l.id]?.status !== 'completed');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-7 font-mono animate-fade-in">
        <button onClick={() => navigate('/dashboard')} className="hover:text-emerald-400 transition-colors">
          Dashboard
        </button>
        <ChevronRight size={13} />
        <button onClick={() => navigate('/roadmap')} className="hover:text-emerald-400 transition-colors">
          Roadmap
        </button>
        <ChevronRight size={13} />
        <span className="text-emerald-400 font-bold">{meta.title}</span>
      </div>

      {/* Module Hero */}
      <div className="panel p-8 lg:p-10 mb-8 rounded-3xl bg-hero-mesh animate-fade-up relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              <span className="eyebrow mb-3 block">Module Overview</span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                {meta.title}
              </h1>
              <p className="text-zinc-300 text-base leading-relaxed max-w-2xl mb-6">
                {meta.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {nextLesson ? (
                  <button
                    onClick={() => navigate(`/${moduleKey}/${nextLesson.slug}`)}
                    className="button-primary"
                  >
                    <span>{completed === 0 ? 'Start Module' : 'Continue Learning'}</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <span className="pill pill-emerald text-sm px-4 py-2">
                    <CheckCircle size={14} /> Module Complete!
                  </span>
                )}
                <button
                  onClick={() => navigate('/roadmap')}
                  className="button-ghost"
                >
                  View Roadmap
                </button>
              </div>
            </div>

            {/* Stats panel */}
            <div className="glass-card p-6 rounded-2xl text-center shrink-0 w-full sm:w-44">
              <div className="text-4xl font-extrabold font-mono text-gradient mb-1">{pct}%</div>
              <div className="text-zinc-500 text-xs font-mono mb-4">Complete</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Lessons</span>
                  <span className="text-white font-mono font-bold">{completed}/{meta.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">XP Available</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {meta.lessons.length * 50} XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
              <span>{completed} lessons completed</span>
              <span className="text-emerald-400 font-bold">{pct}%</span>
            </div>
            <ProgressBar value={pct} size="md" color="primary" animated />
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5 mb-5">
          <BookOpen size={19} className="text-emerald-400" />
          Lessons in This Module
          <span className="text-xs font-mono text-zinc-500 ml-1">({meta.lessons.length} total)</span>
        </h2>
      </div>

      <div className="space-y-3">
        {meta.lessons.map((lesson, index) => {
          const lessonProgress = progress?.lessons?.[lesson.id];
          const isCompleted = lessonProgress?.status === 'completed';
          const isInProgress = lessonProgress?.status === 'in-progress';
          const xpReward = 50; // Default XP per lesson
          const duration = 8;  // Default duration in minutes

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.5), type: 'spring', damping: 20, stiffness: 200 }}
              onClick={() => navigate(`/${moduleKey}/${lesson.slug}`)}
              className={clsx(
                'panel cursor-pointer p-5 lg:p-6 transition-all duration-200 flex items-center justify-between gap-4 group rounded-2xl',
                isCompleted
                  ? 'border-emerald-500/35 bg-emerald-950/15 hover:bg-emerald-950/25'
                  : isInProgress
                  ? 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50'
                  : 'hover:border-emerald-500/40 hover:translate-x-1'
              )}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Lesson number / status icon */}
                <div className={clsx(
                  'w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold shrink-0 border transition-all',
                  isCompleted
                    ? 'border-emerald-500/50 bg-emerald-950/70 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : isInProgress
                    ? 'border-amber-500/50 bg-amber-950/60 text-amber-300'
                    : 'border-[#142a20] bg-black text-zinc-500 group-hover:border-emerald-500/30 group-hover:text-zinc-300'
                )}>
                  {isCompleted ? <CheckCircle size={18} /> : index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className={clsx(
                      'text-base font-bold',
                      isCompleted ? 'text-emerald-200' : isInProgress ? 'text-amber-200' : 'text-white'
                    )}>
                      {lesson.title}
                    </h3>
                    {isInProgress && (
                      <span className="pill pill-amber text-[10px]">In Progress</span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-1">
                    {lesson.explanation?.slice(0, 90)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <span className="flex items-center gap-1 text-xs font-mono text-zinc-500">
                    <Clock size={11} /> {duration} min
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-emerald-500 font-bold">
                    <Zap size={11} /> +{xpReward} XP
                  </span>
                </div>

                <div className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center border transition-all',
                  isCompleted
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
                    : 'bg-black border-[#142a20] text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30'
                )}>
                  <ChevronRight size={15} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA if all lessons completed */}
      {completed === meta.lessons.length && meta.lessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 panel p-7 rounded-3xl text-center bg-emerald-950/20 border-emerald-500/30"
        >
          <Trophy size={36} className="text-amber-400 mx-auto mb-3" />
          <h3 className="text-xl font-extrabold text-white mb-2">Module Complete!</h3>
          <p className="text-zinc-400 text-sm mb-5">
            You've mastered all {meta.lessons.length} lessons in {meta.title}. Ready for the next challenge?
          </p>
          <button onClick={() => navigate('/roadmap')} className="button-primary mx-auto">
            <Target size={15} />
            <span>Next Milestone</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
