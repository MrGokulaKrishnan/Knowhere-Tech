import React, { useState } from 'react';
import { Settings, Download, Upload, Trash2, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { exportAllData, importAllData, clearAllStorage } from '@/services/db';
import Modal from '@/components/ui/Modal';

export default function SettingsPage() {
  const { progress, updateSettings, resetProgress } = useLearning();
  const [resetOpen, setResetOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    const json = await exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowhere-tech-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const ok = await importAllData(text);
      if (ok) {
        window.location.reload();
      } else {
        alert('Invalid backup file format. Please upload a valid Knowhere Tech JSON file.');
      }
    } catch {
      alert('Error parsing JSON backup file.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    clearAllStorage();
    resetProgress();
    setResetOpen(false);
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 selection:bg-emerald-500/30">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="text-emerald-400" size={22} />
          <h1 className="text-2xl font-display font-bold text-white">
            Settings & Local Storage
          </h1>
        </div>
        <p className="text-zinc-400 text-sm">
          Customize your study preferences. Knowhere Tech operates 100% locally in your browser with zero external telemetry.
        </p>
      </div>

      {/* Theme Status Card */}
      <div className="panel p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Display Engine</h2>
            <p className="text-xs text-zinc-500">AMOLED Dark Theme with high-contrast emerald highlights.</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-xs font-mono font-medium flex items-center gap-1.5">
            <ShieldCheck size={13} /> AMOLED Dark
          </span>
        </div>
      </div>

      {/* Daily Target */}
      <div className="panel p-5 mb-4">
        <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Daily Study Target</h2>
        <p className="text-xs text-zinc-500 mb-3">Set how many concepts or quizzes you plan to complete each day.</p>
        <div className="flex items-center gap-2">
          {[2, 3, 4, 5, 8].map(n => (
            <button
              key={n}
              onClick={() => updateSettings({ dailyGoal: n })}
              className={`w-10 h-10 rounded-xl border text-xs font-mono font-bold transition-all ${
                progress?.settings?.dailyGoal === n
                  ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'border-[#142a20] bg-black text-zinc-600 hover:text-white'
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-xs text-zinc-500 ml-2">lessons/day</span>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="panel p-5 mb-4">
        <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Data Backup & Device Sync</h2>
        <p className="text-xs text-zinc-500 mb-4">Export your progress, notes, and quiz history to transfer between devices.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="button-secondary text-xs !py-2 !px-3.5"
          >
            {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Download size={14} />}
            <span>{copied ? 'Downloaded' : 'Export Progress JSON'}</span>
          </button>

          <label className="cursor-pointer">
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            <span className="button-secondary text-xs !py-2 !px-3.5 cursor-pointer">
              <Upload size={14} /> Import Backup
            </span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="panel p-5 border-rose-950/40 bg-black">
        <h2 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <AlertTriangle size={14} /> Danger Zone
        </h2>
        <p className="text-xs text-zinc-500 mb-4">Permanently clear all local learning progress, earned XP, notes, and quiz history.</p>
        <button
          onClick={() => setResetOpen(true)}
          className="button-secondary text-xs !py-2 !px-3.5 text-rose-300 hover:bg-rose-950/40 hover:border-rose-800/60"
        >
          <Trash2 size={14} />
          <span>Reset All Progress</span>
        </button>
      </div>

      {/* Confirm Modal */}
      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title="Confirm Data Reset" size="sm">
        <p className="text-zinc-300 text-xs mb-5 leading-relaxed">
          Are you sure you want to reset all data? This will erase your completed lessons, streak, XP, and notes permanently.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setResetOpen(false)} className="button-secondary flex-1 text-xs">
            Cancel
          </button>
          <button onClick={handleReset} className="button-primary flex-1 text-xs bg-rose-600 hover:bg-rose-500 text-white">
            Reset Everything
          </button>
        </div>
      </Modal>
    </div>
  );
}
