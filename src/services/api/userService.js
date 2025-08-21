// User Management Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG, { SUCCESS_MESSAGES } from './config';

class UserService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await this.baseService.get(API_CONFIG.USER_ENDPOINTS.PROFILE);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await this.baseService.put(API_CONFIG.USER_ENDPOINTS.UPDATE_PROFILE, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        address: profileData.address,
        city: profileData.city,
        country: profileData.country,
        bio: profileData.bio,
        preferences: profileData.preferences,
      });

      if (response.success) {
        // Update local user data
        const currentUser = JSON.parse(localStorage.getItem('etour_user_data') || '{}');
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('etour_user_data', JSON.stringify(updatedUser));

        return {
          success: true,
          data: {
            user: updatedUser,
            message: SUCCESS_MESSAGES.PROFILE_UPDATED,
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

  // Upload user avatar
  async uploadAvatar(file, onUploadProgress = null) {
    try {
      const response = await this.baseService.uploadFile(
        API_CONFIG.USER_ENDPOINTS.UPLOAD_AVATAR,
        file,
        onUploadProgress
      );

      if (response.success) {
        // Update local user data with new avatar URL
        const currentUser = JSON.parse(localStorage.getItem('etour_user_data') || '{}');
        const updatedUser = { ...currentUser, avatar: response.data.avatarUrl };
        localStorage.setItem('etour_user_data', JSON.stringify(updatedUser));

        return {
          success: true,
          data: {
            avatarUrl: response.data.avatarUrl,
            message: 'Avatar updated successfully!',
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

  // Get all users (Admin only)
  async getUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        role: params.role || '',
        search: params.search || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
        status: params.status || '',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.USER_ENDPOINTS.GET_USERS}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get user by ID (Admin/Agent only)
  async getUserById(userId) {
    try {
      const url = API_CONFIG.USER_ENDPOINTS.GET_USER.replace(':id', userId);
      const response = await this.baseService.get(url);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Create new user (Admin only)
  async createUser(userData) {
    try {
      const response = await this.baseService.post(API_CONFIG.USER_ENDPOINTS.CREATE_USER, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.role,
        status: userData.status || 'active',
        permissions: userData.permissions || [],
      });

      if (response.success) {
        return {
          success: true,
          data: {
            user: response.data.user,
            message: 'User created successfully!',
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

  // Update user (Admin only)
  async updateUser(userId, userData) {
    try {
      const url = API_CONFIG.USER_ENDPOINTS.UPDATE_USER.replace(':id', userId);
      const response = await this.baseService.put(url, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        permissions: userData.permissions,
      });

      if (response.success) {
        return {
          success: true,
          data: {
            user: response.data.user,
            message: 'User updated successfully!',
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

  // Delete user (Admin only)
  async deleteUser(userId) {
    try {
      const url = API_CONFIG.USER_ENDPOINTS.DELETE_USER.replace(':id', userId);
      const response = await this.baseService.delete(url);

      if (response.success) {
        return {
          success: true,
          data: {
            message: SUCCESS_MESSAGES.DATA_DELETED,
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

  // Get user statistics (Admin only)
  async getUserStats() {
    try {
      const response = await this.baseService.get('/users/stats');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get user activity log (Admin only)
  async getUserActivity(userId, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 20,
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/users/${userId}/activity?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Update user status (Admin only)
  async updateUserStatus(userId, status) {
    try {
      const url = API_CONFIG.USER_ENDPOINTS.UPDATE_USER.replace(':id', userId);
      const response = await this.baseService.patch(url, { status });

      if (response.success) {
        return {
          success: true,
          data: {
            message: `User ${status} successfully!`,
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

  // Get user preferences
  async getUserPreferences() {
    try {
      const response = await this.baseService.get('/users/preferences');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Update user preferences
  async updateUserPreferences(preferences) {
    try {
      const response = await this.baseService.put('/users/preferences', preferences);

      if (response.success) {
        // Update local preferences
        localStorage.setItem('etour_user_preferences', JSON.stringify(preferences));

        return {
          success: true,
          data: {
            preferences: response.data.preferences,
            message: 'Preferences updated successfully!',
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

  // Search users (Admin/Agent only)
  async searchUsers(query, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        role: filters.role || '',
        status: filters.status || '',
        page: filters.page || 1,
        limit: filters.limit || 10,
      }).toString();

      const response = await this.baseService.get(`/users/search?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get user roles and permissions (Admin only)
  async getRolesAndPermissions() {
    try {
      const response = await this.baseService.get('/users/roles-permissions');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Bulk update users (Admin only)
  async bulkUpdateUsers(userIds, updateData) {
    try {
      const response = await this.baseService.put('/users/bulk-update', {
        userIds,
        updateData,
      });

      if (response.success) {
        return {
          success: true,
          data: {
            updatedCount: response.data.updatedCount,
            message: `${response.data.updatedCount} users updated successfully!`,
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
}

// Create and export singleton instance
const userService = new UserService();
export default userService;
