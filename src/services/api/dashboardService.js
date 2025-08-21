// Dashboard Data Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG from './config';

class DashboardService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get dashboard statistics
  async getDashboardStats(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month', // day, week, month, year
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DASHBOARD_ENDPOINTS.STATS}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get analytics data
  async getAnalytics(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        type: params.type || 'overview', // overview, bookings, revenue, users
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        groupBy: params.groupBy || 'day',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DASHBOARD_ENDPOINTS.ANALYTICS}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get recent bookings
  async getRecentBookings(limit = 10) {
    try {
      const response = await this.baseService.get(`${API_CONFIG.DASHBOARD_ENDPOINTS.RECENT_BOOKINGS}?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get revenue data
  async getRevenueData(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        currency: params.currency || 'USD',
        groupBy: params.groupBy || 'day',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DASHBOARD_ENDPOINTS.REVENUE}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get user activity data
  async getUserActivity(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'week',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        userType: params.userType || '', // admin, agent, client
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DASHBOARD_ENDPOINTS.USER_ACTIVITY}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get admin dashboard data
  async getAdminDashboard(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/admin?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get agent dashboard data
  async getAgentDashboard(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/agent?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get client dashboard data
  async getClientDashboard(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/client?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get booking trends
  async getBookingTrends(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        groupBy: params.groupBy || 'day',
      }).toString();

      const response = await this.baseService.get(`/dashboard/booking-trends?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get popular destinations
  async getPopularDestinations(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        limit: params.limit || 10,
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/popular-destinations?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get popular tours
  async getPopularTours(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        limit: params.limit || 10,
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/popular-tours?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get customer insights
  async getCustomerInsights(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/customer-insights?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get performance metrics
  async getPerformanceMetrics(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        metric: params.metric || 'all', // conversion, satisfaction, retention
      }).toString();

      const response = await this.baseService.get(`/dashboard/performance-metrics?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get financial summary
  async getFinancialSummary(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        currency: params.currency || 'USD',
      }).toString();

      const response = await this.baseService.get(`/dashboard/financial-summary?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get agent performance (Admin only)
  async getAgentPerformance(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        agentId: params.agentId || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/agent-performance?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get commission data (Agent only)
  async getCommissionData(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        status: params.status || '', // pending, paid, cancelled
      }).toString();

      const response = await this.baseService.get(`/dashboard/commissions?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get upcoming tours
  async getUpcomingTours(limit = 10) {
    try {
      const response = await this.baseService.get(`/dashboard/upcoming-tours?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get notifications
  async getNotifications(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 20,
        type: params.type || '', // booking, payment, system, promotion
        read: params.read || '', // true, false
      }).toString();

      const response = await this.baseService.get(`/dashboard/notifications?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const response = await this.baseService.patch(`/dashboard/notifications/${notificationId}/read`);

      if (response.success) {
        return {
          success: true,
          data: {
            message: 'Notification marked as read!',
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

  // Mark all notifications as read
  async markAllNotificationsAsRead() {
    try {
      const response = await this.baseService.patch('/dashboard/notifications/mark-all-read');

      if (response.success) {
        return {
          success: true,
          data: {
            message: 'All notifications marked as read!',
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

  // Export dashboard data
  async exportDashboardData(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        type: params.type || 'overview', // overview, bookings, revenue, users
        format: params.format || 'csv', // csv, excel, pdf
        period: params.period || 'month',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`/dashboard/export?${queryParams}`, {
        responseType: 'blob',
      });

      if (response.success) {
        return {
          success: true,
          data: response.data,
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
const dashboardService = new DashboardService();
export default dashboardService;
