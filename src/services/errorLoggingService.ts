import { supabase } from '@/integrations/supabase/client';

export interface ErrorLogEntry {
  id?: string;
  error_id: string;
  timestamp: string;
  error_type: 'user_error' | 'system_error' | 'network_error' | 'partner_error' | 'validation_error';
  error_title: string;
  error_message: string;
  error_stack?: string;
  user_context: {
    user_agent: string;
    url: string;
    referrer: string;
    language: string;
    timezone: string;
    screen_resolution: string;
    device_type: string;
    session_id?: string;
  };
  error_context: {
    component?: string;
    function?: string;
    search_params?: any;
    location_data?: any;
    partner_name?: string;
    api_endpoint?: string;
    status_code?: number;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  metadata: any;
}

export class ErrorLoggingService {
  private static sessionId: string | null = null;
  private static errorQueue: ErrorLogEntry[] = [];
  private static isProcessingQueue = false;

  private static generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static generateSessionId(): string {
    if (!this.sessionId) {
      this.sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    return this.sessionId;
  }

  private static getUserContext() {
    return {
      user_agent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen_resolution: `${screen.width}x${screen.height}`,
      device_type: this.getDeviceType(),
      session_id: this.generateSessionId()
    };
  }

  private static getDeviceType(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  private static determineSeverity(errorType: string, errorMessage: string): 'low' | 'medium' | 'high' | 'critical' {
    // Critical errors that completely break functionality
    if (errorType === 'system_error' || errorMessage.includes('partner service not responding')) {
      return 'critical';
    }
    
    // High severity - major functionality broken
    if (errorType === 'partner_error' || errorMessage.includes('timeout') || errorMessage.includes('network')) {
      return 'high';
    }
    
    // Medium severity - partial functionality affected
    if (errorType === 'validation_error' || errorMessage.includes('unavailable')) {
      return 'medium';
    }
    
    // Low severity - minor issues
    return 'low';
  }

  private static async processQueue() {
    if (this.isProcessingQueue || this.errorQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    try {
      const errorsToProcess = [...this.errorQueue];
      this.errorQueue = [];

      const { error } = await supabase
        .from('error_logs')
        .insert(errorsToProcess);

      if (error) {
        console.error('ErrorLoggingService: Failed to log errors to Supabase:', error);
        // Re-add to queue for retry
        this.errorQueue.unshift(...errorsToProcess);
      } else {
        console.log(`ErrorLoggingService: Successfully logged ${errorsToProcess.length} errors to Supabase`);
      }
    } catch (error) {
      console.error('ErrorLoggingService: Error processing queue:', error);
      // Re-add to queue for retry
      this.errorQueue.unshift(...this.errorQueue);
    } finally {
      this.isProcessingQueue = false;
    }
  }

  public static async logError(
    errorType: ErrorLogEntry['error_type'],
    errorTitle: string,
    errorMessage: string,
    errorContext: Partial<ErrorLogEntry['error_context']> = {},
    errorStack?: string
  ): Promise<string> {
    const errorId = this.generateErrorId();
    
    const errorLogEntry: ErrorLogEntry = {
      error_id: errorId,
      timestamp: new Date().toISOString(),
      error_type: errorType,
      error_title: errorTitle,
      error_message: errorMessage,
      error_stack: errorStack,
      user_context: this.getUserContext(),
      error_context: errorContext,
      severity: this.determineSeverity(errorType, errorMessage),
      resolved: false,
      metadata: {
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        environment: import.meta.env.MODE || 'production'
      }
    };

    // Add to queue for batch processing
    this.errorQueue.push(errorLogEntry);

    // Process queue immediately for critical errors, or batch process for others
    if (errorLogEntry.severity === 'critical') {
      await this.processQueue();
    } else {
      // Process queue after a short delay for batching
      setTimeout(() => this.processQueue(), 1000);
    }

    console.log('ErrorLoggingService: Error logged:', {
      errorId,
      type: errorType,
      title: errorTitle,
      severity: errorLogEntry.severity
    });

    return errorId;
  }

  public static async logUserError(
    errorTitle: string,
    errorMessage: string,
    context: Partial<ErrorLogEntry['error_context']> = {}
  ): Promise<string> {
    return this.logError('user_error', errorTitle, errorMessage, context);
  }

  public static async logSystemError(
    errorTitle: string,
    errorMessage: string,
    context: Partial<ErrorLogEntry['error_context']> = {},
    errorStack?: string
  ): Promise<string> {
    return this.logError('system_error', errorTitle, errorMessage, context, errorStack);
  }

  public static async logNetworkError(
    errorTitle: string,
    errorMessage: string,
    context: Partial<ErrorLogEntry['error_context']> = {}
  ): Promise<string> {
    return this.logError('network_error', errorTitle, errorMessage, context);
  }

  public static async logPartnerError(
    errorTitle: string,
    errorMessage: string,
    partnerName: string,
    context: Partial<ErrorLogEntry['error_context']> = {}
  ): Promise<string> {
    return this.logError('partner_error', errorTitle, errorMessage, {
      ...context,
      partner_name: partnerName
    });
  }

  public static async logValidationError(
    errorTitle: string,
    errorMessage: string,
    context: Partial<ErrorLogEntry['error_context']> = {}
  ): Promise<string> {
    return this.logError('validation_error', errorTitle, errorMessage, context);
  }

  // Method to manually process any remaining errors in queue
  public static async flushQueue(): Promise<void> {
    await this.processQueue();
  }

  // Method to get error statistics
  public static async getErrorStats(days: number = 7): Promise<any> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('error_logs')
        .select('error_type, severity, timestamp, resolved')
        .gte('timestamp', startDate.toISOString());

      if (error) {
        console.error('ErrorLoggingService: Failed to get error stats:', error);
        return null;
      }

      return {
        total: data?.length || 0,
        byType: this.groupBy(data, 'error_type'),
        bySeverity: this.groupBy(data, 'severity'),
        byResolved: this.groupBy(data, 'resolved'),
        recent: data?.slice(-10) || []
      };
    } catch (error) {
      console.error('ErrorLoggingService: Error getting stats:', error);
      return null;
    }
  }

  private static groupBy(array: any[], key: string): Record<string, number> {
    return array?.reduce((groups, item) => {
      const value = item[key];
      groups[value] = (groups[value] || 0) + 1;
      return groups;
    }, {}) || {};
  }
}

// Initialize error logging on page load
if (typeof window !== 'undefined') {
  // Log any unhandled errors
  window.addEventListener('error', (event) => {
    ErrorLoggingService.logSystemError(
      'Unhandled JavaScript Error',
      event.message,
      {
        component: 'window',
        function: 'error_handler'
      },
      event.error?.stack
    );
  });

  // Log unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    ErrorLoggingService.logSystemError(
      'Unhandled Promise Rejection',
      event.reason?.message || 'Unknown promise rejection',
      {
        component: 'window',
        function: 'unhandled_rejection_handler'
      },
      event.reason?.stack
    );
  });

  // Flush queue before page unload
  window.addEventListener('beforeunload', () => {
    ErrorLoggingService.flushQueue();
  });
}
