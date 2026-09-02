import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { clsx } from 'clsx';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { query, setQuery, results, clear } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelected(0);
    } else {
      clear();
    }
  }, [open, clear]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && results[selected]) {
        navigate(results[selected].url);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, selected, navigate, onClose]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 select-none overflow-y-auto">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <div className="bg-[#070b09] border border-[#142a20] rounded-3xl shadow-2xl overflow-hidden">
              {/* Search Input Box */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-[#142a20] bg-black">
                <Search size={20} className="text-emerald-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search Java 25 LTS concepts, OOP, Spring Boot, React, SQL..."
                  className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none font-mono"
                />
                {query && (
                  <button onClick={clear} className="text-zinc-500 hover:text-white p-1 rounded-lg">
                    <X size={16} />
                  </button>
                )}
                <kbd className="text-xs text-zinc-400 bg-[#101812] border border-[#142a20] rounded-lg px-2.5 py-1 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results List View */}
              <div className="max-h-96 overflow-y-auto p-3">
                {results.length > 0 ? (
                  results.map((r, i) => (
                    <div
                      key={r.id + i}
                      onClick={() => handleSelect(r.url)}
                      onMouseEnter={() => setSelected(i)}
                      className={clsx(
                        'flex items-center justify-between p-4 rounded-2xl cursor-pointer text-sm transition-all mb-1',
                        selected === i
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] font-semibold'
                          : 'text-zinc-300 hover:bg-[#0c140f] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
                          <BookOpen size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate text-sm">{r.title}</p>
                          <p className="text-xs text-zinc-400 truncate mt-0.5">{r.module} · {r.description}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className={selected === i ? 'text-emerald-400 translate-x-1' : 'text-zinc-600'} />
                    </div>
                  ))
                ) : query ? (
                  <div className="p-12 text-center text-zinc-500 text-sm">
                    No results found for &quot;{query}&quot;. Try searching for &apos;Java&apos;, &apos;Threads&apos;, or &apos;Docker&apos;.
                  </div>
                ) : (
                  <div className="p-6 text-sm text-zinc-400 font-mono">
                    <p className="text-xs uppercase text-zinc-500 font-bold tracking-wider mb-3">Popular Search Terms</p>
                    <div className="flex flex-wrap gap-2">
                      {['Java 25 LTS', 'Virtual Threads', 'OOP Architecture', 'Spring Boot 3', 'Docker Multi-Stage', 'SQL Indexing', 'React 19 Hooks'].map(s => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-3.5 py-2 rounded-xl bg-black border border-[#142a20] text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors text-xs"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
