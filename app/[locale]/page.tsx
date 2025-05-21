
//import { useTranslations } from 'next-intl';  //este é para client component, qdo a page principal for um client component
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

// aqui a function para gerar metadados dinâmicos --> executada no servidor
export async function generateMetadata({ params: {locale} }: Props) {
  // definição do locale para esta requisição específica --> importante para consistência
  setRequestLocale(locale);

  try {
    const t = await getTranslations({locale, namespace: 'Index'});
    return {
      title: t('title'), // tipo ... 'seja bem vindo'
    };
  } catch (error) {
    console.error('Erro ao buscar traduções para metadados:', error);
    return {
      title: 'Erro ao carregar o título',
    };
  }
}

// componente da page principal é um Server Component
export default async function HomePage({ params: {locale} }: Props) {
  setRequestLocale(locale);

  let t;
  try {
    // chama a função de tradução 't' para o namespace 'Index', por exemplo
    t = await getTranslations({ locale, namespace: 'Index' });
  } catch (error) {
    console.error(`Erro ao carregar traduções para o locale "${locale}":`, error);
    // aqui, a mensagem caso a tradução não funcione
    // vai ler as informações sem o 't'
    return (
      <div>
        <h1>Erro ao carregar conteúdo</h1>
        <p>Não foi possível carregar as traduções para o idioma: {locale}.</p>
        <p>Por favor, verifique a configuração e os arquivos de tradução.</p>
      </div>
    );
  }

  return (
    <div>
      {/* ex de uso da função de tradução 't' */}
      <h1>{t('title')}</h1>
      <p>{t('welcomeMessage')}</p> 
      <hr />
      <p>Locale atual da URL: {locale}</p>
      <p>Data e hora no servidor (Brasil): {new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>      
    </div>
  );
}