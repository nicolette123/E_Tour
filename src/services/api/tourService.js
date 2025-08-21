// Tour Package Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG, { SUCCESS_MESSAGES } from './config';

class TourService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get all tour packages with pagination and filters
  async getTours(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
        destination: params.destination || '',
        category: params.category || '',
        duration: params.duration || '',
        priceRange: params.priceRange || '',
        difficulty: params.difficulty || '',
        groupSize: params.groupSize || '',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        sortBy: params.sortBy || 'popularity',
        sortOrder: params.sortOrder || 'desc',
        featured: params.featured || '',
        status: params.status || 'active',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.TOUR_ENDPOINTS.GET_ALL}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get tour package by ID
  async getTourById(tourId) {
    try {
      const url = API_CONFIG.TOUR_ENDPOINTS.GET_BY_ID.replace(':id', tourId);
      const response = await this.baseService.get(url);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Search tour packages
  async searchTours(query, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        destination: filters.destination || '',
        category: filters.category || '',
        minPrice: filters.minPrice || '',
        maxPrice: filters.maxPrice || '',
        duration: filters.duration || '',
        difficulty: filters.difficulty || '',
        startDate: filters.startDate || '',
        page: filters.page || 1,
        limit: filters.limit || 12,
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.TOUR_ENDPOINTS.SEARCH}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Filter tour packages
  async filterTours(filters) {
    try {
      const response = await this.baseService.post(API_CONFIG.TOUR_ENDPOINTS.FILTER, filters);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get tour availability
  async getTourAvailability(tourId, startDate, endDate) {
    try {
      const url = API_CONFIG.TOUR_ENDPOINTS.AVAILABILITY.replace(':id', tourId);
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
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

  // Get tour pricing
  async getTourPricing(tourId, params = {}) {
    try {
      const url = API_CONFIG.TOUR_ENDPOINTS.PRICING.replace(':id', tourId);
      const queryParams = new URLSearchParams({
        startDate: params.startDate || '',
        groupSize: params.groupSize || '',
        season: params.season || '',
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

  // Create new tour package (Admin only)
  async createTour(tourData) {
    try {
      const response = await this.baseService.post(API_CONFIG.TOUR_ENDPOINTS.CREATE, {
        title: tourData.title,
        description: tourData.description,
        shortDescription: tourData.shortDescription,
        destinations: tourData.destinations,
        category: tourData.category,
        duration: tourData.duration,
        difficulty: tourData.difficulty,
        groupSize: tourData.groupSize,
        price: tourData.price,
        discountPrice: tourData.discountPrice,
        currency: tourData.currency || 'USD',
        inclusions: tourData.inclusions,
        exclusions: tourData.exclusions,
        itinerary: tourData.itinerary,
        requirements: tourData.requirements,
        cancellationPolicy: tourData.cancellationPolicy,
        images: tourData.images,
        startDates: tourData.startDates,
        endDates: tourData.endDates,
        featured: tourData.featured || false,
        status: tourData.status || 'active',
        tags: tourData.tags,
      });

      if (response.success) {
        return {
          success: true,
          data: {
            tour: response.data.tour,
            message: 'Tour package created successfully!',
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

  // Update tour package (Admin only)
  async updateTour(tourId, tourData) {
    try {
      const url = API_CONFIG.TOUR_ENDPOINTS.UPDATE.replace(':id', tourId);
      const response = await this.baseService.put(url, tourData);

      if (response.success) {
        return {
          success: true,
          data: {
            tour: response.data.tour,
            message: 'Tour package updated successfully!',
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

  // Delete tour package (Admin only)
  async deleteTour(tourId) {
    try {
      const url = API_CONFIG.TOUR_ENDPOINTS.DELETE.replace(':id', tourId);
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

  // Get featured tour packages
  async getFeaturedTours(limit = 6) {
    try {
      const response = await this.baseService.get(`/tours/featured?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get popular tour packages
  async getPopularTours(limit = 6) {
    try {
      const response = await this.baseService.get(`/tours/popular?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get tour categories
  async getTourCategories() {
    try {
      const response = await this.baseService.get('/tours/categories');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get tour statistics (Admin only)
  async getTourStats() {
    try {
      const response = await this.baseService.get('/tours/stats');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get tour reviews
  async getTourReviews(tourId, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        rating: params.rating || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`/tours/${tourId}/reviews?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Add tour review
  async addTourReview(tourId, reviewData) {
    try {
      const response = await this.baseService.post(`/tours/${tourId}/reviews`, {
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        images: reviewData.images || [],
      });

      if (response.success) {
        return {
          success: true,
          data: {
            review: response.data.review,
            message: 'Review added successfully!',
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

  // Get similar tours
  async getSimilarTours(tourId, limit = 4) {
    try {
      const response = await this.baseService.get(`/tours/${tourId}/similar?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Toggle tour favorite
  async toggleTourFavorite(tourId) {
    try {
      const response = await this.baseService.post(`/tours/${tourId}/favorite`);

      if (response.success) {
        return {
          success: true,
          data: {
            isFavorite: response.data.isFavorite,
            message: response.data.isFavorite ? 'Added to favorites!' : 'Removed from favorites!',
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

  // Get user's favorite tours
  async getFavoriteTours(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
      }).toString();

      const response = await this.baseService.get(`/tours/favorites?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Check tour availability for specific dates
  async checkTourAvailability(tourId, startDate, groupSize) {
    try {
      const response = await this.baseService.post(`/tours/${tourId}/check-availability`, {
        startDate,
        groupSize,
      });

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
const tourService = new TourService();
export default tourService;
