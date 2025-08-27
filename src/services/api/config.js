// API Configuration for E_Tour Backend
const API_CONFIG = {
  // Base URL for the E_Tour backend API (matching the API documentation)
  BASE_URL: 'https://echoes-of-rwanda.onrender.com',

  // API Version
  VERSION: 'v1',

  // Request timeout in milliseconds
  TIMEOUT: 30000,

  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // Authentication endpoints (matching API documentation)
  AUTH_ENDPOINTS: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    VERIFY_EMAIL: '/api/v1/auth/verify-email',
    RESEND_VERIFICATION: '/api/v1/auth/resend-verification',
    RESET_PASSWORD_REQUEST: '/api/v1/auth/reset-password-request',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
  },
  
  // User profile endpoints (matching API documentation)
  USER_ENDPOINTS: {
    PROFILE: '/api/v1/profile',
    UPDATE_PROFILE: '/api/v1/profile',
    UPDATE_TERMS: '/api/v1/terms-agreement',
    UPDATE_NOTIFICATIONS: '/api/v1/notification-preferences',
  },

  // Trip endpoints (matching API documentation)
  TRIP_ENDPOINTS: {
    GET_ALL: '/api/v1/trips',
    GET_BY_ID: '/api/v1/trips/:id',
    GET_TRENDING: '/api/v1/trending',
    BOOK_TRIP: '/api/v1/trips/:id/book',
    GET_BOOKINGS: '/api/v1/bookings',
    CANCEL_BOOKING: '/api/v1/bookings/:id/cancel',
    SUBMIT_REVIEW: '/api/v1/trips/:id/review',
    CREATE_CUSTOM_TRIP: '/api/v1/custom-trips',
    GET_CUSTOM_TRIPS: '/api/v1/custom-trips',
    GET_CUSTOM_TRIP_BY_ID: '/api/v1/custom-trips/:id',
  },
  
  // Agent endpoints (matching API documentation)
  AGENT_ENDPOINTS: {
    CREATE_TRIP: '/api/v1/agent/trips',
    GET_TRIPS: '/api/v1/agent/trips',
    GET_TRIP_BY_ID: '/api/v1/agent/trips/:id',
    UPDATE_TRIP: '/api/v1/agent/trips/:id',
    DELETE_TRIP: '/api/v1/agent/trips/:id',
    GET_BOOKINGS: '/api/v1/agent/bookings',
    GET_PERFORMANCE: '/api/v1/agent/performance',
    CREATE_BOOKING: '/api/v1/agent/bookings',
  },

  // Admin endpoints (matching API documentation)
  ADMIN_ENDPOINTS: {
    GET_USERS: '/api/v1/admin/users',
    GET_USER_BY_ID: '/api/v1/admin/users/:id',
    SUSPEND_USER: '/api/v1/admin/users/:id/suspend',
    REACTIVATE_USER: '/api/v1/admin/users/:id/reactivate',
    GET_TRIPS: '/api/v1/admin/trips',
    UPDATE_TRIP: '/api/v1/admin/trips/:id',
    DELETE_TRIP: '/api/v1/admin/trips/:id',
    GET_BOOKINGS: '/api/v1/admin/bookings',
    GET_CUSTOM_TRIPS: '/api/v1/admin/custom-trips',
    ASSIGN_AGENT: '/api/v1/admin/custom-trips/:id/assign',
    GET_STATS: '/api/v1/admin/stats',
    GET_CONTACT_MESSAGES: '/api/v1/admin/contact-messages',
    UPDATE_CONTACT_MESSAGE: '/api/v1/admin/contact-messages/:id',
  },

  // Job marketplace endpoints (matching API documentation)
  JOB_ENDPOINTS: {
    CREATE_JOB: '/api/v1/jobs',
    GET_JOBS: '/api/v1/jobs',
    GET_AVAILABLE_JOBS: '/api/v1/jobs/available',
    GET_JOB_BY_ID: '/api/v1/jobs/:id',
    UPDATE_JOB: '/api/v1/jobs/:id',
    DELETE_JOB: '/api/v1/jobs/:id',
    APPLY_FOR_JOB: '/api/v1/jobs/:id/apply',
    GET_JOB_APPLICATIONS: '/api/v1/jobs/:id/applications',
    ACCEPT_APPLICATION: '/api/v1/jobs/:jobId/applications/:applicationId/accept',
    REJECT_APPLICATION: '/api/v1/jobs/:jobId/applications/:applicationId/reject',
  },

  // Token system endpoints (matching API documentation)
  TOKEN_ENDPOINTS: {
    GET_PACKAGES: '/api/v1/tokens/packages',
    PURCHASE_TOKENS: '/api/v1/tokens/purchase',
    GET_BALANCE: '/api/v1/tokens/balance',
    GET_HISTORY: '/api/v1/tokens/history',
  },

  // Search endpoints (matching API documentation)
  SEARCH_ENDPOINTS: {
    SEARCH: '/api/v1/search',
    GET_SUGGESTIONS: '/api/v1/search/suggestions',
  },

  // Notification endpoints (matching API documentation)
  NOTIFICATION_ENDPOINTS: {
    GET_NOTIFICATIONS: '/api/v1/notifications',
    MARK_AS_READ: '/api/v1/notifications/mark-read',
    MARK_ALL_AS_READ: '/api/v1/notifications/mark-all-read',
  },

  // Contact endpoints (matching API documentation)
  CONTACT_ENDPOINTS: {
    SUBMIT_MESSAGE: '/api/v1/contact',
  },

  // Upload endpoints (matching API documentation)
  UPLOAD_ENDPOINTS: {
    UPLOAD_IMAGE: '/api/v1/upload/image',
    UPLOAD_PROFILE: '/api/v1/upload/profile',
    DELETE_IMAGE: '/api/v1/upload/image',
  },

  // Health check endpoints (matching API documentation)
  HEALTH_ENDPOINTS: {
    BASIC: '/api/v1/health',
    DETAILED: '/api/v1/health/detailed',
    HEARTBEAT: '/health/heartbeat',
    READY: '/health/ready',
    LIVE: '/health/live',
    METRICS: '/health/metrics',
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