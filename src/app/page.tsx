"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import GameGrid from "@/components/GameGrid";
import GameCarousel from "@/components/GameCarousel";
import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import AdSlot from "@/components/AdSlot";
import GameCard from "@/components/GameCard";
import { featuredGames, trendingGames, recentGames, categories } from "@/data/games";
import { getRecentlyPlayed } from "@/utils/recentlyPlayed";
import type { RecentGame } from "@/utils/recentlyPlayed";
import { games } from "@/data/games";

export default function HomePage() {
  const [recentPlayed, setRecentPlayed] = useState<RecentGame[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecentPlayed(getRecentlyPlayed());
  }, []);

  const recentGameObjects = recentPlayed
    .map((r) => games.find((g) => g.id === r.id))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          highlight="Featured"
          title="Games"
          description="Hand-picked selection of the best browser games"
          action={
            <a href="/games" className="text-sm text-neon-blue hover:text-neon-blue/80 transition-colors flex items-center gap-1">
              View all <span aria-hidden="true">→</span>
            </a>
          }
        />
        <GameCarousel games={featuredGames} title="Featured" />
      </section>

      <AdSlot position="between" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          highlight="Trending"
          title="Now"
          description="Most popular games being played right now"
        />
        <GameGrid games={trendingGames} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          highlight="Browse by"
          title="Category"
          description="Find your next favorite game by genre"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              label={cat.label}
              icon={cat.icon}
              description={cat.description}
              count={games.filter((g) => g.category === cat.name).length}
              index={i}
            />
          ))}
        </div>
      </section>

      {mounted && recentGameObjects.length > 0 && (
        <>
          <AdSlot position="between" />
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <SectionHeader
              highlight="Recently"
              title="Played"
              description="Pick up where you left off"
            />
            <GameGrid games={recentGameObjects as any[]} />
          </section>
        </>
      )}

      <AdSlot position="between" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          highlight="Recently"
          title="Added"
          description="Fresh new games added to the collection"
        />
        <GameGrid games={recentGames} />
      </section>

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-pink/5" />
        <div className="absolute inset-0 bg-dots" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient opacity-50" />

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-neon-blue font-medium">100% Free · No Sign-up</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Ready to <span className="text-gradient">Play</span>?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join millions of players worldwide playing free browser games. No downloads, no sign-ups — just click and play.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/games" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              Start Playing Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a href="/category/action" className="btn-secondary text-base px-10 py-4">
              Popular Action Games
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "1000+", label: "Games" },
              { value: "20", label: "Categories" },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient-simple">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
