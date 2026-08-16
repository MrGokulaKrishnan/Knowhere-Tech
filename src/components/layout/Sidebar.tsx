import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Coffee, Database, Atom, Leaf,
  Server, Terminal, Package, Workflow, Cloud, Layers, FolderOpen, MessageSquare,
  TrendingUp, Settings, Flame, X, Code2, BookOpen, Award
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP } from '@/services/progressEngine';
import KnowhereLogo from '@/components/ui/KnowhereLogo';
import { clsx } from 'clsx';

const NAV_ITEMS = [
  { label: 'Dashboard',     path: '/dashboard',     icon: LayoutDashboard },
  { label: 'Roadmap',       path: '/roadmap',        icon: Map },
  null, // separator
  { label: 'Java 25 LTS',   path: '/java',           icon: Coffee },
  { label: 'OOP & Records', path: '/oop',            icon: Layers },
  { label: 'DSA Core',      path: '/dsa',            icon: Code2 },
  { label: 'SQL & DB',      path: '/sql',            icon: Database },
  { label: 'React 19',      path: '/react',          icon: Atom },
  { label: 'Spring Boot 3', path: '/spring',         icon: Leaf },
  { label: 'REST APIs',     path: '/rest-api',       icon: Server },
  { label: 'Docker & Micro',path: '/docker',         icon: Package },
  { label: 'DevOps & CI/CD',path: '/devops',         icon: Workflow },
  { label: 'AWS Cloud',     path: '/aws',            icon: Cloud },
  { label: 'Linux Shell',   path: '/linux',          icon: Terminal },
  null, // separator
  { label: '8 Full Projects', path: '/projects',     icon: FolderOpen },
  { label: 'Interview Bank',path: '/interview',      icon: MessageSquare },
  { label: 'Job Readiness', path: '/job-readiness',  icon: TrendingUp },
  { label: 'Daily Streak',  path: '/daily',          icon: Flame },
  { label: 'Saved Bookmarks',path: '/bookmarks',     icon: BookOpen },
  null, // separator
  { label: 'Settings',      path: '/settings',       icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile, onClose }: SidebarProps) {
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const location = useLocation();

  return (
    <aside className={clsx(
      'flex flex-col bg-[#000000] border-r border-[#142a20] h-full selection:bg-emerald-500/30 select-none',
      mobile ? 'w-full' : 'hidden lg:flex w-[250px] shrink-0'
    )}>
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#142a20] bg-[#050806]/90">
        <NavLink to="/dashboard" onClick={mobile ? onClose : undefined}>
          <KnowhereLogo size="md" />
        </NavLink>
        {mobile && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950/40 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* User Level Card */}
      <div className="px-4 py-3 border-b border-[#142a20] bg-[#050806]/50">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
            <Award size={13} className="text-emerald-400" /> {level.title}
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {progress?.xp || 0} XP
          </span>
        </div>
        <div className="h-1.5 bg-[#030604] rounded-full overflow-hidden border border-[#142a20]">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  5,
                  (((progress?.xp || 0) - level.minXP) /
                    (level.maxXP - level.minXP || 1)) *
                    100
                )
              )}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[10px]">
          <span className="text-zinc-500 font-mono">Rank Lv.{level.level}</span>
          <span className="text-amber-400 font-mono flex items-center gap-0.5 font-semibold">
            <Flame size={10} /> {progress?.streak || 1}d Streak
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {NAV_ITEMS.map((item, idx) => {
          if (item === null) {
            return <div key={`sep-${idx}`} className="my-2 border-t border-[#142a20]/80" />;
          }
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={mobile ? onClose : undefined}
              className={clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-[#050806] border border-transparent'
              )}
            >
              <Icon
                size={15}
                className={clsx(
                  'shrink-0 transition-colors',
                  isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-300'
                )}
              />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#142a20] bg-[#050806]/70">
        <div className="flex items-center justify-between text-[10px] text-zinc-500">
          <span>Knowhere Tech</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Active
          </span>
        </div>
      </div>
    </aside>
  );
}
