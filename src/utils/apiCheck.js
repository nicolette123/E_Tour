// API Service Initialization Check
// This utility helps verify that API services are properly initialized

export const checkApiServices = async () => {
  try {
    console.log('🔍 Checking API services initialization...');
    
    // Try to import the API services
    const apiModule = await import('../services/api');
    const apiService = apiModule.default || apiModule.apiService;
    
    if (!apiService) {
      throw new Error('API service not found in module');
    }
    
    console.log('✅ API service imported successfully');
    
    // Test basic functionality
    const isAuth = apiService.isAuthenticated();
    console.log('✅ Authentication check:', isAuth);
    
    const currentUser = apiService.getCurrentUser();
    console.log('✅ Current user:', currentUser ? 'User data found' : 'No user data');
    
    const userRole = apiService.getUserRole();
    console.log('✅ User role:', userRole || 'No role');
    
    // Test service availability
    const services = ['auth', 'user', 'destination', 'tour', 'booking', 'dashboard', 'upload'];
    const serviceStatus = {};
    
    for (const serviceName of services) {
      try {
        const service = apiService[serviceName];
        serviceStatus[serviceName] = service ? '✅ Available' : '❌ Not available';
      } catch (error) {
        serviceStatus[serviceName] = `❌ Error: ${error.message}`;
      }
    }
    
    console.log('📊 Service Status:', serviceStatus);
    
    return {
      success: true,
      message: 'API services initialized successfully',
      services: serviceStatus,
      isAuthenticated: isAuth,
      currentUser: currentUser,
      userRole: userRole
    };
    
  } catch (error) {
    console.error('❌ API services check failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to initialize API services'
    };
  }
};

// Simple function to test API configuration
export const checkApiConfig = () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    console.log('🔧 API Configuration:');
    console.log('- Base URL:', baseUrl || 'Not set (will use default)');
    console.log('- Environment:', process.env.NODE_ENV);

    return {
      success: true,
      config: {
        baseUrl: baseUrl || 'https://echoes-of-rwanda.onrender.com/api/v1',
        environment: process.env.NODE_ENV,
        hasCustomUrl: !!baseUrl
      }
    };
  } catch (error) {
    console.error('❌ API config check failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test login functionality
export const testLogin = async () => {
  try {
    console.log('🔐 Testing login functionality...');

    const apiModule = await import('../services/api');
    const apiService = apiModule.default || apiModule.apiService;

    // Test with the provided credentials
    const testCredentials = {
      email: "carterk279@gmail.com",
      password: "password123"
    };

    console.log('📤 Sending login request...');
    const response = await apiService.auth.login(testCredentials);

    if (response.success) {
      console.log('✅ Login successful!');
      console.log('👤 User:', response.data.user.name);
      console.log('🎭 Role:', response.data.user.role);
      console.log('🔑 Token received:', response.data.token ? 'Yes' : 'No');

      return {
        success: true,
        user: response.data.user,
        message: 'Login test passed'
      };
    } else {
      console.log('❌ Login failed:', response.message);
      return {
        success: false,
        error: response.error,
        message: response.message
      };
    }
  } catch (error) {
    console.error('❌ Login test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Login test failed with exception'
    };
  }
};

// Function to run all checks
export const runApiDiagnostics = async () => {
  console.log('🚀 Running API diagnostics...');

  const configCheck = checkApiConfig();
  const servicesCheck = await checkApiServices();
  const loginTest = await testLogin();

  const results = {
    timestamp: new Date().toISOString(),
    config: configCheck,
    services: servicesCheck,
    login: loginTest,
    overall: configCheck.success && servicesCheck.success && loginTest.success
  };

  console.log('📋 Diagnostics Results:', results);

  if (results.overall) {
    console.log('🎉 All API checks passed including login test!');
  } else {
    console.log('⚠️ Some API checks failed. Please review the results above.');
    if (!loginTest.success) {
      console.log('🔐 Login test failed - check credentials and API endpoint');
    }
  }

  return results;
};

// Auto-run diagnostics in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run diagnostics after a short delay to allow for proper initialization
  setTimeout(() => {
    runApiDiagnostics();
  }, 1000);
}
