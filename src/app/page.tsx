import Link from "next/link";
import { site, stack, story } from "@/content/site";
import { experience } from "@/content/experience";
import { featuredProjects } from "@/lib/projects";
import { latestArticles } from "@/lib/writing";
import { ArticleCard, FeaturedProjectCard, RoleEntry } from "@/components/cards";
import { ButtonLink, Container, MoreLink, Section } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="eyebrow mb-4">{site.role}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{site.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/90 sm:text-xl">{site.positioning}</p>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{site.intro}</p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <ButtonLink href={site.links.github} variant="primary" external>
            GitHub
          </ButtonLink>
          <ButtonLink href={site.links.linkedin} external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.medium} external>
            Medium
          </ButtonLink>
          <ButtonLink href="/resume/">Resume</ButtonLink>
        </div>
      </Container>

      {/* Stack */}
      <Section eyebrow="Stack" title="What I work with" action={<MoreLink href="/infrastructure/">how I use it</MoreLink>}>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {stack.map((row) => (
            <div key={row.layer} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-3 border-b border-line/70 pb-3">
              <dt className="font-mono text-xs text-faint">{row.layer}</dt>
              <dd className="text-sm text-fg/90">{row.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Selected work */}
      <Section
        eyebrow="Selected engineering work"
        title="Systems I've built and documented"
        intro="Each one has its source on GitHub and a case study covering the architecture, the decisions and what broke along the way."
        action={<MoreLink href="/projects/">all projects</MoreLink>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <FeaturedProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* Path */}
      <Section
        eyebrow="Path"
        title="From security to platform engineering"
        intro="Security came first and stayed with me. It's now one part of how I build infrastructure."
      >
        <ol className="relative grid gap-0 border-l border-line pl-6">
          {story.map((s) => (
            <li key={s.stage} className="relative pb-6 last:pb-0">
              <span aria-hidden className="absolute -left-[1.72rem] top-1.5 h-2 w-2 rounded-full border border-accent bg-bg" />
              <p className="font-mono text-xs text-faint">{s.period}</p>
              <h3 className="mt-0.5 text-[0.95rem] font-medium text-fg">
                <Link href={s.href} className="hover:text-accent">
                  {s.stage}
                </Link>
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{s.text}</p>
              {"points" in s && (
                <ul className="prose-list mt-2 max-w-2xl space-y-1.5 text-sm leading-relaxed text-muted">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* Experience */}
      <Section eyebrow="Experience" title="Where I've worked" action={<MoreLink href="/experience/">full experience</MoreLink>}>
        <div>
          {experience.map((r) => (
            <RoleEntry key={r.company} role={r} compact />
          ))}
        </div>
      </Section>

      {/* Writing */}
      <Section
        eyebrow="Writing"
        title="Latest write-ups"
        intro="I write up what I build: the setup, what failed, and the fix."
        action={<MoreLink href="/writing/">all writing</MoreLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles(3).map((a) => (
            <ArticleCard key={a.url} article={a} />
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section eyebrow="Contact" title="Get in touch">
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
          Always glad to talk platform engineering, Kubernetes and cloud infrastructure. Reach me at{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>{" "}
          or on{" "}
          <a href={site.links.linkedin} className="link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          ; everything I&apos;ve built is on{" "}
          <a href={site.links.github} className="link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
        <div className="mt-6">
          <MoreLink href="/contact/">contact details</MoreLink>
        </div>
      </Section>
    </>
  );
}
