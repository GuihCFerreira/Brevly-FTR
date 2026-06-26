import { SpinnerIcon } from '@phosphor-icons/react'

export function LinkListLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-6">
      <SpinnerIcon className="size-8 animate-spin text-gray-400" />
      <span className="text-xs uppercase text-gray-500 text-center">
        Carregando links
      </span>
    </div>
  )
}
