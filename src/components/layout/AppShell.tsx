import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';
import CommandPalette from './CommandPalette';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  // Sidebar is CLOSED by default on web load and when entering courses
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Automatically close sidebar on any route / page change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Global Keyboard shortcuts: Ctrl+K (Search), Ctrl+B / Escape (Sidebar)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === '\\')) {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex h-screen bg-black text-[#f9fafb] overflow-hidden">
      {/* On-Demand Slide-Out Sidebar Drawer (Closed by default) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Slide-In Navigation Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[#020403] border-r border-[#142a20] shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              <Sidebar mobile onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Full-Width Content Viewport */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0 w-full">
        <Navbar
          onMenuClick={() => setSidebarOpen(prev => !prev)}
          onSearchClick={() => setCommandOpen(true)}
        />

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-12 custom-scrollbar">
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
