'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSite } from '@/context/SiteContext'
import { useReveal } from '@/hooks/useReveal'
import { useTilt } from '@/hooks/useTilt'
import { TECH_CHIPS } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { IconExternal } from '@/components/icons'
import { TechChip } from './TechChip'

// Keywords in aboutP1 that render as external links (with an icon).
const ABOUT_LINKS: Record<string, string> = {
  BlueMetrics: 'https://www.bluemetrics.com.br',
  Globo: 'https://www.globo.com',
}

function renderWithLinks(text: string) {
  const re = new RegExp(`(${Object.keys(ABOUT_LINKS).join('|')})`, 'g')
  return text.split(re).map((part, i) =>
    ABOUT_LINKS[part] ? (
      <a
        key={i}
        href={ABOUT_LINKS[part]}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-baseline gap-[0.2em] border-b border-[var(--line)] pb-[0.05em] font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--accent)]"
      >
        {part}
        <IconExternal
          className="text-[0.72em] opacity-70 transition-transform duration-200 group-hover:-translate-y-[0.1em] group-hover:translate-x-[0.1em]"
          aria-hidden
        />
      </a>
    ) : (
      part
    ),
  )
}

export function About() {
  const { t } = useSite()
  const tiltRef = useTilt<HTMLDivElement>(15, true)
  const rHead = useReveal<HTMLDivElement>(0)
  const rImg = useReveal<HTMLDivElement>(0)
  const rLead = useReveal<HTMLParagraphElement>(0)
  const rP1 = useReveal<HTMLParagraphElement>(95)
  const rP2 = useReveal<HTMLParagraphElement>(190)
  const rTechHead = useReveal<HTMLDivElement>(285)
  const rMarquee = useReveal<HTMLDivElement>(380)

  // Clicked cell stays active until another is clicked; hover previews on top.
  const [clicked, setClicked] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  // The "Tecnologias" button lights every cell at once.
  const [allActive, setAllActive] = useState(false)
  const activeIndex = hovered ?? clicked

  // Clicking anywhere outside a cell (or the button) clears the selection.
  // (Those clicks call stopPropagation so they don't reach this listener.)
  useEffect(() => {
    if (clicked === null && !allActive) return
    const clear = () => {
      setClicked(null)
      setAllActive(false)
    }
    document.addEventListener('click', clear)
    return () => document.removeEventListener('click', clear)
  }, [clicked, allActive])

  return (
    <section
      id="about"
      className="flex min-h-dvh flex-col justify-center overflow-x-clip border-t px-5 py-[clamp(5rem,12vh,9.375rem)] sm:px-8 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[75rem]">
        <div
          ref={rHead.ref}
          className={`${rHead.className} pointer-events-auto mb-[clamp(2.5rem,6vw,4rem)]`}
          style={rHead.style}
        >
          <h2 className="m-0 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold tracking-[-0.02em]">
            {t('aboutHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] [@media(min-width:700px)]:grid-cols-[0.82fr_1.18fr]">
        <div
          ref={rImg.ref}
          className={`${rImg.className} pointer-events-auto relative min-w-0`}
          style={{ ...rImg.style, perspective: '1000px' }}
        >
          <div
            ref={tiltRef}
            className="relative block aspect-[4/3] max-h-[16rem] w-full overflow-hidden rounded-2xl [@media(min-width:700px)]:aspect-[4/5] [@media(min-width:700px)]:max-h-none"
            style={{ boxShadow: '0 24px 55px rgba(0,0,0,.45)', willChange: 'transform' }}
            data-tilt
          >
            {/* Landscape crop on single-column layout, portrait on two-column. */}
            <Image
              src="/images/selfie-small.jpg"
              alt="Luiz Felyppe"
              fill
              sizes="100vw"
              className="object-cover [@media(min-width:700px)]:hidden"
            />
            <Image
              src="/images/selfie.jpg"
              alt="Luiz Felyppe"
              fill
              sizes="(min-width:861px) 40vw, 100vw"
              className="hidden object-cover [@media(min-width:700px)]:block"
            />
          </div>
        </div>

        <div className="pointer-events-auto min-w-0">
          <p
            ref={rLead.ref}
            className={`${rLead.className} m-0 mb-6 text-pretty font-display text-[clamp(1.3rem,2.5vw,2rem)] font-semibold leading-[1.28] tracking-[-0.015em]`}
            style={rLead.style}
          >
            {t('aboutLead')}
          </p>
          <p
            ref={rP1.ref}
            className={`${rP1.className} m-0 mb-4 text-pretty text-[clamp(1rem,1.7vw,1.1875rem)] leading-[1.7] text-[var(--muted)] lg:text-[1.3rem]`}
            style={rP1.style}
          >
            {renderWithLinks(t('aboutP1'))}
          </p>
          <p
            ref={rP2.ref}
            className={`${rP2.className} m-0 text-pretty text-[clamp(1rem,1.7vw,1.1875rem)] leading-[1.7] text-[var(--muted)] lg:text-[1.3rem]`}
            style={rP2.style}
          >
            {t('aboutP2')}
          </p>
        </div>
      </div>
      </div>

      {/* Full-bleed panel, forced dark in both themes, with chamfered corners. */}
      <div
        className="relative left-1/2 mt-[clamp(3rem,7vw,5rem)] w-screen -translate-x-1/2 py-[clamp(3rem,7vw,5rem)]"
        style={
          {
            '--bg': '#0e0e0f',
            '--surface': '#13151d',
            '--surface-2': '#1a1d28',
            '--line': 'rgba(238,241,248,0.14)',
            '--text': '#eef1f8',
            '--muted': '#9096a8',
            background: '#0e0e0f',
            clipPath:
              'polygon(0 0, 11% 0, 15% 1.75rem, 85% 1.75rem, 89% 0, 100% 0, 100% 100%, 89% 100%, 85% calc(100% - 1.75rem), 15% calc(100% - 1.75rem), 11% 100%, 0 100%)',
          } as React.CSSProperties
        }
      >
        <div className="mx-auto w-full max-w-[75rem] px-5 sm:px-8 lg:px-16">
          <div ref={rTechHead.ref} className={`${rTechHead.className} mb-6`} style={rTechHead.style}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setAllActive(true)
                setClicked(null)
              }}
              className="pointer-events-auto h-auto rounded-none p-0 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors duration-150 hover:bg-transparent hover:text-[var(--text)]"
            >
              {t('aboutTech')}
            </Button>
          </div>
          <div
            ref={rMarquee.ref}
            className={`${rMarquee.className} pointer-events-auto grid grid-cols-[repeat(auto-fill,minmax(clamp(6.5rem,15vw,8.5rem),1fr))] overflow-hidden rounded-xl border-l-2 border-t-2 border-[var(--line)]`}
            style={rMarquee.style}
            onMouseLeave={() => setHovered(null)}
          >
            {TECH_CHIPS.map((chip, i) => (
              <TechChip
                key={chip.label}
                {...chip}
                active={allActive || activeIndex === i}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
                onClick={() => setClicked(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
