import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const token = searchParams.get('token');
  
  // Allow requests from the learn subdomain
  const allowedOrigins = ['https://learn.codeunia.com', 'http://localhost:3000'];
  
  if (!origin || !allowedOrigins.includes(origin)) {
    return new NextResponse('Unauthorized origin', { status: 403 });
  }

  // If there's a token, set it and redirect back
  if (token) {
    const response = NextResponse.redirect(origin);
    
    // Set the token as a cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return response;
  }

  // Return a simple HTML page that communicates with the parent
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Auth Check</title>
    </head>
    <body>
      <script>
        // Check if user is authenticated on this domain
        const checkAuth = async () => {
          try {
            const response = await fetch('/api/auth/me', {
              credentials: 'include'
            });
            
            if (response.ok) {
              const userData = await response.json();
              // Send auth data to parent window
              window.parent.postMessage({
                type: 'CODEUNIA_AUTH_TOKEN',
                token: userData.token || 'authenticated',
                user: userData.user
              }, '${origin}');
            } else {
              // User not authenticated
              window.parent.postMessage({
                type: 'CODEUNIA_AUTH_STATUS',
                authenticated: false
              }, '${origin}');
            }
          } catch (error) {
            console.error('Auth check failed:', error);
            window.parent.postMessage({
              type: 'CODEUNIA_AUTH_STATUS',
              authenticated: false
            }, '${origin}');
          }
        };

        checkAuth();
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Frame-Options': 'ALLOWALL',
      'Access-Control-Allow-Origin': origin,
    },
  });
}
