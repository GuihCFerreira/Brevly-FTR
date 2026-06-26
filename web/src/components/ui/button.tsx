import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'w-full h-12 px-5 rounded-lg bg-blue-base text-white text-md font-semibold hover:bg-blue-dark',
  secondary:
    'h-8 px-2 gap-1.5 rounded bg-gray-200 text-gray-500 text-sm font-semibold border border-transparent hover:border-blue-base',
}

export function Button({
  variant = 'primary',
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
