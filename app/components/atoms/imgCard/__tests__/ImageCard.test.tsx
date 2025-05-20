
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImagemCard } from '../ImageCard'; 
import { ImageItem } from '../../../../types/interfaces/interfaces'; 

// mock para o hook useFavorites
// mantemos as funções mockadas fora do jest.mock para poder limpá-las e configurá-las por teste
const mockIsFavorite = jest.fn();
const mockToggleFavorite = jest.fn();

jest.mock('../../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  }),
}));

// mock para next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />; // renderiza uma tag <img> simples para o teste
  },
}));

describe('ImagemCard Component', () => {
  const mockItem: ImageItem = {
    id: '1',
    url: 'https://example.com/image.jpg',
    title: 'Imagem de Exemplo',
    description: 'Esta é uma descrição de exemplo.',
    width: 400, // fornecendo width para testar o comportamento do componente
  };

  const mockItemSemDescricao: ImageItem = {
    id: '2',
    url: 'https://example.com/image2.jpg',
    title: 'Outra Imagem',
    width: 350,
  };

  beforeEach(() => {
    // limpa todos os mocks antes de cada teste
    mockIsFavorite.mockClear();
    mockToggleFavorite.mockClear();
  });

  test('deve renderizar corretamente as informações do item e o botão "Adicionar aos Favoritos"', () => {
    mockIsFavorite.mockReturnValue(false); // item não é favorito

    render(<ImagemCard item={mockItem} />);

    // verifica a imagem
    const image = screen.getByAltText(mockItem.title) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockItem.url);
    expect(image.width).toBe(mockItem.width); // width={item.width || 300} - testa a lógica
    expect(image.height).toBe(mockItem.width); // height={item.width || 200} - conforme lógica do componente

    // verifica o título
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();

    // verifica a descrição
    expect(screen.getByText(mockItem.description!)).toBeInTheDocument();

    // verifica o botão de favorito
    const favoriteButton = screen.getByRole('button', { name: /adicionar aos favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
    // verifica uma das classes que indicam o estado "não favorito"
    expect(favoriteButton).toHaveClass('bg-gray-200');
  });

  test('deve renderizar corretamente o botão "Remover dos Favoritos" se o item for favorito', () => {
    mockIsFavorite.mockReturnValue(true); // item é favorito

    render(<ImagemCard item={mockItem} />);

    // verifica o botão de favorito
    const favoriteButton = screen.getByRole('button', { name: /remover dos favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
    // verifica uma das classes que indicam o estado "favorito" ...
    expect(favoriteButton).toHaveClass('bg-red-500');
  });

  test('deve chamar toggleFavorite com o ID correto ao clicar no botão "Adicionar aos Favoritos"', async () => {
    const user = userEvent.setup();
    mockIsFavorite.mockReturnValue(false); // item não é favorito

    render(<ImagemCard item={mockItem} />);

    const favoriteButton = screen.getByRole('button', { name: /adicionar aos favoritos/i });
    await user.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockItem.id);
  });

  test('deve chamar toggleFavorite com o ID correto ao clicar no botão "Remover dos Favoritos"', async () => {
    const user = userEvent.setup();
    mockIsFavorite.mockReturnValue(true); // item é favorito

    render(<ImagemCard item={mockItem} />);

    const favoriteButton = screen.getByRole('button', { name: /remover dos favoritos/i });
    await user.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockItem.id);
  });

  test('não deve renderizar a descrição se ela não for fornecida', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<ImagemCard item={mockItemSemDescricao} />);

    // verifica o título (para garantir que o resto renderizou)
    expect(screen.getByText(mockItemSemDescricao.title)).toBeInTheDocument();

    // verifica q a descrição não está presente
    // se o <p> da descrição não renderizar, getByText para uma descrição vazia falharia.
    // a forma mais segura é queryByText, que retorna null se não encontrar...
    expect(screen.queryByText(/.+/)).not.toBeNull(); // garante que há algum texto (título, btn)
    // assumindo q não há outras tags <p> com texto além da descrição no componente
    // ou q a descrição é o único texto que poderia ser nulo.
    // SE mockItemSemDescricao.description fosse uma string vazia, o teste seria diferente.
    // como é undefined, o <p> não deve ser renderizado.
    // vamos procurar por um <p> q seria o da descrição e esperar q não exista.
    // uma forma é verificar se o parágrafo que 'conteria' a descrição não existe.
    // SE não há descrição, o elemento <p> da descrição não é renderizado.
    // a melhor maneira de verificar a ausência de um elemento é `queryBy...` e `toBeNull()`
    // ou `not.toBeInTheDocument()`.
    const descriptionElement = screen.queryByText(mockItem.description!); // usando uma descrição q existiria
    expect(descriptionElement).not.toBeInTheDocument();
  });

  test('deve usar fallback para width e height da imagem se item.width não for fornecido', () => {
    mockIsFavorite.mockReturnValue(false);
    const itemSemWidth: ImageItem = {
      id: '3',
      url: 'https://example.com/image3.jpg',
      title: 'Imagem Sem Width',
    };
    render(<ImagemCard item={itemSemWidth} />);

    const image = screen.getByAltText(itemSemWidth.title) as HTMLImageElement;
    expect(image.width).toBe(300); // um fallback width={item.width || 300}
    expect(image.height).toBe(200); // um fallback height={item.width || 200}
  });
});