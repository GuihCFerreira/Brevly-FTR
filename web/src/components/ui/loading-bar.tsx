import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type LoadingBarProps = HTMLAttributes<HTMLDivElement>

export function LoadingBar({ className, ...props }: LoadingBarProps) {
  return (
    <div
      role="progressbar"
      aria-label="Carregando"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-10 h-1 overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="h-full w-2/5 rounded-full bg-blue-base animate-loading-bar" />
    </div>
  )
}
