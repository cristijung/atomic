"use client"; 

import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext'; 
import { FavoritesContextType } from '../types/interfaces/interfaces'; //aqui separei pq o meu dá erro

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};