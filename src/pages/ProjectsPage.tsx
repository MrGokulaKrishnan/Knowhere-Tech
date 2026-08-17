import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Clock, Zap, ChevronRight, Server, Database, Layers, CheckCircle2, Code2, Sparkles, X } from 'lucide-react';
import { PROJECTS_DATA, type ProjectItem } from '@/data/projectsData';
import Badge from '@/components/ui/Badge';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filtered = filterLevel === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.level === filterLevel);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="text-emerald-400" size={26} />
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white">
            Full Stack Project Portfolio (8 Production Blueprints)
          </h1>
        </div>
        <p className="text-zinc-300 max-w-3xl text-base leading-relaxed">
          Production blueprints for full stack projects featuring system architectures, SQL schemas, and REST endpoint specs designed for real-world portfolio showcases.
        </p>

        {/* Level Filters */}
        <div className="flex gap-2.5 mt-6">
          {['All', 'beginner', 'intermediate', 'advanced'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold font-mono transition-all ${
                filterLevel === lvl
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#050806] border border-[#142a20] text-zinc-400 hover:text-white'
              }`}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => setSelectedProject(proj)}
            className="panel p-7 cursor-pointer hover:border-emerald-500/60 transition-all duration-200 flex flex-col justify-between group rounded-3xl"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Layers size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={proj.level}>{proj.level}</Badge>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <Zap size={14} />+{proj.xp} XP
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                {proj.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {proj.desc}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {proj.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-lg bg-black border border-[#142a20] text-zinc-300 font-mono">
                    {tech}
                  </span>
                ))}
                {proj.stack.length > 3 && (
                  <span className="text-xs px-2 py-1 text-zinc-500 font-mono">
                    +{proj.stack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#142a20] text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono"><Clock size={14} /> {proj.duration}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Blueprint <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spacious Project Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="panel-elevated relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 lg:p-10 rounded-3xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <Badge variant={selectedProject.level}>{selectedProject.level}</Badge>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                      <Clock size={14} /> {selectedProject.duration}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <Zap size={14} /> {selectedProject.xp} XP Reward
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold font-display text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-emerald-950/40 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-8">
                {selectedProject.desc}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 font-mono">
                  Production Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {selectedProject.stack.map(tech => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-black border border-[#142a20] text-xs text-emerald-300 font-mono font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture */}
              <div className="mb-8 p-6 rounded-2xl bg-black border border-[#142a20]">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Server size={16} className="text-emerald-400" /> Architecture Blueprint
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>

              {/* Core Features */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 font-mono">
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
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2 font-mono">
                  <Database size={15} className="text-teal-400" /> Database Relational Tables
                </h3>
                <div className="space-y-2">
                  {selectedProject.dbSchema.map((table, i) => (
                    <div key={i} className="px-4 py-2.5 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-emerald-200">
                      {table}
                    </div>
                  ))}
                </div>
              </div>

              {/* API Endpoints */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2 font-mono">
                  <Code2 size={15} className="text-amber-400" /> REST API Endpoints
                </h3>
                <div className="space-y-2">
                  {selectedProject.apiEndpoints.map((ep, i) => (
                    <div key={i} className="px-4 py-2 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-zinc-300">
                      {ep}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-[#142a20]">
                <button onClick={() => setSelectedProject(null)} className="button-primary text-xs !py-3 !px-6">
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
