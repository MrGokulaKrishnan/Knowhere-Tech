import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Clock, Zap, ChevronRight, Server, Database, Layers, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { PROJECTS_DATA, type ProjectItem } from '@/data/projectsData';
import Badge from '@/components/ui/Badge';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filtered = filterLevel === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.level === filterLevel);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FolderOpen className="text-emerald-400" size={22} />
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
            Full Stack Project Portfolio (8 Production Blueprints)
          </h1>
        </div>
        <p className="text-zinc-400 max-w-2xl text-sm">
          Production blueprints for full stack projects featuring system architectures, SQL schemas, and REST endpoint specs.
        </p>

        {/* Level Filters */}
        <div className="flex gap-2 mt-4">
          {['All', 'beginner', 'intermediate', 'advanced'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filterLevel === lvl
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'bg-[#050806] border border-[#142a20] text-zinc-400 hover:text-white'
              }`}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => setSelectedProject(proj)}
            className="panel p-5 cursor-pointer hover:border-emerald-500/60 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Layers size={20} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant={proj.level}>{proj.level}</Badge>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5 font-semibold">
                    <Zap size={12} />+{proj.xp} XP
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-white text-base mb-1.5 group-hover:text-emerald-400 transition-colors">
                {proj.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-3">
                {proj.desc}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-black border border-[#142a20] text-zinc-400 font-mono">
                    {tech}
                  </span>
                ))}
                {proj.stack.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-zinc-500 font-mono">
                    +{proj.stack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#142a20] text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Clock size={12} /> {proj.duration}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  View Blueprint <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="panel-elevated relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={selectedProject.level}>{selectedProject.level}</Badge>
                    <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
                      <Clock size={12} /> {selectedProject.duration}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5 font-bold">
                      <Zap size={12} /> {selectedProject.xp} XP Reward
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-emerald-950/40 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-zinc-300 text-xs leading-relaxed mb-6">
                {selectedProject.desc}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-xl bg-black border border-[#142a20] text-xs text-emerald-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture */}
              <div className="mb-6 p-4 rounded-2xl bg-black border border-[#142a20]">
                <h3 className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
                  <Server size={14} className="text-emerald-400" /> Architecture Overview
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>

              {/* Core Features */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Key Specifications
                </h3>
                <ul className="space-y-1.5">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Database Schema */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Database size={13} className="text-teal-400" /> Database Relational Tables
                </h3>
                <div className="space-y-1.5">
                  {selectedProject.dbSchema.map((table, i) => (
                    <div key={i} className="px-3 py-2 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-emerald-200">
                      {table}
                    </div>
                  ))}
                </div>
              </div>

              {/* API Endpoints */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Code2 size={13} className="text-amber-400" /> REST API Endpoints
                </h3>
                <div className="space-y-1.5">
                  {selectedProject.apiEndpoints.map((ep, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-xl bg-black border border-[#142a20] font-mono text-xs text-zinc-300">
                      {ep}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#142a20]">
                <button onClick={() => setSelectedProject(null)} className="button-primary text-xs !py-2 !px-4">
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
