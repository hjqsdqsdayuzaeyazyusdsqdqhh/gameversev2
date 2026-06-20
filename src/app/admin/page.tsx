"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { games, categories } from "@/data/games";
import type { Game, Category } from "@/types";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "games" | "add" | "import">("dashboard");
  const [editMode, setEditMode] = useState(false);
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const categoryCounts: Record<string, number> = {};
  games.forEach((g) => { categoryCounts[g.category] = (categoryCounts[g.category] || 0) + 1; });

  if (!mounted) return null;

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-2xl font-bold">{games.length}</span>
          </div>
          <p className="text-sm text-gray-400">Total Games</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-neon-purple/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-2xl font-bold">{categories.length}</span>
          </div>
          <p className="text-sm text-gray-400">Categories</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-2xl font-bold">{games.filter((g) => g.featured).length}</span>
          </div>
          <p className="text-sm text-gray-400">Featured Games</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-neon-pink/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <span className="text-2xl font-bold">{games.filter((g) => g.trending).length}</span>
          </div>
          <p className="text-sm text-gray-400">Trending Games</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Games by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2 p-3 rounded-xl bg-dark-800/50">
              <span>{cat.icon}</span>
              <div>
                <p className="text-sm font-medium">{cat.label}</p>
                <p className="text-xs text-gray-500">{categoryCounts[cat.name] || 0} games</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGameList = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">All Games ({games.length})</h2>
        <button onClick={() => { setActiveTab("add"); setEditMode(false); }} className="btn-primary text-sm px-4 py-2">
          Add New Game
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-700 text-gray-400">
              <th className="text-left py-3 px-2">ID</th>
              <th className="text-left py-3 px-2">Title</th>
              <th className="text-left py-3 px-2">Category</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-right py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-b border-dark-700/50 hover:bg-dark-800/50 transition-colors">
                <td className="py-3 px-2 text-gray-500">#{game.id}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img src={game.thumbnail} alt="" className="w-10 h-7 rounded object-cover" loading="lazy" />
                    <span className="font-medium truncate max-w-[200px]">{game.title}</span>
                  </div>
                </td>
                <td className="py-3 px-2 capitalize text-gray-400">{game.category}</td>
                <td className="py-3 px-2">
                  <div className="flex gap-1">
                    {game.featured && <span className="text-[10px] px-2 py-0.5 rounded-full brand-gradient text-white">Featured</span>}
                    {game.trending && <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/30">Trending</span>}
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/game/${game.slug}`} className="text-xs text-neon-blue hover:underline">View</Link>
                    <button
                      onClick={() => { setEditingGame(game); setEditMode(true); setActiveTab("add"); }}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddForm = () => {
    const g = editMode ? editingGame : null;
    return (
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold mb-6">{editMode ? "Edit Game" : "Add New Game"}</h2>
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title *</label>
            <input type="text" defaultValue={g?.title || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="Game title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
            <input type="text" defaultValue={g?.slug || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white/60 focus:outline-none focus:border-neon-blue/50" placeholder="Auto-generated from title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
            <textarea rows={3} defaultValue={g?.description || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50 resize-none" placeholder="SEO-optimized description" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
              <select defaultValue={g?.category || "arcade"} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50">
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>{cat.icon} {cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
              <input type="text" defaultValue={g?.tags?.join(", ") || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="action, shooter, fps" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Iframe URL *</label>
            <input type="url" defaultValue={g?.iframe_url || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="https://example.com/game" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail URL</label>
            <input type="url" defaultValue={g?.thumbnail || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="https://placehold.co/400x250/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Controls</label>
              <input type="text" defaultValue={g?.controls || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="Arrow Keys to move" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">How to Play</label>
              <input type="text" defaultValue={g?.how_to_play || ""} className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white focus:outline-none focus:border-neon-blue/50" placeholder="Brief instructions" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={g?.featured || false} className="rounded bg-dark-800 border-dark-600 text-neon-blue focus:ring-neon-blue" />
              <span className="text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={g?.trending || false} className="rounded bg-dark-800 border-dark-600 text-neon-blue focus:ring-neon-blue" />
              <span className="text-sm">Trending</span>
            </label>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="btn-primary px-8 py-2.5">{editMode ? "Update Game" : "Add Game"}</button>
            <button onClick={() => setActiveTab("games")} className="btn-secondary px-6 py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const renderImport = () => (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-6">Bulk Import Games</h2>
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <p className="text-sm text-gray-400">Paste a JSON array of games to bulk import. Each game should include title, description, category, and iframe_url.</p>
        <textarea
          rows={10}
          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white font-mono text-sm focus:outline-none focus:border-neon-blue/50 resize-none"
          placeholder='[
  {
    "title": "My Game",
    "description": "A fun game",
    "category": "action",
    "iframe_url": "https://...",
    "tags": ["action", "fun"]
  }
]'
        />
        <div className="flex items-center gap-3">
          <button className="btn-primary px-8 py-2.5">Import Games</button>
          <span className="text-xs text-gray-500">Supports JSON format</span>
        </div>

        <div className="border-t border-dark-700 pt-4 mt-4">
          <h3 className="font-semibold mb-3">Import from API Partners</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center gap-3 p-4 rounded-xl bg-dark-800 border border-dark-600 hover:border-neon-blue/30 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">GD</div>
              <div>
                <p className="text-sm font-medium">GameDistribution</p>
                <p className="text-xs text-gray-500">Import from GD API</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-xl bg-dark-800 border border-dark-600 hover:border-neon-blue/30 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">GM</div>
              <div>
                <p className="text-sm font-medium">GameMonetize</p>
                <p className="text-xs text-gray-500">Import from GM API</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">Admin</span> Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage GameVerse platform</p>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-neon-blue transition-colors">
            ← Back to site
          </Link>
        </div>

        <div className="flex gap-1 mb-8 overflow-x-auto scrollbar-hide">
          {[
            { id: "dashboard" as const, label: "Dashboard", icon: "📊" },
            { id: "games" as const, label: "Games", icon: "🎮" },
            { id: "add" as const, label: editMode ? "Edit Game" : "Add Game", icon: "➕" },
            { id: "import" as const, label: "Import", icon: "📥" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/30"
                  : "text-gray-400 hover:text-white hover:bg-dark-800 border border-transparent"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "games" && renderGameList()}
        {activeTab === "add" && renderAddForm()}
        {activeTab === "import" && renderImport()}
      </div>
    </div>
  );
}
