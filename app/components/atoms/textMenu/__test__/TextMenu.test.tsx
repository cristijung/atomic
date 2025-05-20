import React from 'react';
import { render, screen } from '@testing-library/react';
import TextMenu from '../TextMenu'; 

describe('TextMenu Component (Ajustado)', () => {
  const defaultProps = {
    texto: 'Menu Link Teste',
    href: '/pagina-teste', 
  };

  test('deve renderizar o texto e o link com o href correto', () => {
    render(<TextMenu {...defaultProps} />);

    const textoElement = screen.getByText(defaultProps.texto);
    expect(textoElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: new RegExp(defaultProps.texto, 'i') });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', defaultProps.href);
  });

  test('deve renderizar o ícone quando iconElement é fornecido', () => {
    const MockIcon = () => <svg data-testid="mock-icon" width="20" height="20"><path d="M0 0h20v20H0z" /></svg>;

    render(
      <TextMenu
        {...defaultProps}
        iconElement={<MockIcon />}
      />
    );

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();

    expect(screen.getByText(defaultProps.texto)).toBeInTheDocument();
  });

  test('não deve renderizar o ícone quando iconElement não é fornecido', () => {
    // p este teste, vamos garantir q o mock-icon não está presente
    render(<TextMenu {...defaultProps} iconElement={undefined} />);

    expect(screen.getByText(defaultProps.texto)).toBeInTheDocument();

    const iconElement = screen.queryByTestId('mock-icon');
    expect(iconElement).not.toBeInTheDocument();
  });

  test('deve passar outras LinkProps (como target e rel) para o componente Link subjacente', () => {   
    render(
      <TextMenu
        {...defaultProps}
        // target="_blank"  -- removi do teste, pq o Ts indica q, ao tentar usar o componente TextMenu passando a propriedade target, o Ts não reconhece target como uma propriedade válida para TextLinksProps.
        // rel="noopener noreferrer" --mesmo neste caso, mesmo refatorando o textMenu
        // podemos adicionar outras props válidas do NextLinkProps aqui para testar
        // exemplo: scroll={false}
      />
    );

    const linkElement = screen.getByRole('link', { name: new RegExp(defaultProps.texto, 'i') });
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    // se foi adicionado scroll={false}:
    // expect(linkElement).toHaveAttribute('scroll', 'false'); // atributos HTML são strings
  });
});