'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function CrossDomainAuth() {
  const { login } = useAuth();

  useEffect(() => {
    // Listen for messages from the main Codeunia domain
    const handleMessage = async (event: MessageEvent) => {
      // Only accept messages from the main Codeunia domain
      if (event.origin !== 'https://codeunia.com') {
        return;
      }

      if (event.data.type === 'CODEUNIA_AUTH_TOKEN') {
        const { token } = event.data;
        if (token) {
          await login(token);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Send a message to parent window (if in iframe) requesting auth status
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'REQUEST_AUTH_STATUS' }, 'https://codeunia.com');
    }

    // Also try to communicate with main domain via localStorage events
    const checkAuthFromMainDomain = () => {
      // Try to check if user is authenticated on main domain
      // This would work if both domains set a shared localStorage key
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'https://codeunia.com/auth/check?origin=' + encodeURIComponent(window.location.origin);
      document.body.appendChild(iframe);

      // Remove iframe after 5 seconds
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 5000);
    };

    // Check auth status on mount
    checkAuthFromMainDomain();

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [login]);

  return null; // This is an invisible component
}
