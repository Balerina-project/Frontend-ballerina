"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (eventId: string) => void;
  removeFromFavorites: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [user]);

  const addToFavorites = (eventId: string) => {
    if (!user) return;
    const newFavorites = [...favorites, eventId];
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (eventId: string) => {
    if (!user) return;
    const newFavorites = favorites.filter((id) => id !== eventId);
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const isFavorite = (eventId: string) => {
    return favorites.includes(eventId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
