'use client'

import { useEffect, useRef, useState } from 'react'
import { useSite } from '@/context/SiteContext'
import { useTypewriter } from '@/hooks/useTypewriter'
import { translations } from '@/data/translations'
import { IconChevronDown, IconGithub, IconInstagram, IconLinkedin } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SocialLink } from './SocialLink'

const HERO_LINES = [
  { pt: translations.pt.heroGreeting, en: translations.en.heroGreeting },
  { pt: translations.pt.heroName, en: translations.en.heroName },
  { pt: translations.pt.heroRole, en: translations.en.heroRole },
]

export function Hero() {
  const { lang } = useSite()
  const [heroInVisible, setHeroInVisible] = useState(false)
  const [cueVisible, setCueVisible] = useState(false)
  const [cueFloating, setCueFloating] = useState(false)
  const cueTimer = useRef<number>(undefined)

  const { texts, activeLine, typing } = useTypewriter(HERO_LINES, lang, () => {
    setCueVisible(true)
    cueTimer.current = window.setTimeout(() => setCueFloating(true), 650)
  })

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroInVisible(true), 320)
    return () => {
      clearTimeout(timer)
      window.clearTimeout(cueTimer.current)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-[5.625rem] pt-[7.5rem] sm:px-8 lg:px-16"
    >
      <div className="pointer-events-auto text-left text-[clamp(.82rem,1.7vw,1.2rem)]">
        <p className="m-0 mb-[.5em] min-h-[1.2em] font-mono text-[2.1em] font-normal leading-none text-[var(--accent)]">
          {texts[0]}
          {activeLine === 0 && <span className={`tw-caret ${typing ? '' : 'tw-caret-blink'}`} />}
        </p>
        <h1 className="m-0 min-h-[1.02em] font-display text-[6.2em] font-extrabold leading-[0.98] tracking-[-0.035em]">
          {texts[1]}
          {activeLine === 1 && <span className={`tw-caret ${typing ? '' : 'tw-caret-blink'}`} />}
        </h1>
        <p className="m-0 mt-[1em] min-h-[1.2em] font-mono text-[2.1em] font-normal leading-none text-[var(--muted)]">
          {texts[2]}
          {activeLine === 2 && <span className={`tw-caret ${typing ? '' : 'tw-caret-blink'}`} />}
        </p>
      </div>

      <div
        className="pointer-events-auto mt-[clamp(2.5rem,6vw,4.125rem)] flex items-center gap-[0.875rem] transition-all duration-700"
        style={{
          opacity: heroInVisible ? 1 : 0,
          transform: heroInVisible ? 'translateY(0)' : 'translateY(30px)',
          transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)',
        }}
      >
        <SocialLink href="https://github.com/Felyppe1" label="GitHub">
          <IconGithub />
        </SocialLink>
        <SocialLink href="https://www.linkedin.com/in/luiz-felyppe-611906244/" label="LinkedIn">
          <IconLinkedin />
        </SocialLink>
        <SocialLink href="https://www.instagram.com/felyppe_nunes1/" label="Instagram">
          <IconInstagram />
        </SocialLink>
      </div>

      <Button
        asChild
        variant="ghost"
        size="icon"
        aria-label="rolar"
        className="pointer-events-auto absolute bottom-[2.125rem] inset-x-0 mx-auto w-fit h-auto rounded-full p-2 transition-opacity duration-700"
        style={{
          opacity: cueVisible ? 1 : 0,
          animation: cueFloating ? 'floatY 2.4s ease-in-out infinite' : undefined,
        }}
      >
        <a href="#about">
          <IconChevronDown className="size-8" />
        </a>
      </Button>
    </section>
  )
}
