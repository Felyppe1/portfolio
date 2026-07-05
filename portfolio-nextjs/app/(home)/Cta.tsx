'use client'

import { useSite } from '@/context/SiteContext'
import { useReveal } from '@/hooks/useReveal'
import { useMagnetic } from '@/hooks/useMagnetic'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/app/_components/contact-modal'
import { BubbleField } from '@/app/_components/BubbleField'

export function Cta() {
  const { t } = useSite()
  const rHeading = useReveal<HTMLParagraphElement>(0)
  const rButton = useReveal<HTMLButtonElement>(95)
  const magneticRef = useMagnetic<HTMLButtonElement>(0.35)

  const setButtonRef = (el: HTMLButtonElement | null) => {
    rButton.ref.current = el
    magneticRef.current = el
  }

  return (
    <section id="contact" className="pointer-events-auto relative flex min-h-dvh flex-col items-center overflow-hidden border-t px-5 py-[clamp(4.375rem,10vh,8.125rem)] text-center sm:px-8 lg:px-16">
      <BubbleField />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center">
        <p
          ref={rHeading.ref}
          className={`${rHeading.className} mx-auto mb-7 max-w-[56.25rem] text-balance font-display text-[clamp(2.9rem,7vw,4.6rem)] font-extrabold leading-none tracking-[-0.035em]`}
          style={rHeading.style}
        >
          {t('ctaHeading')}
        </p>
        <ContactModal>
          <Button
            ref={setButtonRef}
            size="lg"
            className={`${rButton.className} pointer-events-auto h-auto w-fit px-[2.125rem] py-[0.9375rem] font-mono text-[0.9375rem] font-bold tracking-[0.01em]`}
            style={rButton.style}
          >
            {t('ctaButton')}
          </Button>
        </ContactModal>
      </div>
      <p className="pointer-events-none relative z-10 mt-14 font-mono text-[0.78125rem] tracking-[0.03em] text-muted-foreground">
        <span className="font-sans align-middle">©</span> 2026 Luiz Felyppe — Rio de Janeiro, BR
      </p>
    </section>
  )
}
