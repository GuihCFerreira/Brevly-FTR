import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { IconButton } from "./ui/icon-button";

export function ShortenedLinkItem() {
  return (
    <div className="flex gap-x-4 py-0.5 items-center justify-between sm:gap-x-5">
      <div className="flex min-w-0 flex-1 flex-col gap-y-1 justify-center">
        <h4 className="truncate text-md text-blue-base font-semibold">
          brev.ly/Github-Project
        </h4>
        <h4 className="truncate text-sm text-gray-500">
          github.com/devname/project-name-v2
        </h4>
      </div>

      <div className="flex shrink-0 gap-x-4 items-center sm:gap-x-5">
        <h4 className="whitespace-nowrap text-sm text-gray-500">15 acessos</h4>

        <div className="flex gap-x-1 justify-between">
          <IconButton aria-label="Copiar link encurtado">
            <CopyIcon className="text-gray-600" />
          </IconButton>
          <IconButton aria-label="Excluir link">
            <TrashIcon className="text-gray-600" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
