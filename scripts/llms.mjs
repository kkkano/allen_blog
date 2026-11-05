import { writeFileSync } from 'fs'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'
const postUrl = (post) => `${siteMetadata.siteUrl}/${encodeURI(post.path)}`

// MDX import/export lines and the inline TOC component are build plumbing, not article text
const plainBody = (raw) =>
  raw
    .split('\n')
    .filter(
      (line) => !/^\s*(import|export)\s/.test(line) && !/^\s*<TOCInline\b.*\/>\s*$/.test(line)
    )
    .join('\n')
    .trim()

const llms = () => {
  const posts = sortPosts(allBlogs.filter((post) => post.draft !== true))
  const index = `# ${siteMetadata.title}

> ${siteMetadata.seoDescription}

作者：${siteMetadata.author}（${siteMetadata.github}）

## 文章

${posts.map((post) => `- [${post.title}](${postUrl(post)})（${post.date.slice(0, 10)}）: ${post.summary || ''}`).join('\n')}

## 其他

- [关于作者](${siteMetadata.siteUrl}/about)
- [项目](${siteMetadata.siteUrl}/projects)
- [全部文章全文](${siteMetadata.siteUrl}/llms-full.txt)
- [RSS](${siteMetadata.siteUrl}/feed.xml)
`
  const full = `# ${siteMetadata.title} 全文\n\n> ${siteMetadata.seoDescription}\n\n${posts
    .map(
      (post) =>
        `---\n\n# ${post.title}\n\n来源：${postUrl(post)}\n发布：${post.date.slice(0, 10)}\n标签：${post.tags.join('、')}\n\n${plainBody(post.body.raw)}\n`
    )
    .join('\n')}`
  writeFileSync(`./${outputFolder}/llms.txt`, index)
  writeFileSync(`./${outputFolder}/llms-full.txt`, full)
  console.log('llms.txt generated...')
}
export default llms
