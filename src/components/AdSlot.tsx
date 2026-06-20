"use client";

import { useTheme } from "@/components/ThemeContext";

interface AdSlotProps {
  position: "header" | "footer" | "sidebar" | "between" | "game-top" | "game-bottom";
}

export default function AdSlot({ position }: AdSlotProps) {
  const { theme } = useTheme();

  const styles: Record<string, string> = {
    header: "w-full max-w-[728px] h-[90px] mx-auto my-2",
    footer: "w-full max-w-[728px] h-[90px] mx-auto my-2",
    sidebar: "w-[300px] h-[250px] hidden lg:block mx-auto",
    between: "w-full max-w-[728px] h-[90px] mx-auto my-10",
    "game-top": "w-full max-w-[728px] h-[90px] mx-auto my-4",
    "game-bottom": "w-full max-w-[728px] h-[90px] mx-auto my-4",
  };

  return (
    <div className={`${styles[position]} flex items-center justify-center`}>
      <div
        className={`w-full h-full rounded-2xl flex items-center justify-center text-xs ${
          theme === "dark"
            ? "bg-dark-800/50 text-gray-600 border border-dark-700/50"
            : "bg-gray-100 text-gray-400 border border-gray-200"
        }`}
      >
        <div className="text-center">
          <span className="block text-[10px] uppercase tracking-widest opacity-50">Advertisement</span>
          <span className="block text-[10px] opacity-30 mt-0.5">Your ad here</span>
        </div>
      </div>
    </div>
  );
}
