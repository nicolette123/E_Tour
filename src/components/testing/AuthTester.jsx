// Authentication Testing Component
'use client';

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useApi';
import { testLogin } from '../../utils/apiCheck';
import { getRoleBasedRoute, redirectToRoleDashboard } from '../../utils/roleBasedRouting';
import {
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage
} from '../common/ApiComponents';
import {
  User,
  Key,
  CheckCircle,
  XCircle,
  Play,
  LogOut,
  Shield,
  BarChart3
} from 'lucide-react';

const AuthTester = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: 'carterk279@gmail.com',
    password: 'password123'
  });

  const handleTestLogin = async () => {
    setTestLoading(true);
    setTestResult(null);

    try {
      console.log('🧪 Starting comprehensive login test...');

      // Test direct API call first
      console.log('📡 Testing direct API call...');
      const directResponse = await fetch('https://echoes-of-rwanda.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'carterk279@gmail.com',
          password: 'password123'
        })
      });

      const directData = await directResponse.json();
      console.log('📡 Direct API response:', directData);

      // Test through our service
      console.log('🔧 Testing through our auth service...');
      const result = await testLogin();
      console.log('🔧 Service response:', result);

      setTestResult({
        success: result.success,
        message: result.message,
        user: result.user,
        directApiResponse: directData,
        serviceResponse: result
      });
    } catch (error) {
      console.error('🚨 Test failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        message: 'Test failed with exception'
      });
    } finally {
      setTestLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setTestResult(null);

    try {
      const response = await login(loginForm);
      setTestResult({
        success: response.success,
        user: response.data?.user,
        message: response.success ? 'Login successful!' : response.message,
        error: response.error
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        message: 'Login failed'
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setTestResult({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        message: 'Logout failed'
      });
    }
  };

  const testRoleRouting = (role) => {
    const route = getRoleBasedRoute(role);
    setTestResult({
      success: true,
      message: `Role "${role}" should redirect to: ${route}`,
      route: route
    });
  };

  const goToDashboard = () => {
    if (user && user.role) {
      redirectToRoleDashboard({ push: (path) => window.location.href = path }, user.role);
    }
  };

  const testDashboardData = async () => {
    if (!isAuthenticated || !user) {
      setTestResult({
        success: false,
        message: 'Please login first to test dashboard data'
      });
      return;
    }

    setTestLoading(true);
    try {
      console.log('📊 Testing dashboard data loading...');

      // Test dashboard stats API call
      const token = localStorage.getItem('etour_access_token');
      console.log('🔑 Using token:', token ? 'Token found' : 'No token');

      const dashboardResponse = await fetch('https://echoes-of-rwanda.onrender.com/api/v1/dashboard/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const dashboardData = await dashboardResponse.json();
      console.log('📊 Dashboard API response:', dashboardData);

      setTestResult({
        success: dashboardResponse.ok,
        message: dashboardResponse.ok ? 'Dashboard data loaded successfully' : 'Dashboard data loading failed',
        dashboardData: dashboardData,
        status: dashboardResponse.status
      });
    } catch (error) {
      console.error('📊 Dashboard test failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        message: 'Dashboard test failed'
      });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-blue-600" />
          Authentication Tester
        </h1>

        {/* Current Auth Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Current Authentication Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                {loading ? 'Checking...' : (isAuthenticated ? 'Authenticated' : 'Not Authenticated')}
              </span>
            </div>

            {user && (
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm capitalize">{user.role}</span>
                </div>
              </>
            )}
          </div>

          {user && (
            <div className="mt-3 p-3 bg-white rounded border">
              <h3 className="font-medium text-sm mb-2">User Details:</h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="mb-6">
            {testResult.success ? (
              <SuccessMessage
                message={testResult.message}
                onDismiss={() => setTestResult(null)}
              />
            ) : (
              <ErrorMessage
                error={testResult.message || testResult.error}
                onRetry={() => setTestResult(null)}
              />
            )}

            {testResult.user && (
              <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                <h3 className="font-medium text-sm mb-2 text-green-800">Login Response:</h3>
                <pre className="text-xs text-green-700 overflow-auto">
                  {JSON.stringify(testResult.user, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Test Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Test */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Test</h2>
            <p className="text-sm text-gray-600">
              Test login with the provided credentials automatically.
            </p>

            <button
              onClick={handleTestLogin}
              disabled={testLoading}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {testLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Login Test
                </>
              )}
            </button>

            {/* Dashboard Test Button */}
            {isAuthenticated && (
              <button
                onClick={testDashboardData}
                disabled={testLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {testLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Test Dashboard Data
                  </>
                )}
              </button>
            )}
          </div>

          {/* Manual Login */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Manual Login</h2>
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Logout */}
        {isAuthenticated && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}

        {/* API Configuration Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-3">API Configuration</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Base URL:</span>
                <br />
                <span className="text-gray-600">https://echoes-of-rwanda.onrender.com/api/v1</span>
              </div>
              <div>
                <span className="font-medium">Login Endpoint:</span>
                <br />
                <span className="text-gray-600">/auth/login</span>
              </div>
              <div>
                <span className="font-medium">Test Email:</span>
                <br />
                <span className="text-gray-600">carterk279@gmail.com</span>
              </div>
              <div>
                <span className="font-medium">Expected Role:</span>
                <br />
                <span className="text-gray-600">admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTester;
