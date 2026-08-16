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
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.15 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
          >
            <div className="bg-[#090E0A] border border-[#142318] rounded-2xl shadow-elevated overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#142318] bg-black">
                <Search size={16} className="text-emerald-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search Java 25 concepts, OOP, Spring Boot, React, SQL..."
                  className="flex-1 bg-transparent text-white placeholder:text-zinc-600 text-xs outline-none font-mono"
                />
                {query && (
                  <button onClick={clear} className="text-zinc-500 hover:text-white p-1">
                    <X size={14} />
                  </button>
                )}
                <kbd className="text-[10px] text-zinc-500 bg-[#101812] border border-[#142318] rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results List */}
              <div className="max-h-72 overflow-y-auto p-2">
                {results.length > 0 ? (
                  results.map((r, i) => (
                    <div
                      key={r.id + i}
                      onClick={() => handleSelect(r.url)}
                      onMouseEnter={() => setSelected(i)}
                      className={clsx(
                        'flex items-center justify-between p-3 rounded-xl cursor-pointer text-xs transition-colors',
                        selected === i
                          ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 font-medium'
                          : 'text-zinc-400 hover:bg-[#101812]'
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen size={14} className={selected === i ? 'text-emerald-400' : 'text-zinc-600'} />
                        <div className="min-w-0">
                          <p className="font-semibold truncate text-white">{r.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{r.module} · {r.description}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className={selected === i ? 'text-emerald-400' : 'text-zinc-600'} />
                    </div>
                  ))
                ) : query ? (
                  <div className="p-8 text-center text-zinc-500 text-xs">
                    No results found for "{query}".
                  </div>
                ) : (
                  <div className="p-4 text-xs text-zinc-500 font-mono">
                    <p className="mb-2 uppercase text-[10px] tracking-wider">Popular Searches</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Java 25 LTS', 'OOP Architecture', 'Virtual Threads', 'Spring Boot 3', 'Docker', 'SQL JOINs', 'React 19'].map(s => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-2.5 py-1 rounded-lg bg-black border border-[#142318] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
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
        </>
      )}
    </AnimatePresence>
  );
}
