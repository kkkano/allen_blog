import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import TagCloud from '@/components/TagCloud'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            标签云
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            探索我的所有内容主题
          </p>
        </div>
        <div className="py-12">
          {Object.keys(tagCounts).length === 0 ? (
            <p className="text-center text-gray-500">No tags found.</p>
          ) : (
            <TagCloud tagCounts={tagCounts} />
          )}
        </div>
      </div>
    </>
  )
}
