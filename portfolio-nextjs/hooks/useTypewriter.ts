'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/types'

interface TypewriterLine {
  pt: string
  en: string
}

export function useTypewriter(lines: TypewriterLine[], lang: Lang, onDone?: () => void) {
  const [texts, setTexts] = useState<string[]>(() => lines.map(() => ''))
  const [activeLine, setActiveLine] = useState(0)
  const [typing, setTyping] = useState(false)
  const runRef = useRef(0)
  const isFirstRun = useRef(true)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const runId = ++runRef.current
    const timers: number[] = []
    setTexts(lines.map(() => ''))
    setActiveLine(0)
    setTyping(false)

    const typeLine = (li: number) => {
      if (runRef.current !== runId) return
      if (li >= lines.length) {
        setTyping(false)
        onDoneRef.current?.()
        return
      }
      setActiveLine(li)
      setTyping(true)
      const full = lines[li][lang]
      let ci = 0
      const speed = li === 1 ? 66 : 62
      const step = () => {
        if (runRef.current !== runId) return
        ci++
        setTexts((prev) => {
          const next = [...prev]
          next[li] = full.slice(0, ci)
          return next
        })
        if (ci < full.length) {
          timers.push(window.setTimeout(step, speed))
        } else if (li + 1 < lines.length) {
          setTyping(false)
          timers.push(window.setTimeout(() => typeLine(li + 1), 520))
        } else {
          setTyping(false)
          onDoneRef.current?.()
        }
      }
      step()
    }

    const delay = isFirstRun.current ? 1100 : 150
    timers.push(
      window.setTimeout(() => {
        isFirstRun.current = false
        typeLine(0)
      }, delay)
    )

    return () => {
      runRef.current++
      timers.forEach((id) => clearTimeout(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return { texts, activeLine, typing }
}
