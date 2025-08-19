import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateSEO({
  title = "Learn Faster. Code Smarter. — Codeunia",
  description = "Quick, powerful cheatsheets to boost your coding productivity. Student-led tech community.",
  keywords = ["coding", "cheatsheets", "programming", "tech community", "students", "learn to code"],
  image = "/favicon.svg",
  url = "https://learn.codeunia.com"
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Codeunia" }],
    creator: "Codeunia",
    metadataBase: new URL('https://learn.codeunia.com'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Codeunia Learn",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@codeunia",
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    manifest: '/manifest.json',
  };
}
