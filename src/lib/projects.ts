import snapshot from "@data/github-repos.json";
import { curations } from "@/content/projects";
import type { Project, ProjectTier, RepoSnapshot } from "@/lib/types";

// JSON imports infer literal types; the snapshot is shaped by scripts/sync-github.mjs.
const repos = (snapshot as unknown as { repos: RepoSnapshot[] }).repos;
const byName = new Map(repos.map((r) => [r.name, r]));

function topLanguages(langs: Record<string, number>, max = 4): string[] {
  return Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([name]) => name);
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function build(): Project[] {
  const curated = curations.map((c): Project => {
    const r = byName.get(c.repo);
    return {
      ...c,
      repoUrl: r?.url ?? `https://github.com/dyavanapellisujal/${c.repo}`,
      homepage: r?.homepage ?? "",
      fork: r?.fork ?? false,
      parent: r?.parent ?? null,
      languages: r ? topLanguages(r.languages) : [],
      stars: r?.stars ?? 0,
      createdAt: r?.createdAt ?? "",
      pushedAt: r?.pushedAt ?? "",
      uncurated: false,
    };
  });

  // New repositories appear automatically after `npm run sync:github`,
  // in the labs tier, using the GitHub description, until they are curated.
  const known = new Set(curations.map((c) => c.repo));
  const discovered = repos
    .filter((r) => !known.has(r.name) && !r.empty && !r.archived)
    .map((r): Project => ({
      repo: r.name,
      slug: slugify(r.name),
      title: r.name.replace(/[-_]/g, " "),
      tier: "lab",
      order: 50,
      problem: r.description || "No description yet.",
      approach: "",
      tech: topLanguages(r.languages),
      concepts: r.topics,
      repoUrl: r.url,
      homepage: r.homepage,
      fork: r.fork,
      parent: r.parent,
      languages: topLanguages(r.languages),
      stars: r.stars,
      createdAt: r.createdAt,
      pushedAt: r.pushedAt,
      uncurated: true,
    }));

  return [...curated, ...discovered].filter((p) => !p.hidden);
}

export const projects = build();

export const projectsByTier = (tier: ProjectTier) =>
  projects.filter((p) => p.tier === tier).sort((a, b) => a.order - b.order || b.pushedAt.localeCompare(a.pushedAt));

export const featuredProjects = projectsByTier("featured");

export const getProject = (slug: string) => projects.find((p) => p.slug === slug && p.caseStudy);

/** Aggregate stats from the snapshot, shown on the projects page. */
export function githubStats() {
  const owned = repos.filter((r) => !r.empty);
  const bytes = new Map<string, number>();
  for (const r of owned.filter((r) => !r.fork)) {
    for (const [lang, n] of Object.entries(r.languages)) bytes.set(lang, (bytes.get(lang) ?? 0) + n);
  }
  // OpsMemory ships a generated 3 MB HTML graph visualisation; excluding HTML
  // keeps the language mix honest about hand-written code.
  bytes.delete("HTML");
  const total = [...bytes.values()].reduce((a, b) => a + b, 0);
  const languages = [...bytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, n]) => ({ name, share: n / total }));
  return {
    publicRepos: repos.length,
    original: repos.filter((r) => !r.fork && !r.empty).length,
    forks: repos.filter((r) => r.fork).length,
    syncedAt: (snapshot as { syncedAt: string }).syncedAt,
    languages,
  };
}
