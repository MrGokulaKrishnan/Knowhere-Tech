import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, Trophy, Target, Info, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import { calculateJobReadiness, getOverallJobReadiness } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';

export default function JobReadinessPage() {
  const navigate = useNavigate();
  const { progress } = useLearning();

  const moduleTotals: Record<string, number> = {};
  for (const mod of ALL_MODULES_META) {
    moduleTotals[mod.key] = mod.lessons.length;
  }
  moduleTotals['projects'] = 8;
  moduleTotals['interview'] = 20;

  const scores = calculateJobReadiness(progress, moduleTotals);
  const overall = getOverallJobReadiness(scores);

  const getStatusText = (score: number) => {
    if (score >= 80) return { title: 'Staff Full Stack Ready', desc: 'You possess comprehensive skills expected of a Senior Full Stack Engineer.', color: 'text-emerald-400' };
    if (score >= 50) return { title: 'Approaching Full Stack Competence', desc: 'Strong foundation. Focus next on Docker, AWS Cloud, and System Design.', color: 'text-teal-400' };
    if (score >= 20) return { title: 'Intermediate In-Progress', desc: 'Good start. Continue practicing with Spring Boot, SQL, and React modules.', color: 'text-amber-400' };
    return { title: 'Foundational Stage', desc: 'Begin with Java Fundamentals, OOP principles, and DSA core concepts.', color: 'text-zinc-400' };
  };

  const status = getStatusText(overall);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-emerald-400" size={26} />
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white">
            Job Readiness Competency Matrix
          </h1>
        </div>
        <p className="text-zinc-300 max-w-3xl text-base leading-relaxed">
          A real-time evaluation of your technical readiness across core domains required for modern Java Full Stack Engineer positions.
        </p>
      </div>

      {/* Main Metric Hero Card */}
      <div className="panel p-8 lg:p-10 mb-8 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Radial meter */}
          <div className="flex items-center gap-8">
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#142a20" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - overall / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold font-display text-emerald-400">{overall}%</span>
                <span className="text-zinc-400 text-xs uppercase font-mono font-bold">Readiness</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck size={22} className="text-emerald-400" />
                <span className={`text-xl font-bold ${status.color}`}>{status.title}</span>
              </div>
              <p className="text-zinc-300 text-sm max-w-lg leading-relaxed">{status.desc}</p>
              <p className="text-zinc-500 text-xs mt-3 font-mono">
                Completed: {progress?.totalLessonsCompleted || 0} Lessons · {(progress?.xp || 0).toLocaleString()} XP
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/roadmap')}
              className="button-primary text-xs !py-3 !px-5"
            >
              <span>Follow Roadmap</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/interview')}
              className="button-secondary text-xs !py-3 !px-5"
            >
              <Trophy size={16} />
              <span>Interview Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Horizontal Bar Breakdown */}
        <div className="panel p-7 lg:p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white text-base flex items-center gap-2.5">
              <Target size={18} className="text-emerald-400" /> Domain Breakdown
            </h2>
            <span className="text-zinc-400 text-xs font-mono">Core Industry Weights</span>
          </div>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scores} layout="vertical" margin={{ left: 15, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="category" dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 12 }} width={120} />
                <Tooltip
                  contentStyle={{ background: '#050806', borderColor: '#142a20', borderRadius: 16, color: '#f9fafb' }}
                  formatter={(value: any) => [`${value}%`, 'Competency']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {scores.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Map */}
        <div className="panel p-7 lg:p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white text-base flex items-center gap-2.5">
              <Trophy size={18} className="text-emerald-400" /> Full Stack Competency Radar
            </h2>
            <span className="text-zinc-400 text-xs font-mono">Domain Balance</span>
          </div>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={scores}>
                <PolarGrid stroke="#142a20" />
                <PolarAngleAxis dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 11 }} />
                <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Domain Cards List */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
          <Award size={18} className="text-emerald-400" /> Domain Status Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scores.map(item => (
            <div
              key={item.moduleKey}
              onClick={() => navigate(`/${item.moduleKey}`)}
              className="panel p-5 cursor-pointer hover:border-emerald-500/50 transition-all group rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors">{item.label}</span>
                <span className="font-mono text-sm font-bold" style={{ color: item.color }}>
                  {item.score}%
                </span>
              </div>
              <div className="h-2 bg-black border border-[#142a20] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.score}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Note */}
      <div className="panel p-6 flex items-start gap-4 text-xs text-zinc-400 rounded-2xl">
        <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-zinc-300">
          The Job Readiness Score evaluates your interactive code exercises, quiz attempts, and completed roadmap milestones.
        </p>
      </div>
    </div>
  );
}
