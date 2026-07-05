'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '@/types'
import { translations, type TranslationKey } from '@/data/translations'

interface SiteContextValue {
  lang: Lang
  toggleLang: () => void
  t: (key: TranslationKey) => string
  isMenuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
  activeSection: string
}

const SiteContext = createContext<SiteContextValue | null>(null)

function readStored<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  return (window.localStorage.getItem(key) as T) || fallback
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => readStored('pf-lang', 'pt'))
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const ids = ['top', 'about', 'work', 'contact']
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'pt' ? 'en' : 'pt'
      window.localStorage.setItem('pf-lang', next)
      return next
    })
  }, [])

  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang])

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <SiteContext.Provider
      value={{
        lang,
        toggleLang,
        t,
        isMenuOpen,
        toggleMenu,
        closeMenu,
        activeSection,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
