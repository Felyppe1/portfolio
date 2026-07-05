'use client'

import { useEffect, useRef } from 'react'

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      // rect includes the current translate; subtract it so the offset is
      // measured from the element's resting position
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform)
      const x = e.clientX - (r.left - m.m41) - r.width / 2
      const y = e.clientY - (r.top - m.m42) - r.height / 2
      el.style.transform = `translate(${x * strength}px,${y * strength}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0,0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
