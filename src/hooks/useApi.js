// Custom React Hooks for API Integration
import { useState, useEffect, useCallback, useRef } from 'react';

// Lazy import to avoid initialization issues
let apiService = null;
let apiUtils = null;

const getApiService = async () => {
  if (!apiService) {
    try {
      const apiModule = await import('../services/api');
      apiService = apiModule.default || apiModule.apiService;
      apiUtils = apiModule.apiUtils;
    } catch (error) {
      console.error('Failed to load API services:', error);
      // Return a mock service to prevent crashes
      return {
        auth: {
          isAuthenticated: () => false,
          getUserData: () => null,
          getUserRole: () => null,
          hasPermission: () => false,
          login: async () => ({ success: false, message: 'API service not available' }),
          logout: async () => ({ success: false, message: 'API service not available' })
        }
      };
    }
  }
  return apiService;
};

const getApiUtils = async () => {
  if (!apiUtils) {
    try {
      const apiModule = await import('../services/api');
      apiUtils = apiModule.apiUtils;
    } catch (error) {
      console.error('Failed to load API utils:', error);
      // Return mock utils
      return {
        formatErrorMessage: (error) => error?.message || 'Unknown error',
        formatCurrency: (amount, currency = 'USD') => `${currency} ${amount}`,
        parseApiDate: (date) => date ? new Date(date) : null
      };
    }
  }
  return apiUtils;
};

// Generic API hook for any API call
export const useApi = (apiCall, dependencies = [], options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(options.immediate !== false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    if (!mountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiCall(...args);
      
      if (!mountedRef.current) return;

      if (response.success) {
        setData(response.data);
        setLastFetch(new Date());
        return response;
      } else {
        const utils = await getApiUtils();
        const errorMessage = utils.formatErrorMessage(response.error);
        setError(errorMessage);
        return response;
      }
    } catch (err) {
      if (!mountedRef.current) return;

      const utils = await getApiUtils();
      const errorMessage = utils.formatErrorMessage(err);
      setError(errorMessage);
      return {
        success: false,
        error: err,
        message: errorMessage,
      };
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, dependencies);

  const refresh = useCallback(() => {
    return execute();
  }, [execute]);

  const reset = useCallback(() => {
    setData(options.initialData || null);
    setError(null);
    setLoading(false);
  }, [options.initialData]);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, dependencies);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    refresh,
    reset,
    lastFetch,
  };
};

// Authentication hooks
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for stored authentication data
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);

            // Verify token is still valid in background
            const api = await getApiService();
            const response = await api.user.getProfile();

            if (response.success) {
              // Update with fresh data
              setUser(response.data);
              localStorage.setItem('userData', JSON.stringify(response.data));
            } else if (response.status === 401) {
              // Token expired, clear auth
              await logout();
            }
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            await logout();
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const api = await getApiService();
      const response = await api.auth.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error, message: 'Login failed' };
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      const api = await getApiService();
      return await api.auth.signup(userData);
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error, message: 'Signup failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Clear local storage first
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
      }

      // Clear state
      setUser(null);
      setIsAuthenticated(false);

      // Try to call logout API (optional, don't fail if it doesn't work)
      try {
        const api = await getApiService();
        await api.auth.logout();
      } catch (apiError) {
        console.warn('Logout API call failed:', apiError);
      }

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);

      // Clear local storage even if API call fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
      }

      setUser(null);
      setIsAuthenticated(false);
      return { success: true, message: 'Logged out successfully' };
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const api = await getApiService();
      const response = await api.user.updateProfile(profileData);
      if (response.success) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error, message: 'Profile update failed' };
    }
  }, []);

  const hasRole = useCallback(async (role) => {
    try {
      const api = await getApiService();
      return api.getUserRole() === role;
    } catch (error) {
      console.error('Error checking role:', error);
      return false;
    }
  }, []);

  const hasPermission = useCallback(async (permission) => {
    try {
      const api = await getApiService();
      return api.hasPermission(permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    hasRole,
    hasPermission,
  };
};

// Destinations hook
export const useDestinations = (params = {}) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.destination.getDestinations(params);
    },
    [JSON.stringify(params)],
    { immediate: true }
  );
};

