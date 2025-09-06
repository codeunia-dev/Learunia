import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export function resolveContentPath(preferredFilename: string): { path: string; isMDX: boolean } {
  const contentDir = join(process.cwd(), 'src/content');

  // If the passed filename exists, respect it
  const explicitPath = join(contentDir, preferredFilename);
  if (existsSync(explicitPath)) {
    return { path: explicitPath, isMDX: preferredFilename.toLowerCase().endsWith('.mdx') };
  }

  // Try swapping extension: prefer .mdx, then .md
  const base = preferredFilename.replace(/\.(md|mdx)$/i, '');
  const mdxPath = join(contentDir, `${base}.mdx`);
  if (existsSync(mdxPath)) {
    return { path: mdxPath, isMDX: true };
  }
  const mdPath = join(contentDir, `${base}.md`);
  return { path: mdPath, isMDX: false };
}

export function getContentWithMeta(filename: string, fallbackTitle: string): { content: string; isMDX: boolean } {
  try {
    const { path, isMDX } = resolveContentPath(filename);
    const content = readFileSync(path, 'utf8');
    return { content, isMDX };
  } catch (error) {
    console.error(`Failed to load content for ${filename}:`, error);
    return { content: `# ${fallbackTitle}\n\nContent is currently unavailable. Please try again later.`, isMDX: false };
  }
}

// Legacy helper used by existing pages – keeps behavior for plain Markdown
export function getContentSafely(filename: string, fallbackTitle: string): string {
  try {
    const { path } = resolveContentPath(filename);
    const content = readFileSync(path, 'utf8');
    return content;
  } catch (error) {
    console.error(`Failed to load content for ${filename}:`, error);
    return `# ${fallbackTitle}\n\nContent is currently unavailable. Please try again later.`;
  }
}

export function sanitizeMarkdown(content: string): string {
  // Basic sanitization - remove any potentially dangerous HTML (used for legacy .md only)
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '');
}
