import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Cpu, CheckCircle, FileCode, Binary, Terminal, Zap } from 'lucide-react';

const STEPS = [
  {
    id: 'source',
    title: '1. Source Code',
    file: 'Main.java',
    desc: 'Human-readable Java 25 source code authored by developer.',
    icon: FileCode,
    codeSnippet: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello Knowhere Tech!");\n  }\n}',
    color: '#10b981'
  },
  {
    id: 'javac',
    title: '2. javac Compiler',
    file: 'javac Main.java',
    desc: 'Compiles AST trees and syntax rules to platform-independent bytecode.',
    icon: Cpu,
    codeSnippet: 'Parsing AST → Type Validation → Bytecode Generation → Main.class',
    color: '#34d399'
  },
  {
    id: 'bytecode',
    title: '3. Bytecode Binary',
    file: 'Main.class',
    desc: 'Universal JVM opcodes (CA FE BA BE 00 00 00 41) runnable on any OS.',
    icon: Binary,
    codeSnippet: '0: getstatic #7 // java/lang/System.out\n3: ldc #13      // Hello Knowhere Tech\n5: invokevirtual #15 // println',
    color: '#14b8a6'
  },
  {
    id: 'jvm',
    title: '4. JVM Execution Engine',
    file: 'ClassLoader + JIT',
    desc: 'Tiered C1/C2 JIT compiles hot methods into raw native instructions.',
    icon: Terminal,
    codeSnippet: 'Tier 1: Bytecode Interpreter\nTier 2: C1 Client JIT Compiler\nTier 3: C2 Server JIT Optimizer',
    color: '#2dd4bf'
  },
  {
    id: 'machine',
    title: '5. Silicon Machine Code',
    file: 'x86_64 / ARM64 Direct',
    desc: 'Hardware CPU executes native machine binary instructions directly.',
    icon: Zap,
    codeSnippet: 'mov eax, 0x1\ncall 0x7fff5fbff820\nret (Direct Silicon)',
    color: '#f59e0b'
  }
];

export default function JvmCompilationVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startPipeline = () => {
    setActiveStep(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (activeStep >= STEPS.length - 1) {
      setIsRunning(false);
      return;
    }
    const timer = setTimeout(() => {
      setActiveStep(prev => prev + 1);
    }, 1400);
    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  return (
    <div className="panel p-6 lg:p-8 mb-8 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              JVM Core Internals
            </span>
          </div>
          <h3 className="font-bold text-white text-lg lg:text-xl flex items-center gap-2.5">
            <Cpu size={22} className="text-emerald-400" />
            JVM Compilation & Tiered JIT Execution Pipeline
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Trace Java 25 source code through javac bytecode compilation and native CPU execution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { setActiveStep(0); setIsRunning(false); }}
            className="button-secondary text-xs !py-2.5 !px-4"
            title="Reset Pipeline"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            onClick={startPipeline}
            disabled={isRunning}
            className="button-primary text-xs !py-2.5 !px-5"
          >
            <Play size={14} />
            <span>{isRunning ? 'Compiling...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => { setActiveStep(idx); setIsRunning(false); }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                activeStep === idx
                  ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]'
                  : activeStep > idx
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-[#142a20] bg-black opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={18} className={activeStep === idx ? 'text-emerald-300' : 'text-zinc-500'} />
                {activeStep > idx && <CheckCircle size={14} className="text-emerald-400" />}
              </div>
              <p className="text-xs font-bold text-white truncate">{step.title}</p>
              <p className="text-[10px] text-zinc-400 truncate font-mono mt-0.5">{step.file}</p>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-[#142a20] bg-black p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-xl border border-emerald-800/60 bg-emerald-950/50 text-emerald-300"
            >
              Stage {activeStep + 1}: {STEPS[activeStep].file}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Step {activeStep + 1} of {STEPS.length}
            </span>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            {STEPS[activeStep].desc}
          </p>

          <div className="rounded-2xl bg-[#050806] border border-[#142a20] p-4">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mb-2 border-b border-[#142a20] pb-1.5">
              <span>REPRESENTATION ARTIFACT</span>
              <span className="text-emerald-400 font-bold">{STEPS[activeStep].file}</span>
            </div>
            <pre className="text-xs font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed">
              {STEPS[activeStep].codeSnippet}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
