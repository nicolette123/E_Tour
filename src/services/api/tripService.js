// Trip Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG from './config';

class TripService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get all trips with filters
  async getAllTrips(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters if provided
      if (params.location) queryParams.append('location', params.location);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${API_CONFIG.TRIP_ENDPOINTS.GET_ALL}?${queryString}` : API_CONFIG.TRIP_ENDPOINTS.GET_ALL;
      
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch trips',
      };
    }
  }

  // Get trip by ID
  async getTripById(id) {
    try {
      const endpoint = API_CONFIG.TRIP_ENDPOINTS.GET_BY_ID.replace(':id', id);
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

  // Get trending trips
  async getTrendingTrips(limit = 10) {
    try {
      const endpoint = `${API_CONFIG.TRIP_ENDPOINTS.GET_TRENDING}?limit=${limit}`;
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch trending trips',
      };
    }
  }

  // Book a trip
  async bookTrip(tripId, seatsBooked) {
    try {
      const endpoint = API_CONFIG.TRIP_ENDPOINTS.BOOK_TRIP.replace(':id', tripId);
      const response = await this.baseService.post(endpoint, {
        seatsBooked,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to book trip',
      };
    }
  }

  // Get user bookings
  async getUserBookings() {
    try {
      const response = await this.baseService.get(API_CONFIG.TRIP_ENDPOINTS.GET_BOOKINGS);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch bookings',
      };
    }
  }

  // Cancel booking
  async cancelBooking(bookingId, reason = '') {
    try {
      const endpoint = API_CONFIG.TRIP_ENDPOINTS.CANCEL_BOOKING.replace(':id', bookingId);
      const response = await this.baseService.post(endpoint, {
        reason,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to cancel booking',
      };
    }
  }

  // Submit trip review
  async submitReview(tripId, rating, comment, bookingId) {
    try {
      const endpoint = API_CONFIG.TRIP_ENDPOINTS.SUBMIT_REVIEW.replace(':id', tripId);
      const response = await this.baseService.post(endpoint, {
        rating,
        comment,
        bookingId,
      });
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to submit review',
      };
    }
  }

  // Create custom trip request
  async createCustomTripRequest(requestData) {
    try {
      const response = await this.baseService.post(API_CONFIG.TRIP_ENDPOINTS.CREATE_CUSTOM_TRIP, requestData);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to create custom trip request',
      };
    }
  }

  // Get user's custom trip requests
  async getCustomTripRequests() {
    try {
      const response = await this.baseService.get(API_CONFIG.TRIP_ENDPOINTS.GET_CUSTOM_TRIPS);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch custom trip requests',
      };
    }
  }

  // Get custom trip request by ID
  async getCustomTripRequestById(id) {
    try {
      const endpoint = API_CONFIG.TRIP_ENDPOINTS.GET_CUSTOM_TRIP_BY_ID.replace(':id', id);
      const response = await this.baseService.get(endpoint);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
        message: error.message || 'Failed to fetch custom trip request',
      };
    }
  }
}

// Create and export singleton instance
const tripService = new TripService();
export default tripService;
