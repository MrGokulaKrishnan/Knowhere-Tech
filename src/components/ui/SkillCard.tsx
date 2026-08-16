import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Lock } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { clsx } from 'clsx';

interface SkillCardProps {
  title: string;
  description: string;
  moduleKey: string;
  icon: React.ReactNode;
  completedLessons: number;
  totalLessons: number;
  color?: string;
  index?: number;
}

export default function SkillCard({
  title, description, moduleKey, icon, completedLessons, totalLessons, color = 'text-primary', index = 0
}: SkillCardProps) {
  const navigate = useNavigate();
  const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isComplete = pct === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => navigate(`/${moduleKey}`)}
      className="group cursor-pointer rounded-xl border border-border bg-bg-card p-4 hover:border-border-light hover:bg-bg-elevated transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={clsx('text-2xl', color)}>{icon}</div>
        {isComplete ? (
          <CheckCircle size={16} className="text-secondary" />
        ) : (
          <ChevronRight size={16} className="text-text-subtle group-hover:text-text-muted transition-colors" />
        )}
      </div>
      <h3 className="font-semibold text-text text-sm mb-1">{title}</h3>
      <p className="text-text-subtle text-xs mb-3 line-clamp-2">{description}</p>
      <ProgressBar value={pct} size="xs" color={isComplete ? 'secondary' : 'primary'} />
      <p className="text-text-subtle text-[10px] mt-1.5">{completedLessons}/{totalLessons} lessons</p>
    </motion.div>
  );
}
