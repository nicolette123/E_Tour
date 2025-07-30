import axios from 'axios';

// Create a custom Axios instance
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers here
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('API Error:', error.response.status, error.response.data);
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            // Redirect to login or clear token
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        default:
          // Handle other errors
      }
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
    } else {
      // Error setting up request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Example API methods
export const apiMethods = {
  // GET request
  get: async (url, config = {}) => {
    try {
      return await api.get(url, config);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // POST request
  post: async (url, data, config = {}) => {
    try {
      return await api.post(url, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // PUT request
  put: async (url, data, config = {}) => {
    try {
      return await api.put(url, data, config);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      return await api.delete(url, config);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default api;