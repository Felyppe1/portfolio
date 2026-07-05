'use client'

import type { CSSProperties } from 'react'
import { useSite } from '@/context/SiteContext'
import type { Project, Lang } from '@/types'
import { IconArrowRightSmall } from '@/components/icons'
import { Button } from '@/components/ui/button'

function stageStyle(fading: boolean, delayMs: number): CSSProperties {
  return {
    opacity: fading ? 0 : 1,
    transform: fading ? 'translateY(8px)' : 'translateY(0)',
    transition: fading
      ? 'opacity .12s ease, transform .12s ease'
      : `opacity .5s cubic-bezier(.16,1,.3,1) ${delayMs}ms, transform .5s cubic-bezier(.16,1,.3,1) ${delayMs}ms`,
  }
}

export function InfoPanel({ project, lang, fading }: { project: Project; lang: Lang; fading: boolean }) {
  const { t } = useSite()
  return (
    <div className="max-w-[35rem]">
      <p
        className="m-0 mb-[0.625rem] font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.02em]"
        style={stageStyle(fading, 0)}
      >
        {project.title}
      </p>
      <p
        className="m-0 mb-[0.875rem] font-mono text-xs uppercase tracking-[0.14em] text-primary"
        style={stageStyle(fading, 0)}
      >
        {project.tag}
      </p>
      <p
        className="m-0 mb-[1.125rem] min-h-[3.2em] text-[clamp(1rem,1.7vw,1.1875rem)] leading-[1.6] text-muted-foreground"
        style={stageStyle(fading, 90)}
      >
        {project[lang]}
      </p>
      <div style={stageStyle(fading, 180)}>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group h-auto gap-1.5 rounded-none border-b border-border px-0! pb-[0.1875rem] font-mono text-sm font-bold tracking-[0.02em] text-foreground no-underline transition-colors duration-200 hover:border-primary hover:bg-transparent hover:text-foreground"
        >
          <a href={project.github} target="_blank" rel="noreferrer">
            <span>{t('workViewGithub')}</span>
            <IconArrowRightSmall className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </div>
  )
}
