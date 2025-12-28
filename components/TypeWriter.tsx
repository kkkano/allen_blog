'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypeWriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-cyan-500 sm:h-8"></span>
    </span>
  )
}
