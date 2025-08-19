'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
        {user.avatar ? (
          <Image 
            src={user.avatar} 
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
            loading="lazy"
          />
        ) : (
          <div className="w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-medium">{user.name}</p>
          <p className="text-[#8B949E] text-xs capitalize">{user.plan}</p>
        </div>
        <svg className="w-4 h-4 text-[#8B949E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1f] border border-[#2a2a35] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="p-3 border-b border-[#2a2a35]">
          <p className="text-white font-medium">{user.name}</p>
          <p className="text-[#8B949E] text-sm">{user.email}</p>
        </div>
        <div className="p-2">
          <a
            href="https://codeunia.com/dashboard"
            className="block px-3 py-2 text-[#d1d1d1] hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            Dashboard
          </a>
          <a
            href="https://codeunia.com/settings"
            className="block px-3 py-2 text-[#d1d1d1] hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            Settings
          </a>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-[#d1d1d1] hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
