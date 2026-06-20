import { NextResponse } from "next/server";

interface ImportGame {
  title: string;
  description?: string;
  category?: string;
  iframe_url: string;
  thumbnail?: string;
  tags?: string[];
  controls?: string;
  how_to_play?: string;
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferCategory(title: string, tags?: string[]): string {
  const keywords: Record<string, string[]> = {
    racing: ["race", "car", "drift", "speed", "turbo", "moto", "kart", "formula"],
    action: ["shoot", "gun", "combat", "war", "fight", "battle", "assault", "strike"],
    puzzle: ["puzzle", "match", "brain", "logic", "word", "sudoku", "block", "merge"],
    sports: ["soccer", "football", "basketball", "tennis", "golf", "sport", "ball"],
    arcade: ["arcade", "classic", "retro", "pac", "snake", "tetris", "pong"],
    adventure: ["adventure", "quest", "explore", "journey", "treasure", "island"],
    shooting: ["sniper", "fps", "shooter", "bullet", "target", "aim"],
    strategy: ["strategy", "tower", "defense", "empire", "kingdom", "army", "build"],
    simulation: ["sim", "tycoon", "manager", "builder", "farm", "city", "flight"],
    horror: ["horror", "zombie", "ghost", "scary", "dark", "haunt", "survival"],
  };

  const combined = `${title} ${(tags || []).join(" ")}`.toLowerCase();

  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some((w) => combined.includes(w))) return cat;
  }

  return "arcade";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of games" }, { status: 400 });
    }

    const imported: ImportGame[] = body;
    const results: any[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < imported.length; i++) {
      const game = imported[i];
      const errors: string[] = [];

      if (!game.title) errors.push("title is required");
      if (!game.iframe_url) errors.push("iframe_url is required");

      if (errors.length > 0) {
        errorCount++;
        results.push({ index: i, status: "error", errors });
        continue;
      }

      const slug = generateSlug(game.title);
      const category = game.category || inferCategory(game.title, game.tags);
      const tags = game.tags || [category];

      results.push({
        index: i,
        status: "success",
        game: {
          id: -1,
          slug,
          title: game.title,
          description: game.description || `Play ${game.title} online for free on GameVerse.`,
          category,
          thumbnail: game.thumbnail || `https://placehold.co/400x250/1e293b/00d4ff?text=${encodeURIComponent(game.title.slice(0, 15))}`,
          tags,
          featured: false,
          trending: false,
          iframe_url: game.iframe_url,
          controls: game.controls || "Keyboard controls",
          how_to_play: game.how_to_play || `Play ${game.title} using the controls provided in the game.`,
        },
      });
      successCount++;
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: imported.length,
        imported: successCount,
        errors: errorCount,
      },
      results,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body. Expected array of game objects." }, { status: 400 });
  }
}
