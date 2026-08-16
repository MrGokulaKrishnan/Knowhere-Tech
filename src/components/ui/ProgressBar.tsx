import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md';
  animated?: boolean;
  showLabel?: boolean;
  className?: string;
}

const COLOR_MAP = {
  primary: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
  secondary: 'bg-gradient-to-r from-emerald-400 to-teal-300',
  accent: 'bg-gradient-to-r from-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(20,184,166,0.5)]',
  warning: 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
  danger: 'bg-gradient-to-r from-rose-500 to-rose-600 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
};

const SIZE_MAP = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
};

export default function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  size = 'sm',
  animated = true,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-[11px]">
          <span className="text-zinc-500 font-mono">Progress</span>
          <span className="font-mono text-emerald-400 font-bold">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-[#000000] border border-[#142a20] rounded-full overflow-hidden p-0.5', SIZE_MAP[size])}>
        <div
          className={clsx(
            'h-full',
            COLOR_MAP[color],
            'rounded-full',
            animated && 'transition-all duration-700 ease-out'
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
