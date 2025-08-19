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
  title: "CSS Cheatsheet — Codeunia",
  description: "Master CSS styling, layouts, animations, and modern CSS features for responsive web design and user interfaces.",
  keywords: ["css", "styling", "layout", "flexbox", "grid", "animations", "responsive design", "web development"],
  url: "https://learn.codeunia.com/css"
});

export default function CSSPage() {
  const rawContent = getContentSafely('css.md', 'CSS Cheatsheet');
  const content = sanitizeMarkdown(rawContent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <ArticleStructuredData
        title="CSS Cheatsheet"
        description="Master CSS styling, layouts, animations, and modern CSS features for responsive web design"
        url="https://learn.codeunia.com/css"
        subject="CSS"
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
            CSS <span className="text-[#007AFF]">Cheatsheet</span>
          </h1>
          <p className="text-xl text-[#D1D1D1]">
            Master CSS styling with selectors, properties, and modern layout techniques
          </p>
        </div>

        <div className="bg-[#1A1A2E]/50 border border-white/10 rounded-xl p-8 prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
