'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import TypeWriter from '@/components/TypeWriter'

const MAX_DISPLAY = 5
interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
}

export default function Home({ posts }: { posts: Post[] }) {
  const typewriterWords = [
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Data Science',
    'AI Engineering',
  ]

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section with Typewriter */}
        <div className="space-y-6 pb-10 pt-8 md:space-y-8">
          {/* Animated gradient background */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf4ff] via-[#eef5ff] to-[#e8f0ff] p-8 dark:from-[#030711] dark:via-[#0c1221] dark:to-[#111725] md:p-12 [.gradient_&]:from-[#f7fbff] [.gradient_&]:via-[#eef4ff] [.gradient_&]:to-[#ecf1ff] dark:[.gradient_&]:from-[#05060f] dark:[.gradient_&]:via-[#0d1425] dark:[.gradient_&]:to-[#151b31]">
            <div className="bg-grid-pattern opacity-3 absolute inset-0 dark:opacity-5" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-500/30 blur-3xl" />

            <div className="relative z-10">
              <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent dark:from-white dark:via-gray-200 dark:to-white sm:text-5xl md:text-6xl">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {siteMetadata.headerTitle || 'My Blog'}
                </span>
              </h1>
              <div className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
                Exploring{' '}
                <TypeWriter
                  words={typewriterWords}
                  typeSpeed={80}
                  deleteSpeed={40}
                  delayBetweenWords={2500}
                  className="font-semibold text-cyan-600 dark:text-cyan-400"
                />
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                {siteMetadata.description}
              </p>
            </div>
          </div>

          {/* Section title */}
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
              Latest Posts
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700" />
          </div>
        </div>

        {/* Posts List with hover effects */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-6">
                <article className="group relative rounded-xl p-4 transition-all duration-300 hover:shadow-xl">
                  <div className="absolute inset-0 rounded-xl border-2 border-gray-200/60 transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400/10 group-hover:via-blue-400/10 group-hover:to-purple-400/10 dark:border-gray-700/60" />
                  <div className="relative rounded-xl bg-white/80 p-4 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white dark:bg-gray-900/80 dark:group-hover:bg-gray-900 [.gradient_&]:bg-white/40 dark:[.gradient_&]:bg-gray-900/40">
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date} className="flex items-center space-x-2">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{formatDate(date, siteMetadata.locale)}</span>
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-4 xl:col-span-3">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
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
                            className="inline-flex items-center space-x-2 text-pink-500 transition-all duration-300 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300"
                            aria-label={`Read more: "${title}"`}
                          >
                            <span>Read more</span>
                            <svg
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-6 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="group inline-flex items-center space-x-2 font-semibold text-pink-500 transition-colors duration-300 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300"
            aria-label="All posts"
          >
            <span>All Posts</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="mt-12 flex items-center justify-center">
          <div className="w-full max-w-md rounded-[28px] bg-gradient-to-br from-[#fef3ff] via-[#eef3ff] to-[#e0f7ff] p-8 shadow-2xl dark:from-[#080b18] dark:via-[#10142f] dark:to-[#1d1f3d]">
            <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-gray-100">
              Subscribe to Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>
      )}
    </>
  )
}
