'use client';


import Home from "@/components/Home";




  export default function HomeContent() {
  // Always show the full homepage - content should be accessible regardless of auth status

  
  return (
    <div className="min-h-screen">
      <Home />
    </div>
  );
}