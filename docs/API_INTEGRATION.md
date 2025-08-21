# E_Tour API Integration Documentation

## Overview

This document provides comprehensive information about the API integration system implemented for the E_Tour project. The integration connects the frontend application with the backend API documented at https://documenter.getpostman.com/view/28978688/2sB34ikes9.

## Architecture

### Core Components

1. **Base API Service** (`src/services/api/baseService.js`)
   - Axios-based HTTP client with interceptors
   - Automatic token management and refresh
   - Comprehensive error handling
   - Request/response logging

2. **Service Layer** (`src/services/api/`)
   - `authService.js` - Authentication and authorization
   - `userService.js` - User management operations
   - `destinationService.js` - Destination CRUD operations
   - `tourService.js` - Tour package management
   - `bookingService.js` - Booking operations
   - `dashboardService.js` - Dashboard data and analytics
   - `uploadService.js` - File upload operations

3. **React Hooks** (`src/hooks/useApi.js`)
   - Custom hooks for API integration
   - Loading states and error handling
   - Caching and optimization
   - Search and pagination utilities

4. **UI Components** (`src/components/common/ApiComponents.jsx`)
   - Loading spinners and overlays
   - Error and success messages
   - Progress indicators
   - Status badges

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.echoesofrwanda.com
```

### API Configuration

The API configuration is centralized in `src/services/api/config.js`:

```javascript
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.echoesofrwanda.com',
  VERSION: 'v1',
  TIMEOUT: 30000,
  // ... endpoint definitions
};
```

## Authentication

### Token Management

The system uses JWT tokens for authentication:

- **Access Token**: Short-lived token for API requests
- **Refresh Token**: Long-lived token for obtaining new access tokens
- **Automatic Refresh**: Interceptors handle token refresh automatically

### Usage Example

```javascript
import { useAuth } from '../hooks/useApi';

const LoginComponent = () => {
  const { login, logout, isAuthenticated, user } = useAuth();

  const handleLogin = async (credentials) => {
    const response = await login(credentials);
    if (response.success) {
      // User is now authenticated
      console.log('Welcome', response.data.user.name);
    }
  };
};
```

## Service Usage

### Destinations

```javascript
import { useDestinations, useDestination } from '../hooks/useApi';

// Fetch all destinations
const { data: destinations, loading, error } = useDestinations({
  page: 1,
  limit: 12,
  category: 'adventure'
});

// Fetch single destination
const { data: destination } = useDestination(destinationId);
```

### Tours

```javascript
import { useTours } from '../hooks/useApi';

const { data: tours, loading, error } = useTours({
  destination: 'rwanda',
  priceRange: '100-500',
  duration: '3-7'
});
```

### Bookings

```javascript
import { bookingService } from '../services/api';

const createBooking = async (bookingData) => {
  const response = await bookingService.createBooking({
    tourId: 'tour-123',
    startDate: '2024-06-01',
    groupSize: 2,
    customerInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    }
  });
  
  if (response.success) {
    console.log('Booking created:', response.data.booking);
  }
};
```

## Error Handling

### Centralized Error Management

All API errors are handled consistently:

```javascript
import { apiUtils } from '../services/api';

const handleApiResponse = (response) => {
  if (response.success) {
    return response.data;
  } else {
    const errorMessage = apiUtils.formatErrorMessage(response.error);
    console.error('API Error:', errorMessage);
    // Show user-friendly error message
  }
};
```

### Error Types

- **Network Errors**: Connection issues, timeouts
- **Authentication Errors**: Invalid tokens, expired sessions
- **Validation Errors**: Invalid input data
- **Server Errors**: Internal server issues

## Loading States

### Component-Level Loading

```javascript
import { LoadingOverlay, LoadingSpinner } from '../components/common/ApiComponents';

