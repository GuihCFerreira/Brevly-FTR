import logoIcon from "../../public/logo-icon.svg";

export function RedirectPage() {
  return (
    <div className="flex w-screen h-screen items-center justify-center px-3 sm:px-0">
      <div className="bg-gray-100 w-full gap-6 flex flex-col rounded-lg px-5 py-12 items-center justify-center max-w-145 sm:px-12 sm:py-16">
        <img src={logoIcon} alt="Logo" className="size-12" />

        <h3 className="font-bold text-xl text-gray-600">Redirecionando...</h3>

        <div className="flex flex-col gap-y-1 items-center">
          <h4 className="text-gray-500 text-md text-center font-semibold">
            O link será aberto automaticamente em alguns instantes.
          </h4>
          <h4 className="text-gray-500 text-md text-center font-semibold">
            Não foi redirecionado?
            <span className="text-blue-base underline hover:cursor-pointer hover:text-blue-dark">
              {" "}
              Acesse aqui
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
