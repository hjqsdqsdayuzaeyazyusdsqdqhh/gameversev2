"use client";

import Link from "next/link";
import { categories } from "@/types";
import { useTheme } from "@/components/ThemeContext";
import Logo from "./Logo";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t ${theme === "dark" ? "border-dark-700/50 bg-dark-850" : "border-gray-200 bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className={`text-sm mt-4 max-w-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Your ultimate destination for free browser games. Play instantly — no downloads, no sign-ups, no hassle.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
                </span>
                100+ Games Online
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={`/category/${cat.name}`} className={`text-sm transition-all hover:text-neon-blue hover:translate-x-0.5 inline-block ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/games" className={`text-sm transition-all hover:text-neon-blue ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>All Games</Link></li>
              <li><Link href="/" className={`text-sm transition-all hover:text-neon-blue ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Featured Games</Link></li>
              <li><Link href="/" className={`text-sm transition-all hover:text-neon-blue ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Trending</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>About</span></li>
              <li><span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Privacy Policy</span></li>
              <li><span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Contact</span></li>
              <li><span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Advertise</span></li>
            </ul>
          </div>
        </div>

        <div className={`border-t py-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${theme === "dark" ? "border-dark-700/50" : "border-gray-200"}`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
            &copy; {new Date().getFullYear()} GameVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
