import axios from 'axios';

// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://echoes-of-rwanda-backend.onrender.com/api';

// Create a custom Axios instance with enhanced configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Increased timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor with enhanced token handling
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;

    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    }

    // Return the data directly for easier consumption
    return response.data;
  },
  (error) => {
    // Enhanced error handling with user-friendly messages
    const errorResponse = {
      message: 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data,
      isNetworkError: !error.response,
    };

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorResponse.message = data?.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          errorResponse.message = 'Authentication required. Please log in.';
          // Clear invalid token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }
          }
          break;
        case 403:
          errorResponse.message = 'Access denied. You don\'t have permission to perform this action.';
          break;
        case 404:
          errorResponse.message = 'The requested resource was not found.';
          break;
        case 422:
          errorResponse.message = data?.message || 'Validation error. Please check your input.';
          break;
        case 429:
          errorResponse.message = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorResponse.message = 'Server error. Please try again later.';
          break;
        case 503:
          errorResponse.message = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          errorResponse.message = data?.message || `Request failed with status ${status}`;
      }

      console.error(`❌ API Error: ${status} - ${errorResponse.message}`);
    } else if (error.request) {
      // Network error
      errorResponse.message = 'Network error. Please check your internet connection.';
      errorResponse.isNetworkError = true;
      console.error('❌ Network Error:', error.request);
    } else {
      // Request setup error
      errorResponse.message = error.message || 'Request configuration error';
      console.error('❌ Request Error:', error.message);
    }

    return Promise.reject(errorResponse);
  }
);

// Export the axios instance
export { api };

// Enhanced API methods with better error handling
export const get = async (url, config = {}) => {
  try {
    return await api.get(url, config);
  } catch (error) {
    throw error; // Re-throw the enhanced error from interceptor
  }
};

export const post = async (url, data, config = {}) => {
  try {
    return await api.post(url, data, config);
  } catch (error) {
    throw error; // Re-throw the enhanced error from interceptor
  }
};

export const put = async (url, data, config = {}) => {
  try {
    return await api.put(url, data, config);
  } catch (error) {
    throw error; // Re-throw the enhanced error from interceptor
  }
};

export const patch = async (url, data, config = {}) => {
  try {
    return await api.patch(url, data, config);
  } catch (error) {
    throw error; // Re-throw the enhanced error from interceptor
  }
};

export const del = async (url, config = {}) => {
  try {
    return await api.delete(url, config);
  } catch (error) {
    throw error; // Re-throw the enhanced error from interceptor
  }
};

