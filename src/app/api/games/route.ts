import { NextResponse } from "next/server";
import { games, getGameBySlug, getGamesByCategory, getGamesByTag, searchGames } from "@/data/games";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const featured = searchParams.get("featured");
  const trending = searchParams.get("trending");

  let result = [...games];

  if (slug) {
    const game = getGameBySlug(slug);
    return NextResponse.json(game || { error: "Game not found" }, { status: game ? 200 : 404 });
  }

  if (category) {
    result = getGamesByCategory(category);
  }

  if (tag) {
    result = getGamesByTag(tag);
  }

  if (search) {
    result = searchGames(search);
  }

  if (featured === "true") {
    result = result.filter((g) => g.featured);
  }

  if (trending === "true") {
    result = result.filter((g) => g.trending);
  }

  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  return NextResponse.json({
    games: paginated,
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit),
  });

  // POST handler would accept new game data
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, iframe_url, thumbnail, tags, controls, how_to_play, featured, trending } = body;

    if (!title || !description || !category || !iframe_url) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, category, iframe_url" },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newGame = {
      id: games.length + 1,
      slug,
      title,
      description,
      category,
      thumbnail: thumbnail || `https://placehold.co/400x250/1e293b/00d4ff?text=${encodeURIComponent(title.slice(0, 15))}`,
      tags: tags || [category],
      featured: featured || false,
      trending: trending || false,
      iframe_url,
      controls: controls || "Keyboard controls",
      how_to_play: how_to_play || "Use the controls to play the game.",
    };

    return NextResponse.json({ success: true, game: newGame }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
