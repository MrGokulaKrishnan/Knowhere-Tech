import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-4 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Application Notice</h1>
          <p className="text-zinc-400 text-sm max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || 'An unexpected rendering state occurred. Click below to reload the dashboard.'}
          </p>
          <button
            onClick={this.handleReload}
            className="button-primary text-xs !py-3 !px-6"
          >
            <RotateCcw size={16} />
            <span>Reload Dashboard</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
