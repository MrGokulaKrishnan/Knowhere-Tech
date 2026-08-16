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
    }, 1200);
    return () => clearTimeout(timer);
  }, [isRunning, activeStep]);

  return (
    <div className="panel p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <Cpu size={16} className="text-emerald-400" />
            JVM Compilation & Execution Pipeline
          </h3>
          <p className="text-xs text-zinc-500">
            Source code compilation to platform bytecode and native CPU instructions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveStep(0); setIsRunning(false); }}
            className="p-1.5 rounded-lg border border-[#142a20] text-zinc-400 hover:text-white bg-black transition-colors"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={startPipeline}
            disabled={isRunning}
            className="button-primary text-xs !py-1.5 !px-3"
          >
            <Play size={12} />
            <span>{isRunning ? 'Compiling...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Navigation Bar */}
      <div className="grid grid-cols-5 gap-1.5 mb-6">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => { setActiveStep(idx); setIsRunning(false); }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeStep === idx
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : activeStep > idx
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-[#142a20] bg-black opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon size={16} className={activeStep === idx ? 'text-emerald-300' : 'text-zinc-400'} />
                {activeStep > idx && <CheckCircle size={12} className="text-emerald-400" />}
              </div>
              <p className="text-[11px] font-semibold text-white truncate">{step.title}</p>
              <p className="text-[9px] text-zinc-500 truncate font-mono">{step.file}</p>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-[#142a20] bg-black p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-lg border border-emerald-800/60 bg-emerald-950/40 text-emerald-300"
            >
              Stage {activeStep + 1}: {STEPS[activeStep].file}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Step {activeStep + 1} of {STEPS.length}
            </span>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed mb-3">
            {STEPS[activeStep].desc}
          </p>

          <div className="rounded-xl bg-[#050806] border border-[#142a20] p-3">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-1.5 border-b border-[#142a20] pb-1">
              <span>REPRESENTATION ARTIFACT</span>
              <span className="text-emerald-400">{STEPS[activeStep].file}</span>
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
