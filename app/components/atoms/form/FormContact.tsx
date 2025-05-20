"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "./validador";
import {
  FiSend,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiFileText,
  FiCheckSquare,
} from "react-icons/fi";

export default function FormContact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    //simulação de chamada de API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset(); // limpa o form após o envio bem sucedido 
  };

  if (isSubmitSuccessful) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-green-50 dark:bg-green-900/30 rounded-lg shadow-lg">
        <FiCheckSquare className="w-16 h-16 text-green-500 dark:text-green-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Mensagem Enviada!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Obrigado por entrar em contato. Responderemos em breve.
        </p>
        <button
            onClick={() => reset()} 
            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
        >
            Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return(
    <>
    {/* parte inicial -- frufru */}
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
        Entre em Contato
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Adoraríamos ouvir de você! Preencha o formulário abaixo.
      </p>

        {/* começa o formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiUser className="mr-2 text-gray-500 dark:text-gray-400" /> Nome Completo
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 block w-full px-4 py-3 border ${
              errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
            } rounded-lg shadow-sm focus:outline-none sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
            placeholder="Seu nome completo"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiMail className="mr-2 text-gray-500 dark:text-gray-400" /> Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full px-4 py-3 border ${
              errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
            } rounded-lg shadow-sm focus:outline-none sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
            placeholder="seuemail@exemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
        </div>

        {/* Assunto */}
        <div>
          <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiFileText className="mr-2 text-gray-500 dark:text-gray-400" /> Assunto
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={`mt-1 block w-full px-4 py-3 border ${
              errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
            } rounded-lg shadow-sm focus:outline-none sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
            placeholder="Qual o motivo do contato?"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject.message}</p>}
        </div>

        {/* mensagem */}
        <div>
          <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiMessageSquare className="mr-2 text-gray-500 dark:text-gray-400" /> Sua Mensagem
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`mt-1 block w-full px-4 py-3 border ${
              errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
            } rounded-lg shadow-sm focus:outline-none sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
            placeholder="Deixe sua mensagem aqui..."
          />
          {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
        </div>

        {/* consentimento */}
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                id="consent"
                type="checkbox"
                {...register('consent')}
                className={`h-4 w-4 ${
                    errors.consent ? 'border-red-500 text-red-600 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500'
                } rounded dark:bg-gray-700 dark:focus:ring-offset-gray-800`}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="consent" className="font-medium text-gray-700 dark:text-gray-300">
                Eu concordo com os <a href="/termos" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">termos e condições</a>.
                </label>
                {errors.consent && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.consent.message}</p>}
            </div>
        </div>


        {/* btn enviar */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-all duration-150 ease-in-out group"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <FiSend className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                Enviar Mensagem
              </>
            )}
          </button>
        </div>
      </form>
    </div>    
    </>
  );
  };

