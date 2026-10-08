import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { achievements, education } from "@/content/site";
import { RoleEntry } from "@/components/cards";
import { ButtonLink, Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Platform Engineer at HeyMarvin (Elastic Beanstalk to EKS migration, multi-cluster EKS, GitOps, KEDA), DevSecOps Engineer at Fixerra (cloud and security operations, ECS and App Runner, 56% AWS cost reduction, ISO audit, DR), and security internships at Flexiloans and IIT Bombay Trust Lab.",
  alternates: { canonical: "/experience/" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Platform, DevOps and security roles">
        What I did in each role, with measurable outcomes highlighted. The resume page has the PDF version.
      </PageHeader>

      <Container className="pb-6">
        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href="/resume/">View resume</ButtonLink>
          <ButtonLink href="/Sujal_Dyavanapelli_Resume.pdf" download="Sujal_Dyavanapelli_Resume.pdf">
            Download PDF
          </ButtonLink>
        </div>
      </Container>

      <Section>
        <div>
          {experience.map((r) => (
            <RoleEntry key={r.company} role={r} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Education" title={education.school}>
        <p className="text-sm text-muted">
          {education.degree} · Specialization: {education.specialization} · {education.grade} · {education.date}
        </p>
        <ul className="mt-6 space-y-1 text-sm text-fg/90">
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
