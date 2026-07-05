'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSite } from '@/context/SiteContext'
import { useReveal } from '@/hooks/useReveal'
import { PROJECTS } from '@/data/projects'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Slide } from './Slide'
import { InfoPanel } from './InfoPanel'

export function Work() {
  const { t, lang } = useSite()
  const rHead = useReveal<HTMLDivElement>(0)
  const rCarousel = useReveal<HTMLDivElement>(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const applyTransform = useCallback((i: number, instant: boolean) => {
    const track = trackRef.current
    const slides = slideRefs.current
    if (!track || !slides[0] || !slides[i]) return
    const base = slides[0].offsetLeft
    const shift = base - slides[i]!.offsetLeft
    if (instant) {
      const prev = track.style.transition
      track.style.transition = 'none'
      track.style.transform = `translateX(${shift}px)`
      void track.offsetWidth
      track.style.transition = prev || 'transform .8s cubic-bezier(.5,.05,.15,1)'
    } else {
      track.style.transform = `translateX(${shift}px)`
    }
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, PROJECTS.length - 1))
      setIndex(clamped)
      applyTransform(clamped, false)
    },
    [applyTransform],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => applyTransform(0, true), 80)
    const onResize = () => applyTransform(index, true)
    window.addEventListener('resize', onResize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (displayIndex === index) return
    setFading(true)
    const timer = window.setTimeout(() => {
      setDisplayIndex(index)
      setFading(false)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [index, displayIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, goTo])

  return (
    <section
      id="work"
      className="flex min-h-dvh flex-col justify-center border-t py-[clamp(3.75rem,10vh,7.5rem)] pb-[clamp(5.625rem,12vh,9.375rem)]"
    >
      <div className="pointer-events-auto max-w-[75rem] px-5 sm:px-8 lg:px-16">
        <div ref={rHead.ref} className={rHead.className} style={rHead.style}>
          <h2 className="m-0 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold tracking-[-0.02em]">
            {t('workHeading')}
          </h2>
        </div>
      </div>

      <div
        ref={rCarousel.ref}
        className={`${rCarousel.className} pointer-events-auto relative mt-[clamp(1.75rem,4vw,2.75rem)]`}
        style={rCarousel.style}
      >
        <div className="overflow-x-clip py-[0.375rem]">
          <div
            ref={trackRef}
            data-carousel-track
            className="flex w-max items-stretch gap-6 pl-5 will-change-transform sm:pl-8 lg:pl-16"
            style={{ transition: 'transform .8s cubic-bezier(.5,.05,.15,1)' }}
          >
            {PROJECTS.map((p, i) => (
              <Slide
                key={p.title}
                project={p}
                active={i === index}
                refCb={(el) => (slideRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-[clamp(1.375rem,3vw,2.125rem)] flex max-w-[75rem] flex-col items-start gap-8 px-5 sm:px-8 min-[501px]:flex-row min-[501px]:justify-between lg:px-16">
          <InfoPanel project={PROJECTS[displayIndex]} lang={lang} fading={fading} />

          <div className="flex flex-shrink-0 items-center self-center gap-3 pt-[0.375rem]">
            <Button
              onClick={() => goTo(index - 1)}
              aria-label="anterior"
              variant="outline"
              size="icon-lg"
              className="h-[3.25rem] w-[3.25rem] rounded-full"
            >
              <IconArrowLeft />
            </Button>
            <Button
              onClick={() => goTo(index + 1)}
              aria-label="próximo"
              variant="outline"
              size="icon-lg"
              className="h-[3.25rem] w-[3.25rem] rounded-full"
            >
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
