"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Game } from "@/types";

interface GameCarouselProps {
  games: Game[];
  title: string;
}

export default function GameCarousel({ games, title }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-800/80 backdrop-blur border border-dark-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-700 -translate-x-4"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-0.5 snap-x snap-mandatory"
      >
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[260px] snap-start group/card"
          >
            <div className="relative rounded-xl overflow-hidden card-hover card-glow-hover">
              <div className="aspect-[16/10] bg-dark-700 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue backdrop-blur-sm capitalize">
                    {game.category}
                  </span>
                </div>
              </div>
              {game.featured && (
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full brand-gradient text-white">Featured</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent group-hover/card:opacity-0 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm truncate">{game.title}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 truncate">{game.title}</p>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-dark-800/80 backdrop-blur border border-dark-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-700 translate-x-4"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
