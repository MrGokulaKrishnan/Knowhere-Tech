import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const PAD = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-6' };

export default function Card({
  children,
  className,
  hover,
  glass,
  padding = 'md',
  onClick
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'panel',
        hover && 'hover:border-emerald-500/50 cursor-pointer',
        onClick && 'cursor-pointer',
        PAD[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
