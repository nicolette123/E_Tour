// E_Tour API Services - Main Export File
// This file exports all API services for easy importing throughout the application

// Import all services first
import baseApiService from './baseService';
import API_CONFIG, { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_KEYS } from './config';
import authService from './authService';
import userService from './userService';
import destinationService from './destinationService';
import tourService from './tourService';
import tripService from './tripService';
import agentService from './agentService';
import bookingService from './bookingService';
import dashboardService from './dashboardService';
import uploadService from './uploadService';

// Export individual services
export {
  baseApiService,
  API_CONFIG,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  authService,
  userService,
  destinationService,
  tourService,
  tripService,
  agentService,
  bookingService,
  dashboardService,
  uploadService
};

// API Service class that combines all services
class ApiService {
  constructor() {
    // Lazy initialization to avoid circular dependency issues
    this._auth = null;
    this._user = null;
    this._destination = null;
    this._tour = null;
    this._trip = null;
    this._agent = null;
    this._booking = null;
    this._dashboard = null;
    this._upload = null;
  }

  // Lazy getters for services
  get auth() {
    if (!this._auth) {
      this._auth = authService;
    }
    return this._auth;
  }

  get user() {
    if (!this._user) {
      this._user = userService;
    }
    return this._user;
  }

  get destination() {
    if (!this._destination) {
      this._destination = destinationService;
    }
    return this._destination;
  }

  get tour() {
    if (!this._tour) {
      this._tour = tourService;
    }
    return this._tour;
  }

  get trip() {
    if (!this._trip) {
      this._trip = tripService;
    }
    return this._trip;
  }

  get agent() {
    if (!this._agent) {
      this._agent = agentService;
    }
    return this._agent;
  }

  get booking() {
    if (!this._booking) {
      this._booking = bookingService;
    }
    return this._booking;
  }

  get dashboard() {
    if (!this._dashboard) {
      this._dashboard = dashboardService;
    }
    return this._dashboard;
  }

  get upload() {
    if (!this._upload) {
      this._upload = uploadService;
    }
    return this._upload;
  }

  // Initialize API services
  init() {
    try {
      console.log('E_Tour API Services initialized');
      return this;
    } catch (error) {
      console.error('Failed to initialize API services:', error);
      return this;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    try {
      return this.auth?.isAuthenticated() || false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Get current user
  getCurrentUser() {
    try {
      return this.auth?.getUserData() || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get user role
  getUserRole() {
    try {
      return this.auth?.getUserRole() || null;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  }

  // Check user permissions
  hasPermission(permission) {
    try {
      return this.auth?.hasPermission(permission) || false;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  // Logout and clear all data
  async logout() {
    try {
      return await this.auth?.logout() || { success: false, message: 'Auth service not available' };
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, error, message: 'Logout failed' };
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();

// Export the main API service instance
export default apiService;

// Export individual services for direct access
export const api = {
  auth: authService,
  user: userService,
  destination: destinationService,
  tour: tourService,
  trip: tripService,
  agent: agentService,
  booking: bookingService,
  dashboard: dashboardService,
  upload: uploadService,
};

// Utility functions for common API operations
export const apiUtils = {
  // Format error message for display
  formatErrorMessage: (error) => {
    if (error?.message) {
      return error.message;
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.data?.errors && Array.isArray(error.data.errors)) {
      return error.data.errors.join(', ');
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  },

  // Check if error is network related
  isNetworkError: (error) => {
    return error?.isNetworkError || false;
  },

  // Check if error is authentication related
  isAuthError: (error) => {
    return error?.status === HTTP_STATUS.UNAUTHORIZED || error?.status === HTTP_STATUS.FORBIDDEN;
  },

  // Check if error is validation related
  isValidationError: (error) => {
    return error?.status === HTTP_STATUS.BAD_REQUEST || error?.status === HTTP_STATUS.UNPROCESSABLE_ENTITY;
  },

  // Format API response for consistent handling
  formatResponse: (response) => {
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.data?.message || 'Operation completed successfully',
      };
    } else {
      return {
        success: false,
        error: response.error,
        message: apiUtils.formatErrorMessage(response.error),
      };
    }
  },

  // Handle API response with loading state
  handleApiCall: async (apiCall, setLoading = null, setError = null) => {
    try {
      if (setLoading) setLoading(true);
      if (setError) setError(null);

      const response = await apiCall();
      
      if (response.success) {
        return response;
      } else {
        const errorMessage = apiUtils.formatErrorMessage(response.error);
        if (setError) setError(errorMessage);
        return response;
      }
    } catch (error) {
      const errorMessage = apiUtils.formatErrorMessage(error);
      if (setError) setError(errorMessage);
      return {
        success: false,
        error: error,
        message: errorMessage,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },

  // Debounce function for search API calls
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format date for API calls
  formatDateForApi: (date) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  },

  // Parse API date response
  parseApiDate: (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  },

  // Format currency for display
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  // Generate unique ID for temporary records
  generateTempId: () => {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Convert file to base64
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  // Download file from URL
  downloadFile: (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Copy text to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  },
};

// Export everything for convenience
export {
  apiService,
};