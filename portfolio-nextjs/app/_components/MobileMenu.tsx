'use client'

import { useSite } from '@/context/SiteContext'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { key: 'navHero' as const, href: '#top', section: 'top' },
  { key: 'navAbout' as const, href: '#about', section: 'about' },
  { key: 'navWork' as const, href: '#work', section: 'work' },
  { key: 'navContact' as const, href: '#contact', section: 'contact' },
]

export function MobileMenu() {
  const { isMenuOpen, closeMenu, t, activeSection } = useSite()

  return (
    <div
      className="fixed inset-0 z-[29] flex-col items-center justify-center gap-[2.125rem] bg-background/95 backdrop-blur-[0.5rem]"
      style={{ display: isMenuOpen ? 'flex' : 'none' }}
      data-mobile-menu
    >
      {NAV_ITEMS.map(({ key, href, section }) => {
        const isActive = activeSection === section
        return (
          <Button
            key={key}
            asChild
            variant="ghost"
            size="lg"
            className={`h-auto rounded-md px-3 font-display text-[2.125rem] font-bold transition-colors ${isActive ? 'text-primary hover:text-primary/80' : 'text-foreground'}`}
          >
            <a href={href} onClick={closeMenu}>
              {t(key)}
            </a>
          </Button>
        )
      })}
    </div>
  )
}
