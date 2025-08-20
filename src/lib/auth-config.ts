// Authentication configuration for Codeunia Learn
export const authConfig = {
  // Main Codeunia platform URLs
  mainSiteUrl: process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://codeunia.com',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.codeunia.com',
  
  // Authentication endpoints
  endpoints: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    logout: '/auth/logout',
    validate: '/auth/validate',
    userInfo: '/auth/me',
    dashboard: '/dashboard',
    settings: '/settings'
  },
  
  // Cookie settings
  cookie: {
    name: 'codeunia_auth_token',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const
  },
  
  // Protected routes that require authentication
  protectedRoutes: [
    // No protected routes - all content is now publicly accessible
  ],

  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/about',
    '/api',
    '/_next',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    // All programming language routes are now public
    '/python',
    '/javascript',
    '/typescript',
    '/react',
    '/nodejs',
    '/java',
    '/cpp',
    '/c',
    '/csharp',
    '/go',
    '/rust',
    '/swift',
    '/kotlin',
    '/flutter',
    '/angular',
    '/vue',
    '/css',
    '/html',
    '/sql',
    '/postgresql',
    '/mongodb',
    '/docker',
    '/git',
    '/linux'
  ]
};

// Helper functions for URL construction
export const getSigninUrl = (returnUrl?: string) => {
  const url = new URL(authConfig.endpoints.signin, authConfig.mainSiteUrl);
  if (returnUrl) {
    url.searchParams.set('returnUrl', returnUrl);
  }
  return url.toString();
};

export const getSignupUrl = (returnUrl?: string) => {
  const url = new URL(authConfig.endpoints.signup, authConfig.mainSiteUrl);
  if (returnUrl) {
    url.searchParams.set('returnUrl', returnUrl);
  }
  return url.toString();
};

export const getLogoutUrl = () => {
  return new URL(authConfig.endpoints.logout, authConfig.mainSiteUrl).toString();
};

export const getApiUrl = (endpoint: string) => {
  return new URL(endpoint, authConfig.apiBaseUrl).toString();
};

export default authConfig;
