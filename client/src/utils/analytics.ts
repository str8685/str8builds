/**
 * Analytics module for STR8 BUILD
 * Provides a unified interface for tracking app events and errors
 */

// Environment detection
const isProd = import.meta.env.PROD;
const ENV = isProd ? 'production' : 'development';

// Types for events
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

interface ErrorEvent {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
  componentStack?: string;
  path?: string;
}

// Singleton instance for analytics
class Analytics {
  private static instance: Analytics;
  private initialized = false;
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }
  
  /**
   * Initialize analytics services
   * Configures and sets up necessary tracking services
   */
  public init(): void {
    if (this.initialized) return;
    
    try {
      // Only initialize in production or when explicitly enabled
      if (isProd || import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
        console.log(`[Analytics] Initializing in ${ENV} environment`);
        
        // Initialize Google Analytics or other services here
        // This is where you would add your actual analytics implementation
        this.setupErrorTracking();
        this.initialized = true;
      } else {
        console.log('[Analytics] Disabled in development. Use logs for debugging.');
      }
    } catch (error) {
      console.error('[Analytics] Failed to initialize:', error);
    }
  }
  
  /**
   * Setup global error tracking
   */
  private setupErrorTracking(): void {
    if (typeof window !== 'undefined') {
      // Global error handler
      window.onerror = (message, source, lineno, colno, error) => {
        this.captureError({
          message: String(message),
          source,
          lineno,
          colno,
          error,
          path: window.location.pathname
        });
        // Don't prevent default error handling
        return false;
      };
      
      // Unhandled promise rejection handler
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError({
          message: `Unhandled Promise Rejection: ${event.reason}`,
          error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
          path: window.location.pathname
        });
      });
    }
  }
  
  /**
   * Track a user event
   */
  public trackEvent(event: AnalyticsEvent): void {
    if (!this.initialized && isProd) {
      this.init();
    }
    
    try {
      if (isProd) {
        // Send to analytics service in production
        console.log(`[Analytics] Tracking event: ${event.category} / ${event.action}`);
        
        // Replace with actual analytics service implementation
        // Example: dataLayer.push({ event: event.action, ...event });
      } else {
        // Just log in development
        console.log('[Analytics]', event);
      }
    } catch (error) {
      console.error('[Analytics] Failed to track event:', error);
    }
  }
  
  /**
   * Capture an error for monitoring
   */
  public captureError(errorEvent: ErrorEvent): void {
    try {
      if (isProd) {
        // In production, send to error monitoring service
        console.error(`[Error Tracking] ${errorEvent.message}`);
        
        // Replace with actual error tracking implementation
        // Example: Sentry.captureException(errorEvent.error);
      } else {
        // In development, provide detailed console logs
        console.group('%c[Error Captured]', 'color: #ff5555; font-weight: bold;');
        console.error(errorEvent.message);
        console.error(errorEvent.error);
        if (errorEvent.componentStack) {
          console.error('Component Stack:', errorEvent.componentStack);
        }
        console.groupEnd();
      }
    } catch (error) {
      console.error('[Error Tracking] Failed to capture error:', error);
    }
  }
  
  /**
   * Track page view
   */
  public trackPageView(path: string, title?: string): void {
    this.trackEvent({
      category: 'Navigation',
      action: 'PageView',
      label: path,
      properties: { path, title }
    });
  }
  
  /**
   * Track user action
   */
  public trackAction(action: string, category: string, label?: string, value?: number): void {
    this.trackEvent({
      category,
      action,
      label,
      value
    });
  }
  
  /**
   * Track construction tool usage - specifically for the professional tools
   * This tracks usage of the Measure, Level, Angle, Calculator, Project Cam, and Sound Meter tools
   */
  public trackToolUsage(toolName: string, action: string, properties?: Record<string, any>): void {
    this.trackEvent({
      category: 'ConstructionTools',
      action,
      label: toolName,
      properties
    });
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// React Error Boundary integration
export function logComponentError(error: Error, componentStack: string): void {
  analytics.captureError({
    message: error.message,
    error,
    componentStack,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined
  });
}

// Initialize on import in production
if (isProd) {
  analytics.init();
}

export default analytics;
