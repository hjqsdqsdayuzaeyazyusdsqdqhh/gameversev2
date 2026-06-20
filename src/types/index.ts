export interface Game {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  category: Category;
  tags: string[];
  featured: boolean;
  trending: boolean;
  iframe_url: string;
  controls: string;
  how_to_play: string;
}

export type Category =
  | "racing" | "action" | "puzzle" | "sports" | "arcade"
  | "adventure" | "shooting" | "strategy" | "simulation" | "horror"
  | "fighting" | "platformer" | "rpg" | "music" | "educational"
  | "card" | "board" | "casual" | "multiplayer" | "io";

export const categories: { name: Category; label: string; icon: string }[] = [
  { name: "racing", label: "Racing", icon: "🏎️" },
  { name: "action", label: "Action", icon: "🎯" },
  { name: "puzzle", label: "Puzzle", icon: "🧩" },
  { name: "sports", label: "Sports", icon: "⚽" },
  { name: "arcade", label: "Arcade", icon: "🕹️" },
  { name: "adventure", label: "Adventure", icon: "🗺️" },
  { name: "shooting", label: "Shooting", icon: "🔫" },
  { name: "strategy", label: "Strategy", icon: "♟️" },
  { name: "simulation", label: "Simulation", icon: "🏙️" },
  { name: "horror", label: "Horror", icon: "👻" },
  { name: "fighting", label: "Fighting", icon: "🥊" },
  { name: "platformer", label: "Platformer", icon: "🏃" },
  { name: "rpg", label: "RPG", icon: "⚔️" },
  { name: "music", label: "Music", icon: "🎵" },
  { name: "educational", label: "Educational", icon: "📚" },
  { name: "card", label: "Card", icon: "🃏" },
  { name: "board", label: "Board", icon: "🎲" },
  { name: "casual", label: "Casual", icon: "☕" },
  { name: "multiplayer", label: "Multiplayer", icon: "👥" },
  { name: "io", label: "IO Games", icon: "🌐" },
];
