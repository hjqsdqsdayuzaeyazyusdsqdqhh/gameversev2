"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import GameCarousel from "@/components/GameCarousel";
import AdSlot from "@/components/AdSlot";
import ShareButtons from "@/components/ShareButtons";
import FavoriteButton from "@/components/FavoriteButton";
import SectionHeader from "@/components/SectionHeader";
import { GameDetailSkeleton } from "@/components/GameSkeleton";
import { getGameBySlug, getRelatedGames } from "@/data/games";
import { addRecentlyPlayed } from "@/utils/recentlyPlayed";
import { categories } from "@/types";
import type { Game } from "@/types";

export default function GamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [game, setGame] = useState<Game | null>(null);
  const [related, setRelated] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    const found = getGameBySlug(slug);
    setGame(found || null);
    if (found) {
      document.title = `${found.title} | Play Free Online | GameVerse`;
      setRelated(getRelatedGames(found));
      addRecentlyPlayed({
        id: found.id, title: found.title, thumbnail: found.thumbnail,
        slug: found.slug, category: found.category,
      });
    }
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) return <GameDetailSkeleton />;

  if (!game) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-8xl mb-6 opacity-20">🎮</div>
        <h1 className="text-3xl font-bold mb-3">Game Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">The game you are looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/games" className="btn-primary px-8 py-3">Browse All Games</Link>
      </div>
    );
  }

  const categoryLabel = categories.find((c) => c.name === game.category)?.label || game.category;
  const gameUrl = typeof window !== "undefined" ? `${window.location.origin}/game/${game.slug}` : `/game/${game.slug}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            name: game.title,
            description: game.description,
            image: game.thumbnail,
            genre: game.category,
            keywords: game.tags.join(", "),
            applicationCategory: "Game",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: gameUrl,
          }),
        }}
      />

      <div className={`${fullscreen ? "fixed inset-0 z-[100] bg-black" : "max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8"}`}>
        <div className={fullscreen ? "h-full flex flex-col" : ""}>
          {!fullscreen && (
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto scrollbar-hide">
              <Link href="/" className="hover:text-neon-blue transition-colors whitespace-nowrap">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/games" className="hover:text-neon-blue transition-colors whitespace-nowrap">Games</Link>
              <span className="text-gray-700">/</span>
              <Link href={`/category/${game.category}`} className="hover:text-neon-blue transition-colors capitalize whitespace-nowrap">{categoryLabel}</Link>
              <span className="text-gray-700">/</span>
              <span className="text-white truncate max-w-[200px]">{game.title}</span>
            </nav>
          )}

          <div className={`${fullscreen ? "flex-1 flex flex-col" : "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8"}`}>
            <div className={fullscreen ? "flex-1 flex flex-col" : ""}>
              <div className={`relative overflow-hidden mb-6 ${fullscreen ? "flex-1 flex flex-col" : "rounded-2xl glass-card"}`}>
                {!fullscreen && <AdSlot position="game-top" />}
                <div
                  className={`relative bg-dark-950 flex items-center justify-center group ${
                    fullscreen ? "flex-1" : "aspect-[16/9]"
                  }`}
                >
                  <iframe
                    src={game.iframe_url}
                    title={game.title}
                    className={`${fullscreen ? "w-full h-full" : "w-full h-full"} transition-all`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />

                  {!fullscreen && (
                    <button
                      onClick={() => setFullscreen(true)}
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-dark-900/80 backdrop-blur border border-dark-600 text-gray-300 hover:text-white hover:bg-dark-800 transition-all opacity-0 group-hover:opacity-100 z-10"
                      title="Fullscreen mode"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    </button>
                  )}
                </div>
                {!fullscreen && <AdSlot position="game-bottom" />}
              </div>

              {fullscreen && (
                <div className="bg-dark-900/95 backdrop-blur border-t border-dark-700 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={game.thumbnail} alt={game.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-white truncate">{game.title}</h2>
                      <span className="text-xs text-gray-400 capitalize">{categoryLabel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FavoriteButton gameId={game.id} />
                    <ShareButtons title={game.title} slug={game.slug} />
                    <button
                      onClick={() => setFullscreen(false)}
                      className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-300 transition-colors"
                      title="Exit fullscreen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {!fullscreen && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{game.title}</h1>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link
                          href={`/category/${game.category}`}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/30 capitalize hover:bg-neon-blue/20 transition-colors"
                        >
                          {categoryLabel}
                        </Link>
                        <span className="text-sm text-gray-500">{game.tags.slice(0, 4).join(" · ")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FavoriteButton gameId={game.id} />
                      <ShareButtons title={game.title} slug={game.slug} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        About This Game
                      </h2>
                      <p className="text-gray-400 leading-relaxed">{game.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="glass-card rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          How to Play
                        </h2>
                        <p className="text-gray-400 leading-relaxed">{game.how_to_play}</p>
                      </div>
                      <div className="glass-card rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                          Controls
                        </h2>
                        <p className="text-gray-400 leading-relaxed">{game.controls}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!fullscreen && (
              <aside className="hidden lg:block space-y-6">
                <AdSlot position="sidebar" />

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Game Info
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-dark-700/50">
                      <dt className="text-gray-400">Category</dt>
                      <dd className="text-white capitalize">{categoryLabel}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-700/50">
                      <dt className="text-gray-400">Tags</dt>
                      <dd className="text-white text-right text-xs">{game.tags.slice(0, 3).join(", ")}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-dark-700/50">
                      <dt className="text-gray-400">Players</dt>
                      <dd className="text-neon-green">1 Player</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-400">Price</dt>
                      <dd className="text-neon-green font-medium">Free</dd>
                    </div>
                  </dl>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-3">All Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={`/category/${cat.name}`}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          cat.name === game.category
                            ? "bg-neon-blue/10 text-neon-blue border-neon-blue/30"
                            : "bg-dark-800 text-gray-400 border-dark-600 hover:border-neon-blue/30 hover:text-neon-blue"
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {!fullscreen && related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 border-t border-dark-700/50 mt-8">
          <SectionHeader
            highlight="Related"
            title="Games"
            description="You might also enjoy these games"
          />
          <GameCarousel games={related} title="Related" />
        </section>
      )}
    </>
  );
}
