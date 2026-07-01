import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SpinnerIcon } from "@phosphor-icons/react";
import { createLink } from "../http/create-link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { showErrorToast, showSuccessToast } from "./ui/toast";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Informe uma url válida.")
    .regex(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
      "Informe uma url válida.",
    )
    .transform((value) =>
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    ),
  shortenedUrl: z
    .string()
    .min(1, "Informe uma url minúscula e sem espaço/caracter especial.")
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Informe uma url minúscula e sem espaço/caracter especial.",
    ),
});

type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export function CreateLinkForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });

  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getLinks"] }),
  });

  async function handleCreateLink({
    originalUrl,
    shortenedUrl,
  }: CreateLinkSchema) {
    try {
      await createLinkFn({ originalUrl, shortenedUrl });
      showSuccessToast({
        title: "Link criado com sucesso",
        description: `O link brev.ly/${shortenedUrl} já está disponível.`,
      });
      reset();
    } catch (error) {
      const alreadyExists = isAxiosError(error) && error.response?.status === 409;
      showErrorToast({
        title: "Erro no cadastro",
        description: alreadyExists ? "Essa URL encurtada já existe." : "Não foi possível salvar o link. Tente novamente.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateLink)}
      className="bg-gray-100 justify-between w-full flex flex-col min-h-79 p-6 gap-5 rounded-lg md:p-8 md:gap-6 md:min-w-80 md:w-1/2 md:min-h-85"
    >
      <h3 className="font-bold text-lg text-gray-600">Novo link</h3>

      <div className="flex flex-col w-full gap-y-4">
        <Input
          label="Link original"
          placeholder="www.exemplo.com.br"
          error={errors.originalUrl?.message}
          {...register("originalUrl")}
        />

        <Input
          label="Link encurtado"
          prefix="brev.ly/"
          error={errors.shortenedUrl?.message}
          {...register("shortenedUrl")}
        />
      </div>

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting && <SpinnerIcon className="size-4 animate-spin" />}
        Salvar link
      </Button>
    </form>
  );
}
