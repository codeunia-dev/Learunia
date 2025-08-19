'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// User interface
interface User {
  id: string;
  email: string;
  name?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSupabaseConfigured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert Supabase user to our User interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertSupabaseUser(supabaseUser: any): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Check if Supabase is properly configured
  const isSupabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Hydration fix - only run client-side logic after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }
      
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const convertedUser = convertSupabaseUser(data.user);
        setUser(convertedUser);
        setSession(data.session);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Skip auth if Supabase is not configured
      if (!isSupabaseConfigured || !supabase) {
        setUser(null);
        setSession(null);
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session?.user) {
        const convertedUser = convertSupabaseUser(data.session.user);
        setUser(convertedUser);
        setSession(data.session);
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, [isSupabaseConfigured]);

  useEffect(() => {
    // Only run on client side to prevent SSR hydration issues
    if (!isClient) return;
    
    // Check for auth token on mount and set up auth state listener
    refreshAuth();
    
    try {
      // Set up auth state change listener
      if (supabase) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              const convertedUser = convertSupabaseUser(session.user);
              setUser(convertedUser);
              setSession(session);
            } else {
              setUser(null);
              setSession(null);
            }
            setIsLoading(false);
          }
        );

        return () => subscription.unsubscribe();
      }
    } catch (error) {
      console.error('Failed to set up auth listener:', error);
      setIsLoading(false);
    }
  }, [refreshAuth, isClient]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    isSupabaseConfigured,
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

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
