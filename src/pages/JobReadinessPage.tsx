import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, Trophy, Target, Info, ArrowRight, ShieldCheck, Award, Zap, BookOpen, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLearning } from '@/context/LearningContext';
import { calculateJobReadiness, getOverallJobReadiness } from '@/services/progressEngine';
import { ALL_MODULES_META } from '@/data/modules/meta';

const DOMAIN_TIPS: Record<string, string> = {
  'Java Core':        'Complete remaining Java 25 LTS lessons focusing on pattern matching, records, and sealed classes.',
  'OOP & Design':     'Practice SOLID principles and design patterns in the OOP module to strengthen architecture skills.',
  'DSA & Algorithms': 'Focus on tree traversal, dynamic programming, and graph algorithms for technical interview success.',
  'SQL & Database':   'Practice complex JOIN queries, window functions, and indexing strategies in the SQL module.',
  'Frontend':         'Build hands-on React 19 components using custom hooks, context API, and the new concurrent features.',
  'Spring Boot':      'Complete Spring Boot 3 microservices with Spring Security, JPA repositories, and REST controllers.',
  'DevOps & Cloud':   'Get hands-on with Docker multi-stage builds, CI/CD pipelines, and AWS ECS deployment patterns.',
  'System Design':    'Study distributed systems, CAP theorem, and design patterns used in production microservices.',
};

function CircleGauge({ value }: { value: number }) {
  const r = 52, cx = 64, cy = 64;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? '#10b981' : value >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative">
      <svg width="128" height="128" viewBox="0 0 128 128">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f2018" strokeWidth="10" />
        {/* Glow ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="2" opacity="0.1" />
        {/* Progress */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring-circle"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold font-mono" style={{ color }}>{value}%</span>
        <span className="text-zinc-500 text-[10px] uppercase font-mono font-bold">Readiness</span>
      </div>
    </div>
  );
}

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

  const getStatus = (score: number) => {
    if (score >= 80) return {
      title: 'Staff Full Stack Engineer Ready',
      desc: 'You possess the comprehensive technical skills expected of a Senior Full Stack Engineer. Focus on system design depth to reach Principal level.',
      color: 'text-emerald-400',
      pill: 'pill-emerald',
    };
    if (score >= 50) return {
      title: 'Approaching Full Stack Competence',
      desc: 'Strong foundation established. Focus next on Docker containerization, AWS Cloud architecture, and distributed System Design.',
      color: 'text-teal-400',
      pill: 'pill-emerald',
    };
    if (score >= 20) return {
      title: 'Intermediate — In Progress',
      desc: 'Good start! Continue building with Spring Boot, SQL query optimization, and React component architecture.',
      color: 'text-amber-400',
      pill: 'pill-amber',
    };
    return {
      title: 'Foundational Stage',
      desc: 'Begin your journey with Java Fundamentals, OOP principles, and DSA core concepts.',
      color: 'text-zinc-300',
      pill: 'pill-zinc',
    };
  };

  const status = getStatus(overall);

  // Find weakest domains for tips
  const weakestDomains = [...scores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center">
            <TrendingUp className="text-emerald-400" size={21} />
          </div>
          <div>
            <span className="eyebrow">Career Analytics</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Job Readiness Matrix
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 max-w-3xl text-base leading-relaxed ml-14">
          Real-time evaluation of your technical competency across all domains required for modern Java Full Stack Engineer positions.
        </p>
      </div>

      {/* Hero Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel p-8 lg:p-10 mb-8 rounded-3xl bg-hero-mesh relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Gauge + Status */}
          <div className="flex flex-col sm:flex-row items-center gap-7">
            <CircleGauge value={overall} />
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck size={20} className={status.color} />
                <span className={`text-xl font-bold ${status.color}`}>{status.title}</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-lg mb-3">{status.desc}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`pill ${status.pill}`}>
                  <BookOpen size={10} /> {progress?.totalLessonsCompleted || 0} Lessons Completed
                </span>
                <span className="pill pill-emerald">
                  <Zap size={10} /> {(progress?.xp || 0).toLocaleString()} XP Total
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
            <button onClick={() => navigate('/roadmap')} className="button-primary">
              <span>Follow Roadmap</span>
              <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('/interview')} className="button-secondary">
              <Trophy size={15} />
              <span>Interview Questions</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="panel p-7 lg:p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white text-base flex items-center gap-2.5">
              <Target size={18} className="text-emerald-400" /> Domain Breakdown
            </h2>
            <span className="pill pill-zinc">Industry Weighted</span>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scores} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis type="category" dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 11, fontFamily: 'JetBrains Mono' }} width={125} />
                <Tooltip
                  contentStyle={{ background: '#050806', borderColor: '#142a20', borderRadius: 14, color: '#f9fafb', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  formatter={(value: any) => [`${value}%`, 'Competency']}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} maxBarSize={22}>
                  {scores.map((entry, idx) => (
                    <Cell key={`bar-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="panel p-7 lg:p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-white text-base flex items-center gap-2.5">
              <Trophy size={18} className="text-emerald-400" /> Competency Radar
            </h2>
            <span className="pill pill-zinc">Domain Balance</span>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={scores}>
                <PolarGrid stroke="#142a20" />
                <PolarAngleAxis dataKey="label" tick={{ fill: '#a7f3d0', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Domain Status Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2.5">
          <Award size={19} className="text-emerald-400" /> Domain Status Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {scores.map((item, i) => (
            <motion.div
              key={item.moduleKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/${item.moduleKey}`)}
              className="panel p-5 cursor-pointer hover:border-emerald-500/40 transition-all group rounded-2xl hover-lift"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors truncate">
                  {item.label}
                </span>
                <span className="font-mono text-sm font-extrabold ml-2 shrink-0" style={{ color: item.color }}>
                  {item.score}%
                </span>
              </div>
              <div className="h-2 bg-black border border-[#142a20] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${item.score}%`, background: item.color }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {item.score >= 70 ? 'Proficient' : item.score >= 40 ? 'Developing' : 'Needs Focus'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personalized Tips */}
      {weakestDomains.some(d => d.score < 60) && (
        <div className="panel p-7 rounded-3xl mb-6 border-amber-500/20">
          <h2 className="font-bold text-white text-base flex items-center gap-2.5 mb-5">
            <Target size={18} className="text-amber-400" /> Personalized Next Steps
          </h2>
          <div className="space-y-4">
            {weakestDomains.filter(d => d.score < 60).map((domain, i) => (
              <div key={domain.moduleKey} className="glass-card p-5 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 font-bold font-mono text-xs">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{domain.label}</span>
                    <span className="pill pill-amber text-[10px]">{domain.score}% current</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {DOMAIN_TIPS[domain.label] || `Focus on completing more lessons in ${domain.label} to improve your competency score.`}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/${domain.moduleKey}`)}
                  className="button-ghost text-xs shrink-0"
                >
                  Start <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transparency Note */}
      <div className="panel p-6 flex items-start gap-4 text-xs text-zinc-400 rounded-2xl">
        <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-zinc-300">
          The Job Readiness Score is calculated from your completed interactive exercises, quiz scores, roadmap milestones, and module completion percentages. Scores update in real-time as you learn.
        </p>
      </div>
    </div>
  );
}

