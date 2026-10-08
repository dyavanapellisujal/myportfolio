import type { Metadata } from "next";
import { site } from "@/content/site";
import { featuredProjects, githubStats, projectsByTier } from "@/lib/projects";
import { FeaturedProjectCard, ProjectRow } from "@/components/cards";
import { ExternalLink, PageHeader, Section, formatMonth } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kubernetes, GitOps, KEDA, CI and cloud security projects by Sujal Dyavanapelli: multi-cluster EKS, scale-to-zero workers, self-hosted runners, automated AWS incident response, serverless CSPM and more.",
  alternates: { canonical: "/projects/" },
};

const groups = [
  { id: "engineering", tier: "engineering", title: "Cloud & infrastructure", intro: "Terraform, AWS networking and automation." },
  { id: "security", tier: "security", title: "Security & detection", intro: "IDS signatures, SIEM detections, host firewalling and Active Directory automation." },
  { id: "labs", tier: "lab", title: "Labs, coursework & early projects", intro: "Smaller or earlier repositories, listed for completeness." },
] as const;

export default function ProjectsPage() {
  const stats = githubStats();
  return (
    <>
      <PageHeader eyebrow="Projects" title="Infrastructure, platform and security work">
        Each project has a full case study covering the architecture, the engineering decisions, what broke and
        what I learned, with its source on GitHub.
      </PageHeader>

      <Section id="featured" eyebrow="Featured" title="Case studies">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <FeaturedProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {groups.map((g) => {
        const items = projectsByTier(g.tier);
        if (!items.length) return null;
        return (
          <Section key={g.id} id={g.id} eyebrow={g.title} intro={g.intro}>
            <ul>
              {items.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </ul>
          </Section>
        );
      })}

      <Section id="github" eyebrow="GitHub snapshot" title="Repository stats">
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line text-center">
            {[
              ["public repos", stats.publicRepos],
              ["original", stats.original],
              ["forks", stats.forks],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface p-4">
                <dt className="font-mono text-xs text-faint">{k}</dt>
                <dd className="mt-1 font-mono text-2xl text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <p className="eyebrow mb-3">Language mix (original repos, by bytes, excluding HTML)</p>
            <ul className="space-y-2">
              {stats.languages.map((l) => (
                <li key={l.name} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-xs">
                  <span className="font-mono text-muted">{l.name}</span>
                  <span className="h-1.5 rounded-full bg-raised" aria-hidden>
                    <span className="block h-full rounded-full bg-accent/70" style={{ width: `${Math.max(l.share * 100, 1.5)}%` }} />
                  </span>
                  <span className="text-right font-mono text-faint">{(l.share * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs text-faint">
          Snapshot from the GitHub API, {formatMonth(stats.syncedAt)} ·{" "}
          <ExternalLink href={site.links.github} className="hover:text-fg">
            github.com/dyavanapellisujal
          </ExternalLink>
        </p>
      </Section>
    </>
  );
}
