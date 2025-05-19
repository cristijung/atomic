"use client"; 

import React, { createContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { FavoritesContextType } from '../types/interfaces/interfaces'; 

// criar o Contexto com um valor padrão (pode ser null e verificado no hook)
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// criar o Provider Component
interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favId) => favId !== id)
        : [...prevIds, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favoriteIds.includes(id);
    },
    [favoriteIds]
  );

  // 0 valor do contexto que será fornecido aos componentes filhos
  // useMemo para otimizar e evitar recriações desnecessárias do objeto de contexto
  const contextValue = useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}