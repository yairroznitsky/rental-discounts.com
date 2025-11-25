import React from 'react';
import { ErrorDashboard } from '@/components/ErrorDashboard';

export const ErrorDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <ErrorDashboard />
      </div>
    </div>
  );
};
