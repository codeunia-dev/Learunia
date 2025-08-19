import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-[#10101A] text-gray-400 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <span className="font-bold text-white">Codeunia</span>
          <span className="text-xs text-gray-500">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-[#007AFF] transition-colors">About</Link>
          <a href="https://github.com/codeunia" target="_blank" rel="noopener noreferrer" className="hover:text-[#007AFF] transition-colors">GitHub</a>
          <a href="https://twitter.com/codeunia" target="_blank" rel="noopener noreferrer" className="hover:text-[#007AFF] transition-colors">Twitter</a>
          <a href="mailto:hello@codeunia.com" className="hover:text-[#007AFF] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
