import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Search, ChevronDown, ChevronUp, Copy, Check, Filter,
  Coffee, Leaf, Database, Atom, Package, Cloud, Layers, Code2, Boxes, Server
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '@/data/interviewData';
import Badge from '@/components/ui/Badge';

const CATEGORIES = ['All', ...Array.from(new Set(INTERVIEW_QUESTIONS.map(q => q.category)))];
const LEVELS = ['All', 'beginner', 'intermediate', 'advanced'];

const LEVEL_COLORS: Record<string, string> = {
  beginner:     'pill-emerald',
  intermediate: 'pill-amber',
  advanced:     'pill-red',
};



const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Java: <Coffee size={16} />,
  'Spring Boot': <Leaf size={16} />,
  SQL: <Database size={16} />,
  React: <Atom size={16} />,
  Docker: <Package size={16} />,
  AWS: <Cloud size={16} />,
  'System Design': <Layers size={16} />,
  DSA: <Code2 size={16} />,
  OOP: <Boxes size={16} />,
  'REST API': <Server size={16} />,
};

export default function InterviewPage() {
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyAnswer = async (id: string, answer: string) => {
    await navigator.clipboard.writeText(answer);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
            <MessageSquare className="text-emerald-400" size={22} />
          </div>
          <div>
            <span className="eyebrow">Interview Prep</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Technical Interview Bank
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 text-base leading-relaxed max-w-3xl ml-14">
          Deep architectural answers across Java 25 LTS, Spring Boot 3, SQL, React 19, Docker, AWS, and Distributed System Design.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 mt-5 ml-14">
          <span className="pill pill-emerald"><MessageSquare size={10} /> {INTERVIEW_QUESTIONS.length} Questions</span>
          <span className="pill pill-zinc">{CATEGORIES.length - 1} Categories</span>
          <span className="pill pill-amber">Beginner → Advanced</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="panel p-5 mb-6 rounded-3xl animate-fade-up delay-100">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by keyword, topic, or technology..."
            className="w-full pl-11 pr-4 py-3.5 bg-black border border-[#142a20] rounded-2xl text-white text-sm outline-none focus:border-emerald-500/60 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] font-mono placeholder:text-zinc-600 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2.5">
            <Filter size={13} className="text-zinc-500" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono transition-all ${
                  category === c
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'bg-black/60 border border-[#142a20] text-zinc-400 hover:border-emerald-500/30 hover:text-zinc-200'
                }`}
              >
                {CATEGORY_ICONS[c] && <span className="mr-1">{CATEGORY_ICONS[c]}</span>}
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Level Pills */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Difficulty</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono transition-all capitalize ${
                  level === l
                    ? l === 'beginner'     ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : l === 'intermediate' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : l === 'advanced'     ? 'bg-red-950/80 text-red-300 border border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60'
                    : 'bg-black/60 border border-[#142a20] text-zinc-400 hover:border-zinc-500/30 hover:text-zinc-200'
                }`}
              >
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-5 font-mono px-1">
        <span>
          <span className="text-emerald-400 font-bold">{filtered.length}</span> questions matching your criteria
        </span>
        {(search || category !== 'All' || level !== 'All') && (
          <button
            onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="panel p-12 rounded-3xl text-center animate-fade-up">
          <MessageSquare size={40} className="text-zinc-600 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No questions found</h3>
          <p className="text-zinc-400 text-sm">Try different filters or clear your search.</p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.02, 0.3) }}
            className="panel rounded-3xl overflow-hidden transition-all hover:border-emerald-500/40"
          >
            <button
              onClick={() => toggle(q.id)}
              className="w-full flex items-start justify-between gap-5 p-6 text-left hover:bg-emerald-950/10 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                  <Badge variant="primary" size="xs">{q.category}</Badge>
                  <span className={`pill ${LEVEL_COLORS[q.level] || 'pill-zinc'}`}>
                    {q.level.charAt(0).toUpperCase() + q.level.slice(1)}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base lg:text-lg leading-snug group-hover:text-emerald-300">
                  {q.question}
                </h3>
              </div>
              <div className={`text-zinc-500 mt-1 shrink-0 p-2 rounded-xl border transition-all ${revealed.has(q.id) ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' : 'bg-black border-[#142a20]'}`}>
                {revealed.has(q.id) ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </div>
            </button>

            <AnimatePresence>
              {revealed.has(q.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="border-t border-[#142a20] bg-[#040807]/80"
                >
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line flex-1">
                        {q.answer}
                      </p>
                      <button
                        onClick={() => copyAnswer(q.id, q.answer)}
                        className="shrink-0 p-2 rounded-xl bg-black border border-[#142a20] text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                        title="Copy answer"
                      >
                        {copied === q.id ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                      </button>
                    </div>
                    {q.example && (
                      <div className="rounded-2xl bg-black border border-[#142a20] p-4 font-mono text-xs text-emerald-300">
                        <div className="text-[11px] text-zinc-500 mb-2 font-mono uppercase font-bold tracking-wider">
                          Engineering Example
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">{q.example}</pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
