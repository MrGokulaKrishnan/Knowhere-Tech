import React from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  outline: 'border border-[#142a20] bg-[#050806] text-zinc-300 hover:bg-emerald-950/40 hover:border-emerald-500/50 hover:text-white',
  ghost: 'text-zinc-400 hover:text-white hover:bg-emerald-950/30',
  danger: 'bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/60 font-semibold',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-xs font-medium gap-2 rounded-xl',
  lg: 'h-11 px-5 text-sm font-semibold gap-2.5 rounded-xl',
};

export default function Button({
  variant = 'outline',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]',
        VARIANT_CLASS[variant],
        variant !== 'primary' && variant !== 'secondary' && SIZE_CLASS[size],
        className
      )}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
