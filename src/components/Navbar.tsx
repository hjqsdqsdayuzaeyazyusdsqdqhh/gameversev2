"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeContext";
import { categories as cats } from "@/types";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

            <div ref={userMenuRef} className="relative">
              {session?.user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-neon-blue/50 transition-all"
                >
                  <img src={session.user.image ?? ""} alt="" className="w-full h-full object-cover" />
                </button>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Login
                </button>
              )}

              {showUserMenu && session?.user && (
                <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl glass border border-dark-600/50 shadow-2xl shadow-black/40 z-50 animate-scale-in">
                  <div className="px-3 py-2.5 border-b border-dark-700/50 mb-1">
                    <p className="text-sm font-medium truncate">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  <Link href="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-dark-700/50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Profile
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-dark-700/50 transition-colors w-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>

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
