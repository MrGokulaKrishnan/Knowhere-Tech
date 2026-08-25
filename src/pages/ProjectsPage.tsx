import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Clock, Zap, ChevronRight, Server, Database, Layers, CheckCircle2, Code2, X, ArrowRight, Package, Cloud, Atom } from 'lucide-react';
import { PROJECTS_DATA, type ProjectItem } from '@/data/projectsData';
import Badge from '@/components/ui/Badge';

const LEVEL_BORDER: Record<string, string> = {
  beginner:     'border-t-emerald-500',
  intermediate: 'border-t-amber-500',
  advanced:     'border-t-red-500',
};

const LEVEL_GLOW: Record<string, string> = {
  beginner:     'shadow-[0_0_25px_rgba(16,185,129,0.12)]',
  intermediate: 'shadow-[0_0_25px_rgba(245,158,11,0.12)]',
  advanced:     'shadow-[0_0_25px_rgba(239,68,68,0.12)]',
};

const LEVEL_PILL: Record<string, string> = {
  beginner:     'pill-emerald',
  intermediate: 'pill-amber',
  advanced:     'pill-red',
};

function getTechIcon(tech: string) {
  if (/react/i.test(tech)) return <Atom size={12} />;
  if (/docker|container/i.test(tech)) return <Package size={12} />;
  if (/aws|cloud/i.test(tech)) return <Cloud size={12} />;
  if (/sql|postgres|mysql/i.test(tech)) return <Database size={12} />;
  return null;
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filtered = filterLevel === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.level === filterLevel);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
            <FolderOpen className="text-emerald-400" size={22} />
          </div>
          <div>
            <span className="eyebrow">Portfolio Builder</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Full Stack Project Blueprints
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 max-w-3xl text-base leading-relaxed ml-14">
          Production-grade blueprints with system architectures, SQL schemas, Docker configs, and REST endpoint specs for real-world portfolio projects.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mt-5 ml-14">
          <span className="pill pill-emerald"><FolderOpen size={10} /> {PROJECTS_DATA.length} Blueprints</span>
          <span className="pill pill-zinc">{PROJECTS_DATA.filter(p => p.level === 'beginner').length} Beginner</span>
          <span className="pill pill-amber">{PROJECTS_DATA.filter(p => p.level === 'intermediate').length} Intermediate</span>
          <span className="pill pill-red">{PROJECTS_DATA.filter(p => p.level === 'advanced').length} Advanced</span>
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap gap-2.5 mb-8 animate-fade-up delay-100">
        {['All', 'beginner', 'intermediate', 'advanced'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setFilterLevel(lvl)}
            className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all capitalize ${
              filterLevel === lvl
                ? lvl === 'beginner'     ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-[0_0_14px_rgba(16,185,129,0.3)]'
                : lvl === 'intermediate' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/60 shadow-[0_0_14px_rgba(245,158,11,0.25)]'
                : lvl === 'advanced'     ? 'bg-red-950/80 text-red-300 border border-red-500/60 shadow-[0_0_14px_rgba(239,68,68,0.2)]'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60'
                : 'bg-black/60 border border-[#142a20] text-zinc-400 hover:border-zinc-500/30 hover:text-zinc-200'
            }`}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {filtered.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, type: 'spring', damping: 20, stiffness: 200 }}
            onClick={() => setSelectedProject(proj)}
            className={`panel border-t-2 ${LEVEL_BORDER[proj.level] || 'border-t-emerald-500'} ${LEVEL_GLOW[proj.level]} p-7 cursor-pointer hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group rounded-3xl`}
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Layers size={22} />
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <span className={`pill ${LEVEL_PILL[proj.level] || 'pill-zinc'}`}>
                    {proj.level.charAt(0).toUpperCase() + proj.level.slice(1)}
                  </span>
                  <span className="pill pill-emerald">
                    <Zap size={10} />+{proj.xp} XP
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-white text-lg mb-2.5 group-hover:text-emerald-300 transition-colors leading-snug">
                {proj.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3">
                {proj.desc}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {proj.stack.slice(0, 4).map(tech => (
                  <span key={tech} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-black border border-[#142a20] text-zinc-300 font-mono">
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
                {proj.stack.length > 4 && (
                  <span className="text-xs px-2 py-1 text-zinc-600 font-mono">
                    +{proj.stack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#142a20] text-xs">
                <span className="flex items-center gap-1.5 font-mono text-zinc-400">
                  <Clock size={13} className="text-zinc-500" /> {proj.duration}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Blueprint <ChevronRight size={15} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ type: 'spring', damping: 22, stiffness: 250 }}
              className="panel-elevated relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="flex items-start justify-between p-7 lg:p-8 border-b border-[#142a20] shrink-0 bg-[#090f0c]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2.5 mb-3">
                    <span className={`pill ${LEVEL_PILL[selectedProject.level] || 'pill-zinc'}`}>
                      {selectedProject.level.charAt(0).toUpperCase() + selectedProject.level.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
                      <Clock size={12} /> {selectedProject.duration}
                    </span>
                    <span className="pill pill-emerald">
                      <Zap size={10} /> {selectedProject.xp} XP
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight pr-8">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="shrink-0 p-2.5 rounded-2xl text-zinc-400 hover:text-white hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-7 lg:p-8 space-y-8">
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {selectedProject.desc}
                </p>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3.5 font-mono">
                    Production Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black border border-[#142a20] text-xs text-emerald-300 font-mono font-semibold">
                        {getTechIcon(tech)}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div className="p-6 rounded-2xl bg-black border border-[#142a20] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Server size={16} className="text-emerald-400" /> Architecture Blueprint
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3.5 font-mono">
                    Feature Specifications
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Database Schema */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3.5 flex items-center gap-2 font-mono">
                    <Database size={14} className="text-teal-400" /> Database Schema Tables
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.dbSchema.map((table, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-emerald-200">
                        <Database size={13} className="text-teal-500 shrink-0" />
                        {table}
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Endpoints */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3.5 flex items-center gap-2 font-mono">
                    <Code2 size={14} className="text-amber-400" /> REST API Endpoints
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.apiEndpoints.map((ep, i) => {
                      const method = ep.match(/^(GET|POST|PUT|DELETE|PATCH)/)?.[0];
                      const methodColor = method === 'GET' ? 'text-sky-400' : method === 'POST' ? 'text-emerald-400' : method === 'PUT' ? 'text-amber-400' : method === 'DELETE' ? 'text-red-400' : 'text-zinc-400';
                      return (
                        <div key={i} className="px-4 py-2.5 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-zinc-300">
                          {method ? (
                            <><span className={`font-bold ${methodColor}`}>{method}</span>{ep.slice(method.length)}</>
                          ) : ep}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-7 lg:p-8 border-t border-[#142a20] shrink-0 bg-[#090f0c]">
                <span className="text-xs text-zinc-500 font-mono">
                  {selectedProject.stack.length} technologies · {selectedProject.features.length} features
                </span>
                <button onClick={() => setSelectedProject(null)} className="button-primary text-xs !py-2.5 !px-5">
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
