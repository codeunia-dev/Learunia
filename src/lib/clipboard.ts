// Client-side utility for handling copy functionality
'use client';

export function initializeCopyFeatures() {
  // Check if clipboard API is available
  if (typeof window !== 'undefined') {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available. Copy functionality may be limited.');
      return false;
    }
    
    // Add copy functionality to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (pre) {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors';
        copyButton.onclick = async () => {
          try {
            await navigator.clipboard.writeText(block.textContent || '');
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          } catch (err) {
            console.warn('Failed to copy text:', err);
            copyButton.textContent = 'Failed';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          }
        };
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
      }
    });
    
    return true;
  }
  return false;
}

// Fallback copy function for browsers without Clipboard API
export function fallbackCopy(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    return result;
  } catch (err) {
    console.warn('Fallback copy failed:', err);
    return false;
  }
}
