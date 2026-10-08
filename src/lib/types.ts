// Shared content model. Everything rendered on the site is typed here so that
// adding a project, article or role is a data change, not a component change.

export type Link = { label: string; href: string };

/** Normalized repository record written by scripts/sync-github.mjs. */
export type RepoSnapshot = {
  name: string;
  url: string;
  description: string;
  homepage: string;
  fork: boolean;
  parent: string | null;
  archived: boolean;
  empty: boolean;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  createdAt: string;
  pushedAt: string;
};

/**
 * featured     — has a dedicated case-study page
 * engineering  — cloud / IaC / automation projects
 * security     — detection, hardening and appsec work
 * lab          — coursework, experiments, early projects
 */
export type ProjectTier = "featured" | "engineering" | "security" | "lab";

/** A box-and-arrow architecture diagram rendered as plain HTML (no JS). */
export type Flow = {
  caption?: string;
  stages: { title: string; items: string[] }[];
};

export type CaseStudy = {
  overview: string;
  problem: string[];
  architecture: Flow;
  architectureNotes?: string[];
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  implementation: string[];
  decisions: { decision: string; tradeoff: string }[];
  challenges: { title: string; detail: string }[];
  results: string[];
  lessons: string[];
  /** Honest framing of what this is (demo, blueprint, hackathon MVP …). */
  scope: string;
};

/** Hand-written metadata for a repository. Keyed by repo name. */
export type ProjectCuration = {
  repo: string;
  slug: string;
  title: string;
  tier: ProjectTier;
  /** Sort weight within a tier — lower first. */
  order: number;
  problem: string;
  why?: string;
  approach: string;
  tech: string[];
  concepts: string[];
  related?: Link[];
  /** For forks: what (if anything) was contributed. */
  contribution?: string;
  hidden?: boolean;
  caseStudy?: CaseStudy;
};

export type Project = ProjectCuration & {
  repoUrl: string;
  homepage: string;
  fork: boolean;
  parent: string | null;
  languages: string[];
  stars: number;
  createdAt: string;
  pushedAt: string;
  /** True when a repo exists on GitHub but has no curated entry yet. */
  uncurated: boolean;
};

export type WritingCategory =
  | "Kubernetes & Platform"
  | "Networking"
  | "Cloud Security"
  | "Detection & SOC"
  | "Windows & Active Directory"
  | "Forensics Labs";

export type Article = {
  url: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: WritingCategory;
  summary: string;
  source: "medium" | "github";
  cover?: string;
  hidden?: boolean;
  related?: string; // project slug
};

export type Role = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  /**
   * siteOnly: shown on the site but not in the resume copy on /resume.
   * resumeOnly: the PDF's wording, kept for /resume; the site shows a siteOnly rewrite instead.
   */
  highlights: { text: string; metric?: string; siteOnly?: boolean; resumeOnly?: boolean }[];
  tech: string[];
};
