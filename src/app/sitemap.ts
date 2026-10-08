import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";
import { featuredProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((n) => ({
    url: `${site.url}${n.href}`,
    changeFrequency: "monthly" as const,
    priority: n.href === "/" ? 1 : 0.8,
  }));
  const projects = featuredProjects.map((p) => ({
    url: `${site.url}/projects/${p.slug}/`,
    lastModified: p.pushedAt || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...projects];
}
