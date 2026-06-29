import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CreateLinkForm() {
  return (
    <div className="bg-gray-100 justify-between w-full flex flex-col h-79 p-6 gap-5 rounded-lg md:p-8 md:gap-6 md:min-w-80 md:max-w-95 md:w-5/12 md:h-85">
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
  );
}
