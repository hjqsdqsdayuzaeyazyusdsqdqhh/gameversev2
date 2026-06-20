"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import SectionHeader from "@/components/SectionHeader";
import { categories } from "@/types";
import { getGamesByCategory } from "@/data/games";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryInfo = categories.find((c) => c.name === categorySlug);
  const categoryGames = getGamesByCategory(categorySlug);

  useEffect(() => {
    if (categoryInfo) {
      document.title = `${categoryInfo.label} Games | GameVerse`;
    }
  }, [categoryInfo]);

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-8xl mb-6 opacity-20">🔍</div>
        <h1 className="text-3xl font-bold mb-3">Category Not Found</h1>
        <p className="text-gray-400 mb-8">The category you are looking for does not exist.</p>
        <Link href="/games" className="btn-primary px-8 py-3">Browse All Games</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto scrollbar-hide">
        <Link href="/" className="hover:text-neon-blue transition-colors whitespace-nowrap">Home</Link>
        <span className="text-gray-700">/</span>
        <Link href="/games" className="hover:text-neon-blue transition-colors whitespace-nowrap">Games</Link>
        <span className="text-gray-700">/</span>
        <span className="text-white capitalize whitespace-nowrap">{categoryInfo.label}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-5 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/20 flex items-center justify-center text-3xl">
            {categoryInfo.icon}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-gradient">{categoryInfo.label}</span> Games
            </h1>
            <p className="text-gray-400 mt-1">{categoryInfo.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
            {categoryGames.length} games
          </span>
          <span className="text-sm text-gray-500">Play free online</span>
        </div>
      </div>

      {categoryGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {categoryGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4 opacity-20">🎮</div>
          <p className="text-gray-500 text-lg">No games in this category yet</p>
        </div>
      )}

      <div className="mt-16 pt-10 border-t border-dark-700/50">
        <h2 className="text-lg font-semibold mb-5">Browse Other Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories
            .filter((c) => c.name !== categorySlug)
            .map((cat) => {
              const count = getGamesByCategory(cat.name).length;
              return (
                <Link
                  key={cat.name}
                  href={`/category/${cat.name}`}
                  className="glass-card rounded-2xl p-4 text-center hover:border-neon-blue/30 transition-all group"
                >
                  <span className="text-2xl block mb-1">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-neon-blue transition-colors">{cat.label}</span>
                  <span className="text-xs text-gray-500 block mt-0.5">{count} games</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
