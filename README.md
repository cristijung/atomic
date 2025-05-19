# Projeto Star Wars
## Estrutura Atomic Design

### Recursos & Tecnologias instalados:
- Nextjs: sem diretório 'src', em 'App Router' e EsLint
- React 19
- Tailwind: estilização somente com este recurso
- React Icons: `npm install react-icons --save`
- Heroicons: `npm install @heroicons/react`
- Jest: `npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest`

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

