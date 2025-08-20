import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Learn Faster.{' '}
          <span className="text-[#007AFF]">Code Smarter.</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#8B949E] mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto px-2">
          Quick, powerful cheatsheets to boost your coding productivity.
        </p>
        <SearchBar />
      </div>
      
      {/* Background decoration - subtle glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#007AFF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#6C63FF]/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}


