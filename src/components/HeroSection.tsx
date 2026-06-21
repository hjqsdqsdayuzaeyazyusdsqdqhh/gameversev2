"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { games } from "@/data/games";
import type { Game } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY((e.clientY / window.innerHeight) * 0.05);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <section ref={containerRef} className="relative overflow-hidden min-h-[85vh] flex items-center">
      <motion.div
        className="absolute inset-0"
        style={{ y: mouseY * -50 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-transparent" />
        <div className="absolute inset-0 bg-grid" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px]"
          animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient" />
      </motion.div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
            </span>
            <span className="text-sm text-neon-blue font-medium">100+ Free Games — Play Instantly</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[1.05] mb-6 tracking-tight"
          >
            <span className="text-gradient">Play The Best</span>
            <br />
            <span className="text-white">Browser Games</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-gray-500 font-medium block mt-2">For Free</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Discover thousands of free HTML5 games. No downloads, no sign-ups — just click and play in your browser.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative max-w-xl mx-auto mb-10"
          >
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
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass border border-dark-600/50 shadow-2xl shadow-black/40 overflow-hidden z-20"
              >
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
              </motion.div>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/games" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2 group">
              Browse All Games
              <motion.svg
                className="w-5 h-5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Link>
            <Link href="/category/arcade" className="btn-secondary text-base px-10 py-4">
              Arcade Classics
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            {[
              { icon: "M5 13l4 4L19 7", color: "text-neon-green", text: "No Download" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "text-neon-blue", text: "Free Forever" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "text-neon-purple", text: "Instant Play" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg className={`w-4 h-4 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.text}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
