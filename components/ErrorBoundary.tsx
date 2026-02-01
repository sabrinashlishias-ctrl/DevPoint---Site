import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#070B14] text-white p-6 text-center relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-royal-900/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-md">
              <div className="mb-8 inline-block p-4 rounded-full bg-dark-surface border border-dark-border shadow-xl">
                 <RefreshCw className="w-8 h-8 text-royal-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              <h1 className="text-2xl font-bold mb-4 text-white">Estamos atualizando</h1>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Estamos realizando melhorias em nossos sistemas para atender você com mais velocidade. Por favor, aguarde alguns instantes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                    <RefreshCw size={16} /> Tentar novamente
                 </Button>
                 <Button variant="outline" onClick={() => window.location.href = '/'} className="flex items-center gap-2">
                    <Home size={16} /> Voltar ao início
                 </Button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <div className="mt-12 p-4 bg-black/50 border border-red-900/30 rounded text-left overflow-auto max-w-full">
                  <p className="text-xs text-red-400 font-mono mb-2">Debug Info:</p>
                  <pre className="text-[10px] text-red-300 whitespace-pre-wrap">
                    {this.state.error?.toString()}
                  </pre>
                </div>
              )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;