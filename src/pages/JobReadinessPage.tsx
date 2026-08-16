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
    if (score >= 80) return { title: 'Staff Full Stack Ready', desc: 'You possess comprehensive skills expected of a 2027 Java Full Stack Developer.', color: 'text-emerald-400' };
    if (score >= 50) return { title: 'Approaching Full Stack Competence', desc: 'Strong foundation. Focus next on Docker, AWS Cloud, and System Design.', color: 'text-teal-400' };
    if (score >= 20) return { title: 'Intermediate In-Progress', desc: 'Good start. Continue practicing with Spring Boot, SQL, and React modules.', color: 'text-amber-400' };
    return { title: 'Foundational Stage', desc: 'Begin with Java Fundamentals, OOP principles, and DSA core concepts.', color: 'text-zinc-400' };
  };

  const status = getStatusText(overall);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="text-emerald-400" size={22} />
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
            2027 Job Readiness Competency Matrix
          </h1>
        </div>
        <p className="text-zinc-400 max-w-2xl text-sm">
          A real-time evaluation of your technical readiness across core domains required for modern Java Full Stack Engineer positions.
        </p>
      </div>

      {/* Main Metric Hero Card */}
      <div className="panel p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Radial meter */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 shrink-0">
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
                  className="transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-display text-emerald-400">{overall}%</span>
                <span className="text-zinc-500 text-[10px] uppercase font-mono">Score</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span className={`text-lg font-bold ${status.color}`}>{status.title}</span>
              </div>
              <p className="text-zinc-400 text-xs max-w-md">{status.desc}</p>
              <p className="text-zinc-500 text-xs mt-2 font-mono">
                Completed: {progress?.totalLessonsCompleted || 0} Lessons · {progress?.xp || 0} XP
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/roadmap')}
              className="button-primary text-xs !py-2 !px-4"
            >
              <span>Follow Roadmap</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate('/interview')}
              className="button-secondary text-xs !py-2 !px-4"
            >
              <Trophy size={14} />
              <span>Interview Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Horizontal Bar Breakdown */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <Target size={16} className="text-emerald-400" /> Domain Breakdown
            </h2>
            <span className="text-zinc-500 text-xs font-mono">2027 Weights</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scores} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#4b6352', fontSize: 11 }} />
                <YAxis type="category" dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 11 }} width={110} />
                <Tooltip
                  contentStyle={{ background: '#050806', borderColor: '#142a20', borderRadius: 12, color: '#f9fafb' }}
                  formatter={(value: any) => [`${value}%`, 'Competency']}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {scores.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Map */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <Trophy size={16} className="text-emerald-400" /> Full Stack Competency Radar
            </h2>
            <span className="text-zinc-500 text-xs font-mono">Domain Balance</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={scores}>
                <PolarGrid stroke="#142a20" />
                <PolarAngleAxis dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Domain Cards List */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Award size={16} className="text-emerald-400" /> Domain Status Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scores.map(item => (
            <div
              key={item.moduleKey}
              onClick={() => navigate(`/${item.moduleKey}`)}
              className="panel p-4 cursor-pointer hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white text-xs group-hover:text-emerald-400 transition-colors">{item.label}</span>
                <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                  {item.score}%
                </span>
              </div>
              <div className="h-1.5 bg-black border border-[#142a20] rounded-full overflow-hidden">
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
      <div className="panel p-4 flex items-start gap-3 text-xs text-zinc-400">
        <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
        <p>
          The Job Readiness Score evaluates your interactive code exercises, quiz attempts, and completed roadmap milestones.
        </p>
      </div>
    </div>
  );
}
