import DocsLayout from "../../components/DocsLayout";
import Link from 'next/link';

export default function DocsPage() {
  const docCategories = [
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

  return (
    <DocsLayout title="Documentation">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-[#d1d1d1]">
            Comprehensive guides and references for programming languages, frameworks, and tools.
          </p>
        </div>

        <div className="grid gap-8">
          {docCategories.map((category) => (
            <div key={category.title} className="bg-[#0a0a0f] border border-[#2a2a35] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-3 bg-[#1a1a1f] border border-[#2a2a35] rounded-lg hover:border-[#007AFF] hover:bg-[#1f1f2a] transition-colors"
                  >
                    <div className="text-[#d1d1d1] hover:text-white font-medium">
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#0a0a0f] border border-[#2a2a35] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/docs/overview"
              className="block p-4 bg-[#1a1a1f] border border-[#2a2a35] rounded-lg hover:border-[#007AFF] hover:bg-[#1f1f2a] transition-colors"
            >
              <div className="text-[#d1d1d1] hover:text-white font-medium">Overview</div>
              <div className="text-sm text-[#888] mt-1">Learn about the platform</div>
            </Link>
            <Link
              href="/docs/quick-start"
              className="block p-4 bg-[#1a1a1f] border border-[#2a2a35] rounded-lg hover:border-[#007AFF] hover:bg-[#1f1f2a] transition-colors"
            >
              <div className="text-[#d1d1d1] hover:text-white font-medium">Quick Start</div>
              <div className="text-sm text-[#888] mt-1">Get started quickly</div>
            </Link>
            <Link
              href="/docs/installation"
              className="block p-4 bg-[#1a1a1f] border border-[#2a2a35] rounded-lg hover:border-[#007AFF] hover:bg-[#1f1f2a] transition-colors"
            >
              <div className="text-[#d1d1d1] hover:text-white font-medium">Installation</div>
              <div className="text-sm text-[#888] mt-1">Setup instructions</div>
            </Link>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
