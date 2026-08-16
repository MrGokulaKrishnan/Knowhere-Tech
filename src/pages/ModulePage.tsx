import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-zinc-400 mb-4">Module not found: {moduleKey}</p>
        <button onClick={() => navigate('/dashboard')} className="button-secondary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const mod = progress?.modules?.[moduleKey];
  const completed = mod?.completedLessons || 0;
  const pct = meta.lessons.length > 0 ? Math.min(100, Math.round((completed / meta.lessons.length) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
        <button onClick={() => navigate('/roadmap')} className="hover:text-white transition-colors">
          Roadmap
        </button>
        <ChevronRight size={12} />
        <span className="text-emerald-400 font-medium">{meta.title}</span>
      </div>

      {/* Header Box */}
      <div className="panel p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="eyebrow text-[10px] text-emerald-400 font-mono">Module Overview</span>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 mt-1">
              {meta.title}
            </h1>
            <p className="text-zinc-400 text-xs max-w-xl leading-relaxed">
              {meta.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">{pct}%</span>
            <p className="text-zinc-500 text-[10px] font-mono">{completed}/{meta.lessons.length} Completed</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={pct} size="md" color="primary" animated />
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-2.5">
        {meta.lessons.map((lesson, index) => {
          const lessonProgress = progress?.lessons?.[lesson.id];
          const isCompleted = lessonProgress?.status === 'completed';

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => navigate(`/${moduleKey}/${lesson.slug}`)}
              className={clsx(
                'panel cursor-pointer p-4 transition-all duration-150 flex items-center justify-between gap-4 group',
                isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/30'
                  : 'hover:border-emerald-500/50'
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={clsx(
                  'w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 border',
                  isCompleted
                    ? 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300'
                    : 'border-[#142a20] bg-black text-zinc-500'
                )}>
                  {isCompleted ? <CheckCircle size={15} /> : index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className={clsx('text-sm font-semibold truncate', isCompleted ? 'text-emerald-200' : 'text-white')}>
                    {lesson.title}
                  </h3>
                  <p className="text-zinc-500 text-xs truncate">
                    {lesson.explanation?.slice(0, 75)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant="beginner" size="xs">
                  {lesson.tags?.[0] || 'Lesson'}
                </Badge>
                <ChevronRight size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
