import { DownloadSimpleIcon } from "@phosphor-icons/react";
import logo from "../../public/logo.svg";
import { LinkListLoading } from "../components/link-list-loading";
import { Button } from "../components/ui/button";
import { Divider } from "../components/ui/divider";
import { Input } from "../components/ui/input";
import { LoadingBar } from "../components/ui/loading-bar";

export function HomePage() {
  return (
    <div className="flex justify-self-center w-full flex-col px-3 sm:max-w-245 sm:items-center">
      <div className="mt-8 w-full mb-6 flex items-center justify-center sm:justify-start sm:mb-8 sm:mt-22">
        <img src={logo} alt="Logo" />
      </div>

      <div className="w-full flex flex-col gap-y-3 sm:flex-row sm:gap-x-5">
        <div className="bg-gray-100 justify-between w-full flex flex-col h-79 p-6 gap-5 rounded-lg sm:p-8 sm:gap-6 sm:min-w-80 sm:max-w-95 sm:w-5/12 sm:h-85">
          <h3 className="font-bold text-lg text-gray-600">Novo link</h3>

          <div className="flex flex-col w-full gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Input placeholder="www.exemplo.com.br" label="Link original" />
            </div>

            <div className="flex flex-col gap-y-2">
              <Input prefix="brev.ly/" label="Link encurtado" />
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full h-12 px-5 rounded-lg bg-blue-base text-white text-md font-semibold hover:bg-blue-dark"
          >
            Salvar link
          </Button>
        </div>

        <div className="relative overflow-hidden bg-gray-100 flex flex-col p-6 gap-4 rounded-lg h-fit max-h-79 sm:p-8 sm:gap-5 sm:w-7/12 sm:max-h-99">
          <LoadingBar />

          <div className="flex items-center justify-between flex-wrap">
            <h3 className="font-bold text-lg text-gray-600">Meus links</h3>
            <Button variant="secondary" disabled>
              <DownloadSimpleIcon className="size-4" />
              Baixar CSV
            </Button>
          </div>

          <Divider />

          <LinkListLoading />
        </div>
      </div>
    </div>
  );
}
