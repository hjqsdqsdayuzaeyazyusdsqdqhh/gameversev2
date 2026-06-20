"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import SectionHeader from "@/components/SectionHeader";
import { getGamesByTag, getAllTags } from "@/data/games";
import { categories } from "@/data/games";

export default function TagPage() {
  const params = useParams();
  const tag = params.tag as string;
  const tagGames = getGamesByTag(tag);
  const allTags = getAllTags();

  useEffect(() => { document.title = `Games tagged "${tag}" | GameVerse`; }, [tag]);

  if (tagGames.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-8xl mb-6 opacity-20">🏷️</div>
        <h1 className="text-3xl font-bold mb-3">Tag Not Found</h1>
        <p className="text-gray-400 mb-8">No games found with the tag &ldquo;{tag}&rdquo;.</p>
        <Link href="/games" className="btn-primary px-8 py-3">Browse All Games</Link>
      </div>
    );
  }

  const relatedTags = allTags.filter((t) => t !== tag).slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto scrollbar-hide">
        <Link href="/" className="hover:text-neon-blue transition-colors whitespace-nowrap">Home</Link>
        <span className="text-gray-700">/</span>
        <Link href="/games" className="hover:text-neon-blue transition-colors whitespace-nowrap">Games</Link>
        <span className="text-gray-700">/</span>
        <span className="text-white capitalize whitespace-nowrap">Tag: {tag}</span>
      </nav>

      <SectionHeader
        title={`"${tag}"`}
        highlight="Games tagged"
        description={`${tagGames.length} games available with this tag`}
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.slice(0, 30).map((t) => (
          <Link
            key={t}
            href={`/tag/${t}`}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              t === tag
                ? "bg-neon-blue/10 text-neon-blue border-neon-blue/30"
                : "bg-dark-800 text-gray-400 border-dark-600 hover:border-neon-blue/30 hover:text-neon-blue"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
        {tagGames.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-dark-700/50">
        <h2 className="text-lg font-semibold mb-5">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const count = tagGames.filter((g) => g.category === cat.name).length;
            if (count === 0) return null;
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

      <div className="mt-10 pt-8 border-t border-dark-700/50">
        <h2 className="text-lg font-semibold mb-5">Related Tags</h2>
        <div className="flex flex-wrap gap-2">
          {relatedTags.map((t) => (
            <Link
              key={t}
              href={`/tag/${t}`}
              className="text-sm px-4 py-2 rounded-xl bg-dark-800 border border-dark-600 text-gray-400 hover:border-neon-blue/30 hover:text-neon-blue transition-all"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
