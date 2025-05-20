"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// definição do esquema de validação com Zod
const contactFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  categoriaDaMensagem: z.enum(["duvida", "sugestao", "reclamacao", "outro"], {
    // mensagem aparecerá se um valor não presente na enum (como '') for enviado.
    errorMap: () => ({ message: "Por favor, selecione uma categoria válida." }),
  }),
  mensagem: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." })
    .max(500, { message: "A mensagem não pode exceder 500 caracteres." }),
});

// definição do tipo dos dados do formulário inferido do esquema Zod
type ContactFormData = z.infer<typeof contactFormSchema>;

// opções para o campo de categoria
const categoriasMensagem = [
  { value: "", label: "Selecione uma categoria..." },
  { value: "duvida", label: "Dúvida" },
  { value: "sugestao", label: "Sugestão" },
  { value: "reclamacao", label: "Reclamação" },
  { value: "outro", label: "Outro" },
];

const FormContato = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      categoriaDaMensagem: undefined,
      mensagem: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // simulação da chamada de API
    console.log("Dados do formulário validados:", data);
    alert(
      `Mensagem enviada com sucesso por ${data.nome}! Categoria: ${data.categoriaDaMensagem}`
    );
    reset(); // clear o formulário
  };

  const handleClearForm = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 md:p-8 max-w-2xl mx-auto bg-gray-800 shadow-md rounded-lg"
    >
      {/* campo nome */}
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Nome Completo
        </label>
        <input
          id="nome"
          type="text"
          {...register("nome")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.nome ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-500 sm:text-sm`}
          placeholder="Seu nome completo"
        />
        {errors.nome && (
          <p className="mt-2 text-sm text-red-600">{errors.nome.message}</p>
        )}
      </div>

      {/* campo email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-gray-200 focus:border-gray-300 sm:text-sm`}
          placeholder="seuemail@exemplo.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* categoria da mensagem --> usando register */}
      <div>
        <label
          htmlFor="categoriaDaMensagem"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Categoria da Mensagem
        </label>
        <select
          id="categoriaDaMensagem"
          {...register("categoriaDaMensagem")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.categoriaDaMensagem ? "border-gray-700" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-red-7000 focus:border-red-700 sm:text-sm bg-gray-700`}
          defaultValue="" // importante para o valor inicial ser o placeholder -- acessibilidade
        >
          {categoriasMensagem.map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
              disabled={cat.value === ""}
            >
              {cat.label}
            </option>
          ))}
        </select>
        {errors.categoriaDaMensagem && (
          <p className="mt-2 text-sm text-red-600">
            {errors.categoriaDaMensagem.message}
          </p>
        )}
      </div>

      {/* mensagem */}
      <div>
        <label
          htmlFor="mensagem"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Sua Mensagem
        </label>
        <textarea
          id="mensagem"
          rows={4}
          {...register("mensagem")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.mensagem ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-igray-500 focus:border-gray-500 sm:text-sm`}
          placeholder="Digite sua mensagem aqui..."
        />
        {errors.mensagem && (
          <p className="mt-2 text-sm text-red-600">{errors.mensagem.message}</p>
        )}
      </div>

      {/* btns */}
      <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          type="button"
          onClick={handleClearForm}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
        >
          Limpar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </div>
    </form>
  );
};

export default FormContato;
