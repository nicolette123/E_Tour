// Error Boundary Component
'use client';
import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">
              <span>⚠️</span>
            </div>
            
            <div className="error-content">
              <h2 className="error-title">
                {this.props.title || 'Oops! Something went wrong'}
              </h2>
              
              <p className="error-message">
                {this.props.message || 
                 'We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.'}
              </p>

              <div className="error-actions">
                <button 
                  onClick={this.handleRetry}
                  className="btn btn-primary error-retry-btn"
                >
                  <span className="btn-icon">🔄</span>
                  <span className="btn-text">Try Again</span>
                </button>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary error-refresh-btn"
                >
                  <span className="btn-icon">↻</span>
                  <span className="btn-text">Refresh Page</span>
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development)</summary>
                  <div className="error-stack">
                    <h4>Error:</h4>
                    <pre>{this.state.error.toString()}</pre>
                    
                    <h4>Component Stack:</h4>
                    <pre>{this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple Error Message Component
export const ErrorMessage = ({ 
  title = 'Error', 
  message, 
  onRetry, 
  showRetry = true,
  type = 'error' // 'error', 'warning', 'info'
}) => {
  const typeIcons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`error-message-container ${type}`}>
      <div className="error-message-content">
        <div className="error-message-icon">
          {typeIcons[type]}
        </div>
        
        <div className="error-message-text">
          <h3 className="error-message-title">{title}</h3>
          <p className="error-message-description">{message}</p>
        </div>
        
        {showRetry && onRetry && (
          <button 
            onClick={onRetry}
            className="btn btn-sm btn-primary error-message-retry"
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Retry</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Network Error Component
export const NetworkError = ({ onRetry }) => {
  return (
    <ErrorMessage
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
      type="warning"
    />
  );
};

// Not Found Component
export const NotFound = ({ 
  title = 'Page Not Found', 
  message = 'The page you are looking for does not exist.',
  showHomeLink = true 
}) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <span>🔍</span>
        </div>
        
        <h1 className="not-found-title">{title}</h1>
        <p className="not-found-message">{message}</p>
        
        {showHomeLink && (
          <div className="not-found-actions">
            <a href="/" className="btn btn-primary">
              <span className="btn-icon">🏠</span>
              <span className="btn-text">Go Home</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ 
  icon = '📭', 
  title = 'No Data Found', 
  message = 'There is no data to display at the moment.',
  action,
  actionText = 'Refresh'
}) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-content">
        <div className="empty-state-icon">
          <span>{icon}</span>
        </div>
        
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-message">{message}</p>
        
        {action && (
          <button onClick={action} className="btn btn-primary empty-state-action">
            <span className="btn-text">{actionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
