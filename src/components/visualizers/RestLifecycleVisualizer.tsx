import React, { useState } from 'react';
import { Server, Play, CheckCircle, Atom, Leaf, Cpu, Database, ArrowRight, ArrowLeft } from 'lucide-react';

const METHODS = {
  GET: {
    method: 'GET',
    url: '/api/v1/users/1',
    reqBody: null,
    resStatus: '200 OK',
    resBody: '{\n  "id": 1,\n  "name": "Alice",\n  "role": "ADMIN"\n}'
  },
  POST: {
    method: 'POST',
    url: '/api/v1/users',
    reqBody: '{\n  "name": "Alice",\n  "role": "ADMIN"\n}',
    resStatus: '201 Created',
    resBody: '{\n  "id": 1,\n  "name": "Alice",\n  "role": "ADMIN"\n}'
  },
  DELETE: {
    method: 'DELETE',
    url: '/api/v1/users/1',
    reqBody: null,
    resStatus: '204 No Content',
    resBody: null
  }
};

const NODES = [
  { id: 0, title: 'Client (React 19)', icon: Atom },
  { id: 1, title: 'Spring @RestController', icon: Leaf },
  { id: 2, title: 'Business @Service', icon: Cpu },
  { id: 3, title: 'Spring Data @Repository', icon: Database },
  { id: 4, title: 'Relational Database', icon: Server }
];

const getStages = (methodDef: any) => [
  { step: 0, nodeIndex: 0, phase: 'REQUEST PHASE', title: 'Client (React 19)', desc: `Browser issues asynchronous HTTP request: ${methodDef.method} ${methodDef.url}${methodDef.reqBody ? ' with JSON payload.' : '.'}` },
  { step: 1, nodeIndex: 1, phase: 'REQUEST PHASE', title: 'Spring @RestController', desc: `Receives HTTP request, ${methodDef.reqBody ? 'validates DTO, deserializes JSON, and ' : ''}delegates to Service layer.` },
  { step: 2, nodeIndex: 2, phase: 'REQUEST PHASE', title: 'Business @Service', desc: `Executes core domain logic, security checks, and wraps in transactional boundary.` },
  { step: 3, nodeIndex: 3, phase: 'REQUEST PHASE', title: 'Spring Data @Repository', desc: `Hibernate ORM translates entity operations to SQL and dispatches through connection pool.` },
  { step: 4, nodeIndex: 4, phase: 'DATABASE PROCESSING', title: 'Relational Database', desc: `Executes ${methodDef.method === 'POST' ? 'INSERT' : methodDef.method === 'GET' ? 'SELECT' : 'DELETE'} SQL, enforces table constraints, commits transaction, and returns result.` },
  { step: 5, nodeIndex: 3, phase: 'RESPONSE PHASE', title: 'Spring Data @Repository', desc: `Hibernate maps database result set back to Java Entity objects.` },
  { step: 6, nodeIndex: 2, phase: 'RESPONSE PHASE', title: 'Business @Service', desc: `Transforms Entity objects into DTOs to prevent exposing internal database model.` },
  { step: 7, nodeIndex: 1, phase: 'RESPONSE PHASE', title: 'Spring @RestController', desc: `Serializes DTOs to JSON and builds HTTP response with status ${methodDef.resStatus}.` },
  { step: 8, nodeIndex: 0, phase: 'RESPONSE PHASE', title: 'Client (React 19)', desc: `Receives ${methodDef.resStatus} response, updates state, and React renders updated UI.` }
];

