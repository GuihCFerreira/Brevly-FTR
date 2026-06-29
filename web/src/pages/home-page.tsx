import logo from "../../public/logo.svg";
import { ShortenedLinksList } from "../components/shortened-links-list";
import { CreateLinkForm } from "../components/create-link-form";

export function HomePage() {
  return (
    <div className="flex justify-self-center w-full flex-col px-3 md:max-w-245 md:items-center">
      <div className="mt-8 w-full mb-6 flex items-center justify-center md:justify-start md:mb-8 md:mt-22">
        <img src={logo} alt="Logo" />
      </div>

      <div className="w-full flex flex-col gap-y-3 md:flex-row md:gap-x-5">
        <CreateLinkForm />
        <ShortenedLinksList />
      </div>
    </div>
  );
}
