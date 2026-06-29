import linkImage from "../../public/link.svg";

export function EmptyLinksList() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="flex flex-col items-center gap-y-3 w-full pb-6 pt-4">
        <img
          src={linkImage}
          alt="Nenhum link cadastrado"
          className="w-8 h-8 mb-2"
        />
        <h4 className="text-gray-500 text-xs uppercase">
          AINDA NÃO EXISTEM LINKS CADASTRADOS
        </h4>
      </div>
    </div>
  );
}
