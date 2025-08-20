'use client';

import { useAuth } from '@/contexts/AuthContext';
import Hero from '@/components/Hero';
import SubjectCard from '@/components/SubjectCard';
import PageLoader from '@/components/PageLoader';
import ClientOnly from '@/components/ClientOnly';

export default function HomePage() {
  return (
    <ClientOnly fallback={<PageLoader />}>
      <HomeContent />
    </ClientOnly>
  );
}

function HomeContent() {
  // Always show the full homepage - content should be accessible regardless of auth status

  const subjects = [
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
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Add static typing to JavaScript for better code quality.',
      iconName: 'TypeScriptIcon' as const,
      href: '/typescript',
    },
    {
      id: 'java',
      title: 'Java',
      description: 'Enterprise-grade programming with object-oriented principles.',
      iconName: 'JavaIcon' as const,
      href: '/java',
    },
    {
      id: 'cpp',
      title: 'C++',
      description: 'High-performance programming with system-level control.',
      iconName: 'CppIcon' as const,
      href: '/cpp',
    },
    {
      id: 'c',
      title: 'C',
      description: 'Foundation language for system programming.',
      iconName: 'CIcon' as const,
      href: '/c',
    },
    {
      id: 'go',
      title: 'Go',
      description: 'Simple, fast, and reliable language for modern applications.',
      iconName: 'GoIcon' as const,
      href: '/go',
    },
    {
      id: 'rust',
      title: 'Rust',
      description: 'Memory-safe systems programming with zero-cost abstractions.',
      iconName: 'RustIcon' as const,
      href: '/rust',
    },
    {
      id: 'swift',
      title: 'Swift',
      description: 'Apple\'s modern language for iOS and macOS development.',
      iconName: 'SwiftIcon' as const,
      href: '/swift',
    },
    {
      id: 'kotlin',
      title: 'Kotlin',
      description: 'Modern language for Android and multiplatform development.',
      iconName: 'KotlinIcon' as const,
      href: '/kotlin',
    },
    {
      id: 'csharp',
      title: 'C#',
      description: 'Microsoft\'s versatile language for .NET development.',
      iconName: 'CSharpIcon' as const,
      href: '/csharp',
    },
    {
      id: 'sql',
      title: 'SQL',
      description: 'Database querying and management fundamentals.',
      iconName: 'SQLIcon' as const,
      href: '/sql',
    },
    {
      id: 'html',
      title: 'HTML',
      description: 'Structure and semantics for web development.',
      iconName: 'HTMLIcon' as const,
      href: '/html',
    },
    {
      id: 'css',
      title: 'CSS',
      description: 'Styling and layout for beautiful web interfaces.',
      iconName: 'CSSIcon' as const,
      href: '/css',
    },
    {
      id: 'git',
      title: 'Git',
      description: 'Version control and collaboration workflows.',
      iconName: 'GitIcon' as const,
      href: '/git',
    },
    {
      id: 'docker',
      title: 'Docker',
      description: 'Containerization for consistent deployment environments.',
      iconName: 'DockerIcon' as const,
      href: '/docker',
    },
    {
      id: 'linux',
      title: 'Linux',
      description: 'Command line mastery and system administration.',
      iconName: 'LinuxIcon' as const,
      href: '/linux',
    },
    {
      id: 'vue',
      title: 'Vue.js',
      description: 'Progressive framework for building user interfaces.',
      iconName: 'VueIcon' as const,
      href: '/vue',
    },
    {
      id: 'angular',
      title: 'Angular',
      description: 'Full-featured framework for dynamic web applications.',
      iconName: 'AngularIcon' as const,
      href: '/angular',
    },
    {
      id: 'flutter',
      title: 'Flutter',
      description: 'Cross-platform mobile development with Dart.',
      iconName: 'FlutterIcon' as const,
      href: '/flutter',
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      description: 'NoSQL database for modern applications.',
      iconName: 'MongoDBIcon' as const,
      href: '/mongodb',
    },
    {
      id: 'postgresql',
      title: 'PostgreSQL',
      description: 'Advanced open-source relational database.',
      iconName: 'PostgreSQLIcon' as const,
      href: '/postgresql',
    },
  ];

  // Categorize subjects
  const programmingLanguages = subjects.filter(subject => 
    ['python', 'javascript', 'typescript', 'java', 'cpp', 'c', 'go', 'rust', 'swift', 'kotlin', 'csharp'].includes(subject.id)
  );

  const webTechnologies = subjects.filter(subject => 
    ['react', 'vue', 'angular', 'html', 'css'].includes(subject.id)
  );

  const backendTools = subjects.filter(subject => 
    ['nodejs', 'sql', 'mongodb', 'postgresql'].includes(subject.id)
  );

  const devOpsTools = subjects.filter(subject => 
    ['git', 'docker', 'linux'].includes(subject.id)
  );

  const mobileFrameworks = subjects.filter(subject => 
    ['flutter'].includes(subject.id)
  );

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

          {/* Programming Languages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Programming Languages</h3>
            <p className="text-[#d1d1d1] mb-8">Essential languages for modern development</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programmingLanguages.map((subject) => (
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

          {/* Web Technologies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Web Development</h3>
            <p className="text-[#d1d1d1] mb-8">Frontend frameworks and web technologies</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webTechnologies.map((subject) => (
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

          {/* Backend & Database */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Backend & Database</h3>
            <p className="text-[#d1d1d1] mb-8">Server-side technologies and data management</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {backendTools.map((subject) => (
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

          {/* DevOps & Tools */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">DevOps & Tools</h3>
            <p className="text-[#d1d1d1] mb-8">Development tools and deployment technologies</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devOpsTools.map((subject) => (
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

          {/* Mobile Development */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Mobile Development</h3>
            <p className="text-[#d1d1d1] mb-8">Cross-platform mobile app development</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileFrameworks.map((subject) => (
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