export default function RestLifecycleVisualizer() {
  const [selectedMethod, setSelectedMethod] = useState<keyof typeof METHODS>('POST');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const methodDef = METHODS[selectedMethod];
  const stages = getStages(methodDef);
  const currentStage = stages[currentStep];

  const simulateRequest = () => {
    setIsSimulating(true);
    let step = 0;
    setCurrentStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < stages.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8 rounded-3xl">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              Spring Boot & React Integration
            </span>
          </div>
          <h3 className="font-bold text-white text-lg lg:text-xl flex items-center gap-2.5 mb-2">
            <Server size={22} className="text-emerald-400" />
            Full Stack REST API Request Lifecycle Tracer
          </h3>
          <p className="text-sm text-zinc-400">
            Trace an HTTP Request from React UI → Controller → Service → Repository → Relational Database and back.
          </p>
        </div>

        <button
          onClick={simulateRequest}
          disabled={isSimulating}
          className="button-primary text-xs !py-2.5 !px-5 shrink-0 whitespace-nowrap self-start"
        >
          <Play size={14} />
          <span>{isSimulating ? 'Tracing Request...' : 'Send Test Request'}</span>
        </button>
      </div>

      {/* Method Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(Object.keys(METHODS) as Array<keyof typeof METHODS>).map(method => (
          <button
            key={method}
            onClick={() => {
              if (!isSimulating) {
                setSelectedMethod(method);
                setCurrentStep(0);
              }
            }}
            disabled={isSimulating}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
              selectedMethod === method
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-emerald-950/30 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/40 opacity-70 hover:opacity-100'
            }`}
          >
            {METHODS[method].method} {METHODS[method].url}
          </button>
        ))}
      </div>

      {/* Architecture Node Flow */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-800/60 flex items-center gap-2">
            {currentStage.phase === 'REQUEST PHASE' ? <ArrowRight size={14} /> : currentStage.phase === 'RESPONSE PHASE' ? <ArrowLeft size={14} /> : <Database size={14} />}
            {currentStage.phase}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {NODES.map((node, i) => {
            const isActive = currentStage.nodeIndex === i;
            let isDone = false;
            if (currentStep < 4) {
              isDone = i < currentStage.nodeIndex;
            } else if (currentStep > 4) {
              isDone = i > currentStage.nodeIndex;
            }

            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => {
                  if (!isSimulating) {
                    const stepForNode = currentStep >= 4 ? 8 - i : i;
                    setCurrentStep(stepForNode);
                  }
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]'
                    : isDone
                    ? 'border-emerald-800/60 bg-emerald-950/20'
                    : 'border-[#142a20] bg-black opacity-40 hover:opacity-70'
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
      </div>

      {/* Detail Showcase */}
      <div className="p-6 rounded-2xl bg-black border border-[#142a20] mb-6 min-h-[120px] flex flex-col justify-center">
        <div>
          <span
            className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-xl border border-emerald-800/60 bg-emerald-950/50 text-emerald-300"
          >
            Step {currentStage.step + 1}/9: {currentStage.title}
          </span>
          <p className="text-zinc-200 text-sm leading-relaxed mt-4">
            {currentStage.desc}
          </p>
        </div>
      </div>

      {/* HTTP Inspector Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Request Details */}
        <div className="p-5 rounded-2xl bg-[#050505] border border-[#142a20]">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">HTTP Request</h4>
          <div className="font-mono text-xs space-y-2">
            <div className="flex gap-3">
              <span className="text-emerald-400 font-bold">{methodDef.method}</span>
              <span className="text-zinc-300">{methodDef.url}</span>
              <span className="text-zinc-600 ml-auto">HTTP/1.1</span>
            </div>
            <div className="text-zinc-400">Host: <span className="text-zinc-500">api.knowhere.com</span></div>
            <div className="text-zinc-400">Accept: <span className="text-zinc-500">application/json</span></div>
            {methodDef.reqBody && <div className="text-zinc-400">Content-Type: <span className="text-zinc-500">application/json</span></div>}
            
            {methodDef.reqBody && (
              <div className="mt-4 pt-4 border-t border-[#142a20] text-emerald-100/70 whitespace-pre overflow-x-auto">
                {methodDef.reqBody}
              </div>
            )}
          </div>
        </div>

        {/* Response Details */}
        <div className="p-5 rounded-2xl bg-[#050505] border border-[#142a20] relative overflow-hidden">
          {currentStep < 7 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all duration-500">
              <span className="text-xs font-mono text-emerald-500/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                Awaiting Response...
              </span>
            </div>
          )}
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">HTTP Response</h4>
          <div className="font-mono text-xs space-y-2">
            <div className="flex gap-3">
              <span className="text-zinc-600">HTTP/1.1</span>
              <span className={currentStep >= 7 ? "text-emerald-400 font-bold transition-colors duration-500" : "text-zinc-700"}>
                {currentStep >= 7 ? methodDef.resStatus : '000 Pending'}
              </span>
            </div>
            <div className={currentStep >= 7 ? "text-zinc-400" : "text-zinc-700"}>Content-Type: <span className="text-zinc-500">application/json</span></div>
            <div className={currentStep >= 7 ? "text-zinc-400" : "text-zinc-700"}>X-Trace-Id: <span className="text-zinc-500">req-1a2b3c4d</span></div>
            
            {methodDef.resBody && (
              <div className={`mt-4 pt-4 border-t border-[#142a20] whitespace-pre overflow-x-auto transition-all duration-500 ${currentStep >= 7 ? 'text-emerald-100/70 opacity-100' : 'text-zinc-700 opacity-30'}`}>
                {methodDef.resBody}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
