"use client";

import Link from "next/link";

interface CategoryCardProps {
  name: string;
  label: string;
  icon: string;
  description: string;
  count: number;
  index: number;
}

const gradients: Record<string, string> = {
  racing: "from-cyan-500 via-blue-600 to-indigo-700",
  action: "from-red-500 via-rose-600 to-orange-700",
  puzzle: "from-emerald-500 via-green-600 to-teal-700",
  sports: "from-amber-400 via-yellow-500 to-orange-600",
  arcade: "from-violet-500 via-purple-600 to-fuchsia-700",
  adventure: "from-cyan-400 via-teal-500 to-emerald-600",
  shooting: "from-red-600 via-rose-700 to-pink-800",
  strategy: "from-indigo-500 via-violet-600 to-purple-700",
  simulation: "from-teal-400 via-cyan-500 to-blue-600",
  horror: "from-purple-700 via-fuchsia-800 to-pink-900",
  fighting: "from-rose-500 via-pink-600 to-red-700",
  platformer: "from-sky-400 via-blue-500 to-indigo-600",
  rpg: "from-fuchsia-400 via-purple-500 to-violet-600",
  music: "from-rose-400 via-pink-500 to-red-600",
  educational: "from-green-400 via-emerald-500 to-teal-600",
  card: "from-purple-400 via-violet-500 to-indigo-600",
  board: "from-orange-400 via-red-500 to-rose-600",
  casual: "from-emerald-300 via-green-400 to-teal-500",
  multiplayer: "from-blue-300 via-indigo-400 to-violet-500",
  io: "from-teal-300 via-cyan-400 to-blue-500",
};

const icons: Record<string, string> = {
  racing: "🏎️",
  action: "🎯",
  puzzle: "🧩",
  sports: "⚽",
  arcade: "🕹️",
  adventure: "🗺️",
  shooting: "🔫",
  strategy: "♟️",
  simulation: "🏙️",
  horror: "👻",
  fighting: "🥊",
  platformer: "🏃",
  rpg: "⚔️",
  music: "🎵",
  educational: "📚",
  card: "🃏",
  board: "🎲",
  casual: "☕",
  multiplayer: "👥",
  io: "🌐",
};

export default function CategoryCard({ name, label, description, count, index }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${name}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative p-6 rounded-2xl overflow-hidden card-hover">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[name] || "from-neon-blue to-neon-purple"} opacity-90`} />
        <div className="absolute inset-0 bg-dark-900/20" />

        <div className="relative z-10">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300 origin-left">
            {icons[name] || icon}
          </span>
          <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
          <p className="text-sm text-white/70 mb-3 line-clamp-2">{description}</p>
          <div className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {count} games
          </div>
        </div>

        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full group-hover:scale-[3] transition-transform duration-700" />
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/5 rounded-full group-hover:scale-[4] transition-transform duration-700 delay-100" />
      </div>
    </Link>
  );
}
