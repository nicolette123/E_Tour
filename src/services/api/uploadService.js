// File Upload Service for E_Tour API
import baseApiService from './baseService';
import API_CONFIG from './config';

class UploadService {
  constructor() {
    this.baseService = baseApiService;
  }

  // Upload single file
  async uploadSingleFile(file, options = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (options.folder) {
        formData.append('folder', options.folder);
      }
      
      if (options.tags) {
        formData.append('tags', JSON.stringify(options.tags));
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post(API_CONFIG.UPLOAD_ENDPOINTS.SINGLE_FILE, formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            file: response.data.file,
            url: response.data.url,
            message: 'File uploaded successfully!',
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

  // Upload multiple files
  async uploadMultipleFiles(files, options = {}) {
    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
      if (options.folder) {
        formData.append('folder', options.folder);
      }
      
      if (options.tags) {
        formData.append('tags', JSON.stringify(options.tags));
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post(API_CONFIG.UPLOAD_ENDPOINTS.MULTIPLE_FILES, formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            files: response.data.files,
            urls: response.data.urls,
            message: `${files.length} files uploaded successfully!`,
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

  // Upload destination images
  async uploadDestinationImages(destinationId, files, options = {}) {
    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
      
      formData.append('destinationId', destinationId);
      
      if (options.captions) {
        formData.append('captions', JSON.stringify(options.captions));
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post(API_CONFIG.UPLOAD_ENDPOINTS.DESTINATION_IMAGES, formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            images: response.data.images,
            message: 'Destination images uploaded successfully!',
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

  // Upload tour images
  async uploadTourImages(tourId, files, options = {}) {
    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
      
      formData.append('tourId', tourId);
      
      if (options.captions) {
        formData.append('captions', JSON.stringify(options.captions));
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post(API_CONFIG.UPLOAD_ENDPOINTS.TOUR_IMAGES, formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            images: response.data.images,
            message: 'Tour images uploaded successfully!',
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
  async uploadUserAvatar(file, options = {}) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post(API_CONFIG.UPLOAD_ENDPOINTS.USER_AVATAR, formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            avatar: response.data.avatar,
            url: response.data.url,
            message: 'Avatar uploaded successfully!',
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

  // Upload document (PDF, DOC, etc.)
  async uploadDocument(file, options = {}) {
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      if (options.type) {
        formData.append('type', options.type); // passport, visa, insurance, etc.
      }
      
      if (options.description) {
        formData.append('description', options.description);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress || null,
      };

      const response = await this.baseService.post('/uploads/document', formData, config);

      if (response.success) {
        return {
          success: true,
          data: {
            document: response.data.document,
            url: response.data.url,
            message: 'Document uploaded successfully!',
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

  // Delete uploaded file
  async deleteFile(fileId) {
    try {
      const response = await this.baseService.delete(`/uploads/${fileId}`);

      if (response.success) {
        return {
          success: true,
          data: {
            message: 'File deleted successfully!',
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

  // Get file info
  async getFileInfo(fileId) {
    try {
      const response = await this.baseService.get(`/uploads/${fileId}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Get user's uploaded files
  async getUserFiles(params = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 20,
        type: params.type || '', // image, document, video
        folder: params.folder || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc',
      }).toString();

      const response = await this.baseService.get(`/uploads/my-files?${queryParams}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  // Validate file before upload
  validateFile(file, options = {}) {
    const errors = [];
    
    // Check file size (default 10MB)
    const maxSize = options.maxSize || 10 * 1024 * 1024;
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }
    
    // Check file type
    if (options.allowedTypes && options.allowedTypes.length > 0) {
      const fileType = file.type.toLowerCase();
      const isAllowed = options.allowedTypes.some(type => 
        fileType.includes(type.toLowerCase())
      );
      
      if (!isAllowed) {
        errors.push(`File type not allowed. Allowed types: ${options.allowedTypes.join(', ')}`);
      }
    }
    
    // Check file extension
    if (options.allowedExtensions && options.allowedExtensions.length > 0) {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();
      
      if (!options.allowedExtensions.includes(fileExtension)) {
        errors.push(`File extension not allowed. Allowed extensions: ${options.allowedExtensions.join(', ')}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Resize image before upload (client-side)
  async resizeImage(file, options = {}) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = options.maxWidth || 1920;
        const maxHeight = options.maxHeight || 1080;
        const quality = options.quality || 0.8;
        
        let { width, height } = img;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // Generate thumbnail
  async generateThumbnail(file, size = 200) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        
        // Calculate crop dimensions for square thumbnail
        const minDimension = Math.min(img.width, img.height);
        const x = (img.width - minDimension) / 2;
        const y = (img.height - minDimension) / 2;
        
        ctx.drawImage(img, x, y, minDimension, minDimension, 0, 0, size, size);
        
        canvas.toBlob(
          (blob) => {
            const thumbnailFile = new File([blob], `thumb_${file.name}`, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(thumbnailFile);
          },
          file.type,
          0.8
        );
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}

// Create and export singleton instance
const uploadService = new UploadService();
export default uploadService;
