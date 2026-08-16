import React, { useState } from 'react';

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

  return (
    <div className="rounded-2xl border border-[#142318] bg-[#090E0A] p-5 mb-6 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm">
            Interactive SQL Relational JOIN Visualizer
          </h3>
          <p className="text-xs text-[#4A6B53]">
            Select a JOIN strategy to see matching record sets and NULL projections.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as JoinMode[]).map(j => (
            <button
              key={j}
              onClick={() => setMode(j)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
                mode === j
                  ? 'bg-[#10B981]/25 text-[#00FF88] border border-[#10B981]/40 shadow-glow-green'
                  : 'bg-[#000000] text-[#94A3B8] hover:text-white border border-[#142318]'
              }`}
            >
              {j} JOIN
            </button>
          ))}
        </div>
      </div>

      {/* SQL Query Preview */}
      <div className="p-2.5 rounded-xl bg-[#000000] border border-[#142318] font-mono text-xs text-[#00FF88] mb-4">
        SELECT u.id, u.name, p.id AS project_id, p.project<br />
        FROM users u {mode} JOIN projects p ON u.id = p.user_id;
      </div>

      {/* Source Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Users Table */}
        <div className="border border-[#142318] rounded-xl bg-[#000000] overflow-hidden">
          <div className="px-3 py-1.5 bg-[#050806] border-b border-[#142318] text-[11px] font-mono font-semibold text-white">
            Table A: users (Left)
          </div>
          <div className="p-2.5 text-xs font-mono">
            {USERS.map(u => (
              <div key={u.id} className="flex justify-between py-0.5 text-[#A7F3D0]">
                <span>id: {u.id}</span>
                <span>name: {u.name}</span>
                <span className="text-[#4A6B53]">({u.role})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <div className="border border-[#142318] rounded-xl bg-[#000000] overflow-hidden">
          <div className="px-3 py-1.5 bg-[#050806] border-b border-[#142318] text-[11px] font-mono font-semibold text-white">
            Table B: projects (Right)
          </div>
          <div className="p-2.5 text-xs font-mono">
            {PROJECTS.map(p => (
              <div key={p.id} className="flex justify-between py-0.5 text-[#A7F3D0]">
                <span>id: {p.id}</span>
                <span>user_id: {p.userId}</span>
                <span className="text-[#4A6B53]">{p.project}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Projection */}
      <div className="border border-[#142318] rounded-xl bg-[#000000] overflow-hidden">
        <div className="px-3 py-2 bg-[#050806] border-b border-[#142318] text-xs font-semibold text-white flex justify-between">
          <span>Query Result Set ({results.length} rows returned)</span>
          <span className="font-mono text-[#00FF88] text-[11px] font-bold">{mode} JOIN</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#142318] text-[#4A6B53] text-[10px]">
                <th className="p-2.5">u.id</th>
                <th className="p-2.5">u.name</th>
                <th className="p-2.5">u.role</th>
                <th className="p-2.5">p.id</th>
                <th className="p-2.5">p.project</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-[#142318]/50 hover:bg-[#101812]/50">
                  <td className={`p-2.5 ${r.uId === 'NULL' ? 'text-[#F43F5E]' : 'text-white'}`}>{String(r.uId)}</td>
                  <td className={`p-2.5 ${r.name === 'NULL' ? 'text-[#F43F5E]' : 'text-[#A7F3D0]'}`}>{r.name}</td>
                  <td className={`p-2.5 ${r.role === 'NULL' ? 'text-[#F43F5E]' : 'text-[#94A3B8]'}`}>{r.role}</td>
                  <td className={`p-2.5 ${r.pId === 'NULL' ? 'text-[#F43F5E]' : 'text-white'}`}>{String(r.pId)}</td>
                  <td className={`p-2.5 ${r.project === 'NULL' ? 'text-[#F43F5E]' : 'text-[#00FF88]'}`}>{r.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
