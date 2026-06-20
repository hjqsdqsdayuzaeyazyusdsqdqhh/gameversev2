"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import GameGrid from "@/components/GameGrid";
import SectionHeader from "@/components/SectionHeader";
import AdSlot from "@/components/AdSlot";
import { games, categories } from "@/data/games";
import type { Category } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [category, setCategory] = useState<"all" | string>("all");
  const [sort, setSort] = useState<"relevance" | "title" | "category">("relevance");
  const [visible, setVisible] = useState(30);

  useEffect(() => {
    setQuery(queryParam);
    setVisible(30);
    document.title = queryParam ? `Search: ${queryParam} | GameVerse` : "Search Games | GameVerse";
  }, [queryParam]);

  const results = useMemo(() => {
    let result = [...games];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)) ||
          g.category.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((g) => g.category === category);
    }

    switch (sort) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [query, category, sort]);

  const displayed = results.slice(0, visible);
  const hasMore = visible < results.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeader
        title="Search"
        highlight="Games"
        description={query ? `Results for "${query}"` : "Find your next favorite game"}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(30); }}
            placeholder="Search 1000+ games..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-800/80 border border-dark-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors text-lg"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setVisible(30); }}
          className="px-4 py-3 rounded-xl bg-dark-800/80 border border-dark-600/50 text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>{cat.icon} {cat.label}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="px-4 py-3 rounded-xl bg-dark-800/80 border border-dark-600/50 text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
        >
          <option value="relevance">Relevance</option>
          <option value="title">Title A-Z</option>
          <option value="category">Category</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {results.length === 0
          ? "No games found"
          : `Found ${results.length} game${results.length !== 1 ? "s" : ""}`
        }
      </p>

      {query && !queryParam && (
        <p className="text-xs text-gray-600 mb-4">
          Press Enter or use the search in the navbar for full results
        </p>
      )}

      <AdSlot position="between" />

      {displayed.length > 0 ? (
        <GameGrid games={displayed} />
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4 opacity-20">🔍</div>
          <p className="text-gray-500 text-lg mb-2">No games found for &ldquo;{query}&rdquo;</p>
          <p className="text-gray-600 text-sm mb-6">Try different keywords or browse categories</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name}`}
                className="text-sm px-4 py-2 rounded-xl bg-dark-800 border border-dark-600 text-gray-400 hover:border-neon-blue/30 hover:text-neon-blue transition-all"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisible((v) => v + 30)}
            className="btn-secondary px-10 py-3"
          >
            Load More ({results.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
