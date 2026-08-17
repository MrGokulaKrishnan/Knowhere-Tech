import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Coffee, Database, Atom, Leaf,
  Server, Terminal, Package, Workflow, Cloud, Layers, FolderOpen, MessageSquare,
  TrendingUp, Settings, Flame, X, Code2, BookOpen, Award, AppWindow, Download,
  PanelLeftClose, PanelLeftOpen, ChevronRight
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getLevelFromXP } from '@/services/progressEngine';
import KnowhereLogo from '@/components/ui/KnowhereLogo';
import OpenInAppModal from '@/components/ui/OpenInAppModal';
import { clsx } from 'clsx';

interface NavSection {
  title?: string;
  items: {
    label: string;
    path: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Interactive Roadmap', path: '/roadmap', icon: Map },
    ],
  },
  {
    title: 'CORE CURRICULUM',
    items: [
      { label: 'Java 25 LTS', path: '/java', icon: Coffee },
      { label: 'OOP & Records', path: '/oop', icon: Layers },
      { label: 'DSA & Algorithms', path: '/dsa', icon: Code2 },
      { label: 'SQL & Relational DB', path: '/sql', icon: Database },
      { label: 'React 19 & Frontend', path: '/react', icon: Atom },
      { label: 'Spring Boot 3', path: '/spring', icon: Leaf },
      { label: 'REST API & Microservices', path: '/rest-api', icon: Server },
    ],
  },
  {
    title: 'DEVOPS & CLOUD',
    items: [
      { label: 'Docker & Containers', path: '/docker', icon: Package },
      { label: 'DevOps & CI/CD', path: '/devops', icon: Workflow },
      { label: 'AWS Cloud Architecture', path: '/aws', icon: Cloud },
      { label: 'Linux Bash Terminal', path: '/linux', icon: Terminal },
    ],
  },
  {
    title: 'PRACTICE & READINESS',
    items: [
      { label: '8 Project Blueprints', path: '/projects', icon: FolderOpen, badge: '8' },
      { label: '500+ Interview Bank', path: '/interview', icon: MessageSquare, badge: '500+' },
      { label: 'Job Readiness Matrix', path: '/job-readiness', icon: TrendingUp },
      { label: 'Saved Bookmarks', path: '/bookmarks', icon: BookOpen },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Storage & Preferences', path: '/settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  mobile,
  onClose,
  collapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const { progress } = useLearning();
  const level = getLevelFromXP(progress?.xp || 0);
  const location = useLocation();
  const [appModalOpen, setAppModalOpen] = useState(false);

  return (
    <>
      <aside className={clsx(
        'flex flex-col bg-[#020403] border-r border-[#142a20] h-full selection:bg-emerald-500/30 select-none z-20 transition-all duration-300 ease-in-out',
        mobile
          ? 'w-72 max-w-[85vw]'
          : collapsed
            ? 'w-[72px] shrink-0'
            : 'w-72 shrink-0'
      )}>
        {/* Brand Header */}
        <div className={clsx(
          'flex items-center border-b border-[#142a20] bg-[#050806] transition-all',
          collapsed && !mobile ? 'justify-center p-4' : 'justify-between px-6 py-5'
        )}>
          <NavLink
            to="/dashboard"
            onClick={mobile ? onClose : undefined}
            className="flex items-center overflow-hidden"
            title="Knowhere Tech"
          >
            {collapsed && !mobile ? (
              <KnowhereLogo size="sm" showText={false} />
            ) : (
              <KnowhereLogo size="md" subtext="Java Full Stack Platform" />
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          {!mobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={clsx(
                'p-1.5 rounded-xl text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/40 transition-colors',
                collapsed && 'hidden'
              )}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {/* Mobile Close Button */}
          {mobile && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-emerald-950/40 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Level Card */}
        {(!collapsed || mobile) ? (
          <div className="px-6 py-4 border-b border-[#142a20] bg-[#040705]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <Award size={15} className="text-emerald-400" /> {level.title}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {(progress?.xp || 0).toLocaleString()} XP
              </span>
            </div>

            <div className="h-2 bg-[#020503] rounded-full overflow-hidden border border-[#142a20] mb-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
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

            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Tier {level.level} of 7</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                <Flame size={12} /> {progress?.streak || 1}d Streak
              </span>
            </div>
          </div>
        ) : (
          <div className="py-3 px-2 border-b border-[#142a20] flex flex-col items-center justify-center bg-[#040705]">
            <div
              className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs"
              title={`${level.title} — ${(progress?.xp || 0).toLocaleString()} XP`}
            >
              L{level.level}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className={clsx(
          'flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar',
          collapsed && !mobile ? 'px-2' : 'px-3'
        )}>
          {NAV_SECTIONS.map((sec, secIdx) => (
            <div key={secIdx} className="mb-4">
              {sec.title && (!collapsed || mobile) && (
                <p className="text-[11px] font-bold text-zinc-500 tracking-wider px-3.5 pt-3 pb-1.5 uppercase font-mono">
                  {sec.title}
                </p>
              )}
              {sec.title && (collapsed && !mobile) && (
                <div className="my-2 border-t border-[#142a20]/60" />
              )}
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={mobile ? onClose : undefined}
                      title={collapsed && !mobile ? item.label : undefined}
                      className={clsx(
                        'flex items-center rounded-xl text-xs font-medium transition-all duration-150 group',
                        collapsed && !mobile
                          ? 'justify-center p-3'
                          : 'justify-between px-3.5 py-2.5',
                        isActive
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 shadow-[0_0_18px_rgba(16,185,129,0.2)] font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-[#060a08] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={18}
                          className={clsx(
                            'shrink-0 transition-colors',
                            isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-400'
                          )}
                        />
                        {(!collapsed || mobile) && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {(!collapsed || mobile) && item.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-bold shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Open in App Button inside Sidebar */}
          <div className={clsx('pt-2', collapsed && !mobile ? 'px-0' : 'px-1')}>
            <button
              onClick={() => {
                if (mobile && onClose) onClose();
                setAppModalOpen(true);
              }}
              title="Open in App (PWA)"
              className={clsx(
                'w-full flex items-center rounded-2xl bg-[#04130a] border border-emerald-500/40 text-emerald-300 hover:bg-[#092213] hover:border-emerald-400 transition-all group shadow-[0_0_15px_rgba(16,185,129,0.15)] text-xs font-mono font-semibold',
                collapsed && !mobile
                  ? 'justify-center p-3'
                  : 'justify-between px-3.5 py-3'
              )}
            >
              <div className="flex items-center gap-2.5">
                <AppWindow size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                {(!collapsed || mobile) && <span>Open in App</span>}
              </div>
              {(!collapsed || mobile) && <Download size={14} className="text-emerald-400" />}
            </button>
          </div>
        </nav>

        {/* Footer System Status / Expand trigger */}
        <div className={clsx(
          'border-t border-[#142a20] bg-[#040705] transition-all',
          collapsed && !mobile ? 'p-3 flex justify-center' : 'px-6 py-4'
        )}>
          {collapsed && !mobile ? (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-xl text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/40 transition-colors"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          ) : (
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">Knowhere Tech</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>
          )}
        </div>
      </aside>

      <OpenInAppModal open={appModalOpen} onClose={() => setAppModalOpen(false)} />
    </>
  );
}
