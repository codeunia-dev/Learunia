'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
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
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fix hydration issues caused by browser extensions
  useHydrationFix();

  // Convert Supabase user to our User interface
  const convertSupabaseUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      avatar: supabaseUser.user_metadata?.avatar_url,
      plan: supabaseUser.user_metadata?.plan || 'free'
    };
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
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
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoading(true);
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
  }, []);

  useEffect(() => {
    // Check for auth token on mount and set up auth state listener
    refreshAuth();
    
    // Listen for auth state changes
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
  }, [refreshAuth]);

  const value: AuthContextType = {
    user,
    session,
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
