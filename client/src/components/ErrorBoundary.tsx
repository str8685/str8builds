import React, { Component, ReactNode, ErrorInfo } from "react";
import { logComponentError } from "@/utils/analytics";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches errors in child components
 * Integrates with our analytics system to track errors in production
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to our analytics system
    const componentStack = errorInfo.componentStack || "";
    logComponentError(error, componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with space/cyan theme
      return (
        <div
          className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4"
          data-oid="v3wpcsg"
        >
          <div
            className="relative z-10 max-w-md w-full mx-auto"
            data-oid="lt7pgd."
          >
            {/* Animated starfield background */}
            <div
              className="absolute inset-0 -z-10 overflow-hidden opacity-30"
              data-oid="y4oew:x"
            >
              <div className="star-small" data-oid="mp80j:o"></div>
              <div className="star-medium" data-oid="2dnvww9"></div>
              <div className="star-large" data-oid="9gx09ii"></div>
            </div>

            {/* Glow effect */}
            <div
              className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl opacity-70"
              data-oid="sjr8zeo"
            ></div>

            <div
              className="backdrop-blur-md bg-slate-900/40 border border-slate-700/50 rounded-xl p-8 shadow-xl"
              data-oid="hmzea_e"
            >
              <div className="text-center" data-oid="forc.kv">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center"
                  data-oid="a94a465"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="wxzn4tf"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      data-oid="e56fuqs"
                    />
                  </svg>
                </div>

                <h2
                  className="text-2xl font-semibold text-white mb-3"
                  data-oid="rvj8lvw"
                >
                  Something Went Wrong
                </h2>
                <p className="text-slate-300 mb-6" data-oid="a7wt35c">
                  We've encountered an error and our team has been notified.
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg shadow-cyan-500/30 transition-all"
                  data-oid="ch73722"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-oid="azfn3wi"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                      data-oid="t9owzeq"
                    />
                  </svg>
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
