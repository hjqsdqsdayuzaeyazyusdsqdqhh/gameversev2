"use client";

import { useState, useMemo, useEffect } from "react";
import GameCard from "@/components/GameCard";
import GameGrid from "@/components/GameGrid";
import SectionHeader from "@/components/SectionHeader";
import AdSlot from "@/components/AdSlot";
import { GridSkeleton } from "@/components/GameSkeleton";
import { games } from "@/data/games";
import { categories, type Category } from "@/types";

export default function GamesPage() {
  useEffect(() => { document.title = "All Games | GameVerse"; }, []);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<"default" | "title" | "category">("default");
  const [visible, setVisible] = useState(30);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let result = [...games];
    if (selectedCategory !== "all") result = result.filter((g) => g.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case "title": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "category": result.sort((a, b) => a.category.localeCompare(b.category)); break;
    }
    return result;
  }, [selectedCategory, sortBy, search]);

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    games.forEach((g) => { counts[g.category] = (counts[g.category] || 0) + 1; });
    return counts;
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible((v) => v + 30); setLoading(false); }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeader
        title="Browse All"
        highlight="Games"
        description={`${games.length} free browser games to play instantly`}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Categories</h3>
              <div className="flex lg:flex-col flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCategory("all"); setVisible(30); }}
                  className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                    selectedCategory === "all"
                      ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/30"
                      : "text-gray-400 hover:text-white hover:bg-dark-800 border border-transparent"
                  }`}
                >
                  All Games <span className="text-xs opacity-60">({games.length})</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => { setSelectedCategory(cat.name); setVisible(30); }}
                    className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                      selectedCategory === cat.name
                        ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/30"
                        : "text-gray-400 hover:text-white hover:bg-dark-800 border border-transparent"
                    }`}
                  >
                    {cat.icon} {cat.label} <span className="text-xs opacity-60">({categoryCounts[cat.name] || 0})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisible(30); }}
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/80 border border-dark-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "title" | "category")}
              className="px-4 py-2.5 rounded-xl bg-dark-800/80 border border-dark-600/50 text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="title">Sort: Title A-Z</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="text-white">{displayed.length}</span> of <span className="text-white">{filtered.length}</span> games
            </p>
          </div>

          <AdSlot position="between" />

          {displayed.length > 0 ? (
            <GameGrid games={displayed} />
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4 opacity-20">🎮</div>
              <p className="text-gray-500 text-lg mb-2">No games found</p>
              <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
            </div>
          )}

          {loading && <GridSkeleton count={12} />}

          {hasMore && !loading && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="btn-secondary px-10 py-3 inline-flex items-center gap-2"
              >
                Load More Games
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
