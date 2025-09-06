'use client';

import { useMemo, useState } from 'react';

// This component is used as an override for the `pre` tag in MDX.
// MDXRemote will pass something like <pre><code class="language-js">...</code></pre>
// We enhance it with a language badge and a copy button.
export default function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  // Find the code element child and extract language + text
  const { language, code } = useMemo(() => {
    try {
      // @ts-expect-error MDX child typing is permissive
      const child = props.children?.props ? props.children : Array.isArray(props.children) ? props.children[0] : null;
      const codeEl = child && child.props ? child : null;
      const className: string = codeEl?.props?.className || '';
      const langMatch = className.match(/language-([\w-]+)/);
      const language = langMatch ? langMatch[1] : undefined;
      const code = typeof codeEl?.props?.children === 'string' ? codeEl.props.children : Array.isArray(codeEl?.props?.children) ? codeEl.props.children.join('') : '';
      return { language, code };
    } catch {
      return { language: undefined, code: '' };
    }
  }, [props.children]);

  const onCopy = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  return (
    <div className="relative group">
      {/* Language badge */}
      {language ? (
        <div className="absolute top-2 left-2 text-[11px] uppercase tracking-wide bg-white/10 text-white border border-white/20 rounded px-2 py-0.5 select-none z-10">
          {language}
        </div>
      ) : null}
  
      {/* Copy button */}
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2 right-2 text-xs rounded px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 transition-opacity opacity-0 group-hover:opacity-100 z-10"
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
  
      {/* Pre block with padding so content never overlaps */}
      <pre
        {...props}
        className={`
          ${props.className ?? ""}
          mt-8    /* push code content down below badge + button */
          rounded-lg
          overflow-x-auto
        `}
        style={{ paddingTop: '2.5rem' }}  // 40px of top padding
      />
    </div>
  );  
}
