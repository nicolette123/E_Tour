// API Endpoint Testing Utility
// This utility helps test and validate API endpoint configurations

import API_CONFIG from '../services/api/config';

/**
 * Test API endpoint construction
 */
export const testEndpointConstruction = () => {
  console.log('🔧 Testing API Endpoint Construction...\n');
  
  const results = {
    baseUrl: API_CONFIG.BASE_URL,
    endpoints: {},
    issues: []
  };

  // Test authentication endpoints
  console.log('📋 Authentication Endpoints:');
  Object.entries(API_CONFIG.AUTH_ENDPOINTS).forEach(([key, endpoint]) => {
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log(`  ${key}: ${fullUrl}`);
    results.endpoints[`AUTH_${key}`] = fullUrl;
    
    // Check for common issues
    if (!endpoint.startsWith('/api/v1/')) {
      results.issues.push(`AUTH_${key}: Missing /api/v1/ prefix`);
    }
  });

  // Test user endpoints
  console.log('\n👤 User Endpoints:');
  Object.entries(API_CONFIG.USER_ENDPOINTS).forEach(([key, endpoint]) => {
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log(`  ${key}: ${fullUrl}`);
    results.endpoints[`USER_${key}`] = fullUrl;
    
    if (!endpoint.startsWith('/api/v1/')) {
      results.issues.push(`USER_${key}: Missing /api/v1/ prefix`);
    }
  });

  // Test trip endpoints
  console.log('\n🌍 Trip Endpoints:');
  Object.entries(API_CONFIG.TRIP_ENDPOINTS).forEach(([key, endpoint]) => {
    const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log(`  ${key}: ${fullUrl}`);
    results.endpoints[`TRIP_${key}`] = fullUrl;
    
    if (!endpoint.startsWith('/api/v1/')) {
      results.issues.push(`TRIP_${key}: Missing /api/v1/ prefix`);
    }
  });

  // Summary
  console.log('\n📊 Summary:');
  console.log(`  Base URL: ${results.baseUrl}`);
  console.log(`  Total Endpoints: ${Object.keys(results.endpoints).length}`);
  console.log(`  Issues Found: ${results.issues.length}`);
  
  if (results.issues.length > 0) {
    console.log('\n⚠️  Issues:');
    results.issues.forEach(issue => console.log(`    - ${issue}`));
  } else {
    console.log('\n✅ All endpoints are properly configured!');
  }

  return results;
};

/**
 * Validate specific authentication endpoints
 */
export const validateAuthEndpoints = () => {
  console.log('🔐 Validating Authentication Endpoints...\n');
  
  const expectedEndpoints = {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    RESET_PASSWORD_REQUEST: '/api/v1/auth/reset-password-request',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
  };

  const results = {
    valid: true,
    issues: [],
    endpoints: {}
  };

  Object.entries(expectedEndpoints).forEach(([key, expected]) => {
    const actual = API_CONFIG.AUTH_ENDPOINTS[key];
    const fullUrl = `${API_CONFIG.BASE_URL}${actual}`;
    
    results.endpoints[key] = {
      expected: `${API_CONFIG.BASE_URL}${expected}`,
      actual: fullUrl,
      matches: actual === expected
    };

    if (actual !== expected) {
      results.valid = false;
      results.issues.push(`${key}: Expected "${expected}", got "${actual}"`);
    }

    console.log(`${key}:`);
    console.log(`  Expected: ${API_CONFIG.BASE_URL}${expected}`);
    console.log(`  Actual:   ${fullUrl}`);
    console.log(`  Status:   ${actual === expected ? '✅ Match' : '❌ Mismatch'}\n`);
  });

  if (results.valid) {
    console.log('🎉 All authentication endpoints are correctly configured!');
  } else {
    console.log('⚠️  Some authentication endpoints need attention:');
    results.issues.forEach(issue => console.log(`  - ${issue}`));
  }

  return results;
};

/**
 * Test URL construction for common scenarios
 */
export const testUrlConstruction = () => {
  console.log('🔗 Testing URL Construction Scenarios...\n');
  
  const scenarios = [
    {
      name: 'User Registration',
      endpoint: API_CONFIG.AUTH_ENDPOINTS.REGISTER,
      expectedPattern: /^https:\/\/echoes-of-rwanda\.onrender\.com\/api\/v1\/auth\/register$/
    },
    {
      name: 'User Login',
      endpoint: API_CONFIG.AUTH_ENDPOINTS.LOGIN,
      expectedPattern: /^https:\/\/echoes-of-rwanda\.onrender\.com\/api\/v1\/auth\/login$/
    },
    {
      name: 'Password Reset Request',
      endpoint: API_CONFIG.AUTH_ENDPOINTS.RESET_PASSWORD_REQUEST,
      expectedPattern: /^https:\/\/echoes-of-rwanda\.onrender\.com\/api\/v1\/auth\/reset-password-request$/
    }
  ];

  const results = [];

  scenarios.forEach(scenario => {
    const fullUrl = `${API_CONFIG.BASE_URL}${scenario.endpoint}`;
    const matches = scenario.expectedPattern.test(fullUrl);
    
    console.log(`${scenario.name}:`);
    console.log(`  URL: ${fullUrl}`);
    console.log(`  Pattern: ${scenario.expectedPattern}`);
    console.log(`  Status: ${matches ? '✅ Valid' : '❌ Invalid'}\n`);
    
    results.push({
      name: scenario.name,
      url: fullUrl,
      valid: matches
    });
  });

  const allValid = results.every(result => result.valid);
  console.log(`📊 Overall Status: ${allValid ? '✅ All URLs are valid' : '❌ Some URLs are invalid'}`);

  return {
    valid: allValid,
    results
  };
};

/**
 * Run all endpoint tests
 */
export const runAllEndpointTests = () => {
  console.log('🧪 Running Complete API Endpoint Test Suite...\n');
  console.log('='.repeat(60));
  
  const constructionTest = testEndpointConstruction();
  console.log('\n' + '='.repeat(60));
  
  const validationTest = validateAuthEndpoints();
  console.log('\n' + '='.repeat(60));
  
  const urlTest = testUrlConstruction();
  console.log('\n' + '='.repeat(60));
  
  const overallResults = {
    construction: constructionTest,
    validation: validationTest,
    urlConstruction: urlTest,
    summary: {
      allTestsPassed: constructionTest.issues.length === 0 && 
                     validationTest.valid && 
                     urlTest.valid,
      totalIssues: constructionTest.issues.length + 
                  validationTest.issues.length + 
                  (urlTest.valid ? 0 : 1)
    }
  };

  console.log('\n🎯 Final Summary:');
  console.log(`  Construction Test: ${constructionTest.issues.length === 0 ? '✅ Passed' : '❌ Failed'}`);
  console.log(`  Validation Test: ${validationTest.valid ? '✅ Passed' : '❌ Failed'}`);
  console.log(`  URL Construction Test: ${urlTest.valid ? '✅ Passed' : '❌ Failed'}`);
  console.log(`  Overall Status: ${overallResults.summary.allTestsPassed ? '🎉 All Tests Passed!' : '⚠️  Some Tests Failed'}`);

  return overallResults;
};

export default {
  testEndpointConstruction,
  validateAuthEndpoints,
  testUrlConstruction,
  runAllEndpointTests
};
