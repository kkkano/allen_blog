'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = `flex items-center w-full justify-between py-6 transition-all duration-300 ${
    siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''
  } ${
    scrolled
      ? 'bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-950/80'
      : 'bg-transparent'
  }`

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="group flex items-center justify-between">
          <div className="mr-3 transition-transform duration-300 group-hover:scale-110">
            <Logo className="h-10 w-10" />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-cyan-500 sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <nav className="no-scrollbar hidden max-w-40 items-center space-x-1 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="relative rounded-lg px-3 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-blue-500/10 hover:to-purple-500/10 hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-400"
              >
                <span className="relative z-10">{link.title}</span>
              </Link>
            ))}
        </nav>
        <div className="flex items-center space-x-3">
          <div className="transition-transform duration-300 hover:scale-110">
            <SearchButton />
          </div>
          <div className="transition-transform duration-300 hover:scale-110">
            <ThemeSwitch />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
