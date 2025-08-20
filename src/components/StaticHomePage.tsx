'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import SubjectCard from '@/components/SubjectCard';

// Fallback component that works without authentication
export default function StaticHomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007AFF] mx-auto mb-4"></div>
          <p className="text-[#d1d1d1] text-lg">Loading Learnunia...</p>
        </div>
      </div>
    );
  }

  // Core subjects that don't require authentication to view
  const coreSubjects = [
    {
      id: 'python',
      title: 'Python',
      description: 'Learn Python fundamentals, data structures, and popular frameworks.',
      iconName: 'PythonIcon' as const,
      href: '/python',
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      description: 'Master modern JavaScript with ES6+ features and async programming.',
      iconName: 'JavaScriptIcon' as const,
      href: '/javascript',
    },
    {
      id: 'react',
      title: 'React',
      description: 'Build interactive UIs with React hooks and modern patterns.',
      iconName: 'ReactIcon' as const,
      href: '/react',
    },
    {
      id: 'nodejs',
      title: 'Node.js',
      description: 'Server-side JavaScript with Express and backend development.',
      iconName: 'NodeJSIcon' as const,
      href: '/nodejs',
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Master Programming with 
              <span className="text-[#007AFF]"> Quick Cheatsheets</span>
            </h2>
            <p className="text-xl text-[#d1d1d1] max-w-3xl mx-auto">
              Access comprehensive programming references for 20+ languages and technologies. 
              From beginner basics to advanced concepts, accelerate your coding productivity.
            </p>
          </div>

          {/* Core Subjects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Popular Languages</h3>
            <p className="text-[#d1d1d1] mb-8">Essential programming languages for modern development</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  title={subject.title}
                  description={subject.description}
                  iconName={subject.iconName}
                  href={subject.href}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
