import type { Article, WritingCategory } from "@/lib/types";

// Curated article metadata. Summaries are written from the article text.
// Newer posts are picked up from data/medium-feed.json (npm run sync:medium);
// add an entry here to give a new post a proper category and summary.

const M = "https://medium.com/@dyavanapellisujal7";

export const categoryOrder: { name: WritingCategory; id: string; blurb: string }[] = [
  { name: "Kubernetes & Platform", id: "platform", blurb: "CI on Kubernetes, autoscaling, multi-cluster GitOps, platform tooling." },
  { name: "Networking", id: "networking", blurb: "VPC connectivity, private endpoints, container networking." },
  { name: "Cloud Security", id: "cloud-security", blurb: "AWS identity, encryption, edge protection and automated response." },
  { name: "Detection & SOC", id: "detection-soc", blurb: "Home SOC lab, IDS rules, SIEM detections, SOAR." },
  { name: "Windows & Active Directory", id: "active-directory", blurb: "Domain policy and access control." },
  { name: "Forensics Labs", id: "forensics", blurb: "Challenge walkthroughs." },
];

export const articles: Article[] = [
  // Kubernetes & Platform
  {
    url: `${M}/your-self-hosted-github-runners-are-slow-because-theyre-supposed-to-be-d0a92696458e`,
    title: "Your Self-Hosted GitHub Runners Are Slow Because They’re Supposed to Be",
    date: "2026-09-03",
    category: "Kubernetes & Platform",
    source: "medium",
    cover: "/images/writing/self-hosted-runners.jpg",
    related: "self-hosted-github-runners-caching",
    summary:
      "Why ARC runners rebuild from scratch (a fresh pod is a fresh disk), and the two in-cluster fixes: a remote BuildKit daemon on a PVC for Docker layers and an Actions cache server for actions/cache. Covers the silent failure modes and measured cold vs warm builds.",
  },
  {
    url: "https://github.com/dyavanapellisujal/queue-based-scaling-using-keda-kubernetes/blob/main/blog/blog.md",
    title: "Event-Driven, Scale-to-Zero Background Processing on Kubernetes",
    date: "2026-08-26",
    category: "Kubernetes & Platform",
    source: "github",
    related: "keda-scale-to-zero-workers",
    summary:
      "Why queue depth, not CPU, is the scaling signal for workers. KEDA with Karpenter, ScaledJob vs ScaledObject, and eleven settings that break scale-to-zero, from prefetch hiding the backlog to activationListLength.",
  },
  {
    url: "https://github.com/dyavanapellisujal/GitOps-Driven-Multi-Cluster-EKS-Platform#readme",
    title: "A Platform Engineering Blueprint for Multi-Cluster Kubernetes on Amazon EKS",
    date: "2026-07-20",
    category: "Kubernetes & Platform",
    source: "github",
    related: "multi-cluster-eks-gitops",
    summary:
      "Terraform, Helm and a two-layer ArgoCD ApplicationSet model, with the tradeoff behind each decision: one codebase with many tfvars, CoreDNS dependency ordering, Pod Identity, a self-protecting Karpenter, and a hub-and-spoke ArgoCD.",
  },
  {
    url: `${M}/from-tribal-knowledge-to-cognitive-architecture-building-opsmemory-with-cognee-12838bb84f3e`,
    title: "From Tribal Knowledge to Cognitive Architecture: Building OpsMemory with Cognee",
    date: "2026-07-04",
    category: "Kubernetes & Platform",
    source: "medium",
    cover: "/images/writing/opsmemory-cognee.jpg",
    related: "opsmemory",
    summary:
      "Building OpsMemory for a hackathon: why plain RAG fell short for incident knowledge, how Cognee's remember/recall/improve/forget model became the core, why PostgreSQL + pgvector stays the citable source of truth, and capturing meeting knowledge with Recall.ai.",
  },

  // Networking
  {
    url: `${M}/secure-cross-account-vpc-communication-in-aws-using-peering-connections-2b3a28829fde`,
    title: "Secure Cross-Account VPC Communication in AWS Using Peering Connections",
    date: "2025-05-23",
    category: "Networking",
    source: "medium",
    cover: "/images/writing/cross-account-vpc-peering.jpg",
    related: "cross-account-vpc-peering",
    summary:
      "When to use peering instead of PrivateLink, then a cross-account setup that accepts the request through an IAM role in the acceptor account, plus route tables, NACLs and security groups, flow logs, specific routes, no transitive peering and DNS resolution controls.",
  },
  {
    url: `${M}/securely-connecting-s3-to-vpc-via-gateway-endpoint-in-aws-e43e26f812d2`,
    title: "Securely Connecting S3 to VPC via Gateway Endpoint in AWS",
    date: "2025-02-20",
    category: "Networking",
    source: "medium",
    cover: "/images/writing/s3-gateway-endpoint.jpg",
    summary:
      "Interface vs gateway endpoints, then a private EC2 instance reaching S3 through a gateway endpoint with no internet path, which also avoids data-transfer charges.",
  },
  {
    url: `${M}/docker-macvlan-and-ipvlan-explained-advanced-networking-guide-b3ba20bc22e4`,
    title: "Docker MacVLAN and IPVLAN Explained: Advanced Networking Guide",
    date: "2025-02-18",
    category: "Networking",
    source: "medium",
    cover: "/images/writing/docker-macvlan-ipvlan.jpg",
    summary:
      "Giving containers addresses on the physical network: MacVLAN at layer 2 and IPVLAN in L3 mode, with the commands to build each and how they differ from published ports.",
  },

  // Cloud Security
  {
    url: `${M}/serverless-incident-response-workflow-on-aws-using-guardduty-eventbridge-sns-lambda-b24914b96581`,
    title: "Serverless Incident Response Workflow on AWS Using GuardDuty, EventBridge, SNS & Lambda",
    date: "2025-04-06",
    category: "Cloud Security",
    source: "medium",
    cover: "/images/writing/serverless-incident-response.jpg",
    related: "aws-automated-incident-response",
    summary:
      "Simulating SSRF theft of EC2 instance credentials, detecting their use outside AWS with GuardDuty, and containing it automatically: NACL block, IMDSv2 enforcement, IAM role swap to invalidate credentials, and an SNS report.",
  },
  {
    url: `${M}/understanding-aws-sts-temporary-credentials-made-simple-7d3947804609`,
    title: "Understanding AWS STS: Temporary Credentials Made Simple",
    date: "2025-02-03",
    category: "Cloud Security",
    source: "medium",
    cover: "/images/writing/aws-sts.jpg",
    summary:
      "Assuming roles for temporary credentials: trust relationship policies, an external-auditor scenario, use in CI/CD pipelines, and calling AssumeRole from Python with boto3.",
  },
  {
    url: `${M}/aws-s3-encryption-with-customer-managed-keys-using-sse-kms-for-secure-object-storage-045f6fddeea5`,
    title: "AWS S3 Encryption with Customer Managed Keys: Using SSE-KMS",
    date: "2025-02-01",
    category: "Cloud Security",
    source: "medium",
    cover: "/images/writing/s3-sse-kms.jpg",
    summary:
      "S3 server-side encryption options, how SSE-KMS works with a customer-managed key, writing the key policy, applying default bucket encryption from the CLI, testing access, and the drawbacks.",
  },
  {
    url: `${M}/understanding-and-configuring-cors-in-aws-s3-with-examples-c9698ad686b3`,
    title: "Understanding and Configuring CORS in AWS S3 (With Examples)",
    date: "2025-01-10",
    category: "Cloud Security",
    source: "medium",
    cover: "/images/writing/s3-cors.jpg",
    summary:
      "The same-origin policy, how preflight requests work, and configuring S3 CORS between two static-website buckets to see the browser behaviour first-hand.",
  },
  {
    url: `${M}/implementing-aws-waf-on-an-application-load-balancer-89000edb439d`,
    title: "Implementing AWS WAF on an Application Load Balancer",
    date: "2024-12-08",
    category: "Cloud Security",
    source: "medium",
    cover: "/images/writing/aws-waf-alb.jpg",
    summary:
      "An EC2 web app in a private subnet behind an internet-facing ALB, with AWS WAF attached and a custom rule that blocks a specific source IP.",
  },

  // Detection & SOC
  {
    url: `${M}/soar-automation-lab-0647dd636011`,
    title: "SOAR Automation Lab",
    date: "2024-11-21",
    category: "Detection & SOC",
    source: "medium",
    summary: "A Security Orchestration, Automation and Response (SOAR) lab built to detect endpoint attacks with an EDR tool and automate the response.",
  },
  {
    url: `${M}/developing-suricata-rules-for-detectiing-nmap-scans-bae19c652683`,
    title: "Developing Suricata Rules for Detecting Nmap Scans",
    date: "2024-11-05",
    category: "Detection & SOC",
    source: "medium",
    related: "suricata-nmap-rules",
    summary: "How Nmap port-scanning techniques look on the wire, and writing Suricata signatures with thresholds to detect them.",
  },
  {
    url: `${M}/detecting-kerberoasting-with-honeypot-and-splunk-d10dfc0c4dd5`,
    title: "Detecting Kerberoasting Attack with Honeypot and Splunk",
    date: "2024-08-24",
    category: "Detection & SOC",
    source: "medium",
    summary:
      "The Kerberos ticket flow, how Kerberoasting abuses it, and detecting it with a honeypot service account and Windows event logs in Splunk.",
  },
  {
    url: `${M}/detecting-password-spraying-attacks-in-active-directory-environment-39e5088288f4`,
    title: "Detecting Password Spraying Attacks in Active Directory",
    date: "2024-08-16",
    category: "Detection & SOC",
    source: "medium",
    summary: "Running a password spraying attack in a lab Active Directory domain and detecting it in Splunk from Windows event logs.",
  },
  {
    url: `${M}/soc-home-lab-part-3-8832e8325e80`,
    title: "SOC Home Lab — Part 3: Splunk",
    date: "2024-07-23",
    category: "Detection & SOC",
    source: "medium",
    summary: "Installing Splunk on the analyst machine and ingesting Suricata alerts (monitor and forward methods), then generating data with an Nmap SYN scan.",
  },
  {
    url: `${M}/soc-home-lab-part-2-2a0e1f3cdca6`,
    title: "SOC Home Lab — Part 2: pfSense and Suricata",
    date: "2024-07-23",
    category: "Detection & SOC",
    source: "medium",
    summary: "pfSense firewall rules to give certain machines internet access (including blocking RFC 1918 sources on the WAN interface), and running Suricata as an IDS.",
  },
  {
    url: `${M}/soc-home-lab-part-1-6309b5b91118`,
    title: "SOC Home Lab — Part 1: Network Design",
    date: "2024-07-23",
    category: "Detection & SOC",
    source: "medium",
    summary:
      "Designing a virtualized, segmented lab network: a target LAN (192.168.10.0/24) and a security LAN (192.168.20.0/24) behind pfSense, with a Suricata sensor interface in promiscuous mode.",
  },

  // Windows & Active Directory
  {
    url: `${M}/configuring-password-policies-in-active-directory-domain-using-psos-1be46c196e04`,
    title: "Configuring Password Policies in Active Directory Using PSOs",
    date: "2024-06-13",
    category: "Windows & Active Directory",
    source: "medium",
    summary: "Fine-grained password policies in an AD domain with Password Settings Objects.",
  },
  {
    url: `${M}/configuring-firewall-policies-using-gpos-in-active-directory-f12a95632b51`,
    title: "Configuring Firewall Policies Using GPOs in Active Directory",
    date: "2024-06-12",
    category: "Windows & Active Directory",
    source: "medium",
    summary: "Pushing Windows Defender Firewall rules to domain machines through Group Policy instead of per-host configuration, for example restricting access to websites.",
  },
  {
    url: `${M}/securely-configure-shares-in-active-directory-group-based-access-control-and-permissions-5bd840fac05e`,
    title: "Securely Configure Shares in Active Directory: Group-Based Access Control",
    date: "2024-06-03",
    category: "Windows & Active Directory",
    source: "medium",
    summary: "Configuring shared folders in AD with group-based access control and permissions.",
  },

  // Forensics
  {
    url: `${M}/reveal-endpoint-forensics-by-cyberdefenders-480325a0b9a7`,
    title: "Reveal — Endpoint Forensics (CyberDefenders)",
    date: "2024-10-26",
    category: "Forensics Labs",
    source: "medium",
    summary: "Walkthrough of the CyberDefenders “Reveal” endpoint forensics challenge, solved with Volatility.",
  },
  {
    url: `${M}/poisoned-credentials-network-forensic-e7a38ff19c03`,
    title: "Poisoned Credentials (Network Forensics)",
    date: "2024-07-16",
    category: "Forensics Labs",
    source: "medium",
    summary: "A network forensics challenge write-up.",
  },

  // Early, tutorial-style post; kept in data but not listed.
  {
    url: `${M}/how-to-hack-wi-fi-networks-b73969824e64`,
    title: "How to hack Wi-Fi networks",
    date: "2024-02-04",
    category: "Detection & SOC",
    source: "medium",
    summary: "",
    hidden: true,
  },
];

/** Maps Medium tags to a category for posts that have no curated entry yet. */
export const tagCategory: Record<string, WritingCategory> = {
  kubernetes: "Kubernetes & Platform",
  devops: "Kubernetes & Platform",
  "github-actions": "Kubernetes & Platform",
  docker: "Kubernetes & Platform",
  "platform-engineering": "Kubernetes & Platform",
  "cloud-networking": "Networking",
  networking: "Networking",
  vpc: "Networking",
  "cloud-security": "Cloud Security",
  aws: "Cloud Security",
  "incident-response": "Cloud Security",
  soc: "Detection & SOC",
  splunk: "Detection & SOC",
  suricata: "Detection & SOC",
};
