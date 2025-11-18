"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Quote } from '@/lib/quotes';

interface FavoritesContextType {
  favoriteIds: Set<string>;
  addFavorite: (quote: Quote) => void;
  removeFavorite: (quoteId: string) => void;
  isFavorite: (quoteId: string) => boolean;
  favorites: Quote[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'k-square-favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites: Quote[] = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
        setFavoriteIds(new Set(parsedFavorites.map(q => q.id)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isMounted]);

  const addFavorite = useCallback((quote: Quote) => {
    setFavorites(prev => {
      if (prev.find(q => q.id === quote.id)) return prev;
      return [...prev, quote];
    });
    setFavoriteIds(prev => new Set(prev).add(quote.id));
  }, []);

  const removeFavorite = useCallback((quoteId: string) => {
    setFavorites(prev => prev.filter(q => q.id !== quoteId));
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(quoteId);
      return newSet;
    });
  }, []);

  const isFavorite = useCallback((quoteId: string) => {
    return favoriteIds.has(quoteId);
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
