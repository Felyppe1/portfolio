'use client'

import { useEffect, useRef } from 'react'

/** One animated pixel: grows in after a delay, shimmers, shrinks out. */
class Pixel {
  private ctx: CanvasRenderingContext2D
  private x: number
  private y: number
  private color: string
  private speed: number
  private size = 0
  private sizeStep: number
  private minSize = 0.5
  private maxSizeInteger = 2
  private maxSize: number
  private delay: number
  private counter = 0
  private counterStep: number
  isIdle = false
  private isReverse = false
  private isShimmer = false

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.color = color
    this.speed = rand(0.1, 0.9) * speed
    this.sizeStep = Math.random() * 0.2
    this.maxSize = rand(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01
  }

  private draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size)
  }

  appear() {
    this.isIdle = false
    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }
    if (this.size >= this.maxSize) this.isShimmer = true
    if (this.isShimmer) this.shimmer()
    else this.size += this.sizeStep
    this.draw()
  }

  disappear() {
    this.isShimmer = false
    this.counter = 0
    if (this.size <= 0) {
      this.isIdle = true
      return
    }
    this.size -= 0.1
    this.draw()
  }

  private shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true
    else if (this.size <= this.minSize) this.isReverse = false
    if (this.isReverse) this.size -= this.speed
    else this.size += this.speed
  }
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function PixelCanvas({
  color,
  active,
  gap = 7,
  speed = 0.06,
}: {
  color: string
  active: boolean
  gap?: number
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const rafRef = useRef<number | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  // Build the pixel grid, rebuilding on resize.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2
      const pixels: Pixel[] = []
      for (let x = 0; x < w; x += gap) {
        for (let y = 0; y < h; y += gap) {
          // Leave real holes in the grid so the pattern reads as sparse pixels.
          if (Math.random() < 0.5) continue
          // Delay ripples out from the center for an organic reveal.
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          const delay = reduced ? 0 : dist
          pixels.push(new Pixel(canvas, ctx, x, y, color, speed, delay))
        }
      }
      pixelsRef.current = pixels
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [color, gap, speed])

  // Single rAF loop; appear while active, disappear otherwise, stop when idle.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const tick = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      let allIdle = true
      for (const p of pixelsRef.current) {
        if (activeRef.current) {
          p.appear()
          allIdle = false
        } else {
          p.disappear()
          if (!p.isIdle) allIdle = false
        }
      }
      if (!activeRef.current && allIdle) {
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [active])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}
