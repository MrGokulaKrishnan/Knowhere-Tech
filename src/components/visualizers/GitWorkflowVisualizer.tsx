import React, { useState } from 'react';
import { GitBranch, CheckCircle, Play, RotateCcw } from 'lucide-react';

const STAGES = [
  {
    id: 'work',
    name: 'Working Directory',
    command: 'Developer edits files',
    desc: 'Unstaged local changes in your workspace.',
    color: '#4A6B53'
  },
  {
    id: 'stage',
    name: 'Staging Area (Index)',
    command: 'git add .',
    desc: 'Prepared changes indexed for the next atomic commit snapshot.',
    color: '#FBBF24'
  },
  {
    id: 'local',
    name: 'Local Repository',
    command: 'git commit -m "feat: user auth"',
    desc: 'Cryptographically hashed snapshot saved locally in the .git database.',
    color: '#10B981'
  },
  {
    id: 'remote',
    name: 'Remote GitHub Repo',
    command: 'git push origin main',
    desc: 'Shared cloud repository where team members collaborate and trigger CI/CD.',
    color: '#00FF88'
  }
];

export default function GitWorkflowVisualizer() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="rounded-2xl border border-[#142318] bg-[#090E0A] p-5 mb-6 shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <GitBranch size={16} className="text-[#00FF88]" />
            Interactive Git & GitHub Workflow Pipeline
          </h3>
          <p className="text-xs text-[#4A6B53]">
            Understand how commits move through Working Directory → Staging Area → Local Repo → GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStage(0)}
            className="p-1.5 rounded-lg border border-[#142318] text-[#94A3B8] hover:text-white bg-[#000000] transition-colors"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setActiveStage(prev => (prev + 1) % STAGES.length)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#00FF88] text-xs font-semibold hover:bg-[#10B981]/30 transition-colors shadow-glow-green"
          >
            <Play size={12} /> Next Git Step
          </button>
        </div>
      </div>

      {/* Pipeline Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
        {STAGES.map((st, idx) => {
          const isPassed = activeStage >= idx;
          const isCurrent = activeStage === idx;
          return (
            <div
              key={st.id}
              onClick={() => setActiveStage(idx)}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                isCurrent
                  ? 'border-[#00FF88]/80 bg-[#00FF88]/15 shadow-glow-green'
                  : isPassed
                  ? 'border-[#10B981]/40 bg-[#10B981]/10'
                  : 'border-[#142318] bg-[#000000] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#4A6B53]">Step {idx + 1}</span>
                {isPassed && <CheckCircle size={12} className="text-[#00FF88]" />}
              </div>
              <h4 className="font-semibold text-white text-xs">{st.name}</h4>
              <p className="font-mono text-[10px] text-[#4A6B53] mt-1 truncate">{st.command}</p>
            </div>
          );
        })}
      </div>

      {/* Stage Detail Box */}
      <div className="p-4 rounded-2xl bg-[#000000] border border-[#142318]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono font-bold text-[#00FF88]">
            ACTIVE STAGE: {STAGES[activeStage].name}
          </span>
          <span className="font-mono text-xs text-[#00FF88] px-2.5 py-0.5 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30">
            $ {STAGES[activeStage].command}
          </span>
        </div>
        <p className="text-[#94A3B8] text-xs leading-relaxed mt-2">
          {STAGES[activeStage].desc}
        </p>
      </div>
    </div>
  );
}
