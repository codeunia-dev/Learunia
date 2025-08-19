import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Learn Faster.{' '}
          <span className="text-[#007AFF]">Code Smarter.</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#8B949E] mb-12 leading-relaxed max-w-3xl mx-auto">
          Quick, powerful cheatsheets to boost your coding productivity.
        </p>
        <SearchBar />
      </div>
      
      {/* Background decoration - subtle glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#007AFF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}


