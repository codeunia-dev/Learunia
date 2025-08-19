'use client';

import { useEffect } from 'react';

/**
 * Hook to handle hydration mismatches caused by browser extensions
 * This specifically handles Grammarly and other extensions that modify DOM attributes
 */
export function useHydrationFix() {
  useEffect(() => {
    // Suppress hydration warnings for browser extension attributes
    const originalError = console.error;
    
    console.error = (...args) => {
      const message = args[0];
      
      // Suppress hydration warnings for known browser extension attributes
      if (
        typeof message === 'string' && 
        message.includes('hydration') &&
        (
          message.includes('data-new-gr-c-s-check-loaded') ||
          message.includes('data-gr-ext-installed') ||
          message.includes('data-grammarly-shadow-root')
        )
      ) {
        return; // Don't log these specific hydration warnings
      }
      
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);
}

export default useHydrationFix;
