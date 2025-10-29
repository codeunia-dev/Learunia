'use client';

import { useState, useEffect, useRef } from 'react';
import DocsSidebar from './DocsSidebar';
import TableOfContents from '../components/TableofContents';
import DocsSearch from './DocsSearch';



interface DocsLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isMobile && isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, isSidebarOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative top-0 z-40 bg-gradient-to-r from-black/95 via-black/90 to-black/95 backdrop-blur-md border-b border-[#2a2a35] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Menu button for mobile */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-[#d1d1d1] hover:text-white p-2 rounded-lg hover:bg-[#1a1a1f] transition-all duration-200 transform hover:scale-105"
                aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}

            {/* Center: Heading */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md px-4 pb-2 border-b border-[#2a2a35]">
                <DocsSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {/* {isMobile && (
        <div className="px-4 pb-4 border-b border-[#2a2a35]">
          <DocsSearch />
        </div>
      )} */}

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30" />
        )}

        {/* Left Sidebar */}
        <div ref={sidebarRef}>
          <DocsSidebar
            isMobile={isMobile}
            isOpen={isSidebarOpen}
          />
        </div>

        {/* Main Content */}
        <main className={`flex-1 ${isMobile ? '' : 'lg:ml-64'} xl:mr-64 transition-all duration-300`}>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        {!isMobile && (
          <div className="hidden xl:block fixed right-0 top-30 w-64 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
            <div className="p-4">
              <TableOfContents />

            </div>
          </div>
        )}
      </div>


    </div>
  );
}
