/* eslint-disable react-refresh/only-export-components */

import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  type Icon,
} from '@phosphor-icons/react'
import { toast as sonnerToast } from 'sonner'
import { cn } from '../../lib/utils'

interface ToastContent {
  title: string
  description: string
}

type ToastVariant = 'info' | 'success' | 'error'

interface VariantStyle {
  icon: Icon
  background: string
  accent: string
}

const variantStyles: Record<ToastVariant, VariantStyle> = {
  info: {
    icon: InfoIcon,
    background: 'bg-[#edf0fa]',
    accent: 'text-blue-base',
  },
  success: {
    icon: CheckCircleIcon,
    background: 'bg-[#e7f6ee]',
    accent: 'text-[#0e8a4f]',
  },
  error: {
    icon: WarningCircleIcon,
    background: 'bg-[#fcecef]',
    accent: 'text-danger',
  },
}

export function showInfoToast(content: ToastContent) {
  return sonnerToast.custom((id) => (
    <ToastCard id={id} variant="info" {...content} />
  ))
}

export function showSuccessToast(content: ToastContent) {
  return sonnerToast.custom((id) => (
    <ToastCard id={id} variant="success" {...content} />
  ))
}

export function showErrorToast(content: ToastContent) {
  return sonnerToast.custom((id) => (
    <ToastCard id={id} variant="error" {...content} />
  ))
}

interface ToastCardProps extends ToastContent {
  id: string | number
  variant: ToastVariant
}

function ToastCard({ variant, title, description }: ToastCardProps) {
  const { icon: Icon, background, accent } = variantStyles[variant]

  return (
    <div
      className={cn(
        'flex w-90 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg p-4 shadow-lg',
        background,
      )}
    >
      <Icon weight="fill" className={cn('mt-0.5 size-4 shrink-0', accent)} />
      <div className="flex flex-col gap-1">
        <strong className={cn('text-sm font-bold', accent)}>{title}</strong>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
