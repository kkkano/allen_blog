'use client'

import { useState, useRef, ReactNode, ReactElement, isValidElement } from 'react'
import dynamic from 'next/dynamic'

// 动态加载 Mermaid 组件以避免 SSR 问题
const Mermaid = dynamic(() => import('./Mermaid'), { ssr: false })

interface PreProps {
  children: ReactNode
}

// 语言显示名称映射
const languageNames: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  py: 'Python',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  rb: 'Ruby',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  sql: 'SQL',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  powershell: 'PowerShell',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  md: 'Markdown',
  markdown: 'Markdown',
  dockerfile: 'Dockerfile',
  docker: 'Docker',
  plaintext: 'Plain Text',
  text: 'Plain Text',
  mermaid: 'Mermaid',
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
  const displayLanguage = language ? (languageNames[language.toLowerCase()] || language) : 'Code'

  // 检测是否为 mermaid 代码块
  if (language === 'mermaid') {
    return <Mermaid chart={codeContent.trim()} />
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl bg-gray-900 shadow-lg">
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between border-b border-gray-700/50 bg-gray-800/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Terminal dots */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          </div>
          {/* Language label */}
          <span className="ml-2 rounded bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-400">
            {displayLanguage}
          </span>
        </div>
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-gray-700/50 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all hover:bg-gray-600/50 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre 
        ref={preRef} 
        className="overflow-x-auto p-4 text-sm leading-relaxed [&>code]:block [&>code>.line]:table-row [&>code>.line>.line-number]:table-cell [&>code>.line>.line-number]:select-none [&>code>.line>.line-number]:pr-4 [&>code>.line>.line-number]:text-right [&>code>.line>.line-number]:text-gray-500 [&>code>.line>.line-number]:opacity-50"
      >
        {children}
      </pre>
    </div>
  )
}
