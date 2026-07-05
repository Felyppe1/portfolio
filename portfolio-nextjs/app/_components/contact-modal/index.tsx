'use client'

import { useState, type ReactNode } from 'react'
import { useSite } from '@/context/SiteContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useContactForm } from './use-contact-form'

interface ContactModalProps {
  children: ReactNode
}

export function ContactModal({ children }: ContactModalProps) {
  const { t } = useSite()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useContactForm(() => setOpen(false))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[32.5rem]">
        <DialogHeader>
          <DialogTitle className="font-display text-[2rem] font-bold tracking-[-0.02em]">
            {t('modalHeading')}
          </DialogTitle>
          <DialogDescription className="text-[0.9375rem]">{t('modalDesc')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-[0.375rem]">
            <Label htmlFor="contact-name" className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
              {t('formName')}
            </Label>
            <Input id="contact-name" aria-invalid={!!errors.name} {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-[0.375rem]">
            <Label htmlFor="contact-email" className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
              {t('formEmail')}
            </Label>
            <Input id="contact-email" type="email" aria-invalid={!!errors.email} {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-[0.375rem]">
            <Label htmlFor="contact-message" className="font-mono text-xs tracking-[0.04em] text-muted-foreground">
              {t('formMessage')}
            </Label>
            <Textarea id="contact-message" rows={3} aria-invalid={!!errors.message} {...register('message')} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-[0.375rem]">
            {isSubmitting ? t('formSending') : t('formSend')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
