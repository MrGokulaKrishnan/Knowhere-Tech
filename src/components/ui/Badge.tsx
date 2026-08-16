import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'warning' | 'danger' | 'muted' | 'beginner' | 'intermediate' | 'advanced';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm';
  className?: string;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  primary: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50',
  secondary: 'bg-emerald-950/30 text-teal-300 border-emerald-800/40',
  accent: 'bg-teal-950/40 text-teal-400 border-teal-800/50',
  warning: 'bg-amber-950/40 text-amber-300 border-amber-800/50',
  danger: 'bg-rose-950/40 text-rose-300 border-rose-800/50',
  muted: 'bg-[#050806] text-zinc-400 border-[#142a20]',
  beginner: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40',
  intermediate: 'bg-amber-950/40 text-amber-300 border-amber-800/40',
  advanced: 'bg-rose-950/40 text-rose-300 border-rose-800/40',
};

export default function Badge({ children, variant = 'muted', size = 'sm', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center border rounded-lg font-mono font-medium select-none',
      size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5',
      VARIANT_CLASS[variant],
      className
    )}>
      {children}
    </span>
  );
}
