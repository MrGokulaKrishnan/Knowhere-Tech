import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, GitCommit, GitMerge, Plus, Terminal, 
  FileText, UploadCloud, RotateCcw, Edit3
} from 'lucide-react';

type FileStatus = 'Modified' | 'Staged' | 'Committed';
type File = { name: string; status: FileStatus };
type Commit = { id: string; message: string; author: string; branch: string; parentIds: string[] };
type Branch = { name: string; targetId: string };

const ROW_HEIGHT = 72;
const MAIN_X = 48;
const FEAT_X = 96;

export default function GitWorkflowVisualizer() {
  const initialState = useCallback(() => ({
    commits: [
      { id: 'a1b2c3d', message: 'Initial commit', author: 'User', branch: 'main', parentIds: [] }
    ],
    branches: [
      { name: 'main', targetId: 'a1b2c3d' }
    ],
    currentBranch: 'main',
    files: [
      { name: 'src/App.tsx', status: 'Committed' as FileStatus },
      { name: 'src/styles.css', status: 'Modified' as FileStatus },
    ],
    logs: [
      '$ git init',
      '$ git add .',
      '$ git commit -m "Initial commit"'
    ]
  }), []);

  const [commits, setCommits] = useState<Commit[]>(initialState().commits);
  const [branches, setBranches] = useState<Branch[]>(initialState().branches);
  const [currentBranch, setCurrentBranch] = useState(initialState().currentBranch);
  const [files, setFiles] = useState<File[]>(initialState().files);
  const [logs, setLogs] = useState<string[]>(initialState().logs);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const reset = () => {
    const init = initialState();
    setCommits(init.commits);
    setBranches(init.branches);
    setCurrentBranch(init.currentBranch);
    setFiles(init.files);
    setLogs(init.logs);
  };

  const handleEditFile = () => {
    const committedFiles = files.filter(f => f.status === 'Committed');
    if (committedFiles.length > 0) {
      const fileToEdit = committedFiles[0];
      setFiles(prev => prev.map(f => f.name === fileToEdit.name ? { ...f, status: 'Modified' } : f));
      setLogs(prev => [...prev, `> Edited ${fileToEdit.name}`]);
    } else {
      const newFileName = `src/file_${Math.random().toString(36).slice(2, 5)}.ts`;
      setFiles(prev => [...prev, { name: newFileName, status: 'Modified' }]);
      setLogs(prev => [...prev, `> Created ${newFileName}`]);
    }
  };

  const handleGitAdd = () => {
    let changed = false;
    const newFiles = files.map(f => {
      if (f.status === 'Modified') {
        changed = true;
        return { ...f, status: 'Staged' as FileStatus };
      }
      return f;
    });
    if (changed) {
      setFiles(newFiles);
      setLogs(prev => [...prev, '$ git add .']);
    } else {
      setLogs(prev => [...prev, '$ git add .', '> Nothing to add.']);
    }
  };

  const handleGitCommit = () => {
    const stagedCount = files.filter(f => f.status === 'Staged').length;
    if (stagedCount === 0) {
      setLogs(prev => [...prev, '$ git commit -m "Update"', '> Nothing to commit, working tree clean.']);
      return;
    }
    
    const newId = Math.random().toString(16).slice(2, 9);
    const currentBranchObj = branches.find(b => b.name === currentBranch)!;
    
    const newCommit: Commit = {
      id: newId,
      message: currentBranch === 'main' ? 'Update main' : 'Feature work',
      author: 'User',
      branch: currentBranch,
      parentIds: [currentBranchObj.targetId]
    };
    
    setCommits(prev => [...prev, newCommit]);
    setBranches(prev => prev.map(b => b.name === currentBranch ? { ...b, targetId: newId } : b));
    setFiles(prev => prev.map(f => f.status === 'Staged' ? { ...f, status: 'Committed' } : f));
    setLogs(prev => [...prev, `$ git commit -m "${newCommit.message}"`, `> [${currentBranch} ${newId}] ${newCommit.message}`]);
  };

  const handleCreateBranch = () => {
    if (branches.some(b => b.name === 'feature')) {
      if (currentBranch === 'feature') {
        setLogs(prev => [...prev, '$ git checkout -b feature', '> fatal: A branch named "feature" already exists.']);
      } else {
        setCurrentBranch('feature');
        setLogs(prev => [...prev, '$ git checkout feature', '> Switched to branch "feature"']);
      }
      return;
    }
    
    const currentBranchObj = branches.find(b => b.name === currentBranch)!;
    setBranches(prev => [...prev, { name: 'feature', targetId: currentBranchObj.targetId }]);
    setCurrentBranch('feature');
    
    setFiles(prev => prev.map((f, i) => i === 0 ? { ...f, status: 'Modified' } : f));
    setLogs(prev => [...prev, '$ git checkout -b feature', '> Switched to a new branch "feature"']);
  };

  const handleGitMerge = () => {
    if (currentBranch !== 'main') {
      setLogs(prev => [...prev, '$ git merge feature', '> Please checkout main first to merge feature into it.']);
      return;
    }
    
    const featureBranch = branches.find(b => b.name === 'feature');
    if (!featureBranch) {
      setLogs(prev => [...prev, '$ git merge feature', '> merge: feature - not something we can merge']);
      return;
    }
    
    const mainBranch = branches.find(b => b.name === 'main')!;
    if (mainBranch.targetId === featureBranch.targetId) {
      setLogs(prev => [...prev, '$ git merge feature', '> Already up to date.']);
      return;
    }
    
    const newId = Math.random().toString(16).slice(2, 9);
    const newCommit: Commit = {
      id: newId,
      message: 'Merge branch "feature" into main',
      author: 'User',
      branch: 'main',
      parentIds: [mainBranch.targetId, featureBranch.targetId]
    };
    
    setCommits(prev => [...prev, newCommit]);
    setBranches(prev => prev.map(b => b.name === 'main' ? { ...b, targetId: newId } : b));
    setLogs(prev => [...prev, '$ git merge feature', `> Merge made by the 'ort' strategy.`]);
  };

  const handleGitPush = () => {
    setLogs(prev => [...prev, '$ git push origin ' + currentBranch, `> To github.com:user/repo.git`, `>   ${branches.find(b=>b.name===currentBranch)?.targetId}.. -> ${currentBranch}`]);
  };

  const reversedCommits = [...commits].reverse();

  const getCommitCoords = (id: string) => {
    const index = reversedCommits.findIndex(c => c.id === id);
    if (index === -1) return { x: 0, y: 0 };
    const c = reversedCommits[index];
    const x = c.branch === 'main' ? MAIN_X : FEAT_X;
    const y = index * ROW_HEIGHT + 48; // +48 for top padding
    return { x, y };
  };

  const renderPointers = (commitId: string) => {
    const commitBranches = branches.filter(b => b.targetId === commitId);
    return (
      <div className="flex gap-2 ml-4">
        {commitBranches.map(b => (
          <span key={b.name} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
            b.name === currentBranch 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
              : 'bg-white/10 border-white/20 text-white/70'
          }`}>
             {b.name === currentBranch ? 'HEAD -> ' : ''}{b.name}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="panel rounded-3xl p-6 flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <GitBranch className="text-emerald-400" /> Git Workflow Visualizer
        </h2>
        <button onClick={reset} className="text-emerald-400/70 hover:text-emerald-400 flex items-center gap-2 text-sm transition-colors">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Workspace (Graph & Controls) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Graph Area */}
          <div className="bg-black/40 border border-emerald-500/20 rounded-2xl relative overflow-y-auto overflow-x-hidden h-[400px]">
            <div className="relative w-full" style={{ height: Math.max(400, commits.length * ROW_HEIGHT + 96) }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {reversedCommits.map(c => {
                  const { x: x1, y: y1 } = getCommitCoords(c.id);
                  return c.parentIds.map((pId, idx) => {
                    const { x: x2, y: y2 } = getCommitCoords(pId);
                    const isSecondary = idx > 0;
                    
                    const path = x1 === x2 
                      ? `M ${x1} ${y1} L ${x2} ${y2}`
                      : `M ${x1} ${y1} C ${x1} ${(y1+y2)/2}, ${x2} ${(y1+y2)/2}, ${x2} ${y2}`;
                      
                    return (
                      <motion.path
                        key={`${c.id}-${pId}`}
                        d={path}
                        fill="none"
                        stroke={isSecondary ? '#2dd4bf' : c.branch === 'main' ? '#34d399' : '#2dd4bf'}
                        strokeWidth={isSecondary ? "2" : "3"}
                        opacity={isSecondary ? 0.6 : 1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  });
                })}
              </svg>

              {reversedCommits.map((c) => {
                const { x, y } = getCommitCoords(c.id);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute h-0 flex items-center"
                    style={{ top: y, left: 0, width: '100%' }}
                  >
                    <div 
                      className={`absolute w-4 h-4 -mt-2 rounded-full border-2 border-black ${
                        c.branch === 'main' ? 'bg-emerald-400' : 'bg-teal-400'
                      } z-10`} 
                      style={{ left: x - 8 }} 
                    />
                    
                    <div className="absolute left-[140px] -mt-4 flex items-center w-max">
                      <div className="bg-black/60 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-sm text-white flex items-center gap-3 shadow-lg backdrop-blur-sm">
                        <span className="text-emerald-400 font-mono font-semibold">{c.id}</span>
                        <span className="text-white/90">{c.message}</span>
                      </div>
                      {renderPointers(c.id)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            <button className="button-primary flex items-center gap-2" onClick={handleGitAdd}>
              <Plus size={16} /> git add .
            </button>
            <button className="button-primary flex items-center gap-2" onClick={handleGitCommit}>
              <GitCommit size={16} /> git commit
            </button>
            <button className="button-primary flex items-center gap-2" onClick={handleCreateBranch}>
              <GitBranch size={16} /> Create Branch
            </button>
            <button className="button-primary flex items-center gap-2" onClick={handleGitMerge}>
              <GitMerge size={16} /> git merge
            </button>
            <button className="button-primary flex items-center gap-2" onClick={handleGitPush}>
              <UploadCloud size={16} /> git push
            </button>
          </div>
        </div>

        {/* Status Panel */}
        <div className="flex flex-col gap-4">
          
          {/* File Status */}
          <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <FileText size={18} className="text-emerald-400" /> File Status
              </h3>
              <button 
                onClick={handleEditFile} 
                className="text-xs text-emerald-400/80 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Edit3 size={14} /> Simulate Edit
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {files.map(f => (
                  <motion.div 
                    key={f.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                  >
                    <span className="text-white/80 font-mono text-xs">{f.name}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      f.status === 'Modified' ? 'bg-amber-500/20 text-amber-400' :
                      f.status === 'Staged' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {f.status}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal Log */}
          <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl p-5 flex-1 flex flex-col h-[200px]">
            <h3 className="text-emerald-400/80 font-mono text-sm flex items-center gap-2 mb-3">
              <Terminal size={16} /> Terminal
            </h3>
            <div 
              ref={terminalRef}
              className="font-mono text-[13px] leading-relaxed flex flex-col gap-1 overflow-y-auto flex-1 pr-2"
            >
              {logs.map((log, i) => (
                <div key={i} className={log.startsWith('>') ? 'text-emerald-400/60 ml-3' : 'text-emerald-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
