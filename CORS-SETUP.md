# CORS Setup and Troubleshooting Guide

## 🚨 Important: Port Configuration

The E-Tour application **must** run on `http://localhost:3000` to avoid CORS issues. The backend server is configured to accept requests only from this specific origin.

## 🚀 Quick Start

### 1. Run the Application on Correct Port

```bash
# Use the configured dev script (automatically uses port 3000)
npm run dev

# Or run setup first, then dev
npm run dev:setup
```

### 2. Access the Application

- ✅ **Correct URL**: `http://localhost:3000`
- ❌ **Incorrect URL**: `http://localhost:3001` (will cause CORS errors)

## 🔧 CORS Issue Solutions

### Problem: CORS Policy Error

```
Access to XMLHttpRequest at 'https://echoes-of-rwanda.onrender.com/api/v1/auth/register' 
from origin 'http://localhost:3001' has been blocked by CORS policy
```

### Solutions:

#### Solution 1: Use Correct Port (Recommended)
```bash
# Stop current server (Ctrl+C)
# Start on correct port
npm run dev
```

#### Solution 2: Manual Port Configuration
```bash
# If npm run dev doesn't work, try:
npx next dev -p 3000
```

#### Solution 3: Environment Setup
```bash
# Run the setup script to configure environment
npm run setup
npm run dev
```

## 📋 Configuration Details

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3000",
    "setup": "node scripts/dev-setup.js",
    "dev:setup": "npm run setup && npm run dev"
  }
}
```

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=https://echoes-of-rwanda.onrender.com
NODE_ENV=development
PORT=3000
```

### Next.js Configuration (next.config.js)
- Includes proxy configuration for API calls
- Handles CORS headers for development
- Routes `/api/v1/*` to backend server

## 🧪 Testing Authentication

### 1. Test API Connectivity
1. Go to `http://localhost:3000/test-auth`
2. Click "Test Auth Endpoints"
3. Verify all endpoints are reachable

### 2. Test Login/Signup
1. Go to `http://localhost:3000/login`
2. Try logging in with valid credentials
3. Check for CORS errors in browser console

### 3. CORS Helper
The app includes an automatic CORS helper that:
- Detects CORS-related errors
- Provides quick fixes (port switching, refresh)
- Shows detailed troubleshooting steps

## 🔍 Troubleshooting Steps

### Step 1: Check Current URL
- Ensure you're accessing `http://localhost:3000`
- If on different port, click "Switch to Port 3000" in error message

### Step 2: Clear Browser Data
```bash
# Clear browser cache and cookies for localhost
# Or use incognito/private browsing mode
```

### Step 3: Restart Development Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 4: Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try authentication action
4. Look for failed requests with CORS errors

### Step 5: Verify Backend Status
- Backend URL: `https://echoes-of-rwanda.onrender.com`
- Check if backend is accessible
- Verify CORS configuration allows `localhost:3000`

## 🛠️ Advanced Configuration

### Custom Port (Not Recommended)
If you must use a different port, you'll need to:
1. Update backend CORS configuration
2. Modify proxy settings in `next.config.js`
3. Update environment variables

### Production Deployment
- CORS issues only affect development
- Production builds work with any domain (configured on backend)
- Use `npm run build` and `npm run start` for production testing

## 📞 Support

If CORS issues persist:
1. Check browser console for specific error messages
2. Verify backend server status
3. Ensure you're using the correct port (3000)
4. Try the automatic CORS helper suggestions
5. Contact development team with error details

## ✅ Success Indicators

You'll know CORS is working when:
- ✅ Login/signup forms work without network errors
- ✅ API calls complete successfully
- ✅ No CORS errors in browser console
- ✅ Authentication test page shows all endpoints as reachable
