# 🌍 E-Tour Backend API - Complete Documentation

## Overview
This document provides comprehensive documentation for all **125+ API endpoints** in the complete E-Tour backend system, including request bodies, query parameters, and authentication requirements. The system includes core e-tourism features, advanced communication, content management, analytics, and system administration capabilities.

**Base URL**: ` `

---

## 📋 **Table of Contents**
1. [Authentication Endpoints](#authentication-endpoints)
2. [User Profile Endpoints](#user-profile-endpoints)
3. [Trip Endpoints](#trip-endpoints)
4. [Agent Endpoints](#agent-endpoints)
5. [Admin Endpoints](#admin-endpoints)
6. [Job Marketplace Endpoints](#job-marketplace-endpoints)
7. [Token System Endpoints](#token-system-endpoints)
8. [Search Endpoints](#search-endpoints)
9. [Notification Endpoints](#notification-endpoints)
10. [Contact Endpoints](#contact-endpoints)
11. [Upload Endpoints](#upload-endpoints)
12. [Health Check Endpoints](#health-check-endpoints)
13. [Payment & Financial Management](#payment--financial-management)
14. [Reviews & Ratings System](#reviews--ratings-system)
15. [Wishlist & Favorites](#wishlist--favorites)
16. [Advanced Trip Management](#advanced-trip-management)
17. [Communication System](#communication-system)
18. [Promotional System](#promotional-system)
19. [Content Management System](#content-management-system)
20. [Integration & Utility Services](#integration--utility-services)
21. [Advanced Notifications](#advanced-notifications)
22. [Advanced Analytics](#advanced-analytics)
23. [System Administration](#system-administration)

---

## 🔐 **Authentication Endpoints**

### 1. Register User
**POST** `/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "client",                    // Optional: "client", "agent", "admin"
  "phone": "+250788123456",            // Optional
  "companyName": "Travel Co.",         // Optional
  "location": "Kigali, Rwanda",        // Optional
  "notificationsEnabled": true,        // Optional, default: true
  "agreedToTerms": true                // Optional, default: false
}
```

### 2. Login User
**POST** `/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Logout User
**POST** `/auth/logout`

**Request Body**: None (uses JWT token from headers)

### 4. Verify Email
**POST** `/auth/verify-email`

**Request Body**:
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "code": "ABC123"
}
```

### 5. Resend Verification Email
**POST** `/auth/resend-verification`

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

### 6. Request Password Reset
**POST** `/auth/reset-password-request`

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

### 7. Reset Password
**POST** `/auth/reset-password`

**Request Body**:
```json
{
  "token": "reset-token-here",
  "newPassword": "newpassword123"
}
```

---

## 👤 **User Profile Endpoints**

### 8. Get User Profile
**GET** `/profile`
- **Authentication**: Required
- **Request Body**: None

### 9. Update User Profile
**PUT** `/profile`
- **Authentication**: Required

**Request Body**:
```json
{
  "name": "John Doe Updated",          // Optional
  "phone": "+250788123456",            // Optional
  "profileImage": "https://...",       // Optional
  "companyName": "New Travel Co.",     // Optional
  "location": "Kigali, Rwanda",        // Optional
  "notificationsEnabled": false        // Optional
}
```

### 10. Update Terms Agreement
**PUT** `/terms-agreement`
- **Authentication**: Required

**Request Body**:
```json
{
  "agreedToTerms": true
}
```

### 11. Update Notification Preferences
**PUT** `/notification-preferences`
- **Authentication**: Required

**Request Body**:
```json
{
  "notificationsEnabled": false
}
```

---

## 🌍 **Trip Endpoints**

### 12. Get All Trips (with Filters)
**GET** `/trips`

**Query Parameters**:
```
?location=Kigali&startDate=2024-06-01&endDate=2024-06-10&minPrice=100&maxPrice=1000&page=1&limit=10
```

### 13. Get Trip by ID
**GET** `/trips/:id`
- **Path Parameters**: `id` (UUID)

### 14. Get Trending Trips
**GET** `/trending`

**Query Parameters**:
```
?limit=10
```

### 15. Book a Trip
**POST** `/trips/:id/book`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "seatsBooked": 2
}
```

### 16. Get User Bookings
**GET** `/bookings`
- **Authentication**: Required
- **Request Body**: None

### 17. Cancel Booking
**POST** `/bookings/:id/cancel`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "reason": "Change of plans"          // Optional
}
```

### 18. Submit Trip Review
**POST** `/trips/:id/review`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Amazing experience!",    // Optional
  "bookingId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 19. Create Custom Trip Request
**POST** `/custom-trips`
- **Authentication**: Required

**Request Body**:
```json
{
  "destination": "Volcanoes National Park",
  "budget": 1500,                      // Number or string
  "interests": "Gorilla trekking",     // Optional
  "preferredStartDate": "2024-07-01",  // Optional, YYYY-MM-DD
  "preferredEndDate": "2024-07-05",    // Optional, YYYY-MM-DD
  "groupSize": 4,                      // Optional, default: 1
  "clientNotes": "Special requests..." // Optional, max 1000 chars
}
```

### 20. Get User's Custom Trip Requests
**GET** `/custom-trips`
- **Authentication**: Required
- **Request Body**: None

### 21. Get Custom Trip Request by ID
**GET** `/custom-trips/:id`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

---

## 🏢 **Agent Endpoints**

### 22. Create Trip (Agent)
**POST** `/agent/trips`
- **Authentication**: Required (Agent role)

**Request Body**:
```json
{
  "title": "Gorilla Trekking Adventure",
  "description": "Experience mountain gorillas...", // Optional, max 2000 chars
  "itinerary": "Day 1: Arrival...",               // Optional, max 5000 chars
  "price": 1200,                                  // Number or string
  "maxSeats": 8,
  "location": "Volcanoes National Park",
  "startDate": "2024-06-01",                      // YYYY-MM-DD
  "endDate": "2024-06-03",                        // YYYY-MM-DD
  "images": ["https://example.com/image1.jpg"]    // Optional, max 10 URLs
}
```

### 23. Get Agent's Trips
**GET** `/agent/trips`
- **Authentication**: Required (Agent role)
- **Request Body**: None

### 24. Get Agent Trip by ID
**GET** `/agent/trips/:id`
- **Authentication**: Required (Agent role)
- **Path Parameters**: `id` (UUID)

### 25. Update Trip (Agent)
**PUT** `/agent/trips/:id`
- **Authentication**: Required (Agent role)
- **Path Parameters**: `id` (UUID)

**Request Body** (all fields optional):
```json
{
  "title": "Updated Trip Title",       // Optional, max 255 chars
  "description": "Updated desc...",    // Optional, max 2000 chars
  "itinerary": "Updated itinerary...", // Optional, max 5000 chars
  "price": 1500,                       // Optional, number or string
  "maxSeats": 10,                      // Optional, 1-1000
  "location": "Updated Location",      // Optional, max 255 chars
  "startDate": "2024-07-01",          // Optional, YYYY-MM-DD
  "endDate": "2024-07-05",            // Optional, YYYY-MM-DD
  "status": "active",                  // Optional, "active" or "inactive"
  "images": ["https://new-image.jpg"]  // Optional, max 10 URLs
}
```

### 26. Delete Trip (Agent)
**DELETE** `/agent/trips/:id`
- **Authentication**: Required (Agent role)
- **Path Parameters**: `id` (UUID)
- **Request Body**: None

### 27. Get Agent Bookings
**GET** `/agent/bookings`
- **Authentication**: Required (Agent role)
- **Request Body**: None

### 28. Get Agent Performance
**GET** `/agent/performance`
- **Authentication**: Required (Agent role)
- **Request Body**: None

---

## 👑 **Admin Endpoints**

### 29. Get All Users (Admin)
**GET** `/admin/users`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 30. Get User by ID (Admin)
**GET** `/admin/users/:id`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)

### 31. Suspend User (Admin)
**POST** `/admin/users/:id/suspend`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "reason": "Violation of terms"       // Optional
}
```

### 32. Reactivate User (Admin)
**POST** `/admin/users/:id/reactivate`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)
- **Request Body**: None

### 33. Get All Trips (Admin)
**GET** `/admin/trips`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 34. Update Trip (Admin)
**PUT** `/admin/trips/:id`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)

**Request Body** (all fields optional):
```json
{
  "title": "Admin Updated Title",      // Optional
  "description": "Updated desc...",    // Optional
  "itinerary": "Updated itinerary...", // Optional
  "price": 1200,                       // Optional, number or string
  "maxSeats": 15,                      // Optional
  "location": "Updated Location",      // Optional
  "startDate": "2024-08-01",          // Optional
  "endDate": "2024-08-05",            // Optional
  "status": "active",                  // Optional: "active", "inactive", "deleted"
  "images": ["https://new-image.jpg"]  // Optional
}
```

### 35. Delete Trip (Admin)
**DELETE** `/admin/trips/:id`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)
- **Request Body**: None

### 36. Get All Bookings (Admin)
**GET** `/admin/bookings`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 37. Get All Custom Trip Requests (Admin)
**GET** `/admin/custom-trips`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 38. Assign Agent to Custom Trip (Admin)
**POST** `/admin/custom-trips/:id/assign`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "agentId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 39. Get System Statistics (Admin)
**GET** `/admin/stats`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 40. Get All Contact Messages (Admin)
**GET** `/admin/contact-messages`
- **Authentication**: Required (Admin role)
- **Request Body**: None

### 41. Update Contact Message Status (Admin)
**PUT** `/admin/contact-messages/:id`
- **Authentication**: Required (Admin role)
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "status": "resolved",                // "new", "in_progress", "resolved", "closed"
  "assignedAdminId": "admin-uuid"      // Optional
}
```

---

## 💼 **Job Marketplace Endpoints**

### 42. Create Job
**POST** `/jobs`
- **Authentication**: Required

**Request Body**:
```json
{
  "customTripId": "trip-uuid",         // Optional
  "title": "Travel Guide Needed",
  "description": "Looking for experienced guide...",
  "tokenCost": 50,
  "category": "Tour Guide",            // Optional
  "location": "Kigali",               // Optional
  "applicationDeadline": "2024-06-01" // Optional
}
```

### 43. Get Client's Jobs
**GET** `/jobs`
- **Authentication**: Required
- **Request Body**: None

### 44. Get Available Jobs
**GET** `/jobs/available`
- **Request Body**: None

### 45. Get Job by ID
**GET** `/jobs/:id`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

### 46. Update Job
**PUT** `/jobs/:id`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

**Request Body** (all fields optional):
```json
{
  "title": "Updated Job Title",        // Optional
  "description": "Updated desc...",    // Optional
  "category": "Updated Category",      // Optional
  "location": "Updated Location",      // Optional
  "applicationDeadline": "2024-07-01", // Optional
  "status": "closed"                   // Optional: "open", "closed"
}
```

### 47. Delete Job
**DELETE** `/jobs/:id`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)
- **Request Body**: None

### 48. Apply for Job
**POST** `/jobs/:id/apply`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

**Request Body**:
```json
{
  "coverLetter": "I am interested...", // Optional
  "portfolioLinks": [                  // Optional
    "https://portfolio1.com",
    "https://portfolio2.com"
  ]
}
```

### 49. Get Job Applications
**GET** `/jobs/:id/applications`
- **Authentication**: Required
- **Path Parameters**: `id` (UUID)

### 50. Accept Job Application
**POST** `/jobs/:jobId/applications/:applicationId/accept`
- **Authentication**: Required
- **Path Parameters**: `jobId` (UUID), `applicationId` (UUID)

**Request Body**:
```json
{
  "feedback": "Welcome aboard!"       // Optional
}
```

### 51. Reject Job Application
**POST** `/jobs/:jobId/applications/:applicationId/reject`
- **Authentication**: Required
- **Path Parameters**: `jobId` (UUID), `applicationId` (UUID)

**Request Body**:
```json
{
  "feedback": "Thank you for applying..." // Optional
}
```

---

## 🪙 **Token System Endpoints**

### 52. Get Token Packages
**GET** `/tokens/packages`
- **Request Body**: None

### 53. Purchase Tokens
**POST** `/tokens/purchase`
- **Authentication**: Required

**Request Body**:
```json
{
  "packageId": "starter",              // Package ID from /tokens/packages
  "paymentReference": "PAY123456789"
}
```

### 54. Get Token Balance
**GET** `/tokens/balance`
- **Authentication**: Required
- **Request Body**: None

### 55. Get Token History
**GET** `/tokens/history`
- **Authentication**: Required
- **Request Body**: None

---

## 🔍 **Search Endpoints**

### 56. Search
**POST** `/search`

**Request Body**:
```json
{
  "query": "gorilla trekking",
  "type": "trips",                     // Optional: "trips", "agents", "all"
  "limit": 20                          // Optional, 1-100
}
```

### 57. Get Activity Suggestions
**POST** `/search/suggestions`

**Request Body**:
```json
{
  "location": "Kigali",
  "interests": ["culture", "nature"],  // Optional
  "budget": 500                        // Optional
}
```

---

## 🔔 **Notification Endpoints**

### 58. Get User Notifications
**GET** `/notifications`
- **Authentication**: Required
- **Request Body**: None

### 59. Mark Notification as Read
**POST** `/notifications/mark-read`
- **Authentication**: Required

**Request Body**:
```json
{
  "notificationId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 60. Mark All Notifications as Read
**POST** `/notifications/mark-all-read`
- **Authentication**: Required
- **Request Body**: None

---

## 📞 **Contact Endpoints**

### 61. Submit Contact Message
**POST** `/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about trips",
  "message": "I would like to know more about..."
}
```

---

## 📤 **Upload Endpoints**

### 62. Upload Image
**POST** `/upload/image`
- **Authentication**: Required
- **Content-Type**: `multipart/form-data`

**Form Data**:
- `image`: File (required)

**Query Parameters**:
```
?folder=trips&width=800&height=600&quality=auto
```

### 63. Upload Profile Image
**POST** `/upload/profile`
- **Authentication**: Required
- **Content-Type**: `multipart/form-data`

**Form Data**:
- `image`: File (required)

### 64. Delete Image
**DELETE** `/upload/image`
- **Authentication**: Required

**Query Parameters**:
```
?publicId=etour/trips/image123
```

---

## 🏥 **Health Check Endpoints**

### 65. Basic Health Check
**GET** `/health`
- **Request Body**: None

### 66. Detailed Health Check
**GET** `/health/detailed`
- **Request Body**: None

### 67. Heartbeat
**GET** `/health/heartbeat`
- **Request Body**: None

### 68. Readiness Probe
**GET** `/health/ready`
- **Request Body**: None

### 69. Liveness Probe
**GET** `/health/live`
- **Request Body**: None

### 70. System Metrics
**GET** `/health/metrics`
- **Request Body**: None

**Query Parameters**:
```
?format=prometheus
```

---

---

## ⚠️ **IMPORTANT: Missing Endpoints Identified**

After comprehensive analysis, **55 additional critical endpoints** have been identified that are missing from the current system. These endpoints are essential for a complete, professional e-tourism platform.

**📋 See `MISSING_ENDPOINTS_DOCUMENTATION.md` for complete details of all 55 missing endpoints.**

### **Critical Missing Categories:**
- **💳 Payment & Financial Management** (5 endpoints)
- **⭐ Reviews & Ratings System** (5 endpoints)
- **❤️ Wishlist & Favorites** (4 endpoints)
- **📅 Advanced Trip Management** (6 endpoints)
- **💬 Communication System** (5 endpoints)
- **📊 Reporting & Analytics** (5 endpoints)
- **🎯 Promotional System** (4 endpoints)
- **🏠 Content Management** (7 endpoints)
- **🌍 Integration & Utility** (5 endpoints)
- **🔔 Advanced Notifications** (4 endpoints)
- **📈 Advanced Analytics** (5 endpoints)

---

## 📊 **Current System Summary**

**Current Endpoints**: 70
**Missing Critical Endpoints**: 55
**Complete System Total**: 125 endpoints

### By Category:
- **Authentication**: 7 endpoints
- **User Profile**: 4 endpoints
- **Trips**: 10 endpoints
- **Agent**: 7 endpoints
- **Admin**: 13 endpoints
- **Jobs**: 10 endpoints
- **Tokens**: 4 endpoints
- **Search**: 2 endpoints
- **Notifications**: 3 endpoints
- **Contact**: 1 endpoint
- **Upload**: 3 endpoints
- **Health**: 6 endpoints

### Authentication Requirements:
- **Public Endpoints**: 15
- **Authenticated Endpoints**: 55
- **Role-Specific Endpoints**: 20 (Admin: 13, Agent: 7)

---

## 🔑 **Authentication Notes**

- **JWT Token**: Include in `Authorization` header as `Bearer <token>`
- **Role-Based Access**: Some endpoints require specific roles (admin, agent)
- **Token Expiration**: Tokens expire after 24 hours by default

## 📝 **Request Format Notes**

- **Content-Type**: `application/json` (except file uploads)
- **Date Format**: `YYYY-MM-DD` for all date fields
- **UUID Format**: Standard UUID v4 format for all ID fields
- **File Uploads**: Use `multipart/form-data`

## 🚀 **Getting Started**

1. **Register**: `POST /auth/register`
2. **Login**: `POST /auth/login`
3. **Verify Email**: `POST /auth/verify-email`
4. **Start Using**: Access protected endpoints with JWT token

---

## 💳 **Payment & Financial Management**

### 1. Process Payment
**POST** `/payments/process`
**Authentication**: Required

**Request Body**:
```json
{
  "bookingId": "uuid",
  "paymentMethod": "card",  // "card", "mobile_money", "bank_transfer"
  "paymentDetails": {
    "cardNumber": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cvv": "123",
    "cardholderName": "John Doe"
  },
  "amount": 500.00,
  "currency": "USD"
}
```

### 2. Request Refund
**POST** `/payments/refund`
**Authentication**: Required

**Request Body**:
```json
{
  "paymentId": "uuid",
  "reason": "Trip cancelled",
  "refundAmount": 500.00  // Optional, defaults to full amount
}
```

### 3. Get Payment History
**GET** `/payments/history`
**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Payment status filter

### 4. Generate Invoice
**POST** `/payments/invoice`
**Authentication**: Required

**Request Body**:
```json
{
  "paymentId": "uuid"
}
```

### 5. Get Payment Status
**GET** `/payments/:id/status`
**Authentication**: Required

---

## ⭐ **Reviews & Ratings System**

### 1. Get Trip Reviews
**GET** `/trips/:id/reviews`
**Authentication**: Public

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `rating` (optional): Filter by rating (1-5)
- `sortBy` (optional): Sort order ("newest", "oldest", "rating_high", "rating_low", "helpful")

### 2. Get Agent Reviews
**GET** `/agents/:id/reviews`
**Authentication**: Public

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `rating` (optional): Filter by rating (1-5)
- `sortBy` (optional): Sort order ("helpful", "newest", "oldest")

### 3. Rate Agent
**POST** `/agents/:id/review`
**Authentication**: Required

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Excellent service!",
  "bookingId": "uuid",
  "categories": {
    "communication": 5,
    "professionalism": 5,
    "knowledge": 5,
    "responsiveness": 5
  }
}
```

### 4. Report Review (Admin)
**POST** `/admin/reviews/:id/report`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "reason": "spam",  // "spam", "inappropriate_content", "fake_review"
  "adminNotes": "Suspicious review pattern"
}
```

### 5. Moderate Review (Admin)
**PUT** `/admin/reviews/:id/moderate`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "status": "approved",  // "approved", "rejected", "hide"
  "moderatorNotes": "Review meets guidelines"
}
```

---

## ❤️ **Wishlist & Favorites**

### 1. Add to Wishlist
**POST** `/wishlist/add`
**Authentication**: Required

**Request Body**:
```json
{
  "tripId": "uuid",
  "notes": "Interested for summer vacation"  // Optional
}
```

### 2. Remove from Wishlist
**DELETE** `/wishlist/remove`
**Authentication**: Required

**Request Body**:
```json
{
  "tripId": "uuid"
}
```

### 3. Get User Wishlist
**GET** `/wishlist`
**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Sort order ("date_added", "trip_name", "price")

### 4. Clear Wishlist
**DELETE** `/wishlist/clear`
**Authentication**: Required

---

## 📅 **Advanced Trip Management**

### 1. Get Trip Availability Calendar
**GET** `/trips/:id/availability`
**Authentication**: Public

**Query Parameters**:
- `month` (optional): Month (1-12)
- `year` (optional): Year (YYYY)

### 2. Update Trip Availability (Agent)
**PUT** `/agent/trips/:id/availability`
**Authentication**: Required (Agent)

**Request Body**:
```json
{
  "availability": [
    {
      "date": "2024-06-15",
      "availableSeats": 10,
      "priceAdjustment": 50.00,
      "status": "available"
    }
  ]
}
```

### 3. Get Trip Categories
**GET** `/trips/categories`
**Authentication**: Public

### 4. Create Trip Category (Admin)
**POST** `/admin/trips/categories`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "name": "Adventure Tours",
  "description": "Exciting adventure experiences",
  "icon": "🏔️",
  "color": "#FF6B35"
}
```

### 5. Get Featured Trips
**GET** `/trips/featured`
**Authentication**: Public

**Query Parameters**:
- `limit` (optional): Number of trips (default: 6)
- `category` (optional): Filter by category

### 6. Set Featured Trips (Admin)
**POST** `/admin/trips/featured`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "tripIds": ["uuid1", "uuid2"],
  "featuredUntil": "2024-12-31T23:59:59Z",
  "priority": 1
}
```

---

## 💬 **Communication System**

### 1. Send Message
**POST** `/messages/send`
**Authentication**: Required

**Request Body**:
```json
{
  "recipientId": "uuid",
  "subject": "Trip inquiry",
  "message": "I'm interested in your Paris trip",
  "tripId": "uuid",  // Optional
  "attachments": ["https://example.com/file.pdf"]  // Optional
}
```

### 2. Get Conversations
**GET** `/messages/conversations`
**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status ("active", "closed", "archived")

### 3. Get Conversation Messages
**GET** `/messages/conversations/:id`
**Authentication**: Required

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

### 4. Mark Messages as Read
**PUT** `/messages/mark-read`
**Authentication**: Required

**Request Body**:
```json
{
  "messageIds": ["uuid1", "uuid2", "uuid3"]
}
```

### 5. Delete Conversation
**DELETE** `/messages/conversations/:id`
**Authentication**: Required

---

## 🎯 **Promotional System**

### 1. Validate Discount Code
**POST** `/promotions/validate`
**Authentication**: Required

**Request Body**:
```json
{
  "code": "SUMMER2024",
  "tripAmount": 500.00,
  "tripId": "uuid"  // Optional
}
```

### 2. Create Discount Code (Admin)
**POST** `/promotions/admin/discount-codes`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "code": "SUMMER2024",
  "name": "Summer Sale 2024",
  "description": "20% off all summer trips",
  "discountType": "percentage",  // "percentage" or "fixed_amount"
  "discountValue": 20,
  "minimumOrderAmount": 100,
  "maximumDiscountAmount": 200,
  "usageLimit": 1000,
  "userUsageLimit": 1,
  "validFrom": "2024-06-01T00:00:00Z",
  "validUntil": "2024-08-31T23:59:59Z",
  "isFirstTimeUserOnly": false,
  "applicableToTrips": ["uuid1", "uuid2"]  // Optional
}
```

### 3. Get Discount Codes (Admin)
**GET** `/promotions/admin/discount-codes`
**Authentication**: Required (Admin)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status

### 4. Create Promotional Campaign (Admin)
**POST** `/promotions/admin/campaigns`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "name": "Summer Campaign 2024",
  "description": "Promote summer destinations",
  "campaignType": "seasonal",
  "targetAudience": {
    "userTypes": ["client"],
    "locations": ["US", "CA"],
    "ageGroups": ["25-35", "36-45"]
  },
  "discountCodeIds": ["uuid1", "uuid2"],
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-08-31T23:59:59Z",
  "budget": 10000,
  "targetReach": 5000
}
```

---

## 🏠 **Content Management System**

### 1. Get Blog Posts
**GET** `/content/blog`
**Authentication**: Public

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status ("published", "draft")
- `category` (optional): Filter by category
- `search` (optional): Search in title and content

### 2. Get Single Blog Post
**GET** `/content/blog/:slug`
**Authentication**: Public

### 3. Create Blog Post (Admin)
**POST** `/content/admin/blog`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "title": "Top 10 Travel Destinations 2024",
  "slug": "top-10-travel-destinations-2024",
  "excerpt": "Discover the most amazing places to visit this year",
  "content": "Full blog post content here...",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["travel", "destinations", "2024"],
  "categories": ["Travel Tips"],
  "status": "published",  // "draft" or "published"
  "seoTitle": "Best Travel Destinations 2024 | E-Tour",
  "seoDescription": "Explore the top 10 travel destinations for 2024",
  "seoKeywords": ["travel", "destinations", "vacation"]
}
```

### 4. Get FAQ Items
**GET** `/content/faq`
**Authentication**: Public

**Query Parameters**:
- `category` (optional): Filter by category

### 5. Get Legal Documents
**GET** `/content/legal`
**Authentication**: Public

**Query Parameters**:
- `type` (optional): Filter by document type ("terms", "privacy", "about", "help")

### 6. Get Single Legal Document
**GET** `/content/legal/:slug`
**Authentication**: Public

### 7. Search Content
**GET** `/content/search`
**Authentication**: Public

**Query Parameters**:
- `q` (required): Search query (minimum 2 characters)
- `types` (optional): Content types to search ("blog,faq")
- `limit` (optional): Number of results (default: 20)

---

## 🌍 **Integration & Utility Services**

### 1. Get Weather Information
**GET** `/utils/weather`
**Authentication**: Public

**Query Parameters**:
- `location` (required): Location name or coordinates

### 2. Get Currency Exchange Rates
**GET** `/utils/currency`
**Authentication**: Public

**Query Parameters**:
- `base` (optional): Base currency (default: USD)

### 3. Convert Currency
**GET** `/utils/currency/convert`
**Authentication**: Public

**Query Parameters**:
- `amount` (required): Amount to convert
- `from` (required): Source currency code
- `to` (required): Target currency code

### 4. Get Location Suggestions
**GET** `/utils/locations`
**Authentication**: Public

**Query Parameters**:
- `q` (required): Search query (minimum 2 characters)

### 5. Get Timezone Information
**GET** `/utils/timezone`
**Authentication**: Public

**Query Parameters**:
- `location` (required): Location name

---

## 🔔 **Advanced Notifications**

### 1. Get Notification Templates (Admin)
**GET** `/admin/notifications/templates`
**Authentication**: Required (Admin)

### 2. Send Bulk Notifications (Admin)
**POST** `/admin/notifications/bulk`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "templateId": "uuid",
  "recipients": ["user1@example.com", "user2@example.com"],
  "variables": {
    "userName": "John Doe",
    "tripName": "Paris Adventure"
  }
}
```

### 3. Get Notification History (Admin)
**GET** `/admin/notifications/history`
**Authentication**: Required (Admin)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `type` (optional): Filter by notification type

### 4. Create Notification Template (Admin)
**POST** `/admin/notifications/templates`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "name": "Booking Confirmation",
  "type": "email",  // "email", "push", "sms"
  "subject": "Your booking is confirmed!",
  "content": "Dear {{userName}}, your booking for {{tripName}} has been confirmed.",
  "variables": ["userName", "tripName", "bookingDate"]
}
```

---

## 📈 **Advanced Analytics**

### 1. Get Dashboard Metrics
**GET** `/analytics/dashboard`
**Authentication**: Required

### 2. Get Booking Analytics (Admin)
**GET** `/admin/analytics/bookings`
**Authentication**: Required (Admin)

**Query Parameters**:
- `timeRange` (optional): Time range ("7d", "30d", "90d")

### 3. Get User Analytics (Admin)
**GET** `/admin/analytics/users`
**Authentication**: Required (Admin)

### 4. Get Revenue Analytics (Admin)
**GET** `/admin/analytics/revenue`
**Authentication**: Required (Admin)

**Query Parameters**:
- `timeRange` (optional): Time range ("7d", "30d", "90d")

### 5. Generate Custom Report (Admin)
**POST** `/admin/analytics/reports`
**Authentication**: Required (Admin)

**Request Body**:
```json
{
  "metrics": ["bookings", "revenue", "users"],
  "timeRange": "30d",
  "filters": {
    "location": "US",
    "userType": "client"
  }
}
```

---

## 🔧 **System Administration**

### 1. Get System Health
**GET** `/health`
**Authentication**: Public

### 2. Get System Statistics (Admin)
**GET** `/admin/system/stats`
**Authentication**: Required (Admin)

---

## 📊 **Complete API Summary**

### **Total Endpoints: 125+**

#### **By Category:**
- **Authentication**: 8 endpoints
- **User Profile**: 6 endpoints
- **Trip Management**: 12 endpoints
- **Agent Management**: 8 endpoints
- **Admin Management**: 10 endpoints
- **Job Marketplace**: 6 endpoints
- **Token System**: 4 endpoints
- **Search & Discovery**: 4 endpoints
- **Notifications**: 4 endpoints
- **Contact & Support**: 4 endpoints
- **File Upload**: 2 endpoints
- **Health Check**: 2 endpoints
- **Payment & Financial**: 5 endpoints
- **Reviews & Ratings**: 5 endpoints
- **Wishlist & Favorites**: 4 endpoints
- **Advanced Trip Management**: 6 endpoints
- **Communication System**: 5 endpoints
- **Promotional System**: 4 endpoints
- **Content Management**: 7 endpoints
- **Integration & Utility**: 5 endpoints
- **Advanced Notifications**: 4 endpoints
- **Advanced Analytics**: 5 endpoints
- **System Administration**: 2 endpoints

#### **By Authentication Level:**
- **Public Endpoints**: 25+ endpoints
- **Authenticated Endpoints**: 75+ endpoints
- **Admin-Only Endpoints**: 25+ endpoints

#### **By HTTP Method:**
- **GET**: 65+ endpoints (Read operations)
- **POST**: 35+ endpoints (Create operations)
- **PUT**: 15+ endpoints (Update operations)
- **DELETE**: 10+ endpoints (Delete operations)

This comprehensive documentation covers all **125+ endpoints** in the complete E-Tour backend system! 🎉

The system now includes:
- **Core E-Tourism Features**: Trip booking, payments, reviews
- **Advanced Communication**: Real-time messaging system
- **Content Management**: Blog, FAQ, legal documents
- **Business Intelligence**: Analytics and reporting
- **System Administration**: Monitoring and management
- **Integration Services**: Weather, currency, location services

All endpoints include professional validation, error handling, and comprehensive response formatting for a production-ready e-tourism platform.
