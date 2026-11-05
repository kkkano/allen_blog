import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import siteMetadata from '@/data/siteMetadata'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteMetadata.siteUrl}/#website`,
      url: siteMetadata.siteUrl,
      name: siteMetadata.title,
      description: siteMetadata.seoDescription,
      inLanguage: siteMetadata.language,
      author: { '@id': `${siteMetadata.siteUrl}/#author` },
    },
    {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/#author`,
      name: siteMetadata.author,
      url: `${siteMetadata.siteUrl}/about`,
      sameAs: [siteMetadata.github, siteMetadata.linkedin].filter(Boolean),
    },
  ],
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  // Collect unique tags sorted by frequency for TypeWriter
  const tagCount: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    }
  }
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Main posts={posts} topTags={topTags} />
    </>
  )
}
