import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/lib/projects";
import { articlesForProject } from "@/lib/writing";
import { FlowDiagram } from "@/components/flow-diagram";
import { ButtonLink, Container, ExternalLink, Tag, TagList, formatMonth } from "@/components/ui";
import type { ReactNode } from "react";

// Static export: only the slugs returned here exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.problem} ${p.approach}`.slice(0, 300),
    keywords: p.tech,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { type: "article", title: p.title, description: p.problem, url: `/projects/${p.slug}/` },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-line py-10">
      <h2 id={`${id}-h`} className="eyebrow mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="prose-list max-w-3xl space-y-2.5 text-[0.95rem] leading-relaxed text-fg/90">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;
  const writing = articlesForProject(p.slug);

  return (
    <Container className="pt-12 pb-16 sm:pt-16">
      <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-faint">
        <Link href="/projects/" className="hover:text-fg">
          projects
        </Link>{" "}
        / <span className="text-muted">{p.slug}</span>
      </nav>

      <header className="pb-10">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{p.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg/90">{cs.overview}</p>
        <p className="mt-4 max-w-3xl rounded-md border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted">
          <span className="font-mono text-xs text-faint">scope: </span>
          {cs.scope}
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <ButtonLink href={p.repoUrl} variant="primary" external>
            Source on GitHub
          </ButtonLink>
          {p.homepage && (
            <ButtonLink href={p.homepage} external>
              Live demo
            </ButtonLink>
          )}
          {writing.map((a) => (
            <ButtonLink key={a.url} href={a.url} external>
              {a.source === "github" ? "Write-up" : "Article"}
            </ButtonLink>
          ))}
        </div>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-[8rem_1fr]">
          <dt className="font-mono text-xs text-faint sm:pt-1">technologies</dt>
          <dd>
            <TagList items={p.tech} label="Technologies" />
          </dd>
          <dt className="font-mono text-xs text-faint sm:pt-1">concepts</dt>
          <dd className="flex flex-wrap gap-1.5">
            {p.concepts.map((c) => (
              <Tag key={c} tone="accent">
                {c}
              </Tag>
            ))}
          </dd>
          {p.pushedAt && (
            <>
              <dt className="font-mono text-xs text-faint">last pushed</dt>
              <dd className="font-mono text-xs text-muted">{formatMonth(p.pushedAt)}</dd>
            </>
          )}
        </dl>
      </header>

      <Block id="problem" title="Problem">
        <Bullets items={cs.problem} />
        {p.why && (
          <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
            <span className="font-medium text-fg">Why I built it: </span>
            {p.why}
          </p>
        )}
      </Block>

      <Block id="architecture" title="Architecture">
        <FlowDiagram flow={cs.architecture} />
        {cs.architectureNotes && (
          <div className="mt-5">
            <Bullets items={cs.architectureNotes} />
          </div>
        )}
        {cs.image && (
          <figure className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cs.image.src}
              alt={cs.image.alt}
              width={cs.image.width}
              height={cs.image.height}
              loading="lazy"
              decoding="async"
              className={`mx-auto h-auto rounded-md border border-line bg-white/[0.02] ${cs.image.height > cs.image.width ? "max-w-md" : "w-full"}`}
            />
            {cs.image.caption && <figcaption className="mt-2 text-center font-mono text-xs text-faint">{cs.image.caption}</figcaption>}
          </figure>
        )}
      </Block>

      <Block id="implementation" title="Implementation">
        <Bullets items={cs.implementation} />
      </Block>

      <Block id="decisions" title="Engineering decisions">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="w-2/5 px-4 py-2.5 font-mono text-xs font-normal text-faint">
                  decision
                </th>
                <th scope="col" className="px-4 py-2.5 font-mono text-xs font-normal text-faint">
                  tradeoff
                </th>
              </tr>
            </thead>
            <tbody>
              {cs.decisions.map((d) => (
                <tr key={d.decision} className="border-t border-line align-top">
                  <td className="px-4 py-3 font-medium text-fg">{d.decision}</td>
                  <td className="px-4 py-3 leading-relaxed text-muted">{d.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block id="challenges" title="Challenges">
        <dl className="grid gap-5 md:grid-cols-2">
          {cs.challenges.map((c) => (
            <div key={c.title} className="card p-4">
              <dt className="text-[0.95rem] font-medium text-fg">{c.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{c.detail}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="results" title="Results">
        <Bullets items={cs.results} />
      </Block>

      <Block id="lessons" title="Lessons learned">
        <Bullets items={cs.lessons} />
      </Block>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-xs">
        <Link href="/projects/" className="text-muted hover:text-fg">
          ← all projects
        </Link>
        <ExternalLink href={p.repoUrl} className="text-muted hover:text-fg">
          {p.repoUrl.replace("https://", "")}
        </ExternalLink>
      </footer>
    </Container>
  );
}
