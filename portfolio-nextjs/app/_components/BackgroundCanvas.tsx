'use client'

import { useEffect, useRef } from 'react'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: number
  grabbed: boolean
}

interface Frag {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  r: number
  hue: number
}

function hexToHsl(hex: string) {
  hex = (hex || '#4d7cfe').replace('#', '').trim()
  if (hex.length === 3) hex = hex.split('').map((x) => x + x).join('')
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (mx + mn) / 2
  if (mx !== mn) {
    const d = mx - mn
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
    h *= 60
  }
  return { h, s: s * 100, l: l * 100 }
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    const balls: Ball[] = []
    const frags: Frag[] = []
    const rise = 26
    const hueTones = [0, 20, -20, 40, -12]

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      c.width = W * dpr
      c.height = H * dpr
      c.style.width = W + 'px'
      c.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    onResize()
    window.addEventListener('resize', onResize)

    const mkBall = (fromBottom: boolean): Ball => {
      const r = 11 + Math.random() * 21
      return {
        x: Math.random() * W,
        y: fromBottom ? H + r + Math.random() * 60 : Math.random() * H,
        vx: (Math.random() - 0.5) * 12,
        vy: -rise * (0.6 + Math.random() * 0.8),
        r,
        hue: hueTones[(Math.random() * hueTones.length) | 0],
        grabbed: false,
      }
    }
    const N = Math.max(14, Math.round(Math.min(30, (W * H) / 46000)))
    for (let i = 0; i < N; i++) balls.push(mkBall(false))

    const acc = () => hexToHsl(getComputedStyle(document.documentElement).getPropertyValue('--accent'))
    const grabbable = (t: EventTarget | null) => {
      const el = t as HTMLElement | null
      return !(
        el &&
        el.closest &&
        el.closest('a,button,input,textarea,label,header,nav,[data-tilt],[data-carousel-track],[data-modal],[data-mobile-menu]')
      )
    }
    const hit = (px: number, py: number) => {
      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i]
        if (Math.hypot(b.x - px, b.y - py) < b.r + 7) return b
      }
      return null
    }
    const burst = (b: Ball) => {
      const i = balls.indexOf(b)
      if (i < 0) return false
      balls.splice(i, 1)
      for (let k = 0; k < 11; k++) {
        const a = (Math.PI * 2 * k) / 11
        const sp = 120 + Math.random() * 150
        frags.push({ x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, r: 2 + Math.random() * 2.4, hue: b.hue })
      }
      return true
    }
    let popStreak = 0
    let streakTimer: number | undefined
    const popAll = () => {
      const snapshot = balls.slice()
      snapshot.forEach((b, k) => {
        window.setTimeout(() => burst(b), k * 40)
      })
      const tail = snapshot.length * 40 + 500
      window.setTimeout(() => {
        while (balls.length < N) balls.push(mkBall(true))
      }, tail)
    }
    const pop = (b: Ball) => {
      if (!burst(b)) return
      popStreak++
      window.clearTimeout(streakTimer)
      streakTimer = window.setTimeout(() => {
        popStreak = 0
      }, 5000)
      if (popStreak >= 10) {
        popStreak = 0
        window.clearTimeout(streakTimer)
        popAll()
        return
      }
      window.setTimeout(() => balls.push(mkBall(true)), 750)
    }

    let drag: { b: Ball; ox: number; oy: number; t0: number; lx: number; ly: number; moved: number } | null = null
    let samples: { x: number; y: number; t: number }[] = []

    const onPointerDown = (e: PointerEvent) => {
      if (!grabbable(e.target)) return
      const b = hit(e.clientX, e.clientY)
      if (!b) return
      drag = { b, ox: b.x - e.clientX, oy: b.y - e.clientY, t0: performance.now(), lx: e.clientX, ly: e.clientY, moved: 0 }
      b.grabbed = true
      b.vx = 0
      b.vy = 0
      samples = [{ x: e.clientX, y: e.clientY, t: performance.now() }]
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (drag) {
        const b = drag.b
        b.x = e.clientX + drag.ox
        b.y = e.clientY + drag.oy
        drag.moved += Math.hypot(e.clientX - drag.lx, e.clientY - drag.ly)
        drag.lx = e.clientX
        drag.ly = e.clientY
        samples.push({ x: e.clientX, y: e.clientY, t: performance.now() })
        if (samples.length > 6) samples.shift()
      } else {
        if (grabbable(e.target) && hit(e.clientX, e.clientY)) document.body.style.cursor = 'grab'
        else if (document.body.style.cursor === 'grab') document.body.style.cursor = ''
      }
    }
    const onPointerUp = () => {
      if (!drag) return
      const b = drag.b
      b.grabbed = false
      const dt = performance.now() - drag.t0
      if (samples.length >= 2) {
        const a = samples[0]
        const z = samples[samples.length - 1]
        const dts = (z.t - a.t) / 1000 || 0.016
        b.vx = (z.x - a.x) / dts
        b.vy = (z.y - a.y) / dts
        const sp = Math.hypot(b.vx, b.vy)
        const cap = 1600
        if (sp > cap) {
          b.vx *= cap / sp
          b.vy *= cap / sp
        }
      }
      if (drag.moved < 6 && dt < 260) pop(b)
      drag = null
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    let last = performance.now()
    let raf: number | null = null
    const draw = () => {
      const now = performance.now()
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.05) dt = 0.05
      const light = document.documentElement.dataset.theme === 'light'
      const A = acc()
      ctx.clearRect(0, 0, W, H)

      for (const b of balls) {
        if (!b.grabbed) {
          b.vy += (-rise - b.vy) * 0.012
          b.vx += (0 - b.vx) * 0.006
          b.x += b.vx * dt
          b.y += b.vy * dt
          if (b.x < b.r) {
            b.x = b.r
            b.vx = Math.abs(b.vx) * 0.7
          }
          if (b.x > W - b.r) {
            b.x = W - b.r
            b.vx = -Math.abs(b.vx) * 0.7
          }
          if (b.y > H - b.r && b.vy > 0) {
            b.y = H - b.r
            b.vy = -b.vy * 0.6
          }
          if (b.y < -b.r - 6) {
            b.y = H + b.r
            b.x = Math.random() * W
            b.vx = (Math.random() - 0.5) * 12
          }
        }
        const h = A.h + b.hue
        const l = Math.min(72, A.l + 8)
        const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r)
        g.addColorStop(0, 'hsla(' + h + ',' + A.s + '%,' + (l + 12) + '%,' + (light ? 0.3 : 0.38) + ')')
        g.addColorStop(1, 'hsla(' + h + ',' + A.s + '%,' + l + '%,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, 6.2832)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, 6.2832)
        ctx.lineWidth = 1.4
        ctx.strokeStyle = 'hsla(' + h + ',' + A.s + '%,' + (l + 6) + '%,' + (light ? 0.3 : 0.42) + ')'
        ctx.stroke()
      }
      for (let i = frags.length - 1; i >= 0; i--) {
        const f = frags[i]
        f.life -= dt * 2.1
        if (f.life <= 0) {
          frags.splice(i, 1)
          continue
        }
        f.vy += 220 * dt
        f.x += f.vx * dt
        f.y += f.vy * dt
        ctx.globalAlpha = Math.max(0, f.life)
        ctx.fillStyle = 'hsla(' + (A.h + f.hue) + ',' + A.s + '%,' + (A.l + 12) + '%,.85)'
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, 6.2832)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      raf = requestAnimationFrame(draw)
    }
    const onVis = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf)
        raf = null
      } else if (!document.hidden && !raf) {
        draw()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    draw()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(streakTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  )
}
