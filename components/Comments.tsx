'use client'

import React, { useEffect } from 'react'

const Comments = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'kkkano/allen_blog')
    script.setAttribute('data-repo-id', 'R_kgDONxOD7A')
    script.setAttribute('data-category-id', 'DIC_kwDONxOD7M4CmjqM')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '1')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const commentsContainer = document.getElementById('comments-container')
    if (commentsContainer) commentsContainer.appendChild(script)

    return () => {
      if (commentsContainer) commentsContainer.innerHTML = ''
    }
  }, [])

  return <div id="comments-container" className="b-6-pt text-center text-gray-700 dark:text-gray-300"></div>
}

export default Comments
