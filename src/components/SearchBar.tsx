"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { games } from "@/data/games";
import type { Game } from "@/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = games.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q)) ||
        g.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
    setShow(true);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games, categories, tags..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-dark-800/80 border border-dark-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {show && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass border border-dark-600/50 shadow-2xl shadow-black/40 overflow-hidden z-50 animate-scale-in">
          <div className="p-1">
            {results.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                onClick={() => { setShow(false); setQuery(""); }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-700/50 transition-colors"
              >
                <img src={game.thumbnail} alt={game.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{game.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{game.category} · {game.tags.slice(0, 2).join(", ")}</p>
                </div>
                <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
