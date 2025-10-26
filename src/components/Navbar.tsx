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
        <div className="flex items-center h-14 sm:h-16">
          {/* Left: Logo and Learunia */}
          <div className="flex items-center">
            <Link href="https://codeunia.com/" className="flex items-center">
              <div className="sm:hidden">
                <Logo size={28} showWordmark={true} />
              </div>
              <div className="hidden sm:block">
                <Logo size={32} showWordmark={true} />
              </div>
            </Link>
          </div>

          {/* Middle: Desktop Navigation Links */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
              >
                Home
              </Link>
              <a
                href="https://www.codeunia.com/about"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <Link
                href="/cheatsheets"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
              >
                Cheatsheets
              </Link>
              <Link
                href="/docs"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
              >
                Docs
              </Link>
              <Link
                href="/roadmap"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
              >
                Roadmap
              </Link>
              <a
                href="https://www.codeunia.com/contact"
                className="text-[#d1d1d1] hover:text-white transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-[#1a1a1f]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right: Login and Signup */}
          <div className="hidden md:flex items-center">
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
              <Link 
                href="/" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="https://www.codeunia.com/about" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link 
                href="/cheatsheets" 
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cheatsheets
              </Link>
              <Link
                href="/docs"
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <a
                href="https://www.codeunia.com/contact"
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                href="/roadmap"
                className="flex items-center text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f] transition-colors duration-200 px-3 py-3 rounded-lg text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Roadmap
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
