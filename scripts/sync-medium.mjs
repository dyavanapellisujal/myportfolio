#!/usr/bin/env node
// Reads the public Medium RSS feed and merges any posts it contains into
// data/medium-feed.json. Medium's feed only exposes the ~10 most recent posts,
// so entries are merged (never dropped) and older articles stay in the file.
//
// Curated metadata (category, summary, local cover image) lives in
// src/content/writing.ts and always wins over what the feed provides.
// A new post that has no curated entry still shows up on the site, under the
// category inferred from its tags, until you add one.
//
// Usage:  npm run sync:medium

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HANDLE = process.env.MEDIUM_HANDLE ?? "dyavanapellisujal7";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "medium-feed.json");

const decode = (s) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

// Medium rate-limits aggressively. If the fetch fails, save the feed from a
// browser and run: MEDIUM_FEED_FILE=./feed.xml npm run sync:medium
async function loadFeed() {
  if (process.env.MEDIUM_FEED_FILE) return readFile(process.env.MEDIUM_FEED_FILE, "utf8");
  const res = await fetch(`https://medium.com/feed/@${HANDLE}`, { headers: { "User-Agent": "Mozilla/5.0 portfolio-sync" } });
  if (!res.ok) {
    console.error(`Medium feed returned ${res.status}; leaving ${path.basename(OUT)} unchanged.`);
    console.error(`Fallback: download https://medium.com/feed/@${HANDLE} and set MEDIUM_FEED_FILE.`);
    process.exit(1);
  }
  return res.text();
}
const xml = await loadFeed();

const fresh = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const html = tag(item, "content:encoded");
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return {
    url: tag(item, "link").split("?")[0],
    title: tag(item, "title"),
    date: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
    tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1])),
    cover: html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
    excerpt: text.slice(0, 280),
  };
});

let existing = { posts: [] };
try {
  existing = JSON.parse(await readFile(OUT, "utf8"));
} catch {
  // first run
}

const byUrl = new Map(existing.posts.map((p) => [p.url, p]));
for (const p of fresh) byUrl.set(p.url, p);
const posts = [...byUrl.values()].sort((a, b) => b.date.localeCompare(a.date));
if (JSON.stringify(posts) === JSON.stringify(existing.posts)) {
  console.log("no new posts");
  process.exit(0);
}

await writeFile(OUT, JSON.stringify({ handle: HANDLE, syncedAt: new Date().toISOString(), posts }, null, 2) + "\n");
console.log(`feed had ${fresh.length} posts; ${posts.length} total in ${path.relative(process.cwd(), OUT)}`);
