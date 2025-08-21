// Booking Management Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG, { SUCCESS_MESSAGES } from './config';

class BookingService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get all bookings with pagination and filters
  async getBookings(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status || '',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        tourId: params.tourId || '',
        userId: params.userId || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.BOOKING_ENDPOINTS.GET_ALL}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      const url = API_CONFIG.BOOKING_ENDPOINTS.GET_BY_ID.replace(':id', bookingId);
      const response = await this.baseService.get(url);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Create new booking
  async createBooking(bookingData) {
    try {
      const response = await this.baseService.post(API_CONFIG.BOOKING_ENDPOINTS.CREATE, {
        tourId: bookingData.tourId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        groupSize: bookingData.groupSize,
        totalPrice: bookingData.totalPrice,
        currency: bookingData.currency || 'USD',
        
        // Customer information
        customerInfo: {
          firstName: bookingData.customerInfo.firstName,
          lastName: bookingData.customerInfo.lastName,
          email: bookingData.customerInfo.email,
          phone: bookingData.customerInfo.phone,
          dateOfBirth: bookingData.customerInfo.dateOfBirth,
          nationality: bookingData.customerInfo.nationality,
          passportNumber: bookingData.customerInfo.passportNumber,
          emergencyContact: bookingData.customerInfo.emergencyContact,
        },

        // Travelers information
        travelers: bookingData.travelers || [],

        // Special requirements
        specialRequirements: bookingData.specialRequirements || '',
        dietaryRestrictions: bookingData.dietaryRestrictions || '',
        medicalConditions: bookingData.medicalConditions || '',

        // Payment information
        paymentMethod: bookingData.paymentMethod,
        paymentStatus: bookingData.paymentStatus || 'pending',

        // Additional services
        additionalServices: bookingData.additionalServices || [],

        // Booking source
        source: bookingData.source || 'website',
        agentId: bookingData.agentId || null,
      });

      if (response.success) {
        return {
          success: true,
          data: {
            booking: response.data.booking,
            message: SUCCESS_MESSAGES.BOOKING_CREATED,
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

  // Update booking
  async updateBooking(bookingId, bookingData) {
    try {
      const url = API_CONFIG.BOOKING_ENDPOINTS.UPDATE.replace(':id', bookingId);
      const response = await this.baseService.put(url, bookingData);

      if (response.success) {
        return {
          success: true,
          data: {
            booking: response.data.booking,
            message: 'Booking updated successfully!',
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

  // Cancel booking
  async cancelBooking(bookingId, cancellationReason = '') {
    try {
      const url = API_CONFIG.BOOKING_ENDPOINTS.CANCEL.replace(':id', bookingId);
      const response = await this.baseService.post(url, {
        cancellationReason,
        cancelledAt: new Date().toISOString(),
      });

      if (response.success) {
        return {
          success: true,
          data: {
            booking: response.data.booking,
            refundAmount: response.data.refundAmount,
            message: SUCCESS_MESSAGES.BOOKING_CANCELLED,
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

  // Confirm booking
  async confirmBooking(bookingId) {
    try {
      const url = API_CONFIG.BOOKING_ENDPOINTS.CONFIRM.replace(':id', bookingId);
      const response = await this.baseService.post(url);

      if (response.success) {
        return {
          success: true,
          data: {
            booking: response.data.booking,
            message: 'Booking confirmed successfully!',
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

  // Get user bookings
  async getUserBookings(userId, params = {}) {
    try {
      const url = API_CONFIG.BOOKING_ENDPOINTS.GET_USER_BOOKINGS.replace(':userId', userId);
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`${url}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get current user's bookings
  async getMyBookings(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`/bookings/my-bookings?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get booking history
  async getBookingHistory(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        startDate: params.startDate || '',
        endDate: params.endDate || '',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.BOOKING_ENDPOINTS.GET_BOOKING_HISTORY}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get booking statistics (Admin/Agent only)
  async getBookingStats(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        groupBy: params.groupBy || 'month',
      }).toString();

      const response = await this.baseService.get(`/bookings/stats?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Process payment for booking
  async processPayment(bookingId, paymentData) {
    try {
      const response = await this.baseService.post(`/bookings/${bookingId}/payment`, {
        paymentMethod: paymentData.paymentMethod,
        amount: paymentData.amount,
        currency: paymentData.currency || 'USD',
        paymentToken: paymentData.paymentToken,
        billingAddress: paymentData.billingAddress,
      });

      if (response.success) {
        return {
          success: true,
          data: {
            payment: response.data.payment,
            booking: response.data.booking,
            message: 'Payment processed successfully!',
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

  // Get booking invoice
  async getBookingInvoice(bookingId) {
    try {
      const response = await this.baseService.get(`/bookings/${bookingId}/invoice`, {
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

  // Send booking confirmation email
  async sendBookingConfirmation(bookingId) {
    try {
      const response = await this.baseService.post(`/bookings/${bookingId}/send-confirmation`);

      if (response.success) {
        return {
          success: true,
          data: {
            message: 'Confirmation email sent successfully!',
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

  // Add booking note (Admin/Agent only)
  async addBookingNote(bookingId, note) {
    try {
      const response = await this.baseService.post(`/bookings/${bookingId}/notes`, {
        note,
        createdAt: new Date().toISOString(),
      });

      if (response.success) {
        return {
          success: true,
          data: {
            note: response.data.note,
            message: 'Note added successfully!',
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

  // Update booking status (Admin/Agent only)
  async updateBookingStatus(bookingId, status, note = '') {
    try {
      const response = await this.baseService.patch(`/bookings/${bookingId}/status`, {
        status,
        note,
        updatedAt: new Date().toISOString(),
      });

      if (response.success) {
        return {
          success: true,
          data: {
            booking: response.data.booking,
            message: `Booking status updated to ${status}!`,
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

  // Get booking timeline
  async getBookingTimeline(bookingId) {
    try {
      const response = await this.baseService.get(`/bookings/${bookingId}/timeline`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Search bookings
  async searchBookings(query, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        status: filters.status || '',
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
        page: filters.page || 1,
        limit: filters.limit || 10,
      }).toString();

      const response = await this.baseService.get(`/bookings/search?${queryParams}`);
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
const bookingService = new BookingService();
export default bookingService;
