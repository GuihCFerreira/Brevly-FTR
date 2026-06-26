import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center size-8 rounded bg-gray-200 text-gray-600',
        'border border-transparent hover:border-blue-base transition cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
