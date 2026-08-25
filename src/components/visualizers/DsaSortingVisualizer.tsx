import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, BarChart2, Zap, Settings, Hash, Layers } from 'lucide-react';

type AlgorithmType = 'bubble' | 'selection' | 'insertion' | 'quick';

type SortAction = 
  | { type: 'compare', i: number, j: number }
  | { type: 'swap', i: number, j: number }
  | { type: 'markSorted', indices: number[] };

function generateArray(size = 12): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
}

function getBubbleSortActions(arr: number[]): SortAction[] {
  const actions: SortAction[] = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      actions.push({ type: 'compare', i: j, j: j + 1 });
      if (a[j] > a[j + 1]) {
        actions.push({ type: 'swap', i: j, j: j + 1 });
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
    actions.push({ type: 'markSorted', indices: [n - 1 - i] });
  }
  actions.push({ type: 'markSorted', indices: [0] });
  return actions;
}

function getSelectionSortActions(arr: number[]): SortAction[] {
  const actions: SortAction[] = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      actions.push({ type: 'compare', i: minIdx, j: j });
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      actions.push({ type: 'swap', i, j: minIdx });
      const temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;
    }
    actions.push({ type: 'markSorted', indices: [i] });
  }
  return actions;
}

function getInsertionSortActions(arr: number[]): SortAction[] {
  const actions: SortAction[] = [];
  const a = [...arr];
  const n = a.length;
  actions.push({ type: 'markSorted', indices: [0] });
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      actions.push({ type: 'compare', i: j, j: j - 1 });
      if (a[j] < a[j - 1]) {
        actions.push({ type: 'swap', i: j, j: j - 1 });
        const temp = a[j];
        a[j] = a[j - 1];
        a[j - 1] = temp;
        j--;
      } else {
        break;
      }
    }
    const sortedSoFar = Array.from({length: i + 1}, (_, idx) => idx);
    actions.push({ type: 'markSorted', indices: sortedSoFar });
  }
  return actions;
}

function getQuickSortActions(arr: number[]): SortAction[] {
  const actions: SortAction[] = [];
  const a = [...arr];
  
  function partition(low: number, high: number): number {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      actions.push({ type: 'compare', i: j, j: high });
      if (a[j] < pivot) {
        i++;
        if (i !== j) {
          actions.push({ type: 'swap', i, j });
          const temp = a[i];
          a[i] = a[j];
          a[j] = temp;
        }
      }
    }
    if (i + 1 !== high) {
      actions.push({ type: 'swap', i: i + 1, j: high });
      const temp = a[i + 1];
      a[i + 1] = a[high];
      a[high] = temp;
    }
    actions.push({ type: 'markSorted', indices: [i + 1] });
    return i + 1;
  }
  
  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      actions.push({ type: 'markSorted', indices: [low] });
    }
  }
  
  quickSort(0, a.length - 1);
  return actions;
}

const computeActions = (currentArr: number[], algo: AlgorithmType) => {
  if (algo === 'bubble') return getBubbleSortActions(currentArr);
  if (algo === 'selection') return getSelectionSortActions(currentArr);
  if (algo === 'insertion') return getInsertionSortActions(currentArr);
  if (algo === 'quick') return getQuickSortActions(currentArr);
  return [];
};

const complexities: Record<AlgorithmType, string> = {
  bubble: 'O(n²)',
  selection: 'O(n²)',
  insertion: 'O(n²)',
  quick: 'O(n log n)',
};

