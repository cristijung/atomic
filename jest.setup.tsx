// a extensão .jsx pq temos o return no setup
import '@testing-library/jest-dom';

// mock para 'next/navigation' (essencial para o App Router do Next.js)
// componentes que usam hooks como useRouter, usePathname, useSearchParams ou o componente Link
// precisam desses mocks para funcionar nos testes unitários......
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation'); // importa o módulo real para mock parcial
  return {
    ...actual, // p manter outras exportações do módulo real
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }),
    usePathname: () => '/', // retorna um pathname mockado. Pode ser ajustado por teste se necessário.
    useSearchParams: () => new URLSearchParams(), // retorna URLSearchParams mockado.
    Link: jest.fn().mockImplementation((props) => {
      // mock simples para o componente Link que renderiza uma tag <a>       
      // (o import de React não é necessário aqui porque não estamos usando JSX diretamente no corpo da função do mock)
      const { href, children, ...rest } = props;
      return <a href={href?.toString()} {...rest}>{children}</a>;
    }),
  };
});

// p depuração: Confirma que o arquivo foi carregado pelo Jest
console.log('✅ jest.setup.ts carregado com sucesso!');