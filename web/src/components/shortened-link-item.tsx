import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { IconButton } from "./ui/icon-button";
import type { Link } from "../interfaces/link";
import { generatePath } from "react-router";

interface ShortenedLinkItemProps {
  link: Link;
}

export function ShortenedLinkItem({ link }: ShortenedLinkItemProps) {

  const handleOpenLink = () => {
    if (!link.shortenedUrl || link.shortenedUrl.trim() === "") return;
    const url = generatePath("/:shortenedUrl", { shortenedUrl: 'linkshortenedUrl' });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const copyLinkToClipboard = () => {
    if (!link.shortenedUrl || link.shortenedUrl.trim() === "") return;
    navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${link.shortenedUrl}`);
  }

  return (
    <div className="flex gap-x-4 py-0.5 items-center justify-between hover:cursor-pointer md:gap-x-5" onClick={handleOpenLink}>
      <div className="flex min-w-0 flex-1 flex-col gap-y-1 justify-center">
        <h4 className="truncate text-md text-blue-base font-semibold">
          {import.meta.env.VITE_FRONTEND_URL}/{link.shortenedUrl}
        </h4>
        <h4 className="truncate text-sm text-gray-500">
          {link.originalUrl}
        </h4>
      </div>

      <div className="flex shrink-0 gap-x-4 items-center md:gap-x-5">
        <h4 className="whitespace-nowrap text-sm text-gray-500">{link.accessAmount} acessos</h4>

        <div className="flex gap-x-1 justify-between">
          <IconButton aria-label="Copiar link encurtado" onClick={copyLinkToClipboard}>
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
