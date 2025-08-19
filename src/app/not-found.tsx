import Link from 'next/link';
import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: "Page Not Found — Codeunia",
  description: "The page you're looking for doesn't exist. Return to our homepage to explore programming cheatsheets.",
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#007AFF]/10 rounded-full">
            <svg className="w-10 h-10 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m-3-16v4m0 8v4" />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            Looks like you&apos;ve ventured into uncharted code territory. 
            Let&apos;s get you back to familiar ground.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-[#007AFF] hover:bg-[#0056CC] text-white px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 focus:ring-offset-[#0F0F1A]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          
          <p className="text-sm text-gray-500">
            Or explore our popular cheatsheets:
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {['JavaScript', 'Python', 'React', 'Git'].map((subject) => (
              <Link
                key={subject}
                href={`/${subject.toLowerCase()}`}
                className="text-[#007AFF] hover:text-[#0056CC] text-sm underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 focus:ring-offset-[#0F0F1A] rounded px-1"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
