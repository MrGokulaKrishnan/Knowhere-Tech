import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Coffee, Database, Atom, Leaf,
  Server, Terminal, Package, Workflow, Cloud, Layers,
  Settings, Flame, X, Code2, Award, AppWindow, Download,
  CheckCircle2, LogIn, LogOut, TestTube, Sparkles
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import { getLevelFromXP } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';
import KnowhereLogo from '@/components/ui/KnowhereLogo';
import OpenInAppModal from '@/components/ui/OpenInAppModal';
import AuthModal from '@/components/auth/AuthModal';
import { clsx } from 'clsx';

interface NavSection {
  title?: string;
  items: {
    label: string;
    path: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: string;
    moduleKey?: string;
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
      { label: 'Java 25 LTS', path: '/java', icon: Coffee, moduleKey: 'java' },
      { label: 'OOP & Records', path: '/oop', icon: Layers, moduleKey: 'oop' },
      { label: 'Advanced Java', path: '/advanced-java', icon: Code2, moduleKey: 'advanced-java' },
      { label: 'DSA & Patterns', path: '/dsa', icon: Terminal, moduleKey: 'dsa' },
      { label: 'SQL & Database', path: '/sql', icon: Database, moduleKey: 'sql' },
      { label: 'HTML5 & Modern Web', path: '/html', icon: LayoutDashboard, moduleKey: 'html' },
      { label: 'CSS3 & Tailwind', path: '/css', icon: Layers, moduleKey: 'css' },
      { label: 'JavaScript ES2026', path: '/javascript', icon: Code2, moduleKey: 'javascript' },
      { label: 'React 19 & Next.js', path: '/react', icon: Atom, moduleKey: 'react' },
      { label: 'Spring Core 6', path: '/spring', icon: Leaf, moduleKey: 'spring' },
      { label: 'Spring Boot 3.4', path: '/spring-boot', icon: Package, moduleKey: 'spring-boot' },
      { label: 'REST API & OpenAPI', path: '/rest-api', icon: Server, moduleKey: 'rest-api' },
      { label: 'Security & OAuth2', path: '/security', icon: Award, moduleKey: 'security' },
      { label: 'Linux CLI & Admin', path: '/linux', icon: Terminal, moduleKey: 'linux' },
      { label: 'Networking & HTTP', path: '/networking', icon: Workflow, moduleKey: 'networking' },
      { label: 'Git & GitHub Pro', path: '/git', icon: Code2, moduleKey: 'git' },
      { label: 'Docker Containers', path: '/docker', icon: Package, moduleKey: 'docker' },
      { label: 'DevOps & CI/CD', path: '/devops', icon: Workflow, moduleKey: 'devops' },
      { label: 'AWS Cloud Architecture', path: '/aws', icon: Cloud, moduleKey: 'aws' },
      { label: 'Testing & JUnit 5', path: '/testing', icon: TestTube, moduleKey: 'testing' },
      { label: 'System Design', path: '/system-design', icon: Server, moduleKey: 'system-design' },
    ],
  },
  {
    title: 'PRACTICE & TOOLS',
    items: [
      { label: 'Daily Challenge', path: '/daily', icon: Award, badge: 'Daily' },
      { label: 'Interactive Visualizers', path: '/dsa', icon: Terminal },
      { label: 'Full-Stack Projects', path: '/projects', icon: Package },
      { label: 'Interview Simulator', path: '/interview', icon: Award, badge: 'AI' },
      { label: 'Job Readiness Tracker', path: '/job-readiness', icon: Award },
      { label: 'My Bookmarks', path: '/bookmarks', icon: Settings },
      { label: 'Analytics & Stats', path: '/progress', icon: Award },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenAppModal?: () => void;
}

export default function Sidebar({ mobile: _mobile, open = true, onClose, onOpenAppModal }: SidebarProps) {
  const { progress } = useLearning();
  const { user, logOut } = useAuth();
  const level = getLevelFromXP(progress?.xp || 0);
  const location = useLocation();
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <aside className="flex flex-col bg-[#020503] h-full selection:bg-emerald-500/30 select-none z-20 w-full relative">
        
        {/* Brand Header */}
        <div className="h-[80px] flex items-center justify-between px-6 border-b border-[#142a20]">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <KnowhereLogo size="md" showText={false} />
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-base tracking-tight leading-tight">Knowhere</span>
              <span className="text-emerald-400 text-[10px] font-mono tracking-widest uppercase">Tech Academy</span>
            </div>
          </NavLink>

          {open && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-emerald-950/40 transition-colors cursor-pointer"
              title="Close navigation menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Account / Auth Card */}
        <div className="px-5 py-3.5 border-b border-[#142a20] bg-[#040805]">
          {user ? (
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-emerald-400/50 object-cover shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-400 flex items-center justify-center font-mono font-bold text-xs text-emerald-200 shrink-0">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.displayName || user.email?.split('@')[0]}</p>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Cloud Synced
                  </p>
                </div>
              </div>
              <button
                onClick={() => logOut()}
                className="p-1.5 text-zinc-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/40 transition-colors"
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full cyber-btn-wrapper group !p-[1.5px] cursor-pointer"
            >
              <div className="w-full cyber-btn-inner !py-2.5 !px-3.5 !justify-between !rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>
                  <Sparkles size={13} className="text-emerald-300 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent font-extrabold tracking-wider text-xs font-mono">
                    Sign In / Sync
                  </span>
                </div>
                <span className="text-[9px] bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/50 text-emerald-300 font-mono font-bold">
                  CLOUD
                </span>
              </div>
            </button>
          )}
        </div>

        {/* User Level Card */}
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

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {NAV_SECTIONS.map((sec, secIdx) => (
            <div key={secIdx} className="mb-4">
              {sec.title && (
                <p className="text-[11px] font-bold text-zinc-500 tracking-wider px-3.5 pt-3 pb-1.5 uppercase font-mono">
                  {sec.title}
                </p>
              )}
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                  const moduleKey = item.moduleKey || item.path.replace(/^\//, '');
                  const isModule = ALL_MODULES_META.some(m => m.key === moduleKey) || !!item.moduleKey;
                  const percentage = isModule ? (progress?.modules?.[moduleKey]?.percentage || 0) : 0;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group',
                        isActive
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 shadow-[0_0_18px_rgba(16,185,129,0.2)] font-bold translate-x-1'
                          : 'text-zinc-400 hover:text-white hover:bg-[#060a08] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={17}
                          className={clsx(
                            'shrink-0 transition-colors',
                            isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-emerald-400'
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                        {percentage > 0 && (
                          <span className="text-emerald-500 text-[10px] font-mono shrink-0">
                            {percentage}%
                          </span>
                        )}
                      </div>

                      {item.badge && (
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
          <div className="pt-2 px-1">
            <button
              onClick={() => {
                if (onOpenAppModal) {
                  onOpenAppModal();
                } else {
                  if (onClose) onClose();
                  setAppModalOpen(true);
                }
              }}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#04130a] border border-emerald-500/40 text-emerald-300 hover:bg-[#092213] hover:border-emerald-400 transition-all group shadow-[0_0_15px_rgba(16,185,129,0.15)] text-xs font-mono font-semibold cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <AppWindow size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Open in App</span>
              </div>
              <Download size={14} className="text-emerald-400" />
            </button>
          </div>
        </nav>

        {/* Footer System Status */}
        <div className="px-6 py-4 border-t border-[#142a20] bg-[#040705]">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="font-mono">Knowhere Tech</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online
            </span>
          </div>
        </div>
      </aside>

      <OpenInAppModal open={appModalOpen} onClose={() => setAppModalOpen(false)} />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
