import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Metadata } from 'next';
import { getContentWithMeta } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { ArticleStructuredData } from '@/components/StructuredData';
import { subjects } from '@/lib/subjects';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import mdxComponents from '@/components/mdx';

export async function generateStaticParams() {
  return Object.keys(subjects).map((subject) => ({
    subject,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const awaitedParams = await params;
  const subject = subjects[awaitedParams.subject];
  if (!subject) {
    return notFound();
  }
  return generateSEO(subject);
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const awaitedParams = await params;
  const subject = subjects[awaitedParams.subject];

  if (!subject) {
    return notFound();
  }

  const { content, isMDX } = getContentWithMeta(subject.markdownFile, subject.cheatsheetName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <ArticleStructuredData
        title={subject.cheatsheetName}
        description={subject.description}
        url={subject.url}
        subject={subject.subject}
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
            {subject.subject} <span className="text-[#007AFF]">Cheatsheet</span>
          </h1>
          <p className="text-xl text-[#D1D1D1]">
            {subject.description}
          </p>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none bg-[#1A1A2E] rounded-lg p-8">
          {isMDX ? (
            <MDXRemote 
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypeHighlight, { detect: true }], rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                },
              }}
              components={mdxComponents}
            />
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[[rehypeHighlight, { detect: true }], rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}