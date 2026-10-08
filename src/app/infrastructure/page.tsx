import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/content/domains";
import { Container, PageHeader, Tag, TagList } from "@/components/ui";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "How Sujal Dyavanapelli approaches Kubernetes, networking, cloud architecture, infrastructure as code, Linux, security, observability and distributed systems, with links to the projects and write-ups behind each.",
  alternates: { canonical: "/infrastructure/" },
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHeader eyebrow="Infrastructure" title="How I think about the stack">
        For each area: the working principles I use, the concepts and tools involved, and the projects, roles or
        write-ups where I actually applied them.
      </PageHeader>

      <Container className="pb-6">
        <nav aria-label="Domains" className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <a key={d.id} href={`#${d.id}`} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted hover:border-line-strong hover:text-fg">
              {d.title}
            </a>
          ))}
        </nav>
      </Container>

      {domains.map((d) => (
        <section key={d.id} id={d.id} aria-labelledby={`${d.id}-h`} className="border-t border-line py-12">
          <Container className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id={`${d.id}-h`} className="text-xl font-semibold tracking-tight text-fg">
                {d.title}
              </h2>
              <ul className="prose-list mt-5 space-y-3 text-[0.95rem] leading-relaxed text-fg/90">
                {d.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              {d.conceptGroups ? (
                <div className="space-y-3">
                  {d.conceptGroups.map((g) => (
                    <div key={g.name}>
                      <p className="eyebrow mb-1.5">{g.name}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((c) => (
                          <li key={c}>
                            <Tag tone="accent">{c}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="eyebrow mb-2">concepts</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {d.concepts.map((c) => (
                      <li key={c}>
                        <Tag tone="accent">{c}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="eyebrow mb-2">tools</p>
                <TagList items={d.tech} label={`${d.title} tools`} />
              </div>
              <div>
                <p className="eyebrow mb-2">evidence</p>
                <ul className="space-y-1.5 text-sm">
                  {d.evidence.map((e) => (
                    <li key={e.label}>
                      <Link href={e.href} className="link text-muted">
                        {e.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
