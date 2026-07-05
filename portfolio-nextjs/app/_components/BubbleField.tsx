'use client'

import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const CONFIG = {
  BUBBLE_COUNT: 20,
  RADIUS_MIN: 16,
  RADIUS_MAX: 42,

  BUOYANCY_MIN: 28, // px/s upward
  BUOYANCY_MAX: 62,
  SWAY_AMP_MIN: 8, // horizontal wiggle force, px/s²
  SWAY_AMP_MAX: 26,
  SWAY_FREQ_MIN: 0.4, // Hz-ish
  SWAY_FREQ_MAX: 1.1,

  DAMPING: 1.2, // 1/s — how fast fling velocity decays back to floating
  FLING_MAX: 900, // px/s cap on release velocity
  MAX_DT: 0.05, // s — clamp big rAF gaps

  CLICK_MAX_MOVE: 8, // px — beyond this a press counts as drag, not pop
  CLICK_MAX_MS: 350,

  POP_MS: 300,
  RESPAWN_DELAY_MIN: 400, // ms before a popped bubble re-enters from below
  RESPAWN_DELAY_MAX: 2200,

  STREAK_TARGET: 10,
  STREAK_WINDOW_MS: 3000, // max gap between pops to keep the streak alive
  CHAIN_STAGGER_MS: 70, // delay between bubbles in the pop-everything chain

  // burst droplets
  DROPLET_MS: 620,
  DROPLET_COUNT_MIN: 5,
  DROPLET_COUNT_MAX: 9,
  DROPLET_R_MIN: 2, // px
  DROPLET_R_MAX: 5,
  DROPLET_DIST_MIN: 22, // px outward travel
  DROPLET_DIST_MAX: 58,
  DROPLET_GRAVITY: 26, // px extra downward pull at end of arc

  // streak counter label (1x, 2x, ...)
  LABEL_MS: 850,
} as const

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type BubbleState = 'float' | 'drag' | 'popping' | 'waiting'

interface Bubble {
  el: HTMLButtonElement
  state: BubbleState
  x: number // center, px
  y: number
  vx: number
  vy: number
  r: number
  buoyancy: number
  swayAmp: number
  swayFreq: number
  swayPhase: number
  respawnAt: number // timestamp when a 'waiting' bubble re-enters
  // drag bookkeeping
  pointerId: number
  grabDx: number
  grabDy: number
  pressX: number
  pressY: number
  pressAt: number
  moved: number
  trail: { x: number; y: number; t: number }[]
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function BubbleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = container.clientWidth
    let height = container.clientHeight

    /* ----- bubble pool ----- */
    const bubbles: Bubble[] = []

    const resetKinematics = (b: Bubble) => {
      b.buoyancy = rand(CONFIG.BUOYANCY_MIN, CONFIG.BUOYANCY_MAX)
      b.swayAmp = rand(CONFIG.SWAY_AMP_MIN, CONFIG.SWAY_AMP_MAX)
      b.swayFreq = rand(CONFIG.SWAY_FREQ_MIN, CONFIG.SWAY_FREQ_MAX)
      b.swayPhase = rand(0, Math.PI * 2)
      b.vx = 0
      b.vy = -b.buoyancy
    }

    const spawnBelow = (b: Bubble) => {
      b.x = rand(b.r, Math.max(b.r, width - b.r))
      b.y = height + b.r + rand(0, 40)
      resetKinematics(b)
      b.state = 'float'
    }