const MyComponent = () => {
  const { data, loading, error } = useDestinations();

  return (
    <LoadingOverlay loading={loading} message="Loading destinations...">
      <div>
        {data?.map(destination => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </LoadingOverlay>
  );
};
```

### Global Loading States

```javascript
import { useApi } from '../hooks/useApi';

const { data, loading, error, execute } = useApi(
  () => destinationService.getDestinations(),
  [],
  { immediate: false }
);

// Manual execution
const handleRefresh = () => {
  execute();
};
```

## File Uploads

### Single File Upload

```javascript
import { useFileUpload } from '../hooks/useApi';

const FileUploadComponent = () => {
  const { uploadFile, uploading, progress, error } = useFileUpload();

  const handleFileSelect = async (file) => {
    const response = await uploadFile(file, {
      folder: 'destinations',
      onUploadProgress: (progressEvent) => {
        console.log('Upload progress:', progressEvent);
      }
    });

    if (response.success) {
      console.log('File uploaded:', response.data.url);
    }
  };
};
```

## Caching

### API Response Caching

```javascript
import { useApiCache } from '../hooks/useApi';

const { data, loading, error, clearCache } = useApiCache(
  'destinations',
  () => destinationService.getDestinations(),
  [],
  5 * 60 * 1000 // 5 minutes TTL
);
```

## Search and Filtering

### Debounced Search

```javascript
import { useSearch } from '../hooks/useApi';

const SearchComponent = () => {
  const { query, setQuery, results, loading } = useSearch(
    (searchQuery) => destinationService.searchDestinations(searchQuery),
    500 // 500ms debounce
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations..."
      />
      {loading && <LoadingSpinner />}
      {results.map(result => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  );
};
```

## Pagination

```javascript
import { usePagination } from '../hooks/useApi';

const PaginatedList = () => {
  const pagination = usePagination(1, 10);
  const { data, loading } = useDestinations({
    page: pagination.page,
    limit: pagination.limit
  });

  useEffect(() => {
    if (data?.pagination) {
      pagination.updatePagination(data.pagination);
    }
  }, [data]);

  return (
    <div>
      {/* List items */}
      <Pagination {...pagination} />
    </div>
  );
};
```

## Testing

### API Testing Component

A comprehensive API testing component is available at `src/components/testing/ApiTester.jsx`:

```javascript
import ApiTester from '../components/testing/ApiTester';

// Use in development environment
const DevTools = () => (
  <div>
    {process.env.NODE_ENV === 'development' && <ApiTester />}
  </div>
);
```

## Best Practices

### 1. Error Handling
- Always handle both success and error cases
- Provide user-friendly error messages
- Log errors for debugging

### 2. Loading States
- Show loading indicators for better UX
- Use skeleton screens for content loading
- Disable actions during loading

### 3. Caching
- Cache frequently accessed data
- Implement proper cache invalidation
- Use appropriate TTL values

### 4. Security
- Never expose sensitive data in client-side code
- Validate all user inputs
- Handle authentication errors gracefully

### 5. Performance
- Use pagination for large datasets
- Implement debouncing for search
- Optimize API calls with proper dependencies

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure API server allows requests from your domain
   - Check CORS configuration on the backend

2. **Authentication Issues**
   - Verify token storage and retrieval
   - Check token expiration handling
   - Ensure proper logout cleanup

3. **Network Errors**
   - Implement retry mechanisms
   - Handle offline scenarios
   - Provide network status indicators

### Debug Mode

Enable debug logging by setting:

```javascript
localStorage.setItem('api_debug', 'true');
```

This will log all API requests and responses to the console.

## Migration Guide

### From Old API Utils

If migrating from the old API utilities:

1. Replace `import { api } from '../utils/api'` with `import { apiService } from '../services/api'`
2. Update method calls: `api.get()` → `apiService.destination.getDestinations()`
3. Handle new response format with `success` property
4. Use new hooks for React components

### Example Migration

**Before:**
```javascript
const response = await api.get('/destinations');
const destinations = response.data;
```

**After:**
```javascript
const response = await apiService.destination.getDestinations();
if (response.success) {
  const destinations = response.data;
}
```

## Support

For issues or questions regarding the API integration:

1. Check the API documentation: https://documenter.getpostman.com/view/28978688/2sB34ikes9
2. Review error logs in the browser console
3. Use the API testing component for debugging
4. Contact the development team

## Changelog

### Version 1.0.0
- Initial API integration implementation
- Complete service layer with all endpoints
- React hooks for common operations
- Comprehensive error handling
- File upload support
- Caching mechanisms
- Testing utilities
