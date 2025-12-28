import Link from '@/components/Link'
import { slug } from 'github-slugger'

interface TagCloudProps {
  tagCounts: Record<string, number>
}

// Gradient colors for tags
const tagColors = [
  'from-cyan-500 to-blue-500',
  'from-blue-500 to-purple-500',
  'from-purple-500 to-pink-500',
  'from-pink-500 to-red-500',
  'from-orange-500 to-yellow-500',
  'from-green-500 to-cyan-500',
  'from-indigo-500 to-purple-500',
  'from-rose-500 to-orange-500',
]

export default function TagCloud({ tagCounts }: TagCloudProps) {
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  
  // Calculate size based on count
  const maxCount = Math.max(...Object.values(tagCounts))
  const minCount = Math.min(...Object.values(tagCounts))
  
  const getTagSize = (count: number) => {
    if (maxCount === minCount) return 'text-base'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.8) return 'text-2xl font-bold'
    if (ratio > 0.6) return 'text-xl font-semibold'
    if (ratio > 0.4) return 'text-lg font-medium'
    if (ratio > 0.2) return 'text-base'
    return 'text-sm'
  }

  const getTagColor = (index: number) => {
    return tagColors[index % tagColors.length]
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      {sortedTags.map((tag, index) => {
        const count = tagCounts[tag]
        const size = getTagSize(count)
        const color = getTagColor(index)
        
        return (
          <Link
            key={tag}
            href={`/tags/${slug(tag)}`}
            className={`group relative inline-block ${size} transition-all duration-300 hover:scale-110`}
          >
            <span
              className={`relative z-10 rounded-full bg-gradient-to-r ${color} bg-clip-text px-3 py-1 text-transparent transition-all duration-300`}
            >
              {tag}
            </span>
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30`}
            />
            <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">({count})</span>
          </Link>
        )
      })}
    </div>
  )
}
