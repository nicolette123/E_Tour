// Agent Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG from './config';

class AgentService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Create a new trip (agent-specific)
  async createTrip(tripData) {
    try {
      const response = await this.baseService.post(API_CONFIG.AGENT_ENDPOINTS.CREATE_TRIP, tripData);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to create trip',
      };
    }
  }

  // Get all trips created by the agent
  async getAgentTrips(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if provided
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${API_CONFIG.AGENT_ENDPOINTS.GET_TRIPS}?${queryString}` : API_CONFIG.AGENT_ENDPOINTS.GET_TRIPS;
      
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch agent trips',
      };
    }
  }

  // Get trip by ID (agent-specific)
  async getTripById(id) {
    try {
      const endpoint = API_CONFIG.AGENT_ENDPOINTS.GET_TRIP_BY_ID.replace(':id', id);
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch trip details',
      };
    }
  }

  // Update trip
  async updateTrip(id, tripData) {
    try {
      const endpoint = API_CONFIG.AGENT_ENDPOINTS.UPDATE_TRIP.replace(':id', id);
      const response = await this.baseService.put(endpoint, tripData);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to update trip',
      };
    }
  }

  // Delete trip
  async deleteTrip(id) {
    try {
      const endpoint = API_CONFIG.AGENT_ENDPOINTS.DELETE_TRIP.replace(':id', id);
      const response = await this.baseService.delete(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to delete trip',
      };
    }
  }

  // Get agent bookings
  async getAgentBookings(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if provided
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${API_CONFIG.AGENT_ENDPOINTS.GET_BOOKINGS}?${queryString}` : API_CONFIG.AGENT_ENDPOINTS.GET_BOOKINGS;
      
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch agent bookings',
      };
    }
  }

  // Get agent performance metrics
  async getPerformanceMetrics(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if provided
      if (params.period) queryParams.append('period', params.period);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${API_CONFIG.AGENT_ENDPOINTS.GET_PERFORMANCE}?${queryString}` : API_CONFIG.AGENT_ENDPOINTS.GET_PERFORMANCE;
      
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch performance metrics',
      };
    }
  }

  // Get agent dashboard statistics
  async getDashboardStats(period = 'month') {
    try {
      // Use performance endpoint for dashboard stats
      const response = await this.getPerformanceMetrics({ period });
      
      if (response.success) {
        // Transform the performance data into dashboard stats format
        const performanceData = response.data;
        return {
          success: true,
          data: {
            totalClients: performanceData.totalClients || 0,
            activeBookings: performanceData.activeBookings || 0,
            totalCommission: performanceData.totalCommission || 0,
            performanceScore: performanceData.performanceScore || 0,
            clientsChange: performanceData.clientsChange || 0,
            bookingsChange: performanceData.bookingsChange || 0,
            commissionChange: performanceData.commissionChange || 0,
            performanceChange: performanceData.performanceChange || 0,
          }
        };
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch dashboard statistics',
      };
    }
  }

  // Get recent activities (mock implementation for now)
  async getRecentActivities(limit = 10) {
    try {
      // This would typically come from an activity log endpoint
      // For now, we'll return mock data that matches the expected format
      return {
        success: true,
        data: [
          {
            id: 1,
            description: 'Created new trip to Volcanoes National Park',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            type: 'trip_created'
          },
          {
            id: 2,
            description: 'Updated client booking for Lake Kivu tour',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            type: 'booking_updated'
          },
          {
            id: 3,
            description: 'Added new client: Sarah Johnson',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            type: 'client_added'
          },
          {
            id: 4,
            description: 'Completed consultation call with prospect',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            type: 'consultation_completed'
          },
          {
            id: 5,
            description: 'Sent follow-up emails to 5 prospects',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            type: 'email_sent'
          }
        ].slice(0, limit)
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch recent activities',
      };
    }
  }
}

// Create and export singleton instance
const agentService = new AgentService();
export default agentService;
