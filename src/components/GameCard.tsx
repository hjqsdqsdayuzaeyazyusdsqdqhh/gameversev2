"use client";

import Link from "next/link";
import { Game } from "@/types";
import FavoriteButton from "./FavoriteButton";

interface GameCardProps {
  game: Game;
  index?: number;
}

const categoryColors: Record<string, string> = {
  racing: "from-cyan-500/20 to-blue-600/20 border-cyan-500/30",
  action: "from-red-500/20 to-orange-600/20 border-red-500/30",
  puzzle: "from-emerald-500/20 to-green-600/20 border-emerald-500/30",
  sports: "from-amber-500/20 to-yellow-600/20 border-amber-500/30",
  arcade: "from-violet-500/20 to-purple-600/20 border-violet-500/30",
  adventure: "from-cyan-400/20 to-teal-500/20 border-teal-500/30",
  shooting: "from-red-600/20 to-rose-700/20 border-red-600/30",
  strategy: "from-indigo-500/20 to-violet-600/20 border-violet-500/30",
  simulation: "from-teal-400/20 to-cyan-500/20 border-teal-400/30",
  horror: "from-purple-700/20 to-fuchsia-800/20 border-purple-600/30",
  fighting: "from-rose-500/20 to-pink-600/20 border-rose-500/30",
  platformer: "from-sky-400/20 to-blue-500/20 border-sky-400/30",
  rpg: "from-fuchsia-400/20 to-purple-500/20 border-purple-400/30",
  music: "from-rose-400/20 to-pink-500/20 border-rose-400/30",
  educational: "from-green-400/20 to-emerald-500/20 border-green-400/30",
  card: "from-purple-400/20 to-violet-500/20 border-purple-400/30",
  board: "from-orange-400/20 to-red-500/20 border-orange-400/30",
  casual: "from-emerald-300/20 to-green-400/20 border-emerald-300/30",
  multiplayer: "from-blue-300/20 to-indigo-400/20 border-blue-300/30",
  io: "from-teal-300/20 to-cyan-400/20 border-teal-300/30",
};

export default function GameCard({ game, index = 0 }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${(index % 12) * 50}ms` }}
    >
      <div className="relative rounded-2xl overflow-hidden card-hover card-glow-hover glass-card">
        <div className="aspect-[16/10] bg-dark-800 overflow-hidden">
          <img
            src={game.thumbnail}
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColors[game.category] || "from-neon-blue/20 to-neon-purple/20 border-neon-blue/30"} border text-white capitalize backdrop-blur-sm`}>
                {game.category}
              </span>
              <FavoriteButton gameId={game.id} />
            </div>
          </div>
        </div>

        {game.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full brand-gradient text-white shadow-lg shadow-neon-blue/30">
              Featured
            </span>
          </div>
        )}

        {game.trending && !game.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/30 backdrop-blur-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" /></svg>
              Trending
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-sm truncate drop-shadow-lg">{game.title}</h3>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-semibold text-sm truncate text-white/90 group-hover:text-neon-blue transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500 capitalize">{game.category}</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">{game.tags.slice(0, 1).join(", ")}</span>
        </div>
      </div>
    </Link>
  );
}
