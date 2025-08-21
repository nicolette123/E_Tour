// Destination Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG, { SUCCESS_MESSAGES } from './config';

class DestinationService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Get all destinations with pagination and filters
  async getDestinations(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
        category: params.category || '',
        location: params.location || '',
        priceRange: params.priceRange || '',
        rating: params.rating || '',
        sortBy: params.sortBy || 'popularity',
        sortOrder: params.sortOrder || 'desc',
        featured: params.featured || '',
        status: params.status || 'active',
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DESTINATION_ENDPOINTS.GET_ALL}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get destination by ID
  async getDestinationById(destinationId) {
    try {
      const url = API_CONFIG.DESTINATION_ENDPOINTS.GET_BY_ID.replace(':id', destinationId);
      const response = await this.baseService.get(url);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Search destinations
  async searchDestinations(query, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        category: filters.category || '',
        location: filters.location || '',
        minPrice: filters.minPrice || '',
        maxPrice: filters.maxPrice || '',
        rating: filters.rating || '',
        page: filters.page || 1,
        limit: filters.limit || 12,
      }).toString();

      const response = await this.baseService.get(`${API_CONFIG.DESTINATION_ENDPOINTS.SEARCH}?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get featured destinations
  async getFeaturedDestinations(limit = 6) {
    try {
      const response = await this.baseService.get(`${API_CONFIG.DESTINATION_ENDPOINTS.FEATURED}?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get popular destinations
  async getPopularDestinations(limit = 6) {
    try {
      const response = await this.baseService.get(`${API_CONFIG.DESTINATION_ENDPOINTS.POPULAR}?limit=${limit}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Create new destination (Admin only)
  async createDestination(destinationData) {
    try {
      const response = await this.baseService.post(API_CONFIG.DESTINATION_ENDPOINTS.CREATE, {
        name: destinationData.name,
        description: destinationData.description,
        shortDescription: destinationData.shortDescription,
        location: destinationData.location,
        coordinates: destinationData.coordinates,
        category: destinationData.category,
        tags: destinationData.tags,
        priceRange: destinationData.priceRange,
        duration: destinationData.duration,
        difficulty: destinationData.difficulty,
        bestTimeToVisit: destinationData.bestTimeToVisit,
        highlights: destinationData.highlights,
        inclusions: destinationData.inclusions,
        exclusions: destinationData.exclusions,
        requirements: destinationData.requirements,
        images: destinationData.images,
        featured: destinationData.featured || false,
        status: destinationData.status || 'active',
      });

      if (response.success) {
        return {
          success: true,
          data: {
            destination: response.data.destination,
            message: 'Destination created successfully!',
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

  // Update destination (Admin only)
  async updateDestination(destinationId, destinationData) {
    try {
      const url = API_CONFIG.DESTINATION_ENDPOINTS.UPDATE.replace(':id', destinationId);
      const response = await this.baseService.put(url, destinationData);

      if (response.success) {
        return {
          success: true,
          data: {
            destination: response.data.destination,
            message: 'Destination updated successfully!',
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

  // Delete destination (Admin only)
  async deleteDestination(destinationId) {
    try {
      const url = API_CONFIG.DESTINATION_ENDPOINTS.DELETE.replace(':id', destinationId);
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

  // Upload destination images (Admin only)
  async uploadDestinationImages(destinationId, files, onUploadProgress = null) {
    try {
      const url = API_CONFIG.DESTINATION_ENDPOINTS.UPLOAD_IMAGES.replace(':id', destinationId);
      const response = await this.baseService.uploadMultipleFiles(url, files, onUploadProgress);

      if (response.success) {
        return {
          success: true,
          data: {
            images: response.data.images,
            message: 'Images uploaded successfully!',
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

  // Get destination categories
  async getDestinationCategories() {
    try {
      const response = await this.baseService.get('/destinations/categories');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get destination locations
  async getDestinationLocations() {
    try {
      const response = await this.baseService.get('/destinations/locations');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get destination statistics (Admin only)
  async getDestinationStats() {
    try {
      const response = await this.baseService.get('/destinations/stats');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get nearby destinations
  async getNearbyDestinations(destinationId, radius = 50) {
    try {
      const response = await this.baseService.get(`/destinations/${destinationId}/nearby?radius=${radius}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get destination reviews
  async getDestinationReviews(destinationId, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        rating: params.rating || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`/destinations/${destinationId}/reviews?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Add destination review
  async addDestinationReview(destinationId, reviewData) {
    try {
      const response = await this.baseService.post(`/destinations/${destinationId}/reviews`, {
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

  // Get destination availability
  async getDestinationAvailability(destinationId, startDate, endDate) {
    try {
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
      }).toString();

      const response = await this.baseService.get(`/destinations/${destinationId}/availability?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Toggle destination favorite
  async toggleDestinationFavorite(destinationId) {
    try {
      const response = await this.baseService.post(`/destinations/${destinationId}/favorite`);

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

  // Get user's favorite destinations
  async getFavoriteDestinations(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 12,
      }).toString();

      const response = await this.baseService.get(`/destinations/favorites?${queryParams}`);
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
const destinationService = new DestinationService();
export default destinationService;
