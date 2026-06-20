"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";
import { categories as cats } from "@/types";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? theme === "dark"
            ? "glass border-b border-dark-600/50"
            : "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${theme === "dark" ? "text-gray-300 hover:text-neon-blue hover:bg-dark-800" : "text-gray-600 hover:text-neon-blue hover:bg-gray-100"}`}>
              Home
            </Link>
            <Link href="/games" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${theme === "dark" ? "text-gray-300 hover:text-neon-blue hover:bg-dark-800" : "text-gray-600 hover:text-neon-blue hover:bg-gray-100"}`}>
              All Games
            </Link>
            <div className="relative group">
              <button
                onClick={() => setShowCategories(!showCategories)}
                onMouseEnter={() => setShowCategories(true)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${theme === "dark" ? "text-gray-300 hover:text-neon-blue hover:bg-dark-800" : "text-gray-600 hover:text-neon-blue hover:bg-gray-100"}`}
              >
                Categories
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {showCategories && (
                <div
                  onMouseLeave={() => setShowCategories(false)}
                  className="absolute top-full left-0 mt-2 w-[600px] p-3 rounded-2xl glass border border-dark-600/50 shadow-2xl shadow-black/40 grid grid-cols-4 gap-1 animate-scale-in"
                >
                  {cats.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/category/${cat.name}`}
                      onClick={() => setShowCategories(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-dark-700/50 transition-colors text-sm"
                    >
                      <span>{cat.icon}</span>
                      <span className="text-gray-300 hover:text-neon-blue">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/search" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${theme === "dark" ? "text-gray-300 hover:text-neon-blue hover:bg-dark-800" : "text-gray-600 hover:text-neon-blue hover:bg-gray-100"}`}>
              Search
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2.5 rounded-xl transition-all ${theme === "dark" ? "hover:bg-dark-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${theme === "dark" ? "hover:bg-dark-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <Link
              href="/admin"
              className={`hidden sm:flex p-2.5 rounded-xl transition-all ${theme === "dark" ? "hover:bg-dark-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
              aria-label="Admin"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </Link>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className={`md:hidden p-2.5 rounded-xl transition-all ${theme === "dark" ? "hover:bg-dark-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="pb-4 animate-slide-down">
            <SearchBar />
          </div>
        )}
      </div>

      {mobileMenu && (
        <div className={`md:hidden border-t animate-slide-down max-h-[80vh] overflow-y-auto ${theme === "dark" ? "border-dark-700/50 bg-dark-900/95 backdrop-blur-lg" : "border-gray-200 bg-white/95 backdrop-blur-lg"}`}>
          <div className="px-4 py-4 space-y-1">
            <Link href="/" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-dark-800" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link href="/games" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-dark-800" onClick={() => setMobileMenu(false)}>All Games</Link>
            <Link href="/search" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-dark-800" onClick={() => setMobileMenu(false)}>Search</Link>
            <div className="border-t border-dark-700/50 my-2 pt-2">
              <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {cats.map((cat) => (
                  <Link key={cat.name} href={`/category/${cat.name}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-dark-800" onClick={() => setMobileMenu(false)}>
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/admin" className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-dark-800 mt-2" onClick={() => setMobileMenu(false)}>
              ⚙️ Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
