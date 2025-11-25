
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorLoggingService } from '@/services/errorLoggingService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo);
    
    // Log the error to Supabase
    ErrorLoggingService.logSystemError(
      'React Error Boundary Caught Error',
      error.message,
      {
        component: 'ErrorBoundary',
        function: 'componentDidCatch',
        errorInfo: {
          componentStack: errorInfo.componentStack,
          errorBoundary: errorInfo.errorBoundary
        }
      },
      error.stack
    ).then(errorId => {
      this.setState({ errorId });
    }).catch(logError => {
      console.error('Failed to log error to Supabase:', logError);
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {this.state.errorId && (
              <p className="text-sm text-gray-500 mb-4">
                Error ID: <code className="bg-gray-100 px-2 py-1 rounded">{this.state.errorId}</code>
                <br />
                <span className="text-xs">Please include this ID if you contact support</span>
              </p>
            )}
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined, errorId: undefined })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
