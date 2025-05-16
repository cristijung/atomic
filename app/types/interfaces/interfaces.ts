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