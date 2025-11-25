import React, { useState, useEffect } from 'react';
import { ErrorLoggingService } from '@/services/errorLoggingService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertTriangle, Info, XCircle, Wifi } from 'lucide-react';

interface ErrorStats {
  total: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  byResolved: Record<string, number>;
  recent: Record<string, unknown>[];
}

export const ErrorDashboard: React.FC = () => {
  const [stats, setStats] = useState<ErrorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ErrorLoggingService.getErrorStats(7); // Last 7 days
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch error stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-600" />;
      case 'low':
        return <Wifi className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'user_error':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'system_error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'network_error':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'partner_error':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'validation_error':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading error statistics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error loading dashboard: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!stats) {
    return (
      <Alert className="m-4">
        <Info className="h-4 w-4" />
        <AlertDescription>
          No error statistics available.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Error Dashboard</h1>
        <Button onClick={fetchStats} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.bySeverity.critical || 0}
            </div>
            <p className="text-xs text-gray-500">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unresolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.byResolved.false || 0}
            </div>
            <p className="text-xs text-gray-500">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.byResolved.true || 0}
            </div>
            <p className="text-xs text-gray-500">Fixed</p>
          </CardContent>
        </Card>
      </div>

      {/* Error Types */}
      <Card>
        <CardHeader>
          <CardTitle>Errors by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <Badge className={getErrorTypeColor(type)}>
                  {type.replace('_', ' ').toUpperCase()}
                </Badge>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error Severity */}
      <Card>
        <CardHeader>
          <CardTitle>Errors by Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.bySeverity).map(([severity, count]) => (
              <div key={severity} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(severity)}
                  <Badge className={getSeverityColor(severity)}>
                    {severity.toUpperCase()}
                  </Badge>
                </div>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recent.slice(0, 10).map((error: Record<string, unknown>, index: number) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(error.severity)}
                    <Badge className={getSeverityColor(error.severity)}>
                      {error.severity.toUpperCase()}
                    </Badge>
                    <Badge className={getErrorTypeColor(error.error_type)}>
                      {error.error_type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(error.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm font-medium">{error.error_title}</div>
                <div className="text-xs text-gray-600">{error.error_message}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
