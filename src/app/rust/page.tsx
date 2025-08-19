'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'
import { useEffect, useState } from 'react'

export default function RustPage() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/content/rust.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading content:', error))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-blue-400 prose-headings:border-b prose-headings:border-blue-500/30 prose-headings:pb-2
                prose-code:text-green-400 prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-700 prose-pre:border prose-pre:border-gray-600
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-700/50
                prose-strong:text-yellow-400
                prose-a:text-blue-400 prose-a:hover:text-blue-300
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-300
                prose-table:border-collapse prose-th:border prose-th:border-gray-600 prose-th:bg-gray-700 prose-th:p-2
                prose-td:border prose-td:border-gray-600 prose-td:p-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
