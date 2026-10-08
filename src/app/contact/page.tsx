import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, ExternalLink, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sujal Dyavanapelli, DevOps / Platform Engineer, by email, LinkedIn, GitHub or Medium.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const channels = [
    { label: "LinkedIn", value: "in/dyavanapelli-sujal-409766249", href: site.links.linkedin, note: "Best for messages." },
    { label: "GitHub", value: "github.com/dyavanapellisujal", href: site.links.github, note: "Source for every project on this site." },
    { label: "Medium", value: "medium.com/@dyavanapellisujal7", href: site.links.medium, note: "Long-form write-ups." },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch">
        Always glad to talk platform engineering, Kubernetes and cloud infrastructure, or to go deeper on
        any of the projects here.
      </PageHeader>

      <Container className="pb-20">
        <dl className="max-w-2xl divide-y divide-line overflow-hidden rounded-lg border border-line">
          {site.email && (
            <div className="grid gap-1 bg-surface p-5 sm:grid-cols-[7rem_1fr]">
              <dt className="font-mono text-xs text-faint sm:pt-1">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </dd>
            </div>
          )}
          {channels.map((c) => (
            <div key={c.label} className="grid gap-1 bg-surface p-5 sm:grid-cols-[7rem_1fr]">
              <dt className="font-mono text-xs text-faint sm:pt-1">{c.label}</dt>
              <dd>
                <ExternalLink href={c.href}>{c.value}</ExternalLink>
                <p className="mt-1 text-sm text-muted">{c.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
