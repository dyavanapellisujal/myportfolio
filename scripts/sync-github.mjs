#!/usr/bin/env node
// Pulls metadata for every public repository owned by GITHUB_USER and writes
// a normalized snapshot to data/github-repos.json.
//
// The site never calls GitHub at runtime: this runs locally (or in CI) and the
// JSON snapshot is committed. Curated, human-written project copy lives in
// src/content/projects.ts and is merged with this snapshot at build time.
//
// Usage:  npm run sync:github
// Optional: GITHUB_TOKEN=<token with no scopes> to raise the rate limit.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const USER = process.env.GITHUB_USER ?? "dyavanapellisujal";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "github-repos.json");

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${USER}-portfolio-sync`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function listRepos() {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await gh(`https://api.github.com/users/${USER}/repos?type=owner&per_page=100&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

const repos = await listRepos();
const normalized = [];

for (const r of repos) {
  if (r.private) continue; // defensive: the endpoint only returns public repos without a token
  const [languages, detail] = await Promise.all([
    gh(r.languages_url),
    r.fork ? gh(r.url) : Promise.resolve(null),
  ]);
  normalized.push({
    name: r.name,
    url: r.html_url,
    description: r.description ?? "",
    homepage: r.homepage || "",
    fork: r.fork,
    parent: detail?.parent?.full_name ?? null,
    archived: r.archived,
    empty: r.size === 0,
    language: r.language,
    languages,
    topics: r.topics ?? [],
    stars: r.stargazers_count,
    createdAt: r.created_at,
    pushedAt: r.pushed_at,
  });
}

normalized.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

// Leave the file untouched when nothing changed, so scheduled syncs don't churn.
const previous = await readFile(OUT, "utf8").then(JSON.parse, () => null);
if (previous && JSON.stringify(previous.repos) === JSON.stringify(normalized)) {
  console.log("no repository changes");
  process.exit(0);
}
await writeFile(OUT, JSON.stringify({ user: USER, syncedAt: new Date().toISOString(), repos: normalized }, null, 2) + "\n");
console.log(`wrote ${normalized.length} repositories to ${path.relative(process.cwd(), OUT)}`);
