import React, { useState } from 'react';
import { Server, Play, CheckCircle, Atom, Leaf, Cpu, Database } from 'lucide-react';

const ARCH_STAGES = [
  {
    step: 1,
    title: 'Client (React 19)',
    desc: 'Browser issues asynchronous HTTP request: POST /api/v1/users with JSON payload.',
    icon: Atom,
    color: '#10b981'
  },
  {
    step: 2,
    title: 'Spring @RestController',
    desc: 'Receives HTTP request, validates DTO with @Valid, deserializes JSON, and delegates to Service layer.',
    icon: Leaf,
    color: '#34d399'
  },
  {
    step: 3,
    title: 'Business @Service',
    desc: 'Executes core domain logic, security checks, password hashing, and wraps in transactional boundary.',
    icon: Cpu,
    color: '#14b8a6'
  },
  {
    step: 4,
    title: 'Spring Data @Repository',
    desc: 'Hibernate ORM translates entity operations to SQL and dispatches through connection pool.',
    icon: Database,
    color: '#2dd4bf'
  },
  {
    step: 5,
    title: 'Relational Database',
    desc: 'Executes INSERT SQL, enforces table constraints, commits transaction, and returns generated entity.',
    icon: Server,
    color: '#f59e0b'
  }
];

export default function RestLifecycleVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateRequest = () => {
    setIsSimulating(true);
    let step = 0;
    setCurrentStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < ARCH_STAGES.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              Spring Boot & React Integration
            </span>
          </div>
          <h3 className="font-bold text-white text-lg lg:text-xl flex items-center gap-2.5">
            <Server size={22} className="text-emerald-400" />
            Full Stack REST API Request Lifecycle Tracer
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Trace an HTTP Request from React UI → Controller → Service → Repository → Relational Database.
          </p>
        </div>

        <button
          onClick={simulateRequest}
          disabled={isSimulating}
          className="button-primary text-xs !py-2.5 !px-5 shrink-0"
        >
          <Play size={14} />
          <span>{isSimulating ? 'Tracing Request...' : 'Send Test Request'}</span>
        </button>
      </div>

      {/* Architecture Node Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
        {ARCH_STAGES.map((node, i) => {
          const isActive = currentStep === i;
          const isDone = currentStep > i;
          const Icon = node.icon;

          return (
            <div
              key={node.step}
              onClick={() => setCurrentStep(i)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]'
                  : isDone
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-[#142a20] bg-black opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={18} className={isActive ? 'text-emerald-300' : 'text-zinc-500'} />
                {isDone && <CheckCircle size={14} className="text-emerald-400" />}
              </div>
              <h4 className="font-bold text-white text-xs leading-snug">{node.title}</h4>
            </div>
          );
        })}
      </div>

      {/* Detail Showcase */}
      <div className="p-6 rounded-2xl bg-black border border-[#142a20]">
        <span
          className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-xl border border-emerald-800/60 bg-emerald-950/50 text-emerald-300"
        >
          Stage {ARCH_STAGES[currentStep].step}: {ARCH_STAGES[currentStep].title}
        </span>
        <p className="text-zinc-200 text-sm leading-relaxed mt-3">
          {ARCH_STAGES[currentStep].desc}
        </p>
      </div>
    </div>
  );
}
