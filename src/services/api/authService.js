// Authentication Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG, { STORAGE_KEYS, SUCCESS_MESSAGES } from './config';

class AuthService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Login user
  async login(credentials) {
    try {
      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.LOGIN, {
        email: credentials.email,
        password: credentials.password,
      });

      // Handle the actual API response structure
      // Now response is the direct API response: { success: true, data: { token, user }, message, ... }
      if (response.success && response.data) {
        const { token, user } = response.data;

        // Store token and user data
        this.baseService.setAccessToken(token);
        // Use the same token as refresh token for now
        this.baseService.setRefreshToken(token);
        this.setUserData(user);

        return {
          success: true,
          data: {
            user,
            token,
            message: response.message || SUCCESS_MESSAGES.LOGIN_SUCCESS,
          },
        };
      }

      return {
        success: false,
        error: response.error || 'Login failed',
        message: response.message || 'Invalid credentials',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error,
        message: error.message || 'Network error occurred',
      };
    }
  }

// Register new user - Alternative approach maintaining your expected structure
async signup(userData) {
  try {
    const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.REGISTER, {
      name: userData.name || `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'client', // Default to client role
      phone: userData.phone,
      companyName: userData.companyName,
      location: userData.location,
      notificationsEnabled: userData.notificationsEnabled !== false,
      agreedToTerms: userData.agreeToTerms || false,
    });

    if (response.success) {
      // FIXED: Correctly extract user data from API response
      // The API returns user data directly under response.data
      const apiUserData = response.data;
      
      return {
        success: true,
        data: {
          message: response.message || SUCCESS_MESSAGES.SIGNUP_SUCCESS,
          // Wrap the user data in a 'user' property to match your frontend expectations
          user: {
            id: apiUserData.id,
            name: apiUserData.name,
            email: apiUserData.email,
            role: apiUserData.role,
            emailVerified: apiUserData.emailVerified || false,
            emailSent: apiUserData.emailSent || false,
          },
          requiresVerification: apiUserData.emailVerified === false,
        },
      };
    }

    return response;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

  // Logout user
  async logout() {
    try {
      const refreshToken = this.baseService.getRefreshToken();
      
      if (refreshToken) {
        // Call logout endpoint to invalidate tokens on server
        await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.LOGOUT, {
          refreshToken,
        });
      }

      // Clear local storage
      this.baseService.clearTokens();
      this.clearUserData();

      return {
        success: true,
        data: {
          message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
        },
      };
    } catch (error) {
      // Even if server logout fails, clear local data
      this.baseService.clearTokens();
      this.clearUserData();
      
      return {
        success: true,
        data: {
          message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
        },
      };
    }
  }

  // Verify email - API expects userId and code (as per API documentation)
  async verifyEmail(userId, code) {
    try {
      // API documentation specifies: { "userId": "uuid", "code": "ABC123" }
      const payload = {
        userId: userId,
        code: code
      };

      console.log('Verifying email with payload:', payload);

      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.VERIFY_EMAIL, payload);

      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Email verified successfully',
        };
      }

      return response;
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: error.message || 'Email verification failed',
      };
    }
  }

  // Resend verification email
  async resendVerification(email) {
    try {
      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.RESEND_VERIFICATION, {
        email,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.RESET_PASSWORD_REQUEST, {
        email,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.RESET_PASSWORD, {
        token,
        newPassword,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Change password (for authenticated users)
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const response = await this.baseService.post(API_CONFIG.AUTH_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = this.baseService.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.baseService.refreshAccessToken(refreshToken);
      
      if (response.data.accessToken) {
        this.baseService.setAccessToken(response.data.accessToken);
        
        // Update refresh token if provided
        if (response.data.refreshToken) {
          this.baseService.setRefreshToken(response.data.refreshToken);
        }

        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: { message: 'Failed to refresh token' },
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.baseService.getAccessToken();
    const userData = this.getUserData();
    
    return !!(token && userData);
  }

  // Get current user data
  getUserData() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Set user data
  setUserData(userData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    }
  }

  // Clear user data
  clearUserData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
    }
  }

  // Get user role
  getUserRole() {
    const userData = this.getUserData();
    return userData?.role || null;
  }

  // Check if user has specific role
  hasRole(role) {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  }

  // Check if user is agent
  isAgent() {
    return this.hasRole('agent');
  }

  // Check if user is client
  isClient() {
    return this.hasRole('client');
  }

  // Get user permissions based on role
  getUserPermissions() {
    const role = this.getUserRole();
    
    const permissions = {
      admin: [
        'manage_users',
        'manage_destinations',
        'manage_tours',
        'manage_bookings',
        'view_analytics',
        'manage_settings',
      ],
      agent: [
        'manage_clients',
        'create_bookings',
        'view_bookings',
        'view_commissions',
        'view_performance',
      ],
      client: [
        'view_destinations',
        'view_tours',
        'create_bookings',
        'view_own_bookings',
        'manage_profile',
      ],
    };

    return permissions[role] || [];
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const userPermissions = this.getUserPermissions();
    return userPermissions.includes(permission);
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
