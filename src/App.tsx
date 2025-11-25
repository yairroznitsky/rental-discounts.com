
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageRouter } from "@/components/LanguageRouter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FormPositionProvider } from '@/hooks/useFormPosition';
import { useLandingTracker } from '@/hooks/useLandingTracker';
import React from 'react';

console.log('App: Starting application initialization');

const queryClient = new QueryClient();

const App = () => {
  // Initialize landing tracking
  useLandingTracker();
  console.log('App: Rendering App component');

  const handleCookieAccept = (preferences: Record<string, unknown>) => {
    console.log('Cookie preferences accepted:', preferences);
    // Here you would implement the actual cookie setting logic
    // based on user preferences
  };

  const handleCookieReject = () => {
    console.log('Cookies rejected - only necessary cookies enabled');
    // Here you would implement logic to disable non-necessary cookies
  };
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <FormPositionProvider>
          <LanguageRouter />
          <TooltipProvider>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </FormPositionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

console.log('App: App component defined');

export default App;
