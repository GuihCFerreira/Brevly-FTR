import { WarningIcon } from '@phosphor-icons/react'
import { useId, type ComponentProps } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  error?: string
  prefix?: string
}

export function Input({ label, error, prefix, className, id, ref, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="group flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs uppercase font-normal text-gray-500',
            'group-focus-within:font-bold group-focus-within:text-blue-base',
            error && 'font-bold text-danger',
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex h-12 items-center rounded-lg border border-gray-300 px-4',
          'focus-within:border-[1.5px] focus-within:border-blue-base',
          error && 'border-[1.5px] border-danger',
        )}
      >
        {prefix && (
          <span className="select-none text-md text-gray-400">{prefix}</span>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full bg-transparent text-md text-gray-600 outline-none',
            'placeholder:text-gray-400 focus:text-blue-base caret-blue-base',
            className,
          )}
          {...props}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2">
          <WarningIcon className="size-4 text-danger" />
          <span className="text-sm text-gray-500">{error}</span>
        </div>
      )}
    </div>
  )
}
