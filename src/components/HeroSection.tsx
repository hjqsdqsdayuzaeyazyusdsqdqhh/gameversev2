"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { games } from "@/data/games";
import type { Game } from "@/types";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length < 2) { setResults([]); setShowResults(false); return; }
    const q = value.toLowerCase();
    setResults(
      games.filter((g) => g.title.toLowerCase().includes(q) || g.tags.some((t) => t.toLowerCase().includes(q))).slice(0, 6)
    );
    setShowResults(true);
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-transparent" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {mounted && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-sm text-neon-blue font-medium">100+ Free Games — Play Instantly</span>
            </div>
          )}

          <h1 className={`text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[1.05] mb-6 tracking-tight ${mounted ? "animate-fade-in-up" : ""}`} style={mounted ? { animationDelay: "0.1s" } : undefined}>
            <span className="text-gradient">Play The Best</span>
            <br />
            <span className="text-white">Browser Games</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-gray-500 font-medium block mt-2">For Free</span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed ${mounted ? "animate-fade-in-up" : ""}`} style={mounted ? { animationDelay: "0.2s" } : undefined}>
            Discover thousands of free HTML5 games. No downloads, no sign-ups — just click and play in your browser.
          </p>

          <div className={`relative max-w-xl mx-auto mb-10 ${mounted ? "animate-fade-in-up" : ""}`} style={mounted ? { animationDelay: "0.3s" } : undefined}>
            <div className="relative">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search any game..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-dark-800/80 backdrop-blur border border-dark-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 text-lg transition-all shadow-xl shadow-black/20"
              />
            </div>

            {showResults && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass border border-dark-600/50 shadow-2xl shadow-black/40 overflow-hidden z-20 animate-scale-in">
                {results.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    onClick={() => { setShowResults(false); setQuery(""); }}
                    className="flex items-center gap-4 p-3.5 hover:bg-dark-700/50 transition-colors"
                  >
                    <img src={game.thumbnail} alt={game.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" loading="lazy" />
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{game.title}</p>
                      <p className="text-xs text-gray-400 capitalize">{game.category} · {game.tags.slice(0, 2).join(", ")}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={`flex items-center justify-center gap-4 flex-wrap ${mounted ? "animate-fade-in-up" : ""}`} style={mounted ? { animationDelay: "0.4s" } : undefined}>
            <Link href="/games" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              Browse All Games
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link href="/category/arcade" className="btn-secondary text-base px-10 py-4">
              Arcade Classics
            </Link>
          </div>

          <div className={`mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 ${mounted ? "animate-fade-in" : ""}`} style={mounted ? { animationDelay: "0.5s" } : undefined}>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              No Download
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Instant Play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
