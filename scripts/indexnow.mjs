// Notify IndexNow engines (Bing, Yandex, Seznam, Naver...) of every sitemap URL. Run after a deploy: npm run indexnow
import { readdirSync } from 'fs'
import siteMetadata from '../data/siteMetadata.js'

const key = readdirSync('public')
  .find((file) => /^[0-9a-f]{32}\.txt$/.test(file))
  ?.slice(0, -4)
if (!key) throw new Error('IndexNow key file public/<key>.txt is missing')

const sitemap = await (await fetch(`${siteMetadata.siteUrl}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(siteMetadata.siteUrl).host,
    key,
    keyLocation: `${siteMetadata.siteUrl}/${key}.txt`,
    urlList,
  }),
})
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${response.status}`)
