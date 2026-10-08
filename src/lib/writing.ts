import feed from "@data/medium-feed.json";
import { articles as curated, categoryOrder, tagCategory } from "@/content/writing";
import type { Article } from "@/lib/types";

type FeedPost = { url: string; title: string; date: string; tags: string[]; cover: string | null; excerpt: string };

// Curated entries win. Feed posts without a curated entry are still published,
// categorized from their tags, so a new Medium post shows up after a sync.
function build(): Article[] {
  const known = new Set(curated.map((a) => a.url));
  const fromFeed = (feed as unknown as { posts: FeedPost[] }).posts
    .filter((p) => !known.has(p.url))
    .map(
      (p): Article => ({
        url: p.url,
        title: p.title,
        date: p.date,
        source: "medium",
        category: p.tags.map((t) => tagCategory[t]).find(Boolean) ?? "Kubernetes & Platform",
        summary: p.excerpt.length >= 280 ? `${p.excerpt.slice(0, 240).trimEnd()}…` : p.excerpt,
        cover: p.cover ?? undefined,
      }),
    );
  return [...curated, ...fromFeed].filter((a) => !a.hidden).sort((a, b) => b.date.localeCompare(a.date));
}

export const allArticles = build();

export const latestArticles = (n: number) => allArticles.slice(0, n);

export const articlesByCategory = () =>
  categoryOrder
    .map((c) => ({ ...c, articles: allArticles.filter((a) => a.category === c.name) }))
    .filter((c) => c.articles.length > 0);

export const articlesForProject = (slug: string) => allArticles.filter((a) => a.related === slug);
