import React from 'react';

interface NanoBananaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function NanoBananaLogo({
  size = 'md',
  showText = true,
  className = ''
}: NanoBananaLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Glowing NanoBanana Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] shadow-glow-green border border-emerald-400/40 p-1.5`}>
        {/* Neon Banana Tech Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
        >
          {/* Stylized Futuristic Curved Banana */}
          <path
            d="M5 19C7.5 20.5 12 21 16.5 18C20 15.5 21 11 20 6C19.7 4.5 18.5 4 17.5 5C16.8 5.7 16.2 7 15 8C13.5 9.2 10.5 9.8 8 11.5C5.5 13.2 4 16 5 19Z"
            fill="#FBBF24"
          />
          {/* Cybernetic Accent Line */}
          <path
            d="M7 17.5C9 18.5 13 18.5 16.5 16C19 14 19.5 10 19 7"
            stroke="#00FF88"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Tech Nodes */}
          <circle cx="16.5" cy="16" r="1.5" fill="#00FF88" />
          <circle cx="7" cy="17.5" r="1.2" fill="#00FF88" />
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <span className={`font-display font-extrabold tracking-tight text-white ${textSizes[size]}`}>
              nano<span className="text-[#00FF88]">banana</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
              2027
            </span>
          </div>
          <p className="text-[10px] font-mono text-[#4A6B53] tracking-wide uppercase">
            Java Full Stack
          </p>
        </div>
      )}
    </div>
  );
}
