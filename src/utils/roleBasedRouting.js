// Role-based routing utilities for E_Tour application

/**
 * Get the correct dashboard route based on user role
 * @param {string} role - User role (admin, agent, client)
 * @returns {string} - The appropriate route path
 */
export const getRoleBasedRoute = (role) => {
  if (!role) {
    console.warn('No role provided, defaulting to client dashboard');
    return '/client';
  }

  const normalizedRole = role.toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'admin':
      return '/admin/';
    case 'agent':
      return '/agent/';
    case 'client':
    case 'user': // Handle alternative naming
    default:
      return '/client';
  }
};

/**
 * Get all available routes for a user role
 * @param {string} role - User role
 * @returns {object} - Object containing available routes for the role
 */
export const getRoleRoutes = (role) => {
  const normalizedRole = role?.toLowerCase().trim();
  
  const commonRoutes = {
    profile: '/profile',
    settings: '/settings',
    logout: '/logout'
  };

  switch (normalizedRole) {
    case 'admin':
      return {
        dashboard: '/admin/',
        users: '/admin/users',
        destinations: '/admin/destinations',
        tours: '/admin/tours',
        bookings: '/admin/bookings',
        payments: '/admin/payments',
        reports: '/admin/reports',
        settings: '/admin/settings',
        ...commonRoutes
      };
    
    case 'agent':
      return {
        dashboard: '/agent/',
        clients: '/agent/clients',
        bookings: '/agent/bookings',
        commissions: '/agent/commissions',
        performance: '/agent/performance',
        reports: '/agent/reports',
        ...commonRoutes
      };
    
    case 'client':
    case 'user':
    default:
      return {
        dashboard: '/client',
        bookings: '/client/bookings',
        destinations: '/destinations',
        tours: '/tours',
        favorites: '/client/favorites',
        ...commonRoutes
      };
  }
};

/**
 * Check if a user has access to a specific route
 * @param {string} userRole - User's role
 * @param {string} requestedRoute - The route being accessed
 * @returns {boolean} - Whether the user can access the route
 */
export const canAccessRoute = (userRole, requestedRoute) => {
  if (!userRole || !requestedRoute) return false;
  
  const roleRoutes = getRoleRoutes(userRole);
  const availableRoutes = Object.values(roleRoutes);
  
  // Check if the requested route matches any available route for the role
  return availableRoutes.some(route => 
    requestedRoute.startsWith(route) || route.startsWith(requestedRoute)
  );
};

/**
 * Redirect user to appropriate dashboard based on their role
 * @param {object} router - Next.js router instance
 * @param {string} role - User role
 * @param {boolean} replace - Whether to replace current history entry
 */
export const redirectToRoleDashboard = (router, role, replace = false) => {
  const route = getRoleBasedRoute(role);
  
  console.log(`Redirecting user with role "${role}" to: ${route}`);
  
  if (replace) {
    router.replace(route);
  } else {
    router.push(route);
  }
};

/**
 * Get user-friendly role name
 * @param {string} role - User role
 * @returns {string} - Formatted role name
 */
export const formatRoleName = (role) => {
  if (!role) return 'User';
  
  const normalizedRole = role.toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'admin':
      return 'Administrator';
    case 'agent':
      return 'Travel Agent';
    case 'client':
    case 'user':
      return 'Client';
    default:
      return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
};

/**
 * Get role-specific welcome message
 * @param {string} role - User role
 * @param {string} name - User name
 * @returns {string} - Welcome message
 */
export const getRoleWelcomeMessage = (role, name = 'User') => {
  const normalizedRole = role?.toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'admin':
      return `Welcome back, ${name}! Manage your platform efficiently.`;
    case 'agent':
      return `Welcome back, ${name}! Ready to help your clients explore Rwanda?`;
    case 'client':
    case 'user':
    default:
      return `Welcome back, ${name}! Ready for your next adventure?`;
  }
};

/**
 * Get role-specific navigation items
 * @param {string} role - User role
 * @returns {array} - Array of navigation items
 */
export const getRoleNavigation = (role) => {
  const normalizedRole = role?.toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'admin':
      return [
        { name: 'Dashboard', href: '/admin/', icon: 'BarChart3' },
        { name: 'Users', href: '/admin/users', icon: 'Users' },
        { name: 'Destinations', href: '/admin/destinations', icon: 'MapPin' },
        { name: 'Tours', href: '/admin/tours', icon: 'Globe' },
        { name: 'Bookings', href: '/admin/bookings', icon: 'Calendar' },
        { name: 'Payments', href: '/admin/payments', icon: 'CreditCard' },
        { name: 'Reports', href: '/admin/reports', icon: 'FileText' },
        { name: 'Settings', href: '/admin/settings', icon: 'Settings' }
      ];
    
    case 'agent':
      return [
        { name: 'Dashboard', href: '/agent/', icon: 'BarChart3' },
        { name: 'Clients', href: '/agent/clients', icon: 'Users' },
        { name: 'Bookings', href: '/agent/bookings', icon: 'Calendar' },
        { name: 'Commissions', href: '/agent/commissions', icon: 'DollarSign' },
        { name: 'Performance', href: '/agent/performance', icon: 'TrendingUp' },
        { name: 'Reports', href: '/agent/reports', icon: 'FileText' }
      ];
    
    case 'client':
    case 'user':
    default:
      return [
        { name: 'Dashboard', href: '/client', icon: 'Home' },
        { name: 'My Bookings', href: '/client/bookings', icon: 'Calendar' },
        { name: 'Destinations', href: '/destinations', icon: 'MapPin' },
        { name: 'Tours', href: '/tours', icon: 'Globe' },
        { name: 'Favorites', href: '/client/favorites', icon: 'Heart' }
      ];
  }
};

/**
 * Validate user role
 * @param {string} role - Role to validate
 * @returns {boolean} - Whether the role is valid
 */
export const isValidRole = (role) => {
  if (!role) return false;
  
  const validRoles = ['admin', 'agent', 'client', 'user'];
  return validRoles.includes(role.toLowerCase().trim());
};

/**
 * Get default route for unauthenticated users
 * @returns {string} - Default route
 */
export const getDefaultRoute = () => '/login';

/**
 * Get route after logout
 * @returns {string} - Post-logout route
 */
export const getLogoutRoute = () => '/login';
