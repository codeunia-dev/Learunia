'use client';

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007AFF] mx-auto mb-4"></div>
        <p className="text-[#d1d1d1] text-lg">Loading Learnunia...</p>
      </div>
    </div>
  );
}
