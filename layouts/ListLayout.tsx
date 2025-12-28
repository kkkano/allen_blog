import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: any[]
  title: string
  initialDisplayPosts?: any[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}
            rel="prev"
            className="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
          >
            Previous
          </Link>
        )}
        <span className="text-gray-500 dark:text-gray-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/blog/page/${currentPage + 1}`}
            rel="next"
            className="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!displayPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <li key={path} className="py-6">
                <article className="group relative rounded-xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5 hover:shadow-lg dark:hover:from-cyan-500/10 dark:hover:to-blue-500/10">
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ padding: '1px' }}>
                    <div className="h-full w-full rounded-xl bg-white dark:bg-gray-950"></div>
                  </div>
                  <div className="relative space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-4 xl:col-span-3">
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-xl font-bold leading-8 tracking-tight sm:text-2xl">
                            <Link
                              href={`/${path}`}
                              className="text-gray-900 transition-colors duration-300 group-hover:text-cyan-500 dark:text-gray-100 dark:group-hover:text-cyan-400"
                            >
                              {title}
                            </Link>
                          </h2>
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
                          href={`/${path}`}
                          className="inline-flex items-center gap-1 text-cyan-500 transition-all duration-300 hover:gap-2 hover:text-cyan-600 dark:hover:text-cyan-400"
                          aria-label={`Read "${title}"`}
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
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
