import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const returnUrl = searchParams.get('returnUrl') || '/';

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Validate token with main Codeunia API
    const response = await fetch('https://api.codeunia.com/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    // Token is valid, set cookie and redirect
    const redirectResponse = NextResponse.redirect(new URL(returnUrl, request.url));
    
    // Set httpOnly cookie for security
    redirectResponse.cookies.set('codeunia_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return redirectResponse;

  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // Validate token with main Codeunia API
    const response = await fetch('https://api.codeunia.com/auth/validate', {
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
    return NextResponse.json({ user: userData });

  } catch (error) {
    console.error('Auth validation error:', error);
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
