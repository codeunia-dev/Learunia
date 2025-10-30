'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DocsSearch from './DocsSearch';

interface DocsSidebarProps {
  isMobile: boolean;
  isOpen?: boolean;
}

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Overview', href: '/docs' },
      { name: 'Quick Start', href: '/docs/quick-start' },
      { name: 'Installation', href: '/docs/installation' },
    ]
  },
  {
    title: 'Programming Languages',
    items: [
      { name: 'Python', href: '/docs/python' },
      { name: 'JavaScript', href: '/docs/javascript' },
      { name: 'TypeScript', href: '/docs/typescript' },
      { name: 'Java', href: '/docs/java' },
      { name: 'C++', href: '/docs/cpp' },
      { name: 'Go', href: '/docs/go' },
    ]
  },
  {
    title: 'Web Development',
    items: [
      { name: 'HTML', href: '/docs/html' },
      { name: 'CSS', href: '/docs/css' },
      { name: 'React', href: '/docs/react' },
      { name: 'Node.js', href: '/docs/nodejs' },
      { name: 'Vue.js', href: '/docs/vue' },
    ]
  },
  {
    title: 'Database & Tools',
    items: [
      { name: 'SQL', href: '/docs/sql' },
      { name: 'MongoDB', href: '/docs/mongodb' },
      { name: 'Git', href: '/docs/git' },
      { name: 'Docker', href: '/docs/docker' },
      { name: 'Linux', href: '/docs/linux' },
    ]
  },
  {
    title: 'Mobile Development',
    items: [
      { name: 'React Native', href: '/docs/react-native' },
      { name: 'Flutter', href: '/docs/flutter' },
      { name: 'iOS/Swift', href: '/docs/ios' },
      { name: 'Android/Kotlin', href: '/docs/android' },
    ]
  }
];

export default function DocsSidebar({ isMobile, isOpen = true }: DocsSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-3 text-2xl border-b border-[#2a2a35] bg-[#111118]">
    Documentation
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <nav className="space-y-2">
          {navigation.map((section) => (
            <div key={section.title}>
              <div className="flex items-center w-full text-left px-3 py-2 text-sm font-semibold text-[#d1d1d1] uppercase tracking-wider rounded-lg">
                <span>{section.title}</span>
              </div>
              <ul className="space-y-1 mt-1 ml-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-[#007AFF] text-white'
                          : 'text-[#d1d1d1] hover:text-white hover:bg-[#1a1a1f]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    // On mobile, only render sidebar if it's open
    if (!isOpen) {
      return null;
    }

    return (
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#0a0a0f] border-r border-[#2a2a35] z-40">
        {sidebarContent}
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#0a0a0f] border-r border-[#2a2a35] z-40">
      {sidebarContent}
    </div>
  );
}