export default function DsaSortingVisualizer() {
  const [arraySize, setArraySize] = useState<number>(12);
  const [initialArr, setInitialArr] = useState<number[]>(() => generateArray(12));
  const [arr, setArr] = useState<number[]>(initialArr);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [speed, setSpeed] = useState<number>(1);
  
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0, steps: 0 });

  const isSortingRef = useRef(false);
  const speedRef = useRef(1);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const totalSteps = useMemo(() => {
    return computeActions(initialArr, algorithm).length;
  }, [initialArr, algorithm]);

  const resetArray = useCallback(() => {
    isSortingRef.current = false;
    setIsSorting(false);
    const newArr = generateArray(arraySize);
    setInitialArr(newArr);
    setArr(newArr);
    setComparingIndices([]);
    setSortedIndices([]);
    setMetrics({ comparisons: 0, swaps: 0, steps: 0 });
  }, [arraySize]);

  const handleSizeChange = (size: number) => {
    setArraySize(size);
    isSortingRef.current = false;
    setIsSorting(false);
    const newArr = generateArray(size);
    setInitialArr(newArr);
    setArr(newArr);
    setComparingIndices([]);
    setSortedIndices([]);
    setMetrics({ comparisons: 0, swaps: 0, steps: 0 });
  };

  const handleAlgoChange = (algo: AlgorithmType) => {
    setAlgorithm(algo);
    isSortingRef.current = false;
    setIsSorting(false);
    setArr([...initialArr]);
    setComparingIndices([]);
    setSortedIndices([]);
    setMetrics({ comparisons: 0, swaps: 0, steps: 0 });
  };

  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    isSortingRef.current = true;
    
    const actions = computeActions(arr, algorithm);
    
    let currentArr = [...arr];
    let compIndices: number[] = [];
    let sortIndices: number[] = [...sortedIndices];
    
    let currentComps = 0;
    let currentSwaps = 0;

    for (let i = 0; i < actions.length; i++) {
      if (!isSortingRef.current) break;
      
      const delay = Math.max(10, 150 / speedRef.current);
      const action = actions[i];
      
      if (action.type === 'compare') {
        compIndices = [action.i, action.j];
        setComparingIndices(compIndices);
        currentComps++;
        setMetrics({ comparisons: currentComps, swaps: currentSwaps, steps: i + 1 });
        await new Promise(r => setTimeout(r, delay));
      } else if (action.type === 'swap') {
        const temp = currentArr[action.i];
        currentArr[action.i] = currentArr[action.j];
        currentArr[action.j] = temp;
        setArr([...currentArr]);
        currentSwaps++;
        setMetrics({ comparisons: currentComps, swaps: currentSwaps, steps: i + 1 });
        await new Promise(r => setTimeout(r, delay));
      } else if (action.type === 'markSorted') {
        sortIndices = [...new Set([...sortIndices, ...action.indices])];
        setSortedIndices(sortIndices);
        setMetrics({ comparisons: currentComps, swaps: currentSwaps, steps: i + 1 });
        await new Promise(r => setTimeout(r, delay / 2));
      }
    }

    if (isSortingRef.current) {
      setComparingIndices([]);
      setSortedIndices(Array.from({length: arr.length}, (_, i) => i));
      setIsSorting(false);
      isSortingRef.current = false;
      setMetrics(m => ({ ...m, steps: totalSteps }));
    }
  };

  const isSorted = sortedIndices.length === arr.length && arr.length > 0;
  const maxVal = Math.max(...arr, 100);

  return (
    <div className="panel rounded-3xl p-6 mb-6 flex flex-col gap-6 shadow-xl border border-emerald-800/30">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row gap-5 justify-between items-start xl:items-center">
        <div>
          <h3 className="font-semibold text-white text-lg flex items-center gap-2">
            <BarChart2 className="text-emerald-400" size={20} />
            Sorting Visualizer
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Watch algorithm mechanics, memory swaps, and boundaries in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Algorithm Selector */}
          <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-800/50 rounded-xl px-2 py-1">
            <Settings size={14} className="text-emerald-500 ml-1" />
            <select 
              className="bg-transparent text-emerald-300 text-sm py-1.5 outline-none cursor-pointer"
              value={algorithm}
              onChange={e => handleAlgoChange(e.target.value as AlgorithmType)}
              disabled={isSorting}
            >
              <option value="bubble" className="bg-emerald-950">Bubble Sort</option>
              <option value="selection" className="bg-emerald-950">Selection Sort</option>
              <option value="insertion" className="bg-emerald-950">Insertion Sort</option>
              <option value="quick" className="bg-emerald-950">Quick Sort</option>
            </select>
          </div>
          
          {/* Size Selector */}
          <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-800/50 rounded-xl px-2 py-1">
            <Layers size={14} className="text-emerald-500 ml-1" />
            <select
              className="bg-transparent text-emerald-300 text-sm py-1.5 outline-none cursor-pointer"
              value={arraySize}
              onChange={e => handleSizeChange(Number(e.target.value))}
              disabled={isSorting}
            >
              <option value={8} className="bg-emerald-950">Small (8)</option>
              <option value={12} className="bg-emerald-950">Medium (12)</option>
              <option value={20} className="bg-emerald-950">Large (20)</option>
            </select>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-800/50 rounded-xl px-2 py-1">
            <Zap size={14} className="text-emerald-500 ml-1" />
            <select
              className="bg-transparent text-emerald-300 text-sm py-1.5 outline-none cursor-pointer"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            >
              <option value={0.5} className="bg-emerald-950">0.5x Speed</option>
              <option value={1} className="bg-emerald-950">1x Speed</option>
              <option value={2} className="bg-emerald-950">2x Speed</option>
              <option value={4} className="bg-emerald-950">4x Speed</option>
            </select>
          </div>

          <div className="w-px h-6 bg-emerald-800/40 mx-1 hidden sm:block"></div>

          <button
            onClick={resetArray}
            disabled={isSorting}
            className="p-2.5 rounded-xl border border-emerald-800/50 text-emerald-500 hover:text-emerald-300 hover:bg-emerald-900/30 transition-colors disabled:opacity-50"
            title="Randomize Array"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={runSort}
            disabled={isSorting || isSorted}
            className="button-primary flex items-center gap-2 px-5 py-2.5 shadow-glow-green"
          >
            <Play size={16} className={isSorting ? "animate-pulse" : ""} /> 
            {isSorting ? 'Sorting...' : isSorted ? 'Sorted' : 'Start Sort'}
          </button>
        </div>
      </div>

      {/* Live Metrics HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><BarChart2 size={40} /></div>
          <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-wider mb-1">Time Complexity</span>
          <span className="text-xl font-mono font-bold text-emerald-400">{complexities[algorithm]}</span>
        </div>
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><Hash size={40} /></div>
          <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-wider mb-1">Comparisons</span>
          <span className="text-xl font-mono font-bold text-white">{metrics.comparisons}</span>
        </div>
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><RotateCcw size={40} /></div>
          <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-wider mb-1">Array Swaps</span>
          <span className="text-xl font-mono font-bold text-white">{metrics.swaps}</span>
        </div>
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><Play size={40} /></div>
          <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-wider mb-1">Total Steps</span>
          <span className="text-xl font-mono font-bold text-emerald-400">
            {metrics.steps} <span className="text-sm text-emerald-600">/ {totalSteps}</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex items-end gap-1.5 sm:gap-2 h-56 bg-black/40 rounded-2xl p-5 border border-emerald-900/30 shadow-inner">
        {arr.map((val, idx) => {
          const isComparing = comparingIndices.includes(idx);
          const isSortedItem = sortedIndices.includes(idx);

          return (
            <motion.div
              key={idx}
              layout
              animate={{ height: `${(val / maxVal) * 100}%` }}
              transition={{ type: 'tween', duration: 0.1 }}
              className="flex-1 rounded-t-md sm:rounded-t-lg flex flex-col justify-end items-center relative min-w-[12px]"
              style={{
                background: isComparing
                  ? '#F43F5E'
                  : isSortedItem
                  ? '#10B981'
                  : '#064E3B'
              }}
            >
              <span className="text-[10px] sm:text-xs font-mono text-white/90 font-bold mb-1.5 select-none opacity-0 sm:opacity-100">
                {val}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1 text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#064E3B] border border-[#10B981]/30" /> Unsorted
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#F43F5E] shadow-[0_0_8px_rgba(244,63,94,0.6)]" /> Comparing / Swapping
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" /> Sorted
        </span>
      </div>
    </div>
  );
}
