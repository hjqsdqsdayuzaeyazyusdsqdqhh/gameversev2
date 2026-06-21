"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Game } from "@/types";
import type { Category } from "@/types";
import { games } from "@/data/games";

interface GameCarouselProps {
  title: string;
  category?: string;
  games?: Game[];
  link?: { href: string; label: string };
  linkComponent?: "category" | "custom";
}

const categories: Category[] = [
  { id: "action", name: "Action", slug: "action", description: "" },
  { id: "adventure", name: "Adventure", slug: "adventure", description: "" },
  { id: "arcade", name: "Arcade", slug: "arcade", description: "" },
  { id: "puzzle", name: "Puzzle", slug: "puzzle", description: "" },
  { id: "casual", name: "Casual", slug: "casual", description: "" },
  { id: "shooting", name: "Shooting", slug: "shooting", description: "" },
  { id: "sports", name: "Sports", slug: "sports", description: "" },
  { id: "strategy", name: "Strategy", slug: "strategy", description: "" },
  { id: "racing", name: "Racing", slug: "racing", description: "" },
  { id: "fighting", name: "Fighting", slug: "fighting", description: "" },
  { id: "horror", name: "Horror", slug: "horror", description: "" },
  { id: "music", name: "Music", slug: "music", description: "" },
  { id: "simulation", name: "Simulation", slug: "simulation", description: "" },
];

export default function GameCarousel({ title, category, games: propGames, link, linkComponent }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const gameList = propGames ?? (category ? games.filter((g) => g.category === category) : games);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => checkScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".carousel-item");
    if (!items.length) return;

    let maxHeight = 0;
    items.forEach((item) => {
      const h = item.getBoundingClientRect().height;
      if (h > maxHeight) maxHeight = h;
    });
    el.style.minHeight = `${maxHeight}px`;
  }, [gameList]);

  return (
    <section className="relative">
      <div className="flex items-end justify-between mb-6">
        <div>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h2>
        </div>
        <div className="flex items-center gap-3">
          {gameList.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className={`p-2 rounded-xl border transition-all ${
                  canScrollLeft
                    ? "border-dark-600/50 text-white hover:bg-dark-700/50 hover:border-neon-blue/30"
                    : "border-dark-700/30 text-gray-600 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
                disabled={!canScrollLeft}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className={`p-2 rounded-xl border transition-all ${
                  canScrollRight
                    ? "border-dark-600/50 text-white hover:bg-dark-700/50 hover:border-neon-blue/30"
                    : "border-dark-700/30 text-gray-600 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
                disabled={!canScrollRight}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          {link && (
            <Link
              href={link.href}
              className="text-sm text-neon-blue hover:text-neon-blue/80 transition-colors inline-flex items-center gap-1"
            >
              {link.label}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {gameList.length === 0 ? (
        <div className="text-center py-12 glass rounded-2xl border border-dark-600/30">
          <p className="text-gray-500">No games found in this category yet.</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 snap-x snap-mandatory"
        >
          {gameList.slice(0, 20).map((game, i) => (
            <motion.div
              key={game.id}
              className="carousel-item flex-shrink-0 w-[185px] sm:w-[200px] snap-start"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <Link href={`/games/${game.slug}`} className="group block">
                <motion.div
                  className="relative overflow-hidden rounded-xl glass border border-dark-600/30 transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 30px rgba(0, 200, 255, 0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <h3 className="text-xs font-semibold text-white truncate drop-shadow-md">
                      {game.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 capitalize truncate">{game.category}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
