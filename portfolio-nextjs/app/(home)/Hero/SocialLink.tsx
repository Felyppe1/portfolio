'use client'

import { useMagnetic } from '@/hooks/useMagnetic'
import { Button } from '@/components/ui/button'

export function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.5)
  return (
    <Button
      asChild
      variant="outline"
      size="icon-lg"
      className="h-12 w-12 transition-[color,background-color,border-color,box-shadow]"
    >
      <a ref={ref} href={href} target="_blank" rel="noreferrer" aria-label={label}>
        {children}
      </a>
    </Button>
  )
}
