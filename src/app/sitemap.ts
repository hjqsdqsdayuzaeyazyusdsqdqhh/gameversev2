import type { MetadataRoute } from "next";
import { games, categories, getAllTags } from "@/data/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gameverse.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/games`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];

  const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${baseUrl}/game/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const allTags = getAllTags();
  const tagPages: MetadataRoute.Sitemap = allTags.map((tag) => ({
    url: `${baseUrl}/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticPages, ...gamePages, ...categoryPages, ...tagPages];
}
