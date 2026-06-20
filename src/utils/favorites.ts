"use client";

const FAVORITES_KEY = "gameverse_favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(gameId: number): number[] {
  const favorites = getFavorites();
  const index = favorites.indexOf(gameId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(gameId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(gameId: number): boolean {
  return getFavorites().includes(gameId);
}
