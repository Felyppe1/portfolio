'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useSite } from '@/context/SiteContext'

export function useContactForm(onSuccess: () => void) {
  const { t } = useSite()

  const schema = z.object({
    name: z.string().min(1, t('formNameError')),
    email: z.string().email(t('formEmailError')),
    message: z.string().min(1, t('formMessageError')),
  })

  type ContactFormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = async () => {
    try {
      // No backend — simulate the send (static site).
      await new Promise((resolve) => setTimeout(resolve, 700))
      toast.success(t('toastMessage'))
      onSuccess()
      reset()
    } catch {
      toast.error(t('toastError'))
    }
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit }
}
