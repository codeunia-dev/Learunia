import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Metadata } from 'next';
import { getContentSafely, sanitizeMarkdown } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { ArticleStructuredData } from '@/components/StructuredData';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = generateSEO({
  title: "Python Cheatsheet — Codeunia",
  description: "Learn Python fundamentals, data structures, and popular frameworks for web development. Complete Python programming reference.",
  keywords: ["python", "programming", "data structures", "web development", "cheatsheet", "tutorial"],
  url: "https://learn.codeunia.com/python"
});

export default function PythonPage() {
  const rawContent = getContentSafely('python.md', 'Python Cheatsheet');
  const content = sanitizeMarkdown(rawContent);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0a0a0f]">
        <ArticleStructuredData
          title="Python Cheatsheet"
          description="Learn Python fundamentals, data structures, and popular frameworks for web development"
          url="https://learn.codeunia.com/python"
          subject="Python"
        />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#007AFF] hover:text-[#0056CC] mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Subjects
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Python <span className="text-[#007AFF]">Cheatsheet</span>
            </h1>
            <p className="text-xl text-[#d1d1d1]">
              Learn Python fundamentals, data structures, and popular frameworks for web development
            </p>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none bg-[#1a1a1f] border border-[#2a2a35] rounded-lg p-8">
            <ReactMarkdown 
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
