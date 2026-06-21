"use client";

import Link from "next/link";
import type { Game } from "@/types";
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      layout
    >
      <Link href={`/games/${game.slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl glass border border-dark-600/40 transition-all duration-300"
          whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0, 200, 255, 0.15)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            <motion.div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-neon-blue/90 backdrop-blur flex items-center justify-center"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          <div className="p-3.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-white truncate flex-1 group-hover:text-neon-blue transition-colors">
                {game.title}
              </h3>
              <span className="text-[10px] font-medium text-neon-green/80 bg-neon-green/10 px-2 py-0.5 rounded-full flex-shrink-0">
                FREE
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 capitalize">{game.category}</p>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            whileHover={{ boxShadow: "inset 0 0 30px rgba(0, 200, 255, 0.1)" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
