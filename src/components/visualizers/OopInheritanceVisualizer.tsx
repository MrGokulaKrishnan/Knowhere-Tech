import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Play, ArrowDown, Layers } from 'lucide-react';

interface ClassNode {
  name: string;
  type: 'abstract' | 'concrete' | 'interface';
  fields: string[];
  methods: string[];
  soundOutput: string;
}

const CLASS_TREE: Record<string, ClassNode> = {
  Vehicle: {
    name: 'Vehicle',
    type: 'abstract',
    fields: ['protected String vin', 'protected int maxSpeed'],
    methods: ['abstract void accelerate()', 'void stop() { status = IDLE; }'],
    soundOutput: 'Generic Vehicle motion initiated.'
  },
  ElectricCar: {
    name: 'ElectricCar',
    type: 'concrete',
    fields: ['private int batteryPercentage'],
    methods: ['@Override void accelerate() { Motor.engageSilent(); }', 'void recharge()'],
    soundOutput: 'ElectricCar: Silent EV powertrain engaged. 0-100 km/h in 3.1s (Resolved via runtime vtable).'
  },
  CombustionCar: {
    name: 'CombustionCar',
    type: 'concrete',
    fields: ['private int cylinderCount'],
    methods: ['@Override void accelerate() { Turbo.spool(); }', 'void refuel()'],
    soundOutput: 'CombustionCar: Twin-turbo V8 ignition engaged (Resolved via runtime vtable).'
  }
};

export default function OopInheritanceVisualizer() {
  const [selectedChild, setSelectedChild] = useState<'ElectricCar' | 'CombustionCar'>('ElectricCar');
  const [dispatchResult, setDispatchResult] = useState<string | null>(null);

  const triggerDispatch = () => {
    setDispatchResult(`Vehicle ref = new ${selectedChild}();\nref.accelerate();\n--> Output: ${CLASS_TREE[selectedChild].soundOutput}`);
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              OOP Polymorphic Engine
            </span>
          </div>
          <h3 className="font-bold text-white text-lg lg:text-xl flex items-center gap-2.5">
            <Boxes size={22} className="text-emerald-400" />
            Class Hierarchy & Dynamic Method Dispatch
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Select subclass implementations to visualize polymorphic method overriding and runtime vtable resolution.
          </p>
        </div>

        <button
          onClick={triggerDispatch}
          className="button-primary text-xs !py-2.5 !px-5 shrink-0"
        >
          <Play size={14} />
          <span>Invoke Dynamic Dispatch</span>
        </button>
      </div>

      {/* Class Hierarchy Tree */}
      <div className="flex flex-col items-center">
        {/* Parent Class */}
        <div className="w-full max-w-md rounded-2xl border border-[#142a20] bg-black p-5 text-center mb-3 shadow-md">
          <span className="text-xs uppercase font-mono px-3 py-1 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-800/50 font-bold">
            abstract class
          </span>
          <h4 className="font-bold text-white text-base mt-2">{CLASS_TREE.Vehicle.name}</h4>
          <div className="mt-3 text-left font-mono text-xs text-zinc-400 bg-[#050806] p-3.5 rounded-xl border border-[#142a20] space-y-1">
            <p className="text-zinc-500">// Inherited Fields & Methods</p>
            {CLASS_TREE.Vehicle.fields.map(f => <p key={f}>{f}</p>)}
            {CLASS_TREE.Vehicle.methods.map(m => <p key={m} className="text-emerald-400">{m}</p>)}
          </div>
        </div>

        <ArrowDown size={22} className="text-zinc-500 my-2" />

        {/* Subclasses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
          {(['ElectricCar', 'CombustionCar'] as const).map(type => {
            const isSelected = selectedChild === type;
            const cls = CLASS_TREE[type];
            return (
              <div
                key={type}
                onClick={() => { setSelectedChild(type); setDispatchResult(null); }}
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]'
                    : 'border-[#142a20] bg-black hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-bold">
                    extends Vehicle
                  </span>
                  <Layers size={16} className={isSelected ? 'text-emerald-400' : 'text-zinc-600'} />
                </div>
                <h5 className="font-bold text-white text-base">{cls.name}</h5>
                <div className="mt-3 text-left font-mono text-xs text-zinc-400 bg-[#050806] p-3 rounded-xl border border-[#142a20] space-y-1">
                  {cls.methods.map(m => (
                    <p key={m} className={m.includes('@Override') ? 'text-emerald-400 font-bold' : ''}>
                      {m}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dispatch Output */}
      {dispatchResult && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 rounded-2xl bg-black border border-emerald-500/50 font-mono text-sm text-emerald-300 whitespace-pre-wrap shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          {dispatchResult}
        </motion.div>
      )}
    </div>
  );
}
