import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const ICONS = { success: CheckCircle, error: XCircle, warning: AlertCircle, info: Info };
const STYLES = {
  success: 'border-secondary/30 bg-secondary/10',
  error: 'border-danger/30 bg-danger/10',
  warning: 'border-warning/30 bg-warning/10',
  info: 'border-primary/30 bg-primary/10',
};
const ICON_STYLES = {
  success: 'text-secondary',
  error: 'text-danger',
  warning: 'text-warning',
  info: 'text-primary',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, type, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const dismiss = (id: string) => setToasts(t => t.filter(x => x.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-24 lg:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-xs w-full">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = ICONS[t.type];
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                className={clsx('flex items-start gap-3 p-3 rounded-xl border shadow-elevated', STYLES[t.type])}>
                <Icon size={16} className={clsx('mt-0.5 shrink-0', ICON_STYLES[t.type])} />
                <p className="text-sm text-text flex-1">{t.message}</p>
                <button onClick={() => dismiss(t.id)} className="text-text-subtle hover:text-text"><X size={14} /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be within ToastProvider');
  return ctx;
}
