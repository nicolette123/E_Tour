// Authentication Guard Component
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useApi';
import { LoadingSpinner } from '../common/ApiComponents';
import { 
  canAccessRoute, 
  redirectToRoleDashboard, 
  getDefaultRoute,
  isValidRole 
} from '../../utils/roleBasedRouting';

/**
 * AuthGuard component to protect routes based on authentication and role
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string|array} props.allowedRoles - Role(s) allowed to access this route
 * @param {string} props.redirectTo - Custom redirect path (optional)
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 * @param {React.ReactNode} props.fallback - Custom loading component (optional)
 */
const AuthGuard = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = null,
  requireAuth = true,
  fallback = null 
}) => {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthorization = () => {
      console.log('AuthGuard: Checking authorization...');
      console.log('Auth loading:', authLoading);
      console.log('Is authenticated:', isAuthenticated);
      console.log('User:', user);
      console.log('Allowed roles:', allowedRoles);
      console.log('Require auth:', requireAuth);

      // Still loading auth state
      if (authLoading) {
        console.log('AuthGuard: Still loading auth state');
        setIsChecking(true);
        return;
      }

      // If authentication is not required, allow access
      if (!requireAuth) {
        console.log('AuthGuard: Auth not required, allowing access');
        setIsAuthorized(true);
        setIsChecking(false);
        return;
      }

      // Check if user is authenticated
      if (!isAuthenticated || !user) {
        console.log('AuthGuard: User not authenticated, redirecting to login');
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace(getDefaultRoute());
        return;
      }

      // Check if user role is valid
      if (!isValidRole(user.role)) {
        console.log('AuthGuard: Invalid user role:', user.role);
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace(getDefaultRoute());
        return;
      }

      // If no specific roles are required, allow any authenticated user
      if (!allowedRoles || allowedRoles.length === 0) {
        console.log('AuthGuard: No specific roles required, allowing authenticated user');
        setIsAuthorized(true);
        setIsChecking(false);
        return;
      }

      // Normalize allowed roles to array
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      const normalizedAllowedRoles = rolesArray.map(role => role.toLowerCase());
      const userRole = user.role.toLowerCase();

      // Check if user has required role
      if (normalizedAllowedRoles.includes(userRole)) {
        console.log('AuthGuard: User has required role, allowing access');
        setIsAuthorized(true);
        setIsChecking(false);
        return;
      }

      // User doesn't have required role
      console.log('AuthGuard: User does not have required role');
      console.log('User role:', userRole);
      console.log('Required roles:', normalizedAllowedRoles);
      
      setIsAuthorized(false);
      setIsChecking(false);

      // Redirect to custom path or user's appropriate dashboard
      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        redirectToRoleDashboard(router, user.role, true);
      }
    };

    checkAuthorization();
  }, [
    authLoading, 
    isAuthenticated, 
    user, 
    allowedRoles, 
    requireAuth, 
    redirectTo, 
    router
  ]);

  // Show loading state
  if (isChecking || authLoading) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state (shouldn't normally be seen due to redirects)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render children if authorized
  return children;
};

/**
 * Higher-order component to wrap components with AuthGuard
 * @param {React.Component} Component - Component to protect
 * @param {object} guardOptions - AuthGuard options
 */
export const withAuthGuard = (Component, guardOptions = {}) => {
  const ProtectedComponent = (props) => (
    <AuthGuard {...guardOptions}>
      <Component {...props} />
    </AuthGuard>
  );

  ProtectedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};

/**
 * Hook to check if current user can access a specific route
 * @param {string} route - Route to check
 * @returns {boolean} - Whether user can access the route
 */
export const useCanAccessRoute = (route) => {
  const { user } = useAuth();
  
  if (!user || !route) return false;
  
  return canAccessRoute(user.role, route);
};

/**
 * Component to conditionally render content based on user role
 * @param {object} props - Component props
 * @param {string|array} props.allowedRoles - Roles allowed to see the content
 * @param {React.ReactNode} props.children - Content to render if authorized
 * @param {React.ReactNode} props.fallback - Content to render if not authorized
 */
export const RoleBasedRender = ({ allowedRoles, children, fallback = null }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback;
  }

  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const normalizedAllowedRoles = rolesArray.map(role => role.toLowerCase());
  const userRole = user.role.toLowerCase();

  if (normalizedAllowedRoles.includes(userRole)) {
    return children;
  }

  return fallback;
};

export default AuthGuard;
