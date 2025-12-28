'use client'

import { useState, useEffect } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

interface TOCSidebarProps {
  toc: TocItem[]
}

export default function TOCSidebar({ toc }: TOCSidebarProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = toc.map((item) => item.url.slice(1))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    headings.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  if (!toc || toc.length === 0) return null

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          目录
        </h3>
        <ul className="space-y-2 text-sm">
          {toc.map((item) => {
            const id = item.url.slice(1)
            const isActive = activeId === id
            const depthClass = item.depth === 2 ? 'pl-0' : item.depth === 3 ? 'pl-4' : 'pl-8'

            return (
              <li key={item.url} className={depthClass}>
                <a
                  href={item.url}
                  className={`block py-1 transition-all duration-200 ${
                    isActive
                      ? 'border-l-2 border-cyan-500 pl-3 font-medium text-cyan-600 dark:text-cyan-400'
                      : 'border-l-2 border-transparent pl-3 text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(id)
                    if (element) {
                      const top = element.offsetTop - 100
                      window.scrollTo({ top, behavior: 'smooth' })
                    }
                  }}
                >
                  {item.value}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
