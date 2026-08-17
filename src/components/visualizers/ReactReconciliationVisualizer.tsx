import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Play, RotateCcw, CheckCircle2, ArrowRight, Layers, Sparkles, RefreshCw } from 'lucide-react';

interface ComponentState {
  count: number;
  user: string;
  theme: string;
}

export default function ReactReconciliationVisualizer() {
  const [state, setState] = useState<ComponentState>({ count: 1, user: 'Alex', theme: 'Dark' });
  const [stage, setStage] = useState<'idle' | 'state-change' | 'vdom-diff' | 'dom-commit'>('idle');
  const [diffLogs, setDiffLogs] = useState<string[]>([
    'Virtual DOM Tree: Initialized and mounted in memory.',
    'Fiber Reconciliation Tree ready for state dispatch.'
  ]);

  const triggerStateUpdate = () => {
    setStage('state-change');
    setDiffLogs(prev => [
      `1. setState({ count: ${state.count + 1} }) scheduled on Fiber WorkInProgress queue.`,
      ...prev
    ]);

    setTimeout(() => {
      setStage('vdom-diff');
      setDiffLogs(prev => [
        `2. Virtual DOM Diffing Engine calculates minimum subtree changes using heuristic O(n) algorithm.`,
        ...prev
      ]);
    }, 900);

    setTimeout(() => {
      setState(s => ({ ...s, count: s.count + 1 }));
      setStage('dom-commit');
      setDiffLogs(prev => [
        `3. Commit Phase: Fiber reconciler applies batch DOM mutation to <span class="badge">#counter-node</span>.`,
        ...prev
      ]);
    }, 1800);

    setTimeout(() => {
      setStage('idle');
    }, 2800);
  };

  const handleReset = () => {
    setState({ count: 1, user: 'Alex', theme: 'Dark' });
    setStage('idle');
    setDiffLogs(['Virtual DOM Tree reset to initial baseline.']);
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              React 19 Core Architecture
            </span>
          </div>
          <h3 className="text-lg lg:text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Atom size={22} className="text-emerald-400 animate-spin-slow" />
            Virtual DOM & Fiber Reconciliation Simulator
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Observe how React schedules state changes, calculates Virtual DOM diffs, and batches real DOM updates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleReset}
            className="button-secondary text-xs !py-2.5 !px-4"
            title="Reset Simulator"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            onClick={triggerStateUpdate}
            disabled={stage !== 'idle'}
            className="button-primary text-xs !py-2.5 !px-5"
          >
            {stage === 'idle' ? <Play size={14} /> : <RefreshCw size={14} className="animate-spin" />}
            <span>{stage === 'idle' ? 'Trigger setState()' : 'Reconciling...'}</span>
          </button>
        </div>
      </div>

      {/* Stage Progression Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { key: 'state-change', label: '1. State Dispatch', desc: 'Fiber work scheduled' },
          { key: 'vdom-diff', label: '2. VDOM Diffing', desc: 'O(n) tree diff comparison' },
          { key: 'dom-commit', label: '3. DOM Commit', desc: 'Synchronous batch update' },
        ].map((s) => {
          const isActive = stage === s.key;
          return (
            <div
              key={s.key}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]'
                  : 'border-[#142a20] bg-black/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-emerald-300">{s.label}</span>
                {isActive && <Sparkles size={14} className="text-emerald-400 animate-pulse" />}
              </div>
              <p className="text-xs text-zinc-400">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Tree Visualization Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Previous Virtual DOM Tree */}
        <div className="p-5 rounded-2xl bg-black border border-[#142a20]">
          <div className="flex items-center justify-between mb-3 border-b border-[#142a20] pb-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-emerald-500" /> Current Virtual DOM
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Fiber Node Tree</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-[#070b09] border border-[#142a20] text-zinc-300">
              &lt;DashboardLayout user=&quot;{state.user}&quot;&gt;
              <div className="pl-4 mt-1.5 space-y-1.5">
                <div className="p-2 rounded-lg bg-black border border-[#142a20] text-zinc-400">
                  &lt;Header theme=&quot;{state.theme}&quot; /&gt;
                </div>
                <div className={`p-2 rounded-lg border transition-all duration-300 ${
                  stage === 'vdom-diff' || stage === 'dom-commit'
                    ? 'border-emerald-400 bg-emerald-950/70 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-[#142a20] bg-black text-zinc-400'
                }`}>
                  &lt;CounterWidget count=&#123;<span className="text-emerald-400 font-bold">{state.count}</span>&#125; /&gt;
                </div>
              </div>
              &lt;/DashboardLayout&gt;
            </div>
          </div>
        </div>

        {/* Real DOM Target Nodes */}
        <div className="p-5 rounded-2xl bg-black border border-[#142a20]">
          <div className="flex items-center justify-between mb-3 border-b border-[#142a20] pb-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal-400" /> Browser Real DOM
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Live HTML Node</span>
          </div>

          <div className="p-4 rounded-xl bg-[#050806] border border-[#142a20] font-mono text-xs">
            <p className="text-zinc-500 mb-2">// Mutated only on Commit Phase:</p>
            <div className="p-3 rounded-xl bg-black border border-emerald-800/40 text-emerald-300 flex items-center justify-between">
              <span>&lt;span id=&quot;counter-node&quot;&gt;Count: {state.count}&lt;/span&gt;</span>
              {stage === 'dom-commit' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-black font-bold animate-pulse">
                  DOM COMMITTED
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="p-4 rounded-2xl bg-[#030604] border border-[#142a20]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Reconciliation Engine Log
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">React Fiber Runtime</span>
        </div>
        <div className="space-y-1 font-mono text-xs text-zinc-300 max-h-28 overflow-y-auto">
          {diffLogs.map((log, i) => (
            <p key={i} className="text-emerald-400/90 leading-relaxed">• {log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
