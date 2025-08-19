export default function StructuredData({ 
  type = 'WebSite',
  name = 'Codeunia Learn',
  description = 'Quick, powerful cheatsheets to boost your coding productivity',
  url = 'https://learn.codeunia.com',
  additionalData = {}
}: {
  type?: string;
  name?: string;
  description?: string;
  url?: string;
  additionalData?: Record<string, unknown>;
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Codeunia',
      url: 'https://codeunia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://learn.codeunia.com/favicon.svg',
        width: 60,
        height: 60
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://learn.codeunia.com/{search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    ...additionalData
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema)
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  subject
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  subject: string;
}) {
  // Use static dates to prevent infinite re-renders
  const publishedDate = datePublished || '2024-01-01T00:00:00.000Z';
  const modifiedDate = dateModified || '2024-08-14T00:00:00.000Z';
  return (
    <StructuredData
      type="Article"
      name={title}
      description={description}
      url={url}
      additionalData={{
        headline: title,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: {
          '@type': 'Organization',
          name: 'Codeunia'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        },
        about: {
          '@type': 'Thing',
          name: `${subject} Programming`,
          description: `Learn ${subject} programming with comprehensive examples and best practices`
        },
        keywords: [subject, 'programming', 'cheatsheet', 'tutorial', 'reference'],
        educationalLevel: 'Beginner to Advanced',
        learningResourceType: 'Reference Guide'
      }}
    />
  );
}
