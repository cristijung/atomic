import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation'; 

// os locales com 'as const'
export const locales = ['en', 'pt', 'es'] as const;

// criar um tipo para seus locales suportados
export type Locale = typeof locales[number];

// --- tipos para as mensagens ---
type MessagesSource = typeof import('./locales/pt.json'); 

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface IntlMessages extends MessagesSource {}
}

// função de guarda de tipo (type guard) para validar o locale
function isValidLocale(localeToCheck: string): localeToCheck is Locale {
  return (locales as readonly string[]).includes(localeToCheck);
}

console.log('--- [i18n.ts] Módulo i18n.ts CARREGADO PELO NODE.JS ---');

export default getRequestConfig(async ({locale: incomingLocale}) => {
  console.log(`--- [i18n.ts] getRequestConfig INICIADO. Locale recebido: ${incomingLocale} ---`);

  // incomingLocale é uma string e se é um locale suportado
  // a função notFound() interrompe a execução, então não precisamos de 'return;' depois dela.
  if (typeof incomingLocale !== 'string' || !isValidLocale(incomingLocale)) {
    console.warn(`[i18n.ts] Locale inválido ou não fornecido: "${incomingLocale}". Chamando notFound().`);
    notFound(); // SE o locale não for uma string ou não for válido, chama notFound()
  }
  // chegamos aqui, incomingLocale é agora do tipo Locale ('en' | 'pt' | 'es')
  // devido à guarda de tipo isValidLocale e à verificação anterior.
  const validatedLocale = incomingLocale;

  console.log(`[i18n.ts] Locale validado com sucesso: ${validatedLocale}`);

  let loadedMessages;
  try {
    console.log(`[i18n.ts] Tentando carregar mensagens para: ./locales/${validatedLocale}.json`);
    loadedMessages = (await import(`./locales/${validatedLocale}.json`)).default;
    console.log(`[i18n.ts] Mensagens para ${validatedLocale} carregadas com SUCESSO.`);
  } catch (error) {
    console.error(`[i18n.ts] !!! ERRO CRÍTICO ao carregar mensagens para ${validatedLocale}:`, error);
    notFound(); // se houver erro ao carregar o JSON, chama notFound()
  }

  console.log(`[i18n.ts] Retornando configuração para ${validatedLocale}.`);  
  return {
    messages: loadedMessages as MessagesSource,
    locale: validatedLocale
  };
});