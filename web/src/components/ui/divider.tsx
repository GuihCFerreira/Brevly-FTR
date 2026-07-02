import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type DividerProps = HTMLAttributes<HTMLHRElement>

export function Divider({ className, ...props }: DividerProps) {
  return (
    <hr
      className={cn('h-px w-full shrink-0 border-0 bg-gray-200', className)}
      {...props}
    />
  )
}
