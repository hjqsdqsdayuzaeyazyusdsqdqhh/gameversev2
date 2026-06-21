"use client";

import { useState, useEffect } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";
import AuthProvider from "./AuthProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdSlot from "./AdSlot";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("gameverse_theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("gameverse_theme", next);
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthProvider>
        {mounted && (
          <>
            <Navbar />
            <AdSlot position="header" />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <AdSlot position="footer" />
          </>
        )}
      </AuthProvider>
    </ThemeContext.Provider>
  );
}
