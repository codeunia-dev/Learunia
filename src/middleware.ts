import { NextRequest, NextResponse } from 'next/server';
import { authConfig, getSigninUrl, getApiUrl } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // Check if the route requires authentication
  const isProtectedRoute = authConfig.protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = authConfig.publicRoutes.some(route => pathname.startsWith(route));
  
  // Allow public routes
  if (isPublicRoute || !isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Check for authentication token in multiple places
  let token = request.cookies.get(authConfig.cookie.name)?.value;
  
  // If no token in cookies, check URL parameters (for auth callback)
  if (!token) {
    const urlToken = request.nextUrl.searchParams.get('token');
    if (urlToken) {
      token = urlToken;
    }
  }
  
  // If no token in URL, check Authorization header
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    // Redirect to main Codeunia signin with return URL
    const signinUrl = getSigninUrl(request.url);
    return NextResponse.redirect(signinUrl);
  }
  
  // Validate token with main Codeunia API
  try {
    const response = await fetch(getApiUrl(authConfig.endpoints.validate), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      // Token is invalid, redirect to signin
      const signinUrl = getSigninUrl(request.url);
      return NextResponse.redirect(signinUrl);
    }
    
    // Token is valid, set cookie if it wasn't already set
    const response_next = NextResponse.next();
    if (!request.cookies.get(authConfig.cookie.name)?.value) {
      response_next.cookies.set(authConfig.cookie.name, token, {
        httpOnly: authConfig.cookie.httpOnly,
        secure: authConfig.cookie.secure,
        sameSite: authConfig.cookie.sameSite,
        maxAge: authConfig.cookie.maxAge,
        path: '/'
      });
    }
    
    return response_next;
    
  } catch (error) {
    // API error, redirect to signin as fallback
    console.error('Auth validation error:', error);
    const signinUrl = getSigninUrl(request.url);
    return NextResponse.redirect(signinUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
