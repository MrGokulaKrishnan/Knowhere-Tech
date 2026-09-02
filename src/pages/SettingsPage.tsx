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
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="text-emerald-400" size={26} />
          <h1 className="text-3xl font-display font-extrabold text-white">
            Settings & Local Storage
          </h1>
        </div>
        <p className="text-zinc-300 text-base leading-relaxed">
          Customize your study preferences. Knowhere Tech operates 100% locally in your browser with zero external tracking.
        </p>
      </div>

      {/* Theme Status Card */}
      <div className="panel p-7 lg:p-8 mb-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono">Display Engine</h2>
            <p className="text-sm text-zinc-400">AMOLED Pure Dark Theme with high-contrast emerald highlights.</p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 text-xs font-mono font-bold flex items-center gap-2 shrink-0">
            <ShieldCheck size={16} className="text-emerald-400" /> AMOLED Dark Mode
          </span>
        </div>
      </div>

      {/* Daily Target */}
      <div className="panel p-7 lg:p-8 mb-6 rounded-3xl">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Daily Study Target</h2>
        <p className="text-sm text-zinc-400 mb-5">Set how many concepts or quizzes you plan to complete each day.</p>
        <div className="flex items-center gap-3">
          {[2, 3, 4, 5, 8].map(n => (
            <button
              key={n}
              onClick={() => updateSettings({ dailyGoal: n })}
              className={`w-12 h-12 rounded-2xl border text-sm font-mono font-bold transition-all ${
                progress?.settings?.dailyGoal === n
                  ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'border-[#142a20] bg-black text-zinc-500 hover:text-white hover:border-emerald-500/40'
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-sm text-zinc-400 ml-3 font-mono">lessons per day</span>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="panel p-7 lg:p-8 mb-6 rounded-3xl">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Data Backup & Device Sync</h2>
        <p className="text-sm text-zinc-400 mb-6">Export your progress, notes, and quiz history to transfer between devices.</p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleExport}
            className="button-secondary text-xs !py-3 !px-5"
          >
            {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Download size={16} />}
            <span>{copied ? 'Downloaded JSON' : 'Export Progress Backup'}</span>
          </button>

          <label className="cursor-pointer">
            <input type="file" accept=".json" className="hidden" onChange={handleImport} disabled={importing} />
            <span className="button-secondary text-xs !py-3 !px-5 cursor-pointer">
              <Upload size={16} /> {importing ? 'Importing...' : 'Import Backup File'}
            </span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="panel p-7 lg:p-8 border-rose-950/50 bg-black rounded-3xl">
        <h2 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2 font-mono">
          <AlertTriangle size={16} /> Danger Zone
        </h2>
        <p className="text-sm text-zinc-400 mb-6">Permanently clear all local learning progress, earned XP, notes, and quiz history.</p>
        <button
          onClick={() => setResetOpen(true)}
          className="button-secondary text-xs !py-3 !px-5 text-rose-300 hover:bg-rose-950/40 hover:border-rose-800/80"
        >
          <Trash2 size={16} />
          <span>Reset All Learning Data</span>
        </button>
      </div>

      {/* Confirm Modal */}
      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title="Confirm Data Reset" size="sm">
        <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
          Are you sure you want to reset all data? This will erase your completed lessons, streak, XP, and notes permanently.
        </p>
        <div className="flex gap-4">
          <button onClick={() => setResetOpen(false)} className="button-secondary flex-1 text-xs !py-3">
            Cancel
          </button>
          <button onClick={handleReset} className="button-primary flex-1 text-xs !py-3 bg-rose-600 hover:bg-rose-500 text-white">
            Reset Everything
          </button>
        </div>
      </Modal>
    </div>
  );
}
