import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="text-emerald-400" size={26} />
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white">
            Technical Interview Bank (500+ Q&A)
          </h1>
        </div>
        <p className="text-zinc-300 text-base leading-relaxed max-w-3xl">
          Technical interview questions with deep architectural answers across Java 25 LTS, Spring Boot 3, SQL, React 19, Docker, AWS, and Distributed System Design.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="panel p-6 mb-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search interview questions by keyword or topic..."
              className="w-full pl-11 pr-4 py-3 bg-black border border-[#142a20] rounded-2xl text-white text-sm outline-none focus:border-emerald-500/60 font-mono placeholder:text-zinc-500"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-4 py-3 bg-black border border-[#142a20] rounded-2xl text-emerald-300 text-xs outline-none focus:border-emerald-500/60 font-mono cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-black text-white">{c}</option>)}
            </select>

            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="px-4 py-3 bg-black border border-[#142a20] rounded-2xl text-emerald-300 text-xs outline-none focus:border-emerald-500/60 font-mono cursor-pointer"
            >
              {LEVELS.map(l => <option key={l} value={l} className="bg-black text-white">{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 font-mono">
        <span>{filtered.length} technical questions matching criteria</span>
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="panel rounded-3xl overflow-hidden transition-all hover:border-emerald-500/50"
          >
            <button
              onClick={() => toggle(q.id)}
              className="w-full flex items-start justify-between gap-6 p-6 text-left hover:bg-emerald-950/20 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <Badge variant="primary" size="xs">{q.category}</Badge>
                  <Badge variant={q.level} size="xs">{q.level}</Badge>
                </div>
                <h3 className="font-bold text-white text-base lg:text-lg leading-snug">
                  {q.question}
                </h3>
              </div>
              <div className="text-zinc-500 mt-1 shrink-0 p-2 rounded-xl bg-black border border-[#142a20]">
                {revealed.has(q.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            <AnimatePresence>
              {revealed.has(q.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-[#142a20] bg-black/90 p-6 lg:p-8"
                >
                  <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line mb-4">
                    {q.answer}
                  </p>
                  {q.example && (
                    <div className="rounded-2xl bg-[#050806] border border-[#142a20] p-4 font-mono text-xs text-emerald-300">
                      <div className="text-[11px] text-zinc-500 mb-2 font-mono uppercase font-bold">Engineering Implementation Example</div>
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
