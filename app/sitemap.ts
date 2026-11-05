import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      // Slugs may contain spaces or CJK characters; sitemap URLs must be percent-encoded
      url: `${siteUrl}/${encodeURI(post.path)}`,
      lastModified: post.lastmod || post.date,
    }))

  // List pages change when a post is published, not on every build
  const latestPost = blogRoutes
    .map((route) => route.lastModified)
    .sort()
    .at(-1)
  const routes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: latestPost,
  }))

  return [...routes, ...blogRoutes]
}
