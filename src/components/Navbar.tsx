'use client';

import Link from 'next/link';
import Logo from './Logo';
import UserProfile from './UserProfile';
import ClientOnly from './ClientOnly';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2a2a35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size={32} showWordmark={true} />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <ClientOnly fallback={<div className="w-8 h-8"></div>}>
              <UserProfile />
            </ClientOnly>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-[#d1d1d1] hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