    for (let i = 0; i < CONFIG.BUBBLE_COUNT; i++) {
      const el = document.createElement('button')
      el.type = 'button'
      el.tabIndex = -1
      el.setAttribute('aria-hidden', 'true')
      el.className =
        'absolute left-0 top-0 rounded-full cursor-grab active:cursor-grabbing pointer-events-auto select-none ' +
        // invisible hit slop — grabbing a small moving bubble needs a forgiving target
        "after:absolute after:-inset-3 after:rounded-full after:content-[''] " +
        'border border-sky-300/60 dark:border-sky-200/30 ' +
        'bg-[radial-gradient(circle_at_31%_28%,rgba(255,255,255,0.95),rgba(255,255,255,0.35)_28%,rgba(125,178,240,0.10)_55%,rgba(37,99,235,0.22)_100%)] ' +
        'dark:bg-[radial-gradient(circle_at_31%_28%,rgba(255,255,255,0.55),rgba(186,222,255,0.18)_30%,rgba(96,165,250,0.08)_55%,rgba(147,197,253,0.20)_100%)] ' +
        'shadow-[inset_-3px_-4px_8px_rgba(37,99,235,0.18),inset_2px_3px_6px_rgba(255,255,255,0.65)] ' +
        'dark:shadow-[inset_-3px_-4px_8px_rgba(30,64,175,0.35),inset_2px_3px_6px_rgba(255,255,255,0.25)]'
      el.style.touchAction = 'none'
      el.style.willChange = 'transform'

      const r = rand(CONFIG.RADIUS_MIN, CONFIG.RADIUS_MAX)
      el.style.width = `${r * 2}px`
      el.style.height = `${r * 2}px`

      const b: Bubble = {
        el,
        state: 'float',
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r,
        buoyancy: 0,
        swayAmp: 0,
        swayFreq: 0,
        swayPhase: 0,
        respawnAt: 0,
        pointerId: -1,
        grabDx: 0,
        grabDy: 0,
        pressX: 0,
        pressY: 0,
        pressAt: 0,
        moved: 0,
        trail: [],
      }
      spawnBelow(b)
      // initial fill: scatter some already on screen so it doesn't start empty
      if (i % 2 === 0) b.y = rand(height * 0.25, height)

      container.appendChild(el)
      bubbles.push(b)
    }

    /* ----- transient FX elements (droplets, labels) ----- */
    const fxEls = new Set<HTMLElement>()
    const spawnFx = (el: HTMLElement, anim: Animation) => {
      fxEls.add(el)
      container.appendChild(el)
      anim.onfinish = anim.oncancel = () => {
        el.remove()
        fxEls.delete(el)
      }
    }

    const spawnDroplets = (b: Bubble) => {
      const count = Math.round(
        rand(CONFIG.DROPLET_COUNT_MIN, CONFIG.DROPLET_COUNT_MAX) * (0.6 + b.r / CONFIG.RADIUS_MAX),
      )
      for (let i = 0; i < count; i++) {
        const dr = rand(CONFIG.DROPLET_R_MIN, CONFIG.DROPLET_R_MAX)
        const el = document.createElement('span')
        el.className =
          'absolute left-0 top-0 rounded-full pointer-events-none ' +
          'bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95),rgba(96,165,250,0.55)_60%,rgba(37,99,235,0.4)_100%)]'
        el.style.width = `${dr * 2}px`
        el.style.height = `${dr * 2}px`

        const angle = rand(0, Math.PI * 2)
        const dist = rand(CONFIG.DROPLET_DIST_MIN, CONFIG.DROPLET_DIST_MAX)
        const ox = b.x - dr
        const oy = b.y - dr
        const midX = ox + Math.cos(angle) * dist * 0.6
        const midY = oy + Math.sin(angle) * dist * 0.6 - CONFIG.DROPLET_GRAVITY * 0.35
        const endX = ox + Math.cos(angle) * dist
        const endY = oy + Math.sin(angle) * dist + CONFIG.DROPLET_GRAVITY

        const anim = el.animate(
          [
            { transform: `translate3d(${ox}px, ${oy}px, 0) scale(1)`, opacity: 1 },
            { transform: `translate3d(${midX}px, ${midY}px, 0) scale(0.85)`, opacity: 0.9, offset: 0.55 },
            { transform: `translate3d(${endX}px, ${endY}px, 0) scale(0.35)`, opacity: 0 },
          ],
          { duration: CONFIG.DROPLET_MS, easing: 'cubic-bezier(0.15, 0.6, 0.3, 1)', fill: 'forwards' },
        )
        spawnFx(el, anim)
      }
    }

