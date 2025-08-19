'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useHydrationFix from '@/hooks/useHydrationFix';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fix hydration issues caused by browser extensions
  useHydrationFix();

  const fetchUser = async (token: string): Promise<User | null> => {
    try {
      const response = await fetch('https://api.codeunia.com/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  };

  const login = useCallback(async (token?: string) => {
    try {
      let authToken = token;
      
      // If no token provided, check URL parameters
      if (!authToken && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        authToken = urlParams.get('token') || undefined;
      }
      
      if (!authToken) {
        throw new Error('No authentication token provided');
      }

      // Validate token with main Codeunia API
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: authToken }),
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      const userData = await response.json();
      setUser(userData.user);
      
      // Store token in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', authToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);  const logout = () => {
    // Clear the auth cookie
    document.cookie = 'codeunia_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    
    // Redirect to main Codeunia site
    window.location.href = 'https://codeunia.com/auth/logout';
  };

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      // First check if we have a token in the URL (from auth callback)
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');
      
      if (urlToken) {
        // We have a token in URL, use it to authenticate
        await login(urlToken);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Check for token in cookie
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('codeunia_auth_token='))
        ?.split('=')[1];

      if (token) {
        const userData = await fetchUser(token);
        setUser(userData);
      } else {
        // No token found, check if user is logged in on main domain
        await checkMainDomainAuth();
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const checkMainDomainAuth = async () => {
    try {
      // Try to get user info from main domain API with credentials
      const response = await fetch('https://api.codeunia.com/auth/me', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        // If we got user data, extract token from response headers or set a flag
        setUser(userData);
      }
    } catch {
      console.log('No active session on main domain');
    }
  };

  useEffect(() => {
    // Check for auth token on mount
    refreshAuth();
  }, [refreshAuth]);

  // Handle return from main Codeunia login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      login(token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [login]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
