import type { Metadata } from "next";
import { site } from "@/content/site";
import { allArticles, articlesByCategory } from "@/lib/writing";
import { ArticleCard, ArticleRow } from "@/components/cards";
import { Container, ExternalLink, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical write-ups by Sujal Dyavanapelli on Kubernetes, GitHub Actions runners, KEDA, multi-cluster EKS, AWS networking (VPC peering, endpoints), cloud security and detection engineering.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const groups = articlesByCategory();
  const recent = allArticles.slice(0, 3);
  return (
    <>
      <PageHeader eyebrow="Writing" title="Build it, break it, write it down">
        {allArticles.length} write-ups on Medium and in project READMEs. Each one documents something I built: the setup,
        the failure modes and what fixed them.
      </PageHeader>

      <Container className="pb-8">
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted hover:border-line-strong hover:text-fg">
              {g.name} <span className="text-faint">{g.articles.length}</span>
            </a>
          ))}
        </nav>
      </Container>

      <Section eyebrow="Most recent">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((a) => (
            <ArticleCard key={a.url} article={a} />
          ))}
        </div>
      </Section>

      {groups.map((g) => (
        <Section key={g.id} id={g.id} eyebrow={g.name} intro={g.blurb}>
          <ul>
            {g.articles.map((a) => (
              <ArticleRow key={a.url} article={a} />
            ))}
          </ul>
        </Section>
      ))}

      <Container className="pb-14">
        <p className="font-mono text-xs text-faint">
          Full list on <ExternalLink href={site.links.medium} className="hover:text-fg">medium.com/@dyavanapellisujal7</ExternalLink>
        </p>
      </Container>
    </>
  );
}
