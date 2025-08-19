import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Metadata } from 'next';
import { getContentSafely, sanitizeMarkdown } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { ArticleStructuredData } from '@/components/StructuredData';

export const metadata: Metadata = generateSEO({
  title: "React Cheatsheet — Codeunia",
  description: "Master React fundamentals including components, hooks, state management, and modern React patterns for building web applications.",
  keywords: ["react", "javascript", "components", "hooks", "state management", "frontend", "web development"],
  url: "https://learn.codeunia.com/react"
});

export default function ReactPage() {
  const rawContent = getContentSafely('react.md', 'React Cheatsheet');
  const content = sanitizeMarkdown(rawContent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <ArticleStructuredData
        title="React Cheatsheet"
        description="Master React fundamentals including components, hooks, state management, and modern React patterns"
        url="https://learn.codeunia.com/react"
        subject="React"
      />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#007AFF] mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Subjects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            React <span className="text-[#007AFF]">Cheatsheet</span>
          </h1>
          <p className="text-xl text-[#D1D1D1]">
            Build modern user interfaces with React hooks, components, and state management
          </p>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none bg-[#1A2E] rounded-lg p-8">
          <ReactMarkdown 
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
