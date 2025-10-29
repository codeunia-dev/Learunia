'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const SEARCHABLE_SUBJECTS = [
    // Docs-specific subjects
    { name: 'Getting Started', path: '/docs/getting-started', keywords: ['docs', 'getting started', 'introduction', 'setup', 'guide'] },
    { name: 'API Reference', path: '/docs/api', keywords: ['docs', 'api', 'reference', 'endpoints', 'rest', 'graphql'] },
    { name: 'Configuration', path: '/docs/configuration', keywords: ['docs', 'config', 'settings', 'environment', 'setup'] },
    { name: 'Authentication', path: '/docs/authentication', keywords: ['docs', 'auth', 'login', 'signup', 'jwt', 'oauth'] },
    { name: 'Deployment', path: '/docs/deployment', keywords: ['docs', 'deploy', 'production', 'hosting', 'vercel', 'netlify'] },
    { name: 'FAQ', path: '/docs/faq', keywords: ['docs', 'faq', 'questions', 'help', 'support'] },
    { name: 'Troubleshooting', path: '/docs/troubleshooting', keywords: ['docs', 'troubleshoot', 'errors', 'debug', 'issues'] },
    { name: 'Contributing', path: '/docs/contributing', keywords: ['docs', 'contribute', 'github', 'open source', 'pr', 'issues'] },
    // Language-specific docs
    { name: 'JavaScript Docs', path: '/docs/javascript', keywords: ['javascript', 'js', 'docs', 'language', 'ecmascript'] },
    { name: 'TypeScript Docs', path: '/docs/typescript', keywords: ['typescript', 'ts', 'docs', 'language', 'types'] },
    { name: 'Python Docs', path: '/docs/python', keywords: ['python', 'py', 'docs', 'language', 'scripting'] },
    { name: 'Java Docs', path: '/docs/java', keywords: ['java', 'docs', 'language', 'jvm'] },
    { name: 'C++ Docs', path: '/docs/cpp', keywords: ['c++', 'cpp', 'docs', 'language', 'c plus plus'] },
    { name: 'Go Docs', path: '/docs/go', keywords: ['go', 'golang', 'docs', 'language'] },
    { name: 'Rust Docs', path: '/docs/rust', keywords: ['rust', 'docs', 'language'] },
    // Add more languages as needed
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<typeof SEARCHABLE_SUBJECTS>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const results = SEARCHABLE_SUBJECTS.filter(subject =>
        subject.name.toLowerCase().includes(query.toLowerCase()) ||
        subject.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredResults(results);
      setIsOpen(results.length > 0);
    } else {
      setFilteredResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      router.push(filteredResults[0].path);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-[#D1D1D1] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 hover:text-[#007AFF] transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D1D1D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1A1A2E] border border-white/20 rounded-xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
          {filteredResults.map((result) => (
            <button
              key={result.path}
              onClick={() => handleResultClick(result.path)}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-white group-hover:text-[#007AFF] transition-colors text-sm sm:text-base">
                  {result.name}
                </span>
                <svg className="w-4 h-4 text-[#D1D1D1] group-hover:text-[#007AFF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length > 0 && filteredResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1A1A2E] border border-white/20 rounded-xl shadow-2xl backdrop-blur-sm z-50 px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-[#D1D1D1] text-center text-sm sm:text-base">No Documentation found  &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}


