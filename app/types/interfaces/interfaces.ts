export interface TitleHeaderProps {
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
  favoriteIds: string[]; // array de IDs das imagens favoritadas
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;  
}