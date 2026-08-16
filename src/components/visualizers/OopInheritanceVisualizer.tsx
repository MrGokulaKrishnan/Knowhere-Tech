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
    soundOutput: 'ElectricCar: Silent EV powertrain engaged. 0-100 km/h in 3.1s (Resolved via dynamic vtable).'
  },
  CombustionCar: {
    name: 'CombustionCar',
    type: 'concrete',
    fields: ['private int cylinderCount'],
    methods: ['@Override void accelerate() { Turbo.spool(); }', 'void refuel()'],
    soundOutput: 'CombustionCar: Twin-turbo V8 ignition engaged (Resolved via dynamic vtable).'
  }
};

export default function OopInheritanceVisualizer() {
  const [selectedChild, setSelectedChild] = useState<'ElectricCar' | 'CombustionCar'>('ElectricCar');
  const [dispatchResult, setDispatchResult] = useState<string | null>(null);

  const triggerDispatch = () => {
    setDispatchResult(`Vehicle ref = new ${selectedChild}();\nref.accelerate();\n--> Output: ${CLASS_TREE[selectedChild].soundOutput}`);
  };

  return (
    <div className="panel p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <Boxes size={16} className="text-emerald-400" />
            OOP Class Hierarchy & Dynamic Method Dispatch
          </h3>
          <p className="text-xs text-zinc-500">
            Select subclass implementations to visualize polymorphic method overriding and runtime vtable resolution.
          </p>
        </div>

        <button
          onClick={triggerDispatch}
          className="button-primary text-xs !py-1.5 !px-3"
        >
          <Play size={12} />
          <span>Invoke Call</span>
        </button>
      </div>

      {/* Class Hierarchy Tree */}
      <div className="flex flex-col items-center">
        {/* Parent Class */}
        <div className="w-full max-w-sm rounded-2xl border border-[#142a20] bg-black p-3.5 text-center mb-2 shadow-sm">
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/50">
            abstract class
          </span>
          <h4 className="font-bold text-white text-sm mt-1">{CLASS_TREE.Vehicle.name}</h4>
          <div className="mt-2 text-left font-mono text-[11px] text-zinc-500 bg-[#050806] p-2.5 rounded-xl border border-[#142a20]">
            <p className="text-zinc-400">// Inherited Fields & Methods</p>
            {CLASS_TREE.Vehicle.fields.map(f => <p key={f}>{f}</p>)}
            {CLASS_TREE.Vehicle.methods.map(m => <p key={m} className="text-emerald-400">{m}</p>)}
          </div>
        </div>

        <ArrowDown size={18} className="text-zinc-600 my-1" />

        {/* Subclasses */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {(['ElectricCar', 'CombustionCar'] as const).map(type => {
            const isSelected = selectedChild === type;
            const cls = CLASS_TREE[type];
            return (
              <div
                key={type}
                onClick={() => { setSelectedChild(type); setDispatchResult(null); }}
                className={`cursor-pointer rounded-2xl border p-3.5 transition-all ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'border-[#142a20] bg-black hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    extends Vehicle
                  </span>
                  <Layers size={14} className={isSelected ? 'text-emerald-400' : 'text-zinc-600'} />
                </div>
                <h5 className="font-bold text-white text-sm">{cls.name}</h5>
                <div className="mt-2 text-left font-mono text-[10px] text-zinc-500 bg-[#050806] p-2 rounded-lg border border-[#142a20]">
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
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-black border border-emerald-500/40 font-mono text-xs text-emerald-300 whitespace-pre-wrap shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          {dispatchResult}
        </motion.div>
      )}
    </div>
  );
}
