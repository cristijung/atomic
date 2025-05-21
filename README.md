# Projeto Star Wars
## Estrutura Atomic Design

### Recursos & Tecnologias instalados:
- Nextjs: sem diretório 'src', em 'App Router' e EsLint
- React 19
- Tailwind
- MUI: `npm install @mui/material @emotion/react @emotion/styled`
- MUI Icons: `npm install @mui/icons-material roboto-fontface`
- React Icons: `npm install react-icons --save`
- Heroicons: `npm install @heroicons/react`
- Jest: `npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest`
- RTL para eventos: `npm install --save-dev @testing-library/user-event`
- Ts for Node: `npm install --save-dev ts-node`
- React Hook Form: `npm install react-hook-form` & `npm install @hookform/resolvers zod`
- Internacionalização: `npm install next-intl` OU `npm install next-intl@latest`

### Temas do projeto
É livre desde que contemple uma das categorias abaixo;
- e-commerce 
- blog
- quiz interativo
- biblioteca

### Requisitos do projeto
- Favicon
- Ter um logo (pode usar IA para criar)
- Acessibilidade, Responsividade e Usabilidade -- (Cuidar com a escolha das cores)
- Design Atômico
- Types e/ou Interfaces Globais
- Hooks convencionais e Hooks personalizados
- Consumo de API (livre de acordo com o assunto escolhido)
- Além da Home, precisa ter mais 4 rotas todas no contexto da aplicação 
- Uma galeria de imagem e/ou vídeo (pode ser uma das rotas) - add favoritar e compartilhar
- Deploy no Vercel

### Opcionais
- Usar um BaaS (Backend as a Service) gratuito como Firebase/Firestore
- LocalStorage
- Consumir um Json local ou via CDN

### Observação:
Criar um novo repositório com o nome da aplicação.

_____________________________________________________________________________________
# Context API

A Context API do React é uma ferramenta poderosa para gerenciar o estado global em aplicações, permitindo que dados sejam compartilhados entre componentes sem a necessidade de passá-los manualmente por props em cada nível da árvore de componentes (prop drilling). 

## Principais Conceitos e Implementação:

### Criação do Contexto: 
- Defina a interface (ou tipo) para os dados que o contexto irá armazenar.
- Utilize createContext do React para criar o objeto de contexto, fornecendo um valor inicial (que pode ser null ou um valor - padrão, dependendo da sua lógica).

### Criação do Provedor (Provider Component):
- O Provedor é um Client Component ("use client";) que encapsulará a parte da sua aplicação que precisa de acesso ao contexto.
- Ele gerenciará o estado do contexto (usando useState, useReducer, etc.) e fornecerá esse estado aos seus componentes filhos através da propriedade value do Context.Provider.

### Utilizando o Provedor no Layout ou Página Raiz (App Router):
- No Next.js, por exemplo e com  App Router, sempre vamos precisar criar um middleware ou envolver o arquivo de layout principal (layout.tsx) ou partes específicas da sua aplicação com o Provedor de Contexto. Precisamos lembrar que o provedor em si é um Client Component.
- Ou usar um Wrapper Component, como um Middleware que faz uma ponte entre os Servers e Clients Components.

### Consumindo o Contexto em Client Components:
- Componentes que precisam acessar os dados do contexto devem ser Client Components ("use client";).
- Utilize o `hook useContext` para acessar o valor do contexto.
- É uma boa prática criar um hook personalizado para consumir o contexto, que também pode incluir uma verificação para garantir que o hook está sendo usado dentro de um Provedor.

### Algumas observações que precisamos sempre levar em conta!
- Server Components `NÃO` podem acessar Context API diretamente: A Context API depende do ciclo de vida e do estado do React no lado do cliente. Server Components são renderizados no servidor e não têm acesso a esse estado interativo.
- Passe dados como props: Se um Server Component precisa de dados que também estão em um contexto, precisaremos obter esses dados de outra forma (ex: fetch direto, props de um Server Component pai) e passá-los como props para os Client Components que utilizem o contexto.
- Limite o escopo dos Client Components: Para otimizar o desempenho e aproveitar ao máximo os Server Components, tente manter seus Client Components (e, por consequência, o uso do Context API) o mais restrito possível às partes da sua UI que realmente precisam de interatividade e estado no cliente.
- Composição de renderização híbrida: Podemos ter Server Components que renderizam Client Components. O Provedor de Contexto (sendo um Client Component) pode envolver uma árvore de componentes que inclui tanto Server Components (como filhos estáticos) quanto outros Client Components que consumirão o contexto.

## useMemo
O useMemo é um hook do React que serve para otimizar a performance da sua aplicação, "memorizando" o resultado de um cálculo, por exemplo e reexecutando esse cálculo apenas quando uma de suas dependências mudar. Resumindo, ele ajuda a evitar trabalho desnecessário em renderizações subsequentes se o valor que você precisa não mudou.

### Qual o fluxo do funcionamento?

- Primeiro argumento: Uma função "criadora" que calcula e retorna o valor que você quer memorizar.
- Segundo argumento: Um array de dependências. O `useMemo` irá reexecutar a função criadora e recalcular o valor somente se alguma das dependências neste array tiver mudado desde a última renderização. Se as dependências não mudarem, `useMemo` retorna o valor que ele armazenou (memorizou) da vez anterior.

