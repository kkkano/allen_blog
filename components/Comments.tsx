'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import Giscus from '@giscus/react'

const Comments = () => {
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme = theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'

  // 确保 siteMetadata.comments 存在
  if (!siteMetadata.comments) return null

  const { repo, repoId, categoryId, mapping, strict, reactionsEnabled, emitMetadata, inputPosition, lang } = 
    siteMetadata.comments.giscusConfig

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <Giscus
        repo={repo}
        repoId={repoId}
        category="Announcements"
        categoryId={categoryId}
        mapping={mapping}
        strict={strict}
        reactionsEnabled={reactionsEnabled}
        emitMetadata={emitMetadata}
        inputPosition={inputPosition}
        theme={commentsTheme}
        lang={lang}
      />
    </div>
  )
}

export default Comments
