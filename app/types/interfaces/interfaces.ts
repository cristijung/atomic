export interface TitleHeaderProps {
import { CardInfoProps } from '..';
  title: string;
  subtitle?: string; 
  titleClassName?: string; 
  subtitleClassName?: string; 
  containerClassName?: string; 
}

export interface PrecosProdutoProps {
  id: number | string;
  preco: number;
  precoDesconto: number;
}

export interface CardImageProps {
  id?: string;
  url: string;
  textAlt: string;
}

// interface p cada item de imagem/card
export interface ImageItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  width?: number;
  height?: number;
}

// interface p o valor do nosso Contexto de Favoritos
export interface FavoritesContextType {
  favoriteIds: string[]; 
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;  
}

export interface CardInfoProps {
  titulo: string;
  subtitulo?: string;
  descricao: string;
  informacaoAdicional: string;
}