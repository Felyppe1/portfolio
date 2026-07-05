'use client'

import { useEffect, useRef } from 'react'

export function useTilt<T extends HTMLElement>(max = 15, glow = true) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const apply = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect()
      const px = (cx - r.left) / r.width - 0.5
      const py = (cy - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.04)`
      if (glow) {
        el.style.boxShadow = `0 34px 74px rgba(0,0,0,.5), ${px * -26}px ${py * -26}px 64px var(--accent-soft)`
      }
    }
    const reset = () => {
      el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'
      if (glow) el.style.boxShadow = '0 24px 55px rgba(0,0,0,.45)'
    }

    const hoverCapable = !window.matchMedia('(hover: none)').matches
    const onMouseMove = (e: MouseEvent) => apply(e.clientX, e.clientY)
    const onMouseLeave = () => reset()

    let active = false
    const onTouchStart = (e: TouchEvent) => {
      active = true
      const t = e.touches[0]
      apply(t.clientX, t.clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!active) return
      const t = e.touches[0]
      apply(t.clientX, t.clientY)
      if (e.cancelable) e.preventDefault()
    }
    const onTouchEnd = () => {
      active = false
      reset()
    }

    el.style.transition = 'transform .16s ease-out, box-shadow .3s ease'

    if (hoverCapable) {
      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [max, glow])

  return ref
}
