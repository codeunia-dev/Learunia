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
  title: "SQL Cheatsheet — Codeunia",
  description: "Learn SQL database fundamentals including queries, joins, functions, and database design for data management and analysis.",
  keywords: ["sql", "database", "queries", "joins", "data analysis", "mysql", "postgresql", "sqlite"],
  url: "https://learn.codeunia.com/sql"
});

export default function SQLPage() {
  const rawContent = getContentSafely('sql.md', 'SQL Cheatsheet');
  const content = sanitizeMarkdown(rawContent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <ArticleStructuredData
        title="SQL Cheatsheet"
        description="Learn SQL database fundamentals including queries, joins, functions, and database design"
        url="https://learn.codeunia.com/sql"
        subject="SQL"
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
            SQL <span className="text-[#007AFF]">Cheatsheet</span>
          </h1>
          <p className="text-xl text-[#D1D1D1]">
            Database querying with SQL, from basic SELECT statements to complex JOINs and subqueries
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
