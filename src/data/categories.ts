export interface Category {
  id: string;
  name: string;
  slug: string;
  label: string;
  icon: string;
  description: string;
  seoDescription: string;
  color: string;
  gradient: string;
}

export const categories: Category[] = [
  {
    id: "racing", name: "Racing", slug: "racing", label: "Racing", icon: "🏎️",
    description: "High-speed racing games for adrenaline junkies",
    seoDescription: "Free online racing games. Play the best car, motorcycle, and hovercraft racing games. Speed, drift, and compete for the fastest lap times.",
    color: "#00d4ff", gradient: "from-cyan-500 via-blue-600 to-indigo-700",
  },
  {
    id: "action", name: "Action", slug: "action", label: "Action", icon: "🎯",
    description: "Thrilling action games packed with excitement",
    seoDescription: "Free online action games. Battle enemies, complete missions, and save the world in our collection of action-packed browser games.",
    color: "#ef4444", gradient: "from-red-500 via-rose-600 to-orange-700",
  },
  {
    id: "puzzle", name: "Puzzle", slug: "puzzle", label: "Puzzle", icon: "🧩",
    description: "Brain-teasing puzzles to challenge your mind",
    seoDescription: "Free online puzzle games. Challenge your brain with logic puzzles, match-3, word games, jigsaw puzzles, and mind-bending challenges.",
    color: "#10b981", gradient: "from-emerald-500 via-green-600 to-teal-700",
  },
  {
    id: "sports", name: "Sports", slug: "sports", label: "Sports", icon: "⚽",
    description: "Sports simulations and arcade sports action",
    seoDescription: "Free online sports games. Play soccer, basketball, tennis, golf, baseball, and more realistic sports simulations in your browser.",
    color: "#f59e0b", gradient: "from-amber-400 via-yellow-500 to-orange-600",
  },
  {
    id: "arcade", name: "Arcade", slug: "arcade", label: "Arcade", icon: "🕹️",
    description: "Classic arcade games with modern twists",
    seoDescription: "Free online arcade games. Relive the classics with modern graphics. Pac-Man, Space Invaders, Tetris, and hundreds more arcade favorites.",
    color: "#7c3aed", gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
  },
  {
    id: "adventure", name: "Adventure", slug: "adventure", label: "Adventure", icon: "🗺️",
    description: "Epic adventures and exploration games",
    seoDescription: "Free online adventure games. Explore mysterious worlds, solve quests, and embark on epic journeys in browser-based adventure games.",
    color: "#06b6d4", gradient: "from-cyan-400 via-teal-500 to-emerald-600",
  },
  {
    id: "shooting", name: "Shooting", slug: "shooting", label: "Shooting", icon: "🔫",
    description: "Action-packed shooting and FPS games",
    seoDescription: "Free online shooting games. Test your aim with FPS shooters, sniper challenges, and action-packed shooting galleries. No download required.",
    color: "#dc2626", gradient: "from-red-600 via-rose-700 to-pink-800",
  },
  {
    id: "strategy", name: "Strategy", slug: "strategy", label: "Strategy", icon: "♟️",
    description: "Strategic thinking and tactical warfare games",
    seoDescription: "Free online strategy games. Build empires, command armies, and outsmart opponents in our collection of strategy and tactics browser games.",
    color: "#8b5cf6", gradient: "from-indigo-500 via-violet-600 to-purple-700",
  },
  {
    id: "simulation", name: "Simulation", slug: "simulation", label: "Simulation", icon: "🏙️",
    description: "Realistic simulation and management games",
    seoDescription: "Free online simulation games. Build cities, manage farms, fly planes, and experience realistic simulations right in your browser.",
    color: "#14b8a6", gradient: "from-teal-400 via-cyan-500 to-blue-600",
  },
  {
    id: "horror", name: "Horror", slug: "horror", label: "Horror", icon: "👻",
    description: "Spooky horror and thriller games",
    seoDescription: "Free online horror games. Face your fears with scary browser games featuring zombies, ghosts, monsters, and spine-chilling atmospheres.",
    color: "#6b21a8", gradient: "from-purple-700 via-fuchsia-800 to-pink-900",
  },
  {
    id: "fighting", name: "Fighting", slug: "fighting", label: "Fighting", icon: "🥊",
    description: "Head-to-head combat and fighting games",
    seoDescription: "Free online fighting games. Battle opponents in intense hand-to-hand combat, martial arts tournaments, and epic boss fights.",
    color: "#e11d48", gradient: "from-rose-500 via-pink-600 to-red-700",
  },
  {
    id: "platformer", name: "Platformer", slug: "platformer", label: "Platformer", icon: "🏃",
    description: "Jump-and-run platforming adventures",
    seoDescription: "Free online platformer games. Run, jump, and dash through colorful levels in our collection of platforming adventures for all skill levels.",
    color: "#0ea5e9", gradient: "from-sky-400 via-blue-500 to-indigo-600",
  },
  {
    id: "rpg", name: "RPG", slug: "rpg", label: "RPG", icon: "⚔️",
    description: "Role-playing games with deep progression",
    seoDescription: "Free online RPG games. Level up your character, complete quests, and explore fantasy worlds in browser-based role-playing games.",
    color: "#d946ef", gradient: "from-fuchsia-400 via-purple-500 to-violet-600",
  },
  {
    id: "music", name: "Music", slug: "music", label: "Music", icon: "🎵",
    description: "Rhythm and music-based games",
    seoDescription: "Free online music games. Tap to the beat, create melodies, and enjoy rhythm-based gameplay with our collection of music games.",
    color: "#f43f5e", gradient: "from-rose-400 via-pink-500 to-red-600",
  },
  {
    id: "educational", name: "Educational", slug: "educational", label: "Educational", icon: "📚",
    description: "Fun learning games for all ages",
    seoDescription: "Free online educational games. Learn while you play with math games, word puzzles, science challenges, and geography quizzes.",
    color: "#22c55e", gradient: "from-green-400 via-emerald-500 to-teal-600",
  },
  {
    id: "card", name: "Card", slug: "card", label: "Card", icon: "🃏",
    description: "Classic card games and solitaire",
    seoDescription: "Free online card games. Play solitaire, poker, blackjack, and classic card games. No download needed, just shuffle and deal.",
    color: "#a855f7", gradient: "from-purple-400 via-violet-500 to-indigo-600",
  },
  {
    id: "board", name: "Board", slug: "board", label: "Board", icon: "🎲",
    description: "Digital board games for everyone",
    seoDescription: "Free online board games. Play chess, checkers, backgammon, and classic board games against AI or friends in your browser.",
    color: "#ef4444", gradient: "from-orange-400 via-red-500 to-rose-600",
  },
  {
    id: "casual", name: "Casual", slug: "casual", label: "Casual", icon: "☕",
    description: "Relaxing casual games to unwind",
    seoDescription: "Free online casual games. Relax and unwind with easy-to-learn casual games perfect for short breaks and quick gaming sessions.",
    color: "#34d399", gradient: "from-emerald-300 via-green-400 to-teal-500",
  },
  {
    id: "multiplayer", name: "Multiplayer", slug: "multiplayer", label: "Multiplayer", icon: "👥",
    description: "Play with friends online",
    seoDescription: "Free online multiplayer games. Compete against players worldwide in real-time multiplayer browser games. No download required.",
    color: "#60a5fa", gradient: "from-blue-300 via-indigo-400 to-violet-500",
  },
  {
    id: "io", name: "IO Games", slug: "io", label: "IO Games", icon: "🌐",
    description: "Popular .io browser games",
    seoDescription: "Free online .io games. Play the most popular io games including Agar.io, Slither.io, and thousands of other addictive multiplayer io games.",
    color: "#2dd4bf", gradient: "from-teal-300 via-cyan-400 to-blue-500",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const categoryMap = new Map(categories.map((c) => [c.slug, c]));
