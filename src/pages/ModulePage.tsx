import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, ChevronRight, ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { ALL_MODULES_META } from '@/data/modules/meta';
import type { ModuleKey } from '@/types';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { clsx } from 'clsx';

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
        <p className="text-zinc-400 mb-6 text-lg">Module not found: {moduleKey}</p>
        <button onClick={() => navigate('/dashboard')} className="button-secondary text-sm">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const mod = progress?.modules?.[moduleKey];
  const completed = mod?.completedLessons || 0;
  const pct = meta.lessons.length > 0 ? Math.min(100, Math.round((completed / meta.lessons.length) * 100)) : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-mono">
        <button onClick={() => navigate('/roadmap')} className="hover:text-white transition-colors">
          Roadmap
        </button>
        <ChevronRight size={14} />
        <span className="text-emerald-400 font-semibold">{meta.title}</span>
      </div>

      {/* Header Box */}
      <div className="panel p-8 lg:p-10 mb-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="eyebrow text-xs text-emerald-400 font-mono">Module Overview</span>
            <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white mb-3 mt-1">
              {meta.title}
            </h1>
            <p className="text-zinc-300 text-sm lg:text-base max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>
          <div className="text-right shrink-0 bg-black/60 p-5 rounded-2xl border border-[#142a20]">
            <span className="text-4xl font-extrabold font-mono text-emerald-400">{pct}%</span>
            <p className="text-zinc-400 text-xs font-mono mt-1">{completed} of {meta.lessons.length} Completed</p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar value={pct} size="md" color="primary" animated />
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-3.5">
        {meta.lessons.map((lesson, index) => {
          const lessonProgress = progress?.lessons?.[lesson.id];
          const isCompleted = lessonProgress?.status === 'completed';

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => navigate(`/${moduleKey}/${lesson.slug}`)}
              className={clsx(
                'panel cursor-pointer p-5 lg:p-6 transition-all duration-200 flex items-center justify-between gap-6 group rounded-2xl',
                isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/30'
                  : 'hover:border-emerald-500/50 hover:translate-x-1'
              )}
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className={clsx(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0 border',
                  isCompleted
                    ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                    : 'border-[#142a20] bg-black text-zinc-400'
                )}>
                  {isCompleted ? <CheckCircle size={18} /> : index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className={clsx('text-base font-bold truncate', isCompleted ? 'text-emerald-200' : 'text-white')}>
                    {lesson.title}
                  </h3>
                  <p className="text-zinc-400 text-xs truncate mt-0.5">
                    {lesson.explanation?.slice(0, 85)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <Badge variant="beginner" size="xs">
                  {lesson.tags?.[0] || 'Lesson'}
                </Badge>
                <div className="w-8 h-8 rounded-lg bg-black border border-[#142a20] flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
