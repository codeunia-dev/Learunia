import Hero from '@/components/Hero';
import SubjectCard from '@/components/SubjectCard';

// Comprehensive programming subjects organized by category
const SUBJECTS = [
  // Core Programming Languages
  {
    id: 'python',
    title: 'Python',
    description: 'Learn Python fundamentals, data structures, and popular frameworks for web development.',
    iconName: 'PythonIcon' as const,
    href: '/python',
    category: 'languages'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master modern JavaScript with ES6+ features, async programming, and DOM manipulation.',
    iconName: 'JavaScriptIcon' as const,
    href: '/javascript',
    category: 'languages'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Enhance JavaScript with static typing, interfaces, and advanced development features.',
    iconName: 'TypeScriptIcon' as const,
    href: '/typescript',
    category: 'languages'
  },
  {
    id: 'java',
    title: 'Java',
    description: 'Object-oriented programming with Java, covering syntax, OOP concepts, and frameworks.',
    iconName: 'JavaIcon' as const,
    href: '/java',
    category: 'languages'
  },
  {
    id: 'cpp',
    title: 'C++',
    description: 'Master C++ programming with STL, memory management, and performance optimization.',
    iconName: 'CppIcon' as const,
    href: '/cpp',
    category: 'languages'
  },
  {
    id: 'c',
    title: 'C',
    description: 'Learn C programming fundamentals, pointers, and system-level programming concepts.',
    iconName: 'CIcon' as const,
    href: '/c',
    category: 'languages'
  },
  {
    id: 'csharp',
    title: 'C#',
    description: 'Develop with C# and .NET framework, covering OOP, LINQ, and modern features.',
    iconName: 'CSharpIcon' as const,
    href: '/csharp',
    category: 'languages'
  },
  {
    id: 'go',
    title: 'Go',
    description: 'Modern programming with Go, featuring concurrency, simplicity, and performance.',
    iconName: 'GoIcon' as const,
    href: '/go',
    category: 'languages'
  },
  {
    id: 'rust',
    title: 'Rust',
    description: 'Systems programming with Rust, focusing on memory safety and zero-cost abstractions.',
    iconName: 'RustIcon' as const,
    href: '/rust',
    category: 'languages'
  },
  
  // Web Technologies
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure web content with semantic HTML5 elements, forms, and accessibility features.',
    iconName: 'HTMLIcon' as const,
    href: '/html',
    category: 'web'
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and layout websites with CSS selectors, properties, flexbox, and grid systems.',
    iconName: 'CSSIcon' as const,
    href: '/css',
    category: 'web'
  },
  {
    id: 'react',
    title: 'React',
    description: 'Build modern user interfaces with React hooks, components, and state management.',
    iconName: 'ReactIcon' as const,
    href: '/react',
    category: 'web'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Server-side JavaScript with Node.js, Express, and modern backend development patterns.',
    iconName: 'NodeJSIcon' as const,
    href: '/nodejs',
    category: 'web'
  },
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'Progressive framework for building user interfaces with Vue 3 and Composition API.',
    iconName: 'VueIcon' as const,
    href: '/vue',
    category: 'web'
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Full-featured framework for building scalable web applications with TypeScript.',
    iconName: 'AngularIcon' as const,
    href: '/angular',
    category: 'web'
  },
  
  // Database & Backend
  {
    id: 'sql',
    title: 'SQL',
    description: 'Database querying with SQL, from basic SELECT statements to complex JOINs and subqueries.',
    iconName: 'SQLIcon' as const,
    href: '/sql',
    category: 'database'
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'NoSQL database operations with MongoDB, aggregation pipelines, and document modeling.',
    iconName: 'MongoDBIcon' as const,
    href: '/mongodb',
    category: 'database'
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Advanced PostgreSQL features, performance tuning, and complex data operations.',
    iconName: 'PostgreSQLIcon' as const,
    href: '/postgresql',
    category: 'database'
  },
  
  // Tools & DevOps
  {
    id: 'git',
    title: 'Git',
    description: 'Version control mastery with Git commands, branching strategies, and collaboration workflows.',
    iconName: 'GitIcon' as const,
    href: '/git',
    category: 'tools'
  },
  {
    id: 'docker',
    title: 'Docker',
    description: 'Containerization with Docker, from basic containers to multi-stage builds and orchestration.',
    iconName: 'DockerIcon' as const,
    href: '/docker',
    category: 'tools'
  },
  {
    id: 'linux',
    title: 'Linux',
    description: 'Command line mastery with Linux commands, shell scripting, and system administration.',
    iconName: 'LinuxIcon' as const,
    href: '/linux',
    category: 'tools'
  },
  
  // Mobile Development
  {
    id: 'kotlin',
    title: 'Kotlin',
    description: 'Modern Android development with Kotlin, coroutines, and Android Jetpack.',
    iconName: 'KotlinIcon' as const,
    href: '/kotlin',
    category: 'mobile'
  },
  {
    id: 'swift',
    title: 'Swift',
    description: 'iOS development with Swift, UIKit, SwiftUI, and modern iOS patterns.',
    iconName: 'SwiftIcon' as const,
    href: '/swift',
    category: 'mobile'
  },
  {
    id: 'flutter',
    title: 'Flutter',
    description: 'Cross-platform mobile development with Flutter and Dart programming language.',
    iconName: 'FlutterIcon' as const,
    href: '/flutter',
    category: 'mobile'
  }
] as const;

export default function HomePage() {
  // Group subjects by category for organized display
  const subjectsByCategory = {
    languages: SUBJECTS.filter(subject => subject.category === 'languages'),
    web: SUBJECTS.filter(subject => subject.category === 'web'),
    database: SUBJECTS.filter(subject => subject.category === 'database'),
    tools: SUBJECTS.filter(subject => subject.category === 'tools'),
    mobile: SUBJECTS.filter(subject => subject.category === 'mobile')
  };

  const categoryTitles = {
    languages: 'Programming Languages',
    web: 'Web Development',
    database: 'Database & Backend',
    tools: 'Tools & DevOps',
    mobile: 'Mobile Development'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <Hero />
      
      {/* Subjects by Category */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="text-[#007AFF]">Subject</span>
            </h2>
            <p className="text-xl text-[#D1D1D1] max-w-3xl mx-auto">
              Explore our comprehensive cheatsheets covering the most essential programming topics, organized by category
            </p>
          </div>

          {Object.entries(subjectsByCategory).map(([category, subjects]) => (
            <div key={category} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((subject) => (
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
          ))}
        </div>
      </section>
    </div>
  );
}
