import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Metadata } from 'next';
import { getContentSafely } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { ArticleStructuredData } from '@/components/StructuredData';

export const metadata: Metadata = generateSEO({
  title: 'Kotlin Programming Cheatsheet',
  description: 'Comprehensive Kotlin programming guide with syntax, Android development, coroutines, and best practices.',
  keywords: ['kotlin', 'android', 'jvm', 'programming', 'coroutines']
});

export default async function KotlinPage() {
  const content = await getContentSafely('kotlin.md', 'Kotlin Programming Cheatsheet');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117]">
      <ArticleStructuredData 
        title="Kotlin Programming Cheatsheet"
        description="Complete Kotlin programming reference with syntax, Android development, and coroutines"
        url="/kotlin"
        datePublished="2024-01-15"
        dateModified="2024-01-15"
        subject="kotlin"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Kotlin Programming
          </h1>
          <p className="text-xl text-[#D1D1D1] max-w-2xl mx-auto">
            Modern Android development with Kotlin, coroutines, and JVM interoperability
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-8 border border-white/10 overflow-hidden">
          <div className="prose prose-invert prose-blue max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-4">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-medium text-white mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-[#D1D1D1] mb-4 leading-relaxed">{children}</p>,
                code: ({children, className}) => {
                  const isBlock = className?.includes('language-');
                  if (isBlock) {
                    return <code className={className}>{children}</code>;
                  }
                  return <code className="bg-white/10 text-[#FFB86C] px-2 py-1 rounded text-sm font-mono">{children}</code>;
                },
                pre: ({children}) => (
                  <div className="overflow-x-auto mb-6">
                    <pre className="bg-[#0D1117] border border-white/10 rounded-lg p-4 text-sm">{children}</pre>
                  </div>
                ),
                ul: ({children}) => <ul className="list-disc list-inside mb-4 text-[#D1D1D1] space-y-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-[#D1D1D1] space-y-2">{children}</ol>,
                li: ({children}) => <li className="text-[#D1D1D1]">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-[#007AFF] pl-4 italic mb-4 text-[#D1D1D1]">{children}</blockquote>
                ),
                table: ({children}) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-white/20 rounded-lg">{children}</table>
                  </div>
                ),
                th: ({children}) => <th className="border border-white/20 px-4 py-2 bg-white/5 text-white font-semibold text-left">{children}</th>,
                td: ({children}) => <td className="border border-white/20 px-4 py-2 text-[#D1D1D1]">{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] transition-colors duration-200"
          >
            ← Back to Cheatsheets
          </Link>
        </div>
      </div>
    </div>
  );
}
