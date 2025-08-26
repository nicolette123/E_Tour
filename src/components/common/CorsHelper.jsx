'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Globe, Server } from 'lucide-react';

const CorsHelper = ({ error, onRetry }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isCorrectPort, setIsCorrectPort] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
      setIsCorrectPort(window.location.port === '3000' || window.location.port === '');
    }
  }, []);

  // Check if this is likely a CORS error
  const isCorsError = error && (
    error.includes('CORS') || 
    error.includes('ERR_FAILED') ||
    error.includes('Network error') ||
    error.includes('Access to XMLHttpRequest')
  );

  if (!isCorsError) {
    return null;
  }

  const handlePortFix = () => {
    if (typeof window !== 'undefined') {
      const newUrl = window.location.href.replace(`:${window.location.port}`, ':3000');
      window.location.href = newUrl;
    }
  };

  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">
            Connection Issue Detected
          </h3>
          
          <p className="text-orange-800 mb-4">
            It looks like there's a CORS (Cross-Origin Resource Sharing) issue preventing the app from connecting to the server.
          </p>

          {/* Current Status */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-3">Current Status:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Current URL: {currentUrl}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {isCorrectPort ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm text-gray-700">
                  Port: {isCorrectPort ? 'Correct (3000)' : 'Incorrect (should be 3000)'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  Backend: https://echoes-of-rwanda.onrender.com
                </span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-medium text-orange-900">Quick Fixes:</h4>
            
            {!isCorrectPort && (
              <button
                onClick={handlePortFix}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Switch to Port 3000</span>
              </button>
            )}
            
            <button
              onClick={handleRefresh}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Page</span>
            </button>
            
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Request</span>
              </button>
            )}
          </div>

          {/* Detailed Instructions */}
          <details className="mt-4">
            <summary className="cursor-pointer text-orange-900 font-medium hover:text-orange-700">
              Show Detailed Instructions
            </summary>
            <div className="mt-3 text-sm text-orange-800 space-y-2">
              <div>
                <strong>Step 1:</strong> Ensure you're accessing the app at{' '}
                <code className="bg-orange-100 px-1 rounded">http://localhost:3000</code>
              </div>
              <div>
                <strong>Step 2:</strong> If you're on a different port, the backend CORS policy may block the request.
              </div>
              <div>
                <strong>Step 3:</strong> Clear your browser cache and cookies for localhost.
              </div>
              <div>
                <strong>Step 4:</strong> Restart the development server with{' '}
                <code className="bg-orange-100 px-1 rounded">npm run dev</code>
              </div>
              <div>
                <strong>Step 5:</strong> If the issue persists, try using{' '}
                <code className="bg-orange-100 px-1 rounded">npm run dev:setup</code>{' '}
                to automatically configure the environment.
              </div>
            </div>
          </details>

          {/* Technical Details */}
          <details className="mt-3">
            <summary className="cursor-pointer text-orange-900 font-medium hover:text-orange-700">
              Technical Details
            </summary>
            <div className="mt-3 text-xs text-orange-700 bg-orange-100 p-3 rounded">
              <div><strong>Error:</strong> {error}</div>
              <div className="mt-2">
                <strong>Cause:</strong> The backend server is configured to accept requests from{' '}
                <code>http://localhost:3000</code> but your app is running on a different port or domain.
              </div>
              <div className="mt-2">
                <strong>Solution:</strong> The app includes proxy configuration to route API calls through the development server, 
                but this only works when running on port 3000.
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default CorsHelper;
