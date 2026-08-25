import React, { useState } from 'react';
import { Database, Table2 } from 'lucide-react';

type JoinMode = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';

interface UserRow {
  id: number;
  name: string;
  role: string;
}

interface ProjectRow {
  id: number;
  userId: number;
  project: string;
}

interface JoinResultRow {
  uId: string | number;
  name: string;
  role: string;
  pId: string | number;
  project: string;
}

const USERS: UserRow[] = [
  { id: 1, name: 'Alice', role: 'Dev' },
  { id: 2, name: 'Bob', role: 'DevOps' },
  { id: 3, name: 'Charlie', role: 'QA' },
  { id: 4, name: 'Diana', role: 'Architect' },
];

const PROJECTS: ProjectRow[] = [
  { id: 101, userId: 1, project: 'Auth Service' },
  { id: 102, userId: 2, project: 'Kubernetes Cluster' },
  { id: 103, userId: 2, project: 'CI/CD Pipeline' },
  { id: 104, userId: 5, project: 'Legacy DB Migration' },
];

export default function SqlJoinVisualizer() {
  const [mode, setMode] = useState<JoinMode>('INNER');
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

  const computeResults = (): JoinResultRow[] => {
    switch (mode) {
      case 'INNER': {
        const rows: JoinResultRow[] = [];
        for (const u of USERS) {
          for (const p of PROJECTS) {
            if (p.userId === u.id) {
              rows.push({ uId: u.id, name: u.name, role: u.role, pId: p.id, project: p.project });
            }
          }
        }
        return rows;
      }
      case 'LEFT': {
        const rows: JoinResultRow[] = [];
        for (const u of USERS) {
          const matches = PROJECTS.filter(p => p.userId === u.id);
          if (matches.length === 0) {
            rows.push({ uId: u.id, name: u.name, role: u.role, pId: 'NULL', project: 'NULL' });
          } else {
            for (const p of matches) {
              rows.push({ uId: u.id, name: u.name, role: u.role, pId: p.id, project: p.project });
            }
          }
        }
        return rows;
      }
      case 'RIGHT': {
        const rows: JoinResultRow[] = [];
        for (const p of PROJECTS) {
          const u = USERS.find(user => user.id === p.userId);
          if (u) {
            rows.push({ uId: u.id, name: u.name, role: u.role, pId: p.id, project: p.project });
          } else {
            rows.push({ uId: 'NULL', name: 'NULL', role: 'NULL', pId: p.id, project: p.project });
          }
        }
        return rows;
      }
      case 'FULL': {
        const rows: JoinResultRow[] = [];
        for (const u of USERS) {
          const matches = PROJECTS.filter(p => p.userId === u.id);
          if (matches.length === 0) {
            rows.push({ uId: u.id, name: u.name, role: u.role, pId: 'NULL', project: 'NULL' });
          } else {
            for (const p of matches) {
              rows.push({ uId: u.id, name: u.name, role: u.role, pId: p.id, project: p.project });
            }
          }
        }
        for (const p of PROJECTS) {
          if (!USERS.some(u => u.id === p.userId)) {
            rows.push({ uId: 'NULL', name: 'NULL', role: 'NULL', pId: p.id, project: p.project });
          }
        }
        return rows;
      }
    }
  };

  const results = computeResults();

  const getFills = () => {
    switch (mode) {
      case 'INNER': return { left: 'transparent', right: 'transparent', both: 'rgba(52, 211, 153, 0.8)' };
      case 'LEFT': return { left: 'rgba(52, 211, 153, 0.25)', right: 'transparent', both: 'rgba(52, 211, 153, 0.8)' };
      case 'RIGHT': return { left: 'transparent', right: 'rgba(52, 211, 153, 0.25)', both: 'rgba(52, 211, 153, 0.8)' };
      case 'FULL': return { left: 'rgba(52, 211, 153, 0.25)', right: 'rgba(52, 211, 153, 0.25)', both: 'rgba(52, 211, 153, 0.8)' };
    }
  };
  const fills = getFills();

  const usersWithProjects = new Set(PROJECTS.map(p => p.userId));
  const projectsWithUsers = new Set(USERS.map(u => u.id));
  
  const usersMatched = USERS.filter(u => usersWithProjects.has(u.id)).length;
  const usersUnmatched = USERS.length - usersMatched;
  
  const projectsMatched = PROJECTS.filter(p => projectsWithUsers.has(p.userId)).length;
  const projectsUnmatched = PROJECTS.length - projectsMatched;

  return (
    <div className="panel rounded-3xl p-6 mb-6 flex flex-col gap-6 bg-emerald-950/20 border border-emerald-800/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-emerald-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            SQL JOIN Visualizer
          </h3>
          <p className="text-sm text-emerald-400/70 mt-1">
            Interactive visualization of relational algebra operations
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-emerald-950/50 p-1 rounded-2xl border border-emerald-800/40">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as JoinMode[]).map(j => (
            <button
              key={j}
              onClick={() => setMode(j)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                mode === j
                  ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'text-emerald-600/70 hover:text-emerald-400 hover:bg-emerald-900/30'
              }`}
            >
              {j}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualizer Venn Diagram & Query */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-6 flex flex-col items-center justify-center relative aspect-video">
            <svg viewBox="0 0 160 120" className="w-full h-full max-w-[200px]">
              <defs>
                <clipPath id="right-circle">
                  <circle cx="100" cy="60" r="40" />
                </clipPath>
              </defs>
              
              <circle cx="60" cy="60" r="40" fill={fills.left} className="transition-all duration-500" />
              <circle cx="100" cy="60" r="40" fill={fills.right} className="transition-all duration-500" />
              <circle cx="60" cy="60" r="40" clipPath="url(#right-circle)" fill={fills.both} className="transition-all duration-500" />
              
              <circle cx="60" cy="60" r="40" fill="none" className="stroke-emerald-600/50" strokeWidth="2" />
              <circle cx="100" cy="60" r="40" fill="none" className="stroke-emerald-600/50" strokeWidth="2" />
              
              <text x="40" y="65" className="text-[12px] fill-emerald-300 font-mono font-semibold" textAnchor="middle">A</text>
              <text x="120" y="65" className="text-[12px] fill-emerald-300 font-mono font-semibold" textAnchor="middle">B</text>
            </svg>
          </div>

          <div className="bg-black/40 border border-emerald-800/40 rounded-2xl p-4 font-mono text-sm">
            <div className="text-emerald-500">SELECT</div>
            <div className="text-emerald-100 pl-4">u.id, u.name, p.id, p.project</div>
            <div className="text-emerald-500">FROM</div>
            <div className="text-emerald-100 pl-4">users u</div>
            <div className="text-emerald-400 font-bold">{mode} JOIN</div>
            <div className="text-emerald-100 pl-4">projects p</div>
            <div className="text-emerald-500">ON</div>
            <div className="text-emerald-100 pl-4">u.id = p.user_id;</div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Source Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Users Table A */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-3 border-b border-emerald-800/40 flex items-center justify-between bg-emerald-950/50">
                <div className="flex items-center gap-2">
                  <Table2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-100">Table A: Users</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/50">{usersMatched} match</span>
                  <span className="text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded-md border border-rose-900/50">{usersUnmatched} unmatch</span>
                </div>
              </div>
              <div className="p-2 flex-1">
                <table className="w-full text-left text-sm font-mono">
                  <thead>
                    <tr className="text-emerald-600/70 text-xs">
                      <th className="pb-2 font-normal pl-2">id</th>
                      <th className="pb-2 font-normal">name</th>
                      <th className="pb-2 font-normal">role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map(u => {
                      const isHovered = hoveredUserId === u.id;
                      return (
                        <tr 
                          key={u.id} 
                          className={`cursor-pointer transition-all duration-200 rounded-lg group ${
                            isHovered ? 'bg-emerald-800/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'hover:bg-emerald-900/20'
                          }`}
                          onMouseEnter={() => setHoveredUserId(u.id)}
                          onMouseLeave={() => setHoveredUserId(null)}
                        >
                          <td className={`p-1.5 pl-2 rounded-l-lg ${isHovered ? 'text-emerald-200' : 'text-emerald-400'}`}>{u.id}</td>
                          <td className={isHovered ? 'text-emerald-100' : 'text-emerald-300'}>{u.name}</td>
                          <td className={`p-1.5 rounded-r-lg ${isHovered ? 'text-emerald-300' : 'text-emerald-600'}`}>{u.role}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Projects Table B */}
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-3 border-b border-emerald-800/40 flex items-center justify-between bg-emerald-950/50">
                <div className="flex items-center gap-2">
                  <Table2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-100">Table B: Projects</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/50">{projectsMatched} match</span>
                  <span className="text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded-md border border-rose-900/50">{projectsUnmatched} unmatch</span>
                </div>
              </div>
              <div className="p-2 flex-1">
                <table className="w-full text-left text-sm font-mono">
                  <thead>
                    <tr className="text-emerald-600/70 text-xs">
                      <th className="pb-2 font-normal pl-2">id</th>
                      <th className="pb-2 font-normal">user_id</th>
                      <th className="pb-2 font-normal">project</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECTS.map(p => {
                      const isLinked = hoveredUserId === p.userId;
                      return (
                        <tr 
                          key={p.id} 
                          className={`transition-all duration-200 rounded-lg ${
                            isLinked ? 'bg-emerald-800/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : ''
                          }`}
                        >
                          <td className={`p-1.5 pl-2 rounded-l-lg ${isLinked ? 'text-emerald-200' : 'text-emerald-400'}`}>{p.id}</td>
                          <td className={isLinked ? 'text-emerald-100' : 'text-emerald-300'}>{p.userId}</td>
                          <td className={`p-1.5 rounded-r-lg ${isLinked ? 'text-emerald-300' : 'text-emerald-600'}`}>{p.project}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl overflow-hidden mt-2">
            <div className="p-3 border-b border-emerald-800/40 flex items-center justify-between bg-emerald-950/50">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-100">Result Set</span>
                <span className="text-xs text-emerald-500/70 ml-2">({results.length} rows)</span>
              </div>
            </div>
            <div className="p-2 overflow-x-auto">
              <table className="w-full text-left text-sm font-mono">
                <thead>
                  <tr className="text-emerald-600/70 text-xs">
                    <th className="pb-2 font-normal pl-2">u.id</th>
                    <th className="pb-2 font-normal">u.name</th>
                    <th className="pb-2 font-normal">p.id</th>
                    <th className="pb-2 font-normal">p.project</th>
                  </tr>
                </thead>
                <tbody>
                  {results.length > 0 ? results.map((r, i) => {
                    const isHoveredResult = hoveredUserId !== null && r.uId === hoveredUserId;
                    
                    return (
                      <tr 
                        key={i} 
                        className={`transition-all duration-200 rounded-lg ${
                          isHoveredResult ? 'bg-emerald-800/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'hover:bg-emerald-900/10'
                        }`}
                      >
                        <td className={`p-1.5 pl-2 rounded-l-lg ${r.uId === 'NULL' ? 'text-rose-400/80 italic' : (isHoveredResult ? 'text-emerald-200' : 'text-emerald-400')}`}>{r.uId}</td>
                        <td className={`${r.name === 'NULL' ? 'text-rose-400/80 italic' : (isHoveredResult ? 'text-emerald-100' : 'text-emerald-300')}`}>{r.name}</td>
                        <td className={`${r.pId === 'NULL' ? 'text-rose-400/80 italic' : (isHoveredResult ? 'text-emerald-200' : 'text-emerald-400')}`}>{r.pId}</td>
                        <td className={`p-1.5 rounded-r-lg ${r.project === 'NULL' ? 'text-rose-400/80 italic' : (isHoveredResult ? 'text-emerald-100' : 'text-emerald-300')}`}>{r.project}</td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-emerald-600/50 text-xs">No rows matched</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
