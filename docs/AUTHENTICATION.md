# Codeunia Learn Authent## **User Experience Flow:**
1. User visits `learn.codeunia.com/python`
2. Middleware checks for valid authentication token
3. If not authenticated → redirect to `codeunia.com/auth/signin?returnUrl=learn.codeunia.com/python`
4. User signs in on main site
5. Main site redirects back with authentication token
6. Learning platform validates token and grants access System

This document explains how the authentication system works for Codeunia Learn platform.

## Overview

The authentication system uses JWT tokens shared between the main Codeunia platform and the Learn platform. Users authenticate on the main site and access protected content seamlessly.

## Architecture

### 1. **Main Codeunia Platform** (codeunia.com)
- Handles user registration, login, and account management
- Issues JWT tokens upon successful authentication
- Provides validation API endpoints
- Manages user sessions and profiles

### 2. **Learn Platform** (learn.codeunia.com)
- Validates tokens with main platform API
- Protects content behind authentication
- Provides seamless redirect experience
- Maintains user session state

## Authentication Flow

1. **User Access**: User tries to access protected content (e.g., `/python`)
2. **Token Check**: Middleware checks for valid authentication token
3. **Redirect**: If no token, user is redirected to main Codeunia signin
4. **Authentication**: User authenticates on main platform
5. **Token Return**: Main platform redirects back with JWT token
6. **Validation**: Learn platform validates token with main API
7. **Access Granted**: User can now access protected content

## Implementation Details

### Protected Routes
All programming language cheatsheets require authentication:
- `/python`, `/javascript`, `/typescript`, `/react`, etc.
- See `authConfig.protectedRoutes` for complete list

### Public Routes
These routes are accessible without authentication:
- `/` (homepage)
- `/about` 
- API routes and static assets

### Components

#### Middleware (`/src/middleware.ts`)
- Runs on every request
- Checks authentication for protected routes
- Redirects unauthenticated users to login

#### AuthContext (`/src/contexts/AuthContext.tsx`)
- Manages user authentication state
- Provides login/logout functions
- Handles token refresh and validation

#### ProtectedRoute (`/src/components/ProtectedRoute.tsx`)
- Wrapper component for protected content
- Shows loading state during authentication check
- Displays login prompt for unauthenticated users

#### UserProfile (`/src/components/UserProfile.tsx`)
- Shows user information in navbar
- Provides logout functionality
- Links to main platform dashboard/settings

### API Routes

#### `/api/auth/callback`
- Handles authentication callbacks from main platform
- Validates tokens and sets secure cookies
- Redirects to originally requested page

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_MAIN_SITE_URL=https://codeunia.com
NEXT_PUBLIC_API_BASE_URL=https://api.codeunia.com
AUTH_SECRET=your-shared-secret-key
```

### Auth Config (`/src/lib/auth-config.ts`)
- Centralized authentication configuration
- URL helpers and route definitions
- Cookie and security settings

## Security Features

- **HttpOnly Cookies**: Tokens stored in secure, httpOnly cookies
- **HTTPS Only**: Secure cookies in production
- **Token Validation**: Every protected request validates token
- **SameSite**: CSRF protection with SameSite cookies
- **Automatic Expiry**: Tokens expire after 7 days

## Integration Requirements

### Main Codeunia Platform Must Provide:

1. **Signin Endpoint**: `/auth/signin?returnUrl=URL`
   - Accepts return URL parameter  
   - Redirects back with token after successful authentication

2. **Validation API**: `POST /auth/validate`
   - Accepts `Authorization: Bearer TOKEN`
   - Returns 200 for valid tokens, 401 for invalid

3. **User Info API**: `GET /auth/me`
   - Returns user profile data
   - Includes: id, email, name, avatar, plan

### Expected API Responses:

#### Token Validation (`/auth/validate`)
```json
{
  "valid": true,
  "user": {
    "id": "user123",
    "email": "user@example.com"
  }
}
```

#### User Info (`/auth/me`)
```json
{
  "id": "user123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "plan": "pro"
}
```

## Development Setup

1. Copy `.env.example` to `.env.local`
2. Update environment variables for your setup
3. For local development, point to your local Codeunia instance
4. Ensure CORS is configured on main platform API

## Testing

For testing without the main platform:
1. Set development environment variables
2. Mock the authentication API responses
3. Use test tokens for validation

## Deployment

1. Set production environment variables
2. Configure secure cookie settings
3. Ensure HTTPS is enabled
4. Set up proper CORS policies
5. Configure domain cookies if using subdomains

## Troubleshooting

### Common Issues:

1. **Infinite Redirects**: Check middleware matcher config
2. **Cookie Not Set**: Verify domain and secure settings
3. **Token Validation Fails**: Check API endpoint URLs
4. **CORS Errors**: Configure main platform CORS policy

### Debug Mode:
Enable debug logging by setting `DEBUG=true` in environment variables.