    const showStreakLabel = (b: Bubble, count: number) => {
      const el = document.createElement('span')
      el.textContent = `${count}x`
      el.className =
        'absolute left-0 top-0 pointer-events-none select-none font-semibold ' +
        'text-sky-500/70 dark:text-sky-300/70'
      el.style.fontSize = `${Math.round(12 + b.r * 0.12)}px`
      const ox = b.x
      const oy = b.y - b.r
      const anim = el.animate(
        [
          { transform: `translate3d(${ox}px, ${oy}px, 0) translate(-50%, 0) scale(0.85)`, opacity: 0 },
          { transform: `translate3d(${ox}px, ${oy - 10}px, 0) translate(-50%, 0) scale(1)`, opacity: 0.9, offset: 0.25 },
          { transform: `translate3d(${ox}px, ${oy - 34}px, 0) translate(-50%, 0) scale(1)`, opacity: 0 },
        ],
        { duration: CONFIG.LABEL_MS, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)', fill: 'forwards' },
      )
      spawnFx(el, anim)
    }

    /* ----- pop / streak ----- */
    let streak = 0
    let lastPopAt = -Infinity
    let chainTimers: number[] = []

    const pop = (b: Bubble, now: number, chained = false) => {
      if (b.state === 'popping' || b.state === 'waiting') return
      b.state = 'popping'
      b.el.animate(
        [
          { transform: `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) scale(1)`, opacity: 1 },
          { transform: `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) scale(1.45)`, opacity: 0 },
        ],
        { duration: CONFIG.POP_MS, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)', fill: 'forwards' },
      )
      spawnDroplets(b)
      window.setTimeout(() => {
        b.state = 'waiting'
        b.respawnAt =
          performance.now() + rand(CONFIG.RESPAWN_DELAY_MIN, CONFIG.RESPAWN_DELAY_MAX)
        b.el.getAnimations().forEach((a) => a.cancel())
        b.el.style.opacity = '0'
      }, CONFIG.POP_MS)

      // streak: pops close enough together chain up; 10 in a row bursts everything.
      // chain-triggered pops don't count, or the chain would re-trigger itself.
      if (chained) return
      streak = now - lastPopAt <= CONFIG.STREAK_WINDOW_MS ? streak + 1 : 1
      lastPopAt = now
      showStreakLabel(b, streak)
      if (streak >= CONFIG.STREAK_TARGET) {
        streak = 0
        const alive = bubbles.filter((o) => o !== b && (o.state === 'float' || o.state === 'drag'))
        alive.forEach((o, idx) => {
          chainTimers.push(
            window.setTimeout(() => pop(o, performance.now(), true), (idx + 1) * CONFIG.CHAIN_STAGGER_MS),
          )
        })
      }
    }

