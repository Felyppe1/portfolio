'use client'

import { useTheme } from 'next-themes'
import { useSite } from '@/context/SiteContext'
import { useMagnetic } from '@/hooks/useMagnetic'
import { IconMoon, IconSun } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ContactModal } from './contact-modal'

const NAV_ITEMS = [
  { key: 'navHero' as const, href: '#top' },
  { key: 'navAbout' as const, href: '#about' },
  { key: 'navWork' as const, href: '#work' },
  { key: 'navContact' as const, href: '#contact' },
]

export function Header() {
  const { lang, toggleLang, t, toggleMenu, isMenuOpen } = useSite()
  const { resolvedTheme, setTheme } = useTheme()
  const contactRef = useMagnetic<HTMLButtonElement>(0.35)

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b bg-background/66 px-5 py-[1.125rem] backdrop-blur-[0.875rem] sm:px-8 lg:px-16">
      <div className="flex items-center gap-[2rem]">
        <nav className="hidden items-center gap-[1.75rem] [@media(min-width:861px)]:flex">
          {NAV_ITEMS.map(({ key, href }) => (
            <Button
              key={key}
              asChild
              variant="ghost"
              size="sm"
              className="-mx-2 -my-1 h-auto rounded-md px-2 py-1 font-mono text-[0.84375rem] tracking-[0.02em]"
            >
              <a href={href}>{t(key)}</a>
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-[0.875rem]">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLang}
          className="h-auto px-[0.8125rem] py-[0.4375rem] font-mono text-xs tracking-[0.04em]"
        >
          {lang === 'pt' ? 'PT' : 'EN'}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label="theme"
        >
          {resolvedTheme === 'dark' ? <IconMoon /> : <IconSun />}
        </Button>
        <ContactModal>
          <Button
            ref={contactRef}
            size="lg"
            className="hidden h-auto px-5 py-[0.5625rem] font-mono text-[0.8125rem] font-bold tracking-[0.02em] [@media(min-width:861px)]:flex"
          >
            {t('navContact')}
          </Button>
        </ContactModal>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="menu"
          className="h-8 w-[2.375rem] flex-col justify-center gap-[0.375rem] [@media(min-width:861px)]:hidden"
        >
          <span
            className="block h-[0.15625rem] w-[1.625rem] rounded-sm bg-foreground transition-transform duration-300"
            style={{ transform: isMenuOpen ? 'translateY(0.265rem) rotate(45deg)' : undefined }}
          />
          <span
            className="block h-[0.15625rem] w-[1.625rem] rounded-sm bg-foreground transition-transform duration-300"
            style={{ transform: isMenuOpen ? 'translateY(-0.265rem) rotate(-45deg)' : undefined }}
          />
        </Button>
      </div>
    </header>
  )
}
