import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

// Search engines and AI assistants (including training crawlers) are all welcome
const crawlers = [
  'Baiduspider',
  'Bytespider',
  'Sogou web spider',
  '360Spider',
  'YisouSpider',
  'bingbot',
  'Googlebot',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: crawlers, allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
