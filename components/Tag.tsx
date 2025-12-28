import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-lg px-2 py-1 text-sm font-medium uppercase text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-cyan-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
