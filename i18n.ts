import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// os locales com 'as const'
export const locales = ['en', 'pt', 'es'] as const;

// criar um tipo para seus locales suportados
export type Locale = typeof locales[number]; 

// --- tipos para as mensagens ---
// ex: './locales/pt.json' se a pasta 'locales' está no mesmo nível deste arquivo i18n.ts.
// Certifique-se que o arquivo existe e tem a estrutura correta.
type MessagesSource = typeof import('./locales/pt.json'); 

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface IntlMessages extends MessagesSource {}
}


// função de guarda de tipo (type guard) para validar o locale
function isValidLocale(localeToCheck: string): localeToCheck is Locale {
  return (locales as readonly string[]).includes(localeToCheck);
}

// aqui a assinatura e a lógica do callback de getRequestConfig
export default getRequestConfig(async ({locale: incomingLocale}) => {
  // 'incomingLocale' aqui é inferido por TypeScript como string | undefined

  // 1º, verificar se 'incomingLocale' foi fornecido.
  if (!incomingLocale) {
    console.warn('Locale não definido em getRequestConfig. Chamando notFound().');
    notFound();
  }

  // já que 'incomingLocale' é uma string, podemos validá-lo...
  if (!isValidLocale(incomingLocale)) {
    console.warn(`Locale inválido "${incomingLocale}" em getRequestConfig. Chamando notFound().`);
    notFound();
  }

  // aqui, 'incomingLocale' é do tipo Locale (ex: 'en', 'pt', 'es')
  // e é uma string validada. Vamos usar um nome claro para ele.
  const validatedLocale = incomingLocale;

  //  caminho para seus arquivos de tradução está correto !!!
  const loadedMessages = (await import(`./locales/${validatedLocale}.json`)).default;

  // o objeto retornado DEVE estar em conformidade com o tipo RequestConfig do next-intl,
  // que requer a propriedade 'locale'.
  return {
    messages: loadedMessages as MessagesSource, // add um cast para MessagesSource para melhor tipagem
    locale: validatedLocale                  
  };
});