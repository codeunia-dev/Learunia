'use client';

import { useEffect } from 'react';

export default function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add a global handler for hydration mismatches caused by browser extensions
    const handleHydrationError = (event: ErrorEvent) => {
      const message = event.message;
      
      // Suppress hydration warnings for browser extension attributes
      if (
        message?.includes('hydration') &&
        (
          message.includes('data-new-gr-c-s-check-loaded') ||
          message.includes('data-gr-ext-installed') ||
          message.includes('data-grammarly-shadow-root') ||
          message.includes('grammarly') ||
          message.includes('browser extension')
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Override console.error for hydration warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0];
      
      if (
        typeof message === 'string' && 
        message.includes('hydration') &&
        (
          message.includes('data-new-gr-c-s-check-loaded') ||
          message.includes('data-gr-ext-installed') ||
          message.includes('grammarly')
        )
      ) {
        // Silently ignore these hydration warnings
        return;
      }
      
      originalConsoleError.apply(console, args);
    };

    window.addEventListener('error', handleHydrationError);

    return () => {
      window.removeEventListener('error', handleHydrationError);
      console.error = originalConsoleError;
    };
  }, []);

  return <>{children}</>;
}