// Single destination hook
export const useDestination = (destinationId) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.destination.getDestinationById(destinationId);
    },
    [destinationId],
    { immediate: !!destinationId }
  );
};

// Tours hook
export const useTours = (params = {}) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.tour.getTours(params);
    },
    [JSON.stringify(params)],
    { immediate: true }
  );
};

// Single tour hook
export const useTour = (tourId) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.tour.getTourById(tourId);
    },
    [tourId],
    { immediate: !!tourId }
  );
};

// Bookings hook
export const useBookings = (params = {}) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.booking.getBookings(params);
    },
    [JSON.stringify(params)],
    { immediate: true }
  );
};

// User bookings hook
export const useMyBookings = (params = {}) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.booking.getMyBookings(params);
    },
    [JSON.stringify(params)],
    { immediate: true }
  );
};

// Dashboard stats hook
export const useDashboardStats = (params = {}) => {
  return useApi(
    async () => {
      const api = await getApiService();
      return api.dashboard.getDashboardStats(params);
    },
    [JSON.stringify(params)],
    { immediate: true }
  );
};

// Simple debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Search hook with debouncing
export const useSearch = (searchFunction, delay = 500) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchFunction(searchQuery);
        if (response.success) {
          setResults(response.data.results || response.data);
        } else {
          const utils = await getApiUtils();
          setError(utils.formatErrorMessage(response.error));
        }
      } catch (err) {
        const utils = await getApiUtils();
        setError(utils.formatErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }, delay),
    [searchFunction, delay]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults: () => setResults([]),
  };
};

// File upload hook
export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file, options = {}) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const uploadOptions = {
      ...options,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
        
        if (options.onUploadProgress) {
          options.onUploadProgress(progressEvent);
        }
      },
    };

    try {
      const api = await getApiService();
      const utils = await getApiUtils();
      const response = await api.upload.uploadSingleFile(file, uploadOptions);

      if (response.success) {
        setProgress(100);
        return response;
      } else {
        setError(utils.formatErrorMessage(response.error));
        return response;
      }
    } catch (err) {
      const utils = await getApiUtils();
      setError(utils.formatErrorMessage(err));
      return {
        success: false,
        error: err,
        message: utils.formatErrorMessage(err),
      };
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadMultipleFiles = useCallback(async (files, options = {}) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const uploadOptions = {
      ...options,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
        
        if (options.onUploadProgress) {
          options.onUploadProgress(progressEvent);
        }
      },
    };

    try {
      const api = await getApiService();
      const utils = await getApiUtils();
      const response = await api.upload.uploadMultipleFiles(files, uploadOptions);

      if (response.success) {
        setProgress(100);
        return response;
      } else {
        setError(utils.formatErrorMessage(response.error));
        return response;
      }
    } catch (err) {
      const utils = await getApiUtils();
      setError(utils.formatErrorMessage(err));
      return {
        success: false,
        error: err,
        message: utils.formatErrorMessage(err),
      };
    } finally {
      setUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    uploading,
    progress,
    error,
    uploadFile,
    uploadMultipleFiles,
    reset,
  };
};

