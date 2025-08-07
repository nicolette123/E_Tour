import axios from 'axios';

// Create a custom Axios instance
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
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
      console.error('API Error:', error.response.status, error.response.data);
      switch (error.response.status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
        case 404:
        default:
          // Handle other errors
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export the axios instance
export { api };

// Export API methods
export const get = async (url, config = {}) => {
  try {
    return await api.get(url, config);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (url, data, config = {}) => {
  try {
    return await api.post(url, data, config);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const put = async (url, data, config = {}) => {
  try {
    return await api.put(url, data, config);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const del = async (url, config = {}) => {
  try {
    return await api.delete(url, config);
  } catch (error) {
    throw new Error(error.message);
  }
};