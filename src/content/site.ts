// Identity, links and resume-derived facts. Source of truth: the resume PDF in
// /public. Keep wording here consistent with it.

export const site = {
  name: "Sujal Dyavanapelli",
  role: "DevOps / Platform Engineer",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sujal-dyavanapelli.vercel.app").replace(/\/$/, ""),
  positioning:
    "Cloud and platform engineer building reliable Kubernetes and cloud infrastructure across AWS and GCP.",
  intro:
    "I work on Kubernetes platforms, GitOps delivery, event-driven autoscaling and cloud security. Most of what I know I learned by building a system, breaking it, debugging it and writing down what happened. The repositories and write-ups linked here are the evidence.",
  description:
    "Sujal Dyavanapelli — DevOps and Platform Engineer working on Kubernetes (EKS, GKE), GitOps with ArgoCD and Helm, KEDA event-driven autoscaling, Terraform and cloud security on AWS and GCP.",
  keywords: [
    "Sujal Dyavanapelli",
    "DevOps Engineer",
    "Platform Engineer",
    "Cloud Engineer",
    "Kubernetes Engineer",
    "AWS Engineer",
    "GCP Engineer",
    "DevSecOps Engineer",
    "Cloud Security",
    "Kubernetes",
    "EKS",
    "GKE",
    "Terraform",
    "Docker",
    "ArgoCD",
    "Helm",
    "KEDA",
    "Linux",
    "Platform Engineering",
  ],
  email: "sujaldyavanapelli80@gmail.com" as string,
  resumePdf: "/Sujal_Dyavanapelli_Resume.pdf",
  links: {
    github: "https://github.com/dyavanapellisujal",
    linkedin: "https://www.linkedin.com/in/dyavanapelli-sujal-409766249/",
    medium: "https://medium.com/@dyavanapellisujal7",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/infrastructure/", label: "Infrastructure" },
  { href: "/writing/", label: "Writing" },
  { href: "/resume/", label: "Resume" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Headline numbers. Every one is stated on the resume; context says where. */
export const metrics = [
  { value: "60%", label: "less onboarding time for new services", context: "Kubernetes + GitOps deployment workflows · HeyMarvin" },
  { value: "56%", label: "AWS cost reduction", context: "Compute, storage lifecycle and workload clean-up · Fixerra" },
  { value: "<10 min", label: "average incident containment", context: "Automated GuardDuty → Lambda remediation · project" },
  { value: "5+", label: "cloud TPRM assessments led", context: "Third-party vendor risk · Flexiloans" },
] as const;

/** Skills exactly as grouped on the resume. */
export const skills = [
  { group: "Programming & Automation", items: ["Python (FastAPI)", "Bash", "Terraform"] },
  {
    group: "Cloud & Platform Engineering",
    items: [
      "AWS",
      "GCP",
      "Kubernetes (GKE, EKS)",
      "Docker",
      "Helm",
      "ArgoCD",
      "GitHub Actions",
      "GitOps",
      "Infrastructure as Code",
      "Blue-Green Deployments",
      "Disaster Recovery Strategies",
      "Containerized Microservices",
    ],
  },
  {
    group: "Event-Driven & Distributed Systems",
    items: ["KEDA", "Celery", "Event-Driven Workloads"],
  },
  {
    group: "Observability & Reliability",
    items: ["Application Performance Monitoring (New Relic, CubeAPM)", "Infrastructure Monitoring"],
  },
  {
    group: "Network & Cloud Security",
    items: ["Linux", "Network Hardening", "VPC Security", "Security Groups", "NACLs", "Load Balancing", "DNS"],
  },
] as const;

/** Compact stack for the home page. */
export const stack = [
  { layer: "orchestration", items: ["Kubernetes", "EKS", "GKE", "Helm", "ArgoCD", "KEDA", "ECS", "App Runner"] },
  { layer: "cloud", items: ["AWS", "GCP", "Lambda", "EventBridge", "GuardDuty", "IAM"] },
  { layer: "iac / ci", items: ["Terraform", "GitHub Actions", "GitOps", "Docker"] },
  { layer: "systems", items: ["Linux", "Bash", "Python", "FastAPI", "Celery"] },
  { layer: "virtualization", items: ["VMware", "VirtualBox"] },
  { layer: "network / security", items: ["VPC", "Security Groups", "NACLs", "DNS", "Load Balancing", "OPA"] },
  { layer: "observability", items: ["New Relic", "CubeAPM"] },
] as const;

export const education = {
  school: "Thakur College of Engineering and Technology",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  specialization: "Cybersecurity",
  grade: "CGPA 9.15",
  date: "May 2026",
};

export const achievements = [{ title: "Top 5 Finalist — Smart India Hackathon 2023", date: "Dec 2023" }];

/**
 * The career arc, each step tied to something verifiable.
 * Links point at pages on this site.
 */
export const story = [
  {
    stage: "Security foundation",
    period: "2023 – 2024",
    text: "B.Tech with a cybersecurity specialization. Built a segmented SOC home lab (pfSense, Suricata, Splunk), wrote detection rules, and deployed Wazuh SIEM at IIT Bombay Trust Lab.",
    href: "/writing/#detection-soc",
  },
  {
    stage: "Cloud",
    period: "2024 – 2025",
    text: "Infosec Consultant Intern at Flexiloans. Cloud vendor security (TPRM) assessments were my introduction to cloud. From there I went hands-on with AWS: VPC endpoints and peering, WAF on ALB, STS and KMS, each built and documented. I also scripted IAM audits and started writing infrastructure in Terraform.",
    href: "/writing/#networking",
  },
  {
    stage: "DevOps / DevSecOps",
    period: "2025",
    text: "DevSecOps Engineer at Fixerra, a fintech startup, where I led cloud and security operations.",
    points: [
      "Ran containerized services on AWS with Amazon ECS and AWS App Runner.",
      "Cut AWS costs by 56% by restructuring compute, tightening storage lifecycles and removing redundant workloads.",
      "Built a serverless funnel-data ETL pipeline (Lambda, S3, Glue, Athena) that runs at almost zero cost.",
      "Supported ISO audit certification and designed disaster recovery strategies.",
      "On the side: serverless incident response and a real-time CSPM, both open source.",
    ],
    href: "/experience/",
  },
  {
    stage: "Platform engineering",
    period: "2026",
    text: "Platform Engineer at HeyMarvin. Each piece below was built there, then rebuilt as a public, runnable version with a write-up of the tradeoffs.",
    points: [
      "Migrated services from AWS Elastic Beanstalk to Amazon EKS, delivered with GitOps, reusable Helm charts and GitHub Actions workflows.",
      "Built a multi-cluster EKS platform (Terraform + Helm + ArgoCD ApplicationSets). Tradeoffs written up: three repos vs a monorepo, one ArgoCD hub vs one per cluster, Pod Identity vs node roles.",
      "Built self-hosted CI runners on Kubernetes with in-cluster caching, making deployments 65–70% faster, and measured which cache actually buys which seconds.",
      "Built event-driven, scale-to-zero Celery workers with KEDA, scaling on queue depth instead of CPU. Runnable demo on kind, plus a blog on ScaledJob vs ScaledObject, keeping a baseline worker, prefetch hiding the backlog, and retries that break at zero.",
    ],
    href: "/projects/",
  },
] as const;

/** Project section exactly as it appears on the resume (used by /resume). */
export const resumeProjects = [
  {
    title: "OpsMemory – AI-Powered Engineering Memory Platform",
    slug: "opsmemory",
    points: [
      "Engineered an AI memory platform using Python, FastAPI, Cognee, PostgreSQL (pgvector), and Kuzu, enabling AI agents to continuously learn from war room meetings, incidents, runbooks and engineering documentation.",
      "Built a hybrid vector + knowledge graph retrieval engine that transforms incident evidence into persistent organizational memory, auto-generates living incident documentation, captures operational lessons, and provides cited, context-aware responses for future troubleshooting.",
    ],
  },
  {
    title: "Automated Serverless Incident Response Workflow on AWS",
    slug: "aws-automated-incident-response",
    points: [
      "Built a serverless incident response pipeline using GuardDuty, EventBridge, SNS, and Lambda (Python).",
      "Simulated IAM credential compromise scenarios and automated remediation using infrastructure as code.",
      "Achieved an average containment time of under 10 minutes, reducing manual triage efforts.",
    ],
  },
  {
    title: "Real-Time Cloud Security Posture Management (CSPM) System",
    slug: "serverless-cspm",
    points: [
      "Designed and implemented a comprehensive CSPM solution using AWS Lambda, EventBridge, SQS, and MongoDB for real-time S3 bucket security monitoring and compliance assessment.",
      "Integrated Open Policy Agent (OPA) for Policy-as-Code enforcement, automatically evaluating S3 bucket configurations against security policies and generating risk assessments.",
      "Developed automated security auditing pipeline that captures S3 events, analyzes bucket configurations (encryption, ACLs, public access), and stores findings in MongoDB with real-time dashboard visualization using React and Flask.",
      "Implemented serverless architecture with Python Lambda functions, ensuring scalable security monitoring.",
      "Created modular Terraform infrastructure-as-code templates, enabling seamless deployment and integration into existing AWS environments with minimal configuration overhead and standardized resource provisioning.",
    ],
  },
] as const;
