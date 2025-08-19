export default function TestPage() {
  console.log('TestPage rendering');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F1A] to-[#1A1A2E]">
      <div className="py-20 px-4">
        <h1 className="text-4xl text-white text-center mb-8">Test Page</h1>
        <p className="text-white text-center">This is a minimal test page.</p>
      </div>
    </div>
  );
}
