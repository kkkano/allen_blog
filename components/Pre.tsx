'use client'

import { useState, useRef, ReactNode, ReactElement, isValidElement, Children } from 'react'
import dynamic from 'next/dynamic'

// 动态加载 Mermaid 组件以避免 SSR 问题
const Mermaid = dynamic(() => import('./Mermaid'), { ssr: false })

interface PreProps {
  children: ReactNode
}

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>
    return extractTextFromChildren(element.props.children)
  }
  return ''
}

function getLanguageFromClassName(children: ReactNode): string | null {
  if (isValidElement(children)) {
    const element = children as ReactElement<{ className?: string }>
    const className = element.props.className || ''
    const match = className.match(/language-(\w+)/)
    return match ? match[1] : null
  }
  return null
}

export default function Pre({ children }: PreProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const language = getLanguageFromClassName(children)
  const codeContent = extractTextFromChildren(children)

  // 检测是否为 mermaid 代码块
  if (language === 'mermaid') {
    return <Mermaid chart={codeContent.trim()} />
  }

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.textContent || ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="group relative">
      <pre ref={preRef} className="overflow-x-auto rounded-lg">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 opacity-0 transition-opacity hover:bg-gray-600 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
