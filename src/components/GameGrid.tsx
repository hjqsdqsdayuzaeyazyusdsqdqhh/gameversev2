"use client";

import GameCard from "./GameCard";
import type { Game } from "@/types";

interface GameGridProps {
  games: Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4 opacity-30">🎮</div>
        <p className="text-gray-500 text-lg">No games to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} index={i} />
      ))}
    </div>
  );
}