    /* ----- pointer interaction ----- */
    const onPointerDown = (b: Bubble) => (e: PointerEvent) => {
      if (b.state !== 'float') return
      b.state = 'drag'
      b.pointerId = e.pointerId
      const rect = container.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      b.grabDx = b.x - px
      b.grabDy = b.y - py
      b.pressX = px
      b.pressY = py
      b.pressAt = performance.now()
      b.moved = 0
      b.trail = [{ x: b.x, y: b.y, t: b.pressAt }]
      b.el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (b: Bubble) => (e: PointerEvent) => {
      if (b.state !== 'drag' || e.pointerId !== b.pointerId) return
      const rect = container.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      b.moved = Math.max(b.moved, Math.hypot(px - b.pressX, py - b.pressY))
      b.x = px + b.grabDx
      b.y = py + b.grabDy
      const now = performance.now()
      b.trail.push({ x: b.x, y: b.y, t: now })
      while (b.trail.length > 2 && now - b.trail[0].t > 90) b.trail.shift()
    }

    const onPointerEnd = (b: Bubble) => (e: PointerEvent) => {
      if (b.state !== 'drag' || e.pointerId !== b.pointerId) return
      const now = performance.now()
      const wasClick = b.moved <= CONFIG.CLICK_MAX_MOVE && now - b.pressAt <= CONFIG.CLICK_MAX_MS
      if (wasClick) {
        pop(b, now)
        return
      }
      // fling: velocity from the last ~90ms of movement
      b.state = 'float'
      const first = b.trail[0]
      const dt = (now - first.t) / 1000
      if (dt > 0.016) {
        let vx = (b.x - first.x) / dt
        let vy = (b.y - first.y) / dt
        const speed = Math.hypot(vx, vy)
        if (speed > CONFIG.FLING_MAX) {
          vx *= CONFIG.FLING_MAX / speed
          vy *= CONFIG.FLING_MAX / speed
        }
        b.vx = vx
        b.vy = vy
      } else {
        b.vx = 0
        b.vy = -b.buoyancy
      }
    }

    const cleanups: (() => void)[] = []
    for (const b of bubbles) {
      const down = onPointerDown(b)
      const move = onPointerMove(b)
      const end = onPointerEnd(b)
      b.el.addEventListener('pointerdown', down)
      b.el.addEventListener('pointermove', move)
      b.el.addEventListener('pointerup', end)
      b.el.addEventListener('pointercancel', end)
      cleanups.push(() => {
        b.el.removeEventListener('pointerdown', down)
        b.el.removeEventListener('pointermove', move)
        b.el.removeEventListener('pointerup', end)
        b.el.removeEventListener('pointercancel', end)
      })
    }

    /* ----- physics loop ----- */
    let raf: number | null = null
    let last = performance.now()
    let inViewport = true
    let tabVisible = document.visibilityState === 'visible'
    const shouldRun = () => inViewport && tabVisible

    const tick = () => {
      raf = null
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, CONFIG.MAX_DT)
      last = now
      const t = now / 1000

      for (const b of bubbles) {
        if (b.state === 'popping') continue

        if (b.state === 'waiting') {
          if (now >= b.respawnAt) {
            spawnBelow(b)
            b.el.style.opacity = '1'
          } else {
            continue
          }
        }

        if (b.state === 'float') {
          // fling velocity relaxes back to the natural float (buoyancy + sway)
          const k = Math.min(CONFIG.DAMPING * dt, 1)
          b.vx += (0 - b.vx) * k + Math.cos(t * b.swayFreq * Math.PI * 2 + b.swayPhase) * b.swayAmp * dt
          b.vy += (-b.buoyancy - b.vy) * k
          b.x += b.vx * dt
          b.y += b.vy * dt

          // wrap: leave one side, come back on the opposite one
          if (b.y < -b.r) b.y = height + b.r
          else if (b.y > height + b.r + 60) b.y = -b.r
          if (b.x < -b.r) b.x = width + b.r
          else if (b.x > width + b.r) b.x = -b.r
        }

        b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`
      }

      if (shouldRun()) raf = requestAnimationFrame(tick)
    }
    const resume = () => {
      if (raf === null && shouldRun()) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    const pause = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    const io = new IntersectionObserver((entries) => {
      inViewport = entries.some((e) => e.isIntersecting)
      if (inViewport) resume()
      else pause()
    })
    io.observe(container)

    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible'
      if (tabVisible) resume()
      else pause()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => {
      width = container.clientWidth
      height = container.clientHeight
    })
    ro.observe(container)

    resume()

    return () => {
      pause()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      chainTimers.forEach((id) => window.clearTimeout(id))
      chainTimers = []
      cleanups.forEach((fn) => fn())
      bubbles.forEach((b) => b.el.remove())
      fxEls.forEach((el) => el.remove())
      fxEls.clear()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    />
  )
}
