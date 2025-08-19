'use client';

import { useEffect } from 'react';

export default function CodeBlockCopy() {
  useEffect(() => {
    // Add copy buttons to code blocks
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('pre');
      
      codeBlocks.forEach((pre) => {
        // Skip if button already exists
        if (pre.querySelector('.copy-button')) return;
        
        const codeElement = pre.querySelector('code');
        if (!codeElement) return;
        
        const copyButton = document.createElement('button');
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;
        copyButton.className = 'copy-button absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors bg-gray-800/80 rounded hover:bg-gray-700/80';
        copyButton.title = 'Copy code';
        
        copyButton.onclick = async () => {
          const code = codeElement.textContent || '';
          
          try {
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(code);
            } else {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = code;
              textArea.style.position = 'fixed';
              textArea.style.left = '-999999px';
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
            }
            
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.warn('Copy failed:', err);
          }
        };
        
        // Make pre element relative positioned
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
      });
    };
    
    // Add buttons on initial load
    addCopyButtons();
    
    // Add buttons when new content is loaded (for dynamic content)
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}
