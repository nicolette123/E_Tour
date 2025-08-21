// API Testing Component for Development and Debugging
'use client';

import React, { useState, useEffect } from 'react';
import { apiService, apiUtils } from '../../services/api';
import { 
  LoadingSpinner, 
  ErrorMessage, 
  SuccessMessage,
  ApiStatusBadge 
} from '../common/ApiComponents';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  Eye,
  EyeOff 
} from 'lucide-react';

const ApiTester = () => {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  // Define API test cases
  const testCases = [
    {
      id: 'auth-check',
      name: 'Authentication Check',
      description: 'Check if user is authenticated',
      category: 'Authentication',
      test: async () => {
        const isAuth = apiService.isAuthenticated();
        const userData = apiService.getCurrentUser();
        return {
          success: true,
          data: { isAuthenticated: isAuth, user: userData },
          message: isAuth ? 'User is authenticated' : 'User is not authenticated'
        };
      }
    },
    {
      id: 'destinations-fetch',
      name: 'Fetch Destinations',
      description: 'Test fetching destinations from API',
      category: 'Destinations',
      test: async () => {
        return await apiService.destination.getDestinations({ limit: 5 });
      }
    },
    {
      id: 'tours-fetch',
      name: 'Fetch Tours',
      description: 'Test fetching tour packages from API',
      category: 'Tours',
      test: async () => {
        return await apiService.tour.getTours({ limit: 5 });
      }
    },
    {
      id: 'dashboard-stats',
      name: 'Dashboard Statistics',
      description: 'Test fetching dashboard statistics',
      category: 'Dashboard',
      test: async () => {
        return await apiService.dashboard.getDashboardStats();
      }
    },
    {
      id: 'user-profile',
      name: 'User Profile',
      description: 'Test fetching user profile data',
      category: 'User',
      test: async () => {
        if (!apiService.isAuthenticated()) {
          return {
            success: false,
            error: { message: 'User not authenticated' },
            message: 'User must be logged in to fetch profile'
          };
        }
        return await apiService.user.getProfile();
      }
    },
    {
      id: 'search-destinations',
      name: 'Search Destinations',
      description: 'Test destination search functionality',
      category: 'Search',
      test: async () => {
        return await apiService.destination.searchDestinations('rwanda', { limit: 3 });
      }
    },
    {
      id: 'api-config',
      name: 'API Configuration',
      description: 'Check API configuration and endpoints',
      category: 'Configuration',
      test: async () => {
        const config = {
          baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
          isAuthenticated: apiService.isAuthenticated(),
          userRole: apiService.getUserRole(),
          timestamp: new Date().toISOString()
        };
        return {
          success: true,
          data: config,
          message: 'API configuration retrieved successfully'
        };
      }
    }
  ];

  const runSingleTest = async (testCase) => {
    setTestResults(prev => ({
      ...prev,
      [testCase.id]: { status: 'running', startTime: Date.now() }
    }));

    try {
      const result = await testCase.test();
      const endTime = Date.now();
      const duration = endTime - testResults[testCase.id]?.startTime || 0;

      setTestResults(prev => ({
        ...prev,
        [testCase.id]: {
          ...result,
          status: result.success ? 'success' : 'error',
          duration,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testCase.id]: {
          success: false,
          error,
          status: 'error',
          duration: Date.now() - (testResults[testCase.id]?.startTime || Date.now()),
          timestamp: new Date().toISOString(),
          message: apiUtils.formatErrorMessage(error)
        }
      }));
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults({});

    for (const testCase of testCases) {
      await runSingleTest(testCase);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleDetails = (testId) => {
    setShowDetails(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const getTestsByCategory = () => {
    const categories = {};
    testCases.forEach(test => {
      if (!categories[test.category]) {
        categories[test.category] = [];
      }
      categories[test.category].push(test);
    });
    return categories;
  };

  const getOverallStatus = () => {
    const results = Object.values(testResults);
    if (results.length === 0) return 'pending';
    if (results.some(r => r.status === 'running')) return 'running';
    if (results.every(r => r.status === 'success')) return 'success';
    if (results.some(r => r.status === 'error')) return 'error';
    return 'partial';
  };

  const testsByCategory = getTestsByCategory();
  const overallStatus = getOverallStatus();

  return (
    <div className="api-tester p-6 max-w-6xl mx-auto">
      <div className="header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">API Tester</h1>
            <p className="text-gray-600">Test and validate API integrations</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <ApiStatusBadge status={overallStatus} />
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Test Results Summary */}
      {Object.keys(testResults).length > 0 && (
        <div className="summary mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(testResults).length}
              </div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(testResults).filter(r => r.status === 'success').length}
              </div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(testResults).filter(r => r.status === 'error').length}
              </div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Object.values(testResults).filter(r => r.status === 'running').length}
              </div>
              <div className="text-sm text-gray-600">Running</div>
            </div>
          </div>
        </div>
      )}

      {/* Test Cases by Category */}
      <div className="test-categories space-y-6">
        {Object.entries(testsByCategory).map(([category, tests]) => (
          <div key={category} className="category-section">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            
            <div className="space-y-3">
              {tests.map(testCase => {
                const result = testResults[testCase.id];
                const isShowingDetails = showDetails[testCase.id];
                
                return (
                  <div key={testCase.id} className="test-case bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result?.status)}
                        <div>
                          <h3 className="font-medium text-gray-900">{testCase.name}</h3>
                          <p className="text-sm text-gray-600">{testCase.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {result?.duration && (
                          <span className="text-xs text-gray-500">
                            {result.duration}ms
                          </span>
                        )}
                        
                        <button
                          onClick={() => runSingleTest(testCase)}
                          disabled={result?.status === 'running'}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
                        >
                          {result?.status === 'running' ? 'Running...' : 'Run'}
                        </button>
                        
                        {result && (
                          <button
                            onClick={() => toggleDetails(testCase.id)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            {isShowingDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Test Result Details */}
                    {result && isShowingDetails && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Status:</span>
                            <ApiStatusBadge status={result.status} />
                          </div>
                          
                          {result.message && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Message:</span>
                              <span className="text-gray-900">{result.message}</span>
                            </div>
                          )}
                          
                          {result.timestamp && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Timestamp:</span>
                              <span className="text-gray-900">
                                {new Date(result.timestamp).toLocaleString()}
                              </span>
                            </div>
                          )}
                          
                          {result.data && (
                            <div className="mt-3">
                              <span className="text-sm text-gray-600">Response Data:</span>
                              <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                                {JSON.stringify(result.data, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {result.error && (
                            <div className="mt-3">
                              <span className="text-sm text-red-600">Error Details:</span>
                              <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto max-h-40 text-red-800">
                                {JSON.stringify(result.error, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTester;
