'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-[#8B949E] mt-4">Verifying your access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-[#007AFF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Access Required</h2>
          <p className="text-[#8B949E] mb-6">
            You need to be logged in to Codeunia to access this content.
          </p>
          <div className="space-y-3">
            <a
              href={`https://codeunia.com/auth/signin?returnUrl=${encodeURIComponent(window.location.href)}`}
              className="inline-flex items-center justify-center w-full bg-[#007AFF] hover:bg-[#0056CC] text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Sign In to Codeunia
            </a>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center w-full bg-transparent border border-[#2a2a35] hover:bg-[#2a2a35] text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Already logged in? Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for page-level protection
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