// Tourism-specific API services
export const tourismAPI = {
  // Authentication endpoints
  auth: {
    login: (credentials) => post('/auth/login', credentials),
    register: (userData) => post('/auth/register', userData),
    logout: () => post('/auth/logout'),
    refreshToken: () => post('/auth/refresh'),
    forgotPassword: (email) => post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => post('/auth/reset-password', { token, password }),
    verifyEmail: (token) => post('/auth/verify-email', { token }),
  },

  // User profile endpoints
  user: {
    getProfile: () => get('/user/profile'),
    updateProfile: (data) => put('/user/profile', data),
    uploadAvatar: (file) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return post('/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    changePassword: (data) => put('/user/change-password', data),
    deleteAccount: () => del('/user/account'),
  },

  // Tour packages endpoints
  tours: {
    getAll: (params = {}) => get('/tours', { params }),
    getById: (id) => get(`/tours/${id}`),
    getFeatured: () => get('/tours/featured'),
    getPopular: () => get('/tours/popular'),
    search: (query) => get('/tours/search', { params: { q: query } }),
    getByCategory: (category) => get(`/tours/category/${category}`),
    getByDestination: (destination) => get(`/tours/destination/${destination}`),
    create: (tourData) => post('/tours', tourData),
    update: (id, tourData) => put(`/tours/${id}`, tourData),
    delete: (id) => del(`/tours/${id}`),
  },

  // Destinations endpoints
  destinations: {
    getAll: () => get('/destinations'),
    getById: (id) => get(`/destinations/${id}`),
    getFeatured: () => get('/destinations/featured'),
    getPopular: () => get('/destinations/popular'),
    create: (destinationData) => post('/destinations', destinationData),
    update: (id, destinationData) => put(`/destinations/${id}`, destinationData),
    delete: (id) => del(`/destinations/${id}`),
  },

  // Bookings endpoints
  bookings: {
    getAll: (params = {}) => get('/bookings', { params }),
    getById: (id) => get(`/bookings/${id}`),
    getUserBookings: () => get('/bookings/user'),
    create: (bookingData) => post('/bookings', bookingData),
    update: (id, bookingData) => put(`/bookings/${id}`, bookingData),
    cancel: (id) => patch(`/bookings/${id}/cancel`),
    confirm: (id) => patch(`/bookings/${id}/confirm`),
    delete: (id) => del(`/bookings/${id}`),
  },

  // Trip requests endpoints
  tripRequests: {
    getAll: (params = {}) => get('/trip-requests', { params }),
    getById: (id) => get(`/trip-requests/${id}`),
    getUserRequests: () => get('/trip-requests/user'),
    create: (requestData) => post('/trip-requests', requestData),
    update: (id, requestData) => put(`/trip-requests/${id}`, requestData),
    delete: (id) => del(`/trip-requests/${id}`),
    respond: (id, response) => post(`/trip-requests/${id}/respond`, response),
  },

  // Reviews endpoints
  reviews: {
    getAll: (params = {}) => get('/reviews', { params }),
    getById: (id) => get(`/reviews/${id}`),
    getByTour: (tourId) => get(`/tours/${tourId}/reviews`),
    create: (reviewData) => post('/reviews', reviewData),
    update: (id, reviewData) => put(`/reviews/${id}`, reviewData),
    delete: (id) => del(`/reviews/${id}`),
    like: (id) => post(`/reviews/${id}/like`),
    unlike: (id) => del(`/reviews/${id}/like`),
  },

  // Gallery endpoints
  gallery: {
    getAll: (params = {}) => get('/gallery', { params }),
    getById: (id) => get(`/gallery/${id}`),
    getByTour: (tourId) => get(`/tours/${tourId}/gallery`),
    upload: (files, metadata = {}) => {
      const formData = new FormData();
      if (Array.isArray(files)) {
        files.forEach(file => formData.append('images', file));
      } else {
        formData.append('images', files);
      }
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
      return post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    delete: (id) => del(`/gallery/${id}`),
  },

  // Payment endpoints
  payments: {
    createPaymentIntent: (amount, currency = 'USD') =>
      post('/payments/create-intent', { amount, currency }),
    confirmPayment: (paymentIntentId) =>
      post('/payments/confirm', { paymentIntentId }),
    getPaymentHistory: () => get('/payments/history'),
    refund: (paymentId, amount) =>
      post('/payments/refund', { paymentId, amount }),
  },

  // Statistics endpoints (for admin dashboard)
  stats: {
    getDashboard: () => get('/stats/dashboard'),
    getBookingStats: (period = '30d') => get(`/stats/bookings?period=${period}`),
    getRevenueStats: (period = '30d') => get(`/stats/revenue?period=${period}`),
    getUserStats: (period = '30d') => get(`/stats/users?period=${period}`),
    getTourStats: () => get('/stats/tours'),
  },

  // Notifications endpoints
  notifications: {
    getAll: () => get('/notifications'),
    markAsRead: (id) => patch(`/notifications/${id}/read`),
    markAllAsRead: () => patch('/notifications/read-all'),
    delete: (id) => del(`/notifications/${id}`),
    getUnreadCount: () => get('/notifications/unread-count'),
  },
};

// Utility functions for common operations
export const apiUtils = {
  // Handle file uploads with progress
  uploadWithProgress: (url, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(percentCompleted);
      },
    });
  },

  // Batch requests
  batch: async (requests) => {
    try {
      const responses = await Promise.allSettled(requests);
      return responses.map((response, index) => ({
        success: response.status === 'fulfilled',
        data: response.status === 'fulfilled' ? response.value : null,
        error: response.status === 'rejected' ? response.reason : null,
        index,
      }));
    } catch (error) {
      throw error;
    }
  },

  // Retry failed requests
  retry: async (apiCall, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        if (attempt === maxRetries || !error.isNetworkError) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  },
};