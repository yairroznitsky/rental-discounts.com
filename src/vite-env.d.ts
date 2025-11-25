/// <reference types="vite/client" />

// Google Analytics gtag types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    gtag_report_conversion: (url?: string) => boolean;
  }
}

export {};
