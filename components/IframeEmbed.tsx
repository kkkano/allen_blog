'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface IframeEmbedProps {
  src: string
  minHeight?: number
}

export default function IframeEmbed({ src, minHeight = 600 }: IframeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(minHeight)

  const adjustHeight = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (doc) {
        const scrollH = doc.documentElement.scrollHeight
        if (scrollH > 0) {
          setHeight(Math.max(scrollH, minHeight))
        }
      }
    } catch {
      // cross-origin fallback – keep minHeight
    }
  }, [minHeight])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    iframe.addEventListener('load', adjustHeight)
    return () => iframe.removeEventListener('load', adjustHeight)
  }, [adjustHeight])

  const title = src
    .replace(/.*\//, '')
    .replace(/\.html$/, '')
    .replace(/-/g, ' ')

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      width="100%"
      height={height}
      scrolling="no"
      style={{ border: 'none', borderRadius: '12px', display: 'block' }}
    />
  )
}
