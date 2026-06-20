# GameVerse 🎮

A production-ready browser games platform built with Next.js, TypeScript, and Tailwind CSS. Play 1000+ free HTML5 games instantly — no downloads, no sign-ups.

## Features

- **1000+ Games** across 20 categories with SEO-optimized metadata
- **Programmatic SEO** pages for every game, category, and tag
- **Admin Dashboard** with CRUD, game table, and bulk import
- **Search** with category filters and sort options
- **Fullscreen Game Player** with related games and sharing
- **Dark/Light Mode** with persistent theme toggle
- **AdSense Ready** with strategic ad slot placements
- **Analytics** local-storage based play/view tracking
- **JSON-LD Structured Data** for rich search results
- **Sitemap.xml** auto-generation for 1000+ URLs
- **Responsive Design** mobile-first glassmorphism UI

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | React framework with server components |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| ESLint | Code quality |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Deploy — zero configuration required

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── games/[slug]/       # Game detail + iframe player
│   ├── category/[slug]/    # Category filtered listing
│   ├── tag/[tag]/          # Tag-based SEO pages
│   ├── search/             # Search with filters
│   ├── admin/              # Admin dashboard
│   └── api/                # REST API routes
├── components/             # Shared UI components
├── data/                   # Game & category datasets
├── types/                  # TypeScript type definitions
└── utils/                  # SEO, analytics, storage utilities
```

## API Endpoints

- `GET /api/games` — List all games (with pagination, filtering)
- `POST /api/games` — Add a new game
- `POST /api/import` — Bulk import games from JSON

## Configuration

### AdSense

Replace `ca-pub-xxxxxxxxxxxxxx` in `src/app/layout.tsx` with your AdSense publisher ID.

### Game URLs

Update `iframe_url` in generated games at `src/data/games.ts` with real game URLs.

### Site URL

Update `https://gameverse.vercel.app` references in:
- `src/app/layout.tsx` (metadata)
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/utils/seo.ts`

## Customization

- **Colors**: Edit tailwind config colors / CSS variables in `globals.css`
- **Logo**: Update `src/components/Logo.tsx`
- **Categories**: Modify `src/data/categories.ts`
- **Games**: Add/remove game templates in `src/data/games.ts`

## License

MIT
