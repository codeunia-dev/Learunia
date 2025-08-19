import { NextRequest, NextResponse } from 'next/server';
import { authConfig, getApiUrl } from '@/lib/auth-config';

export async function GET(request: NextRequest) {
  try {
    // Get token from query parameters
    const token = request.nextUrl.searchParams.get('token');
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // Validate token with main Codeunia API
    const response = await fetch(getApiUrl(authConfig.endpoints.validate), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Token is valid, set cookie and redirect
    const redirectResponse = NextResponse.redirect(new URL(returnUrl, request.url));
    
    redirectResponse.cookies.set(authConfig.cookie.name, token, {
      httpOnly: authConfig.cookie.httpOnly,
      secure: authConfig.cookie.secure,
      sameSite: authConfig.cookie.sameSite,
      maxAge: authConfig.cookie.maxAge,
      path: '/'
    });

    return redirectResponse;

  } catch (error) {
    console.error('Auth set-token error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // Validate token with main Codeunia API
    const response = await fetch(getApiUrl(authConfig.endpoints.validate), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userData = await response.json();
    
    // Set cookie in response
    const jsonResponse = NextResponse.json({ user: userData });
    jsonResponse.cookies.set(authConfig.cookie.name, token, {
      httpOnly: authConfig.cookie.httpOnly,
      secure: authConfig.cookie.secure,
      sameSite: authConfig.cookie.sameSite,
      maxAge: authConfig.cookie.maxAge,
      path: '/'
    });

    return jsonResponse;

  } catch (error) {
    console.error('Auth set-token POST error:', error);
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
