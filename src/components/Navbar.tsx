'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import UserProfile from './UserProfile';
import ClientOnly from './ClientOnly';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#2a2a35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="sm:hidden">
              <Logo size={28} showWordmark={true} />
            </div>
            <div className="hidden sm:block">
              <Logo size={32} showWordmark={true} />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a 
              href="https://www.codeunia.com/" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
            >
              Home
            </a>
            <a 
              href="https://www.codeunia.com/about" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
            >
              About
            </a>
            <a 
              href="https://www.codeunia.com/opportunities" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
            >
              Opportunities
            </a>
            <a 
              href="https://www.codeunia.com/blog" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
            >
              Blog
            </a>
            <a 
              href="https://www.codeunia.com/join" 
              className="bg-[#007AFF] hover:bg-[#0056CC] text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Join Codeunia
            </a>
            <a 
              href="https://www.codeunia.com/contact" 
              className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
            >
              Contact
            </a>
            <ClientOnly fallback={<div className="w-8 h-8"></div>}>
              <UserProfile />
            </ClientOnly>
          </div>

          {/* Mobile menu button and auth */}
          <div className="md:hidden flex items-center space-x-3">
            <ClientOnly fallback={<div className="w-8 h-8"></div>}>
              <UserProfile />
            </ClientOnly>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#d1d1d1] hover:text-white p-2 rounded-lg hover:bg-[#1a1a1f] transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#2a2a35] bg-[#0a0a0f]/98 backdrop-blur-md">
            <div className="px-2 py-3 space-y-1">
              <a 
                href="https://www.codeunia.com/" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="https://www.codeunia.com/about" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="https://www.codeunia.com/opportunities" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Opportunities
              </a>
              <a 
                href="https://www.codeunia.com/blog" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="https://www.codeunia.com/contact" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://www.codeunia.com/join" 
                className="flex items-center bg-[#007AFF] hover:bg-[#0056CC] text-white transition-colors duration-200 px-3 py-3 rounded-lg text-base font-medium mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Codeunia
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


