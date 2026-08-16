import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '@/data/interviewData';
import Badge from '@/components/ui/Badge';

const CATEGORIES = ['All', ...Array.from(new Set(INTERVIEW_QUESTIONS.map(q => q.category)))];
const LEVELS = ['All', 'beginner', 'intermediate', 'advanced'];

export default function InterviewPage() {
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(q => {
      const matchCat = category === 'All' || q.category === category;
      const matchLvl = level === 'All' || q.level === level;
      const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchLvl && matchSearch;
    });
  }, [category, level, search]);

  const toggle = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="text-emerald-400" size={22} />
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
            Interview Question Bank (500+ Q&A)
          </h1>
        </div>
        <p className="text-zinc-400 text-sm">
          Technical interview questions across Java 25 LTS, Spring Boot 3, SQL, React 19, Docker, AWS, and System Design.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="panel p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search interview questions by keyword or topic..."
              className="w-full pl-9 pr-3 py-2 bg-black border border-[#142a20] rounded-xl text-white text-xs outline-none focus:border-emerald-500/60 font-mono placeholder:text-zinc-600"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 bg-black border border-[#142a20] rounded-xl text-emerald-300 text-xs outline-none focus:border-emerald-500/60 font-mono"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-black text-white">{c}</option>)}
            </select>

            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="px-3 py-2 bg-black border border-[#142a20] rounded-xl text-emerald-300 text-xs outline-none focus:border-emerald-500/60 font-mono"
            >
              {LEVELS.map(l => <option key={l} value={l} className="bg-black text-white">{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 mb-3 font-mono">
        <span>{filtered.length} questions matching filter criteria</span>
      </div>

      {/* Questions Stack */}
      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="panel rounded-2xl overflow-hidden transition-all hover:border-emerald-500/40"
          >
            <button
              onClick={() => toggle(q.id)}
              className="w-full flex items-start justify-between gap-4 p-4 text-left hover:bg-emerald-950/20 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" size="xs">{q.category}</Badge>
                  <Badge variant={q.level} size="xs">{q.level}</Badge>
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug">
                  {q.question}
                </h3>
              </div>
              <div className="text-zinc-500 mt-1 shrink-0">
                {revealed.has(q.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            <AnimatePresence>
              {revealed.has(q.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-[#142a20] bg-black p-4"
                >
                  <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-line mb-3">
                    {q.answer}
                  </p>
                  {q.example && (
                    <div className="rounded-xl bg-[#050806] border border-[#142a20] p-3 font-mono text-xs text-emerald-300">
                      <div className="text-[10px] text-zinc-500 mb-1 font-mono uppercase">Engineering Example</div>
                      {q.example}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
