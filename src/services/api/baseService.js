// Base API Service with Axios configuration and interceptors
import axios from 'axios';
import API_CONFIG, { HTTP_STATUS, ERROR_MESSAGES, STORAGE_KEYS } from './config';

class BaseApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.DEFAULT_HEADERS,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor - Add auth token to requests
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add request timestamp for debugging
        config.metadata = { startTime: new Date() };
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle responses and errors
    this.api.interceptors.response.use(
      (response) => {
        // Add response time for debugging
        if (response.config.metadata) {
          response.config.metadata.endTime = new Date();
          response.config.metadata.duration = 
            response.config.metadata.endTime - response.config.metadata.startTime;
        }
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle token refresh for 401 errors
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshAccessToken(refreshToken);
              const newToken = response.data.accessToken;
              
              this.setAccessToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Token management methods
  getAccessToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
    return null;
  }

  setAccessToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  }

  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    return null;
  }

  setRefreshToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    }
  }

  clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  }

  // Refresh token method
  async refreshAccessToken(refreshToken) {
    return axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
      refreshToken
    });
  }

  // Handle authentication failure
  handleAuthFailure() {
    this.clearTokens();
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Error handling method
  handleError(error) {
    const errorResponse = {
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      status: null,
      data: null,
      isNetworkError: false,
    };

    if (error.response) {
      // Server responded with error status
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;

      switch (error.response.status) {
        case HTTP_STATUS.BAD_REQUEST:
          errorResponse.message = error.response.data?.message || 'Invalid request data';
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          errorResponse.message = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case HTTP_STATUS.FORBIDDEN:
          errorResponse.message = ERROR_MESSAGES.FORBIDDEN;
          break;
        case HTTP_STATUS.NOT_FOUND:
          errorResponse.message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case HTTP_STATUS.UNPROCESSABLE_ENTITY:
          errorResponse.message = error.response.data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          errorResponse.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          errorResponse.message = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          errorResponse.message = error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    } else if (error.request) {
      // Network error
      errorResponse.isNetworkError = true;
      errorResponse.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      errorResponse.message = ERROR_MESSAGES.TIMEOUT_ERROR;
    }

    // Log error for debugging
    console.error('API Error:', {
      message: errorResponse.message,
      status: errorResponse.status,
      url: error.config?.url,
      method: error.config?.method,
      data: errorResponse.data,
    });

    return errorResponse;
  }

  // HTTP Methods
  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      // Return the API response directly since it already has the correct structure
      return response.data;
    } catch (error) {
      console.error('API GET error:', error);

      // Handle different types of errors
      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Server error',
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Network error - please check your connection',
          message: 'Unable to connect to server'
        };
      } else {
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
          message: 'Request failed'
        };
      }
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      // Return the API response directly since it already has the correct structure
      return response.data;
    } catch (error) {
      console.error('API POST error:', error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        return {
          success: false,
          error: error.response.data?.message || 'Server error',
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        // Network error - could be CORS, connection, or server issues
        let errorMessage = 'Network error - please check your connection';
        let userMessage = 'Unable to connect to server';

        // Check for CORS-specific errors
        if (error.message && error.message.includes('CORS')) {
          errorMessage = 'CORS policy error - server configuration issue';
          userMessage = 'Server configuration error. Please try again or contact support.';
        } else if (error.message && error.message.includes('ERR_FAILED')) {
          errorMessage = 'Network request failed - server may be unavailable';
          userMessage = 'Server is currently unavailable. Please try again later.';
        } else if (error.message && error.message.includes('ERR_NETWORK')) {
          errorMessage = 'Network connection error';
          userMessage = 'Please check your internet connection and try again.';
        }

        return {
          success: false,
          error: errorMessage,
          message: userMessage,
          isNetworkError: true
        };
      } else {
        // Other error
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
          message: 'Request failed'
        };
      }
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error('API PUT error:', error);

      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Server error',
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Network error - please check your connection',
          message: 'Unable to connect to server'
        };
      } else {
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
          message: 'Request failed'
        };
      }
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.api.patch(url, data, config);
      return response.data;
    } catch (error) {
      console.error('API PATCH error:', error);

      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Server error',
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Network error - please check your connection',
          message: 'Unable to connect to server'
        };
      } else {
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
          message: 'Request failed'
        };
      }
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('API DELETE error:', error);

      if (error.response) {
        return {
          success: false,
          error: error.response.data?.message || 'Server error',
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Network error - please check your connection',
          message: 'Unable to connect to server'
        };
      } else {
        return {
          success: false,
          error: error.message || 'Unknown error occurred',
          message: 'Request failed'
        };
      }
    }
  }

  // File upload method
  async uploadFile(url, file, onUploadProgress = null) {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }

    return this.post(url, formData, config);
  }

  // Multiple file upload method
  async uploadMultipleFiles(url, files, onUploadProgress = null) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }

    return this.post(url, formData, config);
  }
}

// Create and export singleton instance
const baseApiService = new BaseApiService();
export default baseApiService;