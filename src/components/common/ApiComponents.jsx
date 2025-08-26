// Common API-related React Components
import React from 'react';
import { AlertCircle, Wifi, WifiOff, RefreshCw, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import CorsHelper from './CorsHelper';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <RefreshCw className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ loading, children, message = 'Loading...' }) => {
  if (!loading) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-3">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Error Message Component
export const ErrorMessage = ({ error, onRetry, className = '' }) => {
  if (!error) return null;

  return (
    <div className={className}>
      {/* CORS Helper for network/CORS errors */}
      <CorsHelper error={error} onRetry={onRetry} />

      {/* Standard Error Message */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 text-sm font-medium text-red-800 hover:text-red-900 underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Message Component
export const SuccessMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-green-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 text-green-500 hover:text-green-700"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Warning Message Component
export const WarningMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-yellow-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 text-yellow-500 hover:text-yellow-700"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Info Message Component
export const InfoMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-blue-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 text-blue-500 hover:text-blue-700"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Network Status Component
export const NetworkStatus = ({ isOnline = true, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">Offline</span>
        </>
      )}
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ 
  title = 'No data found', 
  description = 'There are no items to display at the moment.',
  icon: Icon = AlertCircle,
  action,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};

// Retry Button Component
export const RetryButton = ({ onRetry, loading = false, className = '' }) => {
  return (
    <button
      onClick={onRetry}
      disabled={loading}
      className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
      {loading ? 'Retrying...' : 'Retry'}
    </button>
  );
};

// Progress Bar Component
export const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

// Upload Progress Component
export const UploadProgress = ({ progress, fileName, onCancel }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 truncate">{fileName}</span>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      <ProgressBar progress={progress} />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
        {progress === 100 && (
          <CheckCircle className="w-4 h-4 text-green-500" />
        )}
      </div>
    </div>
  );
};

// API Status Badge Component
export const ApiStatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    success: {
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      text: 'Success',
    },
    error: {
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
      text: 'Error',
    },
    loading: {
      color: 'bg-blue-100 text-blue-800',
      icon: RefreshCw,
      text: 'Loading',
    },
    warning: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertTriangle,
      text: 'Warning',
    },
  };

  const config = statusConfig[status] || statusConfig.error;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}>
      <Icon className={`w-3 h-3 mr-1 ${status === 'loading' ? 'animate-spin' : ''}`} />
      {config.text}
    </span>
  );
};

// Data Table Loading Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-4 bg-gray-200 rounded flex-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Card Loading Skeleton
export const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// API Error Boundary Component
export class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <XCircle className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Something went wrong</h1>
            </div>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
