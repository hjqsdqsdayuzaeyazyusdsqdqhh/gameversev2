"use client";

const RECENT_KEY = "gameverse_recent";

export interface RecentGame {
  id: number;
  title: string;
  thumbnail: string;
  slug: string;
  category: string;
}

export function getRecentlyPlayed(): RecentGame[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentlyPlayed(game: RecentGame): void {
  const recent = getRecentlyPlayed();
  const filtered = recent.filter((g) => g.id !== game.id);
  filtered.unshift(game);
  if (filtered.length > 10) filtered.pop();
  localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
}
