import React, { ErrorInfo, ReactNode } from 'react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#070B14] text-white p-6 text-center">
          <div className="mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Algo deu errado</h1>
          <p className="text-slate-400 mb-8 max-w-md">
            Não foi possível carregar o conteúdo. Isso pode ser um problema de conexão ou temporário.
          </p>
          <div className="flex gap-4">
             <Button onClick={() => window.location.reload()}>
                Recarregar Página
             </Button>
             <Button variant="outline" onClick={() => window.location.href = '/'}>
                Voltar ao Início
             </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-black/50 rounded text-left text-xs text-red-400 overflow-auto max-w-full">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;