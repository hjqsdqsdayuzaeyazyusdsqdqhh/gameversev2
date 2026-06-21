"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { games } from "@/data/games";
import { getFavorites } from "@/utils/favorites";
import { getRecentlyPlayed } from "@/utils/recentlyPlayed";

export default function ProfileClient() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recent, setRecent] = useState<ReturnType<typeof getRecentlyPlayed>>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecentlyPlayed());
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">Sign in to view your profile</h1>
          <p className="text-gray-400 text-sm mb-8">Save favorites, track recently played, and more.</p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-dark-900 font-semibold hover:bg-gray-100 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  const favoriteGames = favorites.map((id) => games.find((g) => g.id === id)).filter(Boolean);
  const recentGames = recent.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="glass-card rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neon-blue/30 flex-shrink-0">
            <img src={session.user?.image ?? ""} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{session.user?.name}</h1>
            <p className="text-sm text-gray-400 truncate">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-xl bg-dark-800 text-gray-300 border border-dark-600 hover:bg-dark-700 transition-all text-sm flex-shrink-0"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-neon-pink" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            Favorites ({favorites.length})
          </h2>
          {favoriteGames.length > 0 ? (
            <div className="space-y-2">
              {favoriteGames.slice(0, 5).map((g) => g && (
                <Link key={g.id} href={`/games/${g.slug}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-dark-800 transition-colors">
                  <img src={g.thumbnail} alt={g.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{g.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{g.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No favorites yet. Click the heart icon on any game.</p>
          )}
          {favoriteGames.length > 5 && (
            <Link href="/games" className="text-xs text-neon-blue mt-3 inline-block">View all favorites →</Link>
          )}
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Recently Played
          </h2>
          {recentGames.length > 0 ? (
            <div className="space-y-2">
              {recentGames.map((r) => {
                const g = games.find((gg) => gg.id === r.id);
                if (!g) return null;
                return (
                  <Link key={r.id} href={`/games/${g.slug}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-dark-800 transition-colors">
                    <img src={g.thumbnail} alt={g.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{g.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{g.category}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Play some games to see them here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
