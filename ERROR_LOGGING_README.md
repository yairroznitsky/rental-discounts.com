# Error Logging System

This document describes the comprehensive error logging system implemented to track all user-facing errors in Supabase.

## Overview

The error logging system captures every error that users encounter and stores detailed information in a Supabase database for analysis and debugging.

## Components

### 1. ErrorLoggingService (`src/services/errorLoggingService.ts`)

The main service for logging errors to Supabase. Provides methods for different types of errors:

- `logUserError()` - User validation errors, missing fields, etc.
- `logSystemError()` - JavaScript errors, React errors, system failures
- `logNetworkError()` - API failures, network timeouts, connection issues
- `logPartnerError()` - Partner service failures, affiliate API issues
- `logValidationError()` - Form validation errors, input validation

### 2. Database Schema (`supabase/migrations/20250108000000_create_error_logs_table.sql`)

The `error_logs` table stores comprehensive error information:

```sql
CREATE TABLE error_logs (
    id UUID PRIMARY KEY,
    error_id TEXT UNIQUE,
    timestamp TIMESTAMPTZ,
    error_type TEXT, -- user_error, system_error, network_error, partner_error, validation_error
    error_title TEXT,
    error_message TEXT,
    error_stack TEXT,
    user_context JSONB, -- Browser, device, session info
    error_context JSONB, -- Component, function, parameters
    severity TEXT, -- low, medium, high, critical
    resolved BOOLEAN,
    metadata JSONB
);
```

### 3. ErrorBoundary (`src/components/ErrorBoundary.tsx`)

Enhanced to log React errors with error IDs displayed to users for support.

### 4. Error Dashboard (`src/components/ErrorDashboard.tsx`)

Visual dashboard to monitor errors with:
- Error statistics by type and severity
- Recent error list
- Resolved/unresolved counts
- Real-time refresh

## Error Types

### User Errors
- Missing required fields
- Invalid input formats
- User permission issues

### System Errors
- JavaScript runtime errors
- React component errors
- Service initialization failures

### Network Errors
- API timeouts
- Connection failures
- External service outages

### Partner Errors
- Affiliate API failures
- Partner service timeouts
- Partner-specific issues

### Validation Errors
- Form validation failures
- Data format issues
- Business rule violations

## Error Severity Levels

- **Critical**: Complete system failure, search completely broken
- **High**: Major functionality affected, significant user impact
- **Medium**: Partial functionality issues, moderate user impact
- **Low**: Minor issues, minimal user impact

## Features

### Automatic Error Capture
- Unhandled JavaScript errors
- Unhandled promise rejections
- React error boundary catches

### Contextual Information
- User browser and device info
- Session tracking
- Component and function context
- Search parameters and location data

### Performance Optimized
- Batch processing of errors
- Queue system for offline scenarios
- Timeout protection for logging operations

### Error Recovery
- Fallback mechanisms when logging fails
- Graceful degradation
- User-friendly error messages

## Usage

### Basic Error Logging
```typescript
import { ErrorLoggingService } from '@/services/errorLoggingService';

// Log a user error
await ErrorLoggingService.logUserError(
  "Invalid Location",
  "User entered invalid pickup location",
  { component: 'SearchForm', field: 'pickup' }
);

// Log a system error
await ErrorLoggingService.logSystemError(
  "API Failure",
  "Failed to connect to partner service",
  { component: 'PartnerService', endpoint: '/api/partners' },
  error.stack
);
```

### Error Dashboard Access
Visit `/error-dashboard` to view error statistics and recent errors.

## Monitoring

### Key Metrics to Watch
- **Critical errors**: Should be 0 or very low
- **Error rate**: Should be < 1% of user sessions
- **Partner errors**: Monitor for specific partner issues
- **Network errors**: Watch for infrastructure problems

### Alerting Recommendations
- Set up alerts for critical errors
- Monitor error rate spikes
- Track partner-specific error patterns
- Watch for new error types

## Benefits

1. **Proactive Issue Detection**: Catch errors before users report them
2. **Detailed Context**: Rich debugging information for faster fixes
3. **User Impact Tracking**: Understand which errors affect users most
4. **Performance Monitoring**: Track system health and reliability
5. **Support Enhancement**: Error IDs help support team assist users

## Database Views

### error_logs_summary
Daily error statistics grouped by type and severity.

### recent_critical_errors
Critical errors from the last 24 hours for immediate attention.

## Security

- Row Level Security (RLS) enabled
- Service role permissions for logging
- No sensitive user data stored
- Error IDs for user support (not personal info)

## Future Enhancements

- Error trend analysis
- Automated error resolution
- Integration with monitoring tools
- Error correlation analysis
- User impact scoring
