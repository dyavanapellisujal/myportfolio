import type { Metadata } from "next";
import Link from "next/link";
import { achievements, education, resumeProjects, site, skills } from "@/content/site";
import { experience } from "@/content/experience";
import { ButtonLink, Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Sujal Dyavanapelli, DevOps / Platform Engineer: Kubernetes (EKS, GKE), GitOps, Helm, ArgoCD, KEDA, Terraform, AWS, GCP and cloud security. View online or download the PDF.",
  alternates: { canonical: "/resume/" },
};

// The PDF is what gets sent to recruiters; this page is a viewer plus an
// accessible, indexable HTML version of the same content.

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Resume" title={`${site.name} — ${site.role}`}>
        The PDF is the canonical version. An HTML copy of the same content follows below.
      </PageHeader>

      <Container className="pb-8">
        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href={site.resumePdf} variant="primary" external>
            View resume
          </ButtonLink>
          <ButtonLink href={site.resumePdf} download="Sujal_Dyavanapelli_Resume.pdf">
            Download PDF
          </ButtonLink>
        </div>
      </Container>

      <Container className="pb-12">
        {/* Desktop browsers render the PDF inline; mobile browsers fall back to the link. */}
        <object
          data={`${site.resumePdf}#view=FitH`}
          type="application/pdf"
          aria-label="Resume PDF"
          className="hidden h-[85vh] w-full rounded-lg border border-line bg-surface md:block"
        >
          <p className="p-6 text-sm text-muted">
            Your browser can&apos;t display the PDF inline.{" "}
            <a href={site.resumePdf} className="link">
              Open the resume
            </a>
            .
          </p>
        </object>
        <p className="text-sm text-muted md:hidden">
          Inline PDF preview is hidden on small screens. Use <span className="text-fg">View resume</span> above, or read the
          text version below.
        </p>
      </Container>

      <Section id="text" eyebrow="Text version" title="Profile summary">
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-fg/90">
          Cloud and platform engineer building, automating and securing cloud-native infrastructure on AWS and GCP. Most of
          my work is container orchestration, mainly Kubernetes (EKS, GKE), along with Amazon ECS and AWS App Runner:
          migrating services, packaging them with Helm, delivering them with GitOps and scaling them on the right signal.
          Experienced in cloud cost optimization, disaster recovery and security governance, with a cybersecurity
          background that shapes how I build platforms: least privilege, policy as code and automated response.
        </p>
      </Section>

      <Section eyebrow="Education">
        <p className="text-[0.95rem] text-fg">
          {education.school} <span className="font-mono text-xs text-faint">· {education.date}</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          {education.degree} · Specialization: {education.specialization} · {education.grade}
        </p>
      </Section>

      <Section id="skills" eyebrow="Skills">
        <dl className="space-y-3">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="text-sm font-medium text-fg">{s.group}</dt>
              <dd className="text-sm text-muted">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Work experience">
        <div className="space-y-8">
          {experience.map((r) => (
            <div key={r.company}>
              <h3 className="text-[0.95rem] font-medium text-fg">
                {r.company}, {r.location} — {r.role}{" "}
                <span className="font-mono text-xs font-normal text-faint">
                  {r.start} – {r.end}
                </span>
              </h3>
              <ul className="prose-list mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
                {r.highlights.filter((h) => !h.siteOnly).map((h) => (
                  <li key={h.text}>{h.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Personal projects">
        <div className="space-y-6">
          {resumeProjects.map((p) => (
            <div key={p.slug}>
              <h3 className="text-[0.95rem] font-medium text-fg">
                <Link href={`/projects/${p.slug}/`} className="hover:text-accent">
                  {p.title}
                </Link>
              </h3>
              <ul className="prose-list mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
                {p.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Achievements">
        <ul className="text-sm text-fg/90">
          {achievements.map((a) => (
            <li key={a.title}>
              {a.title} <span className="font-mono text-xs text-faint">· {a.date}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
