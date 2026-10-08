import type { Role } from "@/lib/types";

// Based on the resume; siteOnly bullets add detail the PDF doesn't have yet.
// Dates are kept exactly as written on the resume, including the overlapping
// "Present" roles. Keep this consistent with `story` in site.ts.

export const experience: Role[] = [
  {
    company: "HeyMarvin",
    role: "Platform Engineer",
    location: "Remote",
    start: "Jan 2026",
    end: "Present",
    highlights: [
      {
        siteOnly: true,
        text: "Worked with engineering teams to migrate services from AWS Elastic Beanstalk to Amazon EKS using GitOps practices. Designed reusable deployment workflows that cut onboarding time for new services and improved scalability, deployment consistency and disaster recovery readiness.",
      },
      {
        resumeOnly: true,
        metric: "60%",
        text: "Worked with engineering teams to migrate and modernize services onto Kubernetes using GitOps practices. Designed reusable deployment workflows that cut onboarding time for new services by 60% and improved scalability, deployment consistency and disaster recovery readiness.",
      },
      {
        metric: "65–70%",
        siteOnly: true,
        text: "Ran CI on self-hosted GitHub Actions runners in Kubernetes and added in-cluster build caching, making deployments 65–70% faster. Releases ship sooner and the developer feedback loop is shorter.",
      },
      {
        siteOnly: true,
        text: "Built a multi-cluster EKS platform: Terraform for the clusters, one Helm chart per service, and a hub ArgoCD reconciling every cluster through ApplicationSets.",
      },
      {
        text: "Integrated and tuned KEDA-based event-driven autoscaling for asynchronous and queue-based workloads, so they scale with variable traffic and use resources efficiently.",
      },
      {
        text: "Built reusable Helm chart templates and automated CI/CD workflows in GitHub Actions to standardize deployments across Kubernetes environments.",
      },
      {
        text: "Deployed and managed observability and monitoring for infrastructure and applications, improving visibility, incident detection and performance troubleshooting.",
      },
    ],
    tech: ["Kubernetes", "Amazon EKS", "Elastic Beanstalk", "ArgoCD", "Helm", "GitHub Actions", "KEDA", "Observability"],
  },
  {
    company: "Fixerra",
    role: "DevSecOps Engineer",
    location: "Remote",
    start: "June 2025",
    end: "Present",
    highlights: [
      {
        siteOnly: true,
        text: "Led cloud and security operations at a fintech startup. Ran containerized services on Amazon ECS and AWS App Runner.",
      },
      {
        metric: "56%",
        text: "Cut AWS costs by 56% by restructuring compute, tightening storage lifecycles and removing redundant workloads found during an infrastructure assessment.",
      },
      {
        siteOnly: true,
        metric: "≈ $0",
        text: "Built a serverless funnel-data ETL pipeline on Lambda, S3, Glue and Athena that runs at almost zero cost: compute runs only when data lands, and queries are paid per scan instead of running an always-on cluster.",
      },
      {
        resumeOnly: true,
        text: "Built and automated data analysis ETL pipelines on AWS Glue (Spark), Lambda, Athena, S3 and FastAPI for high-throughput ingestion and analytics.",
      },
      {
        text: "Supported ISO audit certification by strengthening cloud security posture, enforcing governance controls and keeping the environment compliant with organizational and regulatory standards.",
      },
      {
        text: "Designed and implemented disaster recovery strategies for resilience, failover readiness and business continuity.",
      },
      {
        text: "Tuned cloud workloads for performance, reliability and cost, and resolved operational issues across multi-service AWS environments.",
      },
    ],
    tech: ["AWS", "Amazon ECS", "AWS App Runner", "AWS Glue (Spark)", "Lambda", "Athena", "S3", "FastAPI", "Disaster Recovery"],
  },
  {
    company: "Flexiloans",
    role: "Infosec Consultant Intern",
    location: "Mumbai, IN",
    start: "Nov 2024",
    end: "Mar 2025",
    highlights: [
      {
        metric: "5+",
        text: "Led and executed 5+ cloud third-party risk management (TPRM) assessments, identifying critical vendor risks against compliance standards. This was my introduction to cloud.",
      },
      {
        text: "Supported incident response engineering with detailed root-cause investigations and incident workflow documentation.",
      },
      {
        text: "Evaluated and ran POCs for enterprise-grade DLP solutions, contributing to the data protection strategy.",
      },
    ],
    tech: ["Cloud TPRM", "Incident Response", "DLP"],
  },
  {
    company: "IIT Bombay Trust Lab",
    role: "SOC Analyst Intern",
    location: "Mumbai, IN",
    start: "Sept 2024",
    end: "Oct 2024",
    highlights: [
      { text: "Customized and deployed Wazuh SIEM to ingest and correlate logs for real-time phishing detection." },
      { text: "Built security dashboards for phishing attack visibility and alerting." },
      {
        text: "Worked with academic leadership to architect an open-source SOC lab integrating multiple detection and response tools.",
      },
    ],
    tech: ["Wazuh", "SIEM", "Detection Engineering"],
  },
];
