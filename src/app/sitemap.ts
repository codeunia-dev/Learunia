import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learn.codeunia.com'
  
  const subjects = [
    'javascript',
    'python', 
    'react',
    'nodejs',
    'git',
    'sql',
    'typescript',
    'java',
    'css'
  ]

  const subjectPages = subjects.map((subject) => ({
    url: `${baseUrl}/${subject}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...subjectPages,
  ]
}
