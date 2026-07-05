'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSite } from '@/context/SiteContext'
import type { Project } from '@/types'
import { IconPlay } from '@/components/icons'
import { Button } from '@/components/ui/button'

export function Slide({
  project,
  refCb,
  active,
}: {
  project: Project
  refCb: (el: HTMLDivElement | null) => void
  active: boolean
}) {
  const { t } = useSite()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const a = linkRef.current
    const img = imgRef.current
    const pill = pillRef.current
    if (!a || !img || !pill) return

    const onEnter = () => {
      pill.style.opacity = '1'
      pill.style.transform = 'translate(-50%,-50%) scale(1)'
      img.style.transform = 'scale(1.05)'
    }
    const onLeave = () => {
      pill.style.opacity = '0'
      pill.style.transform = 'translate(-50%,-50%) scale(.6)'
      img.style.transform = 'scale(1)'
    }
    const onMove = (e: PointerEvent) => {
      const r = a.getBoundingClientRect()
      pill.style.left = e.clientX - r.left + 'px'
      pill.style.top = e.clientY - r.top + 'px'
    }
    a.addEventListener('pointerenter', onEnter)
    a.addEventListener('pointerleave', onLeave)
    a.addEventListener('pointermove', onMove)
    return () => {
      a.removeEventListener('pointerenter', onEnter)
      a.removeEventListener('pointerleave', onLeave)
      a.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      data-slide
      ref={refCb}
      className="w-[92vw] flex-none md:w-[min(53.75rem,66vw)]"
      style={{
        opacity: active ? 1 : 0.45,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity .5s ease',
      }}
    >
      <Button
        asChild
        variant="ghost"
        size="lg"
        className="relative block h-auto w-full rounded-[1.25rem] p-0 no-underline"
      >
        <a
          ref={linkRef}
          href={project.deploy}
          target="_blank"
          rel="noreferrer"
          tabIndex={active ? 0 : -1}
          aria-hidden={!active}
          className="aspect-[4/3] shadow-[0_6px_32px_rgba(0,0,0,0.13)] dark:shadow-none md:aspect-[16/8]"
          style={{ cursor: 'none' }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[1.25rem]">
            <div
              ref={imgRef}
              className="absolute inset-0"
              style={{ transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)' }}
            >
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(min-width:768px) 66vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            ref={pillRef}
            className="pointer-events-none absolute left-0 top-0 flex items-center gap-[0.5625rem] whitespace-nowrap rounded-full bg-white px-5 py-[0.6875rem] font-mono text-sm font-bold text-primary-foreground opacity-0"
            style={{
              transform: 'translate(-50%,-50%) scale(.6)',
              boxShadow: '0 10px 30px rgba(0,0,0,.3)',
              transition: 'opacity .3s ease, transform .3s cubic-bezier(.2,.7,.2,1)',
            }}
          >
            <IconPlay className="fill-primary-foreground" />
            <span>{t('workLiveDemo')}</span>
          </div>
        </a>
      </Button>
    </div>
  )
}
