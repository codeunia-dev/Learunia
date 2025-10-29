import DocsLayout from "../../../components/DocsLayout";
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Available documentation files
const docsFiles: Record<string, string> = {
  'python': 'python.mdx',
  'javascript': 'javascript.mdx',
  'typescript': 'typescript.mdx',
  'java': 'java.mdx',
  'cpp': 'cpp.mdx',
  'go': 'go.mdx',
  'html': 'html.mdx',
  'css': 'css.mdx',
  'react': 'react.mdx',
  'nodejs': 'nodejs.mdx',
  'vue': 'vue.mdx',
  'sql': 'sql.mdx',
  'mongodb': 'mongodb.mdx',
  'git': 'git.mdx',
  'docker': 'docker.mdx',
  'linux': 'linux.mdx',
  'flutter': 'flutter.mdx',
  'ios': 'swift.mdx',
  'android': 'kotlin.mdx',
};

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fileName = docsFiles[slug];

  if (!fileName) {
    return {
      title: 'Documentation Not Found',
    };
  }

  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

  return {
    title: `${title} - Codeunia Learn Documentation`,
    description: `Learn about ${title.toLowerCase()} in the Codeunia Learn documentation.`,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const fileName = docsFiles[slug];

  if (!fileName) {
    notFound();
  }

  // Read the markdown file
  const docsPath = path.join(process.cwd(), 'docs', fileName);

  try {
    const content = fs.readFileSync(docsPath, 'utf8');

    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

    return (
      <DocsLayout title={title}>
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-[#d1d1d1]">
              Comprehensive documentation for {title.toLowerCase()}
            </p>
          </div>

          <div className="bg-[#0a0a0f] border border-[#2a2a35] rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="prose prose-invert max-w-none text-[#d1d1d1] [&_h1]:text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-white [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2 [&_h3]:mt-4 [&_code]:bg-[#1a1a1f] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-[#007AFF] [&_pre]:bg-[#1a1a1f] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#007AFF] [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ol]:list-decimal [&_li]:mb-2 [&_a]:text-[#007AFF] [&_a]:underline [&_strong]:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </DocsLayout>
    );
  } catch (error) {
    console.error(`Error reading docs file ${fileName}:`, error);
    notFound();
  }
}

// Generate static params for all available documentation pages
export async function generateStaticParams() {
  return Object.keys(docsFiles).map((slug) => ({
    slug,
  }));
}
