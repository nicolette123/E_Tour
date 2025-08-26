#!/usr/bin/env node

/**
 * Development Setup Script
 * Ensures the development environment is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up development environment...\n');

// Check if running on correct port
const checkPort = () => {
  console.log('📋 Development Configuration:');
  console.log('   - Frontend should run on: http://localhost:3000');
  console.log('   - Backend API URL: https://echoes-of-rwanda.onrender.com');
  console.log('   - API endpoints: /api/v1/*');
  console.log('');
};

// Check environment variables
const checkEnvVars = () => {
  console.log('🌍 Environment Variables:');
  
  const envFile = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envFile);
  
  if (!envExists) {
    console.log('   ⚠️  .env.local not found, creating with default values...');
    
    const envContent = `# E-Tour Frontend Environment Variables
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://echoes-of-rwanda.onrender.com

# Development Configuration
NODE_ENV=development
`;
    
    fs.writeFileSync(envFile, envContent);
    console.log('   ✅ Created .env.local with default configuration');
  } else {
    console.log('   ✅ .env.local exists');
  }
  
  console.log('');
};

// Check Next.js configuration
const checkNextConfig = () => {
  console.log('⚙️  Next.js Configuration:');
  
  const nextConfigFile = path.join(process.cwd(), 'next.config.js');
  const configExists = fs.existsSync(nextConfigFile);
  
  if (configExists) {
    console.log('   ✅ next.config.js exists with proxy configuration');
  } else {
    console.log('   ⚠️  next.config.js not found');
  }
  
  console.log('');
};

// Provide instructions
const showInstructions = () => {
  console.log('🚀 To start development:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Open: http://localhost:3000');
  console.log('   3. The app will automatically proxy API calls to avoid CORS issues');
  console.log('');
  
  console.log('🔍 If you encounter CORS errors:');
  console.log('   1. Ensure you\'re accessing the app at http://localhost:3000 (not 3001)');
  console.log('   2. Clear browser cache and cookies');
  console.log('   3. Restart the development server');
  console.log('   4. Check that the backend server allows localhost:3000');
  console.log('');
  
  console.log('🧪 To test authentication:');
  console.log('   1. Go to http://localhost:3000/test-auth');
  console.log('   2. Click "Test Auth Endpoints" to verify API connectivity');
  console.log('   3. Use the login form with valid credentials');
  console.log('');
};

// Run setup
const main = () => {
  try {
    checkPort();
    checkEnvVars();
    checkNextConfig();
    showInstructions();
    
    console.log('✅ Development environment setup complete!\n');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
