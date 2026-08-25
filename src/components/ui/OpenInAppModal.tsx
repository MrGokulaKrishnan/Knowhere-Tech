import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, Download, CheckCircle2, X, Sparkles, Share2, PlusSquare, ArrowRight, AppWindow } from 'lucide-react';
import KnowhereLogo from './KnowhereLogo';

interface OpenInAppModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OpenInAppModal({ open, onClose }: OpenInAppModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone PWA window
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Listen for PWA install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem('hasDownloadedApp', 'true');
      window.dispatchEvent(new Event('appinstalled_local'));
    });

    if (isStandaloneMode) {
      localStorage.setItem('hasDownloadedApp', 'true');
      window.dispatchEvent(new Event('appinstalled_local'));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setDeferredPrompt(null);
        localStorage.setItem('hasDownloadedApp', 'true');
        window.dispatchEvent(new Event('appinstalled_local'));
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg panel-elevated p-7 lg:p-9 rounded-3xl border border-[#142a20] bg-[#070b09] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-emerald-950/40 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Logo and Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-3">
                <KnowhereLogo size="lg" showText={false} />
              </div>

              <span className="eyebrow text-xs text-emerald-400 font-mono mb-1">
                Progressive Web App (PWA)
              </span>

              <h2 className="text-2xl font-display font-extrabold text-white">
                Open in App
              </h2>
              <p className="text-sm text-zinc-400 max-w-sm mt-1 leading-relaxed">
                Launch Knowhere Tech as a standalone desktop or mobile application with zero browser URL bar distractions and offline learning support.
              </p>
            </div>

            {/* Standalone Status */}
            {isStandalone ? (
              <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm mb-1">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>Running in Standalone App Mode</span>
                </div>
                <p className="text-xs text-zinc-300">
                  You are already enjoying the dedicated full-screen desktop/mobile app experience!
                </p>
              </div>
            ) : installed ? (
              <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm mb-1">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>App Successfully Installed!</span>
                </div>
                <p className="text-xs text-zinc-300">
                  You can now open Knowhere Tech directly from your desktop applications or mobile home screen.
                </p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {/* 1-Click Native Install if available */}
                {deferredPrompt ? (
                  <button
                    onClick={handleInstallClick}
                    className="w-full button-primary text-sm !py-3.5 !px-6 font-bold shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                  >
                    <Download size={18} />
                    <span>Install Knowhere Tech App (1-Click)</span>
                  </button>
                ) : isIOS ? (
                  <div className="p-5 rounded-2xl bg-black border border-[#142a20] space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                      Install on iPhone / iPad (Safari)
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold font-mono shrink-0">1</span>
                        <span>Tap the <strong>Share</strong> button <Share2 size={13} className="inline mx-1 text-emerald-400" /> at bottom of Safari.</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold font-mono shrink-0">2</span>
                        <span>Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare size={13} className="inline mx-1 text-emerald-400" />.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-black border border-[#142a20] space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                      Desktop & Android Install Instructions
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                      <p>
                        • <strong>Chrome / Edge / Brave</strong>: Click the <strong>Install icon <Download size={12} className="inline mx-0.5 text-emerald-400" /></strong> on the right side of the browser URL address bar, or open the browser menu (⋮) → select <strong>&quot;Install Knowhere Tech...&quot;</strong>
                      </p>
                      <p>
                        • <strong>macOS Safari</strong>: Go to <strong>File → Add to Dock</strong> to launch directly as an independent Mac application.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* App Features List */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#142a20] text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 bg-[#050806] p-2.5 rounded-xl border border-[#142a20]">
                <Monitor size={14} className="text-emerald-400" />
                <span>Fullscreen View</span>
              </div>
              <div className="flex items-center gap-2 bg-[#050806] p-2.5 rounded-xl border border-[#142a20]">
                <Sparkles size={14} className="text-teal-400" />
                <span>Local Offline DB</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
