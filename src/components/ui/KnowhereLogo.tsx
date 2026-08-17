import React from 'react';

interface KnowhereLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtext?: string;
}

export default function KnowhereLogo({
  size = 'md',
  showText = true,
  className = '',
  subtext = 'Java Full Stack Platform'
}: KnowhereLogoProps) {
  const iconDimensions = {
    sm: 'h-9 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className} select-none group`}>
      {/* Exact uploaded dark AMOLED Knowhere Tech logo image */}
      <div className="relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-black p-0.5 border border-emerald-800/60 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:border-emerald-400/80 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all duration-300">
        <img
          src="/logo.png"
          alt="Knowhere Tech"
          className={`${iconDimensions[size]} object-contain rounded-lg`}
        />
      </div>

      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold tracking-tight text-white uppercase text-base">
              Knowhere <span className="text-emerald-400">Tech</span>
            </span>
          </div>
          {subtext && (
            <p className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest mt-0.5">
              {subtext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
