import type { Metadata } from "next";
import Link from "next/link";
import { achievements, education, site, story } from "@/content/site";
import { Container, ExternalLink, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sujal Dyavanapelli, a platform and DevOps engineer who works close to infrastructure: Linux, networking, Kubernetes, cloud, automation, reliability and security.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="I like working close to the infrastructure." />

      <Container className="pb-14">
        <div className="max-w-2xl space-y-5 text-[0.98rem] leading-relaxed text-fg/90">
          <p>
            I&apos;m a DevOps and platform engineer, and everything I do is cloud: AWS and GCP networking, IAM, serverless
            pipelines, cost and disaster recovery. Inside that, most of my work is container orchestration. Mainly that
            means Kubernetes (EKS, GKE): moving services onto it, packaging them with Helm, delivering them with GitOps,
            and making them scale on the right signal. At Fixerra I ran services on Amazon ECS and AWS App Runner; at
            HeyMarvin I moved services from Elastic Beanstalk to EKS. So I know where a managed service is enough and
            where Kubernetes earns its complexity.
          </p>
          <p>
            Networking is the part I enjoy most, and a lot of my work keeps coming back to it: segmenting a home lab
            behind pfSense, peering VPCs across AWS accounts, keeping S3 traffic off the internet with endpoints,
            blocking an attacker at the NACL. Once the network layer is clear, the systems built on top of it get much
            easier to reason about.
          </p>
          <p>
            Security came first. My degree is in computer science with a cybersecurity specialization, and my first
            hands-on work was a segmented SOC home lab, IDS rules and SIEM detections. That background shows up in how I
            build platforms: least privilege per workload, policy as code, and automated containment where the signal is
            strong enough to trust.
          </p>
          <p>
            I learn by building. Most things on this site started as a lab I set up, broke and debugged, then wrote up
            on{" "}
            <ExternalLink href={site.links.medium}>Medium</ExternalLink> or in a repository README so someone else can
            reproduce it. The write-ups describe the failures as well as the fixes, such as a Terraform apply that hangs on
            CoreDNS or a Celery prefetch setting that hides a queue from KEDA.
          </p>
        </div>
      </Container>

      <Section eyebrow="Interests" title="What I keep coming back to">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            ["Linux", "Processes, systemd, cgroups and namespaces, and debugging from the host up: resources, logs, strace, /proc."],
            ["Networking", "Packet paths, routing, NAT, firewalls and DNS, from VPCs down to container networking."],
            ["Virtualization", "VMware and VirtualBox for multi-VM labs: segmented networks, a firewall in the middle, and sensors watching the traffic."],
            ["Container orchestration", "Kubernetes first, plus ECS and App Runner: scheduling, autoscaling, GitOps delivery and the ordering problems that come with them."],
            ["Cloud platforms", "AWS and GCP as building blocks: event-driven, least-privilege, cost-aware."],
            ["Automation", "Terraform, Helm and CI pipelines that make the safe path the default path."],
            ["Reliability", "Observability, disaster recovery, and failure modes that only show up under real load."],
            ["Security", "Cloud posture, detection and automated response, built into the platform."],
          ].map(([t, d]) => (
            <div key={t}>
              <dt className="text-[0.95rem] font-medium text-fg">{t}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Path" title="How I got here">
        <ol className="space-y-4">
          {story.map((s) => (
            <li key={s.stage} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <p className="font-mono text-xs text-faint sm:pt-1">{s.period}</p>
              <div>
                <h3 className="text-[0.95rem] font-medium text-fg">
                  <Link href={s.href} className="hover:text-accent">
                    {s.stage}
                  </Link>
                </h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Education & achievements" title="Background">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card p-5">
            <p className="font-mono text-xs text-faint">{education.date}</p>
            <h3 className="mt-1 text-[0.95rem] font-medium text-fg">{education.school}</h3>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              Specialization: {education.specialization} · {education.grade}
            </p>
          </div>
          {achievements.map((a) => (
            <div key={a.title} className="card p-5">
              <p className="font-mono text-xs text-faint">{a.date}</p>
              <h3 className="mt-1 text-[0.95rem] font-medium text-fg">{a.title}</h3>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
