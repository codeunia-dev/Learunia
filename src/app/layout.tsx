import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import HydrationProvider from "@/components/HydrationProvider";
import CrossDomainAuth from "@/components/CrossDomainAuth";
import ClientOnly from "@/components/ClientOnly";

export const metadata: Metadata = {
  title: "Learn Faster. Code Smarter. — Codeunia",
  description: "Quick, powerful cheatsheets to boost your coding productivity. Student-led tech community.",
  keywords: "coding, cheatsheets, programming, tech community, students, learn to code",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-screen bg-[#0a0a0f] flex flex-col"
        suppressHydrationWarning={true}
      >
        <HydrationProvider>
          <AuthProvider>
            <ClientOnly>
              <CrossDomainAuth />
            </ClientOnly>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
