// API Configuration for E_Tour Backend
const API_CONFIG = {
  // Base URL for the E_Tour backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://echoes-of-rwanda.onrender.com/api/v1',
  
  // API Version
  VERSION: 'v1',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Authentication endpoints
  AUTH_ENDPOINTS: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  
  // User management endpoints
  USER_ENDPOINTS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    GET_USERS: '/users',
    GET_USER: '/users/:id',
    CREATE_USER: '/users',
    UPDATE_USER: '/users/:id',
    DELETE_USER: '/users/:id',
    UPLOAD_AVATAR: '/users/avatar',
  },
  
  // Destinations endpoints
  DESTINATION_ENDPOINTS: {
    GET_ALL: '/destinations',
    GET_BY_ID: '/destinations/:id',
    CREATE: '/destinations',
    UPDATE: '/destinations/:id',
    DELETE: '/destinations/:id',
    SEARCH: '/destinations/search',
    FEATURED: '/destinations/featured',
    POPULAR: '/destinations/popular',
    UPLOAD_IMAGES: '/destinations/:id/images',
  },
  
  // Tour packages endpoints
  TOUR_ENDPOINTS: {
    GET_ALL: '/tours',
    GET_BY_ID: '/tours/:id',
    CREATE: '/tours',
    UPDATE: '/tours/:id',
    DELETE: '/tours/:id',
    SEARCH: '/tours/search',
    FILTER: '/tours/filter',
    AVAILABILITY: '/tours/:id/availability',
    PRICING: '/tours/:id/pricing',
  },
  
  // Booking endpoints
  BOOKING_ENDPOINTS: {
    GET_ALL: '/bookings',
    GET_BY_ID: '/bookings/:id',
    CREATE: '/bookings',
    UPDATE: '/bookings/:id',
    CANCEL: '/bookings/:id/cancel',
    CONFIRM: '/bookings/:id/confirm',
    GET_USER_BOOKINGS: '/bookings/user/:userId',
    GET_BOOKING_HISTORY: '/bookings/history',
  },
  
  // Dashboard endpoints
  DASHBOARD_ENDPOINTS: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
    RECENT_BOOKINGS: '/dashboard/recent-bookings',
    REVENUE: '/dashboard/revenue',
    USER_ACTIVITY: '/dashboard/user-activity',
  },
  
  // File upload endpoints
  UPLOAD_ENDPOINTS: {
    SINGLE_FILE: '/uploads/single',
    MULTIPLE_FILES: '/uploads/multiple',
    DESTINATION_IMAGES: '/uploads/destinations',
    TOUR_IMAGES: '/uploads/tours',
    USER_AVATAR: '/uploads/avatar',
  },
  
  // Admin endpoints
  ADMIN_ENDPOINTS: {
    USERS: '/admin/users',
    BOOKINGS: '/admin/bookings',
    DESTINATIONS: '/admin/destinations',
    TOURS: '/admin/tours',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
  
  // Agent endpoints
  AGENT_ENDPOINTS: {
    CLIENTS: '/agent/clients',
    BOOKINGS: '/agent/bookings',
    COMMISSIONS: '/agent/commissions',
    PERFORMANCE: '/agent/performance',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  DATA_SAVED: 'Data saved successfully!',
  DATA_DELETED: 'Data deleted successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'etour_access_token',
  REFRESH_TOKEN: 'etour_refresh_token',
  USER_DATA: 'etour_user_data',
  USER_PREFERENCES: 'etour_user_preferences',
  CART_DATA: 'etour_cart_data',
};

export default API_CONFIG;
