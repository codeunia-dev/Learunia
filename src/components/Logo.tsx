import React, { useId } from 'react';

/**
 * Codeunia Logo Component
 * 
 * This is the official logo component for Codeunia. It should be used consistently
 * across the entire platform to maintain brand identity.
 * 
 * Design specs:
 * - Blue rounded square background (#007AFF)
 * - White 'C' shape arc on the right side
 * - Colorful gradient dot at the bottom
 * - Optional "Codeunia" wordmark
 * 
 * Usage guidelines:
 * - Use LogoIcon component for standalone icon usage
 * - Use Logo component when you need the wordmark
 * - Minimum size: 24px
 * - Recommended sizes: 32px (default), 40px, 48px, 64px
 * 
 * @param size - Logo size in pixels (default: 32)
 * @param showWordmark - Whether to show "Codeunia" text (default: true)
 * @param className - Additional CSS classes
 */

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export default function Logo({ size = 32, showWordmark = true, className = '' }: LogoProps) {
  const gradientId = useId();
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Logo */}
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="30%" stopColor="#6C63FF" />
              <stop offset="60%" stopColor="#FF6EC7" />
              <stop offset="100%" stopColor="#FF9F45" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="200" rx="40" ry="40" fill="#007AFF" />
          <path d="M165,100 A65,65 0 1 1 100,35" fill="none" stroke="#000000" strokeWidth="30" strokeLinecap="round" />
          <circle cx="100" cy="165" r="15" fill={`url(#${gradientId})`} />
        </svg>
      </div>
      
      {/* Wordmark */}
      {showWordmark && (
        <span className="text-white font-medium text-xl leading-none">Codeunia</span>
      )}
    </div>
  );
}
