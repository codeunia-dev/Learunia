import { readFileSync } from 'fs';
import { join } from 'path';

export function getContentSafely(filename: string, fallbackTitle: string): string {
  try {
    const contentPath = join(process.cwd(), 'src/content', filename);
    const content = readFileSync(contentPath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Failed to load content for ${filename}:`, error);
    return `# ${fallbackTitle}\n\nContent is currently unavailable. Please try again later.`;
  }
}

export function sanitizeMarkdown(content: string): string {
  // Basic sanitization - remove any potentially dangerous HTML
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '');
}