// Pagination hook
export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const updatePagination = useCallback((paginationData) => {
    if (paginationData) {
      setTotal(paginationData.total || 0);
      setTotalPages(paginationData.totalPages || Math.ceil((paginationData.total || 0) / limit));
    }
  }, [limit]);

  const goToPage = useCallback((newPage) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  return {
    page,
    limit,
    total,
    totalPages,
    setPage: goToPage,
    nextPage,
    prevPage,
    changeLimit,
    updatePagination,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

// Local storage hook for caching API data
export const useApiCache = (key, apiCall, dependencies = [], ttl = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCachedData = useCallback(() => {
    try {
      const cached = localStorage.getItem(`api_cache_${key}`);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return cachedData;
        }
      }
    } catch (err) {
      console.warn('Failed to read from cache:', err);
    }
    return null;
  }, [key, ttl]);

  const setCachedData = useCallback((data) => {
    try {
      localStorage.setItem(`api_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.warn('Failed to write to cache:', err);
    }
  }, [key]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Try to get cached data first
    const cachedData = getCachedData();
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    try {
      const response = await apiCall();
      if (response.success) {
        setData(response.data);
        setCachedData(response.data);
      } else {
        const utils = await getApiUtils();
        setError(utils.formatErrorMessage(response.error));
      }
    } catch (err) {
      const utils = await getApiUtils();
      setError(utils.formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [apiCall, getCachedData, setCachedData]);

  const clearCache = useCallback(() => {
    localStorage.removeItem(`api_cache_${key}`);
  }, [key]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    clearCache,
  };
};

// Toast notification hook for API feedback
export const useApiToast = () => {
  const showToast = useCallback((message, type = 'info', duration = 5000) => {
    // This would integrate with your toast notification system
    // For now, we'll use a simple console log
    console.log(`[${type.toUpperCase()}] ${message}`);

    // You can replace this with your actual toast implementation
    // Example: toast.show({ message, type, duration });
  }, []);

  const showSuccess = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  const showError = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  const showWarning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  const showInfo = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Enhanced API hook with automatic error handling and toast notifications
export const useApiWithToast = (apiCall, dependencies = [], options = {}) => {
  const { showSuccess, showError } = useApiToast();
  const apiResult = useApi(apiCall, dependencies, options);

  useEffect(() => {
    if (apiResult.error && options.showErrorToast !== false) {
      showError(apiResult.error);
    }
  }, [apiResult.error, showError, options.showErrorToast]);

  const executeWithToast = useCallback(async (...args) => {
    const response = await apiResult.execute(...args);

    if (response.success && options.successMessage) {
      showSuccess(options.successMessage);
    }

    return response;
  }, [apiResult.execute, showSuccess, options.successMessage]);

  return {
    ...apiResult,
    execute: executeWithToast,
  };
};

// Optimistic updates hook
export const useOptimisticUpdate = (apiCall, updateFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOptimistic, setIsOptimistic] = useState(false);

  const execute = useCallback(async (optimisticData, ...args) => {
    setLoading(true);
    setError(null);
    setIsOptimistic(true);

    // Apply optimistic update
    const previousData = data;
    setData(updateFunction(data, optimisticData));

    try {
      const response = await apiCall(...args);

      if (response.success) {
        setData(response.data);
      } else {
        // Revert optimistic update on error
        setData(previousData);
        const utils = await getApiUtils();
        setError(utils.formatErrorMessage(response.error));
      }

      return response;
    } catch (err) {
      // Revert optimistic update on error
      setData(previousData);
      const utils = await getApiUtils();
      setError(utils.formatErrorMessage(err));
      return {
        success: false,
        error: err,
        message: utils.formatErrorMessage(err),
      };
    } finally {
      setLoading(false);
      setIsOptimistic(false);
    }
  }, [apiCall, updateFunction, data]);

  return {
    data,
    loading,
    error,
    isOptimistic,
    execute,
    setData,
  };
};

// Retry hook for failed API calls
export const useApiRetry = (apiCall, maxRetries = 3, retryDelay = 1000) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const executeWithRetry = useCallback(async (...args) => {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);

        if (attempt > 0) {
          setIsRetrying(true);
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }

        const response = await apiCall(...args);

        if (response.success) {
          setRetryCount(0);
          setIsRetrying(false);
          return response;
        } else if (attempt === maxRetries) {
          lastError = response.error;
          break;
        }
      } catch (error) {
        lastError = error;
        if (attempt === maxRetries) {
          break;
        }
      }
    }

    setIsRetrying(false);
    const utils = await getApiUtils();
    return {
      success: false,
      error: lastError,
      message: utils.formatErrorMessage(lastError),
    };
  }, [apiCall, maxRetries, retryDelay]);

  return {
    execute: executeWithRetry,
    retryCount,
    isRetrying,
    maxRetries,
  };
};
