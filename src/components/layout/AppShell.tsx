import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';
import CommandPalette from './CommandPalette';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if current page is an active course/lesson (e.g., /java/intro, /oop/polymorphism, /react/hooks)
  const isLessonRoute = location.pathname.split('/').filter(Boolean).length >= 2;

  // Initialize desktop sidebar collapse state: default to collapsed on lesson routes or user preference
  const [desktopCollapsed, setDesktopCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem('knowhere:sidebar_collapsed');
      if (stored !== null) return stored === 'true';
      // Default to collapsed on lesson pages
      return window.location.pathname.split('/').filter(Boolean).length >= 2;
    } catch {
      return false;
    }
  });

  // Auto-collapse sidebar when entering a lesson page so it is never clumsy or in the way
  useEffect(() => {
    if (isLessonRoute) {
      setDesktopCollapsed(true);
    }
    // Always auto-close mobile drawer on route change
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleToggleDesktopSidebar = () => {
    setDesktopCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('knowhere:sidebar_collapsed', String(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  // Global Keyboard shortcuts: Ctrl+K (Search), Ctrl+[ / Ctrl+] (Toggle Sidebar)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === '\\')) {
        e.preventDefault();
        handleToggleDesktopSidebar();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-[#f9fafb] overflow-hidden">
      {/* Desktop Sidebar (Collapsible: Sleek 72px or Spacious 288px) */}
      <Sidebar
        collapsed={desktopCollapsed}
        onToggleCollapse={handleToggleDesktopSidebar}
      />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#000000] border-r border-[#142a20] transform transition-transform duration-300 ease-out lg:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar mobile onClose={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Main Content Viewport */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar
          onMenuClick={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen(prev => !prev);
            } else {
              handleToggleDesktopSidebar();
            }
          }}
          onSearchClick={() => setCommandOpen(true)}
        />

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-10 custom-scrollbar">
          {children}
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNavigation />
      </div>

      {/* Command Search Palette Modal */}
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
