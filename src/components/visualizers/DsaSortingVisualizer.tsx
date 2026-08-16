import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, BarChart2 } from 'lucide-react';

function generateArray(size = 12): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
}

export default function DsaSortingVisualizer() {
  const [arr, setArr] = useState<number[]>(() => generateArray());
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  const resetArray = () => {
    setArr(generateArray());
    setComparingIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
  };

  const runBubbleSort = useCallback(async () => {
    if (isSorting) return;
    setIsSorting(true);
    const a = [...arr];
    const n = a.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIndices([j, j + 1]);
        await new Promise(r => setTimeout(r, 120));

        if (a[j] > a[j + 1]) {
          const temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          setArr([...a]);
          await new Promise(r => setTimeout(r, 80));
        }
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setComparingIndices([]);
    setIsSorting(false);
  }, [arr, isSorting]);

  const maxVal = Math.max(...arr, 100);

  return (
    <div className="rounded-2xl border border-[#142318] bg-[#090E0A] p-5 mb-6 shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <BarChart2 size={16} className="text-[#00FF88]" />
            DSA Sorting Algorithm Visualizer (Step-by-Step Bubble Sort)
          </h3>
          <p className="text-xs text-[#4A6B53]">
            Watch real-time element comparisons, memory swaps, and sorted boundary highlights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetArray}
            disabled={isSorting}
            className="p-1.5 rounded-lg border border-[#142318] text-[#94A3B8] hover:text-white bg-[#000000] transition-colors disabled:opacity-50"
            title="Randomize Array"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={runBubbleSort}
            disabled={isSorting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#00FF88] text-xs font-semibold hover:bg-[#10B981]/30 transition-colors disabled:opacity-50 shadow-glow-green"
          >
            <Play size={12} /> {isSorting ? 'Sorting...' : 'Start Sort'}
          </button>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex items-end gap-1.5 h-44 bg-[#000000] rounded-2xl p-4 border border-[#142318]">
        {arr.map((val, idx) => {
          const isComparing = comparingIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          return (
            <motion.div
              key={idx}
              layout
              animate={{ height: `${(val / maxVal) * 100}%` }}
              transition={{ duration: 0.15 }}
              className="flex-1 rounded-t-lg flex flex-col justify-end items-center transition-colors relative"
              style={{
                background: isComparing
                  ? '#F43F5E'
                  : isSorted
                  ? '#00FF88'
                  : '#10B981'
              }}
            >
              <span className="text-[9px] font-mono text-black font-bold mb-1 select-none">
                {val}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-[#4A6B53]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" /> Unsorted Elements
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#F43F5E]" /> Active Comparison / Swap
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#00FF88]" /> Sorted Boundary
        </span>
      </div>
    </div>
  );
}
