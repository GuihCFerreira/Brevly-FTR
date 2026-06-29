import { useNavigate } from "react-router";
import notFoundIcon from "../../public/not-found.svg";

export function NotFoundPage() {

  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate("/", { replace: true });
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center px-3 md:px-0">
      <div className="bg-gray-100 w-full gap-6 flex flex-col rounded-lg px-5 py-12 items-center justify-center max-w-145 md:px-12 md:py-16">
        <img src={notFoundIcon} alt="Not Found" />

        <h3 className="font-bold text-xl text-gray-600">Link não encontrado</h3>

        <div className="flex flex-col gap-y-1 items-center">
          <h4 className="text-gray-500 text-md text-center font-semibold">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <span className="text-blue-base underline hover:cursor-pointer hover:text-blue-dark" onClick={handleGoToHomePage}>
              {" "}
              brev.ly
            </span>
            .
          </h4>
        </div>
      </div>
    </div>
  );
}