```const memoizedValue = useMemo(() => {
  // Função que calcula um valor 
  return computeExpensiveValue(dep1, dep2);
}, [dep1, dep2]); // Array de dependências```


______________
Outro exemplo:
______________

function MyComponent({ data }) {
  const options = useMemo(() => ({
    value: data.value,
    label: data.label
  }), [data.value, data.label]); // Só recria 'options' se data.value ou data.label mudar

  return <SomeOtherComponent config={options} />;
}
```
_____________________________________________________________________________________
# Testes Unitários
## React Testing Library
## Jest

### Configurando um projeto React/Nest.Js

- Instalação: `npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest`
_____________________
- jest e jest-environment-jsdom: Framework de teste e ambiente que simula um navegador.
- @testing-library/react: O núcleo da React Testing Library.
- @testing-library/jest-dom: Adiciona matchers customizados para o Jest para facilitar asserções no DOM (ex: toBeInTheDocument(), toHaveTextContent()).
- @types/jest: Tipos TypeScript para o Jest.
- ts-jest: Um preset para o Jest que permite que ele entenda e execute arquivos TypeScript.


_____________________________________________________________________________________
# React Hook Form

React Hook Form é uma biblioteca popular para gerenciar formulários em aplicações React. Ela se destaca pela performance, facilidade de uso e mínima quantidade de re-renderizações, o que a torna uma escolha eficiente para desenvolvedores. 

### Como Funciona → Conceitos Chave
O React Hook Form gira em torno do hook principal useForm. Este hook retorna métodos e estados que utilizamos para registrar inputs, lidar com a submissão, acessar valores do formulário e gerenciar erros.
- register: Esta função é usada para registrar seus inputs no React Hook Form. Ao registrar um input, conectamos ao sistema de validação e gerenciamento de estado da biblioteca.
- handleSubmit: Esta função envolve sua função de submissão. Ela primeiro executa a validação do formulário e, se tudo estiver correto, chama sua função de callback com os dados do formulário.
- formState: { errors }: O objeto errors contém informações sobre os erros de validação de cada campo.
- watch: Permite observar o valor de um ou mais campos e re-renderizar o componente quando eles mudam.
- control: Um objeto usado para integrar componentes controlados de bibliotecas de UI com o React Hook Form através do componente Controller.
- validação: A validação pode ser configurada diretamente no método register ou através de um resolver que integra esquemas de validação. 

_____________________________________________________________________________________
# Internacionalização
## Next-intl -- i18n

A internacionalização (i18n) em projetos React com Next.js é o processo de adaptar nossa aplicação para suportar múltiplos idiomas e regiões. Isso envolve não apenas a tradução de textos, mas também a formatação de datas, números, moedas e outras especificidades culturais. 

## Principais Abordagens e Bibliotecas
Existem várias bibliotecas e estratégias para implementar i18n em seu projeto Next.js com TypeScript. As mais comuns incluem:

next-i18next --> next-intl
Esta é, provavelmente, a biblioteca mais popular e recomendada para projetos Next.js. Ela se integra perfeitamente com o framework, aproveitando seu sistema de roteamento e funcionalidades de renderização (SSR/SSG/ISR) e tem configurações específicicas para Client e server Components.

### Principais Características:

- Carregamento de traduções no lado do servidor (getServerSideProps, getStaticProps).
- Suporte a namespaces para organizar traduções.
- Integração com i18next e react-i18next.
- Fácil configuração para detecção de idioma e persistência.
- Bom suporte para TypeScript, permitindo tipar suas chaves de tradução.

### Como funciona:

- Configuramos os idiomas suportados e o idioma padrão no next-i18next.config.js.
- Criamos os arquivos de tradução (geralmente JSON) para cada idioma em public/locales/{idioma}/{namespace}.json.
- Usmaos o HOC appWithTranslation no seu _app.tsx e a função serverSideTranslations em suas páginas para carregar as traduções necessárias.
- Utilizamos o hook useTranslation ou o HOC withTranslation nos seus componentes para acessar as funções de tradução (t).

### Algumas observações:
- Estrutura dos Arquivos de Tradução: Mantenha os arquivos de tradução (geralmente JSON) organizados. Uma estrutura comum é `public/locales/{locale}/{namespace}.json`.
- Namespaces: Divida suas traduções em namespaces (ex: common, homePage, userProfile) para carregar apenas o necessário em cada página, otimizando o desempenho.
- Detecção de Idioma: Decida como o idioma do usuário será detectado (header Accept-Language do navegador, preferência salva, path da URL, etc.).
- Seletor de Idioma: Implemente um componente que permita ao usuário mudar o idioma manualmente.
- Conteúdo Além de Texto: Lembre-se de internacionalizar imagens, vídeos ou qualquer conteúdo que possa variar culturalmente.
- Plurais e Gênero: Use as funcionalidades da biblioteca escolhida para lidar corretamente com plurais e variações de gênero.
- Testes: Teste sua aplicação em todos os idiomas suportados.
- A escolha da biblioteca dependerá das necessidades específicas do seu projeto, mas next-intl é geralmente o caminho mais direto e bem integrado para projetos Next.js com TypeScript.