import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Coffee, FolderOpen, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const MOBILE_NAV = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Roadmap',   path: '/roadmap',   icon: Map },
  { label: 'Java',      path: '/java',      icon: Coffee },
  { label: 'Projects',  path: '/projects',  icon: FolderOpen },
  { label: 'Job Ready', path: '/job-readiness', icon: TrendingUp },
];

export default function MobileNavigation() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#000000]/95 backdrop-blur-md border-t border-[#142a20] flex items-center justify-around py-2 px-1">
      {MOBILE_NAV.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors',
              isActive
                ? 'text-emerald-400 bg-emerald-950/40 font-semibold'
                : 'text-zinc-500 hover:text-white'
            )}
          >
            <Icon size={18} />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
