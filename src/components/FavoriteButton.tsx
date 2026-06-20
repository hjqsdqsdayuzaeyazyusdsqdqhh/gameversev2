"use client";

import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "@/utils/favorites";

export default function FavoriteButton({ gameId }: { gameId: number }) {
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    setFaved(getFavorites().includes(gameId));
  }, [gameId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFaves = toggleFavorite(gameId);
    setFaved(newFaves.includes(gameId));
  };

  return (
    <button
      onClick={handleClick}
      className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
      aria-label={faved ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`w-4 h-4 transition-colors ${faved ? "text-neon-pink fill-neon-pink" : "text-white"}`}
        viewBox="0 0 24 24"
        fill={faved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );
}
