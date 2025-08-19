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
  title: "JavaScript Cheatsheet — Codeunia",
  description: "Master modern JavaScript with ES6+ features, async programming, and DOM manipulation. Complete JavaScript reference guide.",
  keywords: ["javascript", "js", "es6", "programming", "web development", "cheatsheet"],
  url: "https://learn.codeunia.com/javascript"
});

export default function JavaScriptPage() {
  const rawContent = getContentSafely('javascript.md', 'JavaScript Cheatsheet');
  const content = sanitizeMarkdown(rawContent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <ArticleStructuredData
        title="JavaScript Cheatsheet"
        description="Master modern JavaScript with ES6+ features, async programming, and DOM manipulation"
        url="https://learn.codeunia.com/javascript"
        subject="JavaScript"
      />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#007AFF] hover:text-[#0056CC] mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 focus:ring-offset-[#0F0F1A] rounded-lg px-2 py-1"
            aria-label="Go back to subjects list"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Subjects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            JavaScript <span className="text-[#007AFF]">Cheatsheet</span>
          </h1>
          <p className="text-xl text-[#D1D1D1]">
            Master modern JavaScript with ES6+ features, async programming, and DOM manipulation
          </p>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none bg-[#1A1A2E] rounded-lg p-8">
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
