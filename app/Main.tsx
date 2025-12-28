import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import TypeWriter from '@/components/TypeWriter'
import TechStackCloud from '@/components/TechStackCloud'

const MAX_DISPLAY = 5

const typeWriterTexts = [
  'AI Agent Developer',
  'Machine Learning Enthusiast',
  'RPA Engineer @ Capgemini',
  'Backend Developer',
  'LangChain Explorer',
]

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section */}
        <div className="space-y-6 pb-8 pt-6 md:space-y-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Allen
              </span>{' '}
              👋
            </h1>
            <div className="mt-4 h-8 text-lg text-gray-600 dark:text-gray-300 sm:h-10 sm:text-xl md:text-2xl">
              <TypeWriter texts={typeWriterTexts} speed={80} deleteSpeed={40} pauseTime={2500} />
            </div>
          </div>
          
          <p className="text-center text-base leading-7 text-gray-500 dark:text-gray-400 md:text-lg">
            {siteMetadata.description}
          </p>
          
          {/* Tech Stack Cloud */}
          <div className="pt-4">
            <TechStackCloud />
          </div>
        </div>

        {/* Latest Posts Section */}
        <div className="pt-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            📝 Latest Posts
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="py-8">
                  <article className="group">
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-4 xl:col-span-3">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-xl font-bold leading-8 tracking-tight sm:text-2xl">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 transition-colors duration-300 group-hover:text-cyan-500 dark:text-gray-100 dark:group-hover:text-cyan-400"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="inline-flex items-center gap-1 text-cyan-500 transition-all duration-300 hover:gap-2 hover:text-cyan-600 dark:hover:text-cyan-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-cyan-500 transition-all duration-300 hover:gap-2 hover:text-cyan-600 dark:hover:text-cyan-400"
            aria-label="All posts"
          >
            All Posts
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
