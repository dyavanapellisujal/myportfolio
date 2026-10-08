#!/usr/bin/env node
// Verifies every link in the static export (./out):
//   • internal links and #anchors must resolve to a file / element id
//   • external links must return 2xx/3xx
// Medium blocks automated requests (403/429), so medium.com links are
// reported as "unverifiable" instead of failing the run.
//
// Usage: npm run build && npm run check:links   (add --internal to skip the network)

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const internalOnly = process.argv.includes("--internal");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return files.flat();
}

const pages = (await walk(OUT)).filter((f) => f.endsWith(".html") && !f.includes(`${path.sep}_next${path.sep}`));
const idsByPage = new Map();
const links = []; // { from, href }

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const route = "/" + path.relative(OUT, file).replace(/index\.html$/, "").replace(/\.html$/, "");
  idsByPage.set(route, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  for (const m of html.matchAll(/<(?:a|link)\s[^>]*href="([^"]+)"/g)) links.push({ from: route, href: m[1].replace(/&amp;/g, "&") });
  for (const m of html.matchAll(/<(?:img|object)\s[^>]*(?:src|data)="([^"]+)"/g)) links.push({ from: route, href: m[1] });
}

const exists = async (p) => stat(p).then(() => true, () => false);
const failures = [];
const unverifiable = new Set();
const external = new Map();

for (const { from, href } of links) {
  if (href.startsWith("mailto:") || href.startsWith("data:")) continue;
  if (/^https?:\/\//.test(href)) {
    if (!external.has(href)) external.set(href, from);
    continue;
  }
  const url = new URL(href, `http://site${from}`);
  if (url.pathname.startsWith("/_next/")) continue;
  const target = path.join(OUT, decodeURIComponent(url.pathname));
  const ok = (await exists(path.join(target, "index.html"))) || ((await exists(target)) && !(await stat(target)).isDirectory());
  if (!ok) failures.push(`${from} → ${href} (missing file)`);
  else if (url.hash) {
    const ids = idsByPage.get(url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`) ?? idsByPage.get(url.pathname);
    if (ids && !ids.has(decodeURIComponent(url.hash.slice(1)))) failures.push(`${from} → ${href} (missing #anchor)`);
  }
}

if (!internalOnly) {
  // Canonical/OG URLs point at the production domain, which may not be deployed yet.
  const robots = await readFile(path.join(OUT, "robots.txt"), "utf8").catch(() => "");
  const ownOrigin = robots.match(/^Host:\s*(\S+)/m)?.[1];
  const queue = [...external.entries()].filter(([u]) => !ownOrigin || !u.startsWith(ownOrigin));
  const check = async ([href, from]) => {
    if (/(^|\.)medium\.com\//.test(href)) return unverifiable.add(href);
    for (const method of ["HEAD", "GET"]) {
      try {
        const res = await fetch(href, { method, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 link-check" }, signal: AbortSignal.timeout(15000) });
        if (res.ok) return;
        if (method === "GET") {
          if ([401, 403, 429, 999].includes(res.status)) unverifiable.add(`${href} (${res.status})`);
          else failures.push(`${from} → ${href} (${res.status})`);
        }
      } catch (e) {
        if (method === "GET") failures.push(`${from} → ${href} (${e.cause?.code ?? e.name})`);
      }
    }
  };
  for (let i = 0; i < queue.length; i += 8) await Promise.all(queue.slice(i, i + 8).map(check));
}

console.log(`${pages.length} pages, ${links.length} links, ${external.size} unique external URLs`);
if (unverifiable.size) console.log(`\nUnverifiable (host blocks bots — check manually):\n  ${[...unverifiable].join("\n  ")}`);
if (failures.length) {
  console.error(`\nBroken:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nNo broken links.");
