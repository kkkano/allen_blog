'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import Giscus from '@giscus/react'

const Comments = () => {
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme = theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <div className="b-6-pt text-center text-gray-700 dark:text-gray-300">
      <Giscus
        id="comments"
        repo="kkkano/allen_blog"
        repoId="R_kgDONxOD7A"
        category="Announcements"
        categoryId="DIC_kwDONxOD7M4CmjqM"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={commentsTheme}
        lang="zh-CN"
      />
    </div>
  )
}

export default Comments
